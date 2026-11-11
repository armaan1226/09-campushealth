import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Printer,
  CalendarCheck
} from 'lucide-react';
import { INITIAL_DOCTORS, AVAILABLE_SLOTS, TIET_HOSTELS } from '../data/healthData';

interface AppointmentBookingProps {
  onBookingSuccess?: (appointment: BookedAppointment) => void;
}

export interface BookedAppointment {
  id: string;
  doctorName: string;
  specialty: string;
  room: string;
  date: string;
  time: string;
  studentName: string;
  rollNumber: string;
  hostel: string;
  reason: string;
  bookingRef: string;
  timestamp: string;
}

export const AppointmentBooking: React.FC<AppointmentBookingProps> = ({ onBookingSuccess }) => {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('doc-1');
  const [selectedSlotId, setSelectedSlotId] = useState<string>('s-1');
  const [studentName, setStudentName] = useState('Arjun Verma');
  const [rollNumber, setRollNumber] = useState('102203491');
  const [hostel, setHostel] = useState('Hostel J');
  const [symptoms, setSymptoms] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState<BookedAppointment | null>(null);

  // Filter slots for chosen doctor
  const doctorSlots = AVAILABLE_SLOTS.filter((s) => s.doctorId === selectedDoctorId);
  const activeDoctor = INITIAL_DOCTORS.find((d) => d.id === selectedDoctorId);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !rollNumber || !selectedSlotId) return;

    const slot = AVAILABLE_SLOTS.find((s) => s.id === selectedSlotId);
    if (!slot || !activeDoctor) return;

    const newBooking: BookedAppointment = {
      id: `apt-${Date.now()}`,
      doctorName: activeDoctor.name,
      specialty: activeDoctor.specialty,
      room: activeDoctor.room,
      date: slot.date,
      time: slot.time,
      studentName,
      rollNumber,
      hostel,
      reason: symptoms || 'General OPD Consultation & Checkup',
      bookingRef: `TIET-OPD-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setBookingConfirmed(newBooking);
    if (onBookingSuccess) {
      onBookingSuccess(newBooking);
    }
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-medical-600" />
            Book OPD Consultation Slot
          </h2>
          <p className="text-xs text-slate-500">
            Skip physical queue lines • Reserve direct time with campus medical officers
          </p>
        </div>
        <div className="text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          Dispensary Working Hours: <strong className="text-slate-800">8:00 AM – 8:00 PM</strong> (24x7 ER)
        </div>
      </div>

      <AnimatePresence mode="wait">
        {bookingConfirmed ? (
          /* Confirmation Slip Card */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/30 shadow-lg space-y-6 relative overflow-hidden"
          >
            {/* Top green ribbon */}
            <div className="bg-emerald-50 text-emerald-800 p-4 rounded-2xl border border-emerald-200 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base">OPD Slot Confirmed Successfully!</h4>
                  <p className="text-xs text-emerald-700">Digital Appointment Slip issued for TIET Health Center</p>
                </div>
              </div>
              <span className="font-mono text-xs font-bold bg-white text-emerald-800 px-3 py-1 rounded-lg border border-emerald-200">
                {bookingConfirmed.bookingRef}
              </span>
            </div>

            {/* Slip Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
              <div className="space-y-3">
                <p className="font-bold uppercase tracking-wider text-slate-400">Consultation Details</p>
                <div className="space-y-1.5">
                  <p className="text-sm font-bold text-slate-900">{bookingConfirmed.doctorName}</p>
                  <p className="text-medical-700 font-medium">{bookingConfirmed.specialty}</p>
                  <p className="text-slate-600">Location: <strong>{bookingConfirmed.room}</strong> (Dispensary Wing)</p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      <Calendar className="w-3.5 h-3.5 text-medical-600" /> {bookingConfirmed.date}
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      <Clock className="w-3.5 h-3.5 text-medical-600" /> {bookingConfirmed.time}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-bold uppercase tracking-wider text-slate-400">Student Patient</p>
                <div className="space-y-1.5">
                  <p className="text-sm font-bold text-slate-900">{bookingConfirmed.studentName}</p>
                  <p className="text-slate-600 font-mono">Roll: {bookingConfirmed.rollNumber}</p>
                  <p className="text-slate-600">Hostel: {bookingConfirmed.hostel}</p>
                  <p className="text-slate-600">Chief Complaint: <em>{bookingConfirmed.reason}</em></p>
                </div>
              </div>
            </div>

            {/* Dispensary instructions */}
            <div className="text-xs text-slate-600 bg-blue-50/70 p-4 rounded-xl border border-blue-100 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-medical-600 shrink-0 mt-0.5" />
              <span>
                Please arrive at the dispensary 5 minutes before your slot time ({bookingConfirmed.time}). Show this digital slip or quote ref <strong>{bookingConfirmed.bookingRef}</strong> at the reception desk.
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => setBookingConfirmed(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Book Another Appointment
              </button>
              <button
                onClick={handlePrintSlip}
                className="px-5 py-2.5 bg-medical-600 hover:bg-medical-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-md shadow-medical-600/20"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save Slip</span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* Booking Form */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Step 1: Doctor Selection (Left 5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                1. Select Consulting Doctor
              </h3>

              <div className="space-y-2.5">
                {INITIAL_DOCTORS.map((doc) => {
                  const isSelected = doc.id === selectedDoctorId;
                  return (
                    <div
                      key={doc.id}
                      onClick={() => {
                        setSelectedDoctorId(doc.id);
                        const firstSlot = AVAILABLE_SLOTS.find((s) => s.doctorId === doc.id);
                        if (firstSlot) setSelectedSlotId(firstSlot.id);
                      }}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-medical-500 bg-medical-50/60 shadow-sm ring-2 ring-medical-500/20'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl text-white font-bold flex items-center justify-center text-sm ${doc.avatarBg}`}>
                            {doc.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 text-sm">{doc.name}</h4>
                            <p className="text-xs text-medical-700 font-medium">{doc.specialty}</p>
                            <p className="text-[11px] text-slate-500">{doc.qualification}</p>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          doc.status === 'available'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {doc.room}
                        </span>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {doc.timing}
                        </span>
                        <span className="font-medium text-slate-600">
                          {doc.availableDays.join(', ')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Slot & Patient Form (Right 7 cols) */}
            <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                2. Select Slot & Student Information
              </h3>

              <form onSubmit={handleBook} className="space-y-4 text-xs">
                {/* Available Slots */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-2">
                    Available OPD Time Slots with {activeDoctor?.name}:
                  </label>
                  {doctorSlots.length === 0 ? (
                    <p className="text-slate-400 italic py-2">No direct open slots for this doctor today. Walk-in queue available.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {doctorSlots.map((slot) => {
                        const isChosen = slot.id === selectedSlotId;
                        return (
                          <button
                            type="button"
                            key={slot.id}
                            onClick={() => setSelectedSlotId(slot.id)}
                            className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                              isChosen
                                ? 'border-medical-600 bg-medical-50 text-medical-900 font-bold ring-2 ring-medical-500/20'
                                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <div className="space-y-0.5">
                              <div className="font-semibold">{slot.date}</div>
                              <div className="text-slate-500 text-[11px]">{slot.time}</div>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 bg-white border border-slate-200 rounded font-mono">
                              {slot.room}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Patient Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Student Full Name</label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">TIET Roll Number</label>
                    <input
                      type="text"
                      required
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl font-mono focus:ring-2 focus:ring-medical-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Hostel Block</label>
                    <select
                      value={hostel}
                      onChange={(e) => setHostel(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:outline-none bg-white"
                    >
                      {TIET_HOSTELS.map((h) => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      defaultValue="+91 98765 43210"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl font-mono focus:ring-2 focus:ring-medical-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Symptoms or Reason for Visit
                  </label>
                  <textarea
                    rows={2}
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="e.g. Mild headache, throat irritation for 2 days, feeling tired..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!selectedSlotId}
                    className="w-full py-3 bg-medical-600 hover:bg-medical-700 text-white font-bold rounded-xl shadow-md shadow-medical-600/20 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Confirm Consultation Appointment</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
