export function BrandWord({ name }: { name: string }) {
  const bits = name.trim().split(' ');
  if (bits.length < 2) return name;
  return (
    <>
      {bits.slice(0, -1).join(' ')} <span className="text-accent">{bits[bits.length - 1]}</span>
    </>
  );
}
