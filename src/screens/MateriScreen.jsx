import React, { useState } from 'react';
import { BookOpen, ArrowRight, ArrowLeft, X, Layers } from 'lucide-react';
import { playClickSound } from '../utils/audio';

const modules = [
  {
    id: 1,
    badge: 'Modul 1',
    title: 'Konsep Dasar Rekonsiliasi Bank',
    desc: 'Pengertian, tujuan pengendalian internal, dan formula penentuan saldo kas yang benar.',
    htmlContent: (
      <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
        <div>
          <h4 className="font-display font-bold text-sm text-sky-400 mb-1">📌 Pengertian Rekonsiliasi Bank</h4>
          <p>
            Rekonsiliasi Bank adalah proses mencocokkan dan menyelaraskan saldo akun kas menurut catatan internal perusahaan (<em>Buku Kas</em>) dengan saldo menurut rekening koran yang diterbitkan oleh pihak bank (<em>Bank Statement</em>) pada periode yang sama.
          </p>
        </div>
        <div>
          <h4 className="font-display font-bold text-sm text-sky-400 mb-1">🎯 Tujuan Utama Rekonsiliasi</h4>
          <ul className="list-disc list-inside space-y-1 text-slate-300">
            <li><strong>Pengendalian Internal:</strong> Menguji ketelitian dan integritas pencatatan kas kedua belah pihak.</li>
            <li><strong>Mendeteksi Kekeliruan:</strong> Mengetahui jika terjadi kesalahan pencatatan oleh kasir internal atau pihak bank.</li>
            <li><strong>Mengetahui Saldo Sebenarnya:</strong> Menentukan jumlah kas yang benar (<em>Adjusted Cash Balance</em>) untuk Laporan Posisi Keuangan.</li>
          </ul>
        </div>
        <div className="bg-sky-950/60 border border-sky-500/30 rounded-xl p-3 font-mono text-[11px] text-sky-200">
          Saldo Kas Benar = Saldo Bank ± Penyesuaian Bank<br />
          Saldo Kas Benar = Saldo Buku ± Penyesuaian Buku
        </div>
      </div>
    )
  },
  {
    id: 2,
    badge: 'Modul 2',
    title: 'Penyebab Selisih Saldo Kas',
    desc: 'Transaksi yang mempengaruhi sisi bank dan sisi buku (Setoran transit, cek beredar, jasa giro, NSF).',
    htmlContent: (
      <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
        <div>
          <h4 className="font-display font-bold text-sm text-amber-400 mb-1">🔍 Transaksi Sisi Bank</h4>
          <ul className="list-disc list-inside space-y-1 text-slate-300">
            <li><strong>Setoran Dalam Perjalanan (Deposit in Transit):</strong> Kas yang sudah disetor perusahaan tapi belum masuk laporan bank (<span className="text-emerald-400 font-semibold">Menambah Bank</span>).</li>
            <li><strong>Cek Beredar (Outstanding Checks):</strong> Cek yang telah dikeluarkan tapi belum dicairkan ke bank oleh pemegangnya (<span className="text-rose-400 font-semibold">Mengurangi Bank</span>).</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold text-sm text-amber-400 mb-1">🔍 Transaksi Sisi Buku Perusahaan</h4>
          <ul className="list-disc list-inside space-y-1 text-slate-300">
            <li><strong>Pendapatan Jasa Giro:</strong> Bunga simpanan dari bank (<span className="text-emerald-400 font-semibold">Menambah Buku</span>).</li>
            <li><strong>Inkaso / Piutang via Bank:</strong> Pelanggan melunasi langsung ke rekening (<span className="text-emerald-400 font-semibold">Menambah Buku</span>).</li>
            <li><strong>Biaya Administrasi Bank:</strong> Biaya pengelolaan rekening (<span className="text-rose-400 font-semibold">Mengurangi Buku</span>).</li>
            <li><strong>Cek Kosong (NSF Check):</strong> Cek setoran yang ditolak karena saldo kurang (<span className="text-rose-400 font-semibold">Mengurangi Buku</span>).</li>
            <li><strong>Kesalahan Pencatatan (Book Errors):</strong> Kesalahan pengetikan nominal.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 3,
    badge: 'Modul 3',
    title: 'Format & Prosedur Rekonsiliasi',
    desc: 'Bentuk Skontro (2 Kolom berdampingan) dan Bentuk Staffel (Vertikal/Laporan).',
    htmlContent: (
      <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
        <div>
          <h4 className="font-display font-bold text-sm text-blue-400 mb-1">📑 Bentuk Laporan Rekonsiliasi</h4>
          <ol className="list-decimal list-inside space-y-2 text-slate-300">
            <li>
              <strong>Bentuk Skontro (Horizontal / Dua Kolom Berdampingan):</strong>
              <p className="mt-0.5 text-slate-400">Menyajikan rekonsiliasi saldo bank di sebelah kiri dan saldo buku perusahaan di sebelah kanan secara paralel.</p>
            </li>
            <li>
              <strong>Bentuk Staffel (Vertikal / Laporan):</strong>
              <p className="mt-0.5 text-slate-400">Menyajikan rekonsiliasi saldo bank di bagian atas, kemudian diikuti oleh saldo buku perusahaan di bagian bawah.</p>
            </li>
          </ol>
        </div>
        <div className="bg-blue-950/60 border border-blue-500/30 rounded-xl p-3 text-slate-300 text-[11px]">
          ⚖️ <strong>Metode Menuju Saldo yang Benar</strong> adalah format standar yang paling direkomendasikan karena merefleksikan kas aktual dan menjadi dasar pembuatan jurnal penyesuaian.
        </div>
      </div>
    )
  },
  {
    id: 4,
    badge: 'Modul 4',
    title: 'Jurnal Penyesuaian Kas',
    desc: 'Aturan penting dan contoh ayat jurnal untuk pos-pos penyesuaian sisi buku perusahaan.',
    htmlContent: (
      <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
        <div>
          <h4 className="font-display font-bold text-sm text-purple-400 mb-1">✍️ Aturan Penting</h4>
          <p>
            Hanya transaksi pada <strong>SISI BUKU PERUSAHAAN</strong> yang perlu dibuatkan jurnal penyesuaian (<em>Adjusting Entries</em>). Transaksi pada sisi bank akan diproses otomatis oleh pihak bank saat transaksi kliring masuk.
          </p>
        </div>
        <div className="space-y-2">
          <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 font-mono text-[11px]">
            <strong>1. Pendapatan Jasa Giro:</strong><br />
            (D) Kas di Bank ........ Rp 600.000<br />
            &nbsp;&nbsp;&nbsp;&nbsp;(K) Pendapatan Bunga .. Rp 600.000
          </div>
          <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 font-mono text-[11px]">
            <strong>2. Biaya Administrasi Bank:</strong><br />
            (D) Beban Admin Bank ... Rp 150.000<br />
            &nbsp;&nbsp;&nbsp;&nbsp;(K) Kas di Bank ........ Rp 150.000
          </div>
          <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 font-mono text-[11px]">
            <strong>3. Cek Kosong (NSF):</strong><br />
            (D) Piutang Usaha ...... Rp 1.850.000<br />
            &nbsp;&nbsp;&nbsp;&nbsp;(K) Kas di Bank ........ Rp 1.850.000
          </div>
        </div>
      </div>
    )
  }
];

export default function MateriScreen({ onBackToMenu }) {
  const [selectedModule, setSelectedModule] = useState(null);

  return (
    <div className="w-full flex-1 min-h-0 flex flex-col px-4 py-2 overflow-y-auto pb-8 overscroll-contain">
      {/* Banner */}
      <div className="bg-[#74b3f6] rounded-2xl p-3 border-2 border-white flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 border border-white/80">
          <BookOpen className="w-5 h-5 text-[#0284c7]" />
        </div>
        <div>
          <h2 className="font-display font-extrabold text-lg text-slate-900 leading-tight">Materi</h2>
          <p className="text-[11px] text-slate-800/80 font-medium">Modul Pembelajaran Rekonsiliasi Bank</p>
        </div>
      </div>

      {/* Grid of 4 Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {modules.map((mod) => (
          <button
            key={mod.id}
            onClick={() => {
              playClickSound();
              setSelectedModule(mod);
            }}
            className="group relative bg-slate-900/90 hover:bg-slate-850 border-2 border-sky-500/30 hover:border-sky-400 rounded-2xl p-4 text-left shadow-md transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] btn-press flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  {mod.badge}
                </span>
                <BookOpen className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-display font-bold text-sm text-white mb-1 leading-snug">
                {mod.title}
              </h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {mod.desc}
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-sky-400 font-semibold group-hover:text-sky-300">
              <span>Pelajari modul</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>

      {/* Back button with Lucide ArrowLeft */}
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

      {/* Reader Modal */}
      {selectedModule && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedModule(null)}
        >
          <div 
            className="w-full max-w-md bg-slate-900 border border-sky-500/40 rounded-3xl p-5 shadow-2xl max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  {selectedModule.badge}
                </span>
                <h3 className="font-display font-bold text-base text-white mt-1">
                  {selectedModule.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedModule(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 pr-1">
              {selectedModule.htmlContent}
            </div>

            <button
              onClick={() => setSelectedModule(null)}
              className="w-full py-2.5 mt-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-display font-bold text-xs rounded-xl shadow-md transition-colors"
            >
              Tutup Materi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
