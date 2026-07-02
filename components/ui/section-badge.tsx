type SectionBadgeProps = {
  text: string;
};

export function SectionBadge({ text }: SectionBadgeProps) {
  return (
    <span className="inline-block rounded-xl bg-[#BC2656] px-4 py-1.5 text-sm font-medium text-white shadow-sm max-md:shadow-md md:text-base">
      {text}
    </span>
  );
}
