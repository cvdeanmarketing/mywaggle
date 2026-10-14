"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { getProduct } from "@/lib/catalog";
import { toGa4Item, track } from "@/lib/analytics";

/** Product link that reports GA4 `select_item` with list context. */
export function TrackedLink({
  handle,
  listName,
  index,
  ...props
}: ComponentProps<typeof Link> & { handle: string; listName: string; index: number }) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        const p = getProduct(handle);
        if (p) track("select_item", { item_list_name: listName, items: [toGa4Item(p, 1, { index, item_list_name: listName })] });
        props.onClick?.(e);
      }}
    />
  );
}
