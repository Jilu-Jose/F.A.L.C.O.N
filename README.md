# FALCON – Financial Anomaly & Loss Control Optimization Network

![FALCON Logo](./client/src/assets/logos/falcon-logo.png)

## Project Overview

FALCON is a production-ready MERN stack financial fraud detection system powered by AI. It features a React frontend, a Node.js/Express backend, and a Python FastAPI ML microservice to provide real-time fraud alerts and risk scoring for financial transactions.

Live: https://f-a-l-c-o-n.vercel.app/

## Architecture Diagram

- **Client (React/Vite)**: Modern frontend with dynamic dashboard.
- **Server (Node.js/Express)**: Core business logic, authentication, sockets.
- **Database (MongoDB Atlas)**: Stores users and transactions.
- **ML Service (Python FastAPI)**: Processes transactions and returns AI risk scoring.

## Tech Stack

**Frontend:** React (Vite), TailwindCSS, Context API, Chart.js/Recharts, Socket.io-client
**Backend:** Node.js, Express, MongoDB (Mongoose), Socket.io, JWT, bcrypt
**ML Service:** Python, FastAPI, scikit-learn, joblib, pandas, pydantic
**DevOps:** Docker, Docker Compose

## Features

- **Microservice Architecture**: Clear separation of concerns between web backend and ML processing.
- **Real-Time Monitoring**: Socket.io integration for instant fraud alerts.
- **AI Risk Scoring**: Machine learning model evaluates transactions for fraudulent patterns securely.
- **Secure Authentication**: JWT-based login with Role-Based Access Control (Admin, Analyst).
- **Interactive Dashboard**: Animated KPI cards, risk distribution charts, scalable tables.
- **Dark/Light Theme**: Seamless toggle between deep dark mode and vibrant light mode.

## Folder Structure

```
FALCON/
├── client/          # React (Vite) Frontend
├── server/          # Node + Express Backend
├── ml-service/      # Python FastAPI ML Microservice
├── docker/          # Dockerfiles & Compose
└── README.md
```

## Installation Guide

### Prerequisites
- Node.js (v16+)
- Python (v3.9+)
- MongoDB Atlas account (or local MongoDB)
- Docker & Docker Compose (optional for containerized running)

### 1. Clone Repo
```bash
git clone https://github.com/yourusername/FALCON.git
cd FALCON
```

### 2. Setup Server
```bash
cd server
npm install
cp .env.example .env
# Edit .env and supply your variables (MONGO_URI, JWT_SECRET, etc.)
npm run dev
```

### 3. Setup ML Service (with venv)
```bash
cd ml-service

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
# source venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Run FastAPI server
uvicorn app.main:app --reload --port 8000
```

### 4. Setup Client
```bash
cd client
npm install
cp .env.example .env
npm run dev
```

## Running the Project

To run the project locally, open three separate terminal windows and start each service concurrently.

**Terminal 1: Start the Frontend (React)**
```bash
cd client
npm install
npm run dev
```

**Terminal 2: Start the Backend Server (Node.js)**
```bash
cd server
npm install
npm run dev
```

**Terminal 3: Start the Machine Learning Service (FastAPI/Python)**
```bash
cd ml-service
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Docker Setup

To run the entire stack using Docker Compose:

```bash
docker-compose --file docker/docker-compose.yml up --build
```

## API Documentation

Swagger documentation is available at `http://localhost:5000/api-docs` when running the backend in development.
The ML service documentation is available at `http://localhost:8000/docs`.

## License

MIT License
