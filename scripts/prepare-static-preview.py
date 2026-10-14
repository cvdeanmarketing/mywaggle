"""Post-process `out/` from STATIC_EXPORT=1 so it can be published as a static preview:
replace literal U+FFFD characters in JS/CSS with the equivalent escape sequence."""
import pathlib
for f in pathlib.Path("out").rglob("*"):
    if f.suffix in {".js", ".css"}:
        s = f.read_text(encoding="utf-8")
        if "�" in s:
            f.write_text(s.replace("�", "\\uFFFD"), encoding="utf-8")
            print("fixed", f)
