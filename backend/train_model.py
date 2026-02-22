import pandas as pd
import numpy as np
import joblib
import json
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, f1_score, confusion_matrix

def generate_balanced_data(n_samples=1500):
    np.random.seed(42)
    
    # Generate wider distributions for better feature separation
    data = {
        'study_hours': np.random.uniform(2, 50, n_samples),
        'attendance_percentage': np.random.uniform(40, 100, n_samples),
        'previous_grade': np.random.uniform(30, 100, n_samples),
        'parental_education': np.random.choice(['High School', 'Bachelor', 'Master', 'PhD'], n_samples),
        'internet_access': np.random.choice(['Yes', 'No'], n_samples),
        'extracurricular_activity': np.random.choice(['Yes', 'No'], n_samples),
        'sleep_hours': np.random.uniform(4, 10, n_samples)
    }
    
    df = pd.DataFrame(data)
    
    # Logic: High study OR high attendance OR high grade should very likely lead to Pass
    # 0.2*30 + 0.15*90 + 0.1*90 = 6 + 13.5 + 9 = 28.5. 
    # Bias -18. 28.5 - 18 = 10.5 (Very strong pass)
    # 2*0.2 + 40*0.15 + 30*0.1 = 0.4 + 6 + 3 = 9.4. 
    # 9.4 - 18 = -8.6 (Very strong fail)
    
    logits = (
        0.12 * df['study_hours'] + 
        0.08 * df['attendance_percentage'] + 
        0.08 * df['previous_grade'] + 
        (df['parental_education'].map({'High School': 0, 'Bachelor': 1, 'Master': 2, 'PhD': 3}) * 0.4) +
        (df['internet_access'] == 'Yes').astype(int) * 0.6 +
        (df['extracurricular_activity'] == 'Yes').astype(int) * 0.4 -
        13.5 # Adjusted baseline for balanced pass/fail
    )
    
    # Add noise to logits for more realistic uncertainty
    logits += np.random.normal(0, 1.0, n_samples)
    
    prob = 1 / (1 + np.exp(-logits))
    df['pass_fail'] = (np.random.rand(n_samples) < prob).astype(int)
    return df

def train_and_verify():
    df = generate_balanced_data(n_samples=3000) # Increased samples
    df.to_csv('student_data.csv', index=False)
    
    # Task: Print class distribution
    class_diff = df['pass_fail'].value_counts()
    print("\n--- Training Data Distribution ---")
    print(f"Fail (0): {class_diff[0]} ({class_diff[0]/len(df)*100:.1f}%)")
    print(f"Pass (1): {class_diff[1]} ({class_diff[1]/len(df)*100:.1f}%)")
    print("----------------------------------\n")
    
    X = df.drop('pass_fail', axis=1)
    y = df['pass_fail']

    num_features = ['study_hours', 'attendance_percentage', 'previous_grade', 'sleep_hours']
    cat_features = ['parental_education', 'internet_access', 'extracurricular_activity']

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), num_features),
            ('cat', OneHotEncoder(handle_unknown='ignore'), cat_features)
        ],
        remainder='drop'
    )

    # Task: Wrap model in a single pipeline and use class_weight='balanced'
    model = LogisticRegression(
        max_iter=2000, 
        random_state=42, 
        class_weight='balanced'
    )
    pipeline = Pipeline([('preprocessor', preprocessor), ('classifier', model)])

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    pipeline.fit(X_train, y_train)
    
    # Metrics
    y_pred = pipeline.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    
    print(f"Training Complete. Accuracy={acc:.4f}, F1={f1:.4f}")
    
    # Task: Print predicted probabilities
    print("\n--- Model Probability Verification ---")
    test_profiles = [
        ("High Performer", 45, 95, 90, 'PhD', 'Yes', 'Yes', 8),
        ("Average Student", 25, 80, 75, 'Bachelor', 'Yes', 'No', 7),
        ("Struggling Student", 10, 45, 40, 'High School', 'No', 'No', 5),
        ("Low Grade / High Study", 30, 70, 50, 'High School', 'Yes', 'Yes', 12)
    ]
    
    for name, sh, at, pg, pe, ia, ea, sl in test_profiles:
        test_case = pd.DataFrame([{
            'study_hours': sh, 'attendance_percentage': at, 'previous_grade': pg,
            'parental_education': pe, 'internet_access': ia, 'extracurricular_activity': ea, 'sleep_hours': sl
        }])
        prob = pipeline.predict_proba(test_case)[0]
        # Custom threshold of 0.65 for PASS
        status = "Pass" if prob[1] >= 0.65 else "Fail"
        print(f"[{name:20}] Prob(Fail): {prob[0]:.4f} | Prob(Pass): {prob[1]:.4f} | Result (Threshold 0.65): {status}")

    # Save
    results = {
        "LogisticRegression": {
            "accuracy": round(acc, 4),
            "f1_score": round(f1, 4),
            "cv_mean": round(np.mean(cross_val_score(pipeline, X_train, y_train, cv=5)), 4),
            "confusion_matrix": confusion_matrix(y_test, y_pred).tolist(),
            "class_distribution": {
                "0": int(class_diff[0]),
                "1": int(class_diff[1])
            }
        },
        "selected_model": "LogisticRegression",
        "threshold": 0.65
    }
    
    feat_names = num_features + list(pipeline.named_steps['preprocessor'].named_transformers_['cat'].get_feature_names_out())
    coeffs = np.abs(pipeline.named_steps['classifier'].coef_[0])
    coeffs = coeffs / np.sum(coeffs)
    results["feature_importance"] = sorted([{"name": n, "value": round(float(v), 4)} for n, v in zip(feat_names, coeffs)], key=lambda x: x["value"], reverse=True)

    joblib.dump(pipeline, 'model.pkl')
    with open('metrics.json', 'w') as f:
        json.dump(results, f, indent=4)

if __name__ == "__main__":
    train_and_verify()


