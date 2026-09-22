import React from 'react';
import { Volume2, VolumeX, Maximize2, Smartphone } from 'lucide-react';

export default function DesktopTopBar({ soundEnabled, onToggleSound, isFullscreen, onToggleFullscreen }) {
  return (
    <header className="w-full max-w-[430px] flex items-center justify-between px-3 py-2 text-xs text-slate-300 font-medium z-20">
      <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-sky-500/20 shadow-sm">
        <img src="/assets/logo.png" alt="UNESA Logo" className="w-5 h-5 object-contain" />
        <span className="font-display font-bold tracking-wider text-sky-400">REKONLEARN AR</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToggleSound}
          title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all btn-press ${
            soundEnabled
              ? 'bg-sky-500/20 border-sky-400/40 text-sky-300 hover:bg-sky-500/30'
              : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span>{soundEnabled ? 'Suara' : 'Mute'}</span>
        </button>

        <button
          onClick={onToggleFullscreen}
          title={isFullscreen ? 'Mode HP' : 'Layar Penuh'}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 transition-all btn-press"
        >
          {isFullscreen ? <Smartphone className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          <span>{isFullscreen ? 'Mode HP' : 'Layar Penuh'}</span>
        </button>
      </div>
    </header>
  );
}
