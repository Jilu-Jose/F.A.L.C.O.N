from app.schema import TransactionInput, PredictionOutput
from app.preprocessing import preprocess_transaction
from app.utils import get_model

def predict(transaction: TransactionInput) -> PredictionOutput:
    """
    Takes a transaction input, preprocesses it, and runs it through the ML model.
    Returns a PredictionOutput schema with fraud status and risk score.
    """
    # Preprocess the input
    features = preprocess_transaction(transaction)
    
    # Get the model
    model = get_model()
    
    # Predict probability (class 1 is fraud)
    proba = model.predict_proba(features)[0]
    risk_score = round(proba[1] * 100, 2)
    
    # Predict class (0 or 1)
    prediction = model.predict(features)[0]
    is_fraud = bool(prediction == 1)
    
    return PredictionOutput(
        isFraud=is_fraud,
        riskScore=risk_score
    )
