type SectionBadgeProps = {
  text: string;
};

export function SectionBadge({ text }: SectionBadgeProps) {
  return (
    <span className="inline-block rounded-md bg-[#BC2656] px-4 py-1.5 text-sm font-medium text-white md:text-base">
      {text}
    </span>
  );
}
