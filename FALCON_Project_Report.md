# FALCON: Financial Analytics and Logical Computation for Online Networks
## Final Project Implementation Report

---

### Executive Summary
This report details the successful upgrading and structural finalization of the **FALCON** fraud detection system. The platform has been entirely migrated to a new, highly comprehensive transaction telemetry dataset (`transaction_fraud_dataset.csv`). It integrates advanced Machine Learning algorithms, dynamic real-time Python endpoints via FastAPI, and an industry-grade React analytical dashboard explicitly designed to map dynamic risk factors.

---

### 1. Dataset Re-Architecture
A fully synthetic multi-class dataset was integrated, eliminating the previous one-sided boolean biases.
*   **Target Label:** `fraud_label` (0 = Safe, 1 = Suspicious, 2 = Fraud)
*   **10 New Core Features:** `transaction_amount`, `transaction_time`, `customer_age`, `distance_from_home`, `previous_fraud_history`, `merchant_risk_score`, `num_transactions_last_24hrs`, `account_type` (Categorical), `region` (Categorical), `transaction_method` (Categorical).
*   **Data Pipeline:** The backend transforms categorical text strings and scales numerical values sequentially, ensuring input structure perfectly mirrors the trained states.

### 2. Machine Learning Operations (MLOps)
The backend model pipeline was radically expanded to train 6 independent classification constraints. 
1.  `RandomForestClassifier` (Primary Ensemble)
2.  `MLPClassifier` (Deep Artificial Neural Network)
3.  `LogisticRegression` (Baseline Linear Distribution)
4.  `KNeighborsClassifier` (Clustering & Distance Analysis)
5.  `SVC` (Support Vector Classifier - Margin Probabilities)
6.  `GaussianNB` (Naive Bayes Probability Engine)

*All models are locally saved as `.pkl` dependencies within the `ml-service/model` directory alongside their specific `scaler.pkl` and `LabelEncoder` properties.*

### 3. Backend Integration (FastAPI Ecosystem)
We heavily modified the Python FastAPI implementation logic:
*   **Pydantic Type Checking:** `TransactionInput` classes in `schema.py` natively parse incoming JSON API calls mapped to the new columns.
*   **Live Preprocessing API:** Incoming payloads recursively pass through `joblib` arrays, transforming text arrays like `Business` bounds into model variables (`preprocess_transaction`).
*   **Dynamic Load Balancing:** User selects the required analytic engine from the front-end string array (`modelAlgorithm`); the API handles `.pkl` instantiation locally.
*   **Probabilistic Risk Score:** The endpoint calculates an accurate `riskScore` percentage parsing multi-class `predict_proba` matrix outputs.

### 4. Frontend Ecosystem (React & Recharts)
The user interface (`Dashboard.jsx`) underwent a vast professional overhaul, mirroring an industry-level SOC operational layout:
1. **Dynamic Statistics Dashboard:** Real-time metrics analyzing total session events, total detected anomalies, dynamic average risk scores, and aggregate flagged monetary volumes.
2. **Recharts Visualizations:** 
   * **Pie Matrix:** Demonstrates the real-time threshold gap between Safe variables and Risk Variables for the singular input matrix.
   * **Area Trend Analytics:** Uses `history` states to accurately chart shifting risk scores for consecutive platform transactions via `AreaChart`.
   * **Volume Amplitudes:** Identifies the monetary size distributions via `BarChart`, mapped historically over consecutive queries.
3. **Advanced Input Mappers:** Full support for array-dependent values (`North`, `Savings`, `Online`).

---

### System Deployment Steps

To initialize this project successfully on local resources with all structural modifications:

**Step 1:** Generate Machine Learning Models (Local Caching)
```bash
cd ml-service/training
python train_v3.py
```
*(Proceed only when the terminal logs "All models trained... ")*

**Step 2:** Start Python Inference API
```bash
cd ml-service
venv\Scripts\activate
uvicorn app.main:app --reload
```

**Step 3:** Start Backend Event Emitters (Email Service)
```bash
cd server
npm run dev
```

**Step 4:** Deploy React Interface (Vite/Webpack)
```bash
cd client
npm run dev
```

The SOC interface is securely deployed across `http://localhost:3000`. Navigate to the system form to verify functionality!
