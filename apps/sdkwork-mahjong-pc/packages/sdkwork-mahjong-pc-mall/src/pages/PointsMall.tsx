import React, { useState } from "react";
import { motion } from "motion/react";
import { ShoppingBag, Database, Gift, Cpu, Star, Zap, ArrowRight, Ticket } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useUserStore } from "sdkwork-mahjong-pc-core";
import { useToast } from "sdkwork-mahjong-pc-commons";

export default function PointsMall() {
  const { t } = useTranslation();
  const { profile, deductPoints, addComputeTokens } = useUserStore();
  const { showToast, ToastComponent } = useToast();
  const [activeCategory, setActiveCategory] = useState("all");
  const [isExchanging, setIsExchanging] = useState<number | null>(null);

  const categories = [
    { id: "all", name: t('all_items', '全部商品'), icon: <ShoppingBag size={16} /> },
    { id: "compute", name: t('compute_power', '算力直充'), icon: <Cpu size={16} /> },
    { id: "ip", name: t('game_ip', '游戏周边'), icon: <Gift size={16} /> },
    { id: "virtual", name: t('virtual_items', '虚拟道具'), icon: <Star size={16} /> }
  ];

  const items = [
    {
      id: 1,
      name: "100K Tokens",
      category: "compute",
      descKey: "item_100k_desc",
      price: 1000,
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&q=80",
      icon: <Zap size={24} className="text-emerald-500" />,
      tagKey: "tag_hot"
    },
    {
      id: 2,
      name: "500K Tokens",
      category: "compute",
      descKey: "item_500k_desc",
      price: 4800,
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=500&q=80",
      icon: <Zap size={24} className="text-emerald-500" />,
      tagKey: "tag_rec"
    },
    {
      id: 3,
      nameKey: "item_cyber_figure_name",
      category: "ip",
      descKey: "item_cyber_figure_desc",
      price: 150000,
      image: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=500&q=80",
      icon: <Gift size={24} className="text-rose-500" />,
      tagKey: "tag_limited"
    },
    {
      id: 4,
      nameKey: "item_star_book_name",
      category: "ip",
      descKey: "item_star_book_desc",
      price: 80000,
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&q=80",
      icon: <Gift size={24} className="text-rose-500" />,
      tagKey: "tag_new"
    },
    {
      id: 5,
      nameKey: "item_pass_name",
      category: "virtual",
      descKey: "item_pass_desc",
      price: 12000,
      image: "https://images.unsplash.com/photo-1614680376593-902f74a9cb0d?w=500&q=80",
      icon: <Ticket size={24} className="text-orange-500" />,
      tagKey: "tag_season"
    },
    {
      id: 6,
      nameKey: "item_skin_neon_name",
      category: "virtual",
      descKey: "item_skin_neon_desc",
      price: 25000,
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80",
      icon: <Star size={24} className="text-orange-500" />,
      tagKey: "tag_epic"
    }
  ];

  const filteredItems = activeCategory === "all" ? items : items.filter(item => item.category === activeCategory);

  const getItemName = (item: typeof items[0]) => {
    if ('nameKey' in item && item.nameKey) {
      return t(item.nameKey);
    }
    return item.name || '';
  };

  const handleExchange = (item: typeof items[0]) => {
    if (!profile || profile.points < item.price) {
      showToast(t('insufficient_points'), 'error');
      return;
    }

    setIsExchanging(item.id);
    setTimeout(() => {
      const success = deductPoints(item.price);
      if (success) {
        if (item.category === 'compute') {
          const itemName = item.name || '';
          // Extract amount from name (e.g., "100K Tokens" -> 100000)
          const amountMatch = itemName.match(/(\d+)(K|M)/);
          if (amountMatch) {
            const num = parseInt(amountMatch[1]);
            const multiplier = amountMatch[2] === 'K' ? 1000 : 1000000;
            addComputeTokens(num * multiplier);
          }
        }
        showToast(t('exchange_success'), 'success');
      }
      setIsExchanging(null);
    }, 1000);
  };

  return (
    <div id="points-mall-view" className="space-y-8 pb-12 max-w-7xl mx-auto">
      <ToastComponent />
      {/* Header */}
      <div className="relative h-[300px] rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl flex items-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80')] opacity-30 bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent"></div>
        
        <div className="relative z-10 p-10 w-full md:w-2/3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-bold mb-4">
            <ShoppingBag size={16} />
            <span>{t('points_mall')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-lg">
            {t('exchange_rewards')}
          </h1>
          <p className="text-lg text-zinc-300 font-medium max-w-xl">
            {t('mall_desc')}
          </p>
          
          <div className="mt-8 flex items-center space-x-4 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 inline-flex">
            <div className="w-12 h-12 bg-rose-500/20 rounded-xl flex items-center justify-center">
              <Database className="text-rose-500" size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-400">{t('my_points')}</p>
              <p className="text-2xl font-black text-white">{profile?.points?.toLocaleString() || 0}</p>
            </div>
            <button className="ml-4 bg-white text-black px-4 py-2 rounded-xl font-bold text-sm hover:bg-zinc-200 transition-colors">
              {t('get_more')}
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex space-x-2 overflow-x-auto pb-2 hide-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap ${
              activeCategory === cat.id
                ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg"
                : "bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800"
            }`}
          >
            {cat.icon}
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            key={item.id}
            className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-rose-500/50 transition-all group shadow-sm hover:shadow-xl hover:shadow-rose-500/10 flex flex-col"
          >
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 bg-zinc-900/20 group-hover:bg-transparent transition-colors z-10"></div>
              <img 
                src={item.image} 
                alt={getItemName(item)} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider border border-white/10">
                {t(item.tagKey)}
              </div>
              <div className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 dark:bg-black/60 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg border border-zinc-200 dark:border-zinc-700">
                {item.icon}
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-2">{getItemName(item)}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mb-6 flex-1">{t(item.descKey)}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center space-x-2">
                  <Database size={20} className="text-rose-500" />
                  <span className="text-2xl font-black text-zinc-900 dark:text-white">{item.price.toLocaleString()}</span>
                </div>
                <button 
                  onClick={() => handleExchange(item)}
                  disabled={isExchanging === item.id || (profile?.points || 0) < item.price}
                  className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors flex items-center space-x-1 ${
                    (profile?.points || 0) < item.price
                      ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                      : "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500"
                  }`}
                >
                  {isExchanging === item.id ? (
                    <span className="animate-pulse">{t('processing')}</span>
                  ) : (
                    <>
                      <span>{t('exchange')}</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
