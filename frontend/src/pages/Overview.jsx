import React from 'react';
import { Link } from 'react-router-dom';

const Overview = () => {
    return (
        <div className="section-container space-y-16">
            <header className="space-y-4">
                <h1 className="h1-academic text-slate-900 border-b-2 border-indigo-600 pb-2 inline-block">Student Performance AI</h1>
                <p className="text-body max-w-3xl text-slate-600">
                    Our AI platform helps educators and parents predict student performance patterns
                    to provide timely support and guidance.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    {
                        label: "STEP 1",
                        title: "Data Analysis",
                        desc: "Provide study hours, attendance, and previous grades for our AI to analyze.",
                        color: "border-indigo-600"
                    },
                    {
                        label: "STEP 2",
                        title: "AI Prediction",
                        desc: "Our model processes the data to predict if the student is likely to pass or fail.",
                        color: "border-emerald-600"
                    },
                    {
                        label: "STEP 3",
                        title: "Take Action",
                        desc: "Use the insights to identify areas where the student might need extra help.",
                        color: "border-amber-600"
                    }
                ].map((item, idx) => (
                    <div key={idx} className={`bg-white p-8 border-l-4 ${item.color} shadow-md rounded-r-lg space-y-3`}>
                        <span className="text-[10px] font-bold text-slate-400 tracking-widest">{item.label}</span>
                        <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>

            <section className="bg-indigo-900 rounded-2xl p-10 space-y-8 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-x-10 -translate-y-10"></div>
                <div className="space-y-4 max-w-2xl relative z-10 text-white">
                    <h2 className="text-sm font-bold text-indigo-300 uppercase tracking-widest">Get Started</h2>
                    <p className="text-3xl font-bold leading-tight">
                        Check student performance likelihood in seconds.
                    </p>
                </div>
                <div className="flex flex-wrap gap-4 relative z-10 pt-2">
                    <Link to="/predict" className="btn-neutral bg-white text-indigo-900 hover:bg-slate-100 border-none">Start Prediction</Link>
                    <Link to="/about" className="btn-outline border-white text-white hover:bg-white/10 hover:text-white hover:border-white">View Model Details</Link>
                </div>
            </section>

            <footer className="pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <div className="text-[10px] font-bold text-slate-400 mb-1 uppercase">Technology</div>
                    <div className="text-xs font-semibold text-slate-600">FastAPI & React</div>
                </div>
                <div>
                    <div className="text-[10px] font-bold text-slate-400 mb-1 uppercase">AI Model</div>
                    <div className="text-xs font-semibold text-slate-600">Logistic Regression</div>
                </div>
                <div>
                    <div className="text-[10px] font-bold text-slate-400 mb-1 uppercase">Updates</div>
                    <div className="text-xs font-semibold text-slate-600">Version 2.0</div>
                </div>
                <div>
                    <div className="text-[10px] font-bold text-slate-400 mb-1 uppercase">Status</div>
                    <div className="text-xs font-bold text-emerald-600">Live & Ready</div>
                </div>
            </footer>
        </div>
    );
};

export default Overview;

