import React, { useState } from "react";
import { X, Zap, Crown, Check, Star, Shield, ArrowRight, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";

interface StoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StoreModal({ isOpen, onClose }: StoreModalProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"vip" | "points">("vip");
  const [selectedPointPack, setSelectedPointPack] = useState<number | null>(null);

  const vipPlans = [
    {
      id: "pro",
      name: t('pro_plan', 'Pro 计划'),
      price: "¥29",
      period: t('per_month', '/ 月'),
      features: [
        t('pro_feature_1', '无限次 AI 对战'),
        t('pro_feature_2', '解锁所有高级智能体'),
        t('pro_feature_3', '专属 Pro 徽章'),
        t('pro_feature_4', '优先匹配权')
      ],
      color: "from-blue-500 to-indigo-600",
      icon: <Shield className="text-blue-400" size={24} />
    },
    {
      id: "peak",
      name: t('peak_plan', '巅峰计划'),
      price: "¥99",
      period: t('per_month', '/ 月'),
      features: [
        t('peak_feature_1', '包含所有 Pro 特权'),
        t('peak_feature_2', '自定义 AI 智能体接入'),
        t('peak_feature_3', '专属巅峰特效与称号'),
        t('peak_feature_4', '每月赠送 10,000 积分'),
        t('peak_feature_5', '1v1 专属客服')
      ],
      color: "from-rose-500 to-orange-600",
      icon: <Crown className="text-yellow-400" size={24} />,
      popular: true
    }
  ];

  const pointPacks = [
    { id: 1, points: 1000, bonus: 0, price: "¥10" },
    { id: 2, points: 5000, bonus: 500, price: "¥50", popular: true },
    { id: 3, points: 10000, bonus: 1500, price: "¥100" },
    { id: 4, points: 30000, bonus: 6000, price: "¥300" },
    { id: 5, points: 50000, bonus: 12000, price: "¥500" },
    { id: 6, points: 100000, bonus: 30000, price: "¥1000", bestValue: true },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800/50 relative overflow-hidden shrink-0 gap-4">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="relative z-10 flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-orange-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
                  <Zap className="text-white" size={24} fill="currentColor" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                    {t('store_center', '商城中心')}
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                    {t('store_desc', '获取特权与积分，助力巅峰对决')}
                  </p>
                </div>
              </div>
              
              {/* VIP Progress */}
              <div className="relative z-10 flex-1 max-w-xs bg-zinc-100 dark:bg-zinc-900/80 rounded-xl p-3 border border-zinc-200 dark:border-zinc-800">
                <div className="flex justify-between items-end mb-1">
                  <div className="flex items-center space-x-1">
                    <Crown size={14} className="text-yellow-500" />
                    <span className="text-xs font-bold text-zinc-900 dark:text-white">VIP 3</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">1,250 / 5,000</span>
                </div>
                <div className="h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 w-1/4 rounded-full"></div>
                </div>
                <p className="text-[10px] text-zinc-500 mt-1 text-right">{t('recharge_to_upgrade', { points: '3,750', level: '4' })}</p>
              </div>

              <button
                onClick={onClose}
                className="absolute top-4 right-4 sm:relative sm:top-0 sm:right-0 z-10 p-2 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex p-4 gap-2 bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800/50 shrink-0 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setActiveTab("vip")}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${
                  activeTab === "vip"
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm border border-zinc-200 dark:border-zinc-700"
                    : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
                }`}
              >
                <Crown size={18} className={activeTab === "vip" ? "text-yellow-500" : ""} />
                <span>{t('vip_privileges', 'VIP 特权')}</span>
              </button>
              <button
                onClick={() => setActiveTab("points")}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${
                  activeTab === "points"
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm border border-zinc-200 dark:border-zinc-700"
                    : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
                }`}
              >
                <Zap size={18} className={activeTab === "points" ? "text-orange-500" : ""} />
                <span>{t('points_recharge', '积分充值')}</span>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">
              <AnimatePresence mode="wait">
                {activeTab === "vip" ? (
                  <motion.div
                    key="vip"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {vipPlans.map((plan) => (
                      <div
                        key={plan.id}
                        className={`relative rounded-3xl p-1 ${
                          plan.popular ? "bg-gradient-to-b from-rose-500 to-orange-600" : "bg-zinc-200 dark:bg-zinc-800"
                        }`}
                      >
                        {plan.popular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-rose-500 to-orange-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg flex items-center space-x-1 z-10">
                            <Star size={12} fill="currentColor" />
                            <span>{t('most_popular', '最受欢迎')}</span>
                          </div>
                        )}
                        <div className="bg-white dark:bg-zinc-950 rounded-[22px] p-6 h-full flex flex-col">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-lg`}>
                              {plan.icon}
                            </div>
                            <h3 className="text-2xl font-black text-zinc-900 dark:text-white">{plan.name}</h3>
                          </div>
                          <div className="mb-6 flex items-end">
                            <span className="text-4xl font-black text-zinc-900 dark:text-white">{plan.price}</span>
                            <span className="text-zinc-500 dark:text-zinc-400 font-medium ml-1 mb-1">{plan.period}</span>
                          </div>
                          <ul className="space-y-4 mb-8 flex-1">
                            {plan.features.map((feature, i) => (
                              <li key={i} className="flex items-start space-x-3">
                                <div className="mt-0.5 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full p-0.5 shrink-0">
                                  <Check size={14} strokeWidth={3} />
                                </div>
                                <span className="text-zinc-700 dark:text-zinc-300 font-medium text-sm leading-tight">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <button className={`w-full py-4 rounded-xl font-black text-white transition-all shadow-lg ${
                            plan.popular 
                              ? "bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 shadow-rose-500/30 hover:shadow-rose-500/50" 
                              : "bg-zinc-900 dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200"
                          }`}>
                            {t('subscribe_now', '立即订阅')}
                          </button>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="points"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 rounded-2xl p-4 mb-6 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-500/20 rounded-xl flex items-center justify-center">
                          <Zap className="text-orange-600 dark:text-orange-400" size={20} fill="currentColor" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-orange-800 dark:text-orange-200">{t('current_points', '当前积分')}</p>
                          <p className="text-2xl font-black text-orange-600 dark:text-orange-400 font-mono">4,250</p>
                        </div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <p className="text-xs text-orange-600/80 dark:text-orange-400/80 font-medium">{t('points_usage', '积分可用于参与竞技场、购买道具等')}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {pointPacks.map((pack) => (
                        <div
                          key={pack.id}
                          onClick={() => setSelectedPointPack(pack.id)}
                          className={`relative cursor-pointer rounded-2xl border-2 transition-all p-5 flex flex-col items-center justify-center text-center ${
                            selectedPointPack === pack.id
                              ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.2)] scale-[1.02]"
                              : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-orange-300 dark:hover:border-orange-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                          }`}
                        >
                          {pack.popular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md whitespace-nowrap">
                              {t('hot_sale', '热卖')}
                            </div>
                          )}
                          {pack.bestValue && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md whitespace-nowrap">
                              {t('best_value', '超值')}
                            </div>
                          )}
                          
                          <div className="flex items-center justify-center space-x-1 mb-2">
                            <Zap className="text-orange-500" size={24} fill="currentColor" />
                            <span className="text-2xl font-black text-zinc-900 dark:text-white font-mono">{pack.points.toLocaleString()}</span>
                          </div>
                          
                          {pack.bonus > 0 ? (
                            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/20 px-2 py-1 rounded-md mb-4">
                              {t('bonus_points', '赠送')} {pack.bonus.toLocaleString()}
                            </div>
                          ) : (
                            <div className="h-6 mb-4"></div> // Spacer
                          )}
                          
                          <div className={`w-full py-2 rounded-xl font-black transition-colors ${
                            selectedPointPack === pack.id
                              ? "bg-orange-500 text-white"
                              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                          }`}>
                            {pack.price}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex justify-end">
                      <button 
                        disabled={!selectedPointPack}
                        className="flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white px-8 py-4 rounded-xl font-black text-lg transition-all shadow-[0_0_20px_rgba(249,115,22,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                      >
                        <CreditCard size={20} />
                        <span>{t('confirm_payment', '确认支付')}</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
