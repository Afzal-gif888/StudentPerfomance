import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ModelInsights = () => {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const response = await api.get('/metadata');
                setMetrics(response.data);
            } catch (err) {
                console.error('Metadata fetch failed', err);
            } finally {
                setLoading(false);
            }
        };
        fetchMetadata();
    }, []);

    if (loading) return (
        <div className="section-container flex items-center gap-4">
            <div className="w-4 h-4 bg-indigo-600 rounded-full animate-pulse"></div>
            <span className="font-semibold text-xs uppercase tracking-widest text-slate-400">Loading metrics...</span>
        </div>
    );

    if (!metrics) return (
        <div className="section-container bg-rose-50 border border-rose-100 p-12 rounded-lg">
            <h2 className="text-rose-600 font-bold uppercase tracking-widest mb-2">Error</h2>
            <p className="text-sm text-rose-800 font-medium">Failed to load model details. Please check the backend.</p>
        </div>
    );

    return (
        <div className="section-container space-y-16">
            <header className="space-y-4">
                <h1 className="h1-academic text-slate-900 border-b-2 border-indigo-600 pb-2 inline-block">Model Performance</h1>
                <p className="text-body max-w-2xl text-slate-600">
                    Detailed insights into our AI's accuracy and how it weighs different student factors.
                </p>
            </header>

            <section className="bg-white border border-slate-200 shadow-md rounded-xl overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-8 py-6">
                    <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Performance Metrics</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white text-slate-400 text-[10px] font-bold uppercase tracking-widest border-b border-slate-100">
                                <th className="px-8 py-4">AI Architecture</th>
                                <th className="px-8 py-4">Accuracy</th>
                                <th className="px-8 py-4">F1 Score</th>
                                <th className="px-8 py-4">CV Mean</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {Object.entries(metrics).filter(([k]) => k !== "selected_model" && k !== "feature_importance" && k !== "threshold").map(([name, m]) => (
                                <tr key={name} className={metrics.selected_model === name ? "bg-indigo-50/50" : "bg-white"}>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-slate-900 text-sm">{name}</span>
                                            {metrics.selected_model === name && (
                                                <span className="status-pass text-[9px]">Active</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 font-semibold text-xs text-slate-600">
                                        {m.accuracy ? `${(m.accuracy * 100).toFixed(2)}%` : 'N/A'}
                                    </td>
                                    <td className="px-8 py-6 font-semibold text-xs text-slate-600">
                                        {m.f1_score ? m.f1_score.toFixed(4) : 'N/A'}
                                    </td>
                                    <td className="px-8 py-6 font-semibold text-xs text-slate-600">
                                        {m.cv_mean ? m.cv_mean.toFixed(4) : 'N/A'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <section className="space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Feature Importance</h2>
                        <p className="text-xs text-slate-400">Which factors influence the prediction the most?</p>
                    </div>
                    <div className="space-y-6">
                        {metrics.feature_importance?.map((f, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                    <span>{f.name.replace(/_/g, ' ')}</span>
                                    <span className="text-indigo-600">Weight: {(f.value * 100).toFixed(1)}%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-600 rounded-full transition-all duration-1000" style={{ width: `${f.value * 100}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Summary Insights</h2>
                        <p className="text-xs text-slate-400">Observations from the current model training.</p>
                    </div>
                    <div className="bg-indigo-900 text-white rounded-2xl p-8 space-y-6 shadow-xl">
                        <p className="text-indigo-100 text-sm leading-relaxed font-medium">
                            Our model emphasizes **Study Hours** and **Attendance** as the strongest indicators of success.
                            The current version uses a balanced weight approach to ensure fair predictions for all students.
                        </p>
                        <p className="text-indigo-100 text-sm leading-relaxed font-medium">
                            We've implemented a custom threshold of **{metrics.threshold || '0.65'}** to prioritize accuracy
                            for students at risk, making it a reliable tool for early intervention.
                        </p>
                    </div>
                </section>
            </div>

            <footer className="pt-8 border-t border-slate-200 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>Version 2.5</span>
                <span className="text-emerald-600">System Ready</span>
            </footer>
        </div>
    );
};

export default ModelInsights;

