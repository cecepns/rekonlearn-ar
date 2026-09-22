import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Check, 
  RotateCcw, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle,
  FileSpreadsheet
} from 'lucide-react';
import { playClickSound, playSuccessChime, playWarningChime } from '../utils/audio';

function formatRupiah(num) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(num);
}

const DEFAULT_STATE = {
  bankSaldo: 54400000,
  bankTambah1: 8200000,
  bankKurang1: 17500000,
  bukuSaldo: 45500000,
  bukuTambah1: 600000,
  bukuTambah2: 1000000,
  bukuKurang1: 150000,
  bukuKurang2: 1850000,
};

export default function SpreadsheetScreen({ onBackToMenu }) {
  const [inputs, setInputs] = useState(DEFAULT_STATE);
  const [status, setStatus] = useState(null); // 'balanced' | 'unbalanced' | null

  const handleChange = (field, value) => {
    const num = parseFloat(value) || 0;
    setInputs((prev) => ({ ...prev, [field]: num }));
    setStatus(null);
  };

  const totalBankAdjusted = inputs.bankSaldo + inputs.bankTambah1 - inputs.bankKurang1;
  const totalBukuAdjusted = 
    inputs.bukuSaldo + inputs.bukuTambah1 + inputs.bukuTambah2 - inputs.bukuKurang1 - inputs.bukuKurang2;

  const handleCalculate = () => {
    playClickSound();
    const isBalanced = totalBankAdjusted === totalBukuAdjusted && totalBankAdjusted > 0;
    if (isBalanced) {
      setStatus('balanced');
      playSuccessChime();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#38bdf8', '#fbbf24', '#34d399', '#f43f5e', '#a855f7']
        });
      } catch (e) {
        console.debug('Confetti error:', e);
      }
    } else {
      setStatus('unbalanced');
      playWarningChime();
    }
  };

  const handleReset = () => {
    playClickSound();
    setInputs(DEFAULT_STATE);
    setStatus(null);
  };

  return (
    <div className="w-full flex-1 min-h-0 overflow-y-auto px-4 py-2 pb-14 space-y-3.5 overscroll-contain">
      {/* Banner */}
      <div className="bg-[#f4b3a1] rounded-2xl p-3 border-2 border-white flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 border border-white/80">
          <FileSpreadsheet className="w-5 h-5 text-[#ea580c]" />
        </div>
        <div>
          <h2 className="font-display font-extrabold text-lg text-slate-900 leading-tight">Spreadsheet</h2>
          <p className="text-[11px] text-slate-800/80 font-medium">Latihan Rekonsiliasi Bank 2 Kolom</p>
        </div>
      </div>

      {/* Case Overview Card */}
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-3 text-xs shadow-sm">
        <div className="flex items-center gap-2 text-sky-400 font-bold mb-1">
          <FileSpreadsheet className="w-4 h-4" />
          <span>Kasus Praktik: PT Maju Bersama</span>
        </div>
        <p className="text-slate-300 leading-relaxed text-[11px]">
          Per 31 Desember 2026. Isikan angka transaksi penyesuaian untuk memverifikasi apakah kedua saldo menghasilkan <em>Adjusted Balance</em> yang seimbang.
        </p>
      </div>

      {/* TABLE 1: SISI LAPORAN BANK */}
      <div className="bg-slate-900/95 border border-slate-700/90 rounded-2xl overflow-hidden shadow-md">
        <div className="bg-gradient-to-r from-sky-900 to-slate-900 px-3.5 py-2.5 border-b border-slate-700 flex items-center justify-between">
          <span className="font-display font-bold text-xs text-sky-300 tracking-wide uppercase">
            1. Sisi Laporan Bank
          </span>
          <span className="text-[10px] text-sky-400/80 font-mono">Bank Statement</span>
        </div>

        <div className="p-3.5 space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 font-medium text-[11px] mb-1">
              Saldo Kas menurut Bank
            </label>
            <input
              type="number"
              value={inputs.bankSaldo}
              onChange={(e) => handleChange('bankSaldo', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-2">
            <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
              Ditambah:
            </span>
            <div>
              <label className="block text-slate-400 text-[11px] mb-1">
                Setoran Dalam Perjalanan (Deposit in Transit)
              </label>
              <input
                type="number"
                value={inputs.bankTambah1}
                onChange={(e) => handleChange('bankTambah1', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-2">
            <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-wider">
              Dikurangi:
            </span>
            <div>
              <label className="block text-slate-400 text-[11px] mb-1">
                Cek Beredar (Outstanding Checks)
              </label>
              <input
                type="number"
                value={inputs.bankKurang1}
                onChange={(e) => handleChange('bankKurang1', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-700 flex items-center justify-between bg-sky-950/40 p-2.5 rounded-xl border border-sky-500/20">
            <span className="font-semibold text-slate-200 text-xs">Saldo Bank Disesuaikan:</span>
            <span className="font-mono font-bold text-sky-300 text-xs">{formatRupiah(totalBankAdjusted)}</span>
          </div>
        </div>
      </div>

      {/* TABLE 2: SISI BUKU PERUSAHAAN */}
      <div className="bg-slate-900/95 border border-slate-700/90 rounded-2xl overflow-hidden shadow-md">
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 px-3.5 py-2.5 border-b border-slate-700 flex items-center justify-between">
          <span className="font-display font-bold text-xs text-indigo-300 tracking-wide uppercase">
            2. Sisi Buku Perusahaan
          </span>
          <span className="text-[10px] text-indigo-400/80 font-mono">Company Books</span>
        </div>

        <div className="p-3.5 space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 font-medium text-[11px] mb-1">
              Saldo Kas menurut Buku
            </label>
            <input
              type="number"
              value={inputs.bukuSaldo}
              onChange={(e) => handleChange('bukuSaldo', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-2">
            <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
              Ditambah:
            </span>
            <div>
              <label className="block text-slate-400 text-[10px] mb-1">Pendapatan Jasa Giro Bank</label>
              <input
                type="number"
                value={inputs.bukuTambah1}
                onChange={(e) => handleChange('bukuTambah1', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-[10px] mb-1">Penagihan Piutang via Bank (Inkaso)</label>
              <input
                type="number"
                value={inputs.bukuTambah2}
                onChange={(e) => handleChange('bukuTambah2', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-2">
            <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-wider">
              Dikurangi:
            </span>
            <div>
              <label className="block text-slate-400 text-[10px] mb-1">Biaya Administrasi Bank</label>
              <input
                type="number"
                value={inputs.bukuKurang1}
                onChange={(e) => handleChange('bukuKurang1', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-mono text-xs focus:outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-[10px] mb-1">Cek Kosong Pelanggan (NSF Check)</label>
              <input
                type="number"
                value={inputs.bukuKurang2}
                onChange={(e) => handleChange('bukuKurang2', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-mono text-xs focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-700 flex items-center justify-between bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-500/20">
            <span className="font-semibold text-slate-200 text-xs">Saldo Buku Disesuaikan:</span>
            <span className="font-mono font-bold text-indigo-300 text-xs">{formatRupiah(totalBukuAdjusted)}</span>
          </div>
        </div>
      </div>

      {/* Alert Status */}
      {status === 'balanced' && (
        <div className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 animate-fadeIn">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <strong className="block font-display font-bold text-sm text-emerald-300">SEIMBANG (BALANCED)! 🎉</strong>
            <span>Saldo kas setelah disesuaikan bernilai tepat sama: </span>
            <span className="font-mono font-bold text-emerald-200">{formatRupiah(totalBankAdjusted)}</span>
          </div>
        </div>
      )}

      {status === 'unbalanced' && (
        <div className="flex items-start gap-3 p-3 rounded-2xl bg-rose-950/80 border border-rose-500/50 text-rose-200 animate-fadeIn">
          <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <strong className="block font-display font-bold text-sm text-rose-300">BELUM SEIMBANG (UNBALANCED)!</strong>
            <span>Terdapat selisih antara sisi bank ({formatRupiah(totalBankAdjusted)}) dan sisi buku ({formatRupiah(totalBukuAdjusted)}). Periksa kembali nominal item penyesuaian Anda.</span>
          </div>
        </div>
      )}

      {/* Action Buttons using Lucide Check & RotateCcw */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={handleCalculate}
          className="flex-1 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-display font-bold text-xs rounded-2xl shadow-md border-2 border-white flex items-center justify-center gap-2 transition-all btn-press"
        >
          <Check className="w-4 h-4" />
          <span>Hitung & Cek Keseimbangan</span>
        </button>

        <button
          onClick={handleReset}
          className="px-4 h-12 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-display font-semibold text-xs rounded-2xl border border-slate-700 flex items-center justify-center gap-1.5 transition-all btn-press"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Back to menu button using Lucide ArrowLeft */}
      <div className="pt-1">
        <button
          onClick={() => {
            playClickSound();
            onBackToMenu();
          }}
          className="w-full py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all btn-press"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Menu Utama</span>
        </button>
      </div>
    </div>
  );
}
