const unit = [
  { value: 'B' },
  { max: 1e3, value: 'KB' },
  { max: 1e6, value: 'MB' },
  { max: 1e9, value: 'GB' },
  { max: 1e10, value: 'TB' },
  { max: 1e12, value: 'PB' },
  { max: 1e15, value: 'EB' },
  { max: 1e18, value: 'ZB' },
  { max: Infinity, value: 'YB' }
]

export function getReadableSize (bytes: Number) {
  if (bytes < 1e3) {
    return bytes
  }
}