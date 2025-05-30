***Tools and Technologies Used***
The AI Call Assistant project leverages a modern, multi-layered tech stack to enable real-time, natural, and intelligent voice interactions. The system is designed around four core phases—Listen, Think, Speak, and Act—each powered by specialized tools and frameworks.

**🔉 1. Listen (Input Phase)****
Purpose	Tools & Technologies
Microphone input capture	Web Audio API, PyAudio, or MediaDevices API
Noise and background voice filtering	RNNoise, WebRTC Noise Suppression, DeepFilterNet
Endpoint detection	Silero VAD, custom voice activity detection (VAD)
Real-time transcription	Whisper (OpenAI) or Google Speech-to-Text API

🧠 2. **Think (Processing Phase)**
Purpose	Tools & Technologies
Transcription processing & context	Python, Node.js, or backend server stack
Language understanding & generation	OpenAI GPT-4 (LLM integration)
Emotion detection from voice	openSMILE, pyAudioAnalysis, or DeepSpectrum
Response logic & tone adaptation	Custom dialogue manager using LLM + emotion tags

🗣️ 3. **Speak (Output Phase)**
Purpose	Tools & Technologies
Text-to-Speech (TTS) synthesis	Google Cloud TTS, Amazon Polly, ElevenLabs
Natural fillers & backchanneling	Custom scripting using LLM + speech synthesis filters
Real-time audio streaming	WebSockets, gRPC, or RTMP

🤖 4. **Act (Automation & Integration Phase)**
Purpose	Tools & Technologies
Workflow automation	Make.com (formerly Integromat)
Calendar & CRM integration	Google Calendar API, HubSpot/Zapier CRM API
Task execution & status updates	REST APIs, Webhook triggers, OAuth 2.0

💡 **Additional Tools & Features**
Capability	Tools & Technologies
Bi-directional voice interaction	Real-time WebRTC or Socket.IO pipelines
Interrupt detection (barge-in)	Custom speech overlap detection with audio buffers
Sub-second latency	Optimized pipeline using streaming APIs and gRPC
Multi-platform compatibility	React, Flutter, PWA, Android/iOS SDKs
Code repository & version control	Git, GitHub
Development & debugging	Visual Studio Code, Postman, Fiddler
