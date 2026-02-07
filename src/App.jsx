import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, Info, ChevronRight, Settings, Monitor, Moon, Sun, Globe, WifiOff } from 'lucide-react';

// --- CONFIGURARE SEMESTRU ---
// Data de referință pentru începutul semestrului.
// Folosim data din API pentru a calcula distanța față de acest punct.
const SEMESTER_START_DATE = new Date('2025-02-17T00:00:00'); 

// --- DATA ---
const SCHEDULE_DATA = [
  { day: 'Luni', time: '07:30', duration: 90, subject: null }, 
  { day: 'Marti', time: '07:30', duration: 90, subject: 'Statistică', type: 'Curs', prof: 'Prof. ROMAN Monica Mihaela', room: '2104', parity: 'all' },
  { day: 'Marti', time: '09:00', duration: 90, subject: 'Introducere în contabilitate', type: 'Seminar', prof: 'Prof. IONAȘCU Mihaela', room: '2704', parity: 'even' },
  { day: 'Marti', time: '10:30', duration: 90, subject: 'Sport', type: 'Seminar', prof: 'Prof. POP CRISTIANA-LUCREȚIA', room: '6201B', parity: 'all' },
  { day: 'Miercuri', time: '12:00', duration: 90, subject: 'Limba Engleză', type: 'Seminar', prof: 'Prof. CONDRUZ-BĂCESCU', room: '2608', parity: 'all' },
  { day: 'Miercuri', time: '13:30', duration: 90, subject: 'Statistică', type: 'Seminar', prof: 'Prof. ROMAN Monica Mihaela', room: '2214', parity: 'all' },
  { day: 'Miercuri', time: '15:00', duration: 90, subject: 'Bazele tehnologiei informației', type: 'Curs', prof: 'Prof. ZOTA Razvan', room: '2104', parity: 'all' },
  { day: 'Miercuri', time: '16:30', duration: 90, subject: 'Algebră', type: 'Curs', prof: 'Prof. Mitroi Symeonidis Flavia Corina', room: '2201', parity: 'all' },
  { day: 'Joi', time: '13:30', duration: 90, subject: 'Bazele tehnologiei informației', type: 'Seminar', prof: 'Prof. CLIM ANTONIO', room: '2305', parity: 'odd' },
  { day: 'Joi', time: '15:00', duration: 90, subject: 'Algebră', type: 'Seminar', prof: 'Prof. Mitroi Symeonidis Flavia Corina', room: '2303', parity: 'odd' },
  { day: 'Joi', time: '15:00', duration: 90, subject: 'Economie', type: 'Seminar', prof: 'Prof. MANOLE Alina Magdalena', room: '2211', parity: 'even' },
  { day: 'Joi', time: '16:30', duration: 90, subject: 'Introducere în contabilitate', type: 'Curs', prof: 'Prof. IONAȘCU Mihaela', room: '2104', parity: 'all' },
  { day: 'Vineri', time: '13:30', duration: 90, subject: 'Economie', type: 'Curs', prof: 'Prof. MOSORA Liviu - Cosmin', room: '0601', parity: 'all' },
  { day: 'Luni', time: '10:30', duration: 90, subject: 'Bazele programării calculatoarelor', type: 'Curs', prof: 'Prof. POCATILU Lorena', room: 'B102', parity: 'all' },
  { day: 'Luni', time: '12:00', duration: 90, subject: 'Bazele cercetărilor operaționale', type: 'Seminar', prof: 'Prof. GRAMATOVICI Sorina', room: '2215', parity: 'all' },
  { day: 'Luni', time: '13:30', duration: 90, subject: 'Bazele programării calculatoarelor', type: 'Seminar', prof: 'Prof. POCATILU Lorena', room: '2320', parity: 'all' },
  { day: 'Luni', time: '15:00', duration: 90, subject: 'Bazele cercetărilor operaționale', type: 'Curs', prof: 'Prof. GRAMATOVICI Sorina', room: '2102', parity: 'all' },
];

const TIME_SLOTS = ['07:30', '09:00', '10:30', '12:00', '13:30', '15:00', '16:30', '18:00'];
const DAYS = ['Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri'];

// --- THEMES CONFIG ---
const THEMES = {
  light: {
    name: 'Light',
    icon: Sun,
    classes: {
      bg: 'bg-gray-100',
      header: 'bg-white border-b border-gray-200',
      textMain: 'text-gray-800',
      textSec: 'text-gray-500',
      card: 'bg-white border-gray-100 shadow-sm',
      cardBorder: 'border-l-4',
      badgeCurs: 'bg-blue-700 text-white',
      badgeSem: 'bg-green-600 text-white',
      accentText: 'text-blue-900',
      gridHeader: 'bg-blue-900 text-white',
      gridSubHeader: 'bg-blue-800 text-white',
      gridCell: 'bg-white hover:bg-gray-50',
      gridLine: 'divide-gray-200',
      border: 'border-gray-200',
      highlightBox: 'bg-blue-50 border-blue-100',
      activeTab: 'bg-blue-800 text-white',
      inactiveTab: 'bg-gray-200 text-gray-600',
      buttonSecondary: 'bg-gray-200 hover:bg-gray-300 text-gray-700',
      dropdownBg: 'bg-white border border-gray-200 shadow-xl',
      dropdownItemActive: 'bg-blue-600 text-white font-bold',
      dropdownItemInactive: 'text-gray-700 hover:bg-gray-100 bg-transparent',
      dropdownDivider: 'border-gray-200',
      dropdownLabel: 'text-gray-400',
      sectionHeaderBg: 'bg-gray-50 border-gray-100',
      weekInfoOdd: 'bg-blue-100 text-blue-800 border-blue-200',
      weekInfoEven: 'bg-orange-100 text-orange-800 border-orange-200',
      font: 'font-sans'
    }
  },
  dark: {
    name: 'Dark',
    icon: Moon,
    classes: {
      bg: 'bg-slate-950',
      header: 'bg-slate-900 border-b border-slate-800',
      textMain: 'text-slate-100',
      textSec: 'text-slate-400',
      card: 'bg-slate-900 border-slate-800 shadow-lg',
      cardBorder: 'border-l-4',
      badgeCurs: 'bg-indigo-600 text-white',
      badgeSem: 'bg-emerald-700 text-white',
      accentText: 'text-indigo-300',
      gridHeader: 'bg-slate-950 text-indigo-300',
      gridSubHeader: 'bg-slate-800 text-slate-300',
      gridCell: 'bg-slate-900 hover:bg-slate-800',
      gridLine: 'divide-slate-800',
      border: 'border-slate-800',
      highlightBox: 'bg-slate-800 border-slate-700',
      activeTab: 'bg-indigo-600 text-white',
      inactiveTab: 'bg-slate-800 text-slate-400',
      buttonSecondary: 'bg-slate-800 hover:bg-slate-700 text-slate-300',
      dropdownBg: 'bg-slate-800 border-slate-700 shadow-xl',
      dropdownItemActive: 'bg-indigo-900/50 text-indigo-300 font-bold',
      dropdownItemInactive: 'text-slate-400 hover:bg-slate-700 bg-transparent',
      dropdownDivider: 'border-slate-700',
      dropdownLabel: 'text-slate-500',
      sectionHeaderBg: 'bg-slate-900/50 border-slate-800',
      weekInfoOdd: 'bg-indigo-900/40 text-indigo-300 border border-indigo-800',
      weekInfoEven: 'bg-orange-900/40 text-orange-300 border border-orange-800',
      font: 'font-sans'
    }
  },
  retro: {
    name: 'Retro',
    icon: Monitor,
    classes: {
      bg: 'bg-black',
      header: 'bg-black border-b-2 border-green-800',
      textMain: 'text-green-500',
      textSec: 'text-green-800',
      card: 'bg-black border-2 border-green-900 shadow-none rounded-none',
      cardBorder: 'border-l-0', 
      badgeCurs: 'bg-green-900 text-green-300 border border-green-500',
      badgeSem: 'bg-green-900 text-green-300 border border-green-500',
      accentText: 'text-green-400 uppercase tracking-widest',
      gridHeader: 'bg-black text-green-500 border-b-2 border-green-800',
      gridSubHeader: 'bg-black text-green-600 border-b border-green-900',
      gridCell: 'bg-black hover:bg-green-900/20 border-r border-green-900',
      gridLine: 'divide-green-900',
      border: 'border-green-900',
      highlightBox: 'bg-black border-2 border-green-700',
      activeTab: 'bg-green-900 text-green-300 border border-green-500',
      inactiveTab: 'bg-black text-green-800 border border-green-900',
      buttonSecondary: 'bg-green-900 text-green-300 hover:bg-green-800',
      dropdownBg: 'bg-black border-green-500 shadow-none',
      dropdownItemActive: 'bg-green-900 text-green-100',
      dropdownItemInactive: 'text-green-600 hover:bg-green-900/30 bg-transparent',
      dropdownDivider: 'border-green-800',
      dropdownLabel: 'text-green-800',
      sectionHeaderBg: 'bg-green-900/20 border-green-600',
      weekInfoOdd: 'bg-black border border-green-500 text-green-400',
      weekInfoEven: 'bg-black border border-green-500 text-green-400',
      font: 'font-mono'
    }
  }
};

// --- HELPERS ---
const timeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

const getDayName = (dayIndex) => {
  const map = ['Duminica', 'Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata'];
  return map[dayIndex];
};

const normalizeStr = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function App() {
  const [now, setNow] = useState(null); // Init with null to strictly wait for API
  const [isOddWeek, setIsOddWeek] = useState(true);
  const [currentClass, setCurrentClass] = useState(null);
  const [nextClass, setNextClass] = useState(null);
  
  // Inițializăm tema direct din localStorage pentru a evita flash-uri la loading
  const [themeMode, setThemeMode] = useState(() => {
    try {
      const saved = localStorage.getItem('university-schedule-theme');
      return (saved && THEMES[saved]) ? saved : 'light';
    } catch {
      return 'light';
    }
  });

  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [mobileSelectedDay, setMobileSelectedDay] = useState('Luni');
  
  // API State
  const [isApiConnected, setIsApiConnected] = useState(false);
  const [isLoadingApi, setIsLoadingApi] = useState(true);

  // --- API TIME FETCHING ---
  const fetchRealTime = async () => {
    // Only show loading indicator if we don't have a time yet
    if (!now) setIsLoadingApi(true);
    
    try {
      // Folosim un API gratuit pentru ora exactă în București
      const response = await fetch('https://worldtimeapi.org/api/timezone/Europe/Bucharest');
      const data = await response.json();
      
      // Data datetime vine in format ISO: 2024-03-25T14:30:00.123+02:00
      const apiDate = new Date(data.datetime);
      
      setNow(apiDate);
      setIsApiConnected(true);
      setIsLoadingApi(false); // Unblock UI only on success
    } catch (error) {
      console.error("API Error", error);
      setIsApiConnected(false);
      
      // Dacă nu avem încă timpul, REÎNCERCĂM. Nu folosim sistemul.
      // Așteptăm și încercăm din nou la infinit până avem net/răspuns.
      if (!now) {
        setTimeout(fetchRealTime, 2000); 
      }
    }
  };

  // Initial load
  useEffect(() => {
    // Day initial setting (just for UI tab default)
    const today = getDayName(new Date().getDay());
    if (DAYS.includes(today)) {
      setMobileSelectedDay(today);
    }

    // Fetch time immediately on mount
    fetchRealTime();
  }, []);

  const changeTheme = (mode) => {
    setThemeMode(mode);
    localStorage.setItem('university-schedule-theme', mode);
  };

  const theme = THEMES[themeMode].classes;
  const isRetro = themeMode === 'retro';

  // Clock & Parity Logic
  useEffect(() => {
    const tick = () => {
      // Increment only if we have a valid time from API
      setNow(prev => prev ? new Date(prev.getTime() + 1000) : null); 
    };

    // Parity calculation logic
    const calculateParity = (dateReference) => {
      if (!dateReference) return;

      // --- CALCUL BAZAT PE DATA REALA (DIN API) ---
      const diffTime = Math.abs(dateReference - SEMESTER_START_DATE);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      // Calculăm numărul săptămânii
      let weekNo = Math.floor(diffDays / 7) + 1;
      
      // Dacă săptămâna e impară (1, 3, 5...) -> isOdd = true
      const isOdd = weekNo % 2 !== 0; 
      setIsOddWeek(isOdd);
    };

    if (now) {
        calculateParity(now);
    }

    const timer = setInterval(tick, 1000); // Update secundar
    
    // Re-sync with API every 5 minutes to stay accurate
    const syncTimer = setInterval(fetchRealTime, 1000 * 60 * 5);

    return () => {
      clearInterval(timer);
      clearInterval(syncTimer);
    };
  }, [now]); 

  // Class Identification Logic
  useEffect(() => {
    if (!now) return; // Guard clause - wait for API time

    const currentDayName = getDayName(now.getDay());
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const todaysClasses = SCHEDULE_DATA.filter(item => {
      const isToday = normalizeStr(item.day) === normalizeStr(currentDayName);
      const parityMatch = item.parity === 'all' || 
                          (isOddWeek && item.parity === 'odd') || 
                          (!isOddWeek && item.parity === 'even');
      return isToday && parityMatch;
    }).sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));

    const active = todaysClasses.find(item => {
      const start = timeToMinutes(item.time);
      const end = start + item.duration;
      return currentMinutes >= start && currentMinutes < end;
    });

    const next = todaysClasses.find(item => {
      const start = timeToMinutes(item.time);
      return start > currentMinutes;
    });

    setCurrentClass(active || null);
    setNextClass(next || null);
  }, [now, isOddWeek]);

  // --- COMPONENTS ---
  const Badge = ({ type, faded }) => {
    const isCurs = type === 'Curs';
    let badgeStyle = '';
    if (faded && !isRetro) {
         badgeStyle = themeMode === 'dark' ? 'bg-slate-700 text-slate-400' : 'bg-gray-200 text-gray-500';
    } else {
         badgeStyle = isCurs ? theme.badgeCurs : theme.badgeSem;
    }
    return (
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider ${badgeStyle}`}>
        {type}
      </span>
    );
  };

  const ClassCard = ({ data, faded = false }) => {
    if (!data) return null;
    let borderColor = '';
    if (!isRetro) {
        if (faded) {
            borderColor = themeMode === 'dark' ? 'border-l-slate-700' : 'border-l-gray-300';
        } else {
            borderColor = data.type === 'Curs' ? 'border-l-blue-700' : 'border-l-green-600';
        }
    }
    return (
      <div className={`p-3 h-full flex flex-col justify-between transition-all ${
        isRetro ? 'rounded-none' : 'rounded-lg'
      } ${theme.card} ${theme.cardBorder} ${borderColor} ${
        faded ? 'opacity-40' : ''
      }`}>
        <div className="min-w-0">
          <div className="flex justify-between items-start gap-2 mb-1">
            <h4 className={`font-bold text-sm leading-tight break-words ${theme.textMain}`}>
              {data.subject}
            </h4>
            <Badge type={data.type} faded={faded} />
          </div>
          <div className={`text-xs mt-2 space-y-1 ${theme.textSec}`}>
            <div className="flex items-start gap-1 min-w-0">
              <User size={12} className="shrink-0 mt-0.5" />
              <span className="break-words">{data.prof}</span>
            </div>
            <div className={`flex items-center gap-1 font-semibold ${theme.textMain}`}>
              <MapPin size={12} className="shrink-0" />
              <span>Sala: {data.room}</span>
            </div>
            {data.parity !== 'all' && (
              <div className="italic opacity-80">
                (Săptămână {data.parity === 'odd' ? 'Impară' : 'Pară'})
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // --- LOADING CHECK ---
  if (isLoadingApi) {
    return (
      <div className={`min-h-screen w-full flex flex-col items-center justify-center transition-colors duration-300 ${theme.bg} ${theme.font}`}>
         <div className="flex flex-col items-center gap-6 animate-pulse">
            <div className={`p-4 rounded-full ${isRetro ? 'bg-green-900 border border-green-500' : 'bg-blue-50'}`}>
               <Globe size={48} className={`animate-bounce ${isRetro ? 'text-green-500' : 'text-blue-600'}`} />
            </div>
            <div className="text-center space-y-2">
               <h2 className={`text-xl font-bold ${theme.textMain}`}>Se sincronizează orarul...</h2>
               <p className={`text-sm ${theme.textSec}`}>Verificăm ora exactă pentru paritatea săptămânii</p>
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pb-10 transition-colors duration-300 overflow-x-hidden ${theme.bg} ${theme.font}`}>
      <style>{`
        html, body {
          overflow-x: hidden;
          max-width: 100vw;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
      {isRetro && (
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
          .font-mono { font-family: 'VT323', monospace; font-size: 1.1em; }
        `}</style>
      )}

      {/* HEADER */}
      <header className={`sticky top-0 z-50 shadow-sm transition-colors duration-300 ${theme.header}`}>
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col items-center md:flex-row md:justify-between gap-4">
          <div className="text-center md:text-left w-full md:w-auto">
            <h1 className={`text-xl md:text-2xl font-black tracking-tight break-words ${theme.accentText}`}>
              INFO ENG GRUPA 1030
            </h1>
            <div className={`text-sm flex flex-wrap items-center justify-center md:justify-start gap-2 mt-1 ${theme.textSec}`}>
              
              {/* API Status Indicator */}
              <div className="flex items-center gap-1" title={isApiConnected ? "Sincronizat cu WorldTimeAPI" : "Offline / System Time"}>
                {isLoadingApi ? (
                  <span className="animate-pulse">●</span> 
                ) : isApiConnected ? (
                  <Globe size={14} className="text-green-500" />
                ) : (
                  <WifiOff size={14} className="text-red-500" />
                )}
              </div>

              <Clock size={14} />
              {now.toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long' })} 
              <span className={`font-mono px-2 rounded ${isRetro ? 'bg-green-900 text-green-100' : 'bg-gray-100 text-gray-800'}`}>
                {now.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
             {/* Week Info */}
            <div className={`px-4 py-2 text-sm shadow-sm flex items-center gap-2 whitespace-nowrap rounded-lg font-bold ${
              isOddWeek ? theme.weekInfoOdd : theme.weekInfoEven
            }`}>
              <Info size={16} />
              <span>Săpt. {isOddWeek ? 'IMPARĂ' : 'PARĂ'}</span>
            </div>

            {/* Theme Toggle */}
            <div className="relative z-[100]">
              <button 
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className={`p-2 rounded-full transition-colors ${theme.buttonSecondary}`}
              >
                <Settings size={20} />
              </button>

              {showThemeMenu && (
                <div className={`absolute right-0 top-full mt-2 w-48 rounded-lg shadow-xl z-[100] overflow-hidden border ${theme.dropdownBg}`}>
                  
                  {/* Theme Controls Only */}
                  <div className="p-2">
                    <div className={`text-xs uppercase font-bold px-2 mb-2 ${theme.dropdownLabel}`}>
                      Temă
                    </div>
                    <div className="space-y-1">
                      {Object.entries(THEMES).map(([key, config]) => {
                        const Icon = config.icon;
                        return (
                          <button
                            key={key}
                            onClick={() => changeTheme(key)}
                            className={`w-full text-left px-3 py-2 flex items-center gap-2 rounded text-sm transition-colors ${
                              themeMode === key 
                                ? theme.dropdownItemActive
                                : theme.dropdownItemInactive
                            }`}
                          >
                            <Icon size={14} />
                            {config.name}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="w-full max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-8 overflow-x-hidden">

        {/* DASHBOARD */}
        <section className="grid md:grid-cols-2 gap-4">
          {/* Card Ora Curenta */}
          <div className={`overflow-hidden transition-all ${isRetro ? 'border-2 border-green-600' : 'rounded-xl shadow-sm border border-gray-200'} ${theme.card}`}>
            <div className={`px-4 py-2 flex justify-between items-center border-b ${theme.sectionHeaderBg}`}>
              <h3 className={`font-bold text-sm uppercase flex items-center gap-2 ${theme.accentText}`}>
                <div className={`w-2 h-2 rounded-full animate-pulse ${isRetro ? 'bg-green-500' : 'bg-green-500'}`}></div>
                Ora Curentă
              </h3>
              <span className={`text-xs font-mono ${theme.textSec}`}>LIVE</span>
            </div>
            <div className="p-4 min-h-[120px] flex items-center justify-center">
              {currentClass ? (
                <div className="w-full">
                   <ClassCard data={currentClass} />
                </div>
              ) : (
                <div className={`text-center italic ${theme.textSec}`}>
                  <p className="text-sm">Nicio oră în desfășurare</p>
                </div>
              )}
            </div>
          </div>

          {/* Card Ora Urmatoare */}
          <div className={`overflow-hidden transition-all ${isRetro ? 'border-2 border-green-800 border-dashed' : 'rounded-xl shadow-sm border border-gray-200'} ${theme.card}`}>
             <div className={`px-4 py-2 border-b ${theme.sectionHeaderBg}`}>
              <h3 className={`font-bold text-sm uppercase flex items-center gap-2 ${theme.textMain}`}>
                <ChevronRight size={16} />
                Ora Următoare
              </h3>
            </div>
            <div className="p-4 min-h-[120px] flex items-center justify-center">
               {nextClass ? (
                <div className="w-full">
                   <ClassCard data={nextClass} />
                </div>
              ) : (
                <div className={`text-center italic ${theme.textSec}`}>
                  <p className="text-sm">Nu mai sunt ore azi</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ORAR SECTION */}
        <section className={`overflow-hidden transition-all ${isRetro ? 'border-2 border-green-700' : 'rounded-xl shadow-lg border border-gray-200'} ${theme.card}`}>
          <div className={`p-4 flex justify-between items-center ${isRetro ? 'border-b border-green-700' : `border-b ${theme.sectionHeaderBg}`}`}>
            <h2 className={`font-bold flex items-center gap-2 ${theme.textMain}`}>
              <Calendar size={18} /> Orar Complet
            </h2>
          </div>

          {/* --- DESKTOP VIEW (TABLE) --- */}
          <div className="hidden md:block overflow-x-auto">
            <div className={`min-w-[700px] grid grid-cols-[80px_repeat(5,_1fr)] ${theme.gridLine} ${isRetro ? '' : 'border-b ' + theme.border}`}>
              {/* Table Header */}
              <div className={`p-3 font-bold text-sm flex items-center justify-center ${theme.gridHeader}`}>Ora</div>
              {DAYS.map(day => (
                <div key={day} className={`p-3 font-bold text-sm text-center ${
                  normalizeStr(day) === normalizeStr(getDayName(now.getDay())) 
                    ? (isRetro ? 'bg-green-900 text-green-100' : 'bg-blue-800 text-white ring-inset ring-2 ring-yellow-400')
                    : theme.gridHeader
                }`}>
                  {day}
                </div>
              ))}
            </div>

            <div className={`min-w-[700px] divide-y ${theme.gridLine}`}>
              {TIME_SLOTS.map((time) => (
                <div key={time} className={`grid grid-cols-[80px_repeat(5,_1fr)] divide-x ${theme.gridLine} group`}>
                  {/* Time Column */}
                  <div className={`p-3 text-xs font-bold flex items-center justify-center ${theme.gridSubHeader}`}>
                    {time}
                  </div>

                  {/* Days Columns */}
                  {DAYS.map(day => {
                    const slotClasses = SCHEDULE_DATA.filter(c => c.day === day && c.time === time);
                    return (
                      <div key={`${day}-${time}`} className={`p-1 min-h-[100px] relative ${theme.gridCell}`}>
                        {slotClasses.length > 0 && (
                          <div className="flex flex-col gap-1 h-full">
                            {slotClasses.map((cls, idx) => {
                                const isActiveWeek = cls.parity === 'all' || 
                                                    (isOddWeek && cls.parity === 'odd') || 
                                                    (!isOddWeek && cls.parity === 'even');
                                return (
                                  <ClassCard 
                                    key={idx} 
                                    data={cls} 
                                    faded={!isActiveWeek} 
                                  />
                                );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* --- MOBILE VIEW (TABS + LIST) --- */}
          <div className="block md:hidden">
            {/* Day Selector Tabs */}
            <div className={`flex flex-wrap justify-center p-2 gap-2 border-b ${theme.border}`}>
              {DAYS.map(day => (
                <button
                  key={day}
                  onClick={() => setMobileSelectedDay(day)}
                  className={`px-3 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${
                    mobileSelectedDay === day
                      ? theme.activeTab
                      : theme.inactiveTab
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Mobile Schedule List */}
            <div className="p-2 space-y-4">
               {TIME_SLOTS.map(time => {
                 const slotClasses = SCHEDULE_DATA.filter(c => c.day === mobileSelectedDay && c.time === time);
                 if (slotClasses.length === 0) return null; // Hide empty slots on mobile to save space
                 
                 return (
                   <div key={time} className="flex gap-3 items-center">
                     <div className={`w-14 shrink-0 flex flex-col items-center justify-center rounded p-1 ${theme.gridSubHeader}`}>
                        <span className="text-sm font-bold">{time}</span>
                     </div>
                     <div className="flex-1 space-y-2">
                        {slotClasses.map((cls, idx) => {
                            const isActiveWeek = cls.parity === 'all' || 
                                                (isOddWeek && cls.parity === 'odd') || 
                                                (!isOddWeek && cls.parity === 'even');
                            return (
                              <ClassCard 
                                key={idx} 
                                data={cls} 
                                faded={!isActiveWeek} 
                              />
                            );
                        })}
                     </div>
                   </div>
                 )
               })}
               
               {/* Empty State for Day */}
               {TIME_SLOTS.every(time => SCHEDULE_DATA.filter(c => c.day === mobileSelectedDay && c.time === time).length === 0) && (
                 <div className={`text-center py-8 opacity-60 ${theme.textSec}`}>
                   <p>Nu sunt ore programate în această zi.</p>
                 </div>
               )}
            </div>
          </div>

        </section>

        {/* FOOTER */}
        <footer className={`text-center text-xs py-4 ${theme.textSec}`}>
          <p>Ultima actualizare automată: {now.toLocaleTimeString()}</p>
          <p className="mt-1">
             Tema: <span className="uppercase font-bold">{themeMode}</span>
          </p>
        </footer>

      </main>
    </div>
  );
}