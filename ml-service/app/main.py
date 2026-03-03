from fastapi import FastAPI, HTTPException, Request, Header
from typing import Optional

# ... previous imports ...
from fastapi.middleware.cors import CORSMiddleware
from app.schema import TransactionInput, PredictionOutput
from app.prediction import predict
from app.utils import load_ml_resources

app = FastAPI(
    title="FALCON ML Service",
    description="Fraud detection prediction service",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory dictionary to track predictions per IP
# For a production app, use Redis or a database.
ip_prediction_counts = {}
FREE_TIER_LIMIT = 3

@app.on_event("startup")
async def startup_event():
    # Load model and scaler on app startup
    try:
        load_ml_resources()
        print("Model and scaler loaded successfully.")
    except Exception as e:
        print(f"Warning: Failed to load ML resources during startup: {e}")

@app.get("/")
def health_check():
    return {"status": "ok", "message": "FALCON ML Service is running."}

@app.post("/predict", response_model=PredictionOutput)
def predict_fraud(
    transaction: TransactionInput, 
    request: Request,
    authorization: Optional[str] = Header(None)
):
    # Determine if user is logged in (e.g., checks for an Authorization header)
    is_logged_in = authorization is not None and len(authorization) > 10
    
    # If not logged in, enforce the 3-use limit based on IP address
    if not is_logged_in:
        client_ip = request.client.host
        current_count = ip_prediction_counts.get(client_ip, 0)
        
        if current_count >= FREE_TIER_LIMIT:
            raise HTTPException(
                status_code=429, 
                detail="Free tier limit of 3 predictions reached. Please log in or sign up to continue using the service."
            )
            
        # Increment the usage count
        ip_prediction_counts[client_ip] = current_count + 1

    try:
        # Call the actual prediction logic
        return predict(transaction)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

