<div align="center">

<img src="client\src\assets\logos\Screenshot 2026-03-14 140427.png" alt="FALCON Logo" width="140" />


### Financial Anomaly & Loss Control Optimization Network

<br/>

[![Live Demo](https://img.shields.io/badge/Live%20Demo-f--a--l--c--o--n.vercel.app-4F46E5?style=for-the-badge&logo=vercel&logoColor=white)](https://f-a-l-c-o-n.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)

<br/>

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-0F172A?style=flat-square&logo=tailwindcss&logoColor=38BDF8)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=socketdotio&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=flat-square&logo=scikitlearn&logoColor=white)

<br/>

*A production-ready, AI-powered financial fraud detection system with real-time alerts and machine learning risk scoring.*

</div>

---

## Overview

FALCON is a full-stack fraud detection platform built on a microservice architecture. It combines a React frontend, a Node.js/Express API server, and a Python FastAPI ML microservice to deliver real-time transaction monitoring, AI-driven risk scoring, and secure role-based access — all in a single cohesive system.

---

## Features

| | Feature | Description |
|---|---|---|
| ![arch](https://img.shields.io/badge/-Microservices-6366F1?style=flat-square&logo=buffer&logoColor=white) | **Microservice Architecture** | Clean separation of concerns between the web backend and ML processing layer |
| ![rt](https://img.shields.io/badge/-Real--Time-EF4444?style=flat-square&logo=socketdotio&logoColor=white) | **Real-Time Monitoring** | Socket.io integration streams fraud alerts to the dashboard instantly |
| ![ai](https://img.shields.io/badge/-AI%20Scoring-F59E0B?style=flat-square&logo=scikitlearn&logoColor=white) | **AI Risk Scoring** | Machine learning model evaluates each transaction for fraudulent patterns |
| ![auth](https://img.shields.io/badge/-Auth%20%26%20RBAC-22C55E?style=flat-square&logo=jsonwebtokens&logoColor=white) | **Secure Authentication** | JWT-based login with Role-Based Access Control (Admin, Analyst) |
| ![dash](https://img.shields.io/badge/-Dashboard-3B82F6?style=flat-square&logo=chartdotjs&logoColor=white) | **Interactive Dashboard** | Animated KPI cards, risk distribution charts, and scalable data tables |
| ![theme](https://img.shields.io/badge/-Theming-8B5CF6?style=flat-square&logo=css3&logoColor=white) | **Dark / Light Theme** | Seamless toggle between deep dark mode and vibrant light mode |

---

## Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                          FALCON System                           │
├────────────────────┬─────────────────────┬───────────────────────┤
│   React / Vite     │   Node / Express    │   Python / FastAPI    │
│    (Frontend)      │     (Backend)       │     (ML Service)      │
│                    │                     │                       │
│  · Dashboard UI    │  · REST API         │  · Risk Scoring       │
│  · Charts          │  · JWT Auth / RBAC  │  · scikit-learn       │
│  · Socket Client   │  · Socket Server    │  · pandas / pydantic  │
└────────┬───────────┴──────────┬──────────┴──────────┬────────────┘
         │                      │                      │
         └──────────────────────▼──────────────────────┘
                           MongoDB Atlas
                      (Users & Transactions)
```

---

## Project Structure

```
FALCON/
├── client/          # React (Vite) Frontend
├── server/          # Node + Express Backend
├── ml-service/      # Python FastAPI ML Microservice
├── docker/          # Dockerfiles & Compose config
└── README.md
```

---

## Getting Started

### Prerequisites

Ensure the following are installed before proceeding:

| Requirement | Version | Notes |
|---|---|---|
| ![Node](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) | v16+ | Required for client and server |
| ![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white) | v3.9+ | Required for ML service |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) | Atlas or local | Database for users and transactions |
| ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) | Any recent | Optional — for containerized setup |

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/FALCON.git
cd FALCON
```

---

### 2. Backend Server

```bash
cd server
npm install
cp .env.example .env
# Fill in MONGO_URI, JWT_SECRET, and other required variables
npm run dev
```

---

### 3. ML Service

```bash
cd ml-service

# Create and activate a virtual environment
python -m venv venv

# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

# Install dependencies and start the service
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

---

### 4. Frontend Client

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

---

### 5. Running All Services Locally

Open three separate terminals and start each service concurrently:

```bash
# Terminal 1 — Frontend
cd client && npm run dev

# Terminal 2 — Backend
cd server && npm run dev

# Terminal 3 — ML Service
cd ml-service
source venv/bin/activate      # Windows: venv\Scripts\activate
uvicorn app.main:app --reload
```

---

## Docker Setup

Spin up the entire stack with a single command using Docker Compose:

```bash
docker-compose --file docker/docker-compose.yml up --build
```

---

## API Documentation

| Service | URL | Notes |
|---|---|---|
| ![swagger](https://img.shields.io/badge/Backend-5000-85EA2D?style=flat-square&logo=swagger&logoColor=black) | `http://localhost:5000/api-docs` | Swagger UI, available in dev mode |
| ![fastapi](https://img.shields.io/badge/ML%20Service-8000-009688?style=flat-square&logo=fastapi&logoColor=white) | `http://localhost:8000/docs` | FastAPI auto-generated docs |

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

[![GitHub Stars](https://img.shields.io/github/stars/yourusername/FALCON?style=flat-square&logo=github&logoColor=white&color=333)](https://github.com/yourusername/FALCON)
&nbsp;
[![GitHub Forks](https://img.shields.io/github/forks/yourusername/FALCON?style=flat-square&logo=github&logoColor=white&color=333)](https://github.com/yourusername/FALCON/fork)

FALCON &copy; 2024

</div>