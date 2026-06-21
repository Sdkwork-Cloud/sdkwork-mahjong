import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CreditCard, Database, Zap, ArrowRight, ShieldCheck, Gem, ArrowDownToLine, ArrowUpFromLine, History, Wallet as WalletIcon, CheckCircle2, AlertCircle, Banknote, Smartphone, Link as LinkIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useUserStore } from "sdkwork-mahjong-pc-core";
import { useToast } from "sdkwork-mahjong-pc-commons";

export default function Wallet() {
  const { t } = useTranslation();
  const { profile, addPoints, deductPoints, transactions } = useUserStore();
  const { showToast, ToastComponent } = useToast();
  
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw" | "history">("deposit");
  const [depositAmount, setDepositAmount] = useState<number | null>(2);
  const [customDeposit, setCustomDeposit] = useState<string>("");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [payoutMethod, setPayoutMethod] = useState<"alipay" | "wechat" | "bank">("alipay");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAccountBound, setIsAccountBound] = useState(false);

  const depositPackages = [
    { id: 1, points: 1000, price: 10, bonus: 0, popular: false },
    { id: 2, points: 5000, price: 50, bonus: 200, popular: true },
    { id: 3, points: 10000, price: 100, bonus: 1000, popular: false },
    { id: 4, points: 50000, price: 500, bonus: 10000, popular: false },
  ];

  

  const getDepositPoints = () => {
    if (depositAmount) {
      return depositPackages.find(p => p.id === depositAmount)?.points || 0;
    }
    return parseInt(customDeposit) || 0;
  };

  const getDepositBonus = () => {
    if (depositAmount) {
      return depositPackages.find(p => p.id === depositAmount)?.bonus || 0;
    }
    return 0;
  };

  const points = getDepositPoints();
  const bonus = getDepositBonus();
  const totalPoints = points + bonus;
  const fiatCost = (points / 100).toFixed(2);

  const handleCustomDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setCustomDeposit(val);
    if (val) {
      setDepositAmount(null);
    } else {
      setDepositAmount(1);
    }
  };

  const handleDeposit = () => {
    if (points < 100) {
      showToast(t('min_deposit', '最低充�?100 积分'), 'error');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      addPoints(totalPoints, 'WeChat Pay');
      showToast(t('deposit_success', '充值成功！'), 'success');
      setIsProcessing(false);
      setCustomDeposit("");
    }, 1000);
  };

  const handleWithdraw = () => {
    const amount = parseInt(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      showToast(t('invalid_amount', '请输入有效的提现金额'), 'error');
      return;
    }
    if (amount < 1000) {
      showToast(t('min_withdraw', '最低提现额度为 1000 积分'), 'error');
      return;
    }
    if (profile && profile.points < amount) {
      showToast(t('insufficient_points', '积分不足'), 'error');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const success = deductPoints(amount, payoutMethod);
      if (success) {
        setWithdrawAmount('');
        showToast(t('withdraw_success', '提现申请已提交，预计 24 小时内到�?), 'success');
      }
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 py-12 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center justify-center space-x-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-bold mb-6">
            <WalletIcon size={16} />
            <span>{t('wallet_center', '钱包中心')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">
            {t('manage_your_assets', '管理你的资产')}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl mx-auto font-medium">
            {t('wallet_desc', '充值获取更多积分，或将你在游戏中赢得的积分提现�?)}
          </p>
        </motion.div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        <div className="md:col-span-2 bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-3xl p-8 border border-zinc-700 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          
          <div className="flex items-center space-x-6 z-10 mb-6 md:mb-0">
            <div className="w-20 h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              <Database className="text-blue-400" size={40} />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-1">{t('total_balance', '总资�?(积分)')}</p>
              <p className="text-4xl font-black text-white flex items-center">
                {profile?.points?.toLocaleString() || 0} <span className="text-lg text-zinc-500 ml-2 font-medium">pts</span>
              </p>
            </div>
          </div>
          
          <div className="flex space-x-4 z-10">
            <div className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 flex flex-col items-center">
              <Gem className="text-purple-400 mb-2" size={24} />
              <span className="text-xs text-zinc-400 font-bold">{t('vip_level', 'VIP 等级')}</span>
              <span className="text-lg font-black text-white">{profile?.vipLevel !== 'none' ? `VIP ${profile?.vipLevel.toUpperCase()}` : 'None'}</span>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-center">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
              <Zap className="text-emerald-500" size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400">{t('compute_tokens', '算力余额')}</p>
              <p className="text-2xl font-black text-zinc-900 dark:text-white">{profile?.computeTokens?.toLocaleString() || 0}</p>
            </div>
          </div>
          <button 
            onClick={() => window.location.hash = '#compute'}
            className="w-full py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-xl font-bold text-sm transition-colors"
          >
            {t('go_to_compute', '前往算力中心')}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden relative z-10">
        {/* Tabs */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setActiveTab("deposit")}
            className={`flex-1 py-4 text-center font-bold text-sm transition-colors relative ${
              activeTab === "deposit" ? "text-blue-600 dark:text-blue-400" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <ArrowDownToLine size={18} />
              <span>{t('deposit', '充�?)}</span>
            </div>
            {activeTab === "deposit" && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("withdraw")}
            className={`flex-1 py-4 text-center font-bold text-sm transition-colors relative ${
              activeTab === "withdraw" ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <ArrowUpFromLine size={18} />
              <span>{t('withdraw', '提现')}</span>
            </div>
            {activeTab === "withdraw" && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-4 text-center font-bold text-sm transition-colors relative ${
              activeTab === "history" ? "text-purple-600 dark:text-purple-400" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <History size={18} />
              <span>{t('history', '账单')}</span>
            </div>
            {activeTab === "history" && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            {activeTab === "deposit" && (
              <motion.div
                key="deposit"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                <div className="lg:col-span-2 space-y-6">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{t('select_deposit_amount', '选择充值金�?)}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {depositPackages.map((pkg) => (
                      <div
                        key={pkg.id}
                        onClick={() => { setDepositAmount(pkg.id); setCustomDeposit(""); }}
                        className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center ${
                          depositAmount === pkg.id 
                            ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/10" 
                            : "border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50"
                        }`}
                      >
                        {pkg.popular && (
                          <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-black px-2 py-0.5 rounded-bl-lg uppercase tracking-wider">
                            {t('best_value', '最划算')}
                          </div>
                        )}
                        <Database size={24} className={`mb-2 ${depositAmount === pkg.id ? "text-blue-500" : "text-zinc-400"}`} />
                        <h4 className="text-xl font-black text-zinc-900 dark:text-white">{pkg.points.toLocaleString()}</h4>
                        <p className="text-xs font-bold text-zinc-500 mb-2">Points</p>
                        {pkg.bonus > 0 ? (
                          <div className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                            +{pkg.bonus} {t('bonus', '赠�?)}
                          </div>
                        ) : (
                          <div className="h-5"></div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                      {t('custom_deposit', '自定义充值数�?(积分)')}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={customDeposit}
                        onChange={handleCustomDepositChange}
                        placeholder={t('min_deposit_100', '最�?100 积分起充')}
                        className={`w-full bg-zinc-100 dark:bg-zinc-950 border-2 rounded-2xl px-4 py-4 text-lg font-bold text-zinc-900 dark:text-white outline-none transition-all ${
                          !depositAmount && customDeposit ? "border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "border-transparent focus:border-zinc-300 dark:focus:border-zinc-700"
                        }`}
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">
                        Points
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-950 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 flex flex-col">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">{t('payment_summary', '支付详情')}</h3>
                  
                  <div className="space-y-3 mb-6 flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500">{t('base_points', '基础积分')}</span>
                      <span className="font-bold text-zinc-900 dark:text-white">{points.toLocaleString()}</span>
                    </div>
                    {bonus > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-emerald-500">{t('bonus_points', '额外赠�?)}</span>
                        <span className="font-bold text-emerald-500">+{bonus.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800 my-2"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500 font-medium">{t('total_receive', '总计获得')}</span>
                      <span className="text-2xl font-black text-blue-500 flex items-center">
                        <Database size={20} className="mr-1" />
                        {totalPoints.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 mb-6 border border-zinc-200 dark:border-zinc-800">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500 font-medium">{t('total_cost', '支付金额')}</span>
                      <span className="text-2xl font-black text-zinc-900 dark:text-white flex items-center">
                        <span className="text-lg mr-1">¥</span>
                        {fiatCost}
                      </span>
                    </div>
                  </div>

                  <button 
                    disabled={points < 100 || isProcessing}
                    onClick={handleDeposit}
                    className={`w-full flex items-center justify-center space-x-2 py-4 rounded-2xl font-black text-lg transition-all ${
                      points >= 100 && !isProcessing
                        ? "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-[1.02]" 
                        : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                    }`}
                  >
                    {isProcessing ? (
                      <span className="animate-pulse">{t('processing', '处理�?..')}</span>
                    ) : (
                      <>
                        <CreditCard size={20} />
                        <span>{t('pay_now', '立即支付')}</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === "withdraw" && (
              <motion.div
                key="withdraw"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-2xl mx-auto"
              >
                {!isAccountBound ? (
                  <div className="text-center py-12 space-y-6">
                    <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShieldCheck size={48} className="text-zinc-400" />
                    </div>
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white">
                      {t('bind_account_title', '绑定提现账户')}
                    </h3>
                    <p className="text-zinc-500 max-w-md mx-auto">
                      {t('bind_account_desc', '为了保障您的资金安全，请先绑定您的实名提现账户�?)}
                    </p>
                    <button
                      onClick={() => setIsAccountBound(true)}
                      className="inline-flex items-center space-x-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
                    >
                      <LinkIcon size={18} />
                      <span>{t('bind_now', '立即绑定')}</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                        {t('withdraw_amount', '提现积分数量')}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Database className="text-zinc-400" size={20} />
                        </div>
                        <input
                          type="text"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value.replace(/\D/g, ''))}
                          placeholder={t('min_withdraw_placeholder', '最�?1000 积分起提')}
                          className="w-full pl-12 pr-24 py-4 bg-zinc-100 dark:bg-zinc-950 border-2 border-transparent focus:border-emerald-500 rounded-2xl font-bold text-xl text-zinc-900 dark:text-white outline-none transition-all"
                        />
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                          <button 
                            onClick={() => setWithdrawAmount(profile?.points?.toString() || "0")}
                            className="text-sm font-bold text-emerald-500 hover:text-emerald-600 bg-emerald-500/10 px-3 py-1.5 rounded-lg"
                          >
                            {t('withdraw_all', '全部')}
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-3 px-1">
                        <p className="text-sm text-zinc-500 font-medium">
                          {t('exchange_rate', '兑换比例: 100 积分 = ¥1')}
                        </p>
                        <p className="text-sm text-zinc-500 font-medium">
                          {t('estimated_fiat', '预计到账')}: <strong className="text-emerald-500 text-lg ml-1">¥{Math.floor((parseInt(withdrawAmount) || 0) / 100)}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="mb-8">
                      <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3">
                        {t('payout_method', '提现方式')}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <button
                          onClick={() => setPayoutMethod("alipay")}
                          className={`flex items-center justify-center space-x-2 p-4 rounded-2xl border-2 transition-all ${
                            payoutMethod === "alipay" ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400" : "border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-blue-500/50"
                          }`}
                        >
                          <Smartphone size={20} />
                          <span className="font-bold">支付�?/span>
                        </button>
                        <button
                          onClick={() => setPayoutMethod("wechat")}
                          className={`flex items-center justify-center space-x-2 p-4 rounded-2xl border-2 transition-all ${
                            payoutMethod === "wechat" ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400" : "border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-emerald-500/50"
                          }`}
                        >
                          <Smartphone size={20} />
                          <span className="font-bold">微信支付</span>
                        </button>
                        <button
                          onClick={() => setPayoutMethod("bank")}
                          className={`flex items-center justify-center space-x-2 p-4 rounded-2xl border-2 transition-all ${
                            payoutMethod === "bank" ? "border-amber-500 bg-amber-50/50 dark:bg-amber-900/10 text-amber-600 dark:text-amber-400" : "border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-amber-500/50"
                          }`}
                        >
                          <Banknote size={20} />
                          <span className="font-bold">银行�?/span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 text-sm text-amber-600 dark:text-amber-400 mb-8">
                      <div className="flex items-start space-x-3">
                        <AlertCircle size={20} className="shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold mb-2">{t('withdraw_notice_title', '提现须知�?)}</p>
                          <ul className="list-disc pl-5 space-y-1.5 opacity-90">
                            <li>{t('withdraw_notice_1', '提现申请将在 24 小时内审核处理�?)}</li>
                            <li>{t('withdraw_notice_2', '提现将收�?5% 的手续费�?)}</li>
                            <li>{t('withdraw_notice_3', '请确保您已绑定有效的收款账户�?)}</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <button 
                      disabled={!withdrawAmount || parseInt(withdrawAmount) < 1000 || isProcessing}
                      onClick={handleWithdraw}
                      className={`w-full flex items-center justify-center space-x-2 py-4 rounded-2xl font-black text-lg transition-all ${
                        withdrawAmount && parseInt(withdrawAmount) >= 1000 && !isProcessing
                          ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-[1.02]" 
                          : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                      }`}
                    >
                      {isProcessing ? (
                        <span className="animate-pulse">{t('processing', '处理�?..')}</span>
                      ) : (
                        <>
                          <ArrowUpFromLine size={20} />
                          <span>{t('confirm_withdraw', '确认提现')}</span>
                        </>
                      )}
                    </button>
                  </>
                )}
              </motion.div>
            )}

            {activeTab === "history" && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="space-y-4">
                  {transactions.length === 0 ? (
                    <div className="text-center py-12 text-zinc-500">
                      <History size={48} className="mx-auto mb-4 opacity-20" />
                      <p>{t('no_transactions', '暂无交易记录')}</p>
                    </div>
                  ) : transactions.map((txn) => (
                    <div key={txn.id} className="flex items-center justify-between p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          txn.type === 'deposit' ? 'bg-blue-500/10 text-blue-500' :
                          txn.type === 'withdraw' ? 'bg-emerald-500/10 text-emerald-500' :
                          'bg-purple-500/10 text-purple-500'
                        }`}>
                          {txn.type === 'deposit' ? <ArrowDownToLine size={24} /> :
                           txn.type === 'withdraw' ? <ArrowUpFromLine size={24} /> :
                           <Zap size={24} />}
                        </div>
                        <div>
                          <p className="font-bold text-zinc-900 dark:text-white capitalize">
                            {txn.type === 'deposit' ? t('deposit', '充�?) : 
                             txn.type === 'withdraw' ? t('withdraw', '提现') : 
                             t('exchange', '兑换')}
                          </p>
                          <p className="text-xs text-zinc-500">{txn.date} · {txn.method}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-black text-lg ${
                          txn.amount > 0 ? 'text-blue-500' : 'text-zinc-900 dark:text-white'
                        }`}>
                          {txn.amount > 0 ? '+' : ''}{txn.amount} pts
                        </p>
                        <div className="flex items-center justify-end space-x-1 mt-1">
                          {txn.status === 'success' ? (
                            <>
                              <CheckCircle2 size={12} className="text-emerald-500" />
                              <span className="text-xs text-emerald-500 font-medium">{t('success', '成功')}</span>
                            </>
                          ) : (
                            <>
                              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                              <span className="text-xs text-amber-500 font-medium">{t('processing', '处理�?)}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <ToastComponent />
    </div>
  );
}
