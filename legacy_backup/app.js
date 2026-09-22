/**
 * REKONLEARN AR - Application Engine (Multi-Page Edition)
 * Media Pembelajaran Interaktif Rekonsiliasi Bank
 */

document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initSoundEngine();
  initFullscreenToggle();
  initGlobalDrawer();
  initSpreadsheet();
  initARCamera();
  initVideoPlayer();
  initAudioClicks();
});

/* ==========================================================================
   1. LIVE CLOCK CONTROLLER
   ========================================================================== */
function initClock() {
  const clockEl = document.getElementById('status-clock');
  function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    if (clockEl) {
      clockEl.textContent = `${hours}:${minutes}`;
    }
  }
  updateTime();
  setInterval(updateTime, 1000);
}

/* ==========================================================================
   2. WEB AUDIO SYNTHESIZER (SUARA & HAPTIK INTERAKTIF)
   ========================================================================== */
let audioCtx = null;
let soundEnabled = localStorage.getItem('rekon_sound_enabled') !== 'false';

function initSoundEngine() {
  const btnToggle = document.getElementById('btn-toggle-sound');
  const iconSound = document.getElementById('sound-icon');

  if (iconSound) {
    iconSound.textContent = soundEnabled ? '🔊' : '🔇';
  }
  if (btnToggle) {
    btnToggle.style.opacity = soundEnabled ? '1' : '0.6';
    btnToggle.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      localStorage.setItem('rekon_sound_enabled', soundEnabled);
      if (iconSound) iconSound.textContent = soundEnabled ? '🔊' : '🔇';
      btnToggle.style.opacity = soundEnabled ? '1' : '0.6';
      if (soundEnabled) playTone(520, 0.08, 'sine');
    });
  }
}

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(freq = 440, duration = 0.1, type = 'sine') {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.debug('Audio error:', e);
  }
}

function playSuccessChime() {
  if (!soundEnabled) return;
  setTimeout(() => playTone(523.25, 0.12, 'triangle'), 0);   // C5
  setTimeout(() => playTone(659.25, 0.12, 'triangle'), 120); // E5
  setTimeout(() => playTone(783.99, 0.25, 'triangle'), 240); // G5
}

function playWarningChime() {
  if (!soundEnabled) return;
  setTimeout(() => playTone(340, 0.15, 'sawtooth'), 0);
  setTimeout(() => playTone(280, 0.2, 'sawtooth'), 120);
}

function initAudioClicks() {
  document.querySelectorAll('a, button, .menu-card, .materi-box, .capaian-row').forEach(el => {
    el.addEventListener('click', () => {
      playTone(560, 0.06, 'sine');
    });
  });
}

/* ==========================================================================
   3. GLOBAL DRAWER & NAVIGATION
   ========================================================================== */
function initGlobalDrawer() {
  const btnTriggers = document.querySelectorAll('.open-drawer-btn');
  const btnClose = document.getElementById('btn-close-drawer');
  const overlay = document.getElementById('modal-drawer-overlay');

  btnTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openDrawer();
    });
  });

  if (btnClose) btnClose.addEventListener('click', closeDrawer);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeDrawer();
    });
  }
}

function openDrawer() {
  playTone(480, 0.08, 'sine');
  const drawer = document.getElementById('modal-drawer-overlay');
  if (drawer) drawer.classList.add('active');
}

function closeDrawer() {
  const drawer = document.getElementById('modal-drawer-overlay');
  if (drawer) drawer.classList.remove('active');
}

/* ==========================================================================
   4. CAPAIAN PEMBELAJARAN (ACCORDION TOGGLE)
   ========================================================================== */
function toggleCapaian(index) {
  playTone(520, 0.07, 'sine');
  const item = document.getElementById(`capaian-${index}`);
  if (!item) return;

  const isExpanded = item.classList.contains('expanded');

  // Close all other items for a clean accordion experience
  document.querySelectorAll('.capaian-item').forEach(el => {
    el.classList.remove('expanded');
  });

  if (!isExpanded) {
    item.classList.add('expanded');
  }
}
window.toggleCapaian = toggleCapaian;

/* ==========================================================================
   5. MATERI MODALS
   ========================================================================== */
const materiData = {
  1: {
    title: 'Modul 1: Konsep Dasar Rekonsiliasi Bank',
    html: `
      <h3>📌 Pengertian Rekonsiliasi Bank</h3>
      <p>Rekonsiliasi Bank adalah proses mencocokkan dan menyelaraskan saldo akun kas menurut catatan internal perusahaan (<em>Buku Kas</em>) dengan saldo menurut rekening koran yang diterbitkan oleh pihak bank (<em>Bank Statement</em>) pada periode yang sama.</p>
      
      <h3>🎯 Tujuan Utama Rekonsiliasi</h3>
      <ul>
        <li><strong>Pengendalian Internal:</strong> Menguji ketelitian dan integritas pencatatan kas kedua belah pihak.</li>
        <li><strong>Mendeteksi Kecurangan/Kekeliruan:</strong> Mengetahui jika terjadi kesalahan pencatatan oleh kasir internal atau pihak bank.</li>
        <li><strong>Mengetahui Saldo Sebenarnya:</strong> Menentukan jumlah kas yang benar (<em>Adjusted Cash Balance</em>) yang harus dilaporkan di Neraca/Laporan Posisi Keuangan.</li>
      </ul>

      <div class="modal-formula-box">
        Saldo Kas Benar = Saldo Bank ± Penyesuaian Bank<br>
        Saldo Kas Benar = Saldo Buku ± Penyesuaian Buku
      </div>
    `
  },
  2: {
    title: 'Modul 2: Faktor Penyebab Selisih Saldo Kas',
    html: `
      <h3>🔍 Transaksi yang Mempengaruhi Sisi Bank</h3>
      <ul>
        <li><strong>Setoran Dalam Perjalanan (Deposit in Transit):</strong> Kas yang sudah diterima dan dicatat perusahaan, tetapi belum tercatat oleh bank saat laporan dicetak (<strong>Menambah Saldo Bank</strong>).</li>
        <li><strong>Cek Beredar (Outstanding Checks):</strong> Cek yang telah dikeluarkan perusahaan kepada pemasok/kreditur namun belum dicairkan ke bank oleh pemegangnya (<strong>Mengurangi Saldo Bank</strong>).</li>
      </ul>

      <h3>🔍 Transaksi yang Mempengaruhi Sisi Buku Perusahaan</h3>
      <ul>
        <li><strong>Pendapatan Jasa Giro:</strong> Bunga yang diberikan bank atas saldo simpanan (<strong>Menambah Saldo Buku</strong>).</li>
        <li><strong>Inkaso / Penagihan Piutang via Bank:</strong> Pelanggan membayar langsung ke rekening bank perusahaan (<strong>Menambah Saldo Buku</strong>).</li>
        <li><strong>Beban Administrasi Bank:</strong> Biaya operasional dan pengelolaan rekening (<strong>Mengurangi Saldo Buku</strong>).</li>
        <li><strong>Cek Kosong (Non-Sufficient Funds / NSF):</strong> Cek setoran pelanggan yang tidak dapat dicairkan karena dananya tidak cukup (<strong>Mengurangi Saldo Buku</strong>).</li>
        <li><strong>Kesalahan Pencatatan (Book Errors):</strong> Kesalahan nominal ketik oleh kasir internal.</li>
      </ul>
    `
  },
  3: {
    title: 'Modul 3: Bentuk & Metode Rekonsiliasi Bank',
    html: `
      <h3>📑 Bentuk Laporan Rekonsiliasi</h3>
      <p>Terdapat 2 bentuk format penyajian rekonsiliasi yang lazim digunakan di dunia pendidikan dan praktik akuntansi:</p>
      
      <ol>
        <li><strong>Bentuk Skontro (Horizontal / Dua Kolom Berdampingan):</strong>
          Menyajikan rekonsiliasi saldo bank di sebelah kiri dan rekonsiliasi saldo buku perusahaan di sebelah kanan secara paralel.
        </li>
        <li><strong>Bentuk Staffel (Vertikal / Laporan):</strong>
          Menyajikan rekonsiliasi saldo bank di bagian atas, kemudian diikuti oleh rekonsiliasi saldo buku perusahaan di bagian bawah.
        </li>
      </ol>

      <h3>⚖️ Format 2 Kolom Menuju Saldo yang Benar</h3>
      <p>Metode ini paling direkomendasikan karena merefleksikan saldo kas riil perusahaan pada tanggal neraca dan menjadi dasar langsung pembuatan jurnal penyesuaian.</p>
    `
  },
  4: {
    title: 'Modul 4: Jurnal Penyesuaian Rekonsiliasi Kas',
    html: `
      <h3>✍️ Aturan Penting Jurnal Penyesuaian</h3>
      <p>Hanya transaksi pada <strong>SISI BUKU PERUSAHAAN</strong> yang perlu dibuatkan jurnal penyesuaian (<em>Adjusting Journal Entries</em>). Transaksi pada sisi bank tidak perlu dijurnal oleh perusahaan karena bank yang akan memprosesnya otomatis.</p>
      
      <h3>Contoh Ayat Jurnal Umum:</h3>
      
      <div class="modal-formula-box">
        <strong>1. Mencatat Pendapatan Jasa Giro:</strong><br>
        (D) Kas di Bank .......... Rp 600.000<br>
        &nbsp;&nbsp;&nbsp;&nbsp;(K) Pendapatan Bunga .... Rp 600.000
      </div>

      <div class="modal-formula-box">
        <strong>2. Mencatat Biaya Administrasi Bank:</strong><br>
        (D) Beban Administrasi Bank .. Rp 150.000<br>
        &nbsp;&nbsp;&nbsp;&nbsp;(K) Kas di Bank ............. Rp 150.000
      </div>

      <div class="modal-formula-box">
        <strong>3. Mencatat Cek Kosong (NSF) dari Pelanggan:</strong><br>
        (D) Piutang Usaha ............ Rp 1.850.000<br>
        &nbsp;&nbsp;&nbsp;&nbsp;(K) Kas di Bank ............. Rp 1.850.000
      </div>
    `
  }
};

function openMateriModal(moduleNum) {
  playTone(550, 0.1, 'triangle');
  const modal = document.getElementById('modal-materi-overlay');
  const titleEl = document.getElementById('modal-materi-title');
  const contentEl = document.getElementById('modal-materi-content');

  const data = materiData[moduleNum];
  if (data && modal && titleEl && contentEl) {
    titleEl.textContent = data.title;
    contentEl.innerHTML = data.html;
    modal.classList.add('active');
  }
}
window.openMateriModal = openMateriModal;

function closeMateriModal() {
  const modal = document.getElementById('modal-materi-overlay');
  if (modal) modal.classList.remove('active');
}
window.closeMateriModal = closeMateriModal;

// Close button on materi modal
document.addEventListener('click', (e) => {
  if (e.target && (e.target.id === 'btn-close-materi-modal' || e.target.id === 'modal-materi-overlay')) {
    closeMateriModal();
  }
});

/* ==========================================================================
   6. KAMERA AR & SIMULASI SCANNER
   ========================================================================== */
let cameraStream = null;
let isCameraActive = false;
let currentMarkerIndex = 0;

const arMarkers = [
  {
    title: '🏛️ Model 3D Gedung Bank & Kliring',
    desc: 'Sistem kliring elektronik bank mencatat mutasi kas secara berkala. Bank memproses warkat debit dan kredit sesuai batas waktu cut-off harian.'
  },
  {
    title: '📑 Rekening Koran (Bank Statement)',
    desc: 'Dokumen mutasi transaksi kas yang dikirimkan bank kepada nasabah. Menampilkan histori setoran, tarikan, biaya admin, serta bunga giro.'
  },
  {
    title: '💳 Alur Kliring Cek & Bilyet Giro',
    desc: 'Cek beredar (Outstanding Check) adalah cek yang sudah diserahkan perusahaan kepada pihak ketiga, namun belum diajukan kliring ke bank penerbit.'
  }
];

function initARCamera() {
  const btnToggleCamera = document.getElementById('btn-toggle-camera');
  const btnSimMarker = document.getElementById('btn-sim-marker');
  const videoFeed = document.getElementById('ar-video-feed');
  const simCard = document.getElementById('ar-sim-card');
  const simTitle = document.getElementById('ar-sim-title');
  const simDesc = document.getElementById('ar-sim-desc');

  if (!btnToggleCamera && !btnSimMarker) return;

  // Real Camera Stream Toggle
  if (btnToggleCamera) {
    btnToggleCamera.addEventListener('click', async () => {
      playTone(500, 0.08, 'sine');
      if (!isCameraActive) {
        try {
          if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            cameraStream = await navigator.mediaDevices.getUserMedia({
              video: { facingMode: 'environment' }
            });
            if (videoFeed) {
              videoFeed.srcObject = cameraStream;
              videoFeed.style.display = 'block';
              isCameraActive = true;
              btnToggleCamera.textContent = '⏹ Matikan Kamera';
              btnToggleCamera.style.background = '#ef4444';
            }
          } else {
            alert('Kamera tidak didukung di browser ini. Anda dapat mencoba mode Simulasi Scan AR!');
          }
        } catch (err) {
          console.warn('Camera access denied or unavailable:', err);
          alert('Izin kamera belum diberikan atau kamera tidak terdeteksi. Silakan gunakan tombol "Simulasi Scan AR" untuk melihat pengalaman AR!');
        }
      } else {
        // Stop Camera
        if (cameraStream) {
          cameraStream.getTracks().forEach(track => track.stop());
          cameraStream = null;
        }
        if (videoFeed) {
          videoFeed.style.display = 'none';
        }
        isCameraActive = false;
        btnToggleCamera.textContent = '📷 Nyalakan Kamera';
        btnToggleCamera.style.background = 'var(--card-kamera)';
      }
    });
  }

  // Simulated Marker Detection
  if (btnSimMarker) {
    btnSimMarker.addEventListener('click', () => {
      playTone(700, 0.12, 'sine');
      const marker = arMarkers[currentMarkerIndex];
      currentMarkerIndex = (currentMarkerIndex + 1) % arMarkers.length;

      if (simCard && simTitle && simDesc) {
        simTitle.textContent = marker.title;
        simDesc.textContent = marker.desc;
        simCard.style.display = 'block';

        playSuccessChime();

        setTimeout(() => {
          if (simCard.style.display === 'block') {
            simCard.style.display = 'none';
          }
        }, 8000);
      }
    });
  }

  if (simCard) {
    simCard.addEventListener('click', () => {
      simCard.style.display = 'none';
    });
  }
}

/* ==========================================================================
   7. VIDEO PEMBELAJARAN
   ========================================================================== */
function initVideoPlayer() {
  const btnBigPlay = document.getElementById('btn-big-play');
  const poster = document.getElementById('video-poster');
  const video = document.getElementById('html5-video');
  const btnPlayPause = document.getElementById('btn-vid-playpause');
  const progressBar = document.getElementById('video-progress');
  const scrubberHandle = document.getElementById('video-scrubber-handle');
  const scrubberWrap = document.getElementById('video-scrubber-bar');
  const btnVol = document.getElementById('btn-vid-vol');

  if (!btnBigPlay && !btnPlayPause) return;

  let isPlaying = false;

  function togglePlay() {
    playTone(480, 0.08, 'sine');
    if (!isPlaying) {
      if (poster) poster.style.display = 'none';
      if (video) {
        video.style.display = 'block';
        video.play().catch(e => console.log('Autoplay handled:', e));
      }
      isPlaying = true;
      if (btnPlayPause) btnPlayPause.textContent = '⏸';
    } else {
      if (video) video.pause();
      isPlaying = false;
      if (btnPlayPause) btnPlayPause.textContent = '▶';
    }
  }

  if (btnBigPlay) btnBigPlay.addEventListener('click', togglePlay);
  if (poster) poster.addEventListener('click', togglePlay);
  if (btnPlayPause) btnPlayPause.addEventListener('click', togglePlay);

  if (video) {
    video.addEventListener('timeupdate', () => {
      if (video.duration) {
        const pct = (video.currentTime / video.duration) * 100;
        if (progressBar) progressBar.style.width = `${pct}%`;
        if (scrubberHandle) scrubberHandle.style.left = `${pct}%`;
      }
    });

    video.addEventListener('ended', () => {
      isPlaying = false;
      if (btnPlayPause) btnPlayPause.textContent = '▶';
    });
  }

  if (scrubberWrap && video) {
    scrubberWrap.addEventListener('click', (e) => {
      const rect = scrubberWrap.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      if (video.duration) {
        video.currentTime = pos * video.duration;
      }
    });
  }

  if (btnVol && video) {
    btnVol.addEventListener('click', () => {
      video.muted = !video.muted;
      btnVol.textContent = video.muted ? '🔇' : '🔊';
    });
  }
}

function selectVideo(num, title, duration) {
  playTone(540, 0.08, 'sine');
  document.querySelectorAll('.playlist-item').forEach(item => item.classList.remove('active'));
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }

  const video = document.getElementById('html5-video');
  const poster = document.getElementById('video-poster');
  const btnPlayPause = document.getElementById('btn-vid-playpause');

  if (video) {
    video.currentTime = 0;
    video.play().catch(() => {});
    if (poster) poster.style.display = 'none';
    video.style.display = 'block';
    if (btnPlayPause) btnPlayPause.textContent = '⏸';
  }
}
window.selectVideo = selectVideo;

/* ==========================================================================
   8. SPREADSHEET REKONSILIASI BANK (PENGGANTI KUIS EVALUASI)
   ========================================================================== */
function initSpreadsheet() {
  const btnCalc = document.getElementById('btn-rekon-calc');
  const btnReset = document.getElementById('btn-rekon-reset');
  const inputs = document.querySelectorAll('.sheet-input');

  if (!btnCalc && inputs.length === 0) return;

  inputs.forEach(input => {
    input.addEventListener('input', () => calculateRekonsiliasi(false));
  });

  if (btnCalc) {
    btnCalc.addEventListener('click', () => {
      calculateRekonsiliasi(true);
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      playTone(380, 0.08, 'sine');
      const bSaldo = document.getElementById('bank-saldo');
      if (bSaldo) bSaldo.value = '54400000';
      const bTam1 = document.getElementById('bank-tambah-1');
      if (bTam1) bTam1.value = '8200000';
      const bKur1 = document.getElementById('bank-kurang-1');
      if (bKur1) bKur1.value = '17500000';

      const buSaldo = document.getElementById('buku-saldo');
      if (buSaldo) buSaldo.value = '45500000';
      const buTam1 = document.getElementById('buku-tambah-1');
      if (buTam1) buTam1.value = '600000';
      const buTam2 = document.getElementById('buku-tambah-2');
      if (buTam2) buTam2.value = '1000000';
      const buKur1 = document.getElementById('buku-kurang-1');
      if (buKur1) buKur1.value = '150000';
      const buKur2 = document.getElementById('buku-kurang-2');
      if (buKur2) buKur2.value = '1850000';

      const alertBalanced = document.getElementById('sheet-alert-balanced');
      const alertUnbalanced = document.getElementById('sheet-alert-unbalanced');
      if (alertBalanced) alertBalanced.style.display = 'none';
      if (alertUnbalanced) alertUnbalanced.style.display = 'none';

      calculateRekonsiliasi(false);
    });
  }

  // Initial calculation
  calculateRekonsiliasi(false);
}

function formatRupiah(num) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(num);
}

function calculateRekonsiliasi(showNotification = false) {
  const bankSaldoEl = document.getElementById('bank-saldo');
  if (!bankSaldoEl) return;

  const bankSaldo = parseFloat(bankSaldoEl.value) || 0;
  const bankTambah1 = parseFloat(document.getElementById('bank-tambah-1')?.value) || 0;
  const bankKurang1 = parseFloat(document.getElementById('bank-kurang-1')?.value) || 0;

  const bukuSaldo = parseFloat(document.getElementById('buku-saldo')?.value) || 0;
  const bukuTambah1 = parseFloat(document.getElementById('buku-tambah-1')?.value) || 0;
  const bukuTambah2 = parseFloat(document.getElementById('buku-tambah-2')?.value) || 0;
  const bukuKurang1 = parseFloat(document.getElementById('buku-kurang-1')?.value) || 0;
  const bukuKurang2 = parseFloat(document.getElementById('buku-kurang-2')?.value) || 0;

  // Hitung
  const totalBankAdjusted = bankSaldo + bankTambah1 - bankKurang1;
  const totalBukuAdjusted = bukuSaldo + bukuTambah1 + bukuTambah2 - bukuKurang1 - bukuKurang2;

  const elBankFinal = document.getElementById('calc-bank-final');
  const elBukuFinal = document.getElementById('calc-buku-final');

  if (elBankFinal) elBankFinal.textContent = formatRupiah(totalBankAdjusted);
  if (elBukuFinal) elBukuFinal.textContent = formatRupiah(totalBukuAdjusted);

  const alertBalanced = document.getElementById('sheet-alert-balanced');
  const alertUnbalanced = document.getElementById('sheet-alert-unbalanced');
  const valText = document.getElementById('alert-balance-val');

  if (showNotification) {
    if (totalBankAdjusted === totalBukuAdjusted && totalBankAdjusted > 0) {
      if (alertBalanced) alertBalanced.style.display = 'flex';
      if (alertUnbalanced) alertUnbalanced.style.display = 'none';
      if (valText) valText.textContent = formatRupiah(totalBankAdjusted);
      playSuccessChime();
      launchConfetti();
    } else {
      if (alertBalanced) alertBalanced.style.display = 'none';
      if (alertUnbalanced) alertUnbalanced.style.display = 'flex';
      playWarningChime();
    }
  }
}

/* ==========================================================================
   9. CELEBRATORY CONFETTI
   ========================================================================== */
function launchConfetti() {
  const colors = ['#f43f5e', '#38bdf8', '#fbbf24', '#34d399', '#a855f7', '#fb923c'];
  for (let i = 0; i < 40; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-particle';
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    confetti.style.width = `${Math.random() * 8 + 6}px`;
    confetti.style.height = `${Math.random() * 8 + 6}px`;
    confetti.style.animationDuration = `${Math.random() * 2 + 1.5}s`;
    confetti.style.animationDelay = `${Math.random() * 0.4}s`;
    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 3500);
  }
}

/* ==========================================================================
   10. DESKTOP FULLSCREEN & MOBILE VIEW TOGGLE
   ========================================================================== */
function initFullscreenToggle() {
  const btnToggle = document.getElementById('btn-toggle-fullscreen');
  const wrapper = document.getElementById('viewport-wrapper');
  const textMode = document.getElementById('view-mode-text');
  const iconMode = document.getElementById('view-mode-icon');

  const savedMode = localStorage.getItem('rekon_full_mode') === 'true';
  if (savedMode && wrapper) {
    wrapper.classList.add('full-mode');
    if (textMode) textMode.textContent = 'Mode HP';
    if (iconMode) iconMode.textContent = '📱';
  }

  if (btnToggle && wrapper) {
    btnToggle.addEventListener('click', () => {
      playTone(450, 0.08, 'sine');
      wrapper.classList.toggle('full-mode');
      const isFull = wrapper.classList.contains('full-mode');
      localStorage.setItem('rekon_full_mode', isFull);
      if (textMode) textMode.textContent = isFull ? 'Mode HP' : 'Layar Penuh';
      if (iconMode) iconMode.textContent = isFull ? '📱' : '⛶';
    });
  }
}
