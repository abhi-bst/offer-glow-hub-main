import React, { useState, useEffect } from 'react';
import { Gift, Clock, ChevronLeft, Package, Percent, Tag, Sword, Crown, Star, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export type OfferType = 'Code' | 'Discount' | '% Off' | 'Item' | 'Flash';
export type OfferImportance = 'Normal' | 'Important';

export interface OfferData {
  isNew: boolean;
  importance: OfferImportance;
  isUrgent: boolean;
  offerType: OfferType;
  offerValue: string;
  description?: string;
  showBackground?: boolean;
  showDot?: boolean;
}

interface OfferIndicatorProps {
  offerData: OfferData;
  onTogglePanel: () => void;
  isPanelOpen: boolean;
  showHighlightFade?: boolean;
  playNewAnimation?: boolean;
  isActive?: boolean;
}

export const OfferIndicator: React.FC<OfferIndicatorProps> = ({
  offerData,
  onTogglePanel,
  isPanelOpen,
  showHighlightFade = false,
  playNewAnimation = false,
  isActive = true,
}) => {
  const [showFullMessage, setShowFullMessage] = useState(false);
  const [showGlowFadeState, setShowGlowFadeState] = useState(false);

  useEffect(() => {
    if (showHighlightFade && offerData.isNew) {
      setShowGlowFadeState(true);
      const timer = setTimeout(() => {
        setShowGlowFadeState(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
    return () => {};
  }, [showHighlightFade, offerData.isNew]);

  useEffect(() => {
    if (playNewAnimation) {
      setShowFullMessage(true);
      const timer = setTimeout(() => {
        setShowFullMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
    return () => {};
  }, [playNewAnimation]);

  const getOfferIcon = () => {
    if (offerData.isUrgent) return <Clock className="w-5 h-5 text-amber-300" />;
    
    switch (offerData.offerType) {
      case 'Code':
        return <Gift className="w-5 h-5 text-blue-300" />;
      case 'Discount':
        return <Tag className="w-5 h-5 text-green-300" />;
      case '% Off':
        return <Percent className="w-5 h-5 text-purple-300" />;
      case 'Flash':
        return <Zap className="w-5 h-5 text-yellow-300" />;
      case 'Item':
        if (offerData.offerValue.toLowerCase().includes('sword')) {
          return <Sword className="w-5 h-5 text-red-300" />;
        } else if (offerData.offerValue.toLowerCase().includes('crown')) {
          return <Crown className="w-5 h-5 text-yellow-300" />;
        }
        return <Package className="w-5 h-5 text-orange-300" />;
      default:
        return <Gift className="w-5 h-5 text-blue-300" />;
    }
  };

  const getBackgroundStyle = () => {
    if (!offerData.showBackground) return "";
    
    // For icon or icon+text states with background
    if (offerData.isNew) {
      if (offerData.offerType === '% Off') {
        return "bg-[linear-gradient(90deg,#1E1B4B_0%,#312E81_50%,#1E1B4B_100%)] border-[#312E81]/20 border shadow-sm";
      }
      if (offerData.offerType === 'Item') {
        return "bg-[linear-gradient(90deg,#422006_0%,#713F12_50%,#422006_100%)] border-[#713F12]/20 border shadow-sm";
      }
      if (offerData.offerType === 'Discount' && offerData.isUrgent) {
        return "bg-[linear-gradient(90deg,#431407_0%,#7C2D12_50%,#431407_100%)] border-[#7C2D12]/20 border shadow-sm";
      }
      if (offerData.offerType === 'Flash') {
        return "bg-[linear-gradient(90deg,#713F12_0%,#A16207_50%,#713F12_100%)] border-[#A16207]/20 border shadow-sm";
      }
      // Default gradient for other types
      return "bg-[linear-gradient(90deg,#1E1B4B_0%,#312E81_50%,#1E1B4B_100%)] border-[#312E81]/20 border shadow-sm";
    }

    // For basic arrow state
    return "bg-gray-800/80 border border-gray-700";
  };

  const getNotificationDot = () => {
    if (!offerData.showDot) return null;
    
    const dotColorClass = offerData.isUrgent 
      ? "bg-amber-500" 
      : offerData.importance === 'Important' ? "bg-red-500" : "bg-blue-500";
    
    return (
      <span className={cn(
        "absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full",
        dotColorClass
      )}></span>
    );
  };

  // Special case for showing the glowing button that fades away
  if (showGlowFadeState) {
    return (
      <button 
        onClick={onTogglePanel}
        className={cn(
          "group fixed z-50 flex items-center justify-center px-2.5 py-2",
          "border-2 border-blue-500/50 rounded-l-md shadow-lg",
          "bg-blue-900/50 backdrop-blur-sm",
          "animate-glow-fade"
        )}
        style={{ top: '50%', right: '0', transform: 'translateY(-50%)' }}
        aria-label="Open offer hub"
      >
        <div className="flex items-center space-x-2 relative">
          <Star className="w-5 h-5 text-blue-300" />
          <span className="text-xs font-medium text-blue-200 whitespace-nowrap">
            {offerData.description || offerData.offerValue}
          </span>
          {getNotificationDot()}
        </div>
      </button>
    );
  }

  // Basic arrow state
  if (!offerData.isNew) {
    return (
      <button 
        onClick={onTogglePanel}
        className={cn(
          "group fixed z-50 flex items-center justify-center p-1.5",
          "hover:bg-gray-700/50 transition-colors duration-200",
          offerData.showBackground && "bg-gray-800/80 border border-gray-700 rounded-l-md"
        )}
        style={{ top: '50%', right: '0', transform: 'translateY(-50%)' }}
        aria-label={isPanelOpen ? "Close offer hub" : "Open offer hub"}
      >
        <ChevronLeft className={cn(
          "w-4 h-4 text-gray-300 group-hover:text-white transition-transform duration-200",
          isPanelOpen && "rotate-180"
        )} />
      </button>
    );
  }

  // Icon only state
  if (!offerData.offerValue) {
    return (
      <button 
        onClick={onTogglePanel}
        className={cn(
          "group fixed z-50 flex items-center justify-center p-1.5",
          "hover:brightness-110 transition-all duration-200",
          offerData.showBackground && "rounded-l-md",
          getBackgroundStyle(),
          playNewAnimation && "animate-pulse-glow"
        )}
        style={{ top: '50%', right: '0', transform: 'translateY(-50%)' }}
        aria-label={isPanelOpen ? "Close offer hub" : "Open offer hub"}
      >
        <div className="relative">
          {getOfferIcon()}
          {getNotificationDot()}
        </div>
      </button>
    );
  }

  // Icon with text state
  return (
    <button 
      onClick={onTogglePanel}
      className={cn(
        "group fixed z-50 flex items-center justify-center pr-8 pl-3 py-1.5",
        "hover:brightness-110 transition-all duration-200",
        offerData.showBackground && "rounded-l-md",
        getBackgroundStyle(),
        playNewAnimation && "animate-pulse-glow"
      )}
      style={{ 
        top: '50%', 
        right: '0', 
        transform: 'translateY(-50%)',
        backgroundSize: '200% 100%',
        animation: offerData.showBackground && offerData.isNew ? 'gradientMove 3s linear infinite' : 'none'
      }}
      aria-label={isPanelOpen ? "Close offer hub" : "Open offer hub"}
    >
      <style jsx global>{`
        @keyframes gradientMove {
          0% { background-position: 100% 50%; }
          50% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
      <div className="flex items-center gap-2.5 relative">
        <div className="bg-white/10 rounded-sm p-0.5">
          {getOfferIcon()}
        </div>
        <div className="flex flex-col items-start -mt-[1px]">
          {showFullMessage && offerData.description ? (
            <>
              <span className="text-[13px] font-medium text-white/95 leading-[1.15]">
                {offerData.offerValue}
              </span>
              <span className="text-[11px] text-white/80 leading-[1.15]">
                {offerData.description}
              </span>
            </>
          ) : (
            <span className="text-[13px] font-medium text-white/95 whitespace-nowrap">
              {offerData.offerValue}
            </span>
          )}
        </div>
        {getNotificationDot()}
      </div>
      {showFullMessage && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setShowFullMessage(false);
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white/90"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 2.5L2.5 7.5M2.5 2.5L7.5 7.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </button>
  );
};
