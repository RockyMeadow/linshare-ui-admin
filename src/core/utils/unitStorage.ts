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

export function getReadablUnit (bytes: number) {
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

export class ReadableSize {
  value: number;

  constructor (public bytes: number) {
    if (bytes < 0) {
      this.value = 0;
      this.unit = STORATE_UNITS[0];
    } else {
      const unitIndex = Math.floor(Math.log(bytes) / Math.log(1000));

      this.unit = STORATE_UNITS[unitIndex]
      this.value = +(bytes / STORATE_UNITS[unitIndex].value).toFixed(2)
    }
  }

  set unit (unit: StorageUnit) {
    this.unit = unit;
    this.value = +(this.bytes / unit.value).toFixed(2)
  }

  public toString() {
    return `${this.value} ${this.unit.label}`;
  }
}
