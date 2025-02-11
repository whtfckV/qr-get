export type dialogTypes = 'payment' | 'expense'
export type Props = {
  closeDialog: () => void
  type: dialogTypes
}
