#!/usr/bin/env python3
"""
verify-migration.py — Check which /resources/* pages have been migrated to native
Squarespace HTML (crawlable) vs. still rendering only via client-side JS (invisible).

Usage:
    python3 verify-migration.py            # check all pages with pre-generated native HTML
    python3 verify-migration.py <slug> ... # check only the given slugs

A page is considered MIGRATED when its raw HTML (no JS execution) contains the
native content wrapper (.rl-sub) and a healthy visible word count (>300).
That is exactly what Googlebot sees on first crawl, so it is the metric that
determines indexing.
"""
import os
import re
import ssl
import sys
import urllib.request

BASE = "https://riefkohllaw.com/resources"
HERE = os.path.dirname(os.path.abspath(__file__))
NATIVE_DIR = os.path.join(HERE, "native-html")

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE


def visible_words(html: str) -> int:
    h = re.sub(r"(?is)<script.*?</script>", " ", html)
    h = re.sub(r"(?is)<style.*?</style>", " ", h)
    h = re.sub(r"(?is)<[^>]+>", " ", h)
    h = re.sub(r"&[a-z#0-9]+;", " ", h)
    return len(h.split())


def fetch(slug: str):
    url = f"{BASE}/{slug}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (migration-verify)"})
    with urllib.request.urlopen(req, timeout=30, context=ctx) as r:
        return r.status, r.read().decode("utf-8", "ignore")


def main():
    if len(sys.argv) > 1:
        slugs = sys.argv[1:]
    else:
        slugs = sorted(f[:-5] for f in os.listdir(NATIVE_DIR) if f.endswith(".html"))

    print(f"{'slug':<42} {'status':>6} {'rawWords':>9} {'rl-sub':>7}  result")
    print("-" * 82)
    migrated, pending, errors = [], [], []
    for s in slugs:
        try:
            code, html = fetch(s)
        except Exception as e:
            print(f"{s:<42} {'ERR':>6}  {str(e)[:40]}")
            errors.append(s)
            continue
        w = visible_words(html)
        rl = html.count("rl-sub")
        ok = w > 300 and rl > 0
        (migrated if ok else pending).append(s)
        print(f"{s:<42} {code:>6} {w:>9} {rl:>7}  {'MIGRATED ✓' if ok else 'pending'}")
    print("-" * 82)
    print(f"\nMIGRATED: {len(migrated)}   PENDING: {len(pending)}   ERRORS: {len(errors)}")
    if pending:
        print("\nStill to migrate:")
        for s in pending:
            print("   -", s)
    return 1 if pending or errors else 0


if __name__ == "__main__":
    sys.exit(main())
