import { AssetShow } from '@/components/AssetShow'
import { OrderTypeBadge } from '@/components/OrderTypeBadge'
import { OrderStatusBadge } from '@/components/OrderStatusBadge'
import {
  Table,
  TableHead,
  TableBody,
  TableHeadCell,
  TableRow,
  TableCell
} from 'flowbite-react'

import { WalletList } from '@/components/WalletList'
import { getMyWallet, getOrders } from '@/queries/queries'

export default async function OrdersListPage({
  searchParams
}: {
  searchParams: { wallet_id: string }
}) {
  const { wallet_id } = searchParams

  if (!wallet_id || wallet_id === 'null') {
    return <WalletList />
  }

  const wallet = await getMyWallet(wallet_id)

  if (!wallet) {
    return <WalletList />
  }

  const orders = await getOrders(wallet_id)

  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <article className="format">
        <h1>Minhas Ordens</h1>
      </article>
      <div className="overflow-x-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableHeadCell>Ativo</TableHeadCell>
            <TableHeadCell>Preço</TableHeadCell>
            <TableHeadCell>Quantidade</TableHeadCell>
            <TableHeadCell>Tipo</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
          </TableHead>
          <TableBody>
            {orders.map((order, key) => (
              <TableRow key={key}>
                <TableCell>
                  <AssetShow asset={order.asset} />
                </TableCell>
                <TableCell>R$ {order.price} </TableCell>
                <TableCell> {order.shares} </TableCell>
                <TableCell>
                  <OrderTypeBadge type={order.type} />
                </TableCell>
                <TableCell>
                  <OrderStatusBadge status={order.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
