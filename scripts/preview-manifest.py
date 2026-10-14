"""Build the publish map for the static preview from `out/`.
Usage: python3 scripts/preview-manifest.py [previous-manifest.json] > manifest.json
Files under _next/ are published under w/_next/ (the export uses assetPrefix /w);
other top-level names starting with "_" are reserved by the host and skipped."""
import json, os, sys
m = {}
for d, _, fs in os.walk("out"):
    for f in fs:
        rel = os.path.relpath(os.path.join(d, f), "out")
        if rel == "index.html":
            continue
        top = rel.split(os.sep)[0]
        if top == "_next":
            m["w/" + rel] = rel
        elif not top.startswith("_"):
            m[rel] = rel
if len(sys.argv) > 1:
    for old in json.load(open(sys.argv[1])):
        m.setdefault(old, None)
json.dump(m, sys.stdout, indent=0, sort_keys=True)
