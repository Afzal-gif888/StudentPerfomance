from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib
import json
import os
import pandas as pd

app = FastAPI(title="Academic Performance Research API")

# Production CORS Configuration
# In production, set ALLOWED_ORIGINS to your Netlify URL
allowed_origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Artifacts
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.pkl")
METRICS_PATH = os.path.join(os.path.dirname(__file__), "metrics.json")

try:
    if os.path.exists(MODEL_PATH):
        model = joblib.load(MODEL_PATH)
    else:
        model = None
        print("Model file not found!")
        
    if os.path.exists(METRICS_PATH):
        with open(METRICS_PATH, 'r') as f:
            metrics = json.load(f)
    else:
        metrics = None
        print("Metrics file not found!")
except Exception as e:
    model = None
    metrics = None
    print(f"Initialization error: {e}")

class StudentFeatures(BaseModel):
    study_hours: float = Field(..., ge=0, le=60)
    attendance_percentage: float = Field(..., ge=0, le=100)
    previous_grade: float = Field(..., ge=0, le=100)
    parental_education: str
    internet_access: str
    extracurricular_activity: str
    sleep_hours: float = Field(..., ge=0, le=24)

@app.get("/health")
def health():
    return {
        "status": "active", 
        "model_loaded": model is not None,
        "mode": "production" if os.getenv("RENDER") else "development"
    }

@app.get("/metadata")
def get_metadata():
    if metrics is None:
        raise HTTPException(status_code=503, detail="Metrics not available")
    return metrics

@app.post("/predict")
async def predict(features: StudentFeatures):
    if model is None:
        raise HTTPException(status_code=503, detail="Model unavailable")
    
    try:
        input_data = features.dict()
        input_df = pd.DataFrame([input_data])
        
        probabilities = model.predict_proba(input_df)[0]
        prob_fail, prob_pass = probabilities[0], probabilities[1]
        
        pass_threshold = 0.65
        final_prediction = "Pass" if prob_pass >= pass_threshold else "Fail"
        
        return {
            "prediction": final_prediction,
            "probability": round(float(prob_pass if final_prediction == "Pass" else prob_fail), 4),
            "confidence_score": round(float(max(probabilities)), 4),
            "interpretability": f"Result based on a {pass_threshold} decision threshold. Confidence score represents the model's certainty."
        }
    except Exception as e:
        print(f"[ERROR] Prediction failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # Use environment variables for port on Render
    port = int(os.getenv("PORT", 10000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
