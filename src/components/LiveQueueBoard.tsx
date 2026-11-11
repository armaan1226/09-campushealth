import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Clock,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  CheckCircle2,
  PlusCircle,
  Stethoscope,
  ChevronRight,
  Sparkles,
  Ticket,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { type QueueToken, playHospitalChime, TIET_HOSTELS } from '../data/healthData';

interface LiveQueueBoardProps {
  queueList: QueueToken[];
  currentServingToken: number;
  userToken: QueueToken | null;
  onAdvanceToken: () => void;
  onResetQueue: () => void;
  onTakeToken: (token: Omit<QueueToken, 'id' | 'tokenNumber' | 'status' | 'timeIssued' | 'estimatedWaitMins'>) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const LiveQueueBoard: React.FC<LiveQueueBoardProps> = ({
  queueList,
  currentServingToken,
  userToken,
  onAdvanceToken,
  onResetQueue,
  onTakeToken,
  soundEnabled,
  onToggleSound,
}) => {
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [isTvMode, setIsTvMode] = useState(false);

  // New token form state
  const [formData, setFormData] = useState({
    studentName: 'Arjun Verma',
    rollNumber: '102203491',
    hostel: 'Hostel J',
    symptoms: 'High fever, sore throat and chills',
    doctorAssigned: 'Dr. Rajiv Sharma (Cabin 1)',
    priority: 'normal' as 'normal' | 'urgent',
  });

  const servingItem = queueList.find((q) => q.tokenNumber === currentServingToken && q.status === 'serving') 
    || queueList.find((q) => q.status === 'serving');

  const waitingTokens = queueList.filter((q) => q.status === 'waiting');
  
  // Calculate user position
  const userQueueIndex = userToken ? waitingTokens.findIndex((t) => t.tokenNumber === userToken.tokenNumber) : -1;
  const peopleAhead = userQueueIndex >= 0 ? userQueueIndex : (userToken && userToken.status === 'serving' ? 0 : 0);
  const estimatedUserWait = userToken ? Math.max(2, (peopleAhead + 1) * 3) : 0;

  const handleSubmitToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.rollNumber) return;
    onTakeToken(formData);
    setShowTokenModal(false);
  };

  // Play sound on token change if sound is enabled
  useEffect(() => {
    if (soundEnabled && currentServingToken > 0) {
      playHospitalChime();
    }
  }, [currentServingToken, soundEnabled]);

  return (
    <div className={`space-y-6 ${isTvMode ? 'fixed inset-0 z-50 bg-slate-900 text-white p-8 overflow-y-auto' : ''}`}>
      {/* Top Banner / TV Mode Switch */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-medical-50 text-medical-600 flex items-center justify-center font-bold">
            <Users className="w-5 h-5 text-medical-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              Dispensary Live Queue
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 animate-pulse">
                ● Live Cabin Feed
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Real-time token caller • TIET Campus Dispensary (Near Hostel J & Gate 2)
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Hospital Chime Sound: ON' : 'Hospital Chime Sound: MUTED'}
            className={`p-2.5 rounded-xl border text-sm font-medium transition-colors flex items-center gap-1.5 ${
              soundEnabled
                ? 'bg-medical-50 border-medical-200 text-medical-700'
                : 'bg-slate-100 border-slate-200 text-slate-500'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline text-xs">{soundEnabled ? 'Chime ON' : 'Chime OFF'}</span>
          </button>

          <button
            onClick={() => setIsTvMode(!isTvMode)}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            {isTvMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span>{isTvMode ? 'Exit TV Mode' : 'Hospital Display Mode'}</span>
          </button>

          <button
            onClick={onAdvanceToken}
            className="px-3 py-2 rounded-xl bg-medical-600 hover:bg-medical-700 text-white text-xs font-medium flex items-center gap-1.5 shadow-sm transition-all shadow-medical-500/20 active:scale-95"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Call Next Token</span>
          </button>

          <button
            onClick={onResetQueue}
            title="Reset queue simulation"
            className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bento Grid KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Stat 1: Calling Token */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-medical-700">Now Serving</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <div className="text-3xl font-mono font-black text-slate-900 tracking-tight">
            #{currentServingToken}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1 font-medium">
            <Stethoscope className="w-3.5 h-3.5 text-medical-600" />
            OPD Cabin 1 (General)
          </p>
        </div>

        {/* Stat 2: Queue Depth */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Lobby Waiting</span>
            <Users className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-3xl font-mono font-black text-slate-900 tracking-tight">
            {waitingTokens.length}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Students queued outside</p>
        </div>

        {/* Stat 3: Avg Consultation Time */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Pace of Service</span>
            <Clock className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-3xl font-mono font-black text-slate-900 tracking-tight">
            3.5m
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Avg turnaround / patient</p>
        </div>

        {/* Stat 4: Chime Announcement */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Audio Caller</span>
            <div className={`p-1 rounded-full ${soundEnabled ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
              <Volume2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 py-1">
            <div className="flex items-end gap-0.5 h-5">
              <span className={`w-1 rounded-full bg-medical-500 ${soundEnabled ? 'h-3 animate-pulse' : 'h-1 bg-slate-300'}`} />
              <span className={`w-1 rounded-full bg-medical-600 ${soundEnabled ? 'h-5 animate-pulse delay-75' : 'h-1 bg-slate-300'}`} />
              <span className={`w-1 rounded-full bg-medical-400 ${soundEnabled ? 'h-2 animate-pulse delay-150' : 'h-1 bg-slate-300'}`} />
              <span className={`w-1 rounded-full bg-medical-600 ${soundEnabled ? 'h-4 animate-pulse delay-100' : 'h-1 bg-slate-300'}`} />
            </div>
            <span className="text-xs font-semibold text-slate-800 ml-1">
              {soundEnabled ? 'Audio Chime Armed' : 'Audio Muted'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Broadcasts chime on call</p>
        </div>
      </div>

      {/* Main Highlights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Huge Now Serving Display */}
        <div className="lg:col-span-7 bg-gradient-to-br from-medical-900 via-medical-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          {/* Subtle background radar */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 rounded-full bg-medical-500/10 pointer-events-none blur-2xl"></div>

          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/10 text-medical-200 border border-white/15">
              OPD Token Status
            </span>
            <div className="flex items-center gap-2 text-xs text-medical-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Doctor In Session
            </div>
          </div>

          <div className="my-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-medical-300">
                Now Calling Inside
              </p>
              <div className="flex items-baseline justify-center sm:justify-start gap-3 mt-2">
                <span className="text-6xl sm:text-7xl font-extrabold tracking-tight text-white font-mono drop-shadow">
                  #{currentServingToken.toString().padStart(2, '0')}
                </span>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-base text-medical-200 font-medium">Token</span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30 animate-pulse">
                    <Volume2 className="w-3 h-3 text-emerald-400" />
                    Chime Active
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-300 mt-2 flex items-center gap-2 justify-center sm:justify-start">
                <Stethoscope className="w-4 h-4 text-medical-400" />
                {servingItem ? servingItem.doctorAssigned : 'Dr. Rajiv Sharma (OPD Cabin 1)'}
              </p>
            </div>

            {/* Currently Serving Student Details Pill */}
            <div className="mt-4 sm:mt-0 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-left max-w-xs w-full">
              <p className="text-xs uppercase tracking-wider text-medical-300 font-semibold">Current Patient</p>
              <p className="text-base font-bold text-white mt-1">
                {servingItem?.studentName || 'Consultation in Progress'}
              </p>
              <p className="text-xs text-slate-300 mt-0.5">
                Roll: {servingItem?.rollNumber || '102305018'} • {servingItem?.hostel || 'Hostel H'}
              </p>
              <div className="mt-2 text-xs bg-medical-950/40 px-2.5 py-1 rounded-lg text-medical-200 italic line-clamp-1">
                "{servingItem?.symptoms || 'Symptoms check'}"
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-medical-400" />
              <span>Avg Consult Time: <strong className="text-white">~3.5 Mins</strong></span>
            </div>
            <div className="text-right">
              <span>Waiting in OPD lobby: <strong className="text-white">{waitingTokens.length} students</strong></span>
            </div>
          </div>
        </div>

        {/* Right: Your Active Token Card & Take Token button */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
          {userToken ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-medical-700 bg-medical-50 px-3 py-1 rounded-full">
                  Your Active Token
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                  userToken.status === 'serving'
                    ? 'bg-emerald-100 text-emerald-800 animate-pulse'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {userToken.status === 'serving' ? '🔔 It\'s Your Turn!' : `In Line: ~${estimatedUserWait} Mins`}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-medium">Your Token Number</p>
                  <p className="text-4xl font-extrabold text-medical-700 font-mono mt-1">
                    #{userToken.tokenNumber.toString().padStart(2, '0')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 font-medium">People Ahead</p>
                  <p className="text-3xl font-extrabold text-slate-800 mt-1">
                    {userToken.status === 'serving' ? (
                      <span className="text-emerald-600 text-xl font-bold flex items-center gap-1 justify-end">
                        <CheckCircle2 className="w-5 h-5" /> In Cabin
                      </span>
                    ) : (
                      peopleAhead
                    )}
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1.5 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Patient:</span>
                  <span className="font-semibold text-slate-800">{userToken.studentName} ({userToken.rollNumber})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Hostel Room:</span>
                  <span className="font-semibold text-slate-800">{userToken.hostel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Doctor:</span>
                  <span className="font-semibold text-medical-700">{userToken.doctorAssigned}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Complaint:</span>
                  <span className="font-medium text-slate-600 truncate max-w-[180px]">{userToken.symptoms}</span>
                </div>
              </div>

              {userToken.status === 'serving' ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
                  <strong>Please enter OPD Cabin 1 immediately! The doctor is waiting for you.</strong>
                </div>
              ) : (
                <div className="p-3 bg-medical-50 border border-medical-200 rounded-xl text-medical-900 text-xs flex items-center justify-between">
                  <span>Relax in your hostel or wait in lobby.</span>
                  <span className="font-bold text-medical-700">Estimated: ~{estimatedUserWait} mins</span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-medical-50 text-medical-600 mx-auto flex items-center justify-center">
                <Ticket className="w-8 h-8 text-medical-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">Need to see the Doctor?</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Grab a digital token from your hostel room instead of physically standing in the 45-minute dispensary line.
                </p>
              </div>
              <button
                onClick={() => setShowTokenModal(true)}
                className="w-full py-3 px-4 rounded-xl bg-medical-600 hover:bg-medical-700 text-white font-semibold text-sm shadow-md shadow-medical-600/20 transition-all flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Take Digital Token</span>
              </button>
            </div>
          )}

          {userToken && (
            <button
              onClick={() => setShowTokenModal(true)}
              className="mt-4 w-full py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Issue New / Change Token Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Live Queue Table / Ticket Feed */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800">Today's Token Roster</h3>
            <p className="text-xs text-slate-500">Live order of consultation queue at TIET Dispensary</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
            {waitingTokens.length} in Waiting Lobby
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-400 font-semibold tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-5">Token #</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Hostel</th>
                <th className="py-3 px-4">Doctor & Room</th>
                <th className="py-3 px-4">Symptoms / Reason</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-5 text-right">Est. Wait</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {queueList.map((token) => {
                const isCurrent = token.tokenNumber === currentServingToken && token.status === 'serving';
                const isUser = userToken?.tokenNumber === token.tokenNumber;

                return (
                  <tr
                    key={token.id}
                    className={`transition-colors ${
                      isCurrent
                        ? 'bg-medical-50/70 font-medium'
                        : isUser
                        ? 'bg-amber-50/50'
                        : 'hover:bg-slate-50/60'
                    }`}
                  >
                    <td className="py-3.5 px-5">
                      <span className={`inline-flex items-center justify-center font-mono font-bold px-2.5 py-1 rounded-lg text-xs ${
                        isCurrent
                          ? 'bg-medical-600 text-white shadow-sm'
                          : token.status === 'completed'
                          ? 'bg-slate-100 text-slate-500 line-through'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        #{token.tokenNumber.toString().padStart(2, '0')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      <div className="flex items-center gap-1.5">
                        {token.studentName}
                        {isUser && (
                          <span className="text-[10px] bg-medical-100 text-medical-800 font-bold px-1.5 py-0.5 rounded">
                            YOU
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 font-mono">{token.rollNumber}</div>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-600">
                      {token.hostel}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-700">
                      {token.doctorAssigned}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500 max-w-xs truncate">
                      {token.symptoms}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {token.status === 'serving' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 animate-pulse">
                          ● In Cabin
                        </span>
                      ) : token.status === 'completed' ? (
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                          Completed
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
                          Waiting
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 text-right font-mono text-xs">
                      {token.status === 'serving' ? (
                        <span className="text-emerald-700 font-bold">Now</span>
                      ) : token.status === 'completed' ? (
                        <span className="text-slate-400">—</span>
                      ) : (
                        <span className="text-slate-600">~{token.estimatedWaitMins} min</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal to Grab a New Token */}
      <AnimatePresence>
        {showTokenModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-medical-600" />
                  <h3 className="font-bold text-slate-800 text-base">Issue Dispensary Token</h3>
                </div>
                <button
                  onClick={() => setShowTokenModal(false)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmitToken} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Student Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-500"
                    placeholder="e.g. Arjun Verma"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">TIET Roll Number</label>
                    <input
                      type="text"
                      required
                      value={formData.rollNumber}
                      onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-medical-500"
                      placeholder="102203491"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Hostel & Room</label>
                    <select
                      value={formData.hostel}
                      onChange={(e) => setFormData({ ...formData, hostel: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-500 bg-white"
                    >
                      {TIET_HOSTELS.map((h) => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Doctor / Cabin Required</label>
                  <select
                    value={formData.doctorAssigned}
                    onChange={(e) => setFormData({ ...formData, doctorAssigned: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-500 bg-white"
                  >
                    <option value="Dr. Rajiv Sharma (Cabin 1) - General Medicine (CMO)">Dr. Rajiv Sharma (Cabin 1) - General Medicine (CMO)</option>
                    <option value="Dr. Ananya Verma (Cabin 2) - General Physician & Emergency">Dr. Ananya Verma (Cabin 2) - General & Emergency</option>
                    <option value="Dr. Harpreet Singh (Cabin 3) - Orthopedics">Dr. Harpreet Singh (Cabin 3) - Orthopedics</option>
                    <option value="Dr. Meenakshi Kaur (Cabin 4) - Dermatology">Dr. Meenakshi Kaur (Cabin 4) - Dermatology</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Chief Medical Complaint / Symptoms</label>
                  <textarea
                    rows={2}
                    required
                    value={formData.symptoms}
                    onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-500"
                    placeholder="e.g. Fever 101°F since night, severe headache, sore throat..."
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowTokenModal(false)}
                    className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-medical-600 hover:bg-medical-700 text-white rounded-xl font-semibold shadow-md shadow-medical-600/20"
                  >
                    Generate Digital Token
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
