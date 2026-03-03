import numpy as np
import pandas as pd

# Reproducibility
np.random.seed(42)

rows = 12000

# -----------------------------
# Numerical Features
# -----------------------------
transaction_amount = np.round(np.random.exponential(scale=200, size=rows), 2)
transaction_time = np.random.randint(0, 24, rows)
customer_age = np.random.randint(18, 75, rows)
distance_from_home = np.round(np.random.exponential(scale=15, size=rows), 2)
previous_fraud_history = np.random.choice([0, 1], size=rows, p=[0.92, 0.08])
merchant_risk_score = np.round(np.random.uniform(0, 1, rows), 2)
num_transactions_last_24hrs = np.random.poisson(lam=3, size=rows)

# -----------------------------
# Categorical Features
# -----------------------------
account_type = np.random.choice(
    ["Savings", "Current", "Business"],
    size=rows,
    p=[0.6, 0.3, 0.1]
)

region = np.random.choice(
    ["North", "South", "East", "West", "Central"],
    size=rows
)

transaction_method = np.random.choice(
    ["Online", "POS", "ATM", "Mobile Banking"],
    size=rows,
    p=[0.4, 0.3, 0.15, 0.15]
)

# -----------------------------
# Fraud Logic (Multi-class)
# -----------------------------
fraud_label = []

for i in range(rows):
    score = 0
    
    if transaction_amount[i] > 700:
        score += 1
    if distance_from_home[i] > 30:
        score += 1
    if previous_fraud_history[i] == 1:
        score += 1
    if merchant_risk_score[i] > 0.75:
        score += 1
    if num_transactions_last_24hrs[i] > 10:
        score += 1
    if transaction_method[i] == "Online":
        score += 1
    if account_type[i] == "Business":
        score += 1

    if score <= 2:
        fraud_label.append(0)      # Legitimate
    elif score == 3:
        fraud_label.append(1)      # Suspicious
    else:
        fraud_label.append(2)      # Fraud

# -----------------------------
# Create DataFrame
# -----------------------------
data = pd.DataFrame({
    "transaction_amount": transaction_amount,
    "transaction_time": transaction_time,
    "customer_age": customer_age,
    "distance_from_home": distance_from_home,
    "previous_fraud_history": previous_fraud_history,
    "merchant_risk_score": merchant_risk_score,
    "num_transactions_last_24hrs": num_transactions_last_24hrs,
    "account_type": account_type,
    "region": region,
    "transaction_method": transaction_method,
    "fraud_label": fraud_label
})

# Save CSV
data.to_csv("transaction_fraud_dataset.csv", index=False)

print("Dataset created successfully")
print("Shape:", data.shape)