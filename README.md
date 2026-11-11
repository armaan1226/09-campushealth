# CampusHealth+ — TIET Smart Dispensary & Midnight SOS

> **"Sick at Midnight? No More Standing in Line."**  
> *Built for TIET Campus Suite at Thapar Institute of Engineering & Technology (TIET), Patiala.*

---

## 🎯 Confirmed Problem at TIET Campus
The TIET campus health dispensary currently operates strictly on physical walk-in queues and handwritten paper prescription slips.
- Students with acute 102°F fever must stand in line for 45+ minutes in the dispensary lobby.
- At midnight (11:00 PM – 7:00 AM), sick hostel residents have no direct emergency dispatch line to alert on-call dispensary doctors or wardens with their specific hostel room coordinates.
- Prescriptions on paper gets lost or ruined, causing issues during academic attendance medical leave verification.
- Students walk 15 minutes across campus only to find common medications like inhalers or ORS sachets out of stock.

**CampusHealth+** solves all 4 issues with a clean, medical-grade portal running **100% locally with zero external API keys**.

---

## 🏥 Key Features

### 1. Live Dispensary Queue Display & Token Generator
- **Real-Time Token Display:** Displays current serving token (e.g. `Now Serving Token #14 | Your Token #18 | Estimated Wait: ~12 Mins`).
- **Interactive Simulation:** Advance token button simulates live dispensary patient intake with sound cues.
- **Audio Chime System:** Uses Web Audio API synthesizers to sound authentic hospital ding-dong tones when next tokens are called.
- **Digital Token Issuer:** Students take tokens from their hostel bed without waiting in the physical crowd.
- **Hospital Display TV Mode:** High-contrast full-screen digital signage mode for dispensary lobby monitors.

### 2. 1-Click Midnight SOS Emergency Trigger
- Fast-response emergency modal for midnight medical crises in hostels.
- Dispatches alert chain:
  1. On-call Emergency Doctor (Dr. Ananya Verma).
  2. Hostel Warden & Caretaker desk (e.g. Hostel J Room 312).
  3. Campus 24x7 Ambulance dispatch (Van PB-11-XX-9481, driver ETA ~3 mins).
- Audio siren alarm (synthesized via Web Audio API) with instant mute/unmute control.
- Condition-specific immediate first aid advice (High fever cold sponging, asthma upright seating, recovery position).
- Instant one-tap campus hotlines: Dispensary (`0175-2393000`), Ambulance (`108` / `Ext. 3108`).

### 3. Online Appointment & Slot Booking
- Schedule OPD consultations with campus medical officers:
  - **Dr. Rajiv Sharma** (Chief Medical Officer, MBBS, MD - General Medicine)
  - **Dr. Ananya Verma** (MBBS, DNB - Emergency & General Physician)
  - **Dr. Harpreet Singh** (MS - Orthopedics & Sports Injury)
  - **Dr. Meenakshi Kaur** (MD - Dermatology & Venereology)
- Select time slots, specify symptoms, and generate printable digital appointment slips with reference IDs.

### 4. Real-time Medicine Stock & Pharmacy Tracker
- Search dispensary stock in real-time before walking across campus.
- Filters: Fever & Pain, Stomach & Hydration, Allergy & Cold, Respiratory, Antibiotics, First Aid, Vitamins.
- Stock level badges (`In Stock`, `Low Stock`, `Out of Stock`).
- Shelf/rack location mapping (`Rack A1 Main Counter`, `Emergency Crash Cart Fridge C1`).
- Suggested generic alternatives for out-of-stock medicines (e.g., *Augmentin 625 -> Moxclav 625*).
- Restock alert subscription simulation.

### 5. Digital Prescriptions & Attendance Medical Leave Slip
- Historical dispensary consultation records.
- Triage vitals recorded: Blood Pressure, Pulse, Body Temperature, SpO2, and Weight.
- Medication dosage schedule (TDS, BD, HS) with precautions.
- Official TIET Academic Regulations medical leave certificate generator with verified digital doctor signature stamp.

---

## 🎨 Design System
- **Medical Blue:** `oklch(0.60 0.16 220)` / `#0284c7`
- **Hospital Clean White:** `oklch(1.0 0 0)` / `#ffffff` & `#f8fafc`
- **Emergency Red:** `oklch(0.55 0.22 25)` / `#dc2626`
- **Typography:** Geist & Geist Mono

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Local Installation
```bash
cd 09-campushealth
npm install
npm run dev
```

### Production Build
```bash
npm run build
```
Outputs static assets into `dist/` ready for Vercel or any static host.
