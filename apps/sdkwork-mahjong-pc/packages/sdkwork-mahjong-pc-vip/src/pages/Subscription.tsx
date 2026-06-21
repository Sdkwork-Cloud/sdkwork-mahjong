import React, { useState } from "react";
import { motion } from "motion/react";
import { Check, Star, Zap, Shield, Crown, Sparkles, ArrowRight, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useUserStore } from "sdkwork-mahjong-pc-core";
import { useToast } from "sdkwork-mahjong-pc-commons";

interface SubscriptionProps {
  setCurrentView: (view: string) => void;
}

export default function Subscription({ setCurrentView }: SubscriptionProps) {
  const { t } = useTranslation();
  const { profile, setVipLevel } = useUserStore();
  const { showToast, ToastComponent } = useToast();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const handleSubscribe = (planId: string, level: 'none' | 'pro' | 'peak') => {
    if (level === 'none' || profile?.vipLevel === level) return;
    
    setIsProcessing(planId);
    setTimeout(() => {
      const days = billingCycle === 'monthly' ? 30 : 365;
      setVipLevel(level, days);
      setIsProcessing(null);
      showToast(t('subscription_success', '订阅成功�?), 'success');
    }, 1500);
  };

  const plans = [
    {
      id: 'basic',
      level: 'none' as const,
      name: t('basic_plan'),
      desc: t('basic_plan_desc'),
      price: billingCycle === "monthly" ? t('free') : t('free'),
      period: "",
      icon: <User size={24} className="text-zinc-400" />,
      features: [
        t('feature_basic_1'),
        t('feature_basic_2'),
        t('feature_basic_3'),
        t('feature_basic_4'),
        t('feature_basic_5'),
      ],
      buttonText: profile?.vipLevel === 'none' ? t('current_plan') : t('downgrade'),
      buttonStyle: profile?.vipLevel === 'none' 
        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 cursor-default border border-zinc-200 dark:border-zinc-700"
        : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800",
      popular: false,
    },
    {
      id: 'pro',
      level: 'pro' as const,
      name: t('pro_plan'),
      desc: t('pro_plan_desc'),
      price: billingCycle === "monthly" ? "¥49" : "¥490",
      period: billingCycle === "monthly" ? t('per_month') : t('per_year'),
      icon: <Star size={24} className="text-orange-400" />,
      features: [
        t('feature_pro_1'),
        t('feature_pro_2'),
        t('feature_pro_3'),
        t('feature_pro_4'),
        t('feature_pro_5'),
        t('feature_pro_6'),
      ],
      buttonText: profile?.vipLevel === 'pro' ? t('current_plan') : t('upgrade_pro'),
      buttonStyle: profile?.vipLevel === 'pro'
        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 cursor-default border border-zinc-200 dark:border-zinc-700"
        : "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] border border-orange-400/50",
      popular: true,
    },
    {
      id: 'peak',
      level: 'peak' as const,
      name: t('peak_plan'),
      desc: t('peak_plan_desc'),
      price: billingCycle === "monthly" ? "¥199" : "¥1990",
      period: billingCycle === "monthly" ? t('per_month') : t('per_year'),
      icon: <Crown size={24} className="text-yellow-400" />,
      features: [
        t('feature_peak_1'),
        t('feature_peak_2'),
        t('feature_peak_3'),
        t('feature_peak_4'),
        t('feature_peak_5'),
        t('feature_peak_6'),
      ],
      buttonText: profile?.vipLevel === 'peak' ? t('current_plan') : t('get_peak_power'),
      buttonStyle: profile?.vipLevel === 'peak'
        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 cursor-default border border-zinc-200 dark:border-zinc-700"
        : "bg-white dark:bg-zinc-900 text-yellow-600 dark:text-yellow-400 border border-yellow-500/50 hover:bg-yellow-50 dark:hover:bg-yellow-500/10 shadow-[0_0_15px_rgba(250,204,21,0.1)]",
      popular: false,
    },
  ];

  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">
      <ToastComponent />
      {/* Header */}
      <div className="text-center space-y-4 py-12 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center justify-center space-x-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 text-orange-600 dark:text-orange-400 text-sm font-bold mb-6">
            <Sparkles size={16} />
            <span>{t('unlock_infinite')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">
            {t('choose_your')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 dark:from-orange-400 dark:to-rose-500">{t('competitive_privilege')}</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl mx-auto font-medium">
            {t('subscription_desc')}
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center mt-10 relative z-10"
        >
          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 inline-flex relative">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`relative z-10 px-8 py-2.5 text-sm font-bold rounded-xl transition-colors ${
                billingCycle === "monthly" ? "text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              {t('pay_monthly')}
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`relative z-10 px-8 py-2.5 text-sm font-bold rounded-xl transition-colors flex items-center space-x-2 ${
                billingCycle === "yearly" ? "text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              <span>{t('pay_yearly')}</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] uppercase tracking-wider border border-emerald-200 dark:border-emerald-500/20">{t('save_20')}</span>
            </button>
            <div
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-zinc-100 dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700/50 transition-transform duration-300 ease-in-out ${
                billingCycle === "yearly" ? "translate-x-[calc(100%+6px)]" : "translate-x-0"
              }`}
              style={{ left: "6px" }}
            ></div>
          </div>
        </motion.div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className={`relative rounded-3xl p-8 flex flex-col ${
              plan.popular
                ? "bg-white dark:bg-zinc-900 border-2 border-orange-500/50 shadow-2xl transform md:-translate-y-4"
                : "bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xs font-black uppercase tracking-wider rounded-full shadow-lg">
                {t('most_popular')}
              </div>
            )}

            <div className="mb-8">
              <div className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-6 shadow-inner">
                {plan.icon}
              </div>
              <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">{plan.name}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium h-10">{plan.desc}</p>
            </div>

            <div className="mb-8 flex items-baseline">
              <span className="text-5xl font-black text-zinc-900 dark:text-white tracking-tight">{plan.price}</span>
              <span className="text-zinc-500 font-medium ml-2">{plan.period}</span>
            </div>

            <button 
              onClick={() => handleSubscribe(plan.id, plan.level)}
              disabled={profile?.vipLevel === plan.level || isProcessing === plan.id}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all mb-8 ${plan.buttonStyle}`}
            >
              {isProcessing === plan.id ? (
                <span className="animate-pulse">{t('processing', '处理�?..')}</span>
              ) : (
                <>
                  <span>{plan.buttonText}</span>
                  {plan.popular && profile?.vipLevel !== 'pro' && <ArrowRight size={18} />}
                </>
              )}
            </button>

            <div className="space-y-4 flex-1">
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">{t('included_privileges')}</p>
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-500/20">
                    <Check size={12} className="text-emerald-500 dark:text-emerald-400" />
                  </div>
                  <span className="text-sm text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* FAQ or Trust Indicators */}
      <div className="mt-20 pt-12 border-t border-zinc-200 dark:border-zinc-800/50 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
            <Shield className="text-emerald-500 dark:text-emerald-400" size={20} />
          </div>
          <h4 className="text-zinc-900 dark:text-white font-bold">{t('secure_payment')}</h4>
          <p className="text-sm text-zinc-500">{t('secure_payment_desc')}</p>
        </div>
        <div className="space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
            <Zap className="text-orange-500 dark:text-orange-400" size={20} />
          </div>
          <h4 className="text-zinc-900 dark:text-white font-bold">{t('instant_activation')}</h4>
          <p className="text-sm text-zinc-500">{t('instant_activation_desc')}</p>
        </div>
        <div className="space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
            <Star className="text-rose-500 dark:text-rose-400" size={20} />
          </div>
          <h4 className="text-zinc-900 dark:text-white font-bold">{t('cancel_anytime')}</h4>
          <p className="text-sm text-zinc-500">{t('cancel_anytime_desc')}</p>
        </div>
      </div>
    </div>
  );
}
