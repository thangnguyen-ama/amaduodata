import { FunctionDomain } from '../types'

const LABELS: Record<FunctionDomain, string> = {
  product: 'Product',
  ua: 'UA',
  mon: 'Mon',
  creative: 'Creative',
  business: 'Cross-fn'
}

export function FunctionChip({ fn }: { fn: FunctionDomain }) {
  return <span className={`pill chip-${fn}`}>{LABELS[fn]}</span>
}
