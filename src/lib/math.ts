export function radians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function normalizeBetween(
  value: number,
  min: number,
  max: number
): number {
  return (value - min) / (max - min);
}
