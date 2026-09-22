import React from 'react';
import { 
  X, 
  Home, 
  LayoutGrid, 
  User, 
  Award, 
  BookOpen, 
  Camera, 
  Video, 
  FileSpreadsheet, 
  Info,
  Compass,
  Volume2,
  VolumeX
} from 'lucide-react';
import { playClickSound } from '../utils/audio';

const menuItems = [
  { id: 'home', label: 'Beranda Utama', icon: Home, bg: 'bg-sky-600 hover:bg-sky-500' },
  { id: 'menu', label: 'Menu Utama', icon: LayoutGrid, bg: 'bg-blue-600 hover:bg-blue-500' },
  { id: 'profil', label: 'Profil Penulis', icon: User, bg: 'bg-[#f8b4c4] text-slate-900 hover:brightness-105' },
  { id: 'capaian', label: 'Capaian Pembelajaran', icon: Award, bg: 'bg-[#f6be32] text-slate-900 hover:brightness-105' },
  { id: 'materi', label: 'Materi Pembelajaran', icon: BookOpen, bg: 'bg-[#74b3f6] text-slate-900 hover:brightness-105' },
  { id: 'kamera', label: 'Kamera AR', icon: Camera, bg: 'bg-[#889af2] text-slate-900 hover:brightness-105' },
  { id: 'video', label: 'Video Pembelajaran', icon: Video, bg: 'bg-[#659a7f] text-white hover:brightness-105' },
  { id: 'spreadsheet', label: 'Spreadsheet Latihan', icon: FileSpreadsheet, bg: 'bg-[#f4b3a1] text-slate-900 hover:brightness-105' },
  { id: 'informasi', label: 'Informasi & Glosarium', icon: Info, bg: 'bg-[#e66271] text-white hover:brightness-105' },
];

export default function QuickDrawer({ isOpen, onClose, onSelectScreen, currentScreen, soundEnabled, onToggleSound }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-all animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm bg-slate-900/95 border border-sky-500/30 rounded-3xl p-5 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-sky-400" />
            <h3 className="font-display font-bold text-white text-base tracking-wide">Navigasi Cepat</h3>
          </div>
          <div className="flex items-center gap-2">
            {onToggleSound && (
              <button
                onClick={onToggleSound}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-sky-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            )}
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 space-y-2 pr-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isSelected = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playClickSound();
                  onSelectScreen(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl font-sans font-semibold text-sm transition-all btn-press shadow-sm ${item.bg} ${
                  isSelected ? 'ring-2 ring-white scale-[1.02]' : ''
                }`}
              >
                <div className="w-7 h-7 rounded-xl bg-black/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="flex-1 text-left">{item.label}</span>
                {isSelected && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-black/20">Aktif</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
