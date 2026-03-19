import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Upload, CheckCircle, AlertCircle, Loader2, X, User, Briefcase, Phone, Building2, MessageSquare } from 'lucide-react';

type FormType = 'client' | 'candidate';

export const BookingForm: React.FC = () => {
    const [formType, setFormType] = useState<FormType>('client');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);
        formData.append('type', formType);

        try {
            const response = await fetch('/api/send-mail', {
                method: 'POST',
                body: formData,
            });
            console.log("response in booking form", response);

            const result = await response.json();

            if (response.ok) {
                setStatus('success');
                formRef.current?.reset();
                setFileName('');
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setErrorMessage(result.error || 'Submission failed.');
                setStatus('error');
            }
        } catch (error) {
            console.log("error in booking form", error);
            setErrorMessage('Network error.');
            setStatus('error');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName('');
        }
    };

    const clearFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
            setFileName('');
        }
    };

    return (
        <div className="w-full">
            {/* Segmented Toggle Control */}
            <div className="bg-slate-100 p-1 rounded-2xl mb-8 flex relative border border-slate-200">
                <motion.div
                    className="absolute top-1 bottom-1 bg-white rounded-xl shadow-sm border border-slate-200"
                    initial={false}
                    animate={{
                        left: formType === 'client' ? '4px' : '50%',
                        right: formType === 'client' ? '50%' : '4px'
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <button
                    type="button"
                    className={`flex-1 relative z-10 py-3 text-[0.95rem] font-bold flex items-center justify-center gap-2 transition-colors ${formType === 'client' ? 'text-indigo-600' : 'text-slate-500'}`}
                    onClick={() => { setFormType('client'); setStatus('idle'); }}
                >
                    <Briefcase size={18} />
                    Client
                </button>
                <button
                    type="button"
                    className={`flex-1 relative z-10 py-3 text-[0.95rem] font-bold flex items-center justify-center gap-2 transition-colors ${formType === 'candidate' ? 'text-indigo-600' : 'text-slate-500'}`}
                    onClick={() => { setFormType('candidate'); setStatus('idle'); }}
                >
                    <User size={18} />
                    Candidate
                </button>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-[0.95rem] font-bold text-slate-700 flex items-center gap-2">
                            <User size={14} className="text-slate-400" /> Full Name*
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="John Doe"
                            className="w-full px-5 py-4 bg-white border border-slate-300 rounded-xl text-[1rem] focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all placeholder:text-slate-300 shadow-sm"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[0.95rem] font-bold text-slate-700 flex items-center gap-2">
                            <Send size={14} className="text-slate-400" /> Email Address*
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="john@email.com"
                            className="w-full px-5 py-4 bg-white border border-slate-300 rounded-xl text-[1rem] focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all placeholder:text-slate-300 shadow-sm"
                        />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {formType === 'client' ? (
                        <motion.div
                            key="client"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="grid md:grid-cols-2 gap-6"
                        >
                            <div className="flex flex-col gap-2">
                                <label className="text-[0.95rem] font-bold text-slate-700 flex items-center gap-2">
                                    <Phone size={14} className="text-slate-400" /> Phone Number*
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    placeholder="+91 9537..."
                                    className="w-full px-5 py-4 bg-white border border-slate-300 rounded-xl text-[1rem] focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all placeholder:text-slate-300 shadow-sm"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[0.95rem] font-bold text-slate-700 flex items-center gap-2">
                                    <Building2 size={14} className="text-slate-400" /> Company Name*
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    required
                                    placeholder="Company Ltd."
                                    className="w-full px-5 py-4 bg-white border border-slate-300 rounded-xl text-[1rem] focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all placeholder:text-slate-300 shadow-sm"
                                />
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="candidate"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-col gap-2"
                        >
                            <label className="text-[0.95rem] font-bold text-slate-700 flex items-center gap-2">
                                <Upload size={14} className="text-slate-400" /> CV / Resume* (PDF preferred)
                            </label>
                            <div className={`relative border-2 border-dashed rounded-xl transition-all ${fileName ? 'border-green-500 bg-green-50/30' : 'border-slate-300 hover:border-indigo-400 bg-slate-50/50'}`}>
                                <input
                                    type="file"
                                    id="cv_upload"
                                    name="file"
                                    required={formType === 'candidate'}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                    onChange={handleFileChange}
                                    ref={fileInputRef}
                                    accept=".pdf,.doc,.docx"
                                />
                                <div className="py-6 flex flex-col items-center justify-center gap-2">
                                    {fileName ? (
                                        <div className="flex items-center gap-3 px-4 w-full">
                                            <CheckCircle className="text-green-500 shrink-0" size={20} />
                                            <span className="text-sm font-medium text-slate-700 truncate flex-1">{fileName}</span>
                                            <button type="button" onClick={(e) => { e.stopPropagation(); clearFile(); }} className="p-1 hover:bg-slate-200 rounded-full transition-colors z-20">
                                                <X size={16} className="text-slate-500" />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="text-slate-400" size={24} />
                                            <span className="text-sm text-slate-500">Click to upload your resume</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex flex-col gap-2">
                    <label className="text-[0.95rem] font-bold text-slate-700 flex items-center gap-2">
                        <MessageSquare size={14} className="text-slate-400" /> Message (Optional)
                    </label>
                    <textarea
                        name="message"
                        rows={4}
                        placeholder="Tell us more about your requirements..."
                        className="w-full px-5 py-4 bg-white border border-slate-300 rounded-xl text-[1rem] outline-none resize-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all placeholder:text-slate-300 shadow-sm"
                    ></textarea>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className={`w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold text-[1.2rem] hover:bg-indigo-700 active:scale-[0.99] transition-all flex items-center justify-center shadow-xl shadow-indigo-600/20 group disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                        {status === 'submitting' ? (
                            <>
                                <Loader2 className="animate-spin mr-3" size={24} /> Processing...
                            </>
                        ) : (
                            <>
                                {formType === 'client' ? 'Confirm Booking' : 'Submit Application'}
                                <Send className="ml-3 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </>
                        )}
                    </button>

                    <AnimatePresence>
                        {status === 'success' && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-[0.85rem] text-green-600 font-bold text-center mt-5"
                            >
                                Success! We've received your request and sent a confirmation email.
                            </motion.p>
                        )}
                        {status === 'error' && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-[0.85rem] text-red-500 font-bold text-center mt-5"
                            >
                                {errorMessage}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </form>
        </div>
    );
};
