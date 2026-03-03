from pydantic import BaseModel, Field

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
