import type { Project } from '~/types'

/**
 * All portfolio projects live here — components must consume this file,
 * never hardcode project content in UI.
 *
 * Image rule: drop real screenshots as WebP into
 * public/images/projects/<slug>/ and keep the first image as the cover.
 * Missing files fall back gracefully to /images/placeholder.svg (see ProjectCard/Gallery).
 */
export const projects: Project[] = [
  {
    slug: 'ecommerce-platform',
    title: 'Multi-Platform E-Commerce System',
    description:
      'Scalable e-commerce backend with secure authentication, product management, and a dynamic cart — synced in real time across web and mobile apps.',
    descriptionId:
      'Backend e-commerce skalabel dengan autentikasi aman, manajemen produk, dan keranjang dinamis — tersinkron real-time di aplikasi web dan mobile.',
    longDescription:
      'Developed a scalable backend using Laravel and MySQL with secure authentication, product CRUD management, and a dynamic shopping cart system. Engineered and tested RESTful APIs using Postman for seamless data sync between database and client apps. Built a companion mobile app using Flutter consuming custom APIs for real-time product browsing and transactions. Integrated React.js for a consistent, responsive experience across web and mobile.',
    longDescriptionId:
      'Mengembangkan backend skalabel dengan Laravel dan MySQL beserta autentikasi aman, manajemen CRUD produk, dan sistem keranjang belanja dinamis. Merancang dan menguji RESTful API dengan Postman untuk sinkronisasi data yang mulus antara database dan aplikasi klien. Membangun aplikasi mobile pendamping dengan Flutter yang mengonsumsi API kustom untuk penjelajahan produk dan transaksi real-time. Mengintegrasikan React.js untuk pengalaman yang konsisten dan responsif di web dan mobile.',
    category: ['Full-Stack', 'Mobile'],
    year: '2025',
    featured: true,
    cover: '/images/projects/ecommerce/cover.webp',
    coverAlt: 'Multi-platform e-commerce system preview',
    images: [
      { src: '/images/projects/ecommerce/cover.webp', alt: 'Multi-platform e-commerce system cover artwork' },
      { src: '/images/projects/ecommerce/dashboard.webp', alt: 'Multi-platform e-commerce system dashboard artwork' }
    ],
    technologies: ['Laravel', 'MySQL', 'Flutter', 'React.js', 'REST API', 'Postman'],
    features: [
      'Secure authentication',
      'Product CRUD management',
      'Dynamic shopping cart',
      'Real-time product browsing',
      'Postman-tested REST APIs',
      'Responsive web & mobile experience'
    ],
    featuresId: [
      'Autentikasi aman',
      'Manajemen CRUD produk',
      'Keranjang belanja dinamis',
      'Penjelajahan produk real-time',
      'REST API yang diuji dengan Postman',
      'Pengalaman web & mobile yang responsif'
    ],
    problem:
      'Businesses need a consistent shopping experience across web and mobile backed by a single reliable backend.',
    problemId:
      'Bisnis membutuhkan pengalaman belanja yang konsisten di web dan mobile dengan satu backend yang andal.',
    solution:
      'Built a scalable Laravel + MySQL backend with secure authentication and REST APIs consumed by both a React.js web client and a Flutter mobile app.',
    solutionId:
      'Membangun backend Laravel + MySQL yang skalabel dengan autentikasi aman dan REST API yang dikonsumsi oleh klien web React.js dan aplikasi mobile Flutter.',
    architecture: [
      'Laravel + MySQL backend',
      'JWT-secured REST API',
      'Postman-tested endpoints',
      'React.js web client',
      'Flutter mobile app'
    ],
    architectureId: [
      'Backend Laravel + MySQL',
      'REST API dengan pengaman JWT',
      'Endpoint yang diuji dengan Postman',
      'Klien web React.js',
      'Aplikasi mobile Flutter'
    ],
    contribution:
      'Developed the backend, designed and tested the REST APIs, built the Flutter mobile app, and integrated React.js for a consistent cross-platform experience.',
    contributionId:
      'Mengembangkan backend, merancang dan menguji REST API, membangun aplikasi mobile Flutter, serta mengintegrasikan React.js untuk pengalaman lintas platform yang konsisten.',
    challenges: ['Keeping product and cart data in sync across web and mobile clients'],
    challengesId: ['Menjaga sinkronisasi data produk dan keranjang di klien web dan mobile'],
    results: ['Real-time product browsing and transactions on both web and mobile'],
    resultsId: ['Penjelajahan produk dan transaksi real-time di web maupun mobile'],
    github: null,
    demo: null
  },
  {
    slug: 'healthlens-ai',
    title: 'HealthLens AI',
    description:
      'A mobile hybrid application designed to help users understand laboratory results through OCR, structured data extraction, AI interpretation, and health visualization.',
    descriptionId:
      'Aplikasi mobile hybrid yang membantu pengguna memahami hasil laboratorium melalui OCR, ekstraksi data terstruktur, interpretasi AI, dan visualisasi kesehatan.',
    longDescription:
      'HealthLens AI turns hard-to-read laboratory documents into structured, understandable health insights. Users capture a lab result with their camera, the app extracts values with OCR, structures them into clean data, and presents AI-assisted interpretation alongside trends and a health dashboard.',
    longDescriptionId:
      'HealthLens AI mengubah dokumen laboratorium yang sulit dibaca menjadi wawasan kesehatan yang terstruktur dan mudah dipahami. Pengguna memotret hasil lab dengan kamera, aplikasi mengekstrak nilai dengan OCR, menyusunnya menjadi data yang rapi, lalu menyajikan interpretasi berbantuan AI beserta tren dan dashboard kesehatan.',
    category: ['AI', 'Mobile', 'Dashboard'],
    year: '2026',
    featured: true,
    cover: '/images/projects/healthlens/cover.webp',
    coverAlt: 'HealthLens AI dashboard preview',
    images: [
      { src: '/images/projects/healthlens/cover.webp', alt: 'HealthLens AI cover artwork' },
      { src: '/images/projects/healthlens/dashboard.webp', alt: 'HealthLens AI dashboard artwork' },
      { src: '/images/projects/healthlens/ocr.webp', alt: 'HealthLens AI OCR scan artwork' },
      { src: '/images/projects/healthlens/ai-analysis.webp', alt: 'HealthLens AI analysis artwork' },
      { src: '/images/projects/healthlens/mobile.webp', alt: 'HealthLens AI mobile app artwork' }
    ],
    technologies: ['React', 'TypeScript', 'Capacitor', 'Tesseract.js', 'OpenRouter', 'Firebase', 'Recharts'],
    features: [
      'Laboratory result OCR',
      'AI interpretation',
      'Structured laboratory data extraction',
      'Health dashboard',
      'Health score',
      'Trend visualization',
      'Medication reminders',
      'PDF export'
    ],
    featuresId: [
      'OCR hasil laboratorium',
      'Interpretasi AI',
      'Ekstraksi data laboratorium terstruktur',
      'Dashboard kesehatan',
      'Skor kesehatan',
      'Visualisasi tren',
      'Pengingat obat',
      'Ekspor PDF'
    ],
    problem:
      'Laboratory results can be difficult for non-technical users to understand when presented only as raw medical values.',
    problemId:
      'Hasil laboratorium sulit dipahami pengguna awam jika hanya disajikan sebagai angka medis mentah.',
    solution:
      'Convert laboratory documents into structured data using OCR and provide AI-assisted interpretation through a mobile-friendly dashboard.',
    solutionId:
      'Mengubah dokumen laboratorium menjadi data terstruktur dengan OCR dan menyajikan interpretasi berbantuan AI melalui dashboard yang ramah mobile.',
    architecture: [
      'Image or camera input',
      'OCR processing',
      'Structured data extraction',
      'AI interpretation',
      'Firebase storage',
      'Dashboard visualization'
    ],
    architectureId: [
      'Input gambar atau kamera',
      'Pemrosesan OCR',
      'Ekstraksi data terstruktur',
      'Interpretasi AI',
      'Penyimpanan Firebase',
      'Visualisasi dashboard'
    ],
    contribution:
      'Developed the mobile hybrid application, implemented OCR processing, integrated AI services, handled structured laboratory data, and developed dashboard visualization.',
    contributionId:
      'Mengembangkan aplikasi mobile hybrid, mengimplementasikan pemrosesan OCR, mengintegrasikan layanan AI, mengelola data laboratorium terstruktur, serta membangun visualisasi dashboard.',
    challenges: [
      'Varying photo quality of laboratory documents affecting OCR accuracy',
      'Structuring inconsistent lab formats into clean, comparable data'
    ],
    challengesId: [
      'Kualitas foto dokumen laboratorium yang bervariasi memengaruhi akurasi OCR',
      'Menyeragamkan format lab yang tidak konsisten menjadi data yang rapi dan sebanding'
    ],
    results: [
      'Usable mobile flow from photo capture to interpreted result',
      'Dashboard presenting trends in an accessible visual form'
    ],
    resultsId: [
      'Alur mobile yang usable dari pengambilan foto hingga hasil terinterpretasi',
      'Dashboard yang menyajikan tren dalam bentuk visual yang mudah dipahami'
    ],
    github: null,
    demo: null
  },
  {
    slug: 'tjsl-dashboard',
    title: 'PUMK / TJSL Dashboard',
    description:
      'A dashboard application for managing partner data, importing Excel data, monitoring realization, outstanding values, and reporting.',
    descriptionId:
      'Aplikasi dashboard untuk mengelola data mitra, mengimpor data Excel, memantau realisasi, nilai outstanding, dan pelaporan.',
    longDescription:
      'A dashboard for managing partner (mitra) data with Excel import, realization monitoring, outstanding tracking, filtering, and reporting views.',
    longDescriptionId:
      'Dashboard untuk mengelola data mitra dengan impor Excel, pemantauan realisasi, pelacakan outstanding, filter, dan tampilan laporan.',
    category: ['Full-Stack', 'Dashboard'],
    year: '2026',
    featured: true,
    cover: '/images/projects/tjsl/cover.webp',
    coverAlt: 'PUMK TJSL dashboard preview',
    images: [
      { src: '/images/projects/tjsl/cover.webp', alt: 'PUMK TJSL dashboard cover artwork' },
      { src: '/images/projects/tjsl/dashboard.webp', alt: 'PUMK TJSL dashboard artwork' },
      { src: '/images/projects/tjsl/table.webp', alt: 'PUMK TJSL data table artwork' },
      { src: '/images/projects/tjsl/report.webp', alt: 'PUMK TJSL report artwork' }
    ],
    technologies: ['Python', 'Flask', 'MySQL', 'Tailwind CSS'],
    features: [
      'Excel import',
      'Data management',
      'Reporting',
      'Dashboard visualization',
      'Filtering',
      'Data monitoring'
    ],
    featuresId: [
      'Impor Excel',
      'Manajemen data',
      'Pelaporan',
      'Visualisasi dashboard',
      'Filter',
      'Pemantauan data'
    ],
    problem: 'Partner and realization data was scattered across spreadsheets and hard to monitor.',
    problemId: 'Data mitra dan realisasi tersebar di banyak spreadsheet sehingga sulit dipantau.',
    solution: 'Centralize partner data with Excel import, database-backed monitoring, and report views.',
    solutionId: 'Menyentralkan data mitra dengan impor Excel, pemantauan berbasis database, dan tampilan laporan.',
    architecture: ['Excel upload', 'Flask backend processing', 'MySQL storage', 'Dashboard rendering'],
    architectureId: ['Unggah Excel', 'Pemrosesan backend Flask', 'Penyimpanan MySQL', 'Render dashboard'],
    contribution:
      'Developed the dashboard, backend logic, database integration, data processing, and reporting functionality.',
    contributionId:
      'Mengembangkan dashboard, logika backend, integrasi database, pemrosesan data, dan fungsi pelaporan.',
    challenges: ['Normalizing inconsistent Excel formats from different sources'],
    challengesId: ['Menyeragamkan format Excel yang tidak konsisten dari berbagai sumber'],
    results: ['Centralized view of realization and outstanding values with exportable reports'],
    resultsId: ['Tampilan tersentralisasi untuk realisasi dan nilai outstanding beserta laporan yang dapat diekspor'],
    github: null,
    demo: null
  },
  {
    slug: 'gudang-pro',
    title: 'Gudang Pro',
    description:
      'Inventory and warehouse management application for managing products, stock, and CRUD operations.',
    descriptionId:
      'Aplikasi manajemen inventaris dan gudang untuk mengelola produk, stok, dan operasi CRUD.',
    longDescription:
      'Gudang Pro is an inventory and warehouse management application covering authentication, product and stock management, and API-driven frontend clients.',
    longDescriptionId:
      'Gudang Pro adalah aplikasi manajemen inventaris dan gudang yang mencakup autentikasi, manajemen produk dan stok, serta klien frontend yang digerakkan oleh API.',
    category: ['Full-Stack', 'Mobile'],
    year: '2026',
    featured: true,
    cover: '/images/projects/gudang-pro/cover.webp',
    coverAlt: 'Gudang Pro inventory preview',
    images: [
      { src: '/images/projects/gudang-pro/cover.webp', alt: 'Gudang Pro cover artwork' },
      { src: '/images/projects/gudang-pro/dashboard.webp', alt: 'Gudang Pro dashboard artwork' },
      { src: '/images/projects/gudang-pro/inventory.webp', alt: 'Gudang Pro inventory artwork' },
      { src: '/images/projects/gudang-pro/mobile.webp', alt: 'Gudang Pro mobile app artwork' }
    ],
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'Flutter', 'React'],
    features: ['Authentication', 'Product management', 'Inventory management', 'CRUD operations', 'API integration'],
    featuresId: ['Autentikasi', 'Manajemen produk', 'Manajemen inventaris', 'Operasi CRUD', 'Integrasi API'],
    problem: 'Small warehouses need a simple way to track products and stock levels.',
    problemId: 'Gudang kecil membutuhkan cara sederhana untuk melacak produk dan level stok.',
    solution: 'Provide a JWT-secured REST API with web and mobile clients for product and stock CRUD.',
    solutionId: 'Menyediakan REST API yang diamankan JWT dengan klien web dan mobile untuk CRUD produk dan stok.',
    architecture: ['REST API (Express + MongoDB)', 'JWT authentication', 'React web client', 'Flutter mobile client'],
    architectureId: ['REST API (Express + MongoDB)', 'Autentikasi JWT', 'Klien web React', 'Klien mobile Flutter'],
    contribution:
      'Developed the application architecture, API integration, authentication, inventory functionality, and frontend components.',
    contributionId:
      'Mengembangkan arsitektur aplikasi, integrasi API, autentikasi, fungsi inventaris, dan komponen frontend.',
    challenges: ['Keeping stock counts consistent across concurrent updates'],
    challengesId: ['Menjaga konsistensi jumlah stok pada pembaruan yang bersamaan'],
    results: ['Working inventory flow from authentication to product and stock management'],
    resultsId: ['Alur inventaris yang berjalan dari autentikasi hingga manajemen produk dan stok'],
    github: null,
    demo: null
  },
  {
    slug: 'kineticview-ai',
    title: 'KineticView AI',
    description: 'An AI-powered computer vision project focused on visual analysis and object detection.',
    descriptionId: 'Proyek computer vision berbasis AI yang fokus pada analisis visual dan deteksi objek.',
    longDescription:
      'KineticView AI is a computer vision experiment focused on visual analysis and object detection with a monitoring dashboard.',
    longDescriptionId:
      'KineticView AI adalah eksperimen computer vision yang fokus pada analisis visual dan deteksi objek dengan dashboard pemantauan.',
    category: ['AI'],
    year: '2026',
    featured: true,
    cover: '/images/projects/kineticview/cover.webp',
    coverAlt: 'KineticView AI detection preview',
    images: [
      { src: '/images/projects/kineticview/cover.webp', alt: 'KineticView AI cover artwork' },
      { src: '/images/projects/kineticview/detection.webp', alt: 'KineticView AI object detection artwork' },
      { src: '/images/projects/kineticview/dashboard.webp', alt: 'KineticView AI dashboard artwork' }
    ],
    technologies: ['Computer Vision', 'Object Detection', 'AI'],
    features: ['Image analysis', 'Object detection', 'Visual monitoring'],
    featuresId: ['Analisis gambar', 'Deteksi objek', 'Pemantauan visual'],
    problem: 'Manual visual monitoring is slow and error-prone.',
    problemId: 'Pemantauan visual manual lambat dan rawan kesalahan.',
    solution: 'Apply object detection to automate visual analysis and surface results in a dashboard.',
    solutionId: 'Menerapkan deteksi objek untuk mengotomatiskan analisis visual dan menampilkan hasilnya di dashboard.',
    architecture: ['Image input', 'Detection model', 'Result aggregation', 'Dashboard'],
    architectureId: ['Input gambar', 'Model deteksi', 'Agregasi hasil', 'Dashboard'],
    contribution: 'Developed AI-related functionality and integrated visual analysis capabilities.',
    contributionId: 'Mengembangkan fungsi terkait AI dan mengintegrasikan kemampuan analisis visual.',
    challenges: ['Balancing detection accuracy with inference performance'],
    challengesId: ['Menyeimbangkan akurasi deteksi dengan performa inferensi'],
    results: ['Functional detection-to-dashboard pipeline'],
    resultsId: ['Pipeline deteksi-ke-dashboard yang fungsional'],
    github: null,
    demo: null
  }
]

export const projectCategories = ['All', 'Full-Stack', 'Frontend', 'Backend', 'Mobile', 'AI', 'Dashboard'] as const
