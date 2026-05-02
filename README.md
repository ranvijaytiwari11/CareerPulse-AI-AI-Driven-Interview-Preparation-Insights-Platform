# CareerPulse AI / InterviewIQ 🚀

A next-generation, AI-driven full-stack platform designed to help job seekers and professionals prepare for technical and behavioral interviews. Powered by cutting-edge AI models, it provides dynamic question generation, real-time feedback, and comprehensive performance insights.

## ✨ Key Features
- **Smart Resume Parsing**: Automatically extracts experience, skills, and projects from PDF resumes.
- **AI Mock Interviews**: Generates contextual interview questions tailored to the candidate's exact profile and selected difficulty.
- **Real-Time AI Evaluation**: Analyzes candidate answers instantly, providing realistic human-like feedback and scoring on Confidence, Communication, and Correctness.
- **Detailed Analytics Dashboard**: View comprehensive interview history, track progress, and analyze performance reports.
- **Secure Authentication**: Google OAuth integration via Firebase.
- **Premium Subscription Tier**: Seamless payment integration using Razorpay for premium features.

## 🛠️ Technology Stack
- **Frontend**: React.js, Vite, Tailwind CSS, Redux Toolkit
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **AI Integration**: OpenRouter AI (LLMs)
- **Authentication**: Firebase Auth
- **Payments**: Razorpay
- **Deployment**: Vercel

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Firebase project setup
- Razorpay test account

### 1. Clone the repository
```bash
git clone https://github.com/ranvijaytiwari11/CareerPulse-AI-Interview-Preparation-Insights-Platform.git
cd CareerPulse-AI-Interview-Preparation-Insights-Platform
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory and configure the necessary credentials (MongoDB, Razorpay, OpenRouter, etc.).
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```
Create a `.env` file in the `client` directory for Firebase and Razorpay public keys.
```bash
npm run dev
```

## 👨‍💻 Author
**Ranvijay Tiwari**  
[rt7999675@gmail.com](mailto:rt7999675@gmail.com)
