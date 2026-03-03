import os
import joblib

MODEL_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "model")
MODEL_PATH = os.path.join(MODEL_DIR, "fraud_model.pkl")
SCALER_PATH = os.path.join(MODEL_DIR, "scaler.pkl")

# Singletons for memory efficiency
_model = None
_scaler = None

def load_ml_resources():
    """Loads and caches the model and scaler."""
    global _model, _scaler
    if _model is None:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")
        _model = joblib.load(MODEL_PATH)
        
    if _scaler is None:
        if not os.path.exists(SCALER_PATH):
            raise FileNotFoundError(f"Scaler file not found at {SCALER_PATH}")
        _scaler = joblib.load(SCALER_PATH)

def get_model():
    if _model is None:
        load_ml_resources()
    return _model

def get_scaler():
    if _scaler is None:
        load_ml_resources()
    return _scaler
