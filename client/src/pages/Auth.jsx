import React, { useState } from 'react';
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion, AnimatePresence } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function Auth({ isModel = false }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleBackendAuth = async (user, displayNameOverride) => {
        let name = displayNameOverride || user.displayName;
        let email = user.email;
        const result = await axios.post(ServerUrl + "/api/auth/verify", { name, email }, { withCredentials: true });
        dispatch(setUserData(result.data));
        if (!isModel) {
            navigate('/');
        }
    };

    const handleGoogleAuth = async () => {
        try {
            setErrorMsg(null);
            setIsLoading(true);
            const response = await signInWithPopup(auth, provider);
            await handleBackendAuth(response.user);
        } catch (error) {
            console.log(error);
            if (error.response) {
                setErrorMsg(error.response.data.message || "Backend error occurred.");
            } else {
                setErrorMsg(error.message || "Failed to authenticate with Google.");
            }
            dispatch(setUserData(null));
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        try {
            setErrorMsg(null);
            setIsLoading(true);

            if (isLogin) {
                const response = await signInWithEmailAndPassword(auth, email, password);
                await handleBackendAuth(response.user, response.user.displayName || "User");
            } else {
                if (!name.trim()) {
                    setErrorMsg("Please enter your name.");
                    setIsLoading(false);
                    return;
                }
                const response = await createUserWithEmailAndPassword(auth, email, password);
                // Update profile with name
                await updateProfile(response.user, { displayName: name });
                await handleBackendAuth(response.user, name);
            }
        } catch (error) {
            console.log("Firebase Error:", error);
            let message = "Failed to authenticate.";
            if (error.code === 'auth/email-already-in-use') message = "This email is already in use.";
            if (error.code === 'auth/invalid-email') message = "Invalid email format.";
            if (error.code === 'auth/weak-password') message = "Password should be at least 6 characters.";
            if (error.code === 'auth/invalid-credential') message = "Invalid email or password.";
            if (error.code === 'auth/configuration-not-found') message = "Firebase Auth not fully configured. Make sure Email/Password provider is enabled.";
            
            if (error.response) {
                message = error.response.data.message || "Backend connection failed.";
            }

            setErrorMsg(message);
            dispatch(setUserData(null));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`
      w-full 
      ${isModel ? "py-4" : "min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20"}
    `}>
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`
        w-full overflow-hidden
        ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-md p-10 rounded-[32px]"}
        bg-white shadow-2xl border border-gray-200
      `}>
                <div className='flex items-center justify-center gap-3 mb-6'>
                    <div className='bg-black text-white p-2 rounded-lg'>
                        <BsRobot size={18} />
                    </div>
                    <h2 className='font-semibold text-lg'>CareerPulse AI</h2>
                </div>

                <h1 className='text-2xl font-semibold text-center leading-snug mb-2'>
                    {isLogin ? "Welcome Back" : "Create Account"}
                </h1>
                <p className='text-gray-500 text-center text-sm mb-6 flex items-center justify-center gap-2'>
                    <IoSparkles className="text-emerald-500" size={16} /> AI Smart Interview Prep
                </p>

                {errorMsg && (
                    <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} className='mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm text-center'>
                        {errorMsg}
                    </motion.div>
                )}

                <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
                    <AnimatePresence>
                        {!isLogin && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="relative"
                            >
                                <FiUser className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition text-sm"
                                    required={!isLogin}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="relative">
                        <FiMail className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition text-sm"
                            required
                        />
                    </div>

                    <div className="relative">
                        <FiLock className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition text-sm"
                            required
                        />
                    </div>

                    <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ opacity: 0.9, scale: 1.01 }}
                        whileTap={{ opacity: 1, scale: 0.98 }}
                        className='w-full py-3 bg-emerald-600 text-white rounded-xl shadow-md font-medium text-sm disabled:bg-gray-400 disabled:cursor-not-allowed transition'
                    >
                        {isLoading ? "Processing..." : (isLogin ? "Sign In" : "Sign Up")}
                    </motion.button>
                </form>

                <div className="flex items-center gap-4 mb-6">
                    <div className="h-px bg-gray-200 flex-1"></div>
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">or</span>
                    <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                <motion.button
                    onClick={handleGoogleAuth}
                    disabled={isLoading}
                    whileHover={{ opacity: 0.9, scale: 1.01 }}
                    whileTap={{ opacity: 1, scale: 0.98 }}
                    className='w-full flex items-center justify-center gap-3 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl shadow-sm text-sm font-medium hover:bg-gray-50 transition disabled:bg-gray-100 disabled:cursor-not-allowed'
                >
                    <FcGoogle size={20} />
                    Continue with Google
                </motion.button>

                <div className="mt-6 text-center text-sm text-gray-500">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        type="button"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setErrorMsg(null);
                        }}
                        className="text-emerald-600 font-medium hover:underline"
                    >
                        {isLogin ? "Sign Up" : "Sign In"}
                    </button>
                </div>

            </motion.div>
        </div>
    );
}

export default Auth;
