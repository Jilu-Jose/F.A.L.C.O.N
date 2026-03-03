import numpy as np
from app.schema import TransactionInput
from app.utils import get_scaler

def preprocess_transaction(transaction: TransactionInput) -> np.ndarray:
    """
    Preprocesses the transaction data by extracting features
    and scaling the continuous numerical features using the trained scaler.
    """
    # Define exact order of columns as trained
    numeric_features = [
        transaction.distance_from_home,
        transaction.distance_from_last_transaction,
        transaction.ratio_to_median_purchase_price
    ]
    
    categorical_features = [
        transaction.repeat_retailer,
        transaction.used_chip,
        transaction.used_pin_number,
        transaction.online_order
    ]
    
    scaler = get_scaler()
    
    # Scale numerical features
    numeric_scaled = scaler.transform([numeric_features])[0]
    
    # Combine scaled continuous and unscaled categorical into a single array
    # Order must match X_train columns exactly
    final_features = np.concatenate((numeric_scaled, categorical_features))
    
    # Return as 2D array suitable for sklearn predict
    return np.array([final_features])
