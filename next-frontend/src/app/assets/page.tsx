import { AssetShow } from '@/components/AssetShow'
import {
  Table,
  TableHead,
  TableBody,
  TableHeadCell,
  TableRow,
  TableCell,
  Button
} from 'flowbite-react'

import { WalletList } from '@/components/WalletList'
import { getMyWallet } from '@/queries/queries'
import { getAssets } from '@/queries/queries'
import Link from 'next/link'
import { AssetsSync } from '@/components/AssetsSync'

export default async function AssetsListPage({
  searchParams
}: {
  searchParams: { wallet_id: string }
}) {
  const assets = await getAssets()

  const { wallet_id } = searchParams

  if (!wallet_id || wallet_id === 'null') {
    return <WalletList />
  }

  const wallet = await getMyWallet(wallet_id)

  if (!wallet) {
    return <WalletList />
  }

  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <article className="format">
        <h1>Ativos</h1>
      </article>
      <div className="overflow-x-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableHeadCell>Ativo</TableHeadCell>
            <TableHeadCell>Cotação</TableHeadCell>
            <TableHeadCell>Comprar/Vender</TableHeadCell>
          </TableHead>
          <TableBody>
            {assets.map((asset, key) => (
              <TableRow key={key}>
                <TableCell>
                  <AssetShow asset={asset} />
                </TableCell>
                <TableCell>R$ {asset.price}</TableCell>
                <TableCell>
                  <Button
                    className="w-fit"
                    color="light"
                    as={Link}
                    href={`/assets/${asset.symbol}?wallet_id=${wallet_id}`}
                  >
                    Comprar/Vender
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <AssetsSync assetsSymbols={assets.map(asset => asset.symbol)} />
    </div>
  )
}
