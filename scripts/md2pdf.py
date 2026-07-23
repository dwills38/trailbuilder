"""md -> styled HTML -> headless-Chrome PDF (BuildMyMTB deliverables pipeline)."""
import sys, subprocess, tempfile, pathlib, time
import markdown

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
CSS = """
body{font-family:Segoe UI,Arial,sans-serif;font-size:10.5pt;line-height:1.45;color:#1a1a1a;
     max-width:100%;margin:0;padding:0 6px}
h1{font-size:19pt;border-bottom:2px solid #2a6;padding-bottom:4px}
h2{font-size:14pt;margin-top:1.4em;border-bottom:1px solid #ccc;padding-bottom:2px}
h3{font-size:12pt;margin-top:1.2em}
table{border-collapse:collapse;width:100%;font-size:9pt;margin:8px 0}
th,td{border:1px solid #bbb;padding:4px 6px;text-align:left;vertical-align:top}
th{background:#eef5ef}
code{background:#f2f2f2;padding:1px 3px;border-radius:3px;font-size:9pt}
blockquote{border-left:4px solid #2a6;margin:8px 0;padding:4px 12px;background:#f6faf7}
a{color:#186a3b;text-decoration:none;word-break:break-all}
tr,blockquote{page-break-inside:avoid}
"""

def main(md_path, pdf_path):
    run_start = time.time()

    chrome_path = pathlib.Path(CHROME)
    if not chrome_path.exists():
        raise FileNotFoundError(f"Chrome executable not found at: {CHROME}")

    out_path = pathlib.Path(pdf_path).resolve()
    out_path.parent.mkdir(parents=True, exist_ok=True)

    md_text = pathlib.Path(md_path).read_text(encoding="utf-8")
    body = markdown.markdown(md_text, extensions=["tables", "fenced_code"])
    html = f"<!doctype html><meta charset='utf-8'><style>{CSS}</style><body>{body}</body>"
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False, encoding="utf-8") as f:
        f.write(html)
        tmp = f.name

    subprocess.run([str(chrome_path), "--headless", "--disable-gpu", "--no-pdf-header-footer",
                    f"--print-to-pdf={out_path}", pathlib.Path(tmp).as_uri()], check=True)

    if not out_path.exists():
        raise RuntimeError(f"Chrome exited 0 but did not create the output file: {out_path}")
    size = out_path.stat().st_size
    if size == 0:
        raise RuntimeError(f"Output file is empty (0 bytes): {out_path}")
    if out_path.stat().st_mtime < run_start:
        raise RuntimeError(f"Output file was not updated by this run (stale file): {out_path}")

    print(f"wrote {out_path} ({size} bytes)")

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
