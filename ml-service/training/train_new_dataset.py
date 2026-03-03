import os
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.neural_network import MLPClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score


model_dir = "c:\\F.A.L.C.O.N\\ml-service\\model"
os.makedirs(model_dir, exist_ok=True)

df = pd.read_csv(r"c:\\F.A.L.C.O.N\\ml-service\\training\\transaction_fraud_dataset.csv")


df['fraud_label'] = df['fraud_label'].apply(lambda x: 1 if x > 0 else 0)


categorical_cols = ["account_type", "region", "transaction_method"]
for col in categorical_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col].astype(str))
    joblib.dump(le, os.path.join(model_dir, f"le_{col}.pkl"))


feature_cols = [
    "transaction_amount", "transaction_time", "customer_age",
    "distance_from_home", "previous_fraud_history", "merchant_risk_score",
    "num_transactions_last_24hrs", "account_type", "region", "transaction_method"
]

X = df[feature_cols]
y = df["fraud_label"]


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

joblib.dump(scaler, os.path.join(model_dir, "scaler.pkl"))


models = {
    "RandomForest": RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1),
    "LogisticRegression": LogisticRegression(max_iter=1000, random_state=42),
    "MLPClassifier": MLPClassifier(max_iter=1000, random_state=42),
    "KNN": KNeighborsClassifier(n_jobs=-1),
    "SVC": SVC(probability=True, random_state=42),
    "GaussianNB": GaussianNB()
}

metrics_summary = []
for name, model in models.items():
    print(f"\\nTraining {name}...")
    model.fit(X_train_scaled, y_train)
    y_pred = model.predict(X_test_scaled)
    
    
    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred, zero_division=0)
    rec = recall_score(y_test, y_pred, zero_division=0)
    f1 = f1_score(y_test, y_pred, zero_division=0)
    
    metrics_summary.append({
        'Model': name, 'Accuracy': acc, 'Precision': prec, 'Recall': rec, 'F1': f1
    })
    
    joblib.dump(model, os.path.join(model_dir, f"{name}.pkl"))

print("\\n--- Training Results ---")
for m in metrics_summary:
    print(f"{m['Model']:<20}: Acc={m['Accuracy']:.4f}, Prec={m['Precision']:.4f}, Rec={m['Recall']:.4f}")


