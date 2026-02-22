import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Predict', path: '/predict' },
        { name: 'Model Info', path: '/about' },
    ];

    return (
        <nav className="bg-white border-b border-slate-200 px-10 py-6 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
            <Link to="/" className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-200 group-hover:bg-indigo-700 transition-all">
                    S
                </div>
                <div className="flex flex-col">
                    <span className="text-xl font-bold tracking-tight text-slate-900 leading-none">
                        StudentAI
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">
                        Performance Prediction
                    </span>
                </div>
            </Link>

            <div className="flex items-center gap-8">
                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`text-sm font-semibold transition-all relative py-1 ${location.pathname === link.path
                            ? 'text-indigo-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600'
                            : 'text-slate-500 hover:text-slate-900'
                            }`}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;

