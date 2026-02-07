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
  xp: {
    name: 'Windows XP',
    icon: Monitor,
    classes: {
      bg: 'xp-bg',
      header: 'xp-header border-b-0',
      textMain: 'text-slate-800',
      textSec: 'text-slate-600',
      card: 'xp-card border-2 border-blue-800 shadow-lg',
      cardBorder: 'border-l-0',
      badgeCurs: 'xp-badge-blue text-white',
      badgeSem: 'xp-badge-green text-white',
      accentText: 'text-blue-800 font-bold',
      gridHeader: 'xp-grid-header text-white font-bold',
      gridSubHeader: 'xp-grid-subheader text-blue-900 font-semibold',
      gridCell: 'bg-white hover:bg-blue-50 border border-blue-200',
      gridLine: 'divide-blue-300',
      border: 'border-blue-300',
      highlightBox: 'xp-highlight border-2 border-blue-500',
      activeTab: 'xp-tab-active text-white font-bold shadow-md',
      inactiveTab: 'xp-tab-inactive text-slate-700 border-2 border-blue-400',
      buttonSecondary: 'xp-button text-slate-700 border-2 border-blue-500',
      dropdownBg: 'xp-dropdown border-2 border-blue-800 shadow-2xl',
      dropdownItemActive: 'xp-dropdown-active text-white font-bold',
      dropdownItemInactive: 'bg-white text-slate-700 hover:bg-blue-100 border border-blue-200',
      dropdownDivider: 'border-blue-300',
      dropdownLabel: 'text-blue-700 font-bold',
      sectionHeaderBg: 'xp-section-header border-b-2 border-blue-600',
      weekInfoOdd: 'xp-info-blue text-blue-900 border-2 border-blue-600',
      weekInfoEven: 'xp-info-orange text-orange-900 border-2 border-orange-600',
      font: 'font-sans'
    }
  },
  stardew: {
    name: 'Stardew Valley',
    icon: Sun,
    classes: {
      bg: 'stardew-bg',
      header: 'stardew-header border-b-4 border-amber-900',
      textMain: 'text-amber-950',
      textSec: 'text-amber-800',
      card: 'stardew-card border-4 border-amber-900 shadow-xl',
      cardBorder: 'border-l-0',
      badgeCurs: 'stardew-badge-blue text-white',
      badgeSem: 'stardew-badge-green text-white',
      accentText: 'text-amber-900 font-bold',
      gridHeader: 'stardew-grid-header text-white font-bold',
      gridSubHeader: 'stardew-grid-subheader text-green-900 font-bold',
      gridCell: 'stardew-cell hover:bg-green-100',
      gridLine: 'divide-amber-800',
      border: 'border-amber-800',
      highlightBox: 'stardew-highlight border-4 border-yellow-600',
      activeTab: 'stardew-tab-active text-white font-bold shadow-lg',
      inactiveTab: 'stardew-tab-inactive text-amber-900 border-4 border-amber-700',
      buttonSecondary: 'stardew-button text-amber-900 border-4 border-amber-800',
      dropdownBg: 'stardew-dropdown border-4 border-amber-900 shadow-2xl',
      dropdownItemActive: 'stardew-dropdown-active text-white font-bold',
      dropdownItemInactive: 'bg-amber-50 text-amber-900 hover:bg-yellow-100 border-2 border-amber-700',
      dropdownDivider: 'border-amber-800',
      dropdownLabel: 'text-green-800 font-bold',
      sectionHeaderBg: 'stardew-section-header border-b-4 border-green-700',
      weekInfoOdd: 'stardew-info-blue text-blue-900 border-4 border-blue-700',
      weekInfoEven: 'stardew-info-orange text-orange-900 border-4 border-orange-700',
      font: 'font-sans'
    }
  },
  gothic: {
    name: 'Gothic Dark',
    icon: Moon,
    classes: {
      bg: 'gothic-bg',
      header: 'gothic-header border-b-2 border-purple-900/50',
      textMain: 'text-purple-100',
      textSec: 'text-purple-300/70',
      card: 'gothic-card border border-purple-900/50 shadow-2xl',
      cardBorder: 'border-l-4',
      badgeCurs: 'gothic-badge-purple text-white',
      badgeSem: 'gothic-badge-red text-white',
      accentText: 'text-purple-400 font-semibold',
      gridHeader: 'gothic-grid-header text-purple-200 font-bold',
      gridSubHeader: 'gothic-grid-subheader text-purple-300',
      gridCell: 'gothic-cell hover:bg-purple-950/30',
      gridLine: 'divide-purple-900/30',
      border: 'border-purple-900/30',
      highlightBox: 'gothic-highlight border border-purple-800/50',
      activeTab: 'gothic-tab-active text-white shadow-xl',
      inactiveTab: 'gothic-tab-inactive text-purple-400',
      buttonSecondary: 'gothic-button text-purple-300',
      dropdownBg: 'gothic-dropdown border border-purple-800/50 shadow-2xl',
      dropdownItemActive: 'gothic-dropdown-active text-white',
      dropdownItemInactive: 'bg-black/40 text-purple-300 hover:bg-purple-950/50',
      dropdownDivider: 'border-purple-900/40',
      dropdownLabel: 'text-purple-500 font-semibold',
      sectionHeaderBg: 'gothic-section-header border-purple-800/30',
      weekInfoOdd: 'gothic-info-purple text-purple-300 border border-purple-700/50',
      weekInfoEven: 'gothic-info-red text-red-300 border border-red-800/50',
      font: 'font-serif'
    }
  },
  aero: {
    name: 'Vista Aero',
    icon: Globe,
    classes: {
      bg: 'bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100',
      header: 'aero-glass border-b border-white/30',
      textMain: 'text-slate-800',
      textSec: 'text-slate-600',
      card: 'aero-card border border-white/40 shadow-xl',
      cardBorder: 'border-l-4',
      badgeCurs: 'aero-badge-blue text-white shadow-md',
      badgeSem: 'aero-badge-green text-white shadow-md',
      accentText: 'text-blue-700 font-semibold',
      gridHeader: 'aero-header text-white font-semibold',
      gridSubHeader: 'aero-subheader text-blue-900',
      gridCell: 'aero-cell hover:bg-blue-50/50',
      gridLine: 'divide-blue-200/50',
      border: 'border-blue-200/50',
      highlightBox: 'aero-highlight',
      activeTab: 'aero-tab-active text-white shadow-lg',
      inactiveTab: 'aero-tab-inactive text-slate-700',
      buttonSecondary: 'aero-button text-slate-700',
      dropdownBg: 'aero-dropdown border border-white/40 shadow-2xl',
      dropdownItemActive: 'aero-dropdown-active text-white',
      dropdownItemInactive: 'bg-white/60 text-slate-700 hover:bg-blue-100/70',
      dropdownDivider: 'border-blue-200/30',
      dropdownLabel: 'text-slate-500 font-semibold',
      sectionHeaderBg: 'aero-section-header border-blue-200/30',
      weekInfoOdd: 'aero-info-odd text-blue-800 border border-blue-300/50 shadow-md',
      weekInfoEven: 'aero-info-even text-orange-800 border border-orange-300/50 shadow-md',
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
  },
  retro_anim: {
    name: 'Retro Anim',
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
  const isRetro = themeMode === 'retro' || themeMode === 'retro_anim';
  const isRetroAnim = themeMode === 'retro_anim';

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
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider ${badgeStyle} ${isRetroAnim && !faded ? 'retro-border-pulse' : ''}`}>
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
        isRetro ? 'rounded-none border-2' : 'rounded-lg'
      } ${isRetroAnim ? 'retro-border-pulse' : ''} ${theme.card} ${theme.cardBorder} ${borderColor} ${
        faded ? 'opacity-40' : ''
      }`}>
        <div className="min-w-0">
          <div className="flex justify-between items-start gap-2 mb-1">
            <h4 className={`font-bold text-sm leading-tight break-words ${theme.textMain} ${isRetroAnim && !faded ? 'retro-glow' : ''}`}>
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
      <div className={`h-screen w-full flex flex-col items-center justify-center transition-colors duration-300 ${theme.bg} ${theme.font} ${isRetroAnim ? 'retro-screen retro-screen-glow retro-noise retro-scanline' : ''}`}>
         <div className="flex flex-col items-center gap-6 animate-pulse">
            <div className={`p-4 rounded-full ${isRetro ? 'bg-green-900 border-2 border-green-500' : 'bg-blue-50'} ${isRetroAnim ? 'retro-border-pulse' : ''}`}>
               <Globe size={48} className={`animate-bounce ${isRetro ? 'text-green-500' : 'text-blue-600'}`} />
            </div>
            <div className="text-center space-y-2">
               <h2 className={`text-xl font-bold ${theme.textMain} ${isRetroAnim ? 'retro-glow retro-cursor' : ''}`}>
                 {isRetro ? '>>> LOADING SYSTEM...' : 'Se sincronizează orarul...'}
               </h2>
               <p className={`text-sm ${theme.textSec} ${isRetroAnim ? 'retro-glow' : ''}`}>
                 {isRetro ? '>>> SYNC TIME_API' : 'Verificăm ora exactă pentru paritatea săptămânii'}
               </p>
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pb-10 transition-colors duration-300 overflow-x-hidden ${theme.bg} ${theme.font} ${isRetroAnim ? 'retro-screen retro-screen-glow retro-noise retro-scanline' : ''}`}>
      <style>{`
        html, body {
          overflow-x: hidden;
          max-width: 100vw;
        }
        * {
          box-sizing: border-box;
        }
        
        /* === VISTA AERO STYLES === */
        .aero-glass {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.9) 0%,
            rgba(240, 248, 255, 0.85) 50%,
            rgba(230, 240, 255, 0.9) 100%
          );
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 
            0 8px 32px rgba(31, 38, 135, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.8),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1);
        }
        
        .aero-card {
          background: linear-gradient(135deg,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(245, 250, 255, 0.9) 100%
          );
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 
            0 8px 32px rgba(31, 38, 135, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          border-radius: 8px;
        }
        
        .aero-header {
          background: linear-gradient(180deg,
            #4c9bdb 0%,
            #3d7db3 50%,
            #2b5d8f 100%
          );
          box-shadow: 
            inset 0 1px 0 rgba(255, 255, 255, 0.4),
            0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .aero-subheader {
          background: linear-gradient(180deg,
            rgba(200, 225, 245, 0.9) 0%,
            rgba(180, 210, 235, 0.85) 100%
          );
          backdrop-filter: blur(5px);
        }
        
        .aero-cell {
          background: linear-gradient(135deg,
            rgba(255, 255, 255, 0.6) 0%,
            rgba(250, 252, 255, 0.5) 100%
          );
          backdrop-filter: blur(5px);
        }
        
        .aero-badge-blue {
          background: linear-gradient(180deg,
            #5eadeb 0%,
            #3d8ed3 50%,
            #2b6da8 100%
          );
          box-shadow: 
            inset 0 1px 0 rgba(255, 255, 255, 0.5),
            0 2px 4px rgba(0, 0, 0, 0.3);
          border-radius: 4px;
        }
        
        .aero-badge-green {
          background: linear-gradient(180deg,
            #7ed957 0%,
            #5db33a 50%,
            #4a9130 100%
          );
          box-shadow: 
            inset 0 1px 0 rgba(255, 255, 255, 0.5),
            0 2px 4px rgba(0, 0, 0, 0.3);
          border-radius: 4px;
        }
        
        .aero-tab-active {
          background: linear-gradient(180deg,
            #6bb8f0 0%,
            #4c9bdb 50%,
            #3d7db3 100%
          );
          box-shadow: 
            inset 0 1px 0 rgba(255, 255, 255, 0.6),
            0 4px 12px rgba(59, 130, 246, 0.4);
          border-radius: 6px;
        }
        
        .aero-tab-inactive {
          background: linear-gradient(135deg,
            rgba(255, 255, 255, 0.7) 0%,
            rgba(240, 245, 250, 0.6) 100%
          );
          backdrop-filter: blur(5px);
          border-radius: 6px;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }
        
        .aero-button {
          background: linear-gradient(180deg,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(230, 240, 250, 0.8) 100%
          );
          backdrop-filter: blur(5px);
          box-shadow: 
            inset 0 1px 0 rgba(255, 255, 255, 0.8),
            0 2px 4px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 50%;
        }
        
        .aero-button:hover {
          background: linear-gradient(180deg,
            rgba(240, 248, 255, 0.95) 0%,
            rgba(220, 235, 250, 0.9) 100%
          );
        }
        
        .aero-dropdown {
          background: linear-gradient(135deg,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(245, 250, 255, 0.9) 100%
          );
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 8px;
          box-shadow: 
            0 12px 48px rgba(31, 38, 135, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }
        
        .aero-dropdown-active {
          background: linear-gradient(90deg,
            #5eadeb 0%,
            #4c9bdb 100%
          );
          border-radius: 4px;
        }
        
        .aero-section-header {
          background: linear-gradient(135deg,
            rgba(220, 235, 250, 0.6) 0%,
            rgba(200, 225, 245, 0.5) 100%
          );
          backdrop-filter: blur(5px);
        }
        
        .aero-highlight {
          background: linear-gradient(135deg,
            rgba(190, 220, 250, 0.4) 0%,
            rgba(170, 210, 245, 0.3) 100%
          );
          backdrop-filter: blur(5px);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 8px;
        }
        
        .aero-info-odd {
          background: linear-gradient(135deg,
            rgba(219, 234, 254, 0.8) 0%,
            rgba(191, 219, 254, 0.7) 100%
          );
          backdrop-filter: blur(8px);
          border-radius: 8px;
        }
        
        .aero-info-even {
          background: linear-gradient(135deg,
            rgba(254, 243, 199, 0.8) 0%,
            rgba(253, 230, 138, 0.7) 100%
          );
          backdrop-filter: blur(8px);
          border-radius: 8px;
        }
        
        /* === WINDOWS XP STYLES === */
        .xp-bg {
          background: linear-gradient(180deg, #245edb 0%, #3f8cf3 50%, #245edb 100%);
        }
        
        .xp-header {
          background: linear-gradient(180deg, #0054e3 0%, #3a8cf5 50%, #0054e3 100%);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 2px 6px rgba(0, 0, 0, 0.3);
        }
        
        .xp-card {
          background: linear-gradient(135deg, #ece9d8 0%, #f5f3ea 100%);
          border-radius: 0;
          box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
        }
        
        .xp-badge-blue {
          background: linear-gradient(180deg, #4a8cf7 0%, #0054e3 100%);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 2px 2px 0 rgba(0, 0, 0, 0.3);
          border-radius: 3px;
          border: 1px solid #0040a8;
        }
        
        .xp-badge-green {
          background: linear-gradient(180deg, #7ed321 0%, #5a9e16 100%);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 2px 2px 0 rgba(0, 0, 0, 0.3);
          border-radius: 3px;
          border: 1px solid #4a8012;
        }
        
        .xp-grid-header {
          background: linear-gradient(180deg, #0054e3 0%, #3a8cf5 50%, #0054e3 100%);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }
        
        .xp-grid-subheader {
          background: linear-gradient(180deg, #d6e8ff 0%, #b5d3f5 100%);
        }
        
        .xp-highlight {
          background: linear-gradient(135deg, #fef6d5 0%, #ffe89f 100%);
          border-radius: 0;
        }
        
        .xp-tab-active {
          background: linear-gradient(180deg, #4a8cf7 0%, #0054e3 100%);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 2px 2px 4px rgba(0, 0, 0, 0.3);
          border-radius: 3px;
        }
        
        .xp-tab-inactive {
          background: linear-gradient(180deg, #f0f0f0 0%, #d4d4d4 100%);
          border-radius: 3px;
        }
        
        .xp-button {
          background: linear-gradient(180deg, #ffffff 0%, #e8e8e8 100%);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.2);
          border-radius: 50%;
        }
        
        .xp-dropdown {
          background: linear-gradient(135deg, #ece9d8 0%, #f5f3ea 100%);
          border-radius: 0;
          box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
        }
        
        .xp-dropdown-active {
          background: linear-gradient(90deg, #4a8cf7 0%, #0054e3 100%);
          border-radius: 0;
        }
        
        .xp-section-header {
          background: linear-gradient(180deg, #d6e8ff 0%, #b5d3f5 100%);
        }
        
        .xp-info-blue {
          background: linear-gradient(135deg, #cfe5ff 0%, #a5d0ff 100%);
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }
        
        .xp-info-orange {
          background: linear-gradient(135deg, #ffe5cf 0%, #ffd0a5 100%);
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }
        
        /* === STARDEW VALLEY STYLES === */
        .stardew-bg {
          background: linear-gradient(180deg, #8fde5d 0%, #68b83f 50%, #8fde5d 100%);
        }
        
        .stardew-header {
          background: linear-gradient(180deg, #f4a460 0%, #d2691e 50%, #8b4513 100%);
          box-shadow: 0 4px 0 #5d2e0f, inset 0 -2px 0 #ffd699;
        }
        
        .stardew-card {
          background: linear-gradient(135deg, #fff8dc 0%, #fffacd 100%);
          border-radius: 8px;
          box-shadow: 4px 4px 0 rgba(139, 69, 19, 0.3);
          image-rendering: pixelated;
        }
        
        .stardew-badge-blue {
          background: linear-gradient(180deg, #6495ed 0%, #4169e1 100%);
          box-shadow: inset 0 2px 0 rgba(255, 255, 255, 0.5), 3px 3px 0 rgba(0, 0, 0, 0.3);
          border-radius: 4px;
          border: 2px solid #1e3a8a;
        }
        
        .stardew-badge-green {
          background: linear-gradient(180deg, #90ee90 0%, #228b22 100%);
          box-shadow: inset 0 2px 0 rgba(255, 255, 255, 0.5), 3px 3px 0 rgba(0, 0, 0, 0.3);
          border-radius: 4px;
          border: 2px solid #065f06;
        }
        
        .stardew-grid-header {
          background: linear-gradient(180deg, #8b4513 0%, #654321 100%);
          box-shadow: inset 0 2px 0 #d2691e, 0 3px 0 rgba(0, 0, 0, 0.3);
        }
        
        .stardew-grid-subheader {
          background: linear-gradient(180deg, #daa520 0%, #b8860b 100%);
          box-shadow: inset 0 2px 0 #ffd700;
        }
        
        .stardew-cell {
          background: linear-gradient(135deg, #fffacd 0%, #fff8dc 100%);
          border: 2px solid #deb887;
        }
        
        .stardew-highlight {
          background: linear-gradient(135deg, #fffacd 0%, #ffeb99 100%);
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        }
        
        .stardew-tab-active {
          background: linear-gradient(180deg, #8b4513 0%, #654321 100%);
          box-shadow: inset 0 2px 0 #d2691e, 3px 3px 0 rgba(0, 0, 0, 0.4);
          border-radius: 6px;
        }
        
        .stardew-tab-inactive {
          background: linear-gradient(180deg, #f0e68c 0%, #daa520 100%);
          border-radius: 6px;
        }
        
        .stardew-button {
          background: linear-gradient(180deg, #ffd700 0%, #daa520 100%);
          box-shadow: inset 0 2px 0 #ffe97f, 3px 3px 0 rgba(0, 0, 0, 0.3);
          border-radius: 50%;
        }
        
        .stardew-dropdown {
          background: linear-gradient(135deg, #fff8dc 0%, #fffacd 100%);
          border-radius: 8px;
          box-shadow: 4px 4px 8px rgba(139, 69, 19, 0.4);
        }
        
        .stardew-dropdown-active {
          background: linear-gradient(90deg, #8b4513 0%, #654321 100%);
          border-radius: 4px;
          box-shadow: inset 0 1px 0 #d2691e;
        }
        
        .stardew-section-header {
          background: linear-gradient(180deg, #90ee90 0%, #66cc66 100%);
          box-shadow: inset 0 2px 0 #b0f0b0, 0 2px 0 rgba(0, 0, 0, 0.2);
        }
        
        .stardew-info-blue {
          background: linear-gradient(135deg, #87ceeb 0%, #4682b4 100%);
          box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.3);
          border-radius: 8px;
        }
        
        .stardew-info-orange {
          background: linear-gradient(135deg, #ffa500 0%, #ff8c00 100%);
          box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.3);
          border-radius: 8px;
        }
        
        /* === GOTHIC DARK STYLES === */
        .gothic-bg {
          background: radial-gradient(ellipse at top, #1a0f2e 0%, #0d0618 50%, #000000 100%);
        }
        
        .gothic-header {
          background: linear-gradient(180deg, 
            rgba(88, 28, 135, 0.4) 0%,
            rgba(49, 20, 80, 0.6) 50%,
            rgba(24, 10, 40, 0.8) 100%
          );
          backdrop-filter: blur(10px);
          box-shadow: 
            0 0 20px rgba(168, 85, 247, 0.2),
            inset 0 1px 0 rgba(168, 85, 247, 0.2);
        }
        
        .gothic-card {
          background: linear-gradient(135deg,
            rgba(24, 10, 40, 0.8) 0%,
            rgba(49, 20, 80, 0.6) 100%
          );
          backdrop-filter: blur(10px);
          border-radius: 12px;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.6),
            0 0 20px rgba(168, 85, 247, 0.1),
            inset 0 1px 0 rgba(168, 85, 247, 0.1);
        }
        
        .gothic-badge-purple {
          background: linear-gradient(180deg, #a855f7 0%, #7c3aed 100%);
          box-shadow: 
            0 0 10px rgba(168, 85, 247, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          border: 1px solid #9333ea;
        }
        
        .gothic-badge-red {
          background: linear-gradient(180deg, #dc2626 0%, #991b1b 100%);
          box-shadow: 
            0 0 10px rgba(220, 38, 38, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          border: 1px solid #7f1d1d;
        }
        
        .gothic-grid-header {
          background: linear-gradient(180deg,
            rgba(88, 28, 135, 0.8) 0%,
            rgba(49, 20, 80, 0.9) 100%
          );
          box-shadow: 
            0 0 15px rgba(168, 85, 247, 0.3),
            inset 0 1px 0 rgba(168, 85, 247, 0.3);
        }
        
        .gothic-grid-subheader {
          background: linear-gradient(180deg,
            rgba(49, 20, 80, 0.6) 0%,
            rgba(24, 10, 40, 0.8) 100%
          );
          backdrop-filter: blur(5px);
        }
        
        .gothic-cell {
          background: linear-gradient(135deg,
            rgba(24, 10, 40, 0.4) 0%,
            rgba(49, 20, 80, 0.3) 100%
          );
          backdrop-filter: blur(3px);
          border: 1px solid rgba(168, 85, 247, 0.1);
        }
        
        .gothic-highlight {
          background: linear-gradient(135deg,
            rgba(88, 28, 135, 0.3) 0%,
            rgba(49, 20, 80, 0.4) 100%
          );
          backdrop-filter: blur(5px);
          border-radius: 12px;
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
        }
        
        .gothic-tab-active {
          background: linear-gradient(180deg, #a855f7 0%, #7c3aed 100%);
          box-shadow: 
            0 0 15px rgba(168, 85, 247, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          border: 1px solid #9333ea;
        }
        
        .gothic-tab-inactive {
          background: linear-gradient(135deg,
            rgba(49, 20, 80, 0.5) 0%,
            rgba(24, 10, 40, 0.7) 100%
          );
          backdrop-filter: blur(5px);
          border-radius: 8px;
          border: 1px solid rgba(168, 85, 247, 0.2);
        }
        
        .gothic-button {
          background: linear-gradient(180deg,
            rgba(88, 28, 135, 0.6) 0%,
            rgba(49, 20, 80, 0.8) 100%
          );
          backdrop-filter: blur(5px);
          box-shadow: 
            0 0 10px rgba(168, 85, 247, 0.3),
            inset 0 1px 0 rgba(168, 85, 247, 0.2);
          border: 1px solid rgba(168, 85, 247, 0.3);
          border-radius: 50%;
        }
        
        .gothic-button:hover {
          background: linear-gradient(180deg,
            rgba(88, 28, 135, 0.8) 0%,
            rgba(49, 20, 80, 1) 100%
          );
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
        }
        
        .gothic-dropdown {
          background: linear-gradient(135deg,
            rgba(24, 10, 40, 0.95) 0%,
            rgba(49, 20, 80, 0.9) 100%
          );
          backdrop-filter: blur(20px);
          border-radius: 12px;
          box-shadow: 
            0 12px 48px rgba(0, 0, 0, 0.8),
            0 0 30px rgba(168, 85, 247, 0.2),
            inset 0 1px 0 rgba(168, 85, 247, 0.2);
        }
        
        .gothic-dropdown-active {
          background: linear-gradient(90deg, #a855f7 0%, #7c3aed 100%);
          border-radius: 6px;
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
        }
        
        .gothic-section-header {
          background: linear-gradient(135deg,
            rgba(49, 20, 80, 0.5) 0%,
            rgba(24, 10, 40, 0.7) 100%
          );
          backdrop-filter: blur(5px);
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.1);
        }
        
        .gothic-info-purple {
          background: linear-gradient(135deg,
            rgba(88, 28, 135, 0.5) 0%,
            rgba(49, 20, 80, 0.7) 100%
          );
          backdrop-filter: blur(8px);
          border-radius: 12px;
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.3);
        }
        
        .gothic-info-red {
          background: linear-gradient(135deg,
            rgba(127, 29, 29, 0.5) 0%,
            rgba(69, 10, 10, 0.7) 100%
          );
          backdrop-filter: blur(8px);
          border-radius: 12px;
          box-shadow: 0 0 15px rgba(220, 38, 38, 0.3);
        }
      `}</style>
      {isRetro && (
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
          .font-mono { font-family: 'VT323', monospace; font-size: 1.1em; }
        `}</style>
      )}
      {isRetroAnim && (
        <style>{`
          /* Scanline effect */
          @keyframes scanline {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100vh); }
          }
          
          .retro-scanline::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 20px;
            background: linear-gradient(to bottom, transparent 0%, rgba(0, 255, 0, 0.1) 50%, transparent 100%);
            pointer-events: none;
            z-index: 9999;
            animation: scanline 8s linear infinite;
          }
          
          /* CRT screen curve effect */
          .retro-screen {
            animation: flicker 0.15s infinite;
          }
          
          @keyframes flicker {
            0% { opacity: 0.97; }
            50% { opacity: 1; }
            100% { opacity: 0.97; }
          }
          
          /* Glowing text */
          .retro-glow {
            text-shadow: 
              0 0 5px rgba(0, 255, 0, 0.8),
              0 0 10px rgba(0, 255, 0, 0.6),
              0 0 20px rgba(0, 255, 0, 0.4);
          }
          
          /* Blinking cursor */
          @keyframes blink {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
          }
          
          .retro-cursor::after {
            content: '█';
            animation: blink 1s infinite;
            margin-left: 2px;
          }
          
          /* Typing animation for headers */
          @keyframes typing {
            from { width: 0; }
            to { width: 100%; }
          }
          
          .retro-typing {
            overflow: hidden;
            white-space: nowrap;
            animation: typing 2s steps(30) 1;
          }
          
          /* Screen glow effect */
          .retro-screen-glow {
            box-shadow: 
              inset 0 0 100px rgba(0, 255, 0, 0.1),
              0 0 50px rgba(0, 255, 0, 0.2);
          }
          
          /* Pixel border animation */
          @keyframes border-pulse {
            0%, 100% { border-color: #00ff00; }
            50% { border-color: #00aa00; }
          }
          
          .retro-border-pulse {
            animation: border-pulse 2s infinite;
          }
          
          /* Noise/static effect */
          @keyframes noise {
            0%, 100% { background-position: 0 0; }
            10% { background-position: -5% -10%; }
            20% { background-position: -15% 5%; }
            30% { background-position: 7% -25%; }
            40% { background-position: 20% 25%; }
            50% { background-position: -25% 10%; }
            60% { background-position: 15% 5%; }
            70% { background-position: 0 15%; }
            80% { background-position: 25% 35%; }
            90% { background-position: -10% 10%; }
          }
          
          .retro-noise::after {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
            pointer-events: none;
            z-index: 9998;
            animation: noise 0.2s infinite;
          }
        `}</style>
      )}

      {/* HEADER */}
      <header className={`sticky top-0 z-50 shadow-sm transition-colors duration-300 ${theme.header}`}>
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col items-center md:flex-row md:justify-between gap-4">
          <div className="text-center md:text-left w-full md:w-auto">
            <h1 className={`text-xl md:text-2xl font-black tracking-tight break-words ${theme.accentText} ${isRetroAnim ? 'retro-glow retro-cursor' : ''}`}>
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
          <div className={`overflow-hidden transition-all ${isRetro ? 'border-2 border-green-600' : 'rounded-xl shadow-sm border border-gray-200'} ${isRetroAnim ? 'retro-border-pulse' : ''} ${theme.card}`}>
            <div className={`px-4 py-2 flex justify-between items-center border-b ${theme.sectionHeaderBg}`}>
              <h3 className={`font-bold text-sm uppercase flex items-center gap-2 ${theme.accentText} ${isRetroAnim ? 'retro-glow' : ''}`}>
                <div className={`w-2 h-2 rounded-full animate-pulse ${isRetro ? 'bg-green-500' : 'bg-green-500'}`}></div>
                Ora Curentă
              </h3>
              <span className={`text-xs font-mono ${theme.textSec} ${isRetroAnim ? 'retro-glow' : ''}`}>LIVE</span>
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
          <div className={`overflow-hidden transition-all ${isRetro ? 'border-2 border-green-800 border-dashed' : 'rounded-xl shadow-sm border border-gray-200'} ${isRetroAnim ? 'retro-border-pulse' : ''} ${theme.card}`}>
             <div className={`px-4 py-2 border-b ${theme.sectionHeaderBg}`}>
              <h3 className={`font-bold text-sm uppercase flex items-center gap-2 ${theme.textMain} ${isRetroAnim ? 'retro-glow' : ''}`}>
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
        <section className={`overflow-hidden transition-all ${isRetro ? 'border-2 border-green-700' : 'rounded-xl shadow-lg border border-gray-200'} ${isRetroAnim ? 'retro-border-pulse' : ''} ${theme.card}`}>
          <div className={`p-4 flex justify-between items-center ${isRetro ? 'border-b border-green-700' : `border-b ${theme.sectionHeaderBg}`}`}>
            <h2 className={`font-bold flex items-center gap-2 ${theme.textMain} ${isRetroAnim ? 'retro-glow' : ''}`}>
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
                     <div className={`w-14 shrink-0 flex flex-col items-center justify-center rounded p-1 ${theme.gridSubHeader} ${isRetroAnim ? 'retro-border-pulse border-2' : ''}`}>
                        <span className={`text-sm font-bold ${isRetroAnim ? 'retro-glow' : ''}`}>{time}</span>
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
        <footer className={`text-center text-xs py-4 ${theme.textSec} ${isRetroAnim ? 'retro-glow' : ''}`}>
          {isRetro ? (
            <>
              <p className="font-mono">{'>'} LAST_UPDATE: {now.toLocaleTimeString()}</p>
              <p className="mt-1 font-mono">
                {'>'} THEME_MODE: <span className="uppercase font-bold text-green-400">[{themeMode}]</span>
              </p>
              <p className="mt-1 font-mono">{'>'} SYSTEM_STATUS: <span className="text-green-400 animate-pulse">ONLINE</span></p>
            </>
          ) : (
            <>
              <p>Ultima actualizare automată: {now.toLocaleTimeString()}</p>
              <p className="mt-1">
                Tema: <span className="uppercase font-bold">{themeMode}</span>
              </p>
            </>
          )}
        </footer>

      </main>
    </div>
  );
}