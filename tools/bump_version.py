"""Mark a new version of the site, so open pages show the "Update now" button.

Run from the repository root before committing a change to any page:

    python3 tools/bump_version.py

It writes a new version (the current time) into version.json and into the
<meta name="site-version"> tag of every page, so they all match.
"""
import datetime
import json
import pathlib
import re

root = pathlib.Path(__file__).resolve().parent.parent
version = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

pages = [p for p in root.rglob("*.html") if ".git" not in p.parts]
tag = re.compile(r'<meta name="site-version" content="[^"]*">')
for page in pages:
    text = page.read_text(encoding="utf-8")
    if tag.search(text):
        page.write_text(tag.sub(f'<meta name="site-version" content="{version}">', text), encoding="utf-8")
        print("updated", page.relative_to(root))
    else:
        print("no site-version tag, skipped", page.relative_to(root))

(root / "version.json").write_text(json.dumps({"version": version}) + "\n", encoding="utf-8")
print("version", version)
