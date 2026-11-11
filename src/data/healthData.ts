// CampusHealth+ — TIET Smart Dispensary Mock Data & Models

export interface Doctor {
  id: string;
  name: string;
  qualification: string;
  specialty: string;
  room: string;
  shift: string;
  timing: string;
  status: 'available' | 'on_break' | 'in_consultation' | 'night_shift';
  avatarBg: string;
  availableDays: string[];
}

export interface QueueToken {
  id: string;
  tokenNumber: number;
  studentName: string;
  rollNumber: string;
  hostel: string;
  symptoms: string;
  doctorAssigned: string;
  status: 'serving' | 'waiting' | 'completed' | 'missed';
  timeIssued: string;
  estimatedWaitMins: number;
  priority: 'normal' | 'urgent';
}

export interface MedicineItem {
  id: string;
  name: string;
  genericName: string;
  category: 'Fever & Pain' | 'Antibiotics' | 'Allergy & Cold' | 'Stomach & Hydration' | 'Respiratory' | 'First Aid' | 'Vitamins';
  stockCount: number;
  unit: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  rackLocation: string;
  dosageForm: 'Tablet' | 'Capsule' | 'Syrup' | 'Sachet' | 'Inhaler' | 'Ointment' | 'Spray';
  requiresPrescription: boolean;
  alternative?: string;
  usageInstructions: string;
}

export interface PrescriptionRecord {
  id: string;
  visitDate: string;
  doctorName: string;
  doctorSpecialty: string;
  diagnosis: string;
  vitals: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    spO2: string;
    weight: string;
  };
  medicines: {
    medicineName: string;
    dosage: string;
    duration: string;
    instructions: string;
  }[];
  doctorAdvice: string;
  medicalLeaveRecommended: boolean;
  medicalLeaveDays?: number;
}

export interface AppointmentSlot {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  room: string;
  status: 'available' | 'booked';
}

export const TIET_HOSTELS = [
  'Hostel A', 'Hostel B', 'Hostel C', 'Hostel D', 'Hostel E',
  'Hostel G', 'Hostel H', 'Hostel I', 'Hostel J', 'Hostel K',
  'Hostel L', 'Hostel M', 'Hostel N', 'Hostel O', 'Hostel PG',
  'Girls Hostel A', 'Girls Hostel B', 'Girls Hostel C', 'Girls Hostel N', 'Girls Hostel PG'
];

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Rajiv Sharma',
    qualification: 'MBBS, MD (Medicine)',
    specialty: 'Chief Medical Officer (CMO)',
    room: 'OPD Cabin 1',
    shift: 'Morning & Evening',
    timing: '09:00 AM - 01:00 PM | 04:00 PM - 07:00 PM',
    status: 'available',
    avatarBg: 'bg-blue-600',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  {
    id: 'doc-2',
    name: 'Dr. Ananya Verma',
    qualification: 'MBBS, DNB (Emergency Care)',
    specialty: 'General Physician & Trauma Care',
    room: 'OPD Cabin 2',
    shift: 'Evening & Night Shift',
    timing: '02:00 PM - 10:00 PM (On-Call Midnight SOS)',
    status: 'in_consultation',
    avatarBg: 'bg-emerald-600',
    availableDays: ['Mon', 'Wed', 'Thu', 'Fri', 'Sun'],
  },
  {
    id: 'doc-3',
    name: 'Dr. Harpreet Singh',
    qualification: 'MS (Orthopedics)',
    specialty: 'Consultant Orthopedic Surgeon',
    room: 'OPD Cabin 3',
    shift: 'Alternate Days (OPD)',
    timing: '10:00 AM - 01:00 PM',
    status: 'available',
    avatarBg: 'bg-purple-600',
    availableDays: ['Tue', 'Thu', 'Sat'],
  },
  {
    id: 'doc-4',
    name: 'Dr. Meenakshi Kaur',
    qualification: 'MD (Dermatology, Venereology)',
    specialty: 'Consultant Dermatologist',
    room: 'OPD Cabin 4',
    shift: 'Afternoon Specialty',
    timing: '02:00 PM - 05:00 PM',
    status: 'available',
    avatarBg: 'bg-rose-600',
    availableDays: ['Mon', 'Wed', 'Fri'],
  }
];

export const INITIAL_QUEUES: QueueToken[] = [
  {
    id: 't-12',
    tokenNumber: 12,
    studentName: 'Amanpreet Singh',
    rollNumber: '102103112',
    hostel: 'Hostel J',
    symptoms: 'High grade fever & body ache',
    doctorAssigned: 'Dr. Rajiv Sharma (Cabin 1)',
    status: 'completed',
    timeIssued: '10:15 AM',
    estimatedWaitMins: 0,
    priority: 'normal',
  },
  {
    id: 't-13',
    tokenNumber: 13,
    studentName: 'Sneha Gupta',
    rollNumber: '102204205',
    hostel: 'Hostel N',
    symptoms: 'Throat infection and cough',
    doctorAssigned: 'Dr. Rajiv Sharma (Cabin 1)',
    status: 'completed',
    timeIssued: '10:20 AM',
    estimatedWaitMins: 0,
    priority: 'normal',
  },
  {
    id: 't-14',
    tokenNumber: 14,
    studentName: 'Rohan Mehra',
    rollNumber: '102305018',
    hostel: 'Hostel H',
    symptoms: 'Acute migraine & dizziness',
    doctorAssigned: 'Dr. Rajiv Sharma (Cabin 1)',
    status: 'serving',
    timeIssued: '10:30 AM',
    estimatedWaitMins: 1,
    priority: 'normal',
  },
  {
    id: 't-15',
    tokenNumber: 15,
    studentName: 'Harshita Sethi',
    rollNumber: '102217088',
    hostel: 'Girls Hostel C',
    symptoms: 'Stomach cramp & nausea',
    doctorAssigned: 'Dr. Rajiv Sharma (Cabin 1)',
    status: 'waiting',
    timeIssued: '10:34 AM',
    estimatedWaitMins: 4,
    priority: 'normal',
  },
  {
    id: 't-16',
    tokenNumber: 16,
    studentName: 'Tushar Aggarwal',
    rollNumber: '102103440',
    hostel: 'Hostel B',
    symptoms: 'Gym ankle twist sprain',
    doctorAssigned: 'Dr. Harpreet Singh (Cabin 3)',
    status: 'waiting',
    timeIssued: '10:38 AM',
    estimatedWaitMins: 7,
    priority: 'normal',
  },
  {
    id: 't-17',
    tokenNumber: 17,
    studentName: 'Kavya Nair',
    rollNumber: '102301192',
    hostel: 'Girls Hostel N',
    symptoms: 'Persistent dry cough & mild asthma',
    doctorAssigned: 'Dr. Rajiv Sharma (Cabin 1)',
    status: 'waiting',
    timeIssued: '10:41 AM',
    estimatedWaitMins: 10,
    priority: 'normal',
  },
  {
    id: 't-18',
    tokenNumber: 18,
    studentName: 'Arjun Verma (You)',
    rollNumber: '102203491',
    hostel: 'Hostel J - Room 312',
    symptoms: 'Fever 101.5°F & severe chills',
    doctorAssigned: 'Dr. Rajiv Sharma (Cabin 1)',
    status: 'waiting',
    timeIssued: '10:44 AM',
    estimatedWaitMins: 13,
    priority: 'normal',
  },
  {
    id: 't-19',
    tokenNumber: 19,
    studentName: 'Devansh Batra',
    rollNumber: '102408014',
    hostel: 'Hostel M',
    symptoms: 'Skin rash with burning sensation',
    doctorAssigned: 'Dr. Meenakshi Kaur (Cabin 4)',
    status: 'waiting',
    timeIssued: '10:48 AM',
    estimatedWaitMins: 17,
    priority: 'normal',
  }
];

export const MEDICINE_INVENTORY: MedicineItem[] = [
  {
    id: 'med-1',
    name: 'Dolo 650mg / Paracetamol',
    genericName: 'Paracetamol IP 650 mg',
    category: 'Fever & Pain',
    stockCount: 420,
    unit: 'Tablets (42 strips)',
    status: 'in_stock',
    rackLocation: 'Rack A1 (Dispensary Main Counter)',
    dosageForm: 'Tablet',
    requiresPrescription: false,
    usageInstructions: 'Take 1 tablet after meals every 6-8 hours for fever > 100°F. Do not exceed 4 tablets/day.',
  },
  {
    id: 'med-2',
    name: 'Electral / ORS Powder',
    genericName: 'Oral Rehydration Salts IP (WHO Formula)',
    category: 'Stomach & Hydration',
    stockCount: 185,
    unit: 'Sachets',
    status: 'in_stock',
    rackLocation: 'Rack B2 (Hydration Stand)',
    dosageForm: 'Sachet',
    requiresPrescription: false,
    usageInstructions: 'Dissolve entire sachet in 1 Litre of clean drinking water. Consume within 24 hours.',
  },
  {
    id: 'med-3',
    name: 'Cetzine 10mg / Cetirizine',
    genericName: 'Cetirizine Hydrochloride 10 mg',
    category: 'Allergy & Cold',
    stockCount: 210,
    unit: 'Tablets (21 strips)',
    status: 'in_stock',
    rackLocation: 'Rack A3',
    dosageForm: 'Tablet',
    requiresPrescription: false,
    usageInstructions: 'Take 1 tablet at night before sleep for allergic rhinitis, runny nose, or itching.',
  },
  {
    id: 'med-4',
    name: 'Asthalin Inhaler 100mcg',
    genericName: 'Salbutamol Inhalation Aerosol IP',
    category: 'Respiratory',
    stockCount: 8,
    unit: 'Inhaler Canisters',
    status: 'low_stock',
    rackLocation: 'Emergency Crash Cart / Fridge C1',
    dosageForm: 'Inhaler',
    requiresPrescription: true,
    alternative: 'Budecort Inhaler / Nebulization in Dispensary ER',
    usageInstructions: '1 to 2 puffs during acute bronchospasm. Shake well before use.',
  },
  {
    id: 'med-5',
    name: 'Pan-D (Pantoprazole + Domperidone)',
    genericName: 'Pantoprazole 40mg + Domperidone 30mg SR',
    category: 'Stomach & Hydration',
    stockCount: 95,
    unit: 'Capsules',
    status: 'in_stock',
    rackLocation: 'Rack B1',
    dosageForm: 'Capsule',
    requiresPrescription: false,
    usageInstructions: 'Take 1 capsule 30 minutes before breakfast with plain water for hyperacidity/GERD.',
  },
  {
    id: 'med-6',
    name: 'Azee 500mg / Azithromycin',
    genericName: 'Azithromycin IP 500 mg',
    category: 'Antibiotics',
    stockCount: 45,
    unit: 'Tablets (15 strips)',
    status: 'in_stock',
    rackLocation: 'Prescription Locker P1',
    dosageForm: 'Tablet',
    requiresPrescription: true,
    usageInstructions: 'Take 1 tablet daily 1 hour before or 2 hours after food for 3 consecutive days.',
  },
  {
    id: 'med-7',
    name: 'Augmentin 625 Duo',
    genericName: 'Amoxicillin 500mg + Potassium Clavulanate 125mg',
    category: 'Antibiotics',
    stockCount: 0,
    unit: 'Tablets',
    status: 'out_of_stock',
    rackLocation: 'Locker P2 (Awaiting supply batch)',
    dosageForm: 'Tablet',
    requiresPrescription: true,
    alternative: 'Moxclav 625 or Cefixime 200mg (Available at Dispensary Desk)',
    usageInstructions: 'Antibiotic for bacterial infection. Take strictly after food.',
  },
  {
    id: 'med-8',
    name: 'Volini Pain Relief Gel & Spray',
    genericName: 'Diclofenac Diethylamine + Methyl Salicylate',
    category: 'First Aid',
    stockCount: 34,
    unit: 'Tubes / Spray Cans',
    status: 'in_stock',
    rackLocation: 'Trauma & Dressing Rack D1',
    dosageForm: 'Spray',
    requiresPrescription: false,
    usageInstructions: 'Apply gently over sprained ankle or aching muscular zone 3 times a day. Do not rub vigorously.',
  },
  {
    id: 'med-9',
    name: 'Betadine 10% Antiseptic Solution & Ointment',
    genericName: 'Povidone Iodine 10% w/w',
    category: 'First Aid',
    stockCount: 62,
    unit: 'Bottles / Tubes',
    status: 'in_stock',
    rackLocation: 'Dressing Room Cabinet',
    dosageForm: 'Ointment',
    requiresPrescription: false,
    usageInstructions: 'Clean wound with saline first, apply thin antiseptic layer and cover with sterile gauze.',
  },
  {
    id: 'med-10',
    name: 'Emeset 4mg (Ondansetron)',
    genericName: 'Ondansetron Hydrochloride 4 mg',
    category: 'Stomach & Hydration',
    stockCount: 50,
    unit: 'Mouth Dissolving Tablets',
    status: 'in_stock',
    rackLocation: 'Emergency Rack E2',
    dosageForm: 'Tablet',
    requiresPrescription: true,
    usageInstructions: 'Disperse on tongue for rapid relief from acute vomiting or food poisoning nausea.',
  },
  {
    id: 'med-11',
    name: 'Sinarest-LP / Decongestant',
    genericName: 'Paracetamol + Phenylephrine + Chlorpheniramine',
    category: 'Allergy & Cold',
    stockCount: 130,
    unit: 'Tablets',
    status: 'in_stock',
    rackLocation: 'Rack A2',
    dosageForm: 'Tablet',
    requiresPrescription: false,
    usageInstructions: 'For cold, sinus congestion and headache. Take 1 tablet after meals.',
  },
  {
    id: 'med-12',
    name: 'Becosules-Z / Multivitamin',
    genericName: 'B-Complex with Vitamin C & Zinc',
    category: 'Vitamins',
    stockCount: 160,
    unit: 'Capsules',
    status: 'in_stock',
    rackLocation: 'Rack C4',
    dosageForm: 'Capsule',
    requiresPrescription: false,
    usageInstructions: '1 capsule daily after breakfast to accelerate recovery and reduce mouth ulcers.',
  }
];

export const MOCK_PRESCRIPTIONS: PrescriptionRecord[] = [
  {
    id: 'rx-2025-0891',
    visitDate: '24 Oct 2025, 11:30 AM',
    doctorName: 'Dr. Rajiv Sharma',
    doctorSpecialty: 'Chief Medical Officer (CMO)',
    diagnosis: 'Acute Viral Pharyngitis with Pyrexia (Viral Fever)',
    vitals: {
      bloodPressure: '118/76 mmHg',
      heartRate: '88 bpm',
      temperature: '101.2 °F',
      spO2: '99%',
      weight: '68 kg'
    },
    medicines: [
      {
        medicineName: 'Tab Dolo 650mg',
        dosage: '1 tab TDS (Three times a day)',
        duration: '3 Days',
        instructions: 'Take strictly after meals for fever control.'
      },
      {
        medicineName: 'Tab Cetzine 10mg',
        dosage: '1 tab HS (At bedtime)',
        duration: '5 Days',
        instructions: 'May cause drowsiness. Drink warm fluids.'
      },
      {
        medicineName: 'Warm Saline Gargles',
        dosage: '3 times daily',
        duration: '4 Days',
        instructions: 'Mix 1/2 tsp salt in warm water.'
      }
    ],
    doctorAdvice: 'Complete rest advised in hostel room. Maintain hydration with ORS and fresh coconut water. Avoid cold cafeteria drinks.',
    medicalLeaveRecommended: true,
    medicalLeaveDays: 2
  },
  {
    id: 'rx-2025-0412',
    visitDate: '12 Sep 2025, 04:15 PM',
    doctorName: 'Dr. Harpreet Singh',
    doctorSpecialty: 'Consultant Orthopedic Surgeon',
    diagnosis: 'Right Lateral Ankle Ligament Sprain (Grade 1 - Basketball Court)',
    vitals: {
      bloodPressure: '122/80 mmHg',
      heartRate: '76 bpm',
      temperature: '98.4 °F',
      spO2: '99%',
      weight: '68.5 kg'
    },
    medicines: [
      {
        medicineName: 'Tab Combiflam (Ibuprofen + Paracetamol)',
        dosage: '1 tab BD (Twice a day)',
        duration: '3 Days',
        instructions: 'Take after meals to relieve inflammatory pain.'
      },
      {
        medicineName: 'Volini Pain Relief Spray',
        dosage: 'Topical spray TDS',
        duration: '5 Days',
        instructions: 'Spray around ankle swelling without hard massage.'
      },
      {
        medicineName: 'Crepe Bandage Application',
        dosage: 'Firm 8-figure wrap',
        duration: '7 Days',
        instructions: 'Remove at night before sleeping.'
      }
    ],
    doctorAdvice: 'Follow R.I.C.E. protocol: Rest, Ice pack 15 mins thrice daily, Compression bandage, Elevation on pillow while resting.',
    medicalLeaveRecommended: true,
    medicalLeaveDays: 3
  }
];

export const AVAILABLE_SLOTS: AppointmentSlot[] = [
  { id: 's-1', doctorId: 'doc-1', doctorName: 'Dr. Rajiv Sharma', specialty: 'General Medicine (CMO)', date: 'Today (Nov 11)', time: '11:30 AM', room: 'OPD Cabin 1', status: 'available' },
  { id: 's-2', doctorId: 'doc-1', doctorName: 'Dr. Rajiv Sharma', specialty: 'General Medicine (CMO)', date: 'Today (Nov 11)', time: '12:15 PM', room: 'OPD Cabin 1', status: 'available' },
  { id: 's-3', doctorId: 'doc-1', doctorName: 'Dr. Rajiv Sharma', specialty: 'General Medicine (CMO)', date: 'Today (Nov 11)', time: '04:30 PM', room: 'OPD Cabin 1', status: 'available' },
  { id: 's-4', doctorId: 'doc-2', doctorName: 'Dr. Ananya Verma', specialty: 'General Physician & Emergency', date: 'Today (Nov 11)', time: '03:00 PM', room: 'OPD Cabin 2', status: 'available' },
  { id: 's-5', doctorId: 'doc-2', doctorName: 'Dr. Ananya Verma', specialty: 'General Physician & Emergency', date: 'Today (Nov 11)', time: '06:00 PM', room: 'OPD Cabin 2', status: 'available' },
  { id: 's-6', doctorId: 'doc-3', doctorName: 'Dr. Harpreet Singh', specialty: 'Orthopedics & Sports Injury', date: 'Tomorrow (Nov 12)', time: '10:30 AM', room: 'OPD Cabin 3', status: 'available' },
  { id: 's-7', doctorId: 'doc-3', doctorName: 'Dr. Harpreet Singh', specialty: 'Orthopedics & Sports Injury', date: 'Tomorrow (Nov 12)', time: '11:45 AM', room: 'OPD Cabin 3', status: 'available' },
  { id: 's-8', doctorId: 'doc-4', doctorName: 'Dr. Meenakshi Kaur', specialty: 'Dermatology & Skin Care', date: 'Wednesday (Nov 13)', time: '02:30 PM', room: 'OPD Cabin 4', status: 'available' },
  { id: 's-9', doctorId: 'doc-4', doctorName: 'Dr. Meenakshi Kaur', specialty: 'Dermatology & Skin Care', date: 'Wednesday (Nov 13)', time: '03:45 PM', room: 'OPD Cabin 4', status: 'available' },
];

/**
 * Web Audio API synthesizer for Hospital Token Announcement and SOS Siren.
 * 100% local, runs anywhere without external audio assets!
 */
export function playHospitalChime() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    // Note 1: E5 (659 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, ctx.currentTime);
    gain1.gain.setValueAtTime(0.2, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.5);

    // Note 2: C5 (523 Hz) - hospital chime ding-dong interval
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(523.25, ctx.currentTime + 0.28);
    gain2.gain.setValueAtTime(0, ctx.currentTime);
    gain2.gain.setValueAtTime(0.25, ctx.currentTime + 0.28);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.28);
    osc2.stop(ctx.currentTime + 0.95);
  } catch {
    // Ignore audio autoplay restrictions
  }
}

export function playEmergencySirenSound() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    const now = ctx.currentTime;
    
    // Siren wail modulation
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.linearRampToValueAtTime(880, now + 0.4);
    osc.frequency.linearRampToValueAtTime(440, now + 0.8);
    osc.frequency.linearRampToValueAtTime(880, now + 1.2);
    osc.frequency.linearRampToValueAtTime(440, now + 1.6);
    
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.7);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 1.8);
  } catch {
    // Audio autoplay fail-safe
  }
}
