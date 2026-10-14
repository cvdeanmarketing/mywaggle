import { Radio, Satellite, Wifi, Link2 } from "lucide-react";
import { CONNECTIVITY_LABELS, type Connectivity } from "@/lib/catalog";

const ICONS = {
  cellular: Radio,
  wifi: Wifi,
  satellite: Satellite,
  "local-wireless": Link2,
} as const;

export function ConnectivityTags({
  connectivity,
}: {
  connectivity: Connectivity[];
}) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Connectivity">
      {connectivity.map((c) => {
        const Icon = ICONS[c];
        return (
          <li
            key={c}
            className="inline-flex items-center gap-1 rounded-full bg-sand px-2.5 py-1 text-[11px] font-bold text-ink"
          >
            <Icon className="size-3.5" aria-hidden />
            {CONNECTIVITY_LABELS[c]}
          </li>
        );
      })}
    </ul>
  );
}
