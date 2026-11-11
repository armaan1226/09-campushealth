import { useState, useEffect } from 'react';
import {
  Users,
  Pill,
  CalendarCheck,
  FileText,
  Siren,
  Ambulance,
  HeartPulse,
  Sparkles,
  MapPin,
  Stethoscope,
  ShieldAlert,
  Sun,
  Moon,
} from 'lucide-react';
import {
  INITIAL_QUEUES,
  INITIAL_DOCTORS,
  type QueueToken,
  playHospitalChime,
} from './data/healthData';
import { LiveQueueBoard } from './components/LiveQueueBoard';
import { EmergencySOSModal } from './components/EmergencySOSModal';
import { AppointmentBooking } from './components/AppointmentBooking';
import { MedicineInventory } from './components/MedicineInventory';
import { DigitalPrescriptionRecord } from './components/DigitalPrescriptionRecord';

export function App() {
  const [activeTab, setActiveTab] = useState<'queue' | 'pharmacy' | 'appointments' | 'prescriptions' | 'doctors'>('queue');
  const [queueList, setQueueList] = useState<QueueToken[]>(INITIAL_QUEUES);
  const [currentServingToken, setCurrentServingToken] = useState<number>(14);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isSosOpen, setIsSosOpen] = useState<boolean>(false);

  // Light Mode default, Dark Mode toggle
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('campushealth_theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('campushealth_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('campushealth_theme', 'light');
    }
  }, [isDark]);

  // Active user token (starts with pre-filled Arjun Verma #18)
  const [userToken, setUserToken] = useState<QueueToken | null>(
    INITIAL_QUEUES.find((q) => q.tokenNumber === 18) || null
  );

  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Advance queue simulation
  const handleAdvanceToken = () => {
    const nextTokenNum = currentServingToken + 1;
    setCurrentServingToken(nextTokenNum);

    setQueueList((prev) =>
      prev.map((item) => {
        if (item.tokenNumber === currentServingToken) {
          return { ...item, status: 'completed' };
        }
        if (item.tokenNumber === nextTokenNum) {
          return { ...item, status: 'serving' };
        }
        if (item.status === 'waiting') {
          return {
            ...item,
            estimatedWaitMins: Math.max(1, item.estimatedWaitMins - 3),
          };
        }
        return item;
      })
    );

    // If it's user's turn
    if (userToken && userToken.tokenNumber === nextTokenNum) {
      setUserToken((prev) => (prev ? { ...prev, status: 'serving' } : null));
      setNotificationMsg("🔔 Attention! It is YOUR turn now! Please proceed inside OPD Cabin 1.");
      if (soundEnabled) {
        playHospitalChime();
      }
      setTimeout(() => setNotificationMsg(null), 8000);
    } else {
      setNotificationMsg(`Calling Token #${nextTokenNum} to OPD Consultation Room.`);
      setTimeout(() => setNotificationMsg(null), 3500);
    }
  };

  const handleResetQueue = () => {
    setCurrentServingToken(14);
    setQueueList(INITIAL_QUEUES);
    setUserToken(INITIAL_QUEUES.find((q) => q.tokenNumber === 18) || null);
    setNotificationMsg("Queue state reset to default demo simulation.");
    setTimeout(() => setNotificationMsg(null), 3000);
  };

  const handleTakeToken = (formData: Omit<QueueToken, 'id' | 'tokenNumber' | 'status' | 'timeIssued' | 'estimatedWaitMins'>) => {
    const highestToken = Math.max(...queueList.map((q) => q.tokenNumber), 19);
    const newTokenNum = highestToken + 1;
    const waitingCount = queueList.filter((q) => q.status === 'waiting').length;

    const newToken: QueueToken = {
      ...formData,
      id: `token-${Date.now()}`,
      tokenNumber: newTokenNum,
      status: 'waiting',
      timeIssued: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedWaitMins: (waitingCount + 1) * 3,
    };

    setQueueList((prev) => [...prev, newToken]);
    setUserToken(newToken);
    setNotificationMsg(`🎟️ Success! You have been issued Token #${newTokenNum}. Estimated wait: ~${newToken.estimatedWaitMins} mins.`);
    setTimeout(() => setNotificationMsg(null), 6000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-medical-500 selection:text-white transition-colors duration-200">
      {/* Top Advisory Ticker */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-400">DISPENSARY ACTIVE</span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-slate-300 hidden sm:inline">
              OPD Hours: 08:00 AM – 08:00 PM • 24x7 Emergency Ward Open (Near Hostel G)
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-slate-300 hidden md:inline">
              Night On-Call Doctor: <strong className="text-white">Dr. Ananya Verma</strong>
            </span>
            <a
              href="tel:01752393108"
              className="text-red-400 font-semibold hover:text-red-300 flex items-center gap-1"
            >
              <Ambulance className="w-3.5 h-3.5" /> Ambulance: Ext. 3108
            </a>
          </div>
        </div>
      </div>

      {/* Main Hospital Header */}
      <header className="bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-sm backdrop-blur-md transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          {/* Logo & Institute Branding */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-medical-600 to-medical-500 text-white flex items-center justify-center shadow-md shadow-medical-500/20">
              <HeartPulse className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  CampusHealth<span className="text-medical-600 dark:text-medical-400">+</span>
                </h1>
                <span className="text-[10px] font-bold bg-medical-50 dark:bg-medical-950/60 text-medical-700 dark:text-medical-300 px-2 py-0.5 rounded-full border border-medical-200 dark:border-medical-800 uppercase tracking-wider">
                  TIET Patiala
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Smart Dispensary Queue &amp; 24x7 Hostel Emergency Response
              </p>
            </div>
          </div>

          {/* User Status Badge, Theme Toggle & Emergency SOS Action */}
          <div className="flex items-center gap-3">
            {/* Active Token Pill if exists */}
            {userToken && (
              <div
                onClick={() => setActiveTab('queue')}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-medical-50 dark:bg-slate-800 border border-medical-200 dark:border-slate-700 text-xs cursor-pointer hover:bg-medical-100 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-medical-600 animate-pulse"></div>
                <span className="text-medical-900 dark:text-slate-200 font-medium">
                  Your Token: <strong className="font-mono font-bold">#{userToken.tokenNumber}</strong>
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600 dark:text-slate-400">
                  {userToken.status === 'serving' ? 'Calling You Now!' : `~${Math.max(2, (userToken.tokenNumber - currentServingToken) * 3)}m wait`}
                </span>
              </div>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDark((prev) => !prev)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-400 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer shadow-xs flex items-center gap-1.5 text-xs font-semibold"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'}</span>
            </button>

            {/* 1-CLICK MIDNIGHT SOS BUTTON */}
            <button
              onClick={() => setIsSosOpen(true)}
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-md shadow-red-600/30 hover:shadow-lg hover:shadow-red-600/40 transition-all flex items-center gap-2 animate-pulse active:scale-95 cursor-pointer"
            >
              <Siren className="w-4 h-4 text-white" />
              <span>1-CLICK MIDNIGHT SOS</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none text-xs font-semibold">
            <button
              onClick={() => setActiveTab('queue')}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'queue'
                  ? 'bg-medical-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Live Queue Display</span>
              <span className="font-mono text-[10px] px-1.5 py-0.2 bg-white/20 rounded">
                #{currentServingToken}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('pharmacy')}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'pharmacy'
                  ? 'bg-medical-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Pill className="w-4 h-4" />
              <span>Medicine Stock Tracker</span>
            </button>

            <button
              onClick={() => setActiveTab('appointments')}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'appointments'
                  ? 'bg-medical-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book OPD Slot</span>
            </button>

            <button
              onClick={() => setActiveTab('prescriptions')}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'prescriptions'
                  ? 'bg-medical-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Digital Prescriptions &amp; Leave</span>
            </button>

            <button
              onClick={() => setActiveTab('doctors')}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'doctors'
                  ? 'bg-medical-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>Doctors Directory</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Floating System Notification */}
      {notificationMsg && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 border border-medical-500 text-white text-xs py-3 px-4 rounded-xl shadow-2xl flex items-center gap-2.5 animate-bounce">
          <Sparkles className="w-4 h-4 text-medical-400 shrink-0" />
          <span className="font-medium">{notificationMsg}</span>
        </div>
      )}

      {/* Main Tab Views Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full">
        {activeTab === 'queue' && (
          <LiveQueueBoard
            queueList={queueList}
            currentServingToken={currentServingToken}
            userToken={userToken}
            onAdvanceToken={handleAdvanceToken}
            onResetQueue={handleResetQueue}
            onTakeToken={handleTakeToken}
            soundEnabled={soundEnabled}
            onToggleSound={() => setSoundEnabled(!soundEnabled)}
          />
        )}

        {activeTab === 'pharmacy' && <MedicineInventory />}

        {activeTab === 'appointments' && (
          <AppointmentBooking
            onBookingSuccess={(appt) => {
              setNotificationMsg(`✅ OPD slot confirmed with ${appt.doctorName} for ${appt.time}!`);
              setTimeout(() => setNotificationMsg(null), 5000);
            }}
          />
        )}

        {activeTab === 'prescriptions' && <DigitalPrescriptionRecord />}

        {activeTab === 'doctors' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-medical-600 dark:text-medical-400" />
                TIET Campus Medical Officers &amp; Specialists
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Full-time campus medical officers, visiting specialists, and 24x7 emergency duty doctors at TIET Dispensary.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {INITIAL_DOCTORS.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-medical-300 dark:hover:border-medical-700 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-medical-50 dark:bg-slate-800 border border-medical-100 dark:border-slate-700 flex items-center justify-center font-bold text-medical-700 dark:text-medical-400 text-lg">
                          {doc.name.split(' ')[1]?.[0] || 'D'}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-white text-sm">{doc.name}</h3>
                          <span className="text-xs text-medical-600 dark:text-medical-400 font-medium block">
                            {doc.specialty}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          doc.status === 'available'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                            : 'bg-slate-100 text-slate-500 border border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                        }`}
                      >
                        {doc.status === 'available' ? '● On Duty' : 'Off Duty'}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Cabin / Chamber:</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{doc.room}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Qualifications:</span>
                        <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300">{doc.qualification}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400">OPD Timings:</span>
                        <span className="font-medium text-slate-800 dark:text-slate-200">{doc.timing}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('appointments')}
                      className="w-full py-2 rounded-xl text-xs font-semibold bg-medical-50 dark:bg-slate-800 text-medical-700 dark:text-medical-300 hover:bg-medical-100 dark:hover:bg-slate-700 border border-medical-200 dark:border-slate-700 transition-colors cursor-pointer text-center"
                    >
                      Book OPD Consultation
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Emergency Contacts Banner */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 border border-slate-700 space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold">
                  <ShieldAlert className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base">Campus Emergency Protocol &amp; Direct Dial</h4>
                  <p className="text-xs text-slate-400">Save these numbers in your phone for emergency after-hours medical assistance</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-slate-400 block text-[11px]">Dispensary Reception</span>
                  <a href="tel:01752393000" className="text-sm font-bold text-white hover:text-medical-300">
                    0175-2393000 / Ext. 3000
                  </a>
                </div>
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-slate-400 block text-[11px]">Campus 24x7 Ambulance</span>
                  <a href="tel:01752393108" className="text-sm font-bold text-red-400 hover:text-red-300">
                    0175-2393108 / Ext. 3108
                  </a>
                </div>
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-slate-400 block text-[11px]">Chief Warden Office</span>
                  <a href="tel:01752393111" className="text-sm font-bold text-white hover:text-medical-300">
                    0175-2393111 / Ext. 3111
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Midnight SOS Modal */}
      <EmergencySOSModal
        isOpen={isSosOpen}
        onClose={() => setIsSosOpen(false)}
        defaultHostel={userToken?.hostel.split(' - ')[0] || 'Hostel J'}
        defaultRoom={userToken?.hostel.includes('Room') ? userToken.hostel.split(' - ')[1] : 'Room 312'}
        defaultRoll={userToken?.rollNumber || '102203491'}
      />

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 mt-12 py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800 dark:text-slate-200">CampusHealth+</span>
            <span>• Built for TIET Campus Suite at TIET Patiala</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Dispensary Near Hostel J</span>
            <span>•</span>
            <span>100% Client-side Offline Ready</span>
            <span>•</span>
            <span className="text-medical-600 dark:text-medical-400 font-semibold">Zero API Keys</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
