import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Lock, User, ArrowRight, Shield, Zap, CheckCircle2, ChevronLeft, Smartphone, Globe, Moon, Sun, Monitor, QrCode } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useConfigStore, useUserStore } from "sdkwork-mahjong-pc-core";
import { useTheme } from "next-themes";

interface AuthProps {
  setCurrentView: (view: string) => void;
}

type AuthMode = "login" | "register" | "forgot" | "phone";

export default function Auth({ setCurrentView }: AuthProps) {
  const { t, i18n } = useTranslation();
  const { region, language, setRegion, setLanguage } = useConfigStore();
  const { login } = useUserStore();
  const { theme, setTheme } = useTheme();
  
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (mode === "login" || mode === "register" || mode === "phone") {
        login({
          id: `user-${Math.floor(Math.random() * 10000)}`,
          username: name || email.split('@')[0] || 'Player_New',
          avatar: 'https://picsum.photos/seed/user1/200/200',
          level: 1,
          exp: 0,
          points: 1000,
          computeTokens: 100,
          vipLevel: 'none',
        });
        setCurrentView("dashboard");
      } else {
        setMode("login");
      }
    }, 1500);
  };

  const toggleLanguage = () => {
    const newLang = language === 'zh' ? 'en' : 'zh';
    setLanguage(newLang);
  };

  const toggleRegion = () => {
    const newRegion = region === 'CN' ? 'GLOBAL' : 'CN';
    setRegion(newRegion);
  };

  const cycleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('system');
    else setTheme('dark');
  };

  return (
    <div className="flex h-screen w-full bg-zinc-50 dark:bg-zinc-950 overflow-hidden transition-colors duration-300">
      {/* Top Controls */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
        <button 
          onClick={toggleRegion}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300/50 dark:hover:bg-zinc-700/50 transition-colors text-sm font-medium backdrop-blur-md"
        >
          <Globe size={16} />
          {region === 'CN' ? t('region_cn') : t('region_global')}
        </button>
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300/50 dark:hover:bg-zinc-700/50 transition-colors text-sm font-medium backdrop-blur-md"
        >
          {language === 'zh' ? 'EN' : '中文'}
        </button>
        <button 
          onClick={cycleTheme}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300/50 dark:hover:bg-zinc-700/50 transition-colors backdrop-blur-md"
        >
          {theme === 'dark' ? <Moon size={16} /> : theme === 'light' ? <Sun size={16} /> : <Monitor size={16} />}
        </button>
      </div>

      {/* Left Panel - Visuals */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 via-zinc-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-950 z-0 transition-colors duration-300"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-rose-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-orange-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse" style={{ animationDelay: "2s" }}></div>
        
        <div className="relative z-10 max-w-lg px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow-[0_0_30px_rgba(225,29,72,0.4)]">
                <Zap className="text-white" size={24} />
              </div>
              <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">{t('app_name')}</h1>
            </div>
            
            <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-white dark:to-zinc-400 leading-tight mb-6">
              {t('app_desc')}
            </h2>
            
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-12 font-medium leading-relaxed">
              {t('auth_hero_desc')}
            </p>

            <div className="space-y-6">
              {[
                { icon: <Shield size={20} />, title: t('fair_play'), desc: t('fair_play_desc') },
                { icon: <Zap size={20} />, title: t('fast_match'), desc: t('fast_match_desc') },
                { icon: <CheckCircle2 size={20} />, title: t('growth_system'), desc: t('growth_system_desc') }
              ].map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 flex items-center justify-center text-rose-500 shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-zinc-900 dark:text-white font-bold mb-1">{feature.title}</h3>
                    <p className="text-zinc-500 text-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-3xl border-l border-zinc-200/50 dark:border-zinc-800/50">
        <div className="w-full max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              {/* QR Code Section (Left) */}
              <div className="hidden md:flex flex-col items-center justify-center w-1/2 p-12 bg-zinc-50/50 dark:bg-zinc-950/50 border-r border-zinc-200 dark:border-zinc-800 relative">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{t('scan_to_login', '扫码安全登录')}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 text-center">{t('scan_desc', '请使�?OpenClaw App 或微信扫码登�?)}</p>
                
                <div className="relative p-4 bg-white rounded-2xl shadow-sm border border-zinc-200 group cursor-pointer hover:shadow-md transition-all">
                  {/* QR Code Image / SVG */}
                  <div className="w-48 h-48 bg-zinc-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                    <QrCode size={120} className="text-zinc-800" />
                    {/* Scanning animation line */}
                    <motion.div 
                      animate={{ y: [0, 192, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute top-0 left-0 w-full h-0.5 bg-rose-500 shadow-[0_0_10px_rgba(225,29,72,0.8)]"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-2 backdrop-blur-sm">
                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path>
                          <path d="M21 3v5h-5"></path>
                        </svg>
                      </div>
                      <span className="text-white text-xs font-bold">{t('refresh_qr', '刷新二维�?)}</span>
                    </div>
                  </div>
                  {/* Logo in center of QR */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md z-10">
                    <Zap className="text-rose-500" size={20} />
                  </div>
                </div>
                
                <div className="mt-8 flex items-center gap-4 text-sm text-zinc-500 font-medium">
                  <div className="flex items-center gap-1"><Shield size={16} className="text-emerald-500"/> {t('secure_login', '安全')}</div>
                  <div className="flex items-center gap-1"><Zap size={16} className="text-orange-500"/> {t('fast_login', '快捷')}</div>
                </div>
              </div>

              {/* Form Section (Right) */}
              <div className="w-full md:w-1/2 p-8 md:p-12">
                <div className="mb-8">
                {mode === "forgot" && (
                  <button 
                    onClick={() => setMode("login")}
                    className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white mb-6 transition-colors"
                  >
                    <ChevronLeft size={16} className="mr-1" /> {t('back_to_login')}
                  </button>
                )}
                <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-2">
                  {mode === "login" || mode === "phone" ? t('welcome_back') : mode === "register" ? t('create_account') : t('reset_password')}
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                  {mode === "login" || mode === "phone"
                    ? t('sign_in_to_continue') 
                    : mode === "register" 
                    ? t('join_us_desc') 
                    : t('enter_email_reset')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {mode === "register" && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider ml-1">{t('nickname')}</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User size={18} className="text-zinc-400 dark:text-zinc-500" />
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                        placeholder={t('nickname_placeholder')}
                      />
                    </div>
                  </div>
                )}

                {mode === "phone" ? (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider ml-1">{t('phone_number')}</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Smartphone size={18} className="text-zinc-400 dark:text-zinc-500" />
                        </div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                          placeholder={t('phone_placeholder')}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider ml-1">{t('verification_code')}</label>
                      <div className="relative flex gap-2">
                        <div className="relative flex-1">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock size={18} className="text-zinc-400 dark:text-zinc-500" />
                          </div>
                          <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                            className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                            placeholder={t('code_placeholder')}
                          />
                        </div>
                        <button type="button" className="px-4 py-3 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl text-sm font-bold transition-colors whitespace-nowrap">
                          {t('send_code')}
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider ml-1">{t('email')}</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail size={18} className="text-zinc-400 dark:text-zinc-500" />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                          placeholder={t('email_placeholder')}
                        />
                      </div>
                    </div>

                    {mode !== "forgot" && (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between ml-1">
                          <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{t('password')}</label>
                          {mode === "login" && (
                            <button 
                              type="button"
                              onClick={() => setMode("forgot")}
                              className="text-xs font-bold text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                            >
                              {t('forgot_password')}
                            </button>
                          )}
                        </div>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock size={18} className="text-zinc-400 dark:text-zinc-500" />
                          </div>
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                            placeholder="•••••••�?
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}

                {mode === "login" && (
                  <div className="flex items-center ml-1">
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 text-rose-500 focus:ring-rose-500 focus:ring-offset-zinc-100 dark:focus:ring-offset-zinc-900"
                    />
                    <label htmlFor="remember" className="ml-2 text-sm text-zinc-600 dark:text-zinc-400 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">
                      {t('remember_me')}
                    </label>
                  </div>
                )}

                {mode === "register" && (
                  <div className="flex items-start ml-1">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      className="w-4 h-4 mt-0.5 rounded border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 text-rose-500 focus:ring-rose-500 focus:ring-offset-zinc-100 dark:focus:ring-offset-zinc-900"
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-zinc-600 dark:text-zinc-400 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">
                      {t('agree_to_terms')} <a href="#" className="text-rose-500 hover:underline">{t('terms_of_service')}</a> {t('and')} <a href="#" className="text-rose-500 hover:underline">{t('privacy_policy')}</a>
                    </label>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(225,29,72,0.3)] transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>{mode === "login" || mode === "phone" ? t('login') : mode === "register" ? t('register_account') : t('send_reset_link')}</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>

              {(mode === "login" || mode === "phone") && (
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-zinc-200 dark:border-zinc-800"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400">{t('or_continue_with')}</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {region === 'CN' ? (
                      <>
                        <button 
                          type="button"
                          onClick={() => setMode("phone")}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-zinc-700 dark:text-zinc-300 font-medium"
                        >
                          <Smartphone size={18} />
                          <span>{t('login_with_phone')}</span>
                        </button>
                        <button 
                          type="button"
                          onClick={() => {
                            setIsLoading(true);
                            setTimeout(() => { setIsLoading(false); setCurrentView("dashboard"); }, 1500);
                          }}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-[#07C160] font-medium"
                        >
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                            <path d="M8.5,13.5 C7.67157288,13.5 7,12.8284271 7,12 C7,11.1715729 7.67157288,10.5 8.5,10.5 C9.32842712,10.5 10,11.1715729 10,12 C10,12.8284271 9.32842712,13.5 8.5,13.5 Z M15.5,13.5 C14.6715729,13.5 14,12.8284271 14,12 C14,11.1715729 14.6715729,10.5 15.5,10.5 C16.3284271,10.5 17,11.1715729 17,12 C17,12.8284271 16.3284271,13.5 15.5,13.5 Z M12,3 C6.4771525,3 2,6.80557963 2,11.5 C2,14.1610492 3.41113224,16.5361239 5.61719602,18.0016625 C5.44143491,18.8805753 4.90483842,20.2222222 4.90483842,20.2222222 C4.90483842,20.2222222 6.51475133,20.1666667 7.84273577,19.3888889 C9.11717326,19.782079 10.5186053,20 12,20 C17.5228475,20 22,16.1944204 22,11.5 C22,6.80557963 17.5228475,3 12,3 Z" />
                          </svg>
                          <span>{t('login_with_wechat')}</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          type="button"
                          onClick={() => {
                            setIsLoading(true);
                            setTimeout(() => { setIsLoading(false); setCurrentView("dashboard"); }, 1500);
                          }}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-zinc-700 dark:text-zinc-300 font-medium"
                        >
                          <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                          </svg>
                          <span>Google</span>
                        </button>
                        <button 
                          type="button"
                          onClick={() => {
                            setIsLoading(true);
                            setTimeout(() => { setIsLoading(false); setCurrentView("dashboard"); }, 1500);
                          }}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-zinc-900 dark:text-white font-medium"
                        >
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          <span>GitHub</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-8 text-center">
                {mode === "login" || mode === "phone" ? (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {t('no_account')}{" "}
                    <button onClick={() => setMode("register")} className="text-rose-500 font-bold hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                      {t('register_now')}
                    </button>
                  </p>
                ) : mode === "register" ? (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {t('have_account')}{" "}
                    <button onClick={() => setMode("login")} className="text-rose-500 font-bold hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                      {t('login_directly')}
                    </button>
                  </p>
                ) : null}
              </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
