import React, { useState } from 'react';
import { predictPerformance } from '../services/api';

const Predict = () => {
    const [formData, setFormData] = useState({
        study_hours: '',
        attendance_percentage: '',
        previous_grade: '',
        parental_education: '',
        internet_access: '',
        extracurricular_activity: '',
        sleep_hours: ''
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Convert strings to appropriate types for backend
        const submissionData = {
            study_hours: parseFloat(formData.study_hours),
            attendance_percentage: parseFloat(formData.attendance_percentage),
            previous_grade: parseFloat(formData.previous_grade),
            parental_education: formData.parental_education,
            internet_access: formData.internet_access,
            extracurricular_activity: formData.extracurricular_activity,
            sleep_hours: parseFloat(formData.sleep_hours)
        };

        // Final validation
        const hasMissing = Object.values(submissionData).some(val => val === '' || (typeof val === 'number' && isNaN(val)));
        if (hasMissing) {
            setError('Please fill in all fields with valid numbers.');
            setLoading(false);
            return;
        }

        try {
            const data = await predictPerformance(submissionData);
            setResult(data);
        } catch (err) {
            console.error('Submission failed:', err.response?.data || err.message);
            setError(err.response?.data?.detail?.[0]?.msg || 'Could not connect to the server. Please check if the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="section-container space-y-12">
            <header className="space-y-4">
                <h1 className="h1-academic text-slate-900 border-b-2 border-indigo-600 pb-2 inline-block">Predict Performance</h1>
                <p className="text-body max-w-2xl text-slate-600">
                    Enter student details below to get an AI-powered prediction of academic success.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-7">
                    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 p-8 space-y-8 shadow-md rounded-lg">
                        <h3 className="text-sm font-bold text-slate-800 border-l-4 border-indigo-600 pl-3">Student Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {[
                                { label: 'Study Hours / Week', name: 'study_hours', type: 'number', step: '0.1' },
                                { label: 'Attendance %', name: 'attendance_percentage', type: 'number', step: '0.1' },
                                { label: 'Previous Grade %', name: 'previous_grade', type: 'number', step: '0.1' },
                                { label: 'Sleep Hours', name: 'sleep_hours', type: 'number', step: '0.1' }
                            ].map((field) => (
                                <div key={field.name} className="flex flex-col space-y-1">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-tight">{field.label}</label>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        step={field.step}
                                        required
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        className="border-b border-slate-300 py-2 focus:border-indigo-600 outline-none transition-all text-slate-800"
                                        placeholder={`Enter ${field.label}`}
                                    />
                                </div>
                            ))}
                            <div className="flex flex-col space-y-1">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-tight">Parental Education</label>
                                <select name="parental_education" required value={formData.parental_education} onChange={handleChange} className="border-b border-slate-300 py-2 focus:border-indigo-600 outline-none bg-transparent text-slate-800 cursor-pointer">
                                    <option value="">Select Level</option>
                                    <option value="High School">High School</option>
                                    <option value="Bachelor">Bachelor</option>
                                    <option value="Master">Master</option>
                                    <option value="PhD">PhD</option>
                                </select>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-tight">Internet Access</label>
                                <select name="internet_access" required value={formData.internet_access} onChange={handleChange} className="border-b border-slate-300 py-2 focus:border-indigo-600 outline-none bg-transparent text-slate-800 cursor-pointer">
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-tight">Extracurricular Activity</label>
                                <select name="extracurricular_activity" required value={formData.extracurricular_activity} onChange={handleChange} className="border-b border-slate-300 py-2 focus:border-indigo-600 outline-none bg-transparent text-slate-800 cursor-pointer">
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" disabled={loading} className="btn-neutral w-full rounded-md shadow-lg shadow-indigo-100 py-4 text-lg font-bold">
                            {loading ? 'Predicting...' : 'Show Prediction'}
                        </button>
                    </form>
                </div>

                <aside className="lg:col-span-5 space-y-6">
                    {result ? (
                        <div className={`p-8 space-y-6 shadow-2xl rounded-xl border-t-8 ${result.prediction === 'Pass' ? 'bg-emerald-600 border-emerald-500' : 'bg-rose-600 border-rose-500'} text-white`}>
                            <div className="space-y-1">
                                <h3 className="text-xs font-bold uppercase tracking-widest opacity-80">Predicted Result</h3>
                                <div className="text-5xl font-black">{result.prediction.toUpperCase()}</div>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-white/20">
                                <div className="flex justify-between items-end">
                                    <span className="text-xs font-bold uppercase opacity-80">Confidence Level</span>
                                    <span className="text-2xl font-bold">
                                        {((result.probability || result.confidence_score || 0) * 100).toFixed(1)}%
                                    </span>
                                </div>
                                <div className="w-full h-3 bg-black/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${(result.probability || result.confidence_score || 0) * 100}%` }}></div>
                                </div>
                            </div>

                            <div className="bg-black/10 p-4 rounded-lg space-y-2 border border-white/10">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-80">Information</h4>
                                <p className="text-sm leading-relaxed opacity-90">
                                    {result.interpretability}
                                </p>
                            </div>

                            <button onClick={() => setResult(null)} className="w-full py-2 text-xs font-bold uppercase tracking-widest bg-white/10 hover:bg-white/20 rounded-md transition-colors border border-white/20">
                                Clear Result
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white border border-dashed border-slate-300 p-12 flex flex-col items-center justify-center text-center space-y-4 rounded-xl min-h-[300px]">
                            <div className="w-16 h-16 bg-slate-50 flex items-center justify-center text-slate-200 text-4xl font-bold rounded-full mb-2">?</div>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Waiting for input</p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-rose-50 border-l-4 border-rose-500 p-5 rounded-md shadow-sm">
                            <h3 className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-1">Error</h3>
                            <p className="text-xs text-rose-800 leading-relaxed whitespace-pre-wrap">{error}</p>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
};

export default Predict;


