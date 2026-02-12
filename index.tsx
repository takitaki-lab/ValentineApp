
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// --- Configuration ---
const SAD_MESSAGES = ["Wait, why? 🥺", "Oh no... 💔", "Don't do this! 💧", "My heart is breaking... ☁️", "Come back! 🏃‍♂️"];

// 1. Valentine Events (1-100)
const VALENTINE_EVENTS = [
  "Meeting You 💎", "First Message 📱", "Heart Fluttering 💓", "Calling All Night 📞", "Special Connection ✨",
  "1st Date: Osaka 🏛️", "Historical Walk 👣", "Seeing Your Smile 😊", "First Curry Together 🍛", "Spice & Love 🔥",
  "USJ Adventure 🎡", "Mario World Fun 🍄", "Wizarding Magic 🧙‍♂️", "Jurassic Rex 🦖", "USJ Night View 🌃",
  "Tokyo DisneySea 🌋", "Little Mermaid Magic 🐚", "Mediterranean Harbor 🛶", "Tower of Terror 😱", "Dream Island 🏝️",
  "Shiga Lake Trip 🌊", "Biwako View 🌅", "Lake Breeze 🌬️", "Quiet Moments 🤫", "Calm Waters 🛶",
  "Wakayama Shores 🏖️", "Panda Adventure 🐼", "Sea Salt Air 🌊", "Fresh Seafood 🍣", "Ocean Sunset 🌇",
  "Handmade Curry Night 🥘", "Your Cooking is Best 😋", "Kitchen Romance 🍳", "Spices of Home 🏠", "Full & Happy 🤰",
  "2-Week Live-in Stay 🏠", "Life as One 🛋️", "Morning Coffee ☕", "Shared Grocery Trip 🛒", "Doing Laundry 🧼",
  "Cozy Home Vibes 🏠", "Christmas Magic 🎄", "Winter Illumination 🕯️", "Special Gift 🎁", "Cozy Dinner 🍷", "Snowy Wish ❄️",
  "Deep Understanding 🧠", "Future Talks 🗣️", "First Secret 🤫", "Eternal Promise 💍",
  "Proposal Planning 💍", "Picking the Ring 💎", "The Secret Question 🤫", "Yes! Forever ❤️", "Diamond Sparkle ✨",
  "Wedding Planning 👰", "Dress Fitting 👗", "Flowers & Lace 💐", "Sending Invitations ✉️", "Final Countdown ⏳",
  "The Big Day 💒", "Eternal Vows 📜", "Wedding Cake 🎂", "First Dance 💃", "Husband & Wife 🥂",
  "Honeymoon Bliss ✈️", "Tropical Paradise 🏝️", "Our New Home 🏡", "Painting Walls 🎨", "Building Memories 🏗️",
  "Garden of Love 🌻", "Sunday Morning Bed 🛌", "Little Footprints 👶", "Miracle of Life 🍼", "Tiny Fingers 🖐️",
  "Family Picnics 🧺", "Reading Stories 📖", "First Steps 👣", "First Word 🗣️", "Happy Holidays 🎊",
  "Growing Together 🌱", "Shared Wisdom 🦉", "Golden Anniversary 🎖️", "Hand in Hand 🤝", "Legacy of Love 💖",
  "Peaceful Harbor ⚓", "Infinite Gratitude 🙏", "Timeless Bond ♾️", "Eternal Valentine 👑", "Rose Planet Launch 🚀"
];

// 2. India Content
const INDIA_QUIRKS = [
  "Auto-rickshaw overcharge 🛺", "No change? Have a candy 🍬", "Holy cow traffic jam 🐄", "Chai philosophy session ☕",
  "Spicy? Just a little! 🔥", "Train delay (Indian Time) 🚂", "The legendary head wobble 🤷", "Monkey stole my sunglasses 🐒",
  "Bollywood dance break 💃", "Yoga at 5 AM 🧘", "Rickshaw racing in Delhi 🏁", "Henna art master 🎨",
  "Lassie mustache fun 🥛", "Market bargaining level 100 💰", "Cricket on every corner 🏏", "Spice market sneezing 🌶️",
  "Peacock morning call 🦚", "Ganges sunrise dip 🌊", "Namaste to strangers 🙏", "Saffron luxury meal 🥘",
  "Camel ride in Rajasthan 🐫", "Elephant blessing 🐘", "Missing the bus chase 🏃", "Masala secret discovery 🧂",
  "Ashram meditation silence 🕉️", "Holi color explosion 🎨", "Diwali lamp lighting 🪔", "Station platform nap 🚉",
  "Rickshaw horn symphony 📢", "Samosa addiction 🥟", "Mango lassi bliss 🥭", "Royal palace ghost? 🏰",
  "Temple bell ringing 🔔", "Saree draping fail 👘", "Extra spicy challenge 🔥", "Meeting a 'Jugaad' master 🛠️",
  "Biryani food coma 🥘", "Tiffin box mystery 🍱", "10 people on one scooter 🛵", "Fixing anything with tape 🩹",
  "Searching for Butter Chicken 🍗", "Morning Raga vibes 🎵", "Busy bazaar navigation 🛍️", "Golgappa competition 🥣",
  "Sandalwood fragrance 🪵", "Taj Mahal selfie spot 🕌", "Himalayan thin air 🏔️", "Snake charmer flute 🐍",
  "Train samosa vendor 🥟", "Monsoon rain dance ☔"
];

const generateAllSteps = () => {
  const vSteps = VALENTINE_EVENTS.map((event, i) => ({
    id: i,
    label: event,
    icon: event.split(' ').pop() || "💖",
    type: 'valentine' as const,
    isMilestone: i % 20 === 0 || i === 99
  }));

  const iSteps = Array.from({ length: 500 }).map((_, i) => {
    const quirk = INDIA_QUIRKS[i % INDIA_QUIRKS.length];
    const index = i + 100;
    return {
      id: index,
      label: `${quirk}`,
      icon: quirk.split(' ').pop() || "🇮🇳",
      type: 'india' as const,
      isMilestone: i % 50 === 0 || i === 499
    };
  });

  return [...vSteps, ...iSteps];
};

const STEPS_DATA = generateAllSteps();

const App: React.FC = () => {
  const [stage, setStage] = useState<'quest' | 'victory'>('quest');
  const [arc, setArc] = useState<'valentine' | 'india'>('valentine');
  const [yesScale, setYesScale] = useState(1);
  const [noPosition, setNoPosition] = useState<{ x: number, y: number } | null>(null);
  const [noAttempts, setNoAttempts] = useState(0);
  const [isNoTired, setIsNoTired] = useState(false);
  const [noMsg, setNoMsg] = useState("");
  const [lovePower, setLovePower] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [diceCount, setDiceCount] = useState<1 | 2 | 3>(1);
  const [diceResults, setDiceResults] = useState<number[]>([1]);
  const [isRolling, setIsRolling] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isBlastingOff, setIsBlastingOff] = useState(false);
  const [isLandedOnPlanet, setIsLandedOnPlanet] = useState(false);
  const [goalReached, setGoalReached] = useState(false);
  const [shareFeedback, setShareFeedback] = useState("");

  const yesButtonRef = useRef<HTMLButtonElement>(null);
  const pathScrollRef = useRef<HTMLDivElement>(null);

  const handleYes = () => {
    setStage('victory');
    (window as any).confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
  };

  const triggerRoseEffect = () => {
    const rose = (window as any).confetti.shapeFromText({ text: '🌹', scalar: 3 });
    for (let i = 0; i < 60; i++) {
      setTimeout(() => {
        (window as any).confetti({
          shapes: [rose],
          particleCount: 1,
          origin: { x: Math.random(), y: -0.1 },
          gravity: 0.5 + Math.random() * 0.5,
          scalar: 1.5 + Math.random() * 2,
          drift: Math.random() * 2 - 1,
          ticks: 200
        });
      }, i * 40);
    }
  };

  const triggerSpaceLaunch = async () => {
    setIsBlastingOff(true);
    await new Promise(r => setTimeout(r, 4000));
    setIsLandedOnPlanet(true);
    setIsBlastingOff(false);
    (window as any).confetti({ particleCount: 300, spread: 200, origin: { y: 0.5 }, colors: ['#ff4d6d', '#ff0000', '#ffffff'] });
  };

  const startIndiaArc = () => {
    setIsLandedOnPlanet(false);
    setArc('india');
    setCurrentIdx(100);
  };

  const rollDice = () => {
    if (isRolling || isJumping || goalReached) return;
    setIsRolling(true);
    let ticks = 0;
    const interval = setInterval(() => {
      setDiceResults(Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1));
      if (++ticks > 10) {
        clearInterval(interval);
        const finals = Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1);
        setDiceResults(finals);
        setIsRolling(false);
        if (diceCount > 1 && finals.every(val => val === finals[0])) triggerRoseEffect();
        const total = finals.reduce((a, b) => a + b, 0);
        processMovement(total);
      }
    }, 60);
  };

  const processMovement = async (total: number) => {
    let nextPos = currentIdx;
    for (let i = 1; i <= total; i++) {
      nextPos += 1;
      if (nextPos === 99 && arc === 'valentine') {
        setCurrentIdx(99);
        triggerSpaceLaunch();
        break;
      }
      if (nextPos >= 599) {
        setCurrentIdx(599);
        setGoalReached(true);
        (window as any).confetti({ particleCount: 500, spread: 360 });
        break;
      }
      setIsJumping(true);
      setCurrentIdx(nextPos);
      await new Promise(r => setTimeout(r, 180)); 
      setIsJumping(false);
    }
  };

  useEffect(() => {
    if (pathScrollRef.current && !isBlastingOff) {
      const active = pathScrollRef.current.querySelector(`.step-${currentIdx}`) as HTMLElement;
      if (active) {
        pathScrollRef.current.scrollTo({
          left: active.offsetLeft - pathScrollRef.current.offsetWidth / 2 + active.offsetWidth / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [currentIdx, isBlastingOff]);

  const moveNoButton = (e?: any) => {
    if (e && e.cancelable) e.preventDefault();
    if (isNoTired || stage !== 'quest') return;
    const nextAttempts = noAttempts + 1;
    setNoAttempts(nextAttempts);
    setNoMsg(SAD_MESSAGES[Math.floor(Math.random() * SAD_MESSAGES.length)]);
    if (nextAttempts >= 12) { setIsNoTired(true); setNoMsg("I'm yours! ❤️"); return; }
    
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    
    let nX, nY;
    const yesRect = yesButtonRef.current?.getBoundingClientRect();
    
    let attempts = 0;
    do {
      nX = 20 + Math.random() * (viewportW - 140);
      nY = 80 + Math.random() * (viewportH - 180);
      attempts++;
    } while (
      yesRect &&
      nX > yesRect.left - 30 && nX < yesRect.right + 30 &&
      nY > yesRect.top - 30 && nY < yesRect.bottom + 30 &&
      attempts < 15
    );
    
    setNoPosition({ x: nX, y: nY });
    setYesScale(prev => Math.min(prev + 0.3, 4.5));
    setLovePower(prev => Math.min(100, prev + 10));
    setIsShaking(true);
    setTimeout(() => { setIsShaking(false); setNoMsg(""); }, 700);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Our Eternal Odyssey 🇮🇳💖',
      text: `バレンタインからインドまで、私たちの軌跡は第${currentIdx+1}章へ！`,
      url: window.location.href,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err) { setShareFeedback("Link copied! ✨"); }
    } else {
      navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
      setShareFeedback("Link copied! ✨");
    }
    setTimeout(() => setShareFeedback(""), 3000);
  };

  return (
    <div className={`h-screen flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-1000 ${isShaking ? 'shake' : ''} ${arc === 'india' ? 'bg-[#fff4e0]' : 'bg-scroller'}`}>
      <div className="frame-decoration pointer-events-none" />
      
      {stage === 'victory' ? (
        <div className="h-full w-full flex flex-col items-center overflow-hidden relative">
          
          {isBlastingOff && (
            <div className="fixed inset-0 z-[5000] bg-[#050010] flex flex-col items-center justify-center animate-pulse">
               <div className="text-[120px] animate-bounce">🚀</div>
               <h2 className="text-white font-black text-3xl mt-10 tracking-[0.4em]">SPACE LAUNCH</h2>
               <p className="text-pink-300 mt-4 text-xl font-romantic text-center">Approaching Rose Planet...</p>
            </div>
          )}

          {isLandedOnPlanet && (
            <div className="fixed inset-0 z-[6000] bg-gradient-to-b from-[#fff0f3] to-[#ffccd5] flex flex-col items-center justify-center p-6 text-center animate-in zoom-in duration-700">
               <div className="text-[140px] mb-4 animate-pulse">🪐🌹</div>
               <h1 className="text-5xl font-romantic text-red-600 mb-2">Rose Planet</h1>
               <div className="bg-white/90 p-6 rounded-[30px] shadow-2xl max-w-sm w-full border-4 border-orange-200">
                  <p className="text-xl font-black text-orange-600 mb-6">"Next: Incredible India!"</p>
                  <button onClick={startIndiaArc} className="w-full bg-gradient-to-r from-orange-600 to-yellow-500 text-white font-black py-4 rounded-full shadow-lg text-lg animate-bounce active:translate-y-1">
                    START INDIA 🇮🇳
                  </button>
               </div>
            </div>
          )}

          {goalReached && (
            <div className="fixed inset-0 z-[7000] bg-[#fffaf0] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-1000 overflow-y-auto">
               <div className="text-[120px] mb-4 animate-pulse">🏆🐘</div>
               <h1 className="text-5xl font-romantic text-orange-600 mb-4">India Complete!</h1>
               <div className="bg-white p-8 rounded-[40px] shadow-xl border-4 border-orange-400 max-w-sm">
                 <p className="text-lg font-bold text-gray-700 mb-6 leading-relaxed italic">
                   "出会いから、宇宙、そしてインド。<br/>君とならどこへだって行ける。"
                 </p>
                 <button onClick={handleShare} className="w-full bg-orange-600 text-white font-black py-4 rounded-full mb-2 shadow-md">SHARE 📱</button>
                 {shareFeedback && <p className="text-green-500 font-black text-xs">{shareFeedback}</p>}
               </div>
               <button onClick={() => window.location.reload()} className="mt-6 text-orange-300 underline font-black uppercase text-[10px]">Restart</button>
            </div>
          )}

          {!isBlastingOff && !isLandedOnPlanet && !goalReached && (
            <>
              <div className="z-10 text-center px-4 pt-6 mb-1">
                <p className={`text-[9px] tracking-[0.2em] uppercase font-black opacity-40 ${arc === 'india' ? 'text-orange-600' : 'text-pink-500'}`}>
                  {arc === 'valentine' ? `Phase I (${currentIdx+1}/100)` : `Phase II (${currentIdx-99}/500)`}
                </p>
                <h2 className={`text-2xl font-romantic drop-shadow-sm transition-colors duration-500 ${arc === 'india' ? 'text-[#c05621]' : 'text-red-600'}`}>
                  {arc === 'india' ? 'India Odyssey 🇮🇳' : 'Valentine Road 💖'}
                </h2>
              </div>

              <div className="w-full flex-1 flex flex-col justify-center min-h-0 relative">
                <div ref={pathScrollRef} className="life-path-scroll">
                  {STEPS_DATA.map(step => (
                    <div key={step.id} className={`step-tile step-${step.id} ${step.id === currentIdx ? 'active' : ''} ${step.id < currentIdx ? 'visited' : ''} ${step.isMilestone ? 'milestone' : ''}`}>
                      {step.id === currentIdx && <div className={`absolute -top-12 text-4xl drop-shadow-md z-30 ${isJumping ? 'heart-jump' : ''}`}>{arc === 'india' ? '🛺' : '💖'}</div>}
                      <span className="step-number">#{step.id + 1}</span>
                      <div className={`relative w-full aspect-square mb-2 flex items-center justify-center rounded-[18px] bg-white shadow-inner border transition-colors ${arc === 'india' ? 'border-orange-100' : 'border-pink-50'}`}>
                        <div className={`text-4xl ${step.id === currentIdx ? 'animate-bounce' : ''}`}>{step.icon}</div>
                      </div>
                      <h3 className={`font-black text-[15px] leading-tight break-words overflow-hidden max-h-[3.5em] w-full px-1 ${arc === 'india' ? 'text-orange-900' : 'text-pink-700'}`}>
                        {step.label}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>

              {/* COMPACT FOOTER UI */}
              <div className={`z-30 w-full backdrop-blur-lg py-3 border-t shadow-[0_-10px_20px_rgba(0,0,0,0.03)] transition-colors duration-1000 ${arc === 'india' ? 'bg-orange-100/90 border-orange-200' : 'bg-white/90 border-pink-100'}`}>
                <div className="max-w-xs mx-auto flex flex-row items-center justify-between gap-3 px-3">
                  <div className="flex flex-col items-center gap-1.5 shrink-0">
                    <div className="flex gap-1.5">
                      {diceResults.map((v, i) => (
                        <div key={i} className={`dice ${isRolling ? 'rolling' : ''} ${arc === 'india' ? 'border-orange-600 text-orange-600 shadow-orange-100' : 'border-pink-500 text-pink-500 shadow-pink-100'}`} style={{width: '40px', height: '40px', fontSize: '20px'}}>{isRolling ? "✨" : v}</div>
                      ))}
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3].map(n => (
                        <button key={n} disabled={isRolling || isJumping} onClick={() => setDiceCount(n as any)} 
                          className={`w-9 h-9 rounded-[10px] font-black border transition-all text-[10px] ${diceCount === n ? (arc === 'india' ? 'bg-orange-600 text-white border-transparent' : 'bg-red-500 text-white border-transparent') : 'bg-white text-gray-400 border-gray-100'}`}>
                          {n}x
                        </button>
                      ))}
                    </div>
                  </div>
                  <button disabled={isRolling || isJumping} onClick={rollDice} 
                    className={`flex-1 font-black h-[85px] rounded-2xl shadow-md transition-all text-xl tracking-[0.1em] ${isRolling || isJumping ? 'bg-gray-200 text-gray-400' : (arc === 'india' ? 'bg-gradient-to-r from-orange-600 to-yellow-500 text-white' : 'bg-gradient-to-r from-red-600 to-pink-500 text-white')} active:scale-95`}>
                    {isRolling ? "..." : "ROLL 🎲"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 w-full h-full max-w-[393px] mx-auto relative">
          <div className="w-full mb-12 px-4 z-10">
            <div className="bg-white/90 rounded-full h-3.5 overflow-hidden border border-pink-100 shadow-sm p-[2px]">
              <div className="bg-gradient-to-r from-red-500 via-pink-500 to-red-400 h-full rounded-full transition-all duration-1000" style={{ width: `${lovePower}%` }} />
            </div>
          </div>
          <div className="flex flex-col items-center text-center p-8 rounded-[40px] bg-white/70 backdrop-blur-lg border border-white shadow-xl w-full relative">
            <div className="text-7xl mb-6 animate-pulse">💝</div>
            <h1 className="text-5xl font-romantic text-red-600 mb-10 leading-tight">Will you be<br/><span className="text-pink-500">my Valentine?</span></h1>
            <div className="flex flex-col items-center gap-10 relative w-full min-h-[220px]">
              <button ref={yesButtonRef} onClick={handleYes} style={{ transform: `scale(${yesScale})` }} 
                className="bg-gradient-to-br from-red-600 to-pink-600 text-white font-black py-7 px-16 rounded-full shadow-lg z-[100] text-3xl active:scale-90 transition-transform relative ring-4 ring-white/50">
                YES! ❤️
              </button>
              
              <div onPointerOver={moveNoButton} onPointerDown={moveNoButton} onClick={() => isNoTired && handleYes()}
                style={noPosition ? { position: 'fixed', left: noPosition.x, top: noPosition.y, zIndex: 9999 } : { position: 'relative', zIndex: 50 }} className="flex flex-col items-center">
                {noMsg && <div className="absolute -top-14 bg-white px-4 py-2 rounded-full shadow-md text-pink-600 font-black animate-bounce whitespace-nowrap border border-pink-50 text-xs z-[10000]">{noMsg}</div>}
                <button className={`bg-white/95 text-gray-400 font-bold py-4 px-10 rounded-[20px] shadow border border-pink-50 text-lg transition-all ${isNoTired ? 'text-red-500 border-red-500 scale-110 animate-pulse' : ''}`}>
                  {isNoTired ? "OK, YES! ❤️" : "No..."}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) { ReactDOM.createRoot(rootElement).render(<App />); }
