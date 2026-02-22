import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Overview from './pages/Overview';
import Predict from './pages/Predict';
import ModelInsights from './pages/About'; // We repurposed About.jsx as ModelInsights

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col font-sans selection:bg-slate-100">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Overview />} />
                        <Route path="/predict" element={<Predict />} />
                        <Route path="/about" element={<ModelInsights />} />
                    </Routes>
                </main>

                <footer className="py-8 px-8 border-t border-slate-100 text-center">
                    <p className="text-xs font-semibold text-slate-400">
                        © 2026 StudentAI | Academic Performance Predictor
                    </p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
