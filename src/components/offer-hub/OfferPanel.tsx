import React, { useState, useCallback, memo } from 'react';
import { X, Gift, Tag, Trophy, Copy, ExternalLink, Check, Clock, Star, ChevronRight, Bell, Percent, Sword, Calendar, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { OfferData } from './OfferIndicator';
import { Button } from '@/components/ui/button';

interface OfferPanelProps {
  isOpen: boolean;
  onClose: () => void;
  offerData?: OfferData;
}

export const OfferPanel: React.FC<OfferPanelProps> = memo(({ isOpen, onClose, offerData }) => {
  const [activeTab, setActiveTab] = useState<'codes' | 'offers' | 'rewards'>('codes');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCopyCode = useCallback((code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(code);
      toast({
        title: "Code Copied!",
        description: "Gift code has been copied to clipboard",
      });
      setTimeout(() => setCopiedCode(null), 2000);
    });
  }, [toast]);

  const handleTabChange = useCallback((tabId: 'codes' | 'offers' | 'rewards') => {
    setActiveTab(tabId);
  }, []);

  const giftCodes = React.useMemo(() => [
    { 
      id: 1, 
      code: 'EPICDRAGON',
      description: 'Epic Dragon Mount',
      imageDescription: 'A majestic celestial dragon mount with glowing wings and ethereal effects. This rare mount leaves a trail of stardust as you soar through the skies.',
      rewards: [
        { type: 'Mount', amount: 'Celestial Dragon Mount - Legendary flying companion that illuminates the night sky with ethereal wings. Leaves trails of cosmic energy in flight.' }
      ],
      expires: '5 days'
    },
    { 
      id: 2, 
      code: 'SUMMERFEST',
      description: 'Summer Special Bundle',
      rewards: [
        { type: 'Legendary Skin', amount: 'Dragon Slayer', icon: 'Sword' },
        { type: 'Gems', amount: '1000', icon: 'Gift' }
      ],
      expires: '7 days'
    },
    {
      id: 3,
      code: 'WARLORDRISING',
      description: 'Warlord Conquest Campaign',
      banners: [
        { text: 'Season 2', color: 'purple' },
        { text: 'Exclusive', color: 'red' },
        { text: 'Campaign', color: 'blue' }
      ],
      gameEvent: {
        title: "Warlord Rising Event",
        description: "Join the epic conquest campaign and lead your armies to victory. Unlock exclusive campaign rewards and experience the new storyline with unique battle scenarios."
      },
      rewards: [
        { type: 'Campaign Access', amount: 'Full Season 2 Access', icon: 'Sword' },
        { type: 'Commander', amount: 'General Ironheart', icon: 'Star' },
        { type: 'Battle Points', amount: '5,000', icon: 'Gift' },
        { type: 'Unique Banner', amount: 'Warlord Insignia', icon: 'Gift' }
      ],
      expires: '14 days'
    }
  ], []);

  const offers = React.useMemo(() => [
    { 
      id: 1, 
      type: 'Discount', 
      title: '50% Off In-App Purchase', 
      description: 'First purchase only', 
      expires: '24 hours',
      isUrgent: true,
      shape: 'hexagon'
    },
    { 
      id: 2, 
      type: '% Off', 
      title: '75% Off Premium Currency', 
      description: 'Limited time offer', 
      expires: '3 days',
      image: 'https://via.placeholder.com/60x60/A855F7/FFFFFF?text=75%'
    },
    { 
      id: 3, 
      type: 'Item', 
      title: 'Free Legendary Sword', 
      description: 'Login daily for 7 days', 
      expires: '14 days',
      isImportant: true,
      shape: 'diamond'
    },
  ], []);

  const rewards = React.useMemo(() => [
    { 
      id: 1, 
      title: 'Daily Login Streak', 
      description: 'Log in daily to earn rewards', 
      currentDay: 5,
      totalDays: 7,
      days: [
        { day: 1, reward: '100 Gold', claimed: true },
        { day: 2, reward: '200 Gold', claimed: true },
        { day: 3, reward: '50 Gems', claimed: true },
        { day: 4, reward: '500 Gold', claimed: true },
        { day: 5, reward: '100 Gems', claimed: true },
        { day: 6, reward: '1000 Gold', claimed: false },
        { day: 7, reward: 'Epic Chest', claimed: false }
      ],
      icon: 'Calendar',
      color: 'emerald'
    },
    { 
      id: 2, 
      title: 'BlueStacks Points', 
      description: '250 points earned', 
      progress: 25,
      icon: 'Star',
      color: 'amber',
      nextReward: 'Epic Chest',
      pointsNeeded: 750
    },
    { 
      id: 3, 
      title: 'Friend Referrals', 
      description: '2/5 referrals', 
      progress: 40,
      icon: 'Users',
      color: 'blue',
      nextReward: 'Legendary Skin',
      remaining: 3
    },
  ], []);

  const getOfferIcon = useCallback((type: string, shape?: string) => {
    if (type === 'Discount') {
      return <Tag className="h-6 w-6 text-green-400" />;
    } else if (type === '% Off') {
      return <Percent className="h-6 w-6 text-purple-400" />;
    } else {
      return <Gift className="h-6 w-6 text-orange-400" />;
    }
  }, []);

  const getOfferIconContainer = useCallback((type: string, shape?: string) => {
    return (
      <div className={cn(
        "p-3 flex items-center justify-center",
        shape === 'hexagon' && "clip-path-hexagon bg-green-900/50 border border-green-500/30",
        shape === 'diamond' && "clip-path-diamond bg-purple-900/50 border border-purple-500/30",
        !shape && "rounded-md bg-purple-500/30 border border-purple-500/20"
      )}>
        {getOfferIcon(type, shape)}
      </div>
    );
  }, [getOfferIcon]);

  const tabs = React.useMemo(() => [
    { id: 'codes', icon: Gift, label: 'Gift Codes', color: 'blue' },
    { id: 'offers', icon: Tag, label: 'Offers', color: 'purple' },
    { id: 'rewards', icon: Trophy, label: 'Rewards', color: 'amber' }
  ], []);

  return (
    <div
      className={cn(
        "fixed top-0 right-0 h-full w-[380px] bg-gradient-to-b from-gray-950 to-gray-900 border-l border-gray-800 shadow-xl z-[100] transition-all duration-300 ease-out backdrop-blur-lg",
        isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Enhanced Header */}
        <div className="flex-none bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 backdrop-blur-md p-4 border-b border-gray-800 shadow-lg">
          <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-white flex items-center">
              <div className="p-2 bg-gradient-to-br from-blue-900/40 to-blue-800/40 rounded-full mr-2 shadow-inner border border-blue-700/30">
              <Gift className="h-5 w-5 text-blue-400" />
            </div>
              <span className="bg-gradient-to-r from-white via-blue-100 to-gray-200 bg-clip-text text-transparent font-bold">
              Offer Hub
            </span>
          </h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full h-8 w-8 p-0 transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
          <p className="text-xs text-gray-400 ml-1">Discover exclusive rewards and special offers</p>
        </div>

        {/* Enhanced Tabs */}
        <div className="flex-none border-b border-gray-800 bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 p-1 gap-1">
          {tabs.map(tab => (
          <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id as 'codes' | 'offers' | 'rewards')}
            className={cn(
                "flex-1 py-2.5 px-2 text-sm font-medium rounded-md transition-all duration-200 relative group",
                activeTab === tab.id
                  ? tab.id === 'codes' 
                    ? "text-blue-400 bg-blue-900/20 shadow-sm border border-blue-500/30"
                    : tab.id === 'offers'
                    ? "text-purple-400 bg-purple-900/20 shadow-sm border border-purple-500/30"
                    : "text-amber-400 bg-amber-900/20 shadow-sm border border-amber-500/30"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800 border border-transparent"
            )}
          >
            <div className="flex items-center justify-center">
                <tab.icon className={cn(
                  "mr-1.5 h-4 w-4",
                  activeTab === tab.id
                    ? tab.id === 'codes' 
                      ? "text-blue-400"
                      : tab.id === 'offers'
                      ? "text-purple-400"
                      : "text-amber-400"
                    : "text-gray-500"
                )} />
                {tab.label}
            </div>
              {activeTab === tab.id && (
                <div className={cn(
                  "absolute bottom-0 left-0 h-0.5 w-full rounded-full",
                  tab.id === 'codes' 
                    ? "bg-blue-400"
                    : tab.id === 'offers'
                    ? "bg-purple-400"
                    : "bg-amber-400"
                )} />
              )}
          </button>
          ))}
        </div>

        {/* Enhanced Content */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-4 space-y-4">
          {activeTab === 'codes' && (
            <div className="space-y-4">
              {giftCodes.map((item) => (
                <div 
                  key={item.id} 
                  className="group relative bg-gradient-to-br from-gray-900 to-gray-950 backdrop-blur-lg rounded-lg p-4 shadow-lg border border-gray-800 hover:border-gray-700 transition-all duration-200 hover:shadow-blue-900/20 hover:shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/5 to-blue-800/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative flex justify-between items-start">
                    <div className="flex w-full">
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex flex-col">
                            <h3 className="text-sm font-medium text-gray-100 group-hover:text-white transition-colors">{item.description}</h3>
                            {item.banners && (
                              <div className="flex gap-1.5 mt-1.5">
                                {item.banners.map((banner, index) => (
                                  <div 
                                    key={index} 
                                    className={cn(
                                      "text-[10px] font-medium px-2 py-0.5 rounded-full border shadow-sm",
                                      banner.color === 'red' && "bg-red-900/40 text-red-300 border-red-500/30",
                                      banner.color === 'blue' && "bg-blue-900/40 text-blue-300 border-blue-500/30",
                                      banner.color === 'green' && "bg-green-900/40 text-green-300 border-green-500/30",
                                      banner.color === 'amber' && "bg-amber-900/40 text-amber-300 border-amber-500/30",
                                      banner.color === 'purple' && "bg-purple-900/40 text-purple-300 border-purple-500/30"
                                    )}
                                  >
                                    {banner.text}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center text-xs text-gray-400 bg-gray-900 px-2 py-1 rounded-full border border-gray-800">
                            <Clock className="h-3.5 w-3.5 mr-1 text-blue-400" />
                            {item.expires}
                          </div>
                        </div>

                        {item.banner && (
                          <div className="mb-3 overflow-hidden rounded-lg border border-blue-500/20 shadow-lg shadow-blue-900/20">
                            <div className="relative">
                              <img 
                                src={item.banner} 
                                alt={`${item.description} Banner`} 
                                className="w-full h-auto object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-300" 
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-3">
                                <div className="flex items-center justify-between">
                                  <code className="text-sm font-mono text-blue-300 font-semibold">{item.code}</code>
                                  <Button
                                    onClick={() => handleCopyCode(item.code)}
                                    size="sm"
                                    className="h-7 px-2.5 text-xs rounded-md transition-all duration-200 bg-blue-900/80 text-blue-100 border-blue-500/30 hover:bg-blue-800"
                                  >
                                    {copiedCode === item.code ? (
                                      <Check className="h-3.5 w-3.5 mr-1" />
                                    ) : (
                                      <Copy className="h-3.5 w-3.5 mr-1" />
                                    )}
                                    {copiedCode === item.code ? 'Copied!' : 'Copy'}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {item.gameEvent && (
                          <div className="mb-3 bg-gradient-to-br from-blue-900/10 to-purple-900/10 rounded-lg p-3 border border-blue-500/20">
                            <h4 className="text-xs font-semibold text-purple-300 mb-1">{item.gameEvent.title}</h4>
                            <p className="text-[11px] text-gray-400 leading-relaxed">{item.gameEvent.description}</p>
                          </div>
                        )}

                        <div className="flex flex-col gap-2 mb-3">
                          {item.rewards.map((reward, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs text-gray-300 bg-gray-900 px-2.5 py-1.5 rounded-md border border-gray-800">
                              {reward.icon === 'Gift' && <Gift className="h-4 w-4 text-blue-400" />}
                              {reward.icon === 'Star' && <Star className="h-4 w-4 text-blue-400" />}
                              {reward.icon === 'Sword' && <Sword className="h-4 w-4 text-blue-400" />}
                              <span>{reward.type}: <span className="text-white font-medium">{reward.amount}</span></span>
                            </div>
                          ))}
                        </div>
                        
                        {item.originalPrice && (
                          <div className="flex items-center gap-2 mb-3 bg-gradient-to-br from-amber-900/20 to-amber-800/20 p-2 rounded-md border border-amber-700/40">
                            <div className="flex-1">
                              <div className="flex items-center">
                                <span className="text-xs text-gray-400 line-through mr-2">{item.originalPrice} Gems</span>
                                <span className="text-sm font-medium text-amber-400">{item.salePrice} Gems</span>
                              </div>
                              <div className="text-[10px] text-gray-400 mt-0.5">Limited time offer</div>
                            </div>
                            {item.discountPercent && (
                              <div className="text-[11px] font-medium bg-green-900/40 text-green-300 px-2 py-1 rounded-full border border-green-500/30">
                                {item.discountPercent}% OFF
                              </div>
                            )}
                          </div>
                        )}

                        {!item.banner && (
                          <div className="flex items-center justify-between bg-gradient-to-r from-gray-900/90 to-gray-800/90 rounded-lg p-1 border border-gray-700/50 shadow-inner">
                            <code className="text-xs font-mono text-blue-300 px-2">{item.code}</code>
                            <Button
                              onClick={() => handleCopyCode(item.code)}
                              size="sm"
                              className={cn(
                                "h-7 px-2.5 text-xs rounded-md transition-all duration-200",
                                copiedCode === item.code
                                  ? "bg-green-900/30 text-green-400 border-green-500/30"
                                  : "bg-blue-900/20 text-blue-400 border-blue-500/30 hover:bg-blue-900/40 hover:border-blue-500/50"
                              )}
                            >
                              {copiedCode === item.code ? (
                                <Check className="h-3.5 w-3.5 mr-1" />
                              ) : (
                                <Copy className="h-3.5 w-3.5 mr-1" />
                              )}
                              {copiedCode === item.code ? 'Copied!' : 'Copy'}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'offers' && (
            <div className="space-y-4">
              {offers.map((item) => (
                <div 
                  key={item.id} 
                  className={cn(
                      "group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg rounded-lg p-4 shadow-lg border border-gray-700/50 hover:border-gray-600/70 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5",
                      item.isImportant && item.isUrgent && "ring-2 ring-gradient-to-r from-amber-500/30 to-purple-500/30 hover:shadow-purple-900/20",
                      item.isImportant && !item.isUrgent && "ring-2 ring-purple-500/30 hover:shadow-purple-900/20",
                      item.isUrgent && !item.isImportant && "ring-2 ring-amber-500/30 hover:shadow-amber-900/20"
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-amber-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative flex">
                    {item.image ? (
                        <div className="mr-3 rounded-md overflow-hidden shadow-lg border border-purple-500/20 group-hover:border-purple-500/40 transition-all duration-200">
                          <img src={item.image} alt="Offer" width={50} height={50} className="object-cover group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    ) : (
                        <div className="mr-3 group-hover:scale-105 transition-transform duration-200">
                        {getOfferIconContainer(item.type, item.shape)}
                      </div>
                    )}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-sm font-medium text-gray-100 group-hover:text-white transition-colors">{item.title}</p>
                          <div className="flex items-center gap-1.5">
                        <span className={cn(
                              "text-[10px] font-medium px-2 py-0.5 rounded-full border shadow-sm",
                              item.type === 'Flash Sale' ? "bg-green-900/40 text-green-300 border-green-500/30" : 
                              item.type === 'Bundle' ? "bg-purple-900/40 text-purple-300 border-purple-500/30" : 
                              item.type === 'Limited' ? "bg-red-900/40 text-red-300 border-red-500/30" :
                          "bg-orange-900/40 text-orange-300 border-orange-500/30"
                        )}>
                          {item.type}
                        </span>
                      {item.isUrgent && (
                              <span className="text-[10px] font-medium text-amber-300 bg-amber-900/40 px-2 py-0.5 rounded-full border border-amber-600/30 shadow-sm">
                                Urgent
                        </span>
                      )}
                      {item.isImportant && (
                              <span className="text-[10px] font-medium text-purple-300 bg-purple-900/40 px-2 py-0.5 rounded-full border border-purple-600/30 shadow-sm">
                                Special
                        </span>
                      )}
                          </div>
                        </div>
                        <p className="text-xs text-gray-300 mb-3 group-hover:text-gray-200 transition-colors">{item.description}</p>
                        
                        {item.rewards && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {item.rewards.map((reward, index) => (
                              <span key={index} className="text-xs bg-gray-800/60 text-gray-300 px-2.5 py-1 rounded-md border border-gray-700/50 group-hover:border-gray-600/70 transition-colors">
                                {reward}
                              </span>
                            ))}
                          </div>
                        )}

                        {item.originalPrice && (
                          <div className="flex items-center gap-2 mb-3 bg-gray-800/40 px-3 py-1.5 rounded-md border border-gray-700/50 inline-block">
                            <span className="text-xs text-gray-400 line-through">{item.originalPrice} Gems</span>
                            <span className="text-sm font-medium text-green-400">{item.salePrice} Gems</span>
                            <span className="text-[10px] font-medium bg-green-900/40 text-green-300 px-2 py-0.5 rounded-full border border-green-500/30">
                              50% OFF
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="relative mt-3 flex justify-between items-center pt-3 border-t border-gray-700/30">
                      <span className="text-xs text-gray-400 flex items-center bg-gray-800/40 px-2 py-1 rounded-full border border-gray-700/50">
                        <Clock className="h-3 w-3 mr-1 text-gray-500" />
                        {item.expires}
                      </span>
                    <Button
                      variant="outline" 
                      size="sm"
                        className={cn(
                          "text-xs flex items-center transition-all duration-200 h-7 px-3 rounded-md shadow-sm",
                          item.isUrgent && item.isImportant 
                            ? "bg-gradient-to-r from-amber-900/20 to-purple-900/20 hover:from-amber-900/40 hover:to-purple-900/40 border-amber-700/50 hover:border-purple-700/70 text-amber-400 hover:text-purple-300"
                            : "bg-blue-900/20 hover:bg-blue-900/40 border-blue-700/50 hover:border-blue-700/70 text-blue-400 hover:text-blue-300"
                        )}
                    >
                      <span>Claim</span>
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'rewards' && (
              <div className="space-y-4 cursor-default">
                <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-lg p-3 border border-amber-500/20">
                  <div className="flex items-center gap-2 text-amber-300">
                    <Trophy className="h-5 w-5" />
                    <span className="text-sm font-medium">Your Progress</span>
                  </div>
                </div>

                {/* Daily Login Streak Card - Now static */}
                <div className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg rounded-lg p-4 shadow-lg border border-gray-700/50 hover:border-gray-600/70 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-default">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-green-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-gradient-to-br from-emerald-900/30 to-green-900/30 rounded-md shadow-inner border border-emerald-500/30 group-hover:border-emerald-500/50 transition-all duration-200">
                        <Calendar className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-100 group-hover:text-white transition-colors">{rewards[0].title}</h3>
                        <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors mt-0.5">{rewards[0].description}</p>
                      </div>
                    </div>
                    <div className="text-xs font-medium px-2 py-1 rounded-full border shadow-sm bg-emerald-900/40 text-emerald-300 border-emerald-500/30">
                      Day {rewards[0].currentDay}/{rewards[0].totalDays}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    {rewards[0].days.map((day, index) => (
                      <div 
                        key={index}
                        className="relative flex flex-col items-center"
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center border-2 mb-1.5 transition-all duration-200",
                          day.claimed 
                            ? "bg-gradient-to-br from-emerald-600 to-emerald-500 border-emerald-400 shadow-lg shadow-emerald-900/30" 
                            : day.day === rewards[0].currentDay + 1
                              ? "bg-gradient-to-br from-gray-800 to-gray-900 border-emerald-500 ring-4 ring-emerald-500/20"
                              : "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700"
                        )}>
                          {day.claimed ? (
                            <Check className="h-5 w-5 text-emerald-100" />
                          ) : (
                            <Gift className={cn(
                              "h-4 w-4",
                              day.day === rewards[0].currentDay + 1 ? "text-emerald-400" : "text-gray-500"
                            )} />
                          )}
                        </div>
                        <span className={cn(
                          "text-[10px] font-medium",
                          day.claimed ? "text-emerald-400" : 
                          day.day === rewards[0].currentDay + 1 ? "text-emerald-300" : "text-gray-500"
                        )}>
                          Day {day.day}
                        </span>
                        <span className={cn(
                          "text-[9px] text-center mt-0.5",
                          day.claimed ? "text-gray-300" :
                          day.day === rewards[0].currentDay + 1 ? "text-gray-300" : "text-gray-500"
                        )}>
                          {day.reward}
                        </span>
                        {day.claimed && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <Check className="h-2.5 w-2.5 text-emerald-950" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-700/30">
                    <div className="flex items-center gap-1.5">
                      <Gift className="h-4 w-4 text-emerald-400" />
                      <span className="text-xs text-gray-300">Next Reward:</span>
                      <span className="text-xs font-medium text-white">{rewards[0].days[rewards[0].currentDay].reward}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 px-2.5 text-xs rounded-md transition-all duration-200 bg-emerald-900/20 hover:bg-emerald-900/40 border-emerald-500/30 hover:border-emerald-500/50 text-emerald-400"
                    >
                      Claim
                    </Button>
                  </div>
                </div>

                {/* BlueStacks Points Card - Now static */}
                <div className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg rounded-lg p-4 shadow-lg border border-gray-700/50 hover:border-gray-600/70 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-default">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-yellow-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-gradient-to-br from-amber-900/30 to-yellow-900/30 rounded-md shadow-inner border border-amber-500/30 group-hover:border-amber-500/50 transition-all duration-200">
                        <Star className="h-5 w-5 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-100 group-hover:text-white transition-colors">{rewards[1].title}</h3>
                        <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors mt-0.5">{rewards[1].description}</p>
                      </div>
                    </div>
                    <div className="text-xs font-medium px-2 py-1 rounded-full border shadow-sm bg-amber-900/40 text-amber-300 border-amber-500/30">
                      {rewards[1].progress}% Complete
                    </div>
                  </div>

                  <div className="relative mb-6">
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-600 to-yellow-500 text-xs font-medium px-2 py-1 rounded-full shadow-md">
                      0
                    </div>
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-600 to-yellow-500 text-xs font-medium px-2 py-1 rounded-full shadow-md">
                      1000
                    </div>
                    <div className="h-4 bg-gray-800/60 rounded-full overflow-hidden border border-gray-700/50">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-600 to-yellow-500 transition-all duration-500 ease-out group-hover:brightness-110"
                        style={{ width: `${rewards[1].progress}%` }}
                      />
                    </div>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-600 to-yellow-500 text-xs font-medium px-2 py-1 rounded-full shadow-md">
                      500
                    </div>
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 bg-white w-1 h-4 transition-all duration-500"
                      style={{ left: `${rewards[1].progress}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                      { points: 250, reward: 'Rare Chest', claimed: true },
                      { points: 500, reward: 'Epic Chest', claimed: false },
                      { points: 1000, reward: 'Legendary Chest', claimed: false }
                    ].map((milestone, index) => (
                      <div 
                        key={index}
                          className={cn(
                          "flex flex-col items-center p-2 rounded-lg border transition-all duration-200",
                          milestone.claimed
                            ? "bg-gradient-to-br from-amber-900/30 to-yellow-900/30 border-amber-500/30"
                            : "bg-gradient-to-br from-gray-800/40 to-gray-900/40 border-gray-700/30"
                        )}
                      >
                        <span className={cn(
                          "text-xs font-medium mb-1",
                          milestone.claimed ? "text-amber-400" : "text-gray-400"
                        )}>
                          {milestone.points} pts
                        </span>
                        <span className={cn(
                          "text-[10px] text-center",
                          milestone.claimed ? "text-gray-300" : "text-gray-500"
                        )}>
                          {milestone.reward}
                        </span>
                        {milestone.claimed && (
                          <div className="mt-1">
                            <Check className="h-4 w-4 text-amber-400" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-700/30">
                    <div className="flex items-center gap-1.5">
                      <Gift className="h-4 w-4 text-amber-400" />
                      <span className="text-xs text-gray-300">Next Reward:</span>
                      <span className="text-xs font-medium text-white">{rewards[1].nextReward}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{rewards[1].pointsNeeded} points needed</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-2.5 text-xs rounded-md transition-all duration-200 bg-amber-900/20 hover:bg-amber-900/40 border-amber-500/30 hover:border-amber-500/50 text-amber-400"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Friend Referrals Card - Now static */}
                <div className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg rounded-lg p-4 shadow-lg border border-gray-700/50 hover:border-gray-600/70 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-default">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-md shadow-inner border border-blue-500/30 group-hover:border-blue-500/50 transition-all duration-200">
                        <Users className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-100 group-hover:text-white transition-colors">{rewards[2].title}</h3>
                        <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors mt-0.5">{rewards[2].description}</p>
                      </div>
                    </div>
                    <div className="text-xs font-medium px-2 py-1 rounded-full border shadow-sm bg-blue-900/40 text-blue-300 border-blue-500/30">
                      {rewards[2].progress}% Complete
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-3 mb-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div 
                        key={index}
                        className={cn(
                          "relative aspect-square rounded-lg border-2 transition-all duration-200",
                          index < 2
                            ? "bg-gradient-to-br from-blue-600 to-indigo-500 border-blue-400 shadow-lg shadow-blue-900/30"
                            : "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700"
                        )}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          {index < 2 ? (
                            <Check className="h-6 w-6 text-blue-100" />
                          ) : (
                            <Users className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                        {index < 2 && (
                          <div className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <Check className="h-3 w-3 text-blue-950" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-lg p-3 border border-gray-700/30 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">Referral Link</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs hover:bg-blue-500/10 text-blue-400"
                        onClick={() => handleCopyCode('https://example.com/ref/123')}
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <code className="text-xs font-mono text-blue-300">https://example.com/ref/123</code>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-700/30">
                    <div className="flex items-center gap-1.5">
                      <Gift className="h-4 w-4 text-blue-400" />
                      <span className="text-xs text-gray-300">Next Reward:</span>
                      <span className="text-xs font-medium text-white">{rewards[2].nextReward}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{rewards[2].remaining} more needed</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-2.5 text-xs rounded-md transition-all duration-200 bg-blue-900/20 hover:bg-blue-900/40 border-blue-500/30 hover:border-blue-500/50 text-blue-400"
                      >
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              
              <div className="mt-6">
                <Button
                    className="w-full py-5 px-4 bg-gradient-to-r from-amber-800/40 via-amber-700/40 to-amber-800/40 hover:from-amber-700/60 hover:via-amber-600/60 hover:to-amber-700/60 border border-amber-700/50 hover:border-amber-600/70 text-amber-300 hover:text-amber-200 text-sm font-medium flex items-center justify-center transition-all duration-200 shadow-md group cursor-pointer"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-yellow-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
                    <Bell className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                    <span className="relative">Notify me about new rewards</span>
                </Button>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
});

OfferPanel.displayName = 'OfferPanel';

