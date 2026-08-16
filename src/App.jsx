import React, { useState, useEffect } from 'react';

const initialData = {
  name: "Mustafa Ablak",
  role: "Computer Engineering Student & Full-Stack Developer",
  summary: "Hasan Kalyoncu Üniversitesi Bilgisayar Mühendisliği öğrencisiyim. Modern web mimarileri, backend sistemleri, yapay zeka entegrasyonları ve mobil uygulama geliştirme alanlarında uçtan uca çözümler üretiyorum.",
  aboutExtended: {
    education: "Hasan Kalyoncu Üniversitesi — Bilgisayar Mühendisliği (Lisans)",
    experience: "Full-Stack Web & Mobile geliştirme, mikroservis mimarileri ve yapay zeka entegrasyonları üzerinde uygulamalı proje deneyimi.",
    focus: "C# / .NET Core Web API, Flutter, FastAPI, Docker, Python ve Modern React ekosistemi üzerinde kurumsal, ölçeklenebilir ve temiz mimarili projeler geliştirmeye odaklanıyorum.",
    goals: "Büyük ölçekli veri akışları ve yapay zeka tabanlı servisleri modern mühendislik standartlarıyla hayata geçirmek."
  },
  skills: [
    { name: "React", category: "Frontend", level: "Orta Düzey" },
    { name: "Flutter", category: "Mobile", level: "İleri Düzey" },
    { name: ".NET Core", category: "Backend", level: "İleri Düzey" },
    { name: "C#", category: "Backend", level: "İleri Düzey" },
    { name: "FastAPI", category: "Backend & AI", level: "Başlangıç / Orta" },
    { name: "Python", category: "Backend & AI", level: "İleri Düzey" },
    { name: "MS SQL", category: "Database", level: "Orta Düzey" },
    { name: "Docker", category: "DevOps", level: "Başlangıç Düzeyi" },
    { name: "JavaScript", category: "Frontend", level: "Orta Düzey" },
    { name: "Git & GitHub", category: "Version Control", level: "İleri Düzey" }
  ],
  projects: [
    {
      id: 1,
      title: "SmartCut — Randevu ve İşletme Yönetimi",
      desc: "Flutter ve .NET Core Web API mimarisiyle geliştirilmiş, salonlar ve randevu odaklı işletmeler için tam kapsamlı yönetim platformu.",
      tags: ["Flutter", ".NET Core", "MS SQL", "REST API"],
      link: "https://github.com/mustafablak/SmartCut-Appointment-App"
    },
    {
      id: 2,
      title: "AI Document Intelligence & OCR",
      desc: "FastAPI ve Google Gemini AI entegrasyonlu, makbuz ve faturalardan anlık yapılandırılmış JSON verisi çıkaran mikroservis.",
      tags: ["FastAPI", "Python", "Gemini AI", "Docker"],
      link: "https://github.com/mustafablak/gemini-ocr-fastapi"
    },
    {
      id: 3,
      title: "Pusula — AI Life Coach & Habit Tracker",
      desc: "Groq ve Llama 3.3 destekli, kişiselleştirilmiş alışkanlık takibi ve verimlilik asistanı sunan mobil uygulama.",
      tags: ["Flutter", "Dart", "Groq", "Llama 3.3"],
      link: "https://github.com/mustafablak/pusula-ai-life-coach-app"
    }
  ]
};

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('site_theme') || 'dark');
  const [activeTab, setActiveTab] = useState('home');
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('portfolio_data_v9');
    return saved ? JSON.parse(saved) : initialData;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newLink, setNewLink] = useState('');

  const isDark = theme === 'dark';

  useEffect(() => {
    localStorage.setItem('site_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('portfolio_data_v9', JSON.stringify(data));
  }, [data]);

  const handleAdminAccess = () => {
    if (isAdminAuthenticated) {
      setActiveTab('admin');
    } else {
      const pass = prompt('Yönetici Şifresi:');
      if (pass === '355400') {
        setIsAdminAuthenticated(true);
        setActiveTab('admin');
      } else if (pass !== null) {
        alert('Hatalı şifre!');
      }
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setActiveTab('home');
  };

  const addProject = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newProj = {
      id: Date.now(),
      title: newTitle,
      desc: newDesc,
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
      link: newLink || '#'
    };
    setData({ ...data, projects: [newProj, ...data.projects] });
    setNewTitle('');
    setNewDesc('');
    setNewTags('');
    setNewLink('');
    setActiveTab('projects');
  };

  const deleteProject = (id) => {
    if (confirm('Bu projeyi silmek istediğinize emin misiniz?')) {
      setData({ ...data, projects: data.projects.filter(p => p.id !== id) });
    }
  };

  const glassPanelStyle = {
    background: isDark ? 'rgba(20, 24, 34, 0.45)' : 'rgba(255, 255, 255, 0.55)',
    backdropFilter: 'blur(40px) saturate(180%)',
    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.6)'}`,
    boxShadow: isDark ? '0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)' : '0 30px 60px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
    borderRadius: '32px'
  };

  const glassNavStyle = {
    ...glassPanelStyle,
    background: isDark ? 'rgba(15, 18, 25, 0.65)' : 'rgba(255, 255, 255, 0.75)',
    borderRadius: '100px',
    padding: '10px 20px',
    boxShadow: isDark ? '0 20px 40px rgba(0,0,0,0.5)' : '0 20px 40px rgba(0,0,0,0.08)',
  };

  const colors = {
    titleColor: isDark ? '#ffffff' : '#111827',
    textMain: isDark ? '#f8fafc' : '#1f2937',
    textMuted: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
    accent: '#38bdf8',
    primary: '#0284c7'
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', overflowX: 'hidden' }}>
      
      <video autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', objectFit: 'cover', zIndex: -2, pointerEvents: 'none' }}>
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, backgroundColor: isDark ? 'rgba(0, 0, 0, 0.45)' : 'rgba(255, 255, 255, 0.1)', pointerEvents: 'none', transition: 'background-color 0.5s ease' }} />

      <div className="responsive-nav-container" style={{ position: 'sticky', top: 16, zIndex: 100, width: '100%', padding: '0 16px', display: 'flex', justifyContent: 'center' }}>
        <header className="responsive-nav" style={{ width: '100%', maxWidth: '1000px', ...glassNavStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          
          <div onClick={() => setActiveTab('home')} className="action-btn-hover" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: colors.accent, boxShadow: `0 0 14px ${colors.accent}` }}></span>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: colors.titleColor, letterSpacing: '-0.5px' }}>
              Mustafa<span style={{ color: colors.accent }}>.dev</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto', maxWidth: '100%' }} className="hide-scrollbar">
            <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
              {[
                { id: 'home', label: 'Ana Sayfa' },
                { id: 'about', label: 'Hakkımda' },
                { id: 'skills', label: 'Yetenekler' },
                { id: 'projects', label: 'Projeler' },
                { id: 'contact', label: 'İletişim' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="action-btn-hover"
                  style={{
                    background: activeTab === tab.id ? (isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.08)') : 'transparent',
                    color: activeTab === tab.id ? colors.titleColor : colors.textMuted,
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '100px',
                    cursor: 'pointer',
                    fontWeight: activeTab === tab.id ? 700 : 500,
                    fontSize: '0.85rem',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="action-btn-hover"
              style={{ flexShrink: 0, background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, color: colors.titleColor, padding: '6px 12px', borderRadius: '100px', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', whiteSpace: 'nowrap' }}
            >
              {isDark ? '☀️ Light' : '🌙 Dark'}
            </button>

            {isAdminAuthenticated && (
              <button onClick={handleAdminLogout} className="action-btn-hover" style={{ flexShrink: 0, background: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '100px', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem' }}>
                Çıkış
              </button>
            )}
          </div>
        </header>
      </div>

      <main style={{ flex: 1, width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '32px 16px 60px', position: 'relative', zIndex: 10 }}>

        {activeTab === 'home' && (
          <div key="home" className="tab-content-animate" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="responsive-panel" style={{ ...glassPanelStyle, padding: '64px', maxWidth: '900px', width: '100%' }}>
              
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '100px', background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', border: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`, color: colors.titleColor, fontSize: '0.85rem', fontWeight: 600, marginBottom: '24px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }}></span>
                Çalışmak İçin Uygun
              </div>

              <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', fontWeight: 800, color: colors.titleColor, letterSpacing: '-1px', lineHeight: 1.1, margin: '0 0 14px' }}>
                {data.name}
              </h1>

              <h2 style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)', color: isDark ? '#60a5fa' : '#2563eb', fontWeight: 600, margin: '0 0 20px', letterSpacing: '-0.5px' }}>
                {data.role}
              </h2>

              <p style={{ color: colors.textMuted, fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', lineHeight: '1.7', margin: '0 0 36px', fontWeight: 500, maxWidth: '750px' }}>
                {data.summary}
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button onClick={() => setActiveTab('projects')} className="action-btn-hover" style={{ background: colors.titleColor, color: isDark ? '#000' : '#fff', border: 'none', padding: '14px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                  Projelerimi İncele
                </button>
                <a href="https://github.com/mustafablak" target="_blank" rel="noreferrer" className="action-btn-hover" style={{ background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, color: colors.titleColor, padding: '14px 28px', borderRadius: '100px', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center' }}>
                  GitHub Profili ↗
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div key="about" className="tab-content-animate" style={{ width: '100%' }}>
            <div className="responsive-panel" style={{ ...glassPanelStyle, padding: '56px' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: colors.titleColor, marginBottom: '12px', letterSpacing: '-1px' }}>Hakkımda</h2>
              <p style={{ color: colors.textMuted, fontSize: '1.1rem', marginBottom: '36px', fontWeight: 500 }}>Eğitim hayatım, vizyonum ve odaklandığım mühendislik alanları.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {[
                  { title: '🎓 Eğitim Bilgileri', desc: data.aboutExtended.education },
                  { title: '⚙️ Odaklandığım Alanlar', desc: data.aboutExtended.focus },
                  { title: '🚀 Vizyon ve Hedefler', desc: data.aboutExtended.goals },
                  { title: '💼 Deneyim & Pratik', desc: data.aboutExtended.experience }
                ].map((card, i) => (
                  <div key={i} className="card-hover" style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.4)', border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)'}`, padding: '24px', borderRadius: '20px' }}>
                    <h3 style={{ color: colors.titleColor, fontSize: '1.15rem', fontWeight: 700, margin: '0 0 10px' }}>{card.title}</h3>
                    <p style={{ color: colors.textMuted, lineHeight: '1.6', margin: 0, fontSize: '0.95rem' }}>{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div key="skills" className="tab-content-animate" style={{ width: '100%' }}>
            <div className="responsive-panel" style={{ ...glassPanelStyle, padding: '56px' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: colors.titleColor, marginBottom: '12px', letterSpacing: '-1px' }}>Yetenekler & Teknolojiler</h2>
              <p style={{ color: colors.textMuted, fontSize: '1.1rem', marginBottom: '36px', fontWeight: 500 }}>Projelerimde aktif olarak kullandığım diller, framework'ler ve veri tabanı mimarileri.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '14px' }}>
                {data.skills.map((skill, idx) => (
                  <div key={idx} className="card-hover" style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.4)', border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)'}`, padding: '18px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: colors.titleColor }}>{skill.name}</span>
                    <span style={{ fontSize: '0.85rem', color: isDark ? '#60a5fa' : '#2563eb', fontWeight: 600 }}>{skill.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div key="projects" className="tab-content-animate" style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: colors.titleColor, letterSpacing: '-1px' }}>Projeler</h2>
              {isAdminAuthenticated && (
                <button onClick={() => setActiveTab('admin')} className="action-btn-hover" style={{ background: colors.titleColor, color: isDark ? '#000' : '#fff', border: 'none', padding: '10px 20px', borderRadius: '100px', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}>
                  + Yeni Proje
                </button>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '24px' }}>
              {data.projects.map(proj => (
                <div key={proj.id} className="card-hover responsive-panel" style={{ ...glassPanelStyle, padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: colors.titleColor, margin: '0 0 12px' }}>{proj.title}</h3>
                    <p style={{ color: colors.textMuted, fontSize: '1rem', lineHeight: '1.6', margin: '0 0 24px' }}>{proj.desc}</p>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                      {proj.tags.map((tag, i) => (
                        <span key={i} style={{ background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)', color: colors.titleColor, padding: '5px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600 }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <a href={proj.link} target="_blank" rel="noreferrer" style={{ color: isDark ? '#60a5fa' : '#2563eb', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>
                      GitHub'da İncele →
                    </a>
                    {isAdminAuthenticated && (
                      <button onClick={() => deleteProject(proj.id)} className="action-btn-hover" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: 'none', padding: '6px 14px', borderRadius: '100px', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem' }}>
                        Sil
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div key="contact" className="tab-content-animate" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div className="responsive-panel" style={{ ...glassPanelStyle, padding: '56px', maxWidth: '700px', width: '100%', textAlign: 'center' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: colors.titleColor, marginBottom: '16px', letterSpacing: '-1px' }}>Birlikte Çalışalım</h2>
              <p style={{ color: colors.textMuted, fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '36px' }}>
                Projeler, iş fırsatları veya teknik iş birlikleri için aşağıdaki kanallardan dilediğiniz zaman ulaşabilirsiniz.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
                <a href="mailto:mustafablak01@gmail.com" className="card-hover" style={{ background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, color: colors.titleColor, padding: '16px 24px', borderRadius: '20px', textDecoration: 'none', fontWeight: 700, fontSize: '1rem', width: '100%' }}>
                  ✉️ mustafablak01@gmail.com
                </a>
                <a href="https://www.linkedin.com/in/mustafa-ablak-565173299/" target="_blank" rel="noreferrer" className="card-hover" style={{ background: '#0a66c2', color: '#ffffff', padding: '16px 24px', borderRadius: '20px', textDecoration: 'none', fontWeight: 700, fontSize: '1rem', width: '100%' }}>
                  💼 LinkedIn Profilim
                </a>
                <a href="https://github.com/mustafablak" target="_blank" rel="noreferrer" className="card-hover" style={{ background: colors.titleColor, color: isDark ? '#000' : '#fff', padding: '16px 24px', borderRadius: '20px', textDecoration: 'none', fontWeight: 700, fontSize: '1rem', width: '100%' }}>
                  🐙 GitHub Hesabım
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'admin' && isAdminAuthenticated && (
          <div key="admin" className="tab-content-animate" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div className="responsive-panel" style={{ ...glassPanelStyle, padding: '48px', maxWidth: '650px', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: colors.titleColor }}>Proje Ekle</h2>
                <button onClick={() => setActiveTab('projects')} className="action-btn-hover" style={{ background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', color: colors.titleColor, border: 'none', padding: '8px 16px', borderRadius: '100px', cursor: 'pointer', fontWeight: 700 }}>
                  Kapat
                </button>
              </div>

              <form onSubmit={addProject} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input placeholder="Proje Başlığı" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required style={{ width: '100%', padding: '14px 18px', borderRadius: '16px', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)', color: colors.titleColor, fontSize: '1rem', outline: 'none' }} />
                <textarea placeholder="Proje Açıklaması" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} rows="3" required style={{ width: '100%', padding: '14px 18px', borderRadius: '16px', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)', color: colors.titleColor, fontSize: '1rem', outline: 'none', resize: 'none' }} />
                <input placeholder="Etiketler (Örn: React, C#)" value={newTags} onChange={(e) => setNewTags(e.target.value)} required style={{ width: '100%', padding: '14px 18px', borderRadius: '16px', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)', color: colors.titleColor, fontSize: '1rem', outline: 'none' }} />
                <input placeholder="GitHub Linki" value={newLink} onChange={(e) => setNewLink(e.target.value)} style={{ width: '100%', padding: '14px 18px', borderRadius: '16px', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)', color: colors.titleColor, fontSize: '1rem', outline: 'none' }} />
                
                <button type="submit" className="action-btn-hover" style={{ width: '100%', padding: '14px', background: colors.titleColor, color: isDark ? '#000' : '#fff', border: 'none', borderRadius: '100px', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', marginTop: '8px' }}>
                  Kaydet & Yayınla
                </button>
              </form>
            </div>
          </div>
        )}

      </main>

      <footer style={{ width: '100%', padding: '0 16px 20px', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 10, marginTop: 'auto' }}>
        <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', fontSize: '0.8rem', fontWeight: 500 }}>
            © {new Date().getFullYear()} {data.name}
          </span>
          <span onClick={handleAdminAccess} style={{ cursor: 'pointer', color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', fontSize: '0.8rem', fontWeight: 600 }}>
            🔒 {isAdminAuthenticated ? 'Yönetici' : 'Yönetim'}
          </span>
        </div>
      </footer>

    </div>
  );
}