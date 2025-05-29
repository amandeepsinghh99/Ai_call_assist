import express from 'express';
    import { Configuration, OpenAIApi } from 'openai';
    import * as dotenv from 'dotenv';
    dotenv.config();

    const app = express();
    const port = process.env.PORT || 3000;

    app.use(express.json());

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    app.post('/api/transcribe', async (req, res) => {
      try {
        const { audioBase64 } = req.body;
        if (!audioBase64) {
          return res.status(400).json({ error: 'Missing audioBase64' });
        }

        const audioData = audioBase64.split(',')[1]; // Remove the data URI prefix
        const buffer = Buffer.from(audioData, 'base64');

        const response = await openai.createTranscription({
          file: buffer,
          model: 'whisper-1',
        });

        res.json({ transcription: response.data.text });
      } catch (error) {
        console.error('Transcription error:', error);
        res.status(500).json({ error: 'Transcription failed' });
      }
    });

    app.post('/api/analyze', async (req, res) => {
      try {
        const { transcription } = req.body;
        if (!transcription) {
          return res.status(400).json({ error: 'Missing transcription' });
        }

        const completion = await openai.createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant that analyzes call transcripts.' },
            { role: 'user', content: `Analyze the following call transcript: ${transcription}` },
          ],
        });

        res.json({ analysis: completion.data.choices[0].message.content });
      } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'Analysis failed' });
      }
    });

    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
