import React from 'react';
import { playClickSound } from '../utils/audio';
import { ChevronRight } from 'lucide-react';

import icon1 from '../assets/1.png';
import icon2 from '../assets/2.png';
import icon3 from '../assets/3.png';
import icon4 from '../assets/4.png';
import icon5 from '../assets/5.png';
import icon6 from '../assets/6.png';
import icon7 from '../assets/7.png';

const menuCards = [
  {
    id: 'profil',
    title: 'Profil Penulis',
    bgColor: 'bg-[#f8b4c4]',
    icon: icon1,
    textColor: 'text-slate-900',
  },
  {
    id: 'capaian',
    title: 'Capaian Pembelajaran',
    bgColor: 'bg-[#f6be32]',
    icon: icon2,
    textColor: 'text-slate-900',
  },
  {
    id: 'materi',
    title: 'Materi',
    bgColor: 'bg-[#74b3f6]',
    icon: icon3,
    textColor: 'text-slate-900',
  },
  {
    id: 'kamera',
    title: 'Kamera AR',
    bgColor: 'bg-[#889af2]',
    icon: icon4,
    textColor: 'text-slate-900',
  },
  {
    id: 'video',
    title: 'Video Pembelajaran',
    bgColor: 'bg-[#659a7f]',
    icon: icon5,
    textColor: 'text-white',
  },
  {
    id: 'spreadsheet',
    title: 'Spreadsheet',
    bgColor: 'bg-[#f4b3a1]',
    icon: icon6,
    textColor: 'text-slate-900',
  },
  {
    id: 'informasi',
    title: 'Informasi',
    bgColor: 'bg-[#e66271]',
    icon: icon7,
    textColor: 'text-white',
  },
];

export default function MenuScreen({ onSelectScreen }) {
  return (
    <div className="w-full flex-1 min-h-0 flex flex-col px-5 py-3 overflow-y-auto pb-8 overscroll-contain">
      <div className="mb-3 text-center">
        <h2 className="font-display font-black text-xl text-white tracking-wide">
          Menu Utama
        </h2>
        <p className="text-xs text-sky-200/80 font-medium">
          Pilih modul pembelajaran rekonsiliasi bank
        </p>
      </div>

      <nav className="flex flex-col gap-3" aria-label="Daftar Menu Pembelajaran">
        {menuCards.map((card) => (
          <button
            key={card.id}
            onClick={() => {
              playClickSound();
              onSelectScreen(card.id);
            }}
            className={`group relative w-full h-[76px] ${card.bgColor} rounded-[22px] border-[3px] border-white flex items-center px-4 gap-4 transition-all duration-150 hover:-translate-y-0.5 active:scale-[0.98] btn-press overflow-hidden text-left`}
          >
            {/* Shimmer light bar on hover */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"></div>

            {/* Menu Icon Container - Menggunakan berkas src/assets (1.png - 7.png) TANPA shadow */}
            <div className="w-14 h-14 shrink-0 flex items-center justify-center">
              <img
                src={card.icon}
                alt={`Ikon ${card.title}`}
                className="max-w-full max-h-full object-contain [filter:none] drop-shadow-none"
              />
            </div>

            {/* Menu Title */}
            <span className={`flex-1 font-display font-extrabold text-[1.15rem] leading-tight ${card.textColor} tracking-tight`}>
              {card.title}
            </span>

            {/* Subtle Chevron indicator */}
            <div className="w-7 h-7 rounded-full bg-white/30 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
              <ChevronRight className={`w-4 h-4 ${card.textColor}`} />
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
}
