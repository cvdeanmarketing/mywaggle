"use client";

import { useEffect } from "react";
import { getProduct, type Product } from "@/lib/catalog";
import { toGa4Item, track } from "@/lib/analytics";

/** Fires GA4 `view_item_list` once per mount. */
export function ViewItemList({
  listName,
  handles,
}: {
  listName: string;
  handles: string[];
}) {
  const key = handles.join(",");
  useEffect(() => {
    const items = key
      .split(",")
      .map(getProduct)
      .filter((p): p is Product => Boolean(p))
      .map((p, index) =>
        toGa4Item(p, 1, {
          index,
          item_list_name: listName,
          item_list_id: listName,
        }),
      );
    if (items.length)
      track("view_item_list", {
        item_list_id: listName,
        item_list_name: listName,
        items,
      });
  }, [listName, key]);
  return null;
}
