
import React, { useState, useEffect } from 'react';
import { OfferIndicator, OfferData } from './OfferIndicator';
import { OfferPanel } from './OfferPanel';

interface OfferHubProps {
  initialOfferData?: OfferData;
  playNewAnimation?: boolean;
  showHighlightFade?: boolean;
  showGlowFade?: boolean;
}

const defaultOfferData: OfferData = {
  isNew: false,
  importance: 'Normal',
  isUrgent: false,
  offerType: 'Code',
  offerValue: 'Gift Code',
};

export const OfferHub: React.FC<OfferHubProps> = ({
  initialOfferData = defaultOfferData,
  playNewAnimation = false,
  showHighlightFade = false,
  showGlowFade = false,
}) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [offerData, setOfferData] = useState<OfferData>(initialOfferData);
  const [isActive, setIsActive] = useState(true);
  
  // Update offerData when initialOfferData changes
  useEffect(() => {
    setOfferData(initialOfferData);
    setIsActive(true); // Reset active state when data changes
  }, [initialOfferData]);

  // Handle highlight fade effect
  useEffect(() => {
    if (showHighlightFade && isActive) {
      const timer = setTimeout(() => {
        setIsActive(false);
      }, 5000); // 5 seconds
      
      return () => clearTimeout(timer);
    }
    
    return () => {};
  }, [showHighlightFade, isActive, initialOfferData]);

  const handleTogglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <>
      <OfferIndicator 
        offerData={offerData}
        onTogglePanel={handleTogglePanel}
        isPanelOpen={isPanelOpen}
        playNewAnimation={playNewAnimation}
        showHighlightFade={showHighlightFade && isActive}
        showGlowFade={showGlowFade}
        isActive={isActive}
      />
      <OfferPanel 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
        offerData={offerData}
      />
    </>
  );
};
