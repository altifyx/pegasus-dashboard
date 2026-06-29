'use client';

import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface MultiSelectProps {
  name: string;
  options: { value: string; label: string }[];
  initialSelected?: string[];
  placeholder?: string;
  typeLabel?: string; // 'channel' | 'role' | 'item'
}

export default function MultiSelect({
  name,
  options,
  initialSelected = [],
  placeholder = 'Select options...',
  typeLabel = 'item',
}: MultiSelectProps) {
  const [selected, setSelected] = useState<string[]>(initialSelected);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value && !selected.includes(value)) {
      setSelected([...selected, value]);
    }
    e.target.value = ''; // reset select
  };

  const handleRemove = (valueToRemove: string) => {
    setSelected(selected.filter(val => val !== valueToRemove));
  };

  // Build a map for quick label lookup
  const optionsMap = new Map(options.map(opt => [opt.value, opt.label]));

  return (
    <div className="space-y-3 font-mono text-xs w-full">
      {/* Hidden input to store JSON array for FormData server actions */}
      <input type="hidden" name={name} value={JSON.stringify(selected)} />

      {/* Selector Dropdown */}
      <div className="relative">
        <select
          onChange={handleSelectChange}
          defaultValue=""
          className="w-full bg-black border border-white/10 px-4 py-3 text-white rounded-none focus:border-[#5E5CE6] focus:outline-none transition-colors appearance-none pr-10"
        >
          <option value="" disabled className="text-neutral-500">
            {placeholder}
          </option>
          {options.map(opt => {
            const isAlreadySelected = selected.includes(opt.value);
            return (
              <option
                key={opt.value}
                value={opt.value}
                disabled={isAlreadySelected}
                className={isAlreadySelected ? 'text-neutral-600 bg-neutral-900' : 'text-white'}
              >
                {opt.label} {isAlreadySelected ? '(Added)' : ''}
              </option>
            );
          })}
        </select>
        <div className="absolute right-3.5 top-3.5 pointer-events-none text-neutral-500">
          <Plus className="w-4 h-4 text-[#5E5CE6]" />
        </div>
      </div>

      {/* Display selected tags/badges on the dashboard */}
      <div className="flex flex-wrap gap-2 pt-1">
        {selected.length === 0 ? (
          <div className="text-[11px] text-neutral-500 italic">
            No {typeLabel}s selected yet.
          </div>
        ) : (
          selected.map(val => {
            const label = optionsMap.get(val) || `${typeLabel === 'role' ? '@' : '#'}${val}`;
            return (
              <span
                key={val}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#5E5CE6]/10 text-white border border-[#5E5CE6]/30 rounded-none text-[11px] tracking-wide group hover:border-[#5E5CE6] transition-colors"
              >
                <span className="text-[#5E5CE6] font-semibold">{label}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(val)}
                  className="text-neutral-400 hover:text-red-400 transition-colors p-0.5"
                  title={`Remove ${label}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            );
          })
        )}
      </div>
    </div>
  );
}
