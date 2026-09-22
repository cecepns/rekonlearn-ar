import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { playClickSound } from '../utils/audio';

export default function HomeScreen({ onStart }) {
  return (
    <div className="relative w-full h-full min-h-[620px] flex flex-col justify-between overflow-hidden rounded-[32px] select-none">
      {/* Background Bank Building with atmospheric overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/bg.jpeg"
          alt="Latar Belakang Gedung Bank Rekonlearn AR"
          className="w-full h-full object-cover object-center"
        />
        {/* Modern dark gradient overlay for crystal clear contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e223f]/80 via-transparent to-[#071324]/90"></div>
        <div className="absolute inset-0 bg-sky-950/20 mix-blend-multiply"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full px-6 py-6 text-center">

        {/* Top Section (Elevated - Naik ke Atas Sesuai Request) */}
        <div className="flex flex-col items-center pt-2 -mt-1 animate-fadeIn">
          {/* Logo UNESA */}
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl p-2.5 border border-white/30 shadow-lg mb-3">
            <img
              src="/assets/logo.png"
              alt="Logo UNESA"
              className="w-full h-full object-contain filter drop-shadow-md"
            />
          </div>

          {/* Title & AR Subtitle - Elevated Position (Naik ke Atas) */}
          <div className="flex flex-col items-center -space-y-1">
            <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-wider uppercase drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]">
              REKONLEARN
            </h1>

            <div className="relative inline-flex items-center justify-center">
              <span className="font-display font-black text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 drop-shadow-[0_4px_12px_rgba(245,158,11,0.5)]">
                AR
              </span>
              <Sparkles className="w-5 h-5 text-amber-300 absolute -top-1 -right-6 animate-pulse" />
              <Sparkles className="w-4 h-4 text-amber-300 absolute bottom-1 -left-5 animate-pulse" />
            </div>

            {/* <p className="text-sky-200/90 text-xs font-medium tracking-wide mt-1 max-w-[240px] leading-relaxed">
              Media Pembelajaran Rekonsiliasi Bank Interaktif & Augmented Reality
            </p> */}
          </div>
        </div>

        {/* Bottom Section with Mulai Button */}
        <div className="w-full flex flex-col items-center gap-4 pb-6">
          <button
            onClick={() => {
              playClickSound();
              onStart();
            }}
            className="group relative w-full max-w-[250px] h-14 bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-white font-display font-extrabold text-lg rounded-full border-[3px] border-white shadow-[0_10px_25px_rgba(14,165,233,0.5)] flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 active:translate-y-0 btn-press overflow-hidden"
          >
            {/* Shimmer light bar */}
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer"></div>

            <span className="tracking-wide">Mulai</span>
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </button>

          <div className="text-[11px] text-slate-300/80 font-medium tracking-wide">
            Universitas Negeri Surabaya
          </div>
        </div>

      </div>
    </div>
  );
}
