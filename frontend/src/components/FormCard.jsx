import React from 'react';
import { BookOpen, Calendar, Award, GraduationCap, Wifi, Users, Moon } from 'lucide-react';

const FormCard = ({ formData, setFormData, onSubmit, loading }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'study_hours' || name === 'attendance_percentage' || name === 'previous_grade' || name === 'sleep_hours'
                ? parseFloat(value)
                : value
        }));
    };

    const inputs = [
        { name: 'study_hours', label: 'Study Hours/Week', type: 'number', icon: <BookOpen />, placeholder: 'e.g. 25', min: 0, max: 100 },
        { name: 'attendance_percentage', label: 'Attendance %', type: 'number', icon: <Calendar />, placeholder: 'e.g. 90', min: 0, max: 100 },
        { name: 'previous_grade', label: 'Previous Grade', type: 'number', icon: <Award />, placeholder: 'e.g. 80', min: 0, max: 100 },
        { name: 'sleep_hours', label: 'Sleep Hours/Night', type: 'number', icon: <Moon />, placeholder: 'e.g. 7', min: 0, max: 24 },
    ];

    const selects = [
        { name: 'parental_education', label: 'Parental Education', icon: <GraduationCap />, options: ['High School', 'Bachelor', 'Master', 'PhD'] },
        { name: 'internet_access', label: 'Internet Access', icon: <Wifi />, options: ['Yes', 'No'] },
        { name: 'extracurricular_activity', label: 'Extracurriculars', icon: <Users />, options: ['Yes', 'No'] },
    ];

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 animate-slide-up">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Student Information</h2>
            <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {inputs.map((input) => (
                        <div key={input.name} className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <span className="text-primary-500">{input.icon}</span>
                                {input.label}
                            </label>
                            <input
                                type={input.type}
                                name={input.name}
                                value={formData[input.name]}
                                onChange={handleChange}
                                placeholder={input.placeholder}
                                min={input.min}
                                max={input.max}
                                required
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all duration-200 outline-none"
                            />
                        </div>
                    ))}

                    {selects.map((select) => (
                        <div key={select.name} className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <span className="text-primary-500">{select.icon}</span>
                                {select.label}
                            </label>
                            <select
                                name={select.name}
                                value={formData[select.name]}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all duration-200 outline-none bg-white font-medium"
                            >
                                <option value="">Select Option</option>
                                {select.options.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 transform active:scale-95 shadow-lg shadow-primary-500/25 ${loading
                            ? 'bg-slate-400 cursor-not-allowed'
                            : 'bg-primary-600 hover:bg-primary-700 hover:-translate-y-1'
                        }`}
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Analyzing Performance...
                        </div>
                    ) : (
                        'Generate Prediction'
                    )}
                </button>
            </form>
        </div>
    );
};

export default FormCard;
