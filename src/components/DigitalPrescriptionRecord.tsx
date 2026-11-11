import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Activity,
  Stethoscope,
  Printer,
  Download,
  CheckCircle2,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { MOCK_PRESCRIPTIONS, type PrescriptionRecord } from '../data/healthData';

export const DigitalPrescriptionRecord: React.FC = () => {
  const [prescriptions] = useState<PrescriptionRecord[]>(MOCK_PRESCRIPTIONS);
  const [selectedRx, setSelectedRx] = useState<PrescriptionRecord>(prescriptions[0]);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Digital Health Records & Dispensary Prescriptions
            </h2>
            <p className="text-xs text-slate-500">
              No lost paper slips • Verified electronic medical history & attendance leave certificates
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCertificateModal(true)}
            className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-purple-600" />
            <span>Generate Medical Leave Slip</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: List of Past Visits */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Consultation History ({prescriptions.length} Records)
          </h3>

          <div className="space-y-2.5">
            {prescriptions.map((rx) => {
              const isSelected = rx.id === selectedRx.id;

              return (
                <div
                  key={rx.id}
                  onClick={() => setSelectedRx(rx)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50/50 shadow-sm ring-2 ring-purple-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-mono font-bold text-purple-700">{rx.id}</p>
                      <h4 className="text-sm font-bold text-slate-800 mt-0.5 line-clamp-1">{rx.diagnosis}</h4>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {rx.visitDate.split(',')[0]}
                    </span>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Stethoscope className="w-3.5 h-3.5 text-purple-600" />
                      {rx.doctorName}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Full Prescription Card */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          {/* Dispensary Header Seal */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-medical-600 text-white flex items-center justify-center font-black text-xl">
                +
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 tracking-tight">
                  THAPAR INSTITUTE OF ENGINEERING & TECHNOLOGY
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  University Health Center & Campus Dispensary • Patiala - 147004
                </p>
              </div>
            </div>

            <div className="text-right text-xs">
              <span className="font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                Rx ID: {selectedRx.id}
              </span>
              <p className="text-slate-400 mt-1">{selectedRx.visitDate}</p>
            </div>
          </div>

          {/* Doctor & Patient Metadata Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div>
              <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Attending Physician</p>
              <p className="text-sm font-bold text-slate-800 mt-0.5">{selectedRx.doctorName}</p>
              <p className="text-slate-600">{selectedRx.doctorSpecialty}</p>
            </div>
            <div>
              <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Student / Patient</p>
              <p className="text-sm font-bold text-slate-800 mt-0.5">Arjun Verma (Roll: 102203491)</p>
              <p className="text-slate-600">Hostel J - Room 312 • Age: 20 Y / M</p>
            </div>
          </div>

          {/* Recorded Vitals at Triage */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-medical-600" />
              Recorded Clinical Vitals
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Blood Pressure</span>
                <p className="text-base font-extrabold text-slate-800 font-mono mt-0.5">
                  {selectedRx.vitals.bloodPressure}
                </p>
                <span className="text-[10px] text-emerald-600 font-medium">Normal Range</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Heart Rate</span>
                <p className="text-base font-extrabold text-slate-800 font-mono mt-0.5">
                  {selectedRx.vitals.heartRate}
                </p>
                <span className="text-[10px] text-emerald-600 font-medium">Resting Normal</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Body Temp</span>
                <p className="text-base font-extrabold text-slate-800 font-mono mt-0.5">
                  {selectedRx.vitals.temperature}
                </p>
                <span className={`text-[10px] font-medium ${
                  parseFloat(selectedRx.vitals.temperature) > 99 ? 'text-amber-600 font-bold' : 'text-emerald-600'
                }`}>
                  {parseFloat(selectedRx.vitals.temperature) > 99 ? 'Pyrexia (Fever)' : 'Afebrile'}
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Oxygen (SpO2)</span>
                <p className="text-base font-extrabold text-slate-800 font-mono mt-0.5">
                  {selectedRx.vitals.spO2}
                </p>
                <span className="text-[10px] text-emerald-600 font-medium">Optimal</span>
              </div>
            </div>
          </div>

          {/* Clinical Diagnosis */}
          <div className="p-4 bg-medical-50/70 border border-medical-200 rounded-2xl">
            <p className="text-[10px] font-bold uppercase tracking-wider text-medical-800">Clinical Diagnosis</p>
            <p className="text-base font-extrabold text-slate-900 mt-1">{selectedRx.diagnosis}</p>
          </div>

          {/* Prescribed Medications */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Prescribed Medicines (Dispensary Pharmacy)
            </p>
            <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 text-[11px]">
                  <tr>
                    <th className="py-2.5 px-4">Medicine Name</th>
                    <th className="py-2.5 px-3">Dosage Schedule</th>
                    <th className="py-2.5 px-3">Duration</th>
                    <th className="py-2.5 px-4">Instructions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedRx.medicines.map((m, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-bold text-slate-800">{m.medicineName}</td>
                      <td className="py-3 px-3 font-mono text-purple-700 font-medium">{m.dosage}</td>
                      <td className="py-3 px-3 font-medium text-slate-700">{m.duration}</td>
                      <td className="py-3 px-4 text-slate-500 italic">{m.instructions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Doctor's Advice & Medical Leave */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-2">
            <div>
              <strong className="text-slate-800 font-bold">Doctor's Clinical Advice:</strong>
              <p className="text-slate-600 mt-0.5">{selectedRx.doctorAdvice}</p>
            </div>
            {selectedRx.medicalLeaveRecommended && (
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-emerald-800 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Medical Leave of Absence Recommended: {selectedRx.medicalLeaveDays} Days
                </span>
                <button
                  onClick={() => setShowCertificateModal(true)}
                  className="text-xs font-bold text-purple-700 hover:text-purple-800 underline"
                >
                  View Digital Certificate
                </button>
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <span className="text-[11px] text-slate-400">
              Digitally verified & recorded in TIET Health Information System
            </span>
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Rx Slip</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Medical Certificate Modal */}
      <AnimatePresence>
        {showCertificateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-5"
            >
              <div className="text-center space-y-1 pb-4 border-b border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  TIET Health Centre • Official Record
                </span>
                <h3 className="text-lg font-black text-slate-900 uppercase">
                  Medical Fitness & Leave Certificate
                </h3>
                <p className="text-xs text-slate-500">Ref: TIET/HC/ML-{selectedRx.id}</p>
              </div>

              <div className="space-y-3 text-xs text-slate-700 leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <p>
                  This is to certify that <strong>Arjun Verma</strong>, Roll No. <strong>102203491</strong>, residing at <strong>Hostel J, Room 312</strong>, was examined at the TIET Campus Dispensary on <strong>{selectedRx.visitDate}</strong>.
                </p>
                <p>
                  Patient was diagnosed with <strong>{selectedRx.diagnosis}</strong> and was advised complete rest in hostel quarters for <strong>{selectedRx.medicalLeaveDays || 2} days</strong> from the date of consultation.
                </p>
                <p className="text-slate-500 italic pt-1">
                  This document serves as clinical justification for attendance exemption per Thapar Institute Academic Regulations.
                </p>
              </div>

              <div className="pt-3 flex items-center justify-between text-xs border-t border-slate-100">
                <div className="space-y-0.5">
                  <p className="font-bold text-slate-800">{selectedRx.doctorName}</p>
                  <p className="text-slate-500">{selectedRx.doctorSpecialty}</p>
                  <p className="text-[10px] text-emerald-700 font-bold">✓ Digital Signature Verified</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowCertificateModal(false)}
                    className="px-3.5 py-2 border border-slate-200 text-slate-600 rounded-xl font-medium"
                  >
                    Close
                  </button>
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
