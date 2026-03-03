import numpy as np
import joblib
import os
from .schema import TransactionInput

def preprocess_transaction(transaction: TransactionInput) -> np.ndarray:
    model_dir = os.path.join(os.path.dirname(__file__), '..', 'model')
    
    scaler = joblib.load(os.path.join(model_dir, 'scaler.pkl'))
    le_account = joblib.load(os.path.join(model_dir, 'le_account_type.pkl'))
    le_region = joblib.load(os.path.join(model_dir, 'le_region.pkl'))
    le_method = joblib.load(os.path.join(model_dir, 'le_transaction_method.pkl'))
    
    acc_enc = le_account.transform([transaction.account_type])[0]
    reg_enc = le_region.transform([transaction.region])[0]
    meth_enc = le_method.transform([transaction.transaction_method])[0]
    
    features = [
        transaction.transaction_amount,
        transaction.transaction_time,
        transaction.customer_age,
        transaction.distance_from_home,
        transaction.previous_fraud_history,
        transaction.merchant_risk_score,
        transaction.num_transactions_last_24hrs,
        acc_enc,
        reg_enc,
        meth_enc
    ]
    
    features_scaled = scaler.transform([features])[0]
    return np.array([features_scaled])
