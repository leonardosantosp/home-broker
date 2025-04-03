export enum OrderType {
  BUY = 'BUY',
  SELL = 'SELL'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  FAILED = 'FAILED'
}

export type Asset = {
  _id: string
  name: string
  symbol: string
  price: number
  image_url: string
}

export type WalletAsset = {
  _id: string
  asset: Asset
  shares: number
}

export type Wallet = {
  _id: string
  assets: WalletAsset[]
}

export type Order = {
  _id: string
  asset: Asset
  price: number
  shares: number
  partial: number
  type: OrderType
  status: OrderStatus
}

export type AssetDaily = {
  _id: string
  asset: Asset
  date: string
  price: number
}
