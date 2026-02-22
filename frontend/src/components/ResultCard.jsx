import React from 'react';
import { CheckCircle2, XCircle, BarChart3, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const ResultCard = ({ result }) => {
    if (!result) return null;

    const isPass = result.prediction === 'Pass';
    const confidence = Math.round(result.confidence_score * 100);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-2xl shadow-2xl border border-slate-100 overflow-hidden relative"
        >
            <div className={`absolute top-0 left-0 w-full h-2 ${isPass ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>

            <div className="flex flex-col items-center text-center">
                <div className={`p-4 rounded-full mb-4 ${isPass ? 'bg-emerald-50' : 'bg-rose-50'}`}>
                    {isPass ? (
                        <CheckCircle2 className="w-16 h-16 text-emerald-600" />
                    ) : (
                        <XCircle className="w-16 h-16 text-rose-600" />
                    )}
                </div>

                <h3 className="text-3xl font-black text-slate-900 mb-2">
                    Projected Result: <span className={isPass ? 'text-emerald-600' : 'text-rose-600'}>{result.prediction.toUpperCase()}</span>
                </h3>

                <p className="text-slate-600 mb-8 max-w-md">
                    Based on our machine learning analysis, there is a high probability of this outcome given the academic and lifestyle factors provided.
                </p>

                <div className="w-full space-y-4">
                    <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2 text-slate-700 font-bold">
                            <BarChart3 className="w-5 h-5 text-primary-500" />
                            Confidence Level
                        </div>
                        <span className="text-2xl font-black text-primary-600">{confidence}%</span>
                    </div>

                    <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${confidence}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full ${isPass ? 'bg-emerald-500' : 'bg-rose-500'}`}
                        ></motion.div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full mt-8">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Status</div>
                        <div className={`font-bold ${isPass ? 'text-emerald-700' : 'text-rose-700'}`}>
                            {isPass ? 'Optimal' : 'Needs Support'}
                        </div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Trend</div>
                        <div className="flex items-center gap-1 font-bold text-slate-700">
                            <TrendingUp className="w-4 h-4 text-primary-500" />
                            Stable
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ResultCard;
