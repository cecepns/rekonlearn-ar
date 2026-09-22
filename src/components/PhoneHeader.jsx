import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal, Menu } from 'lucide-react';
import { playClickSound } from '../utils/audio';

export default function PhoneHeader({ onOpenDrawer, onNavigateHome, showNavHeader = true }) {
  const [timeStr, setTimeStr] = useState('09:41');

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTimeStr(`${hours}:${minutes}`);
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full select-none z-20 shrink-0">
      {/* Top Phone Status Bar */}
      <div className="h-7 px-6 flex items-center justify-between text-[11px] font-semibold text-slate-300">
        <span className="tracking-tight">{timeStr}</span>
        {/* Dynamic Island / Notch */}
        <div className="w-24 h-4 bg-black/90 rounded-full border border-slate-800/80 shadow-inner flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-slate-900 rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-sky-600 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-slate-300">
          <Signal className="w-3 h-3" />
          <Wifi className="w-3 h-3" />
          <BatteryMedium className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Internal Navigation Header (when not on splash/home screen) */}
      {showNavHeader && (
        <header className="px-5 py-2.5 flex items-center justify-between">
          <button
            onClick={() => {
              playClickSound();
              onOpenDrawer();
            }}
            className="group flex items-center gap-2 bg-gradient-to-r from-sky-400 to-sky-600 hover:from-sky-300 hover:to-sky-500 text-white font-display font-extrabold text-xs px-3.5 py-1.5 rounded-full border-2 border-white shadow-md transition-all btn-press"
            aria-label="Buka Laci Menu"
          >
            <div className="w-5 h-5 rounded-full bg-white text-sky-600 flex items-center justify-center shadow-inner">
              <Menu className="w-3 h-3" />
            </div>
            <span className="tracking-wider">MENU</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              onNavigateHome();
            }}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 p-1 flex items-center justify-center border border-white/20 backdrop-blur-sm transition-all btn-press"
            title="Kembali ke Beranda"
          >
            <img src="/assets/logo.png" alt="UNESA Logo" className="w-7 h-7 object-contain" />
          </button>
        </header>
      )}
    </div>
  );
}
