export const PRODUCT_LOT_STATUS = {
  PENDING: 'PENDING',
  SENDING: 'SENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  RECEIVED: 'RECEIVED',
} as const

export const RECEIVING_STATUS = {
  BEFORE: 'BEFORE',
  AFTER: 'AFTER',
  DURING: 'DURING',
}
