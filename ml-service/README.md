# FALCON ML Service

This is the Machine Learning microservice for the FALCON Fraud Detection System, built with Python and FastAPI.

## Setup Instructions

### 1. Create Virtual Environment
```bash
python -m venv venv
```

### 2. Activate Virtual Environment
**Windows:**
```bash
venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

### 3. Install Requirements
```bash
pip install -r requirements.txt
```

### 4. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 5. Run the Server
```bash
uvicorn app.main:app --reload --port 8000
```

The service will be available at `http://localhost:8000`. You can view the interactive API documentation at `http://localhost:8000/docs`.
