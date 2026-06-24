# LinguaBridge 🌍

AI-Powered Language Exchange Platform

**Live Demo:** https://lingua-bridge-roan.vercel.app/

## Overview

LinguaBridge is a full-stack language learning platform that connects learners with language partners while providing AI-powered language assistance. The platform combines real-time communication, AI tutoring, grammar correction, and gamification to create an engaging language learning experience.

Users can practice with native speakers, improve grammar using AI, earn experience points (XP), and track their learning progress through an interactive dashboard.

---

## Features

### Authentication

* User Registration
* Secure Login System
* Firebase Authentication
* Protected Routes

### AI Tutor

* AI-powered language conversation partner
* Grammar correction assistance
* Interactive language practice
* Short and conversational responses for effective learning

### Language Partner Matching

* Find language exchange partners
* Match based on native and learning languages
* User profile-based discovery

### Real-Time Chat

* Instant messaging between language partners
* Firebase Firestore integration
* Live message synchronization

### Gamification System

* XP (Experience Points) rewards
* Level progression system
* Learning motivation through achievements

### User Dashboard

* Personalized welcome dashboard
* Learning language information
* Native language information
* XP and level tracking
* Quick access to all platform features

### Modern UI/UX

* Responsive design
* Professional glassmorphism-inspired interface
* Modern gradients and visual effects
* Mobile-friendly layout

---

## Tech Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Axios
* Tailwind CSS

### Backend

* Flask
* Python
* Flask-CORS
* Google Gemini API

### Database & Authentication

* Firebase Authentication
* Cloud Firestore

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

## Project Architecture

User
↓
React Frontend (Vercel)
↓
Flask Backend (Render)
↓
Google Gemini API
↓
Firebase Authentication & Firestore

---

## AI Features

The AI Tutor uses Google's Gemini model to:

* Conduct language-learning conversations
* Correct grammar mistakes
* Provide concise explanations
* Encourage learners through interactive dialogue

---

## Installation

### Clone Repository

```bash
git clone https://github.com/reshavCodex/LinguaBridge.git
cd LinguaBridge
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

python app.py
```

---

## Environment Variables

Create a `.env` file inside the backend directory:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Firebase configuration should be added inside the frontend Firebase configuration file.

---

## Future Enhancements

* Daily learning streaks
* Achievement badges
* Voice conversation practice
* Video calling between language partners
* Translation assistance
* Language proficiency tracking
* AI-generated learning plans
* Leaderboards and community features

---

## Learning Outcomes

This project demonstrates:

* Full-Stack Web Development
* React Application Development
* REST API Integration
* Firebase Authentication
* Real-Time Database Systems
* AI Integration using Gemini API
* Cloud Deployment
* Modern UI/UX Design

---

## Author

**Reshav Pradhan**

B.Tech CSE (AI & ML)
Techno India University

GitHub:
https://github.com/reshavCodex

---

## License

This project is developed for educational and portfolio purposes.
