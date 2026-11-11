import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Pill,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  MapPin,
  Bell,
  Info,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { MEDICINE_INVENTORY } from '../data/healthData';

export const MedicineInventory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all');
  const [expandedMedId, setExpandedMedId] = useState<string | null>(null);
  const [subscribedItems, setSubscribedItems] = useState<string[]>([]);
  const [showNotificationToast, setShowNotificationToast] = useState<string | null>(null);

  const categories = [
    'All',
    'Fever & Pain',
    'Stomach & Hydration',
    'Allergy & Cold',
    'Respiratory',
    'Antibiotics',
    'First Aid',
    'Vitamins'
  ];

  const filteredMedicines = useMemo(() => {
    return MEDICINE_INVENTORY.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.usageInstructions.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      const matchesStatus =
        statusFilter === 'all' || item.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, selectedCategory, statusFilter]);

  const toggleSubscribeRestock = (medId: string, medName: string) => {
    if (subscribedItems.includes(medId)) {
      setSubscribedItems((prev) => prev.filter((id) => id !== medId));
    } else {
      setSubscribedItems((prev) => [...prev, medId]);
      setShowNotificationToast(`Alert registered! You'll be notified via SMS/App when ${medName} is restocked at the counter.`);
      setTimeout(() => setShowNotificationToast(null), 4000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {showNotificationToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 text-xs max-w-sm"
          >
            <Bell className="w-4 h-4 text-medical-400 shrink-0" />
            <span>{showNotificationToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
            <Pill className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Campus Pharmacy Stock Tracker
            </h2>
            <p className="text-xs text-slate-500">
              Check live inventory before walking across campus • Updated in real-time by Dispensary Pharmacist
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Counter Open: 08:30 AM - 09:00 PM
          </span>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by drug name (e.g. Paracetamol, Dolo, Asthalin, ORS, Cetirizine)..."
            className="w-full pl-10 pr-4 py-3 text-xs border border-slate-200 rounded-2xl focus:ring-2 focus:ring-medical-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              Clear
            </button>
          )}
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-semibold uppercase tracking-wider text-[11px] mr-1 shrink-0 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" /> Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-medical-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status Filters */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
          <span>Found {filteredMedicines.length} medicine{filteredMedicines.length === 1 ? '' : 's'} matching criteria</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-lg ${statusFilter === 'all' ? 'bg-slate-800 text-white font-medium' : 'hover:bg-slate-100'}`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('in_stock')}
              className={`px-2.5 py-1 rounded-lg ${statusFilter === 'in_stock' ? 'bg-emerald-600 text-white font-medium' : 'hover:bg-slate-100'}`}
            >
              In Stock Only
            </button>
            <button
              onClick={() => setStatusFilter('low_stock')}
              className={`px-2.5 py-1 rounded-lg ${statusFilter === 'low_stock' ? 'bg-amber-600 text-white font-medium' : 'hover:bg-slate-100'}`}
            >
              Low Stock (&lt; 15)
            </button>
            <button
              onClick={() => setStatusFilter('out_of_stock')}
              className={`px-2.5 py-1 rounded-lg ${statusFilter === 'out_of_stock' ? 'bg-red-600 text-white font-medium' : 'hover:bg-slate-100'}`}
            >
              Out of Stock
            </button>
          </div>
        </div>
      </div>

      {/* Medicines Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMedicines.map((med) => {
          const isExpanded = expandedMedId === med.id;
          const isSubscribed = subscribedItems.includes(med.id);

          return (
            <div
              key={med.id}
              className={`bg-white rounded-2xl border transition-all shadow-sm flex flex-col justify-between ${
                med.status === 'out_of_stock'
                  ? 'border-red-200 bg-red-50/20'
                  : med.status === 'low_stock'
                  ? 'border-amber-200'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="p-4 space-y-3">
                {/* Header with status badge */}
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {med.category}
                  </span>

                  {med.status === 'in_stock' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      In Stock ({med.stockCount})
                    </span>
                  ) : med.status === 'low_stock' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full animate-pulse">
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                      Low Stock ({med.stockCount} left)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-700 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">
                      <XCircle className="w-3 h-3 text-red-600" />
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Title & Generic */}
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{med.name}</h4>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{med.genericName}</p>
                </div>

                {/* Dosage form & prescription tag */}
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                    {med.dosageForm}
                  </span>
                  {med.requiresPrescription ? (
                    <span className="bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded font-bold">
                      Rx Required
                    </span>
                  ) : (
                    <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded font-medium">
                      OTC / Walk-in
                    </span>
                  )}
                </div>

                {/* Shelf Rack Location */}
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-medical-600 shrink-0" />
                  <span className="truncate">{med.rackLocation}</span>
                </div>

                {/* Out of Stock Alternative Callout */}
                {med.status === 'out_of_stock' && med.alternative && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900 space-y-1">
                    <p className="font-bold flex items-center gap-1">
                      <Info className="w-3.5 h-3.5 text-red-600" /> Suggested Alternative:
                    </p>
                    <p className="text-[11px] text-red-800">{med.alternative}</p>
                  </div>
                )}

                {/* Expandable details */}
                {isExpanded && (
                  <div className="pt-2 border-t border-slate-100 text-xs space-y-2 text-slate-600">
                    <div>
                      <strong className="text-slate-800">Dosage & Directions:</strong>
                      <p className="text-slate-600 text-[11px] mt-0.5">{med.usageInstructions}</p>
                    </div>
                    <div>
                      <strong className="text-slate-800">Pack Unit:</strong>
                      <p className="text-slate-600 text-[11px] mt-0.5">{med.unit}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="p-3 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl flex items-center justify-between text-xs">
                <button
                  onClick={() => setExpandedMedId(isExpanded ? null : med.id)}
                  className="text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1"
                >
                  <span>{isExpanded ? 'Less details' : 'View usage & info'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {med.status === 'out_of_stock' ? (
                  <button
                    onClick={() => toggleSubscribeRestock(med.id, med.name)}
                    className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-1 text-[11px] transition-colors ${
                      isSubscribed
                        ? 'bg-emerald-100 text-emerald-800 font-bold'
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }`}
                  >
                    <Bell className="w-3 h-3" />
                    <span>{isSubscribed ? 'Subscribed' : 'Alert on Restock'}</span>
                  </button>
                ) : (
                  <span className="text-[11px] text-slate-400 font-mono">
                    Qty: {med.stockCount}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredMedicines.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-800">No medicines found</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search keywords or resetting category filters. You can also consult the pharmacist at Dispensary Counter 1.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setStatusFilter('all');
            }}
            className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-semibold hover:bg-slate-900"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
