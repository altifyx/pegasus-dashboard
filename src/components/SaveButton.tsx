'use client';

import { useFormStatus } from 'react-dom';
import { Save, Loader2, Check, Plus, AlertOctagon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SaveButton({
  label = 'Save Configuration',
  savingLabel = 'Saving...',
  savedLabel = 'Saved Successfully!',
  className = '',
  icon = 'save',
  variant = 'primary',
}: {
  label?: string;
  savingLabel?: string;
  savedLabel?: string;
  className?: string;
  icon?: 'save' | 'plus' | 'check' | 'alert';
  variant?: 'primary' | 'danger' | 'custom';
}) {
  const { pending } = useFormStatus();
  const [saved, setSaved] = useState(false);
  const [wasPending, setWasPending] = useState(false);

  useEffect(() => {
    if (pending) {
      setWasPending(true);
      setSaved(false);
    } else if (wasPending && !pending) {
      setSaved(true);
      setWasPending(false);
      const timer = setTimeout(() => setSaved(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [pending, wasPending]);

  let baseStyles = 'flex items-center justify-center gap-3 border py-4 font-mono text-xs uppercase font-semibold tracking-wider transition-all rounded-none group ';
  
  if (saved) {
    baseStyles += 'border-emerald-500 bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] ';
  } else if (pending) {
    baseStyles += 'border-white/20 bg-white/10 text-neutral-400 cursor-not-allowed ';
  } else if (variant === 'danger') {
    baseStyles += 'border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-black shadow-[0_0_10px_rgba(239,68,68,0.1)] hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] ';
  } else {
    baseStyles += 'border-[#5E5CE6] bg-[#5E5CE6]/10 text-white hover:bg-[#5E5CE6] hover:text-black shadow-[0_0_10px_rgba(94,92,230,0.1)] hover:shadow-[0_0_20px_rgba(94,92,230,0.4)] ';
  }

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${baseStyles} ${className}`}
    >
      {pending ? (
        <Loader2 className="w-4 h-4 animate-spin text-[#5E5CE6]" />
      ) : saved ? (
        <Check className="w-4 h-4 text-emerald-400 animate-bounce" />
      ) : icon === 'plus' ? (
        <Plus className="w-4 h-4" />
      ) : icon === 'alert' ? (
        <AlertOctagon className="w-4 h-4" />
      ) : (
        <Save className="w-4 h-4" />
      )}
      <span>{pending ? savingLabel : saved ? savedLabel : label}</span>
    </button>
  );
}
