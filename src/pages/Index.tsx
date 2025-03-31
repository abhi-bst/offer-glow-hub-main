import React, { useState, useEffect } from 'react';
import { OfferHub } from '@/components/offer-hub/OfferHub';
import { DemoControls, HowToUseGuide } from '@/components/offer-hub/DemoControls';
import type { OfferData } from '@/components/offer-hub/OfferIndicator';

const Index = () => {
  const [offerData, setOfferData] = useState<OfferData>({
    isNew: false,
    importance: 'Normal',
    isUrgent: false,
    offerType: 'Code',
    offerValue: '',
  });
  const [playNewAnimation, setPlayNewAnimation] = useState(false);

  useEffect(() => {
    if (playNewAnimation) {
      const timer = setTimeout(() => {
        setPlayNewAnimation(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [playNewAnimation]);

  const handleSetOfferData = (data: OfferData) => {
    setOfferData(data);
  };

  const handlePlayNewAnimation = () => {
    setPlayNewAnimation(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto py-8">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Offer Glow Hub
            </h1>
            <p className="text-gray-400 text-center max-w-xl">
              A customizable notification system for displaying offers, rewards, and time-sensitive deals.
            </p>
          </div>

          <div className="w-full flex flex-col items-center gap-8">
            <div className="w-full max-w-3xl">
              <OfferHub 
                initialOfferData={offerData}
                playNewAnimation={playNewAnimation}
              />
            </div>
            <div className="w-full max-w-md">
              <DemoControls
                onSetOfferData={handleSetOfferData}
                onPlayNewAnimation={handlePlayNewAnimation}
                currentOfferData={offerData}
              />
              
              {/* How To Use Guide */}
              <HowToUseGuide />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
