type SectionBadgeProps = {
  text: string;
  variant?: 'brand' | 'purple';
};

export function SectionBadge({ text, variant = 'brand' }: SectionBadgeProps) {
  return (
    <span
      className={
        variant === 'purple'
          ? 'inline-block rounded-xl bg-[#5E549D] px-4 py-1.5 text-sm font-medium text-white shadow-sm max-md:shadow-md md:text-base'
          : 'inline-block rounded-xl bg-[#BC2656] px-4 py-1.5 text-sm font-medium text-white shadow-sm max-md:shadow-md md:text-base'
      }
    >
      {text}
    </span>
  );
}
