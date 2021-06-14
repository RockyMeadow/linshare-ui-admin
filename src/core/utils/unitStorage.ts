interface StorageUnit {
  value: number;
  label: string;
}

export const STORATE_UNITS: StorageUnit[] = [
  { value: 1, label: 'B' },
  { value: 1e3, label: 'KB' },
  { value: 1e6, label: 'MB' },
  { value: 1e9, label: 'GB' },
  { value: 1e10, label: 'TB' },
  { value: 1e12, label: 'PB' },
  { value: 1e15, label: 'EB' },
  { value: 1e18, label: 'ZB' },
  { value: Infinity, label: 'YB' }
];

export function getReadable (bytes: number) {
  const unit: StorageUnit = STORATE_UNITS[0];
  const { floor, log } = Math;

  if (bytes < 0) {
    return { value: 0, unit };
  }

  const unitIndex = floor(log(bytes) / log(1000));

  return {
    value: +(bytes / STORATE_UNITS[unitIndex].value).toFixed(2),
    unit: STORATE_UNITS[unitIndex]
  };
}
