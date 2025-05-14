import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeartbeat, faBandAid, faBurn, faBone, faHeadSideCough, 
  faFirstAid, faRunning, faChevronLeft, faChevronRight, 
  faArrowRight, faTimes, faBookmark, faShareSquare,
  faVideo, faQuestionCircle // Added missing icons
} from '@fortawesome/free-solid-svg-icons';

const ArtikelPage = () => {
  const [activeCategory, setActiveCategory] = useState('semua');
  const [showModal, setShowModal] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  
  // Data artikel
  const featuredArticle = {
    id: 'featured',
    title: 'Pentingnya Menguasai Teknik CPR untuk Penyelamatan Nyawa',
    excerpt: 'CPR (Cardiopulmonary Resuscitation) adalah teknik penyelamatan nyawa yang sangat penting dikuasai oleh setiap orang. Artikel ini membahas langkah-langkah CPR yang benar, kapan harus melakukannya, dan bagaimana teknik ini dapat meningkatkan peluang kelangsungan hidup seseorang yang mengalami henti jantung.',
    category: 'PENTING',
    categoryColor: 'green',
    date: '12 Oktober 2023',
    author: 'Dr. Dian Pratama',
    authorInitial: 'D',
    content: `
      <p class="text-gray-600 mb-6">CPR (Cardiopulmonary Resuscitation) adalah teknik darurat yang dapat menyelamatkan nyawa seseorang yang mengalami henti jantung. Teknik ini melibatkan kombinasi penekanan dada dan pemberian napas buatan untuk mempertahankan aliran darah dan oksigen ke otak dan organ vital lainnya.</p>
      <p class="text-gray-600 mb-6">Ketika seseorang mengalami henti jantung, setiap detik sangat berharga. Tanpa CPR, kerusakan otak permanen dapat terjadi dalam 4-6 menit dan peluang bertahan hidup menurun sekitar 10% setiap menit tanpa CPR. Dengan melakukan CPR segera, Anda dapat meningkatkan peluang korban bertahan hidup hingga dua atau tiga kali lipat.</p>
      <p class="text-gray-600 mb-6">Langkah-langkah dasar CPR mengikuti prinsip C-A-B: Chest compressions (kompresi dada), Airway (jalan napas), dan Breathing (pernapasan). Lakukan 30 kompresi dada dengan kecepatan 100-120 kompresi per menit, buka jalan napas dengan teknik head tilt-chin lift, lalu berikan 2 napas buatan. Ulangi siklus ini hingga bantuan medis datang.</p>
    `
  };

  const articles = [
    {
      id: 'luka-terbuka',
      title: 'Cara Menangani Luka Terbuka dengan Benar',
      excerpt: 'Pelajari langkah-langkah penanganan luka terbuka yang benar untuk mencegah infeksi dan mempercepat proses penyembuhan.',
      category: 'Penanganan Luka',
      categoryColor: 'blue',
      icon: faBandAid,
      bgColor: 'blue-500',
      date: '5 Oktober 2023',
      content: `
        <p class="mb-4">Luka terbuka terjadi ketika kulit robek atau terpotong yang menyebabkan perdarahan. Penanganan yang tepat sangat penting untuk mencegah infeksi dan mempercepat penyembuhan.</p>

        <h3 class="text-xl font-semibold mb-3 mt-5">Langkah-langkah Penanganan Luka Terbuka:</h3>
        <ol class="list-decimal pl-6 mb-4 space-y-2">
            <li>Cuci tangan Anda dengan sabun dan air bersih sebelum menangani luka.</li>
            <li>Hentikan perdarahan dengan menekan area luka menggunakan kain bersih atau kasa steril.</li>
            <li>Bersihkan luka dengan air mengalir dan sabun lembut. Hindari menggunakan alkohol, iodine atau hydrogen peroxide pada luka terbuka.</li>
            <li>Setelah luka bersih, keringkan area sekitar luka (bukan lukanya) dengan menepuk-nepuk lembut menggunakan kain bersih.</li>
            <li>Oleskan salep antibiotik tipis untuk mencegah infeksi.</li>
            <li>Tutup luka dengan perban atau kasa steril dan plester.</li>
            <li>Ganti perban secara berkala untuk menjaga kebersihan luka.</li>
        </ol>

        <h3 class="text-xl font-semibold mb-3 mt-5">Kapan Harus ke Dokter?</h3>
        <p class="mb-4">Segera cari bantuan medis jika:</p>
        <ul class="list-disc pl-6 mb-4 space-y-2">
            <li>Luka sangat dalam atau lebar (lebih dari 1 cm)</li>
            <li>Perdarahan tidak berhenti setelah ditekan selama 15 menit</li>
            <li>Luka disebabkan oleh benda kotor atau berkarat</li>
            <li>Ada benda asing dalam luka</li>
            <li>Terdapat tanda-tanda infeksi: kemerahan yang meluas, bengkak, terasa hangat, nyeri bertambah, atau keluar nanah</li>
            <li>Anda belum mendapatkan vaksin tetanus dalam 5-10 tahun terakhir</li>
        </ul>

        <p class="mb-4">Ingat, perawatan yang tepat pada luka terbuka bukan hanya tentang menghentikan perdarahan, tetapi juga mencegah infeksi dan memastikan penyembuhan optimal.</p>
      `
    },
    {
      id: 'luka-bakar',
      title: 'Penanganan Luka Bakar dari Tingkat Ringan hingga Berat',
      excerpt: 'Ketahui cara menangani berbagai tingkat luka bakar, dari ringan hingga berat, serta kapan harus mencari bantuan medis.',
      category: 'Luka Bakar',
      categoryColor: 'red',
      icon: faBurn,
      bgColor: 'red-500',
      date: '28 September 2023',
      content: `
        <p class="mb-4">Luka bakar merupakan cedera yang dapat terjadi karena paparan panas, bahan kimia, listrik, atau radiasi. Penanganan yang tepat dan cepat sangat penting untuk mengurangi kerusakan jaringan dan mencegah komplikasi.</p>

        <h3 class="text-xl font-semibold mb-3 mt-5">Klasifikasi Luka Bakar:</h3>
        <ul class="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Derajat Pertama:</strong> Hanya mengenai lapisan luar kulit, ditandai dengan kemerahan, nyeri, dan sedikit bengkak.</li>
            <li><strong>Derajat Kedua:</strong> Mengenai lapisan epidermis dan sebagian dermis, ditandai dengan lepuh, sangat nyeri, dan kemerahan.</li>
            <li><strong>Derajat Ketiga:</strong> Mengenai seluruh lapisan kulit hingga jaringan di bawahnya, ditandai dengan warna putih atau hitam, kering, dan sering tidak terasa nyeri karena saraf rusak.</li>
        </ul>

        <h3 class="text-xl font-semibold mb-3 mt-5">Penanganan Luka Bakar:</h3>

        <h4 class="text-lg font-medium mb-2">Luka Bakar Derajat Pertama:</h4>
        <ol class="list-decimal pl-6 mb-4 space-y-2">
            <li>Dinginkan area yang terbakar dengan air mengalir selama 10-15 menit.</li>
            <li>Jangan gunakan es langsung pada kulit yang terbakar.</li>
            <li>Oleskan pelembab atau gel lidah buaya untuk menenangkan kulit.</li>
            <li>Minum obat pereda nyeri seperti parasetamol jika diperlukan.</li>
        </ol>

        <h4 class="text-lg font-medium mb-2">Luka Bakar Derajat Kedua:</h4>
        <ol class="list-decimal pl-6 mb-4 space-y-2">
            <li>Dinginkan luka dengan air mengalir selama 15-20 menit.</li>
            <li>Jangan pecahkan lepuh yang terbentuk.</li>
            <li>Setelah didinginkan, tutup luka dengan perban steril non-lengket.</li>
            <li>Ganti perban setiap 24-48 jam dan jaga agar tetap bersih dan kering.</li>
            <li>Segera cari bantuan medis jika area yang terbakar luas atau di wajah, tangan, kaki, atau area sendi.</li>
        </ol>

        <h4 class="text-lg font-medium mb-2">Luka Bakar Derajat Ketiga:</h4>
        <p class="mb-4">Ini adalah keadaan darurat medis!</p>
        <ol class="list-decimal pl-6 mb-4 space-y-2">
            <li>Segera hubungi layanan gawat darurat.</li>
            <li>Jangan lepaskan pakaian yang menempel pada luka bakar.</li>
            <li>Tutup area dengan kain bersih atau perban steril.</li>
            <li>Posisikan area yang terbakar lebih tinggi dari jantung jika memungkinkan.</li>
            <li>Pastikan korban tetap hangat dan pantau tanda-tanda syok.</li>
        </ol>

        <h3 class="text-xl font-semibold mb-3 mt-5">Hal yang Tidak Boleh Dilakukan:</h3>
        <ul class="list-disc pl-6 mb-4 space-y-2">
            <li>Jangan mengoleskan mentega, minyak, atau pasta gigi pada luka bakar.</li>
            <li>Jangan menggunakan kapas yang bisa menempel pada luka.</li>
            <li>Jangan mencoba melepaskan pakaian yang menempel pada luka bakar.</li>
            <li>Jangan memecahkan lepuh yang terbentuk.</li>
        </ul>
      `
    },
    {
      id: 'patah-tulang',
      title: 'Teknik Immobilisasi untuk Patah Tulang',
      excerpt: 'Pelajari teknik immobilisasi yang tepat untuk menangani patah tulang sementara sebelum mendapat bantuan medis.',
      category: 'Cedera Tulang',
      categoryColor: 'yellow',
      icon: faBone,
      bgColor: 'yellow-500',
      date: '15 September 2023',
      content: `
        <p class="mb-4">Patah tulang atau fraktur terjadi ketika tulang retak atau patah akibat tekanan atau benturan yang kuat. Immobilisasi adalah tindakan pertama yang sangat penting untuk mencegah kerusakan lebih lanjut sebelum mendapat penanganan medis profesional.</p>

        <h3 class="text-xl font-semibold mb-3 mt-5">Tanda dan Gejala Patah Tulang:</h3>
        <ul class="list-disc pl-6 mb-4 space-y-2">
            <li>Nyeri hebat yang bertambah saat digerakkan</li>
            <li>Pembengkakan dan perubahan warna kulit (memar)</li>
            <li>Deformitas atau bentuk tidak normal</li>
            <li>Keterbatasan gerak pada area yang cedera</li>
            <li>Bunyi gemeretak saat area cedera digerakkan</li>
            <li>Pada fraktur terbuka, tulang dapat menonjol keluar dari kulit</li>
        </ul>

        <h3 class="text-xl font-semibold mb-3 mt-5">Prinsip Dasar Immobilisasi:</h3>
        <p class="mb-4">Immobilisasi bertujuan untuk:</p>
        <ul class="list-disc pl-6 mb-4 space-y-2">
            <li>Mencegah pergerakan fragmen tulang yang dapat melukai jaringan sekitar</li>
            <li>Mengurangi nyeri dan pembengkakan</li>
            <li>Mencegah trauma lebih lanjut</li>
            <li>Memudahkan transportasi korban ke fasilitas kesehatan</li>
        </ul>

        <h3 class="text-xl font-semibold mb-3 mt-5">Teknik Immobilisasi untuk Berbagai Jenis Fraktur:</h3>

        <h4 class="text-lg font-medium mb-2">Lengan Atas atau Bawah:</h4>
        <ol class="list-decimal pl-6 mb-4 space-y-2">
            <li>Gunakan bidai kaku (splint) seperti papan kayu, majalah tebal, atau karton tebal.</li>
            <li>Letakkan bidai di sisi lengan yang cedera.</li>
            <li>Ikat bidai menggunakan kain, dasi, atau perban dengan ikatan yang tidak terlalu ketat.</li>
            <li>Pasang gendongan (sling) untuk menopang berat lengan.</li>
        </ol>

        <h4 class="text-lg font-medium mb-2">Kaki atau Pergelangan Kaki:</h4>
        <ol class="list-decimal pl-6 mb-4 space-y-2">
            <li>Gunakan bidai kaku yang cukup panjang untuk melampaui sendi di atas dan di bawah patah tulang.</li>
            <li>Letakkan bantalan empuk di antara kaki untuk kenyamanan.</li>
            <li>Ikat bidai pada beberapa titik di atas dan di bawah area cedera.</li>
            <li>Jika tidak ada bidai, kaki yang cedera dapat diikat dengan kaki yang sehat sebagai penyangga.</li>
        </ol>

        <h4 class="text-lg font-medium mb-2">Tulang Belakang:</h4>
        <p class="mb-4 text-red-600 font-semibold">PERHATIAN: Cedera tulang belakang sangat berbahaya dan memerlukan penanganan khusus!</p>
        <ol class="list-decimal pl-6 mb-4 space-y-2">
            <li>Jangan memindahkan korban kecuali dalam situasi bahaya yang mengancam jiwa.</li>
            <li>Stabilkan kepala dan leher pada posisi netral.</li>
            <li>Tunggu bantuan medis profesional yang memiliki peralatan khusus.</li>
        </ol>

        <h3 class="text-xl font-semibold mb-3 mt-5">Tindakan Tambahan:</h3>
        <ul class="list-disc pl-6 mb-4 space-y-2">
            <li>Kompres dingin untuk mengurangi pembengkakan (20 menit, jangan langsung ke kulit).</li>
            <li>Elevasi area yang cedera jika memungkinkan.</li>
            <li>Pantau tanda-tanda vital korban.</li>
            <li>Cari pertolongan medis segera.</li>
        </ul>
      `
    },
    {
      id: 'tersedak',
      title: 'Heimlich Maneuver: Teknik Penyelamatan untuk Tersedak',
      excerpt: 'Pelajari cara melakukan Heimlich maneuver dengan benar untuk menolong seseorang yang tersedak.',
      category: 'Tersedak',
      categoryColor: 'purple',
      icon: faHeadSideCough,
      bgColor: 'purple-500',
      date: '8 September 2023',
      content: `
        <p class="mb-4">Tersedak terjadi ketika saluran napas terblokir oleh makanan atau benda asing lainnya. Kondisi ini bisa mengancam jiwa jika tidak ditangani dengan cepat. Heimlich maneuver adalah teknik pertolongan pertama yang efektif untuk mengatasi kondisi tersedak.</p>

        <h3 class="text-xl font-semibold mb-3 mt-5">Tanda-tanda Tersedak:</h3>
        <ul class="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Tersedak Ringan:</strong> Korban masih bisa berbicara, batuk kuat, dan bernapas.</li>
            <li><strong>Tersedak Berat:</strong> Korban tidak dapat berbicara, batuk lemah atau tidak dapat batuk, sulit bernapas, wajah kemerahan berubah menjadi kebiruan, dan membuat gerakan panik dengan memegang leher.</li>
        </ul>

        <h3 class="text-xl font-semibold mb-3 mt-5">Penanganan Tersedak:</h3>

        <h4 class="text-lg font-medium mb-2">Untuk Tersedak Ringan:</h4>
        <ol class="list-decimal pl-6 mb-4 space-y-2">
            <li>Dorong korban untuk terus batuk dengan kuat.</li>
            <li>Jangan menepuk punggung atau memberikan minum, biarkan korban mengeluarkan sendiri benda yang menyumbat.</li>
        </ol>

        <h4 class="text-lg font-medium mb-2">Untuk Tersedak Berat (Heimlich Maneuver pada Orang Dewasa/Anak):</h4>
        <ol class="list-decimal pl-6 mb-4 space-y-2">
            <li>Berdiri di belakang korban.</li>
            <li>Lingkarkan tangan Anda di sekitar pinggang korban.</li>
            <li>Kepalkan salah satu tangan dan tempatkan bagian ibu jari kepalan tangan di bagian tengah perut korban, sedikit di atas pusar dan di bawah tulang dada.</li>
            <li>Pegang kepalan tangan dengan tangan yang satunya.</li>
            <li>Tekan ke dalam dan ke atas dengan gerakan cepat dan kuat.</li>
            <li>Ulangi gerakan ini hingga benda yang menyumbat keluar atau korban kehilangan kesadaran.</li>
        </ol>

        <h4 class="text-lg font-medium mb-2">Untuk Diri Sendiri Saat Tersedak:</h4>
        <ol class="list-decimal pl-6 mb-4 space-y-2">
            <li>Kepalkan tangan dan tempatkan di atas pusar.</li>
            <li>Pegang kepalan tangan dengan tangan lainnya.</li>
            <li>Tekan ke dalam dan ke atas dengan gerakan cepat dan kuat.</li>
            <li>Alternatif lain: tekan area perut atas ke benda keras seperti sandaran kursi atau meja.</li>
        </ol>

        <h4 class="text-lg font-medium mb-2">Untuk Bayi (Di Bawah 1 Tahun):</h4>
        <ol class="list-decimal pl-6 mb-4 space-y-2">
            <li>Letakkan bayi tengkurap di atas lengan Anda dengan kepala sedikit lebih rendah dari tubuh.</li>
            <li>Berikan 5 tepukan di punggung antara tulang belikat dengan telapak tangan.</li>
            <li>Jika tidak berhasil, balikkan bayi dengan hati-hati dan berikan 5 penekanan dada dengan dua jari di bagian tengah dada, sedikit di bawah garis puting.</li>
            <li>Ulangi kombinasi 5 tepukan punggung dan 5 penekanan dada hingga benda keluar atau bantuan medis tiba.</li>
        </ol>

        <h3 class="text-xl font-semibold mb-3 mt-5">Kapan Harus Mencari Bantuan Medis:</h3>
        <ul class="list-disc pl-6 mb-4 space-y-2">
            <li>Jika korban kehilangan kesadaran, mulai lakukan CPR dan minta seseorang menghubungi bantuan darurat.</li>
            <li>Meskipun benda berhasil dikeluarkan, periksakan diri ke dokter jika ada nyeri berkepanjangan atau kesulitan menelan.</li>
            <li>Selalu mencari evaluasi medis setelah tersedak parah, terutama untuk anak-anak dan lansia.</li>
        </ul>
      `
    },
    {
      id: 'kotak-p3k',
      title: 'Daftar Alat dan Obat-obatan yang Wajib Jadi Isi Kotak P3K Anda',
      excerpt: 'Ketahui item penting yang harus ada di kotak P3K rumah tangga Anda untuk menghadapi situasi darurat.',
      category: 'Tips P3K',
      categoryColor: 'green',
      icon: faFirstAid,
      bgColor: 'green-500',
      date: '1 September 2023',
      content: `
        <p class="mb-4">Memiliki kotak P3K yang lengkap di rumah atau tempat kerja sangat penting untuk penanganan darurat sebelum mendapat pertolongan medis profesional. Berikut adalah daftar peralatan dan obat-obatan yang sebaiknya ada dalam kotak P3K Anda.</p>

        <h3 class="text-xl font-semibold mb-3 mt-5">Peralatan Dasar:</h3>
        <ul class="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Sarung tangan lateks/nitrile:</strong> Minimal 2-4 pasang untuk perlindungan dari cairan tubuh.</li>
            <li><strong>Gunting:</strong> Untuk memotong perban atau pakaian saat diperlukan.</li>
            <li><strong>Pinset:</strong> Untuk mengambil serpihan atau benda asing kecil.</li>
            <li><strong>Termometer digital:</strong> Untuk mengukur suhu tubuh.</li>
            <li><strong>Penlight/senter kecil:</strong> Untuk memeriksa di area gelap atau untuk pemeriksaan.</li>
            <li><strong>Masker wajah:</strong> Sebagai perlindungan saat memberikan pertolongan.</li>
            <li><strong>Kantong plastik:</strong> Untuk membuang barang yang terkontaminasi.</li>
            <li><strong>Buku catatan kecil dan pulpen:</strong> Untuk mencatat informasi penting seperti waktu cedera atau dosis obat.</li>
        </ul>

        <h3 class="text-xl font-semibold mb-3 mt-5">Material Perawatan Luka:</h3>
        <ul class="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Kasa steril:</strong> Berbagai ukuran untuk menutup luka.</li>
            <li><strong>Perban gulung:</strong> Berbagai ukuran untuk membalut luka.</li>
            <li><strong>Plester/band-aid:</strong> Berbagai ukuran untuk luka kecil.</li>
            <li><strong>Plester roll:</strong> Untuk menempelkan kasa pada luka.</li>
            <li><strong>Kapas:</strong> Untuk membersihkan area sekitar luka (bukan pada luka terbuka).</li>
            <li><strong>Segitiga/mitella:</strong> Untuk menopang cedera tangan atau lengan.</li>
            <li><strong>Perban elastis:</strong> Untuk cedera sendi atau memberi tekanan pada luka.</li>
            <li><strong>Pembalut luka bakar:</strong> Kasa khusus untuk luka bakar.</li>
            <li><strong>Lap alkohol:</strong> Untuk membersihkan peralatan atau kulit sebelum tindakan.</li>
        </ul>

        <h3 class="text-xl font-semibold mb-3 mt-5">Obat-obatan:</h3>
        <ul class="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Antiseptik:</strong> Seperti povidone iodine atau alkohol 70% untuk membersihkan luka.</li>
            <li><strong>Salep antibiotik:</strong> Untuk mencegah infeksi pada luka kecil.</li>
            <li><strong>Obat pereda nyeri:</strong> Paracetamol atau ibuprofen.</li>
            <li><strong>Antihistamin:</strong> Untuk reaksi alergi ringan.</li>
            <li><strong>Obat diare:</strong> Untuk penanganan diare akut.</li>
            <li><strong>Salep luka bakar:</strong> Mengandung lidokain untuk mengurangi nyeri.</li>
            <li><strong>Larutan pembersih luka:</strong> Seperti larutan saline.</li>
            <li><strong>Gel lidah buaya:</strong> Untuk luka bakar ringan.</li>
        </ul>

        <h3 class="text-xl font-semibold mb-3 mt-5">Peralatan Khusus (Sesuai Kebutuhan):</h3>
        <ul class="list-disc pl-6 mb-4 space-y-2">
            <li><strong>CPR mask:</strong> Untuk melakukan resusitasi dengan lebih aman.</li>
            <li><strong>Bidai/splint:</strong> Untuk immobilisasi fraktur.</li>
            <li><strong>Selimut termal:</strong> Untuk mencegah hipotermia.</li>
            <li><strong>Tensimeter:</strong> Untuk mengukur tekanan darah.</li>
            <li><strong>Autoinjector epinephrine:</strong> Jika ada anggota keluarga dengan alergi berat.</li>
        </ul>

        <h3 class="text-xl font-semibold mb-3 mt-5">Tips Perawatan Kotak P3K:</h3>
        <ol class="list-decimal pl-6 mb-4 space-y-2">
            <li>Simpan kotak P3K di tempat yang mudah dijangkau namun aman dari jangkauan anak kecil.</li>
            <li>Periksa tanggal kedaluwarsa obat-obatan secara berkala, minimal 6 bulan sekali.</li>
            <li>Ganti item yang sudah digunakan atau kedaluwarsa.</li>
            <li>Pastikan semua anggota keluarga atau karyawan tahu lokasi kotak P3K.</li>
            <li>Sertakan daftar nomor telepon darurat dalam kotak P3K.</li>
        </ol>
      `
    },
    {
      id: 'cedera-olahraga',
      title: 'Penanganan Cedera Olahraga yang Sering Terjadi',
      excerpt: 'Pelajari cara menangani cedera olahraga yang sering terjadi seperti keseleo, strain otot, dan memar.',
      category: 'Cedera Olahraga',
      categoryColor: 'sky',
      icon: faRunning,
      bgColor: 'sky-500',
      date: '25 Agustus 2023',
      content: `
        <p class="mb-4">Aktivitas olahraga dapat menimbulkan berbagai macam cedera, mulai dari yang ringan hingga serius. Penanganan yang tepat dan cepat dapat mempercepat pemulihan dan mencegah komplikasi.</p>

        <h3 class="text-xl font-semibold mb-3 mt-5">Jenis-jenis Cedera Olahraga yang Umum:</h3>

        <h4 class="text-lg font-medium mb-2">1. Keseleo (Sprain)</h4>
        <p class="mb-2">Keseleo terjadi ketika ligamen (jaringan yang menghubungkan tulang dengan tulang) tertarik atau robek.</p>
        <ul class="list-disc pl-6 mb-4 space-y-1">
            <li><strong>Gejala:</strong> Nyeri, pembengkakan, memar, dan keterbatasan gerak sendi.</li>
            <li><strong>Penanganan:</strong></li>
            <ul class="list-disc pl-6 mb-2 space-y-1">
                <li>Istirahatkan area yang cedera.</li>
                <li>Kompres es selama 20 menit setiap 2-3 jam dalam 48 jam pertama.</li>
                <li>Balut dengan perban elastis (jangan terlalu ketat).</li>
                <li>Tinggikan area cedera di atas level jantung jika memungkinkan.</li>
                <li>Konsultasi ke dokter jika nyeri parah atau tidak membaik dalam 24-48 jam.</li>
            </ul>
        </ul>

        <h4 class="text-lg font-medium mb-2">2. Strain (Cedera Otot/Tendon)</h4>
        <p class="mb-2">Strain terjadi ketika otot atau tendon (jaringan yang menghubungkan otot ke tulang) tertarik atau robek.</p>
        <ul class="list-disc pl-6 mb-4 space-y-1">
            <li><strong>Gejala:</strong> Nyeri, kekakuan otot, pembengkakan, kelemahan, dan kejang otot.</li>
            <li><strong>Penanganan:</strong></li>
            <ul class="list-disc pl-6 mb-2 space-y-1">
                <li>Prinsip RICE (Rest, Ice, Compression, Elevation).</li>
                <li>Hindari aktivitas yang memperparah nyeri.</li>
                <li>Lakukan peregangan ringan setelah fase akut.</li>
                <li>Gunakan pereda nyeri jika diperlukan.</li>
            </ul>
        </ul>

        <h4 class="text-lg font-medium mb-2">3. Memar (Contusion)</h4>
        <p class="mb-2">Memar terjadi akibat benturan yang menyebabkan pembuluh darah kecil pecah di bawah kulit.</p>
        <ul class="list-disc pl-6 mb-4 space-y-1">
            <li><strong>Gejala:</strong> Perubahan warna kulit (merah ke biru, lalu kuning-hijau), nyeri tekan, dan pembengkakan.</li>
            <li><strong>Penanganan:</strong></li>
            <ul class="list-disc pl-6 mb-2 space-y-1">
                <li>Kompres dingin selama 15-20 menit.</li>
                <li>Elevasi area yang cedera.</li>
                <li>Berikan tekanan ringan dengan perban elastis.</li>
                <li>Setelah 48 jam, kompres hangat bisa membantu menyerap memar.</li>
            </ul>
        </ul>

        <h3 class="text-xl font-semibold mb-3 mt-5">Prinsip RICE untuk Cedera Olahraga:</h3>
        <ul class="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Rest (Istirahat):</strong> Hentikan aktivitas dan istirahatkan area yang cedera.</li>
            <li><strong>Ice (Es):</strong> Kompres es selama 15-20 menit setiap 2-3 jam untuk mengurangi pembengkakan dan nyeri.</li>
            <li><strong>Compression (Kompresi):</strong> Balut area cedera dengan perban elastis untuk mengurangi pembengkakan.</li>
            <li><strong>Elevation (Elevasi):</strong> Tinggikan area yang cedera lebih tinggi dari jantung untuk mengurangi pembengkakan.</li>
        </ul>

        <h3 class="text-xl font-semibold mb-3 mt-5">Kapan Harus ke Dokter:</h3>
        <ul class="list-disc pl-6 mb-4 space-y-2">
            <li>Nyeri yang parah dan tidak berkurang dengan istirahat atau obat pereda nyeri.</li>
            <li>Tidak dapat menanggung beban pada anggota tubuh yang cedera.</li>
            <li>Pembengkakan yang signifikan atau cepat.</li>
            <li>Ketidakmampuan menggerakkan sendi.</li>
            <li>Mati rasa atau kesemutan di area cedera.</li>
            <li>Cedera lama yang tidak kunjung membaik.</li>
        </ul>

        <h3 class="text-xl font-semibold mb-3 mt-5">Pencegahan Cedera Olahraga:</h3>
        <ol class="list-decimal pl-6 mb-4 space-y-2">
            <li>Lakukan pemanasan sebelum dan pendinginan setelah berolahraga.</li>
            <li>Tingkatkan intensitas latihan secara bertahap.</li>
            <li>Gunakan teknik yang benar dan peralatan yang sesuai.</li>
            <li>Istirahat cukup antara sesi latihan.</li>
            <li>Minum air yang cukup sebelum, selama, dan setelah berolahraga.</li>
            <li>Dengarkan tubuh Anda dan jangan memaksakan diri jika merasa sakit.</li>
        </ol>
      `
    }
  ];

  // Kategori untuk filter
  const categories = [
    { id: 'semua', name: 'Semua Artikel' },
    { id: 'luka', name: 'Penanganan Luka' },
    { id: 'jantung', name: 'Kesehatan Jantung' },
    { id: 'olahraga', name: 'Cedera Olahraga' },
    { id: 'tips', name: 'Tips P3K' }
  ];

  const openArticle = (article) => {
    setCurrentArticle(article);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <main className="bg-gray-50 min-h-screen flex flex-col">
      {/* Page Header */}
      <section className="hero-pattern text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Artikel P3K</h1>
          <p className="text-lg">Baca artikel informatif tentang penanganan P3K</p>
        </div>
      </section>

      {/* Article Categories */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  activeCategory === category.id
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
            <div className="md:flex">
              <div className="md:w-1/2 bg-green-500 relative">
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <FontAwesomeIcon icon={faHeartbeat} className="text-white text-6xl" />
                </div>
              </div>
              <div className="md:w-1/2 p-6 md:p-8">
                <div className="flex items-center mb-4">
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mr-2">
                    {featuredArticle.category}
                  </span>
                  <span className="text-gray-500 text-sm">{featuredArticle.date}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{featuredArticle.title}</h2>
                <p className="text-gray-600 mb-6">{featuredArticle.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-3 text-white font-bold">
                      {featuredArticle.authorInitial}
                    </div>
                    <span className="text-gray-700">{featuredArticle.author}</span>
                  </div>
                  <button 
                    onClick={() => openArticle(featuredArticle)}
                    className="text-green-600 font-medium hover:text-green-700"
                  >
                    Baca Selengkapnya <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map(article => (
              <div key={article.id} className="article-card bg-white rounded-xl shadow-md overflow-hidden">
                <div className={`h-48 bg-${article.bgColor} relative`}>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <FontAwesomeIcon icon={article.icon} className="text-white text-4xl" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <span className={`bg-${article.categoryColor}-100 text-${article.categoryColor}-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2`}>
                      {article.category}
                    </span>
                    <span className="text-gray-500 text-xs">{article.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                  <button
                    onClick={() => openArticle(article)}
                    className="text-green-600 font-medium hover:text-green-700 text-sm"
                  >
                    Baca Selengkapnya <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex justify-center">
            <nav className="inline-flex rounded-md shadow">
              <button className="py-2 px-4 bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 rounded-l-md">
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button className="py-2 px-4 bg-green-600 border border-green-600 text-white hover:bg-green-700">1</button>
              <button className="py-2 px-4 bg-white border border-gray-300 text-gray-500 hover:bg-gray-50">2</button>
              <button className="py-2 px-4 bg-white border border-gray-300 text-gray-500 hover:bg-gray-50">3</button>
              <button className="py-2 px-4 bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 rounded-r-md">
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </nav>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-10 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Dapatkan Artikel P3K Terbaru</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Berlangganan newsletter kami untuk mendapatkan artikel dan tips P3K terbaru langsung ke email Anda
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Alamat email Anda" 
                className="flex-grow px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="bg-green-600 text-white font-medium px-6 py-2 rounded-full hover:bg-green-700 transition duration-300">
                Berlangganan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-10 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ingin Mempelajari Lebih Lanjut?</h2>
          <p className="text-lg mb-6">Lihat video tutorial dan uji pengetahuan Anda dengan kuis interaktif</p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <Link 
              to="/video" 
              className="bg-white text-green-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-green-50 transition duration-300"
            >
              <FontAwesomeIcon icon={faVideo} className="mr-2" /> Tonton Video
            </Link>
            <Link 
              to="/kuis" 
              className="bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-green-800 transition duration-300"
            >
              <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" /> Mulai Kuis
            </Link>
          </div>
        </div>
      </section>

      {/* Article Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold text-gray-800">{currentArticle?.title}</h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800 focus:outline-none text-xl"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="px-6 py-4">
              <div className="mb-3" dangerouslySetInnerHTML={{ 
                __html: currentArticle?.category ? 
                  `<span class="bg-${currentArticle.categoryColor}-100 text-${currentArticle.categoryColor}-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">${currentArticle.category}</span>` : '' 
              }} />
              <div 
                className="prose max-w-none" 
                dangerouslySetInnerHTML={{ __html: currentArticle?.content }}
              />
            </div>
            
            {/* Modal Footer */}
            <div className="border-t border-gray-200 px-6 py-4 flex justify-between items-center bg-gray-50">
              <div>
                <span className="text-sm text-gray-500">{currentArticle?.date}</span>
              </div>
              <div className="flex space-x-4">
                <button className="text-gray-600 hover:text-gray-800 text-sm">
                  <FontAwesomeIcon icon={faBookmark} className="mr-1" /> Simpan
                </button>
                <button className="text-gray-600 hover:text-gray-800 text-sm">
                  <FontAwesomeIcon icon={faShareSquare} className="mr-1" /> Bagikan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ArtikelPage;