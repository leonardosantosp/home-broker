'use client'

import { TableRow, TableCell, Button } from 'flowbite-react'
import { AssetShow } from '@/components/AssetShow'
import Link from 'next/link'
import { WalletAsset } from '@/models'
import { UseAssetStore } from '@/store'
import { useShallow } from 'zustand/shallow'

export function TableWalletAssetRow(props: {
  walletAsset: WalletAsset
  walletId: string
}) {
  const { walletAsset, walletId } = props
  const assetFound = UseAssetStore(
    useShallow(state =>
      state.assets.find(a => a.symbol === walletAsset.asset.symbol)
    )
  )

  const asset = assetFound || walletAsset.asset

  return (
    <TableRow>
      <TableCell>
        <AssetShow asset={asset} />
      </TableCell>
      <TableCell>R$ {asset.price}</TableCell>
      <TableCell>{walletAsset.shares}</TableCell>
      <TableCell>
        <Button
          className="w-fit"
          color="light"
          as={Link}
          href={`/assets/${asset.symbol}?wallet_id=${walletId}`}
        >
          Comprar/Vender
        </Button>
      </TableCell>
    </TableRow>
  )
}
