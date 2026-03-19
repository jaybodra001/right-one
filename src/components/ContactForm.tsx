import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Upload, CheckCircle, AlertCircle, Loader2, X, User, Briefcase, Phone, Building2, MessageSquare } from 'lucide-react';

type FormType = 'client' | 'candidate';

const BookNowForm: React.FC = () => {
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
        formData.append('type', formType); // Explicitly send the type
        
        try {
            const response = await fetch('/api/send-mail', {
                method: 'POST',
                body: formData,
                // Do NOT set Content-Type header when using FormData; the browser sets it automatically with the boundary.
            });

            const result = await response.json();

            if (response.ok) {
                setStatus('success');
                formRef.current?.reset();
                setFileName('');
                // Success message persists until user clicks out or after timeout
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setErrorMessage(result.error || 'Submission failed. Please check your data.');
                setStatus('error');
            }
        } catch (error) {
            setErrorMessage('Network error. Unable to connect to the server.');
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
        <div className="book-form-wrapper">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="book-card"
            >
                <div className="book-card-header">
                    <span className="badge">Booking</span>
                    <h2>Book Now</h2>
                    <p>Select your category and fill in the details.</p>
                </div>

                {/* Segmented Toggle Control */}
                <div className="form-toggle-container">
                    <div className="toggle-bg">
                        <motion.div 
                            className="toggle-active"
                            animate={{ x: formType === 'client' ? '0%' : '100%' }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                        <button 
                            type="button" 
                            className={`toggle-btn ${formType === 'client' ? 'active' : ''}`}
                            onClick={() => { setFormType('client'); setStatus('idle'); }}
                        >
                            <Briefcase size={16} />
                            Client
                        </button>
                        <button 
                            type="button" 
                            className={`toggle-btn ${formType === 'candidate' ? 'active' : ''}`}
                            onClick={() => { setFormType('candidate'); setStatus('idle'); }}
                        >
                            <User size={16} />
                            Candidate
                        </button>
                    </div>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="premium-form">
                    <div className="form-grid">
                        <div className="form-item full">
                            <label><User size={14} /> Full Name*</label>
                            <input type="text" name="name" required placeholder="Enter your full name" />
                        </div>

                        <div className="form-item full">
                            <label><Send size={14} /> Email Address*</label>
                            <input type="email" name="email" required placeholder="name@company.com" />
                        </div>

                        {/* Dynamic Fields for Client */}
                        <AnimatePresence mode="wait">
                            {formType === 'client' ? (
                                <motion.div 
                                    key="client-fields"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="dynamic-container"
                                >
                                    <div className="form-grid">
                                        <div className="form-item full">
                                            <label><Phone size={14} /> Phone Number*</label>
                                            <input type="tel" name="phone" required placeholder="+1 (555) 000-0000" />
                                        </div>
                                        <div className="form-item full">
                                            <label><Building2 size={14} /> Company Name*</label>
                                            <input type="text" name="company" required placeholder="Your business legal name" />
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="candidate-fields"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="dynamic-container"
                                >
                                    <div className="form-item full">
                                        <label><Upload size={14} /> CV / Resume* (PDF preferred)</label>
                                        <div className={`file-drop-zone ${fileName ? 'active' : ''}`}>
                                            <input 
                                                type="file" 
                                                id="cv_file" 
                                                name="file" 
                                                required={formType === 'candidate'}
                                                onChange={handleFileChange}
                                                ref={fileInputRef}
                                                accept=".pdf,.doc,.docx"
                                            />
                                            <label htmlFor="cv_file">
                                                {fileName ? (
                                                    <div className="file-preview">
                                                        <CheckCircle className="icon-success" size={16} />
                                                        <span>{fileName}</span>
                                                        <button type="button" onClick={clearFile} className="btn-clear"><X size={14}/></button>
                                                    </div>
                                                ) : (
                                                    <div className="file-placeholder">
                                                        <Upload size={18} />
                                                        <span>Click to choose file</span>
                                                    </div>
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="form-item full">
                            <label><MessageSquare size={14} /> Message (Optional)</label>
                            <textarea name="message" rows={3} placeholder="Tell us more about your needs..."></textarea>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={status === 'submitting'}
                        className={`btn-book ${status === 'submitting' ? 'loading' : ''}`}
                        type="submit"
                    >
                        {status === 'submitting' ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Processing...
                            </>
                        ) : (
                            <>
                                Submit {formType === 'client' ? 'Booking' : 'Application'}
                            </>
                        )}
                    </motion.button>
                </form>

                <AnimatePresence>
                    {status === 'success' && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="msg success"
                        >
                            <CheckCircle size={18} />
                            Success! A confirmation email has been sent.
                        </motion.div>
                    )}
                    {status === 'error' && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="msg error"
                        >
                            <AlertCircle size={18} />
                            {errorMessage}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <style dangerouslySetInnerHTML={{ __html: `
                .book-form-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 60px 20px;
                    min-height: 100vh;
                    background: #0f172a; /* Sleek dark blue background */
                    font-family: 'Inter', sans-serif;
                }

                .book-card {
                    background: rgba(30, 41, 59, 0.7);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 24px;
                    padding: 40px;
                    width: 100%;
                    max-width: 500px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                    position: relative;
                }

                .book-card-header h2 {
                    margin: 12px 0 8px 0;
                    color: white;
                    font-size: 2rem;
                    font-weight: 800;
                    letter-spacing: -0.02em;
                }

                .book-card-header p {
                    color: #94a3b8;
                    margin-bottom: 32px;
                    font-size: 0.95rem;
                }

                .badge {
                    background: rgba(99, 102, 241, 0.2);
                    color: #818cf8;
                    padding: 4px 12px;
                    border-radius: 99px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                /* Toggle Switch Styles */
                .form-toggle-container {
                    background: rgba(15, 23, 42, 0.8);
                    padding: 6px;
                    border-radius: 16px;
                    margin-bottom: 30px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                .toggle-bg {
                    display: flex;
                    position: relative;
                    height: 48px;
                }

                .toggle-active {
                    position: absolute;
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%);
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
                }

                .toggle-btn {
                    flex: 1;
                    position: relative;
                    z-index: 1;
                    background: none;
                    border: none;
                    color: #94a3b8;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: color 0.3s;
                    font-size: 0.9rem;
                }

                .toggle-btn.active {
                    color: white;
                }

                /* Form Elements */
                .premium-form {
                    display: flex;
                    flex-direction: column;
                    gap: 22px;
                }

                .form-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 18px;
                }

                .form-item {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .form-item label {
                    color: #cbd5e1;
                    font-size: 0.85rem;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .form-item input, 
                .form-item textarea {
                    background: rgba(15, 23, 42, 0.6);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 14px;
                    padding: 14px 18px;
                    color: white;
                    font-size: 0.95rem;
                    transition: all 0.2s;
                }

                .form-item input:focus, 
                .form-item textarea:focus {
                    outline: none;
                    border-color: #6366f1;
                    background: rgba(15, 23, 42, 0.9);
                    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
                }

                /* File Upload Area */
                .file-drop-zone {
                    border: 2px dashed rgba(255, 255, 255, 0.1);
                    border-radius: 14px;
                    transition: all 0.2s;
                    background: rgba(15, 23, 42, 0.3);
                }

                .file-drop-zone:hover {
                    border-color: rgba(99, 102, 241, 0.5);
                    background: rgba(99, 102, 241, 0.05);
                }

                .file-drop-zone.active {
                    border-color: #10b981;
                    background: rgba(16, 185, 129, 0.05);
                    border-style: solid;
                }

                .file-drop-zone input {
                    display: none;
                }

                .file-drop-zone label {
                    display: flex;
                    padding: 16px;
                    cursor: pointer;
                    width: 100%;
                    justify-content: center;
                }

                .file-placeholder {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    color: #94a3b8;
                }

                .file-preview {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    width: 100%;
                    color: white;
                }

                .file-preview span {
                    flex: 1;
                    font-size: 0.85rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .btn-clear {
                    background: rgba(255, 255, 255, 0.05);
                    border: none;
                    color: #94a3b8;
                    padding: 4px;
                    border-radius: 50%;
                    cursor: pointer;
                }

                .btn-clear:hover {
                    background: #ef4444;
                    color: white;
                }

                /* Submission Button */
                .btn-book {
                    margin-top: 12px;
                    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
                    color: white;
                    border: none;
                    border-radius: 14px;
                    padding: 16px;
                    font-size: 1rem;
                    font-weight: 700;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    box-shadow: 0 10px 20px -5px rgba(99, 102, 241, 0.5);
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                .btn-book:disabled {
                    opacity: 0.6;
                    cursor: wait;
                    transform: scale(0.98);
                }

                .animate-spin {
                    animation: spin 1s linear infinite;
                }

                /* Status Messages */
                .msg {
                    margin-top: 24px;
                    padding: 16px;
                    border-radius: 12px;
                    font-size: 0.9rem;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-weight: 500;
                }

                .msg.success {
                    color: #10b981;
                    background: rgba(16, 185, 129, 0.1);
                    border: 1px solid rgba(16, 185, 129, 0.2);
                }

                .msg.error {
                    color: #ef4444;
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid rgba(239, 68, 68, 0.2);
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            ` }} />
        </div>
    );
};

export default BookNowForm;
