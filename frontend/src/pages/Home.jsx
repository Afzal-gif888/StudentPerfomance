import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Sparkles, ShieldCheck, Zap, ArrowRight, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="space-y-24 pb-20">
            {/* Hero Section */}
            <section className="relative pt-20 px-6">
                <div className="max-w-6xl mx-auto text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-600 font-bold text-sm mb-4"
                    >
                        <Sparkles className="w-4 h-4" />
                        Empowering Education with AI
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 leading-tight"
                    >
                        Predict Performance <br />
                        <span className="gradient-text">Shape the Future</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
                    >
                        Utilize advanced machine learning to predict academic outcomes based on lifestyle and study habits. Get instant data-driven insights to boost student success.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                    >
                        <Link to="/predict" className="btn-primary flex items-center gap-2 text-lg px-8 py-4 w-full sm:w-auto">
                            Start Prediction <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link to="/about" className="px-8 py-4 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 transition-all w-full sm:w-auto">
                            How it works
                        </Link>
                    </motion.div>
                </div>

                {/* Background blobs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full max-w-4xl opacity-20 pointer-events-none">
                    <div className="absolute top-0 -left-20 w-72 h-72 bg-primary-400 rounded-full blur-[100px] animate-pulse-slow"></div>
                    <div className="absolute top-20 -right-20 w-96 h-96 bg-indigo-400 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
                </div>
            </section>

            {/* Features */}
            <section className="px-6 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: <Brain className="text-primary-600" />, title: 'Advanced RandomForest', desc: 'Powerful ensemble model trained on diverse academic datasets for high precision.' },
                        { icon: <ShieldCheck className="text-emerald-600" />, title: 'Reliable Insights', desc: 'Evidence-based predictions that highlight areas for potential academic improvement.' },
                        { icon: <Zap className="text-amber-500" />, title: 'Instant Results', desc: 'Get predictions in milliseconds through our optimized FastAPI backend infrastructure.' }
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Visual Component Preview */}
            <section className="px-6 max-w-5xl mx-auto">
                <div className="bg-slate-900 rounded-[3rem] p-12 overflow-hidden relative">
                    <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                        <div className="flex-1 space-y-6">
                            <div className="bg-primary-500/20 text-primary-400 font-bold px-4 py-1 rounded-full w-fit">Next Gen Prediction</div>
                            <h2 className="text-4xl font-bold text-white tracking-tight">Personalized Academic Analytics</h2>
                            <p className="text-slate-400">Our model analyzes 7+ key features including attendance, study hours, and parental impact to provide a holistic projection of performance.</p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 text-white">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                                    90%+ Confidence
                                </div>
                                <div className="flex items-center gap-2 text-white">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                                    Real-time Analysis
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 bg-white/5 backdrop-blur-3xl rounded-3xl p-6 border border-white/10 w-full">
                            <div className="space-y-4">
                                <div className="h-2 w-1/2 bg-white/20 rounded"></div>
                                <div className="h-10 w-full bg-white/10 rounded-lg"></div>
                                <div className="h-10 w-full bg-white/10 rounded-lg"></div>
                                <div className="h-12 w-full bg-primary-600 rounded-lg animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary-600 rounded-full blur-[80px] opacity-40"></div>
                </div>
            </section>
        </div>
    );
};

export default Home;
