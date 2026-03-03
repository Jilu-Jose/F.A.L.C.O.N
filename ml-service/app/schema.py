from pydantic import BaseModel, Field

class TransactionInput(BaseModel):
    distance_from_home: float = Field(..., description="Distance from home where the transaction happened")
    distance_from_last_transaction: float = Field(..., description="Distance from last transaction happened")
    ratio_to_median_purchase_price: float = Field(..., description="Ratio of purchased price transaction to median purchase price")
    repeat_retailer: float = Field(..., description="Is the transaction happened from same retailer (1.0 or 0.0)")
    used_chip: float = Field(..., description="Is the transaction through chip (1.0 or 0.0)")
    used_pin_number: float = Field(..., description="Is the transaction happened by using PIN number (1.0 or 0.0)")
    online_order: float = Field(..., description="Is the transaction an online order (1.0 or 0.0)")

class PredictionOutput(BaseModel):
    isFraud: bool = Field(..., description="Whether the transaction is classified as fraudulent")
    riskScore: float = Field(..., ge=0, le=100, description="Risk probability score (0-100)")
