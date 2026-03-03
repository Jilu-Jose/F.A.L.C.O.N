import os

# 1. Update schema.py
schema_path = r"c:\F.A.L.C.O.N\ml-service\app\schema.py"
with open(schema_path, "w", encoding="utf-8") as f:
    f.write('''from pydantic import BaseModel, Field

class TransactionInput(BaseModel):
    transaction_amount: float = Field(...)
    transaction_time: int = Field(...)
    customer_age: int = Field(...)
    distance_from_home: float = Field(...)
    previous_fraud_history: int = Field(...)
    merchant_risk_score: float = Field(...)
    num_transactions_last_24hrs: int = Field(...)
    account_type: str = Field(...)
    region: str = Field(...)
    transaction_method: str = Field(...)
    modelAlgorithm: str = Field(default="RandomForest", description="Algorithm to use")

class PredictionOutput(BaseModel):
    isFraud: bool = Field(...)
    riskScore: float = Field(...)
''')

# 2. Update preprocessing.py
prep_path = r"c:\F.A.L.C.O.N\ml-service\app\preprocessing.py"
with open(prep_path, "w", encoding="utf-8") as f:
    f.write('''import numpy as np
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
''')

# 3. Update prediction.py
pred_path = r"c:\F.A.L.C.O.N\ml-service\app\prediction.py"
with open(pred_path, "w", encoding="utf-8") as f:
    f.write('''import joblib
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
''')

# 4. Update Dashboard.jsx
dash_path = r"c:\F.A.L.C.O.N\client\src\pages\Dashboard.jsx"
with open(dash_path, "r", encoding="utf-8") as f:
    dash = f.read()

import re

# Replace formData struct
dash = re.sub(r'const \[formData, setFormData\] = useState\(\{[\s\S]*?\}\);',
'''const [formData, setFormData] = useState({
        transaction_amount: 1200.50,
        transaction_time: 14,
        customer_age: 35,
        distance_from_home: 15.5,
        previous_fraud_history: 0,
        merchant_risk_score: 0.1,
        num_transactions_last_24hrs: 2,
        account_type: "Savings",
        region: "North",
        transaction_method: "Online",
        modelAlgorithm: "RandomForest"
    });''', dash)

# Handle string inclusion in change logic natively:
dash = dash.replace(
    "['type', 'branch', 'Acct_type', 'modelAlgorithm']",
    "['account_type', 'region', 'transaction_method', 'modelAlgorithm']"
)
dash = dash.replace(
    "['type', 'branch', 'Acct_type']",
    "['account_type', 'region', 'transaction_method']"
)

# Table headers rewrite
dash = re.sub(r'<th[^>]*>Type</th>\s*<th[^>]*>Amount</th>\s*<th[^>]*>Acct Type</th>',
'''<th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Amount</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Method</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Region</th>''', dash)

# Table rows rewrite
dash = re.sub(r'<td[^>]*>\{item\.inputs\.type\}</td>\s*<td[^>]*>\$\{Number\(item\.inputs\.amount\)\.toFixed\(2\)\}</td>\s*<td[^>]*>\{item\.inputs\.Acct_type\}</td>',
'''<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${Number(item.inputs.transaction_amount).toFixed(2)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.inputs.transaction_method}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.inputs.region}</td>''', dash)

with open(dash_path, "w", encoding="utf-8") as f:
    f.write(dash)

print("UI and API Successfully updated to use new dataset structures!")
