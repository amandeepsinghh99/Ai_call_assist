import React, { useState } from 'react';
    import axios from 'axios';

    function App() {
      const [audioBlob, setAudioBlob] = useState(null);
      const [transcription, setTranscription] = useState('');
      const [analysis, setAnalysis] = useState('');
      const [isRecording, setIsRecording] = useState(false);
      const [mediaRecorder, setMediaRecorder] = useState(null);

      const startRecording = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const recorder = new MediaRecorder(stream);
          setMediaRecorder(recorder);
          const audioChunks = [];

          recorder.ondataavailable = event => {
            audioChunks.push(event.data);
          };

          recorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            setAudioBlob(audioBlob);
            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.onloadend = async () => {
              const base64Audio = reader.result;
              await transcribeAudio(base64Audio);
            };
          };

          recorder.onerror = (event) => {
            console.error('MediaRecorder error:', event.error);
          };

          recorder.start();
          setIsRecording(true);
        } catch (error) {
          console.error('Error starting recording:', error);
          if (error.name === 'NotAllowedError') {
            alert('Microphone access denied. Please allow microphone access in your browser settings.');
          } else if (error.name === 'NotFoundError') {
            alert('No microphone found.');
          } else {
            alert('An error occurred while starting the recording.');
          }
        }
      };

      const stopRecording = () => {
        if (mediaRecorder) {
          mediaRecorder.stop();
          setIsRecording(false);
        }
      };

      const transcribeAudio = async (audioBase64) => {
        try {
          const response = await axios.post('/api/transcribe', { audioBase64 });
          setTranscription(response.data.transcription);
          await analyzeTranscription(response.data.transcription);
        } catch (error) {
          console.error('Transcription failed:', error);
        }
      };

      const analyzeTranscription = async (transcription) => {
        try {
          const response = await axios.post('/api/analyze', { transcription });
          setAnalysis(response.data.analysis);
        } catch (error) {
          console.error('Analysis failed:', error);
        }
      };

      return (
        <div>
          <h1>AI Call Assistant</h1>
          {isRecording ? (
            <button onClick={stopRecording}>Stop Recording</button>
          ) : (
            <button onClick={startRecording}>Start Recording</button>
          )}
          {transcription && (
            <div>
              <h2>Transcription:</h2>
              <p>{transcription}</p>
            </div>
          )}
          {analysis && (
            <div>
              <h2>Analysis:</h2>
              <p>{analysis}</p>
            </div>
          )}
        </div>
      );
    }

    export default App;
