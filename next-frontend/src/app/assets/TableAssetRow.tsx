'use client'

import { TableRow, TableCell, Button } from 'flowbite-react'
import { AssetShow } from '@/components/AssetShow'
import Link from 'next/link'
import { Asset } from '@/models'
import { UseAssetStore } from '@/store'
import { useShallow } from 'zustand/shallow'

export function TableAssetRow(props: { asset: Asset; walletId: string }) {
  const { asset, walletId } = props
  const assetFound = UseAssetStore(
    useShallow(state => state.assets.find(a => a.symbol === asset.symbol))
  )

  const asset_ = assetFound || asset

  return (
    <TableRow>
      <TableCell>
        <AssetShow asset={asset_} />
      </TableCell>
      <TableCell>R$ {asset_.price}</TableCell>
      <TableCell>
        <Button
          className="w-fit"
          color="light"
          as={Link}
          href={`/assets/${asset_.symbol}?wallet_id=${walletId}`}
        >
          Comprar/Vender
        </Button>
      </TableCell>
    </TableRow>
  )
}
