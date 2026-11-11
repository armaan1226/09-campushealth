import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Siren,
  PhoneCall,
  ShieldAlert,
  Ambulance,
  X,
  Clock,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { TIET_HOSTELS, playEmergencySirenSound } from '../data/healthData';

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultHostel?: string;
  defaultRoom?: string;
  defaultRoll?: string;
}

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({
  isOpen,
  onClose,
  defaultHostel = 'Hostel J',
  defaultRoom = 'Room 312',
  defaultRoll = '102203491',
}) => {
  const [sosState, setSosState] = useState<'form' | 'dispatched'>('form');
  const [selectedHostel, setSelectedHostel] = useState(defaultHostel);
  const [roomNumber, setRoomNumber] = useState(defaultRoom);
  const [rollNumber, setRollNumber] = useState(defaultRoll);
  const [studentPhone, setStudentPhone] = useState('+91 98765 43210');
  const [emergencyType, setEmergencyType] = useState('High Fever (>103°F) / Rigors');
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Timer when dispatched
  useEffect(() => {
    let interval: number;
    if (sosState === 'dispatched') {
      // Play emergency siren
      if (!isMuted) {
        playEmergencySirenSound();
      }
      interval = window.setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      setSecondsElapsed(0);
    }
    return () => clearInterval(interval);
  }, [sosState, isMuted]);

  const handleTriggerSOS = () => {
    setSosState('dispatched');
  };

  const handleReset = () => {
    setSosState('form');
    setSecondsElapsed(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border-2 border-red-500 overflow-hidden my-auto"
        >
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm animate-pulse">
                <Siren className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold tracking-wide uppercase flex items-center gap-2">
                  TIET 1-Click Midnight SOS
                </h2>
                <p className="text-xs text-red-100 font-medium">
                  Direct Emergency Dispatch • Night Doctor + Hostel Caretaker
                </p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {sosState === 'form' ? (
            /* Emergency Trigger Form */
            <div className="p-6 space-y-5">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="text-xs text-red-900 leading-relaxed">
                  <strong>When to use Midnight SOS:</strong> Severe fever, extreme acute pain, asthma attack, fainting, heavy vomiting, or physical injury after dispensary hours (10:00 PM – 08:00 AM).
                  This immediately activates the on-call medical response team to your hostel room.
                </div>
              </div>

              {/* Patient Location Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Hostel Block</label>
                  <select
                    value={selectedHostel}
                    onChange={(e) => setSelectedHostel(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-red-500 focus:outline-none bg-white"
                  >
                    {TIET_HOSTELS.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Room Number</label>
                  <input
                    type="text"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    placeholder="e.g. Room 312, 3rd Floor"
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Roll Number</label>
                  <input
                    type="text"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Student Phone / Roommate Phone</label>
                  <input
                    type="tel"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Emergency Category */}
              <div className="text-xs">
                <label className="block font-semibold text-slate-700 mb-2">Emergency Condition / Symptoms</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'High Fever (>103°F) / Rigors',
                    'Asthma / Breathlessness',
                    'Severe Food Poisoning / Vomiting',
                    'Accident / Fracture / Severe Cut',
                    'Extreme Allergy / Swelling',
                    'Unconsciousness / Fainting'
                  ].map((symptom) => (
                    <button
                      type="button"
                      key={symptom}
                      onClick={() => setEmergencyType(symptom)}
                      className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                        emergencyType === symptom
                          ? 'border-red-600 bg-red-50 text-red-900 font-bold ring-2 ring-red-500/30'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              </div>

              {/* Big Red Trigger Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleTriggerSOS}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold text-base tracking-wide uppercase shadow-lg shadow-red-600/30 flex items-center justify-center gap-3 active:scale-98 transition-all"
                >
                  <Siren className="w-6 h-6 animate-bounce" />
                  <span>TRANSMIT MIDNIGHT SOS NOW</span>
                </button>
              </div>

              {/* Direct Hotlines */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                <span>Immediate Campus Hotlines:</span>
                <div className="flex gap-2">
                  <a
                    href="tel:01752393000"
                    className="inline-flex items-center gap-1 font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5" /> Dispensary: 0175-2393000
                  </a>
                  <a
                    href="tel:108"
                    className="inline-flex items-center gap-1 font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Ambulance className="w-3.5 h-3.5" /> Ambulance: 108
                  </a>
                </div>
              </div>
            </div>
          ) : (
            /* Live Dispatched Broadcast View */
            <div className="p-6 space-y-6">
              {/* Pulsing Alarm Banner */}
              <div className="bg-red-500 text-white p-5 rounded-2xl text-center space-y-2 relative overflow-hidden animate-siren-flash">
                <div className="flex items-center justify-center gap-2 font-black tracking-widest text-xs uppercase bg-white/20 rounded-full px-3 py-1 w-fit mx-auto">
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
                  DISPATCH BROADCAST ACTIVE • ALERT SENT
                </div>
                <h3 className="text-2xl font-black">
                  HELP IS ON THE WAY TO {selectedHostel.toUpperCase()}
                </h3>
                <p className="text-sm font-semibold text-red-100">
                  {roomNumber} • Student: {rollNumber} ({studentPhone})
                </p>

                <div className="pt-2 text-xs flex items-center justify-center gap-2 font-mono text-red-200">
                  <Clock className="w-4 h-4" />
                  <span>Elapsed Time: {Math.floor(secondsElapsed / 60)}m {secondsElapsed % 60}s</span>
                </div>
              </div>

              {/* Dispatch Chain Status */}
              <div className="space-y-3">
                <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Real-time Responder Status
                </p>

                {/* 1. Night Doctor */}
                <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">On-Duty Medical Officer Alerted</p>
                      <p className="text-[11px] text-slate-500">Dr. Ananya Verma (Dispensary Room 2) • Priority High</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Acknowledged
                  </span>
                </div>

                {/* 2. Hostel Caretaker */}
                <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                      <ShieldAlert className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{selectedHostel} Warden & Caretaker Desk</p>
                      <p className="text-[11px] text-slate-500">Staff dispatched with first-aid kit to {roomNumber}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                    En Route
                  </span>
                </div>

                {/* 3. Campus Ambulance */}
                <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-red-100 text-red-700 flex items-center justify-center">
                      <Ambulance className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Campus 24x7 Ambulance (Van PB-11-9481)</p>
                      <p className="text-[11px] text-slate-500">Driver Sukhminder Singh • ETA ~3 Mins to Hostel Porch</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-full animate-pulse">
                    Rolling
                  </span>
                </div>
              </div>

              {/* Protocol guidance while waiting */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-amber-700" />
                  Immediate First-Aid Protocol ({emergencyType}):
                </div>
                <p className="text-slate-700 pl-5">
                  Keep your hostel room door unlocked so the caretaker and medical staff can enter instantly. 
                  Have a roommate stay beside you. If having breathing difficulty, remain seated upright.
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="px-3 py-2 text-xs font-medium border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  {isMuted ? 'Unmute Alarm' : 'Mute Alarm'}
                </button>
                <div className="flex gap-2">
                  <a
                    href="tel:01752393000"
                    className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-semibold hover:bg-slate-900 flex items-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5" /> Call Dispensary Desk
                  </a>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700"
                  >
                    Mark Resolved / Attended
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
