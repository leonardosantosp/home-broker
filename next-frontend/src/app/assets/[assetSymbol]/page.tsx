import { AssetShow } from '../../../components/AssetShow'
import { Asset, OrderType } from '../../../models'
import { Card, Tabs } from 'flowbite-react'
import { TabsItem } from '../../../components/Tabs'
import { OrderForm } from '@/components/OrderForm'
import { AssetChartComponent } from './AssetChartComponent'
import { WalletList } from '@/components/WalletList'
import { getAssetDailies, getMyWallet } from '@/queries/queries'
import { Time } from 'lightweight-charts'

export async function getAsset(symbol: string): Promise<Asset> {
  const response = await fetch(`http://localhost:3000/assets/${symbol}`)
  //cache
  return response.json()
}

export default async function AssetDashboard({
  params,
  searchParams
}: {
  params: Promise<{ assetSymbol: string }>
  searchParams: Promise<{ wallet_id: string }>
}) {
  const { assetSymbol } = await params
  const asset = await getAsset(assetSymbol)
  const { wallet_id: walletId } = await searchParams
  const assetDailies = await getAssetDailies(assetSymbol)
  const chartData = assetDailies.map(assetDaily => ({
    time: (Date.parse(assetDaily.date) / 1000) as Time,
    value: assetDaily.price
  }))

  if (!walletId) {
    return <WalletList />
  }

  const wallet = await getMyWallet(walletId)

  if (!wallet) {
    return <WalletList />
  }

  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <div className="flex flex-col space-y-2">
        <AssetShow asset={asset} />
        <div className="ml-2 font-bold text-2xl">R$ {asset.price}</div>
      </div>
      <div className="grid grid-cols-5 flex-grow gap-2">
        <div className="col-span-2">
          <Card>
            <Tabs>
              <TabsItem
                active
                title={<div className="text-blue-700">Compra</div>}
              >
                <OrderForm
                  asset={asset}
                  walletId={walletId}
                  type={OrderType.BUY}
                />
              </TabsItem>
              <TabsItem title={<div className="text-red-700">Venda</div>}>
                <OrderForm
                  asset={asset}
                  walletId={walletId}
                  type={OrderType.SELL}
                />
              </TabsItem>
            </Tabs>
          </Card>
        </div>
        <div className="col-span-3 flex flex-grow">
          <AssetChartComponent asset={asset} data={chartData} />
        </div>
      </div>
    </div>
  )
}
