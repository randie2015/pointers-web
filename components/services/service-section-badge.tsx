import { cn } from '@/lib/utils';

type ServiceSectionBadgeProps = {
  label: string;
  /** `magenta` — fondo magenta (secciones claras). `light` — pastilla clara (sobre fondo magenta). */
  tone?: 'magenta' | 'light';
  className?: string;
};

/** Etiqueta de sección para páginas de servicio — pastilla tallada, jerarquía clara en móvil. */
export function ServiceSectionBadge({ label, tone = 'magenta', className }: ServiceSectionBadgeProps) {
  return (
    <div className={cn('mb-5 flex justify-center sm:mb-6', className)}>
      <span
        className={cn(
          'badge-carved px-4 py-1 text-center',
          'text-xs font-bold uppercase tracking-wider sm:text-sm sm:tracking-widest',
          tone === 'magenta' ? 'badge-carved--brand' : 'badge-carved--light'
        )}
      >
        {label}
      </span>
    </div>
  );
}
