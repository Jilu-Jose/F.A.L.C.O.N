import joblib
import os
from .schema import TransactionInput, PredictionOutput
from .preprocessing import preprocess_transaction

def predict(transaction: TransactionInput) -> PredictionOutput:
    features = preprocess_transaction(transaction)
    
    algo_name = getattr(transaction, 'modelAlgorithm', "RandomForest")
    model_path = os.path.join(os.path.dirname(__file__), '..', 'model', f'{algo_name}.pkl')
    model = joblib.load(model_path)
    
    proba = model.predict_proba(features)[0]
    
    prediction = model.predict(features)[0]
    is_fraud = bool(prediction >= 1)
    
    risk_score = round(sum(proba[1:]) * 100, 2) if len(proba) > 2 else round(proba[1] * 100, 2)
    
    return PredictionOutput(
        isFraud=is_fraud,
        riskScore=risk_score
    )
