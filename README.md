# Comparative Analysis of Predictive Determinants in Student Performance

## Abstract
This project presents a research-oriented framework for evaluating academic success using machine learning methodologies. By comparing linear baselines (Logistic Regression) with ensemble methods (Random Forest), we identify critical features that contribute to student retention and success.

## 1. Problem Definition
Academic performance is traditionally viewed as a result of intellectual capability. This study hypothesizes that systematic engagement (attendance) and environmental variables (parental education, resource access) provide significant predictive signals that can be used for early intervention.

## 2. Methodology
### 2.1 Dataset
Synthetic data was generated following Gaussian and Normal distributions with controlled biases to simulate realistic academic scenarios in a high-school environment.

### 2.2 Feature Engineering
- **Numerical Scaling**: Standard Scaling applied to continuous variables (attendance, study hours).
- **Encoding**: One-Hot Encoding for categorical socio-economic factors.
- **Dimensionality**: 7 core features were utilized for initial inference.

### 2.3 Model Selection
- **Logistic Regression**: Used as a baseline to evaluate linear separability.
- **Random Forest**: Selected for its ability to capture non-linear interactions between variables.

## 3. Evaluation
Models are cross-validated (k=5) to ensure stability. Performance metrics include:
- **Accuracy**: Overall classification correctness.
- **F1 Score**: Harmonic mean of precision and recall (prioritized due to class importance).
- **Feature Importance**: Gini importance (Random Forest) and normalized coefficients (LogReg).

## 4. Engineering Decisions
- **Backend**: FastAPI for robust RESTful communication.
- **Frontend**: Typography-driven minimalist React dashboard focused on interpretability.
- **Reproducibility**: `metrics.json` is generated during training to ensure transparency in reported results.

## 5. Local Orchestration

### Prerequisites
- Python 3.10+
- Node.js 18+

### Execution
1. **Model Training**:
   ```bash
   cd backend
   python train_model.py
   ```
2. **Server Startup**:
   ```bash
   python main.py
   ```
3. **Interface Startup**:
   ```bash
   cd frontend
   npm run dev
   ```

## 6. Limitations and Ethics
The current system is probabilistic. It should be used as a supplementary tool for educators and not as a deterministic metric for student capability. Predictions are limited by the quality of input observations.

---
*Research Engineering Lead: senior-ml-arch*
*Date: February 2026*
