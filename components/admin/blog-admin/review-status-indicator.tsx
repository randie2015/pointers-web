import { CheckCircle2, Clock3 } from 'lucide-react';

type ReviewStatusIndicatorProps = {
  reviewed: boolean;
  onChange: (reviewed: boolean) => void;
  disabled?: boolean;
};

export function ReviewStatusIndicator({
  reviewed,
  onChange,
  disabled = false
}: ReviewStatusIndicatorProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-white/85">Estado de revisión</p>
          <p className="mt-1 text-xs leading-relaxed text-white/50">
            Solo el admin marca si el contenido está listo para salir al blog público.
          </p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={reviewed}
          disabled={disabled}
          onClick={() => onChange(!reviewed)}
          className={[
            'relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition',
            reviewed ? 'bg-emerald-500' : 'bg-white/15',
            disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
          ].join(' ')}
        >
          <span
            className={[
              'inline-block h-5 w-5 transform rounded-full bg-white shadow transition',
              reviewed ? 'translate-x-6' : 'translate-x-1'
            ].join(' ')}
          />
        </button>
      </div>

      <div
        className={[
          'mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold',
          reviewed
            ? 'bg-emerald-500/15 text-emerald-300'
            : 'bg-amber-500/15 text-amber-200'
        ].join(' ')}
      >
        {reviewed ? <CheckCircle2 size={14} /> : <Clock3 size={14} />}
        {reviewed ? 'Listo para publicar' : 'Pendiente de revisión'}
      </div>
    </div>
  );
}
