import React from 'react';
import { Button } from '@/components/ui/button';
import { OfferData } from './OfferIndicator';
import { Gift, Clock, ChevronLeft, Star, Tag, Percent, Crown, Circle, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DemoControlsProps {
  onSetOfferData: (data: OfferData) => void;
  onPlayNewAnimation: () => void;
  currentOfferData: OfferData;
}

export const DemoControls: React.FC<DemoControlsProps> = ({
  onSetOfferData,
  onPlayNewAnimation,
  currentOfferData
}) => {
  // Basic States
  const setBasic = () => {
    onSetOfferData({
      isNew: false,
      importance: 'Normal',
      isUrgent: false,
      offerType: 'Code',
      offerValue: '',
      showBackground: false,
      showDot: false,
    });
  };

  const setJustIcon = () => {
    onSetOfferData({
      isNew: true,
      importance: 'Normal',
      isUrgent: false,
      offerType: 'Code',
      offerValue: '',
      showBackground: false,
      showDot: false,
    });
  };

  const setIconWithWord = () => {
    onSetOfferData({
      isNew: true,
      importance: 'Normal',
      isUrgent: false,
      offerType: 'Code',
      offerValue: 'Gift Code',
      showBackground: false,
      showDot: false,
    });
  };

  // Theme Options
  const toggleBackground = () => {
    onSetOfferData({
      ...currentOfferData,
      showBackground: !currentOfferData.showBackground,
    });
  };

  const toggleDot = () => {
    onSetOfferData({
      ...currentOfferData,
      showDot: !currentOfferData.showDot,
    });
  };

  // Message Stages
  const setFullMessage = () => {
    // First set the full message state
    onSetOfferData({
      isNew: true,
      importance: 'Important',
      isUrgent: false,
      offerType: '% Off',
      offerValue: 'Important Offer!',
      description: 'Get 50% off your next purchase!',
      showBackground: true,
      showDot: false,
    });
    
    // Trigger the animation
    onPlayNewAnimation();
    
    // After animation duration (5 seconds), switch to arrow state
    setTimeout(() => {
      onSetOfferData({
        isNew: false,  // This will trigger the arrow state
        importance: 'Important',
        isUrgent: false,
        offerType: '% Off',
        showBackground: true,
        showDot: false,
      });
    }, 5000);
  };

  // Different offer types
  const setReward = () => {
    onSetOfferData({
      ...currentOfferData,
      isNew: true,
      importance: 'Normal',
      isUrgent: false,
      offerType: 'Item',
      offerValue: 'Reward',
      description: 'Get a free legendary crown!'
    });
  };

  const setSale = () => {
    onSetOfferData({
      ...currentOfferData,
      isNew: true,
      importance: 'Normal',
      isUrgent: false,
      offerType: '% Off',
      offerValue: '50% Off',
      description: 'Special sale - 50% off everything!'
    });
  };

  const setUrgent = () => {
    onSetOfferData({
      ...currentOfferData,
      isNew: true,
      importance: 'Normal',
      isUrgent: true,
      offerType: 'Discount',
      offerValue: 'Ends Soon',
      description: 'Limited time offer - Ends in 12 hours!'
    });
  };

  // New Flash Offer with timer circle and center animation
  const setFlashOffer = () => {
    // First show a quick center animation - purely visual without text
    const centerAnimationElement = document.createElement('div');
    centerAnimationElement.className = 'fixed inset-0 flex items-center justify-center z-[9999]';
    centerAnimationElement.style.pointerEvents = 'none';
    centerAnimationElement.innerHTML = `
      <div class="graffiti-container">
        <!-- Paint spray background effect -->
        <div class="spray-background"></div>
        
        <!-- Graffiti mascot character -->
        <div class="mascot">
          <!-- Mascot face -->
          <div class="mascot-head">
            <div class="mascot-eyes"></div>
            <div class="mascot-smile"></div>
          </div>
          <!-- Speech bubble -->
          <div class="speech-bubble">
            <div class="bubble-content">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="#f59e0b" stroke="#000">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
              <span>50% OFF!</span>
            </div>
          </div>
        </div>
        
        <!-- Paint splatters -->
        <div class="splatter splatter1"></div>
        <div class="splatter splatter2"></div>
        <div class="splatter splatter3"></div>
        
        <!-- Stars -->
        <div class="star star1">★</div>
        <div class="star star2">★</div>
      </div>
    `;
    document.body.appendChild(centerAnimationElement);
    
    // Add style for the graffiti animation
    const centerStyle = document.createElement('style');
    centerStyle.textContent = `
      .graffiti-container {
        position: relative;
        width: 280px;
        height: 280px;
        animation: zoom-in 0.5s ease-out;
      }
      
      .spray-background {
        position: absolute;
        width: 240px;
        height: 240px;
        background: radial-gradient(circle, rgba(245, 158, 11, 0.7) 0%, rgba(245, 158, 11, 0) 70%);
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        animation: pulse-glow 2s infinite alternate;
      }
      
      .mascot {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        animation: bounce-in 0.7s cubic-bezier(0.17, 0.67, 0.83, 0.67);
      }
      
      .mascot-head {
        width: 100px;
        height: 100px;
        background: #fbbf24;
        border: 5px solid #000;
        border-radius: 50%;
        position: relative;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      }
      
      .mascot-head:before {
        content: '';
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        height: 50%;
        background: linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%);
        border-radius: 50%;
        transform: rotate(-10deg);
      }
      
      .mascot-eyes {
        position: absolute;
        top: 30px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-around;
      }
      
      .mascot-eyes:before, .mascot-eyes:after {
        content: '';
        width: 15px;
        height: 15px;
        background: #000;
        border-radius: 50%;
        display: block;
        animation: blink 3s infinite;
      }
      
      .mascot-smile {
        position: absolute;
        bottom: 25px;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 20px;
        border-bottom: 5px solid #000;
        border-radius: 0 0 15px 15px;
      }
      
      .speech-bubble {
        position: absolute;
        top: -40px;
        right: -60px;
        animation: pop-in 0.4s ease-out forwards 0.5s;
        opacity: 0;
        transform: scale(0);
      }
      
      .bubble-content {
        background: white;
        border: 3px solid #000;
        border-radius: 12px;
        padding: 6px 10px;
        display: flex;
        align-items: center;
        gap: 4px;
        position: relative;
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
      }
      
      .bubble-content:after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 15px;
        width: 15px;
        height: 15px;
        background: white;
        border-right: 3px solid #000;
        border-bottom: 3px solid #000;
        transform: rotate(45deg);
      }
      
      .bubble-content span {
        font-weight: bold;
        color: #000;
        font-size: 14px;
      }
      
      .splatter {
        position: absolute;
        border-radius: 50%;
        background: #f59e0b;
        opacity: 0;
        animation: splat 0.6s ease-out forwards;
      }
      
      .splatter1 {
        width: 70px;
        height: 70px;
        top: 20%;
        left: 15%;
        animation-delay: 0.2s;
      }
      
      .splatter2 {
        width: 50px;
        height: 50px;
        bottom: 25%;
        right: 20%;
        background: #fcd34d;
        animation-delay: 0.3s;
      }
      
      .splatter3 {
        width: 60px;
        height: 60px;
        bottom: 15%;
        left: 25%;
        background: #d97706;
        animation-delay: 0.4s;
      }
      
      .star {
        position: absolute;
        color: white;
        opacity: 0;
        text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        animation: star-spin 0.8s ease-out forwards;
      }
      
      .star1 {
        top: 30%;
        right: 20%;
        font-size: 36px;
        animation-delay: 0.6s;
      }
      
      .star2 {
        bottom: 30%;
        left: 20%;
        font-size: 28px;
        animation-delay: 0.8s;
      }
      
      @keyframes zoom-in {
        0% { transform: scale(0.3); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
      }
      
      @keyframes pulse-glow {
        0% { opacity: 0.3; transform: translate(-50%, -50%) scale(0.95); }
        100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.05); }
      }
      
      @keyframes bounce-in {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        75% { transform: translate(-50%, -50%) scale(0.9); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      }
      
      @keyframes pop-in {
        0% { transform: scale(0); opacity: 0; }
        70% { transform: scale(1.2); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
      }
      
      @keyframes splat {
        0% { transform: scale(0); opacity: 0; }
        60% { transform: scale(1.3); opacity: 0.8; }
        100% { transform: scale(1); opacity: 0.6; }
      }
      
      @keyframes star-spin {
        0% { transform: scale(0) rotate(0deg); opacity: 0; }
        60% { transform: scale(1.5) rotate(180deg); opacity: 1; }
        100% { transform: scale(1) rotate(360deg); opacity: 0.8; }
      }
      
      @keyframes blink {
        0%, 45%, 55%, 100% { transform: scaleY(1); }
        50% { transform: scaleY(0.1); }
      }
    `;
    document.head.appendChild(centerStyle);
    
    // After the center animation, create the timer circle
    setTimeout(() => {
      document.body.removeChild(centerAnimationElement);
      createTimerCircle();
    }, 2000); // Increased duration for the animation
    
    // Function to create the timer circle
    const createTimerCircle = () => {
      // Create a container for the badge (no background, just the icon)
      const flashBadgeContainer = document.createElement('div');
      flashBadgeContainer.style.position = 'fixed';
      flashBadgeContainer.style.top = '20px';
      flashBadgeContainer.style.right = '20px';
      flashBadgeContainer.style.zIndex = '9997';
      flashBadgeContainer.style.display = 'flex';
      flashBadgeContainer.style.alignItems = 'center';
      flashBadgeContainer.style.justifyContent = 'center';
      // Removed background, making it just the icon with timer
      flashBadgeContainer.style.padding = '6px';
      flashBadgeContainer.style.borderRadius = '50%';
      flashBadgeContainer.style.transition = 'transform 0.3s';
      flashBadgeContainer.style.cursor = 'pointer';
      // Add a subtle pulsing glow
      flashBadgeContainer.style.animation = 'circle-pulse 3s infinite';

      // Add a close button with improved hover
      const closeButton = document.createElement('button');
      closeButton.style.background = 'rgba(30, 41, 59, 0.8)';
      closeButton.style.border = 'none';
      closeButton.style.color = 'white';
      closeButton.style.position = 'absolute';
      closeButton.style.top = '-6px';
      closeButton.style.right = '-6px';
      closeButton.style.width = '18px';
      closeButton.style.height = '18px';
      closeButton.style.borderRadius = '50%';
      closeButton.style.display = 'flex';
      closeButton.style.alignItems = 'center';
      closeButton.style.justifyContent = 'center';
      closeButton.style.cursor = 'pointer';
      closeButton.style.fontSize = '12px';
      closeButton.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
      closeButton.style.opacity = '0';
      closeButton.style.transition = 'opacity 0.2s, background-color 0.2s';
      closeButton.innerHTML = '✕';

      // Create circle timer
      const circleTimer = document.createElement('div');
      circleTimer.style.position = 'relative';
      circleTimer.style.width = '42px';
      circleTimer.style.height = '42px';

      // SVG for circular timer
      const timeTotalSeconds = 600; // 10 minutes
      let timeLeft = timeTotalSeconds;
      
      circleTimer.innerHTML = `
        <svg width="42" height="42" viewBox="0 0 42 42">
          <circle 
            cx="21" 
            cy="21" 
            r="19" 
            fill="none" 
            stroke="#f59e0b" 
            stroke-width="1"
            stroke-opacity="0.3"
          />
          <circle 
            class="timer-circle"
            cx="21" 
            cy="21" 
            r="19" 
            fill="none"
            stroke="#f59e0b"
            stroke-width="2"
            stroke-dasharray="119.4"
            stroke-dashoffset="0"
            transform="rotate(-90 21 21)"
          />
          <!-- Lightning icon in the center with slow pulse animation -->
          <svg x="10.5" y="10.5" width="21" height="21" viewBox="0 0 24 24" fill="white" stroke="none" class="icon-pulse" style="filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.7));">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
        </svg>
      `;

      // Add hover tooltip
      const tooltip = document.createElement('div');
      tooltip.style.position = 'absolute';
      tooltip.style.visibility = 'hidden';
      tooltip.style.opacity = '0';
      tooltip.style.width = '200px';
      tooltip.style.backgroundColor = 'rgba(15, 23, 42, 0.9)';
      tooltip.style.color = 'white';
      tooltip.style.padding = '10px';
      tooltip.style.borderRadius = '6px';
      tooltip.style.right = 'calc(100% + 12px)';
      tooltip.style.top = '50%';
      tooltip.style.transform = 'translateY(-50%)';
      tooltip.style.transition = 'opacity 0.2s, visibility 0.2s';
      tooltip.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
      tooltip.style.zIndex = '9998';
      tooltip.style.pointerEvents = 'none';
      tooltip.style.backdropFilter = 'blur(4px)';
      tooltip.style.border = '1px solid rgba(255, 255, 255, 0.1)';
      
      tooltip.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 8px; font-size: 14px;">Docker Pro Exclusive Offer</div>
        <div style="font-size: 12px; margin-bottom: 4px;">• 50% off annual subscription</div>
        <div style="font-size: 12px; margin-bottom: 4px;">• Save $150 instantly</div>
        <div style="font-size: 12px; margin-bottom: 4px;">• Limited time only</div>
        <div style="font-size: 12px; font-style: italic; margin-top: 8px;">Click for details</div>
      `;

      // Add tooltip arrow
      const tooltipArrow = document.createElement('div');
      tooltipArrow.style.position = 'absolute';
      tooltipArrow.style.right = '-6px';
      tooltipArrow.style.top = '50%';
      tooltipArrow.style.transform = 'translateY(-50%)';
      tooltipArrow.style.width = '0';
      tooltipArrow.style.height = '0';
      tooltipArrow.style.borderTop = '6px solid transparent';
      tooltipArrow.style.borderBottom = '6px solid transparent';
      tooltipArrow.style.borderLeft = '6px solid rgba(15, 23, 42, 0.9)';
      
      tooltip.appendChild(tooltipArrow);
      flashBadgeContainer.appendChild(tooltip);

      // Assemble the badge - only timer circle
      flashBadgeContainer.appendChild(circleTimer);
      flashBadgeContainer.appendChild(closeButton);
      document.body.appendChild(flashBadgeContainer);

      // Add styles for animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes circle-pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.7); }
          50% { transform: scale(1.02); box-shadow: 0 0 0 10px rgba(245, 158, 11, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
        }
        
        @keyframes icon-pulse {
          0% { opacity: 0.8; filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.5)); }
          50% { opacity: 1; filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.9)); }
          100% { opacity: 0.8; filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.5)); }
        }
        
        .icon-pulse {
          animation: icon-pulse 2s infinite ease-in-out;
        }
        
        .timer-circle {
          transition: stroke-dashoffset 0.5s ease;
        }
      `;
      document.head.appendChild(style);

      // Add hover effect
      flashBadgeContainer.addEventListener('mouseenter', () => {
        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = '1';
        flashBadgeContainer.style.transform = 'scale(1.05)';
        closeButton.style.opacity = '1';
      });

      flashBadgeContainer.addEventListener('mouseleave', () => {
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
        flashBadgeContainer.style.transform = 'scale(1)';
        // Only hide close button when not hovering
        if (!closeButton.matches(':hover')) {
          closeButton.style.opacity = '0';
        }
      });

      // Improved close button hover
      closeButton.addEventListener('mouseenter', () => {
        closeButton.style.backgroundColor = 'rgba(220, 38, 38, 0.8)';
      });
      
      closeButton.addEventListener('mouseleave', () => {
        closeButton.style.backgroundColor = 'rgba(30, 41, 59, 0.8)';
        // Hide if parent is not being hovered
        if (!flashBadgeContainer.matches(':hover')) {
          closeButton.style.opacity = '0';
        }
      });

      // Handle close button click
      closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        flashBadgeContainer.style.opacity = '0';
        setTimeout(() => {
          if (document.body.contains(flashBadgeContainer)) {
            document.body.removeChild(flashBadgeContainer);
          }
        }, 300);
      });

      // Set up timer animation
      const timerCircle = flashBadgeContainer.querySelector('.timer-circle');
      const circumference = 2 * Math.PI * 19; // 2πr where r=19

      function updateTimer() {
        timeLeft--;
        
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          flashBadgeContainer.style.opacity = '0';
          setTimeout(() => {
            if (document.body.contains(flashBadgeContainer)) {
              document.body.removeChild(flashBadgeContainer);
            }
          }, 300);
          return;
        }
        
        // Update circle
        const dashOffset = circumference * (1 - timeLeft / timeTotalSeconds);
        if (timerCircle) {
          timerCircle.setAttribute('stroke-dashoffset', dashOffset.toString());
        }
        
        // Add urgent pulsing effect when time is running low
        if (timeLeft <= 60) {
          flashBadgeContainer.style.animation = 'circle-pulse 1s infinite';
          timerCircle.setAttribute('stroke', '#dc2626'); // Change color to red
        }
      }

      // Initial setup
      if (timerCircle) {
        timerCircle.setAttribute('stroke-dasharray', circumference.toString());
      }
      
      // Start timer
      const timerInterval = setInterval(updateTimer, 1000);
      
      // Show offer details when clicked
      flashBadgeContainer.addEventListener('click', (e) => {
        if (e.target === closeButton) return;
        
        // Create modal backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center opacity-0 transition-opacity duration-300';
        backdrop.style.backdropFilter = 'blur(3px)';
        document.body.appendChild(backdrop);
        
        // Create offer modal
        const modal = document.createElement('div');
        modal.className = 'bg-white rounded-lg max-w-sm w-full transform scale-95 transition-all duration-300 overflow-hidden';
        modal.innerHTML = `
          <div class="bg-gradient-to-r from-amber-500 to-yellow-500 p-4 text-white relative">
            <button class="close-modal absolute top-2 right-2 text-white/80 hover:text-white p-1 rounded-full hover:bg-black/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-white/20 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </div>
              <div>
                <h3 class="text-lg font-bold">Docker Pro Flash Offer</h3>
                <p class="text-xs text-white/80">Limited time special - act now!</p>
              </div>
            </div>
          </div>
          
          <div class="p-4 space-y-4">
            <div class="flex justify-between items-center py-2 border-b border-gray-100">
              <span class="text-gray-500 text-sm">Regular Price</span>
              <span class="text-gray-400 line-through">$299/year</span>
            </div>
            
            <div class="flex justify-between items-center py-2 border-b border-gray-100">
              <span class="text-gray-900 font-medium">Flash Sale Price</span>
              <div class="flex items-center gap-2">
                <span class="text-lg font-bold text-gray-900">$149</span>
                <span class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">50% OFF</span>
              </div>
            </div>
            
            <div class="bg-gray-50 p-3 rounded-md">
              <div class="flex justify-between items-center mb-1">
                <span class="text-xs text-gray-500">Use Code</span>
                <span class="text-xs text-gray-500">Limited Time</span>
              </div>
              <div class="flex items-center justify-between">
                <code class="text-md font-mono font-bold bg-white px-3 py-1.5 rounded border border-gray-200 text-amber-600">DOCKERPRO50</code>
                <button class="copy-code bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded transition-colors">
                  Copy
                </button>
              </div>
            </div>
            
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span class="text-sm text-gray-600">Unlimited private repositories</span>
              </div>
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span class="text-sm text-gray-600">Advanced image management</span>
              </div>
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span class="text-sm text-gray-600">Priority support access</span>
              </div>
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span class="text-sm text-gray-600">Enhanced security features</span>
              </div>
            </div>
            
            <button class="claim-button w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white py-2.5 rounded font-medium transition-all flex items-center justify-center gap-2">
              <span>Claim This Offer</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
            
            <div class="text-center text-xs text-gray-500">
              Expires in <span class="modal-countdown font-medium text-red-500">${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}</span>
            </div>
          </div>
        `;
        backdrop.appendChild(modal);
        
        // Show modal with animation
        setTimeout(() => {
          backdrop.style.opacity = '1';
          modal.style.transform = 'scale(1)';
        }, 10);
        
        // Handle close button click
        const closeBtn = modal.querySelector('.close-modal');
        if (closeBtn) {
          closeBtn.addEventListener('click', () => {
            backdrop.style.opacity = '0';
            modal.style.transform = 'scale(0.95)';
            setTimeout(() => {
              document.body.removeChild(backdrop);
            }, 300);
          });
        }
        
        // Handle copy button click
        const copyBtn = modal.querySelector('.copy-code');
        if (copyBtn) {
          copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText('DOCKERPRO50');
            copyBtn.textContent = 'Copied!';
            copyBtn.classList.add('bg-green-600');
            setTimeout(() => {
              copyBtn.textContent = 'Copy';
              copyBtn.classList.remove('bg-green-600');
            }, 2000);
          });
        }
        
        // Handle claim button click
        const claimBtn = modal.querySelector('.claim-button');
        if (claimBtn) {
          claimBtn.addEventListener('click', () => {
            modal.innerHTML = `
              <div class="text-center p-8">
                <div class="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Offer Claimed!</h3>
                <p class="text-sm text-gray-600 mb-6">Check your email for details to activate your Docker Pro subscription.</p>
                <button class="close-success bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded font-medium transition-colors">
                  Done
                </button>
              </div>
            `;
            
            // Handle success close button
            const closeSuccessBtn = modal.querySelector('.close-success');
            if (closeSuccessBtn) {
              closeSuccessBtn.addEventListener('click', () => {
                backdrop.style.opacity = '0';
                modal.style.transform = 'scale(0.95)';
                setTimeout(() => {
                  document.body.removeChild(backdrop);
                }, 300);
              });
            }
          });
        }
        
        // Update the countdown in the modal
        const modalCountdown = modal.querySelector('.modal-countdown');
        if (modalCountdown) {
          const updateModalTime = setInterval(() => {
            if (!document.body.contains(backdrop)) {
              clearInterval(updateModalTime);
              return;
            }
            
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            modalCountdown.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          }, 1000);
        }
      });
    };
  };

  // Enhanced Left animation 
  const setFlash2Offer = () => {
    // Create animation element at the left side of the screen
    const leftAnimationElement = document.createElement('div');
    leftAnimationElement.className = 'fixed left-0 inset-y-0 flex items-center z-[9999]';
    leftAnimationElement.style.pointerEvents = 'none';
    leftAnimationElement.innerHTML = `
      <div class="left-anim-container">
        <!-- Background glow effect -->
        <div class="left-glow"></div>
        
        <!-- Animated stars and shapes -->
        <div class="left-star left-star-1">✦</div>
        <div class="left-star left-star-2">★</div>
        <div class="left-star left-star-3">✧</div>
        <div class="left-shape shape-1"></div>
        <div class="left-shape shape-2"></div>
        <div class="left-shape shape-3"></div>
        
        <!-- Flash effect -->
        <div class="left-flash"></div>
        
        <!-- Pulsing circle -->
        <div class="left-pulse-ring"></div>
      </div>
    `;
    document.body.appendChild(leftAnimationElement);
    
    // Add styles for the left side animation
    const leftStyle = document.createElement('style');
    leftStyle.textContent = `
      .left-anim-container {
        position: relative;
        width: 150px;
        height: 300px;
        transform: translateX(-100%);
        animation: slide-in-left 0.5s forwards;
      }
      
      .left-glow {
        position: absolute;
        width: 120px;
        height: 120px;
        left: 40px;
        top: 50%;
        transform: translateY(-50%);
        background: radial-gradient(circle, rgba(56, 189, 248, 0.8) 0%, rgba(56, 189, 248, 0) 70%);
        border-radius: 50%;
        opacity: 0;
        animation: pulse-in 0.8s forwards;
        filter: blur(5px);
      }
      
      .left-star {
        position: absolute;
        color: white;
        opacity: 0;
        text-shadow: 0 0 8px rgba(56, 189, 248, 1);
        animation: star-pop 0.6s forwards;
      }
      
      .left-star-1 {
        left: 40px;
        top: 30%;
        font-size: 28px;
        animation-delay: 0.3s;
      }
      
      .left-star-2 {
        left: 80px;
        top: 50%;
        font-size: 35px;
        animation-delay: 0.5s;
      }
      
      .left-star-3 {
        left: 50px;
        top: 70%;
        font-size: 25px;
        animation-delay: 0.7s;
      }
      
      .left-shape {
        position: absolute;
        opacity: 0;
        animation: shape-float 4s ease-in-out infinite, fade-in 0.5s forwards;
      }
      
      .shape-1 {
        width: 25px;
        height: 25px;
        left: 100px;
        top: 35%;
        background: linear-gradient(135deg, #38bdf8, #0284c7);
        border-radius: 4px;
        transform: rotate(45deg);
        animation-delay: 0.4s;
      }
      
      .shape-2 {
        width: 20px;
        height: 20px;
        left: 60px;
        top: 45%;
        background: linear-gradient(135deg, #0ea5e9, #0284c7);
        border-radius: 50%;
        animation-delay: 0.6s;
      }
      
      .shape-3 {
        width: 18px;
        height: 18px;
        left: 90px;
        top: 65%;
        background: linear-gradient(135deg, #38bdf8, #0ea5e9);
        border-radius: 3px;
        transform: rotate(30deg);
        animation-delay: 0.8s;
      }
      
      .left-flash {
        position: absolute;
        left: 60px;
        top: 50%;
        transform: translateY(-50%);
        width: 70px;
        height: 70px;
        background: white;
        border-radius: 50%;
        opacity: 0;
        animation: flash-pulse 0.4s forwards 0.2s;
        filter: blur(2px);
      }
      
      .left-pulse-ring {
        position: absolute;
        left: 60px;
        top: 50%;
        transform: translateY(-50%);
        width: 60px;
        height: 60px;
        border: 3px solid rgba(56, 189, 248, 0.8);
        border-radius: 50%;
        opacity: 0;
        animation: pulse-ring 2s ease-out infinite;
        animation-delay: 1s;
      }
      
      @keyframes slide-in-left {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(0); }
      }
      
      @keyframes pulse-in {
        0% { opacity: 0; transform: translateY(-50%) scale(0.5); }
        70% { opacity: 0.8; transform: translateY(-50%) scale(1.2); }
        100% { opacity: 0.6; transform: translateY(-50%) scale(1); }
      }
      
      @keyframes star-pop {
        0% { opacity: 0; transform: scale(0) rotate(-45deg); }
        70% { opacity: 1; transform: scale(1.3) rotate(0deg); }
        100% { opacity: 0.9; transform: scale(1) rotate(0deg); }
      }
      
      @keyframes shape-float {
        0%, 100% { transform: translateY(0) rotate(var(--rotation, 0deg)); }
        50% { transform: translateY(-15px) rotate(var(--rotation, 0deg)); }
      }
      
      @keyframes fade-in {
        0% { opacity: 0; }
        100% { opacity: 0.8; }
      }
      
      @keyframes flash-pulse {
        0% { opacity: 0.8; transform: translateY(-50%) scale(0.5); }
        50% { opacity: 1; transform: translateY(-50%) scale(1.2); }
        100% { opacity: 0; transform: translateY(-50%) scale(0.1); }
      }
      
      @keyframes pulse-ring {
        0% { transform: translateY(-50%) scale(0.8); opacity: 0.8; }
        70% { transform: translateY(-50%) scale(1.3); opacity: 0.2; }
        100% { transform: translateY(-50%) scale(1.5); opacity: 0; }
      }
    `;
    document.head.appendChild(leftStyle);
    
    // After the animation, create the permanent icon at the left side
    setTimeout(() => {
      document.body.removeChild(leftAnimationElement);
      createLeftIcon();
    }, 1800);
    
    // Function to create the persistent icon at the left side
    const createLeftIcon = () => {
      // Create the container for the left side icon
      const leftIconContainer = document.createElement('div');
      leftIconContainer.style.position = 'fixed';
      leftIconContainer.style.left = '20px';
      leftIconContainer.style.top = '50%';
      leftIconContainer.style.transform = 'translateY(-50%)';
      leftIconContainer.style.zIndex = '9997';
      leftIconContainer.style.cursor = 'pointer';
      leftIconContainer.style.transition = 'transform 0.3s';
      
      // Add a close button
      const closeButton = document.createElement('button');
      closeButton.className = 'absolute -top-2 -right-2 w-5 h-5 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs opacity-0 transition-opacity';
      closeButton.innerHTML = '✕';
      
      // Create the notification badge
      const notificationBadge = document.createElement('div');
      notificationBadge.className = 'absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white';
      notificationBadge.textContent = '1';
      
      // Create the icon content with glowing circle and lightning bolt
      const iconContent = document.createElement('div');
      iconContent.style.position = 'relative';
      iconContent.style.width = '50px';
      iconContent.style.height = '50px';
      iconContent.style.borderRadius = '50%';
      iconContent.style.background = 'linear-gradient(135deg, #0ea5e9, #0284c7)';
      iconContent.style.display = 'flex';
      iconContent.style.alignItems = 'center';
      iconContent.style.justifyContent = 'center';
      iconContent.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
      iconContent.style.animation = 'left-icon-pulse 3s infinite, left-float 4s ease-in-out infinite';
      
      iconContent.innerHTML = `
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="none" class="left-icon-zap">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      `;
      
      // Add tooltip on hover
      const tooltip = document.createElement('div');
      tooltip.style.position = 'absolute';
      tooltip.style.left = '100%';
      tooltip.style.top = '50%';
      tooltip.style.transform = 'translateY(-50%)';
      tooltip.style.marginLeft = '12px';
      tooltip.style.width = '180px';
      tooltip.style.backgroundColor = 'rgba(15, 23, 42, 0.9)';
      tooltip.style.color = 'white';
      tooltip.style.padding = '10px';
      tooltip.style.borderRadius = '6px';
      tooltip.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
      tooltip.style.transition = 'opacity 0.2s, visibility 0.2s';
      tooltip.style.backdropFilter = 'blur(4px)';
      tooltip.style.zIndex = '9998';
      tooltip.style.pointerEvents = 'none';
      tooltip.style.opacity = '0';
      tooltip.style.visibility = 'hidden';
      
      tooltip.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 6px; font-size: 14px;">New Reward Available!</div>
        <div style="font-size: 12px; margin-bottom: 4px;">• Special event reward</div>
        <div style="font-size: 12px; margin-bottom: 4px;">• Limited time offer</div>
        <div style="font-size: 12px; font-style: italic; margin-top: 8px;">Click to claim</div>
      `;
      
      // Add tooltip arrow
      const tooltipArrow = document.createElement('div');
      tooltipArrow.style.position = 'absolute';
      tooltipArrow.style.left = '-6px';
      tooltipArrow.style.top = '50%';
      tooltipArrow.style.transform = 'translateY(-50%)';
      tooltipArrow.style.width = '0';
      tooltipArrow.style.height = '0';
      tooltipArrow.style.borderTop = '6px solid transparent';
      tooltipArrow.style.borderBottom = '6px solid transparent';
      tooltipArrow.style.borderRight = '6px solid rgba(15, 23, 42, 0.9)';
      
      tooltip.appendChild(tooltipArrow);
      
      // Add styles for continuous animation
      const leftIconStyle = document.createElement('style');
      leftIconStyle.textContent = `
        @keyframes left-icon-pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.7); }
          50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(14, 165, 233, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(14, 165, 233, 0); }
        }
        
        @keyframes left-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }
        
        @keyframes zap-glow {
          0% { filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.5)); }
          50% { filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.9)); }
          100% { filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.5)); }
        }
        
        .left-icon-zap {
          animation: zap-glow 2s infinite;
        }
      `;
      document.head.appendChild(leftIconStyle);
      
      // Create star elements that occasionally appear around the icon
      const starContainer = document.createElement('div');
      starContainer.style.position = 'absolute';
      starContainer.style.width = '100%';
      starContainer.style.height = '100%';
      starContainer.style.zIndex = '-1';
      starContainer.style.pointerEvents = 'none';
      
      function createRandomStar() {
        if (!document.body.contains(leftIconContainer)) return;
        
        const star = document.createElement('div');
        star.className = 'micro-star';
        
        // Random position around the icon
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 20;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        star.style.position = 'absolute';
        star.style.left = `calc(50% + ${x}px)`;
        star.style.top = `calc(50% + ${y}px)`;
        star.style.width = `${3 + Math.random() * 4}px`;
        star.style.height = `${3 + Math.random() * 4}px`;
        star.style.backgroundColor = '#fff';
        star.style.borderRadius = '50%';
        star.style.opacity = '0';
        star.style.filter = 'blur(1px)';
        star.style.animation = `micro-star-fade 1.5s ease-out forwards`;
        
        starContainer.appendChild(star);
        
        // Clean up after animation
        setTimeout(() => {
          if (starContainer.contains(star)) {
            starContainer.removeChild(star);
          }
        }, 1500);
        
        // Schedule next star
        setTimeout(createRandomStar, 600 + Math.random() * 1000);
      }
      
      // Add star fade animation
      const starStyle = document.createElement('style');
      starStyle.textContent = `
        @keyframes micro-star-fade {
          0% { transform: scale(0); opacity: 0; }
          30% { transform: scale(1.2); opacity: 0.8; }
          100% { transform: scale(0.5); opacity: 0; }
        }
      `;
      document.head.appendChild(starStyle);
      
      // Assemble all components of the left icon
      iconContent.appendChild(starContainer);
      leftIconContainer.appendChild(iconContent);
      leftIconContainer.appendChild(notificationBadge);
      leftIconContainer.appendChild(closeButton);
      leftIconContainer.appendChild(tooltip);
      document.body.appendChild(leftIconContainer);
      
      // Start star effect
      setTimeout(createRandomStar, 1000);
      
      // Add entrance animation for the icon
      leftIconContainer.style.opacity = '0';
      leftIconContainer.style.transform = 'translateY(-50%) scale(0.5)';
      
      setTimeout(() => {
        leftIconContainer.style.opacity = '1';
        leftIconContainer.style.transform = 'translateY(-50%) scale(1)';
        leftIconContainer.style.transition = 'opacity 0.3s, transform 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
      }, 10);
      
      // Add hover effects
      leftIconContainer.addEventListener('mouseenter', () => {
        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = '1';
        leftIconContainer.style.transform = 'translateY(-50%) scale(1.05)';
        closeButton.style.opacity = '1';
      });
      
      leftIconContainer.addEventListener('mouseleave', () => {
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
        leftIconContainer.style.transform = 'translateY(-50%) scale(1)';
        // Only hide close button when not hovering
        if (!closeButton.matches(':hover')) {
          closeButton.style.opacity = '0';
        }
      });
      
      // Improved close button hover
      closeButton.addEventListener('mouseenter', () => {
        closeButton.style.backgroundColor = 'rgba(220, 38, 38, 0.8)';
      });
      
      closeButton.addEventListener('mouseleave', () => {
        closeButton.style.backgroundColor = 'rgba(30, 41, 59, 0.8)';
        if (!leftIconContainer.matches(':hover')) {
          closeButton.style.opacity = '0';
        }
      });
      
      // Handle close button click
      closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        leftIconContainer.style.opacity = '0';
        leftIconContainer.style.transform = 'translateY(-50%) scale(0.5)';
        setTimeout(() => {
          if (document.body.contains(leftIconContainer)) {
            document.body.removeChild(leftIconContainer);
          }
        }, 300);
      });
      
      // Show reward details when clicked
      leftIconContainer.addEventListener('click', (e) => {
        if (e.target === closeButton) return;
        
        // Create modal backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center opacity-0 transition-opacity duration-300';
        backdrop.style.backdropFilter = 'blur(3px)';
        document.body.appendChild(backdrop);
        
        // Create reward modal
        const modal = document.createElement('div');
        modal.className = 'bg-white rounded-lg max-w-sm w-full transform scale-95 transition-all duration-300 overflow-hidden';
        modal.innerHTML = `
          <div class="bg-gradient-to-r from-sky-600 to-blue-600 p-4 text-white relative">
            <button class="close-modal absolute top-2 right-2 text-white/80 hover:text-white p-1 rounded-full hover:bg-black/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-white/20 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
              <div>
                <h3 class="text-lg font-bold">Special Event Reward</h3>
                <p class="text-xs text-white/80">Limited time offer - claim now!</p>
              </div>
            </div>
          </div>
          
          <div class="p-4 space-y-4">
            <div class="flex justify-center py-3">
              <div class="relative">
                <img src="https://placehold.co/200x150/3b82f6/FFFFFF/?text=Special+Reward" class="rounded-lg shadow-md" alt="Special Reward" />
                <div class="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                  NEW
                </div>
              </div>
            </div>
            
            <div class="flex flex-col gap-2">
              <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  </div>
                  <span class="text-sm text-gray-700">Event Points</span>
                </div>
                <span class="font-bold text-blue-600">+500</span>
              </div>
              
              <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  </div>
                  <span class="text-sm text-gray-700">Booster</span>
                </div>
                <span class="font-bold text-green-600">+25% (48h)</span>
              </div>
              
              <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                  </div>
                  <span class="text-sm text-gray-700">Profile Badge</span>
                </div>
                <span class="font-bold text-purple-600">Exclusive</span>
              </div>
            </div>
            
            <button class="claim-button w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white py-2.5 rounded font-medium transition-all flex items-center justify-center gap-2">
              <span>Claim Rewards Now</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>
        `;
        backdrop.appendChild(modal);
        
        // Show modal with animation
        setTimeout(() => {
          backdrop.style.opacity = '1';
          modal.style.transform = 'scale(1)';
        }, 10);
        
        // Handle close button click
        const closeBtn = modal.querySelector('.close-modal');
        if (closeBtn) {
          closeBtn.addEventListener('click', () => {
            backdrop.style.opacity = '0';
            modal.style.transform = 'scale(0.95)';
            setTimeout(() => {
              document.body.removeChild(backdrop);
            }, 300);
          });
        }
        
        // Handle claim button click
        const claimBtn = modal.querySelector('.claim-button');
        if (claimBtn) {
          claimBtn.addEventListener('click', () => {
            modal.innerHTML = `
              <div class="text-center p-8">
                <div class="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Rewards Claimed!</h3>
                <p class="text-sm text-gray-600 mb-6">Items have been added to your account.</p>
                <button class="close-success bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded font-medium transition-colors">
                  Done
                </button>
              </div>
            `;
            
            // Remove notification badge
            if (document.body.contains(leftIconContainer)) {
              leftIconContainer.removeChild(notificationBadge);
            }
            
            // Handle success close button
            const closeSuccessBtn = modal.querySelector('.close-success');
            if (closeSuccessBtn) {
              closeSuccessBtn.addEventListener('click', () => {
                backdrop.style.opacity = '0';
                modal.style.transform = 'scale(0.95)';
                setTimeout(() => {
                  document.body.removeChild(backdrop);
                }, 300);
              });
            }
          });
        }
      });
    };
  };

  // Flash Offer 3 - Shows a moving animation on the left side of the screen
  const setFlash3Offer = () => {
    // Create animation element at the left side of the screen with moving effect
    const movingAnimationElement = document.createElement('div');
    movingAnimationElement.className = 'fixed left-0 inset-y-0 flex items-center z-[9999]';
    movingAnimationElement.style.pointerEvents = 'none';
    movingAnimationElement.innerHTML = `
      <div class="move-anim-container">
        <!-- Track for the moving animation -->
        <div class="move-track"></div>
        
        <!-- Moving object -->
        <div class="move-object">
          <div class="move-glow"></div>
          <div class="move-content">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="white" stroke="none">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          </div>
          <div class="move-trail"></div>
        </div>
        
        <!-- Particle effects -->
        <div class="move-particles">
          <div class="particle p1"></div>
          <div class="particle p2"></div>
          <div class="particle p3"></div>
          <div class="particle p4"></div>
          <div class="particle p5"></div>
        </div>
      </div>
    `;
    document.body.appendChild(movingAnimationElement);
    
    // Add styles for the moving animation
    const moveStyle = document.createElement('style');
    moveStyle.textContent = `
      .move-anim-container {
        position: relative;
        width: 300px;
        height: 100vh;
        overflow: hidden;
      }
      
      .move-track {
        position: absolute;
        left: 20px;
        top: 0;
        bottom: 0;
        width: 4px;
        background: linear-gradient(to bottom, 
          rgba(219, 39, 119, 0), 
          rgba(219, 39, 119, 0.5) 20%, 
          rgba(219, 39, 119, 0.5) 80%, 
          rgba(219, 39, 119, 0)
        );
        border-radius: 2px;
        opacity: 0;
        animation: track-fade-in 0.5s forwards 0.2s;
      }
      
      .move-object {
        position: absolute;
        left: 20px;
        top: 100%;
        width: 50px;
        height: 50px;
        transform: translate(-50%, -50%);
        animation: move-up 4s cubic-bezier(0.23, 1, 0.32, 1) forwards;
      }
      
      .move-glow {
        position: absolute;
        width: 80px;
        height: 80px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: radial-gradient(circle, rgba(219, 39, 119, 0.6) 0%, rgba(219, 39, 119, 0) 70%);
        border-radius: 50%;
        animation: pulse-glow 1s infinite alternate;
      }
      
      .move-content {
        position: absolute;
        width: 50px;
        height: 50px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #db2777, #9333ea);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 20px rgba(219, 39, 119, 0.6);
        animation: rotate 2s linear infinite;
      }
      
      .move-trail {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 100px;
        background: linear-gradient(to top, rgba(219, 39, 119, 0.8), rgba(219, 39, 119, 0));
        border-radius: 5px;
        z-index: -1;
        opacity: 0.7;
        filter: blur(3px);
      }
      
      .move-particles {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
      
      .particle {
        position: absolute;
        width: 8px;
        height: 8px;
        background: white;
        border-radius: 50%;
        opacity: 0;
        animation: particle-fade 1.5s ease-out forwards;
      }
      
      .p1 { left: 40px; top: 30%; animation-delay: 1s; }
      .p2 { left: 60px; top: 45%; animation-delay: 1.5s; }
      .p3 { left: 30px; top: 60%; animation-delay: 2s; }
      .p4 { left: 70px; top: 70%; animation-delay: 2.5s; }
      .p5 { left: 50px; top: 80%; animation-delay: 3s; }
      
      @keyframes track-fade-in {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
      
      @keyframes move-up {
        0% { top: 100%; }
        20% { top: 80%; }
        40% { top: 55%; transform: translate(-50%, -50%) translateX(20px); }
        60% { top: 40%; transform: translate(-50%, -50%) translateX(-20px); }
        80% { top: 20%; transform: translate(-50%, -50%) translateX(10px); }
        100% { top: 0%; transform: translate(-50%, -50%) translateX(0); }
      }
      
      @keyframes pulse-glow {
        0% { opacity: 0.5; transform: translate(-50%, -50%) scale(0.9); }
        100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
      }
      
      @keyframes rotate {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
      }
      
      @keyframes particle-fade {
        0% { transform: scale(0) translateX(0); opacity: 0; }
        20% { transform: scale(1.2) translateX(10px); opacity: 0.8; }
        80% { transform: scale(0.8) translateX(30px); opacity: 0.6; }
        100% { transform: scale(0) translateX(50px); opacity: 0; }
      }
    `;
    document.head.appendChild(moveStyle);
    
    // After the animation completes, create a persistent icon
    setTimeout(() => {
      document.body.removeChild(movingAnimationElement);
      createMovingIcon();
    }, 4000);
    
    // Function to create the persistent moving icon
    const createMovingIcon = () => {
      // Create a persistent icon container
      const moveIconContainer = document.createElement('div');
      moveIconContainer.style.position = 'fixed';
      moveIconContainer.style.left = '20px';
      moveIconContainer.style.top = '20px';
      moveIconContainer.style.zIndex = '9997';
      moveIconContainer.style.cursor = 'pointer';
      moveIconContainer.style.transition = 'transform 0.3s';
      
      // Create close button
      const closeButton = document.createElement('button');
      closeButton.style.background = 'rgba(30, 41, 59, 0.8)';
      closeButton.style.border = 'none';
      closeButton.style.color = 'white';
      closeButton.style.position = 'absolute';
      closeButton.style.top = '-6px';
      closeButton.style.right = '-6px';
      closeButton.style.width = '18px';
      closeButton.style.height = '18px';
      closeButton.style.borderRadius = '50%';
      closeButton.style.display = 'flex';
      closeButton.style.alignItems = 'center';
      closeButton.style.justifyContent = 'center';
      closeButton.style.cursor = 'pointer';
      closeButton.style.fontSize = '12px';
      closeButton.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
      closeButton.style.opacity = '0';
      closeButton.style.transition = 'opacity 0.2s, background-color 0.2s';
      closeButton.style.zIndex = '2';
      closeButton.innerHTML = '✕';
      
      // Create notification badge
      const notificationBadge = document.createElement('div');
      notificationBadge.style.position = 'absolute';
      notificationBadge.style.top = '-5px';
      notificationBadge.style.right = '-5px';
      notificationBadge.style.width = '20px';
      notificationBadge.style.height = '20px';
      notificationBadge.style.borderRadius = '50%';
      notificationBadge.style.backgroundColor = '#ef4444';
      notificationBadge.style.color = 'white';
      notificationBadge.style.display = 'flex';
      notificationBadge.style.alignItems = 'center';
      notificationBadge.style.justifyContent = 'center';
      notificationBadge.style.fontSize = '12px';
      notificationBadge.style.fontWeight = 'bold';
      notificationBadge.style.border = '2px solid white';
      notificationBadge.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
      notificationBadge.style.zIndex = '1';
      notificationBadge.textContent = '1';
      
      // Create icon content
      const iconContent = document.createElement('div');
      iconContent.style.position = 'relative';
      iconContent.style.width = '50px';
      iconContent.style.height = '50px';
      iconContent.style.borderRadius = '50%';
      iconContent.style.background = 'linear-gradient(135deg, #db2777, #9333ea)';
      iconContent.style.display = 'flex';
      iconContent.style.alignItems = 'center';
      iconContent.style.justifyContent = 'center';
      iconContent.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
      iconContent.style.animation = 'move-icon-pulse 3s infinite, move-bounce 5s infinite';
      
      iconContent.innerHTML = `
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="none" class="move-icon-zap">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      `;
      
      // Add tooltip
      const tooltip = document.createElement('div');
      tooltip.style.position = 'absolute';
      tooltip.style.left = 'calc(100% + 12px)';
      tooltip.style.top = '50%';
      tooltip.style.transform = 'translateY(-50%)';
      tooltip.style.width = '180px';
      tooltip.style.backgroundColor = 'rgba(15, 23, 42, 0.9)';
      tooltip.style.color = 'white';
      tooltip.style.padding = '10px';
      tooltip.style.borderRadius = '6px';
      tooltip.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
      tooltip.style.transition = 'opacity 0.2s, visibility 0.2s';
      tooltip.style.backdropFilter = 'blur(4px)';
      tooltip.style.zIndex = '9998';
      tooltip.style.pointerEvents = 'none';
      tooltip.style.opacity = '0';
      tooltip.style.visibility = 'hidden';
      
      tooltip.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 6px; font-size: 14px;">Premium Offer Alert!</div>
        <div style="font-size: 12px; margin-bottom: 4px;">• Exclusive premium bundle</div>
        <div style="font-size: 12px; margin-bottom: 4px;">• 75% off today only</div>
        <div style="font-size: 12px; font-style: italic; margin-top: 8px;">Click to view details</div>
      `;
      
      // Add tooltip arrow
      const tooltipArrow = document.createElement('div');
      tooltipArrow.style.position = 'absolute';
      tooltipArrow.style.left = '-6px';
      tooltipArrow.style.top = '50%';
      tooltipArrow.style.transform = 'translateY(-50%)';
      tooltipArrow.style.width = '0';
      tooltipArrow.style.height = '0';
      tooltipArrow.style.borderTop = '6px solid transparent';
      tooltipArrow.style.borderBottom = '6px solid transparent';
      tooltipArrow.style.borderRight = '6px solid rgba(15, 23, 42, 0.9)';
      
      tooltip.appendChild(tooltipArrow);
      
      // Add styles for continuous animation
      const moveIconStyle = document.createElement('style');
      moveIconStyle.textContent = `
        @keyframes move-icon-pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(219, 39, 119, 0.7); }
          50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(219, 39, 119, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(219, 39, 119, 0); }
        }
        
        @keyframes move-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes move-glow {
          0% { filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.5)); }
          50% { filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.9)); }
          100% { filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.5)); }
        }
        
        .move-icon-zap {
          animation: move-glow 2s infinite;
        }
      `;
      document.head.appendChild(moveIconStyle);
      
      // Assemble components
      moveIconContainer.appendChild(iconContent);
      moveIconContainer.appendChild(notificationBadge);
      moveIconContainer.appendChild(closeButton);
      moveIconContainer.appendChild(tooltip);
      document.body.appendChild(moveIconContainer);
      
      // Add entrance animation
      moveIconContainer.style.opacity = '0';
      moveIconContainer.style.transform = 'scale(0.5)';
      
      setTimeout(() => {
        moveIconContainer.style.opacity = '1';
        moveIconContainer.style.transform = 'scale(1)';
        moveIconContainer.style.transition = 'opacity 0.3s, transform 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
      }, 10);
      
      // Add hover effects
      moveIconContainer.addEventListener('mouseenter', () => {
        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = '1';
        moveIconContainer.style.transform = 'scale(1.05)';
        closeButton.style.opacity = '1';
      });
      
      moveIconContainer.addEventListener('mouseleave', () => {
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
        moveIconContainer.style.transform = 'scale(1)';
        if (!closeButton.matches(':hover')) {
          closeButton.style.opacity = '0';
        }
      });
      
      // Close button hover effects
      closeButton.addEventListener('mouseenter', () => {
        closeButton.style.backgroundColor = 'rgba(220, 38, 38, 0.8)';
      });
      
      closeButton.addEventListener('mouseleave', () => {
        closeButton.style.backgroundColor = 'rgba(30, 41, 59, 0.8)';
        if (!moveIconContainer.matches(':hover')) {
          closeButton.style.opacity = '0';
        }
      });
      
      // Handle close button click
      closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        moveIconContainer.style.opacity = '0';
        moveIconContainer.style.transform = 'scale(0.5)';
        setTimeout(() => {
          if (document.body.contains(moveIconContainer)) {
            document.body.removeChild(moveIconContainer);
          }
        }, 300);
      });
      
      // Show premium offer modal when clicked
      moveIconContainer.addEventListener('click', (e) => {
        if (e.target === closeButton) return;
        
        // Create modal backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center opacity-0 transition-opacity duration-300';
        backdrop.style.backdropFilter = 'blur(3px)';
        document.body.appendChild(backdrop);
        
        // Create premium offer modal
        const modal = document.createElement('div');
        modal.className = 'bg-white rounded-lg max-w-sm w-full transform scale-95 transition-all duration-300 overflow-hidden';
        modal.innerHTML = `
          <div class="bg-gradient-to-r from-pink-600 to-purple-600 p-4 text-white relative">
            <button class="close-modal absolute top-2 right-2 text-white/80 hover:text-white p-1 rounded-full hover:bg-black/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-white/20 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </div>
              <div>
                <h3 class="text-lg font-bold">Premium Bundle Offer</h3>
                <p class="text-xs text-white/80">Today only - 75% off!</p>
              </div>
            </div>
          </div>
          
          <div class="p-4 space-y-4">
            <div class="flex justify-center py-3">
              <div class="relative">
                <img src="https://placehold.co/200x150/db2777/FFFFFF/?text=Premium+Bundle" class="rounded-lg shadow-md" alt="Premium Bundle" />
                <div class="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded">
                  -75%
                </div>
              </div>

            </div>
            
            <div class="flex justify-between items-center py-2 border-b border-gray-100">
              <span class="text-gray-500 text-sm">Regular Price</span>
              <span class="text-gray-400 line-through">$199.99</span>
            </div>
            
            <div class="flex justify-between items-center py-2 border-b border-gray-100">
              <span class="text-gray-900 font-medium">Flash Sale Price</span>
              <div class="flex items-center gap-2">
                <span class="text-lg font-bold text-gray-900">$49.99</span>
                <span class="bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded">SAVE $150</span>
              </div>
            </div>
            
            <div class="flex flex-col gap-2 mt-3">
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-pink-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span class="text-sm text-gray-600">Premium theme pack (25 themes)</span>
              </div>
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-pink-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span class="text-sm text-gray-600">Exclusive avatar collection</span>
              </div>
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-pink-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span class="text-sm text-gray-600">30 days of premium status</span>
              </div>
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-pink-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span class="text-sm text-gray-600">10,000 game credits bonus</span>
              </div>
            </div>
            
            <button class="purchase-button w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-2.5 rounded font-medium transition-all flex items-center justify-center gap-2">
              <span>Get Premium Bundle</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
            
            <div class="text-center text-xs text-gray-500 mt-2">
              Limited time offer - expires in <span class="font-medium text-pink-600">11:59:42</span>
            </div>
          </div>
        `;
        backdrop.appendChild(modal);
        
        // Show modal with animation
        setTimeout(() => {
          backdrop.style.opacity = '1';
          modal.style.transform = 'scale(1)';
        }, 10);
        
        // Handle close button click
        const closeBtn = modal.querySelector('.close-modal');
        if (closeBtn) {
          closeBtn.addEventListener('click', () => {
            backdrop.style.opacity = '0';
            modal.style.transform = 'scale(0.95)';
            setTimeout(() => {
              document.body.removeChild(backdrop);
            }, 300);
          });
        }
        
        // Handle purchase button click
        const purchaseBtn = modal.querySelector('.purchase-button');
        if (purchaseBtn) {
          purchaseBtn.addEventListener('click', () => {
            modal.innerHTML = `
              <div class="text-center p-8">
                <div class="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Purchase Complete!</h3>
                <p class="text-sm text-gray-600 mb-6">Your premium bundle has been activated.</p>
                <button class="close-success bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded font-medium transition-colors">
                  Done
                </button>
              </div>
            `;
            
            // Remove notification badge
            if (document.body.contains(moveIconContainer)) {
              moveIconContainer.removeChild(notificationBadge);
            }
            
            // Handle success close button
            const closeSuccessBtn = modal.querySelector('.close-success');
            if (closeSuccessBtn) {
              closeSuccessBtn.addEventListener('click', () => {
                backdrop.style.opacity = '0';
                modal.style.transform = 'scale(0.95)';
                setTimeout(() => {
                  document.body.removeChild(backdrop);
                }, 300);
              });
            }
          });
        }
      });
    };
  };

  // Enhanced Earn Move animation
  const setFlash4Offer = () => {
    // Create animation element
    const earnAnimElement = document.createElement('div');
    earnAnimElement.className = 'fixed right-24 top-1/2 -translate-y-1/2 z-[9999]';
    earnAnimElement.style.pointerEvents = 'none';
    earnAnimElement.innerHTML = `
      <div class="earn-container">
        <div class="earn-glow"></div>
        <div class="coin-shower"></div>
        <div class="earn-message">
          <span class="earn-value">+500</span>
          <span class="earn-label">COINS</span>
        </div>
      </div>
    `;
    document.body.appendChild(earnAnimElement);
    
    // Create coin elements dynamically
    const coinShower = earnAnimElement.querySelector('.coin-shower');
    for (let i = 0; i < 20; i++) {
      const coin = document.createElement('div');
      coin.className = 'coin';
      
      // Set random properties for each coin
      const size = 15 + Math.random() * 10;
      const posX = -100 + Math.random() * 200;
      const delay = Math.random() * 0.5;
      const duration = 0.5 + Math.random() * 1;
      const rotation = Math.random() * 360;
      
      coin.style.width = `${size}px`;
      coin.style.height = `${size}px`;
      coin.style.left = `calc(50% + ${posX}px)`;
      coin.style.animationDelay = `${delay}s`;
      coin.style.animationDuration = `${duration}s`;
      coin.style.transform = `rotate(${rotation}deg)`;
      
      coin.innerHTML = `
        <svg viewBox="0 0 24 24" fill="#FFD700" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#FFD700" stroke="#E6B800" stroke-width="1" />
          <text x="50%" y="50%" font-size="10" font-weight="bold" fill="#E6B800" text-anchor="middle" dominant-baseline="middle">$</text>
        </svg>
      `;
      
      coinShower?.appendChild(coin);
    }
    
    // Add styles for the earn animation
    const earnStyle = document.createElement('style');
    earnStyle.textContent = `
      .earn-container {
        position: relative;
        width: 180px;
        height: 180px;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: earn-pop 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67) forwards;
        transform: scale(0);
      }
      
      .earn-glow {
        position: absolute;
        width: 140px;
        height: 140px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, rgba(255, 215, 0, 0) 70%);
        animation: glow-pulse 2s ease-out infinite;
        filter: blur(8px);
      }
      
      .coin-shower {
        position: absolute;
        width: 200px;
        height: 200px;
        pointer-events: none;
      }
      
      .coin {
        position: absolute;
        top: 50%;
        width: 20px;
        height: 20px;
        animation: coin-fall forwards;
        opacity: 0;
        filter: drop-shadow(0 3px 3px rgba(0, 0, 0, 0.3));
      }
      
      .earn-message {
        position: relative;
        background: linear-gradient(135deg, #FFD700, #FFA500);
        border-radius: 12px;
        padding: 12px 18px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transform: scale(0);
        animation: message-pop 0.3s ease-out forwards 0.2s;
        box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
        border: 2px solid rgba(255, 255, 255, 0.5);
      }
      
      .earn-value {
        font-size: 30px;
        font-weight: bold;
        color: white;
        text-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
        line-height: 1;
        margin-bottom: 2px;
      }
      
      .earn-label {
        font-size: 14px;
        font-weight: bold;
        color: white;
        letter-spacing: 1px;
        opacity: 0.9;
      }
      
      @keyframes earn-pop {
        0% { transform: scale(0); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
      
      @keyframes glow-pulse {
        0% { transform: scale(1); opacity: 0.6; }
        50% { transform: scale(1.2); opacity: 0.9; }
        100% { transform: scale(1); opacity: 0.6; }
      }
      
      @keyframes coin-fall {
        0% { transform: translateY(0) rotate(0deg) scale(0); opacity: 0; }
        10% { opacity: 1; }
        100% { transform: translateY(150px) rotate(360deg) scale(1); opacity: 0; }
      }
      
      @keyframes message-pop {
        0% { transform: scale(0.5); }
        70% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
    `;
    document.head.appendChild(earnStyle);
    
    // Create the persistent earnings widget after animation
    setTimeout(() => {
      document.body.removeChild(earnAnimElement);
      createEarningsWidget();
    }, 2000);
    
    // Function to create the persistent earnings widget
    const createEarningsWidget = () => {
      const earningsWidget = document.createElement('div');
      earningsWidget.className = 'fixed right-10 top-24 z-[9997] flex items-center justify-center';
      earningsWidget.style.opacity = '0';
      earningsWidget.style.transition = 'all 0.3s ease';
      
      // Create a close button
      const closeButton = document.createElement('button');
      closeButton.className = 'absolute -top-2 -right-2 w-5 h-5 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs opacity-0 transition-opacity';
      closeButton.innerHTML = '✕';
      
      earningsWidget.innerHTML = `
        <div class="earnings-card">
          <div class="earnings-header">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#FFD700" xmlns="http://www.w3.org/2000/svg" class="earnings-icon">
              <circle cx="12" cy="12" r="11" fill="#FFD700" stroke="#E6B800" stroke-width="1" />
              <text x="50%" y="50%" font-size="10" font-weight="bold" fill="#E6B800" text-anchor="middle" dominant-baseline="middle">$</text>
            </svg>
            <div class="earnings-title">Your Earnings</div>
          </div>
          <div class="earnings-amount">
            <span class="current-amount">500</span>
            <div class="amount-change">+100</div>
          </div>
          <div class="earnings-footer">
            <div class="earnings-rate">+5 coins/min</div>
            <button class="earnings-collect">Collect</button>
          </div>
          <div class="glow-effect"></div>
        </div>
      `;
      
      // Add close button
      earningsWidget.appendChild(closeButton);
      
      // Add styles for the earnings widget
      const widgetStyle = document.createElement('style');
      widgetStyle.textContent = `
        .earnings-card {
          background: linear-gradient(135deg, #2C3E50, #1A202C);
          border-radius: 12px;
          padding: 12px;
          width: 180px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          animation: widget-float 4s ease-in-out infinite;
        }
        
        .earnings-header {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .earnings-icon {
          margin-right: 8px;
          filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.3));
        }
        
        .earnings-title {
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          font-weight: 600;
        }
        
        .earnings-amount {
          text-align: center;
          margin: 10px 0;
          position: relative;
          height: 40px;
        }
        
        .current-amount {
          font-size: 32px;
          font-weight: bold;
          color: #FFD700;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
          position: relative;
        }
        
        .current-amount::before {
          content: '$ ';
          font-size: 20px;
          color: #E6B800;
          vertical-align: top;
        }
        
        .amount-change {
          position: absolute;
          right: 12px;
          top: 0;
          background: rgba(16, 185, 129, 0.2);
          color: #10B981;
          padding: 2px 5px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
          animation: change-pop 2s infinite;
        }
        
        .earnings-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 5px;
        }
        
        .earnings-rate {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
        }
        
        .earnings-collect {
          background: linear-gradient(135deg, #FFD700, #FFA500);
          border: none;
          border-radius: 4px;
          padding: 4px 8px;
          color: white;
          font-size: 12px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .earnings-collect:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 5px rgba(255, 215, 0, 0.4);
        }
        
        .glow-effect {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(ellipse at center, rgba(255, 215, 0, 0.15) 0%, rgba(255, 215, 0, 0) 70%);
          pointer-events: none;
          animation: glow-rotate 10s linear infinite;
        }
        
        @keyframes widget-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes change-pop {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        
        @keyframes glow-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(widgetStyle);
      
      // Add widget to the page with animation
      document.body.appendChild(earningsWidget);
      setTimeout(() => {
        earningsWidget.style.opacity = '1';
        earningsWidget.style.transform = 'translateY(0)';
      }, 100);
      
      // Show close button on hover
      earningsWidget.addEventListener('mouseenter', () => {
        closeButton.style.opacity = '1';
      });
      
      earningsWidget.addEventListener('mouseleave', () => {
        closeButton.style.opacity = '0';
      });
      
      // Handle close button click
      closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        earningsWidget.style.opacity = '0';
        earningsWidget.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          if (document.body.contains(earningsWidget)) {
            document.body.removeChild(earningsWidget);
          }
        }, 300);
      });
      
      // Update earnings counter periodically 
      let currentAmount = 500;
      function updateEarnings() {
        if (!document.body.contains(earningsWidget)) return;
        
        const amountElement = earningsWidget.querySelector('.current-amount');
        const changeElement = earningsWidget.querySelector('.amount-change');
        
        if (amountElement && changeElement) {
          // Generate a random amount to add between 5 and 15
          const addAmount = Math.floor(Math.random() * 11) + 5;
          currentAmount += addAmount;
          amountElement.textContent = currentAmount.toString();
          changeElement.textContent = `+${addAmount}`;
          
          // Add pop animation
          changeElement.style.animation = 'none';
          void changeElement.offsetWidth; // Trick to restart animation
          changeElement.style.animation = 'change-pop 2s';
        }
        
        // Schedule next update
        setTimeout(updateEarnings, 5000 + Math.random() * 3000);
      }
      
      // Start earnings update loop
      setTimeout(updateEarnings, 3000);
      
      // Handle collect button click
      const collectButton = earningsWidget.querySelector('.earnings-collect');
      if (collectButton) {
        collectButton.addEventListener('click', () => {
          // Create collection animation
          const collectAnim = document.createElement('div');
          collectAnim.className = 'fixed inset-0 flex items-center justify-center z-[10000]';
          collectAnim.innerHTML = `
            <div class="collect-container">
              <div class="collect-amount">+${currentAmount}</div>
              <div class="collect-message">Coins collected!</div>
            </div>
          `;
          document.body.appendChild(collectAnim);
          
          // Add collection animation styles
          const collectStyle = document.createElement('style');
          collectStyle.textContent = `
            .collect-container {
              background: rgba(0, 0, 0, 0.7);
              padding: 20px 40px;
              border-radius: 16px;
              display: flex;
              flex-direction: column;
              align-items: center;
              animation: collect-fade 2s forwards;
              backdrop-filter: blur(5px);
            }
            
            .collect-amount {
              font-size: 48px;
              font-weight: bold;
              color: #FFD700;
              text-shadow: 0 2px 10px rgba(255, 215, 0, 0.7);
              margin-bottom: 10px;
            }
            
            .collect-message {
              font-size: 18px;
              color: white;
            }
            
            @keyframes collect-fade {
              0% { opacity: 0; transform: scale(0.8); }
              10% { opacity: 1; transform: scale(1.1); }
              20% { transform: scale(1); }
              80% { opacity: 1; transform: scale(1); }
              100% { opacity: 0; transform: scale(0.8) translateY(-50px); }
            }
          `;
          document.head.appendChild(collectStyle);
          
          // Remove animation after it completes
          setTimeout(() => {
            if (document.body.contains(collectAnim)) {
              document.body.removeChild(collectAnim);
            }
          }, 2000);
          
          // Reset amount and update display
          const amountElement = earningsWidget.querySelector('.current-amount');
          if (amountElement) {
            currentAmount = 0;
            amountElement.textContent = '0';
          }
        });
      }
    };
  };

  // Flash Offer 5 - Shows a gift code highlighting animation
  const setFlash5Offer = () => {
    // Create gift code highlight animation element on the side instead of center
    const giftCodeAnimElement = document.createElement('div');
    giftCodeAnimElement.className = 'fixed right-0 inset-y-0 flex items-center z-[9999]';
    giftCodeAnimElement.style.pointerEvents = 'none';
    giftCodeAnimElement.innerHTML = `
      <div class="gift-anim-container">
        <!-- Glowing background -->
        <div class="gift-glow"></div>
        
        <!-- Gift box animation -->
        <div class="gift-box">
          <div class="gift-lid"></div>
          <div class="gift-box-main"></div>
          <div class="gift-ribbon-v"></div>
          <div class="gift-ribbon-h"></div>
          
          <!-- Particles and confetti -->
          <div class="gift-particles">
            <div class="gift-particle p1"></div>
            <div class="gift-particle p2"></div>
            <div class="gift-particle p3"></div>
            <div class="gift-particle p4"></div>
            <div class="gift-particle p5"></div>
            <div class="gift-particle p6"></div>
            <div class="gift-sparkle s1"></div>
            <div class="gift-sparkle s2"></div>
            <div class="gift-sparkle s3"></div>
          </div>
          
          <!-- Gift code reveal -->
          <div class="gift-code">
            <div class="code-text">NEWUSER25</div>
            <div class="code-label">Your Gift Code!</div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(giftCodeAnimElement);
    
    // Add styles for the gift animation
    const giftStyle = document.createElement('style');
    giftStyle.textContent = `
      .gift-anim-container {
        position: relative;
        width: 200px;
        height: 300px;
        margin-right: 30px;
        animation: slide-in-gift 0.5s ease-out;
      }
      
      .gift-glow {
        position: absolute;
        width: 180px;
        height: 180px;
        background: radial-gradient(circle, rgba(244, 114, 182, 0.7) 0%, rgba(244, 114, 182, 0) 70%);
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        animation: pulse-glow-gift 2s infinite alternate;
      }
      
      .gift-box {
        position: absolute;
        width: 100px;
        height: 100px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        perspective: 600px;
      }
      
      .gift-box-main {
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #f472b6, #db2777);
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(219, 39, 119, 0.4);
      }
      
      .gift-lid {
        position: absolute;
        width: 120px;
        height: 30px;
        background: linear-gradient(135deg, #f472b6, #db2777);
        top: -15px;
        left: -10px;
        border-radius: 6px;
        transform-origin: center top;
        box-shadow: 0 4px 10px rgba(219, 39, 119, 0.3);
        animation: open-lid 1.5s forwards 0.5s;
      }
      
      .gift-ribbon-v {
        position: absolute;
        width: 20px;
        height: 100px;
        background: linear-gradient(135deg, #c026d3, #a21caf);
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        z-index: 2;
      }
      
      .gift-ribbon-h {
        position: absolute;
        width: 100px;
        height: 20px;
        background: linear-gradient(135deg, #c026d3, #a21caf);
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
      }
      
      .gift-particles {
        position: absolute;
        width: 200px;
        height: 200px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      
      .gift-particle {
        position: absolute;
        width: 8px;
        height: 8px;
        background: linear-gradient(135deg, #f472b6, #db2777);
        border-radius: 50%;
        opacity: 0;
      }
      
      .gift-sparkle {
        position: absolute;
        width: 6px;
        height: 6px;
        background: white;
        border-radius: 50%;
        opacity: 0;
        filter: blur(1px);
      }
      
      .p1 { animation: particle-fly 1.5s ease-out forwards 1.2s; left: 60%; top: 40%; }
      .p2 { animation: particle-fly 1.7s ease-out forwards 1.3s; left: 30%; top: 30%; }
      .p3 { animation: particle-fly 1.9s ease-out forwards 1.4s; left: 80%; top: 50%; }
      .p4 { animation: particle-fly 1.6s ease-out forwards 1.5s; left: 40%; top: 80%; }
      .p5 { animation: particle-fly 1.8s ease-out forwards 1.6s; left: 20%; top: 70%; }
      .p6 { animation: particle-fly 1.4s ease-out forwards 1.7s; left: 70%; top: 20%; }
    
      .s1 { animation: sparkle 1.2s ease-out forwards 1.5s; left: 50%; top: 20%; }
      .s2 { animation: sparkle 1.5s ease-out forwards 1.7s; left: 70%; top: 60%; }
      .s3 { animation: sparkle 1.3s ease-out forwards 1.9s; left: 30%; top: 50%; }
    
      .gift-code {
        position: absolute;
        left: 50%;
        top: 130%;
        transform: translateX(-50%);
        background: white;
        padding: 8px 16px;
        border-radius: 6px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        opacity: 0;
        animation: reveal-code 1s forwards 1.7s;
        white-space: nowrap;
        text-align: center;
      }
    
      .code-text {
        font-family: 'Courier New', monospace;
        font-weight: bold;
        font-size: 16px;
        color: #db2777;
        letter-spacing: 1px;
      }
    
      .code-label {
        font-size: 11px;
        color: #666;
        margin-top: 3px;
      }
    
      @keyframes slide-in-gift {
        0% { transform: translateX(100%); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
      }
    
      @keyframes pulse-glow-gift {
        0% { opacity: 0.3; transform: translate(-50%, -50%) scale(0.95); }
        100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.05); }
      }
    
      @keyframes open-lid {
        0% { transform: rotateX(0); }
        50% { transform: rotateX(-80deg) translateZ(10px); }
        100% { transform: rotateX(-110deg) translateZ(40px); opacity: 0.7; }
      }
    
      @keyframes particle-fly {
        0% { transform: scale(0) translate(0, 0); opacity: 0; }
        20% { transform: scale(1.5) translate(10px, -20px); opacity: 1; }
        100% { transform: scale(0.8) translate(20px, -40px); opacity: 0; }
      }
    
      @keyframes sparkle {
        0% { transform: scale(0); opacity: 0; }
        20% { transform: scale(2); opacity: 1; }
        100% { transform: scale(0); opacity: 0; }
      }
    
      @keyframes reveal-code {
        0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
        100% { opacity: 1; transform: translateX(-50%) translateY(0); }
      }
    `;
    document.head.appendChild(giftStyle);
    
    // Remove the animation after it completes
    setTimeout(() => {
      document.body.removeChild(giftCodeAnimElement);
      
      // Add a small notification highlighting gift codes
      createGiftCodeHint();
    }, 4000);
    
    // Function to create a gift code hint
    const createGiftCodeHint = () => {
      // Create floating gift code hint element
      const giftHint = document.createElement('div');
      giftHint.className = 'fixed top-4 right-4 z-[9997]';
      giftHint.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))';
      
      // Create the main hint container with animation
      giftHint.innerHTML = `
        <div class="gift-hint-container bg-white rounded-lg p-3 flex items-start gap-3 max-w-xs">
          <div class="shrink-0 gift-icon-container">
            <div class="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 12v10H4V12"></path>
                <path d="M2 7h20v5H2z"></path>
                <path d="M12 22V7"></path>
                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
              </svg>
            </div>
          </div>
          <div class="flex-1">
            <div class="flex justify-between items-start">
              <h3 class="text-gray-900 font-medium text-sm">Gift Code Available!</h3>
              <button class="close-hint text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <p class="text-gray-600 text-xs mt-1">Use code <span class="font-mono font-bold text-pink-600">NEWUSER25</span> for 25% off your first purchase.</p>
            <div class="flex gap-2 mt-2">
              <button class="copy-code text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-2 rounded transition-colors">
                Copy Code
              </button>
              <button class="use-now text-xs bg-pink-500 hover:bg-pink-600 text-white py-1 px-2 rounded transition-colors">
                Use Now
              </button>
            </div>
          </div>
        </div>
      `;
      
      // Add animation for the gift icon
      const giftHintStyle = document.createElement('style');
      giftHintStyle.textContent = `
        .gift-hint-container {
          animation: slide-up 0.5s ease-out forwards;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(244, 114, 182, 0.2);
        }
        
        .gift-icon-container {
          position: relative;
          animation: gentle-bounce 2s ease-in-out infinite;
        }
        
        .gift-icon-container::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(244, 114, 182, 0.4);
          border-radius: 50%;
          z-index: -1;
          animation: pulse-ring 2s ease-out infinite;
        }
        
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.3; }
          50% { opacity: 0.1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `;
      document.head.appendChild(giftHintStyle);
      
      // Add the hint to the document
      document.body.appendChild(giftHint);
      
      // Set up close button functionality
      const closeButton = giftHint.querySelector('.close-hint');
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          giftHint.style.opacity = '0';
          giftHint.style.transform = 'translateY(10px)';
          giftHint.style.transition = 'opacity 0.3s, transform 0.3s';
          setTimeout(() => {
            if (document.body.contains(giftHint)) {
              document.body.removeChild(giftHint);
            }
          }, 300);
        });
      }
      
      // Set up copy code button
      const copyButton = giftHint.querySelector('.copy-code');
      if (copyButton) {
        copyButton.addEventListener('click', () => {
          navigator.clipboard.writeText('NEWUSER25').then(() => {
            copyButton.textContent = 'Copied!';
            copyButton.style.backgroundColor = '#10b981';
            copyButton.style.color = 'white';
            
            setTimeout(() => {
              copyButton.textContent = 'Copy Code';
              copyButton.style.backgroundColor = '';
              copyButton.style.color = '';
            }, 2000);
          });
        });
      }
      
      // Set up use now button
      const useButton = giftHint.querySelector('.use-now');
      if (useButton) {
        useButton.addEventListener('click', () => {
          // Create a modal to simulate code application
          const backdrop = document.createElement('div');
          backdrop.className = 'fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center opacity-0 transition-opacity duration-300';
          backdrop.style.backdropFilter = 'blur(3px)';
          document.body.appendChild(backdrop);
          
          const modal = document.createElement('div');
          modal.className = 'bg-white rounded-lg max-w-sm w-full transform scale-95 transition-all duration-300 overflow-hidden';
          modal.innerHTML = `
            <div class="p-6">
              <div class="flex flex-col items-center">
                <div class="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-pink-500">
                    <path d="M20 12v10H4V12"></path>
                    <path d="M2 7h20v5H2z"></path>
                    <path d="M12 22V7"></path>
                    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
                  </svg>
                </div>
                
                <h3 class="text-lg font-bold text-gray-900 mb-2">Gift Code Applied!</h3>
                <p class="text-sm text-gray-600 text-center mb-4">
                  Your code <span class="font-mono font-bold text-pink-600">NEWUSER25</span> has been applied. You've received a 25% discount on your purchase.
                </p>
                
                <div class="bg-gray-50 w-full rounded-md p-3 mb-4">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-500">Original total:</span>
                    <span class="text-gray-700">$100.00</span>
                  </div>
                  <div class="flex justify-between text-sm mt-1">
                    <span class="text-gray-500">Discount (25%):</span>
                    <span class="text-pink-600">-$25.00</span>
                  </div>
                  <div class="flex justify-between font-medium mt-2 pt-2 border-t border-gray-200">
                    <span>New total:</span>
                    <span>$75.00</span>
                  </div>
                </div>
                
                <button class="close-applied w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md font-medium transition-colors">
                  Continue to Checkout
                </button>
              </div>
            </div>
          `;
          backdrop.appendChild(modal);
          
          // Show with animation
          setTimeout(() => {
            backdrop.style.opacity = '1';
            modal.style.transform = 'scale(1)';
          }, 10);
          
          // Handle button click
          const closeBtn = modal.querySelector('.close-applied');
          if (closeBtn) {
            closeBtn.addEventListener('click', () => {
              backdrop.style.opacity = '0';
              modal.style.transform = 'scale(0.95)';
              setTimeout(() => {
                document.body.removeChild(backdrop);
                
                // Remove the gift hint as well
                if (document.body.contains(giftHint)) {
                  document.body.removeChild(giftHint);
                }
              }, 300);
            });
          }
        });
      }
      
      // Auto-remove after 10 seconds if not interacted with
      setTimeout(() => {
        if (document.body.contains(giftHint)) {
          giftHint.style.opacity = '0';
          giftHint.style.transform = 'translateY(10px)';
          giftHint.style.transition = 'opacity 0.3s, transform 0.3s';
          setTimeout(() => {
            if (document.body.contains(giftHint)) {
              document.body.removeChild(giftHint);
            }
          }, 300);
        }
      }, 10000);
    };
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-xl w-full max-w-md border border-gray-700">
      <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">Demo Controls</h2>
      
      {/* Basic States */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-300">Basic States</h3>
        <div className="grid grid-cols-3 gap-2">
          <Button 
            onClick={setBasic}
            className={cn(
              "w-full py-2 bg-gradient-to-r from-gray-700 to-gray-600 border border-gray-600/30",
              !currentOfferData.isNew && "ring-2 ring-blue-500"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button 
            onClick={setJustIcon}
            className={cn(
              "w-full py-2 bg-gradient-to-r from-gray-700 to-gray-600 border border-gray-600/30",
              currentOfferData.isNew && !currentOfferData.offerValue && "ring-2 ring-blue-500"
            )}
          >
            <Gift className="h-4 w-4" />
          </Button>
          
          <Button 
            onClick={setIconWithWord}
            className={cn(
              "w-full py-2 bg-gradient-to-r from-gray-700 to-gray-600 border border-gray-600/30",
              currentOfferData.isNew && currentOfferData.offerValue && "ring-2 ring-blue-500"
            )}
          >
            <div className="flex items-center gap-1">
              <Gift className="h-4 w-4" />
              <span className="text-xs">Abc</span>
            </div>
          </Button>
        </div>
      </div>

      {/* Theme Options */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-300">Theme Options</h3>
        <div className="grid grid-cols-3 gap-2">
          <Button 
            onClick={toggleBackground}
            className={cn(
              "w-full py-2",
              currentOfferData.showBackground 
                ? "bg-gradient-to-r from-blue-700 to-blue-600 border-blue-500/30" 
                : "bg-gradient-to-r from-gray-700 to-gray-600 border-gray-600/30",
              "border"
            )}
          >
            <div className="flex flex-col items-center gap-1">
              <div className="w-6 h-4 border border-current rounded-sm" />
              <span className="text-[10px]">Background</span>
            </div>
          </Button>

          <Button 
            onClick={toggleDot}
            className={cn(
              "w-full py-2",
              currentOfferData.showDot
                ? "bg-gradient-to-r from-purple-700 to-purple-600 border-purple-500/30"
                : "bg-gradient-to-r from-gray-700 to-gray-600 border-gray-600/30",
              "border"
            )}
          >
            <div className="flex flex-col items-center gap-1">
              <Circle className="h-4 w-4" />
              <span className="text-[10px]">Dot</span>
            </div>
          </Button>

          <Button 
            onClick={setFullMessage}
            className={cn(
              "w-full py-2",
              "bg-gradient-to-r from-purple-700 to-purple-600 border border-purple-500/30",
              "hover:brightness-110 transition-all duration-200"
            )}
          >
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1">
                <Percent className="h-4 w-4" />
                <span className="text-[10px]">→</span>
                <Percent className="h-3 w-3" />
              </div>
              <span className="text-[10px]">Stages</span>
            </div>
          </Button>
        </div>
      </div>

      {/* Offer Types */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-300">Offer Types</h3>
        <div className="grid grid-cols-3 gap-2">
          <Button 
            onClick={setReward}
            className="w-full py-2 bg-gradient-to-r from-yellow-700 to-yellow-600 border border-yellow-500/30"
          >
            <Crown className="h-4 w-4" />
          </Button>
          
          <Button 
            onClick={setSale}
            className="w-full py-2 bg-gradient-to-r from-purple-700 to-purple-600 border border-purple-500/30"
          >
            <Percent className="h-4 w-4" />
          </Button>
          
          <Button 
            onClick={setUrgent}
            className="w-full py-2 bg-gradient-to-r from-amber-700 to-amber-600 border border-amber-500/30"
          >
            <Clock className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Flash Offers */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-300">Flash Offers</h3>
        <div className="grid grid-cols-5 gap-2">
          <Button 
            onClick={setFlash3Offer}
            className="w-full py-2 bg-gradient-to-r from-purple-700 to-pink-600 border border-purple-500/30"
          >
            <div className="flex flex-col items-center">
              <Zap className="h-4 w-4" />
              <span className="text-[8px]">Move</span>
            </div>
          </Button>
          
          <Button 
            onClick={setFlash4Offer}
            className="w-full py-2 bg-gradient-to-r from-green-600 to-emerald-500 border border-green-500/30"
          >
            <div className="flex flex-col items-center">
              <Zap className="h-4 w-4" />
              <span className="text-[8px]">Earn</span>
            </div>
          </Button>
          
          <Button 
            onClick={setFlash5Offer}
            className="w-full py-2 bg-gradient-to-r from-pink-500 to-rose-500 border border-pink-500/30"
          >
            <div className="flex flex-col items-center">
              <Gift className="h-4 w-4" />
              <span className="text-[8px]">Code</span>
            </div>
          </Button>
          
          <Button 
            onClick={setFlash2Offer}
            className="w-full py-2 bg-gradient-to-r from-green-700 to-blue-600 border border-green-500/30"
          >
            <div className="flex flex-col items-center">
              <Zap className="h-4 w-4" />
              <span className="text-[8px]">Left</span>
            </div>
          </Button>
          
          <Button 
            onClick={setFlashOffer}
            className="w-full py-2 bg-gradient-to-r from-blue-700 to-yellow-600 border border-yellow-500/30"
          >
            <div className="flex flex-col items-center">
              <Zap className="h-4 w-4" />
              <span className="text-[8px]">Center</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

// Add "How to Use" component that can be displayed below DemoControls
export const HowToUseGuide: React.FC = () => {
  return (
    <div className="mt-6 p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-xl w-full max-w-md border border-gray-700">
      <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">How to Use</h2>
      
      <div className="space-y-4 text-gray-300 text-sm">
        <div>
          <h3 className="font-medium text-gray-200 mb-1">Basic States</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><span className="text-gray-400">Default:</span> Shows basic empty state</li>
            <li><span className="text-gray-400">Gift Icon:</span> Shows new offer with icon only</li>
            <li><span className="text-gray-400">Gift + Text:</span> Shows new offer with icon and text</li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-200 mb-1">Theme Options</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><span className="text-gray-400">Background:</span> Toggle colored background on/off</li>
            <li><span className="text-gray-400">Dot:</span> Toggle notification dot visibility</li>
            <li><span className="text-gray-400">Stages:</span> Set the full offer message with stages</li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-200 mb-1">Offer Types</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><span className="text-gray-400">Crown:</span> Sets to Reward offer type</li>
            <li><span className="text-gray-400">Percent:</span> Sets to Sale offer type</li>
            <li><span className="text-gray-400">Clock:</span> Sets to Urgent (limited-time) offer type</li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-200 mb-1">Flash Offers</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><span className="text-gray-400">Move:</span> Triggers animation that moves along a track</li>
            <li><span className="text-gray-400">Earn:</span> Shows money/earnings animation on the side</li>
            <li><span className="text-gray-400">Left:</span> Shows animation on the left side of screen</li>
            <li><span className="text-gray-400">Center:</span> Shows animation in the center of screen</li>
          </ul>
        </div>
        
        <div className="pt-2 border-t border-gray-700">
          <h3 className="font-medium text-gray-200 mb-1">Tips</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Combine different options to create various offer styles</li>
            <li>Flash offers create interactive elements that users can click</li>
            <li>Use dot notification for drawing attention to new offers</li>
            <li>Toggle background for better visibility on different page themes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

