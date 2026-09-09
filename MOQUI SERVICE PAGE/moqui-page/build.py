#!/usr/bin/env python3
"""
Validate every page in this project and regenerate its standalone
build: one self contained file with the CSS, JavaScript and every
image inlined, so it can be emailed or opened anywhere.

Pages built:
  index.html    ->  preview-standalone.html      the service page
  landing.html  ->  landing-standalone.html      the conversion page

Usage:  python3 build.py            build every page
        python3 build.py landing    build one page by name
"""
import base64, json, mimetypes, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
os.chdir(HERE)

# Each page names the stylesheets and scripts it links, in load order,
# so the standalone build inlines exactly what the page actually uses.
PAGES = [
    {
        'name': 'index',
        'html': 'index.html',
        'out': 'preview-standalone.html',
        'css': ['styles.css'],
        'js': ['script.js'],
    },
    {
        'name': 'landing',
        'html': 'landing.html',
        'out': 'landing-standalone.html',
        'css': ['styles.css', 'landing.css'],
        'js': ['script.js', 'landing.js'],
    },
]

# British spellings the house style bans. hotwax.co uses American.
BRITISH = ('fulfilment', 'licence', 'catalogue', 'modelling', 'organisation',
           'authorisation', 'optimise', 'sceptic', 'travelled', 'behaviour',
           'colour', 'centre', 'analyse', 'recognise')


def check(page):
    """Return a list of problems. Empty list means the page is good."""
    problems = []
    html = open(page['html'], encoding='utf-8').read()

    if any(d in html for d in ('—', '–', '&mdash;', '&ndash;', '&#8211;', '&#8212;')):
        problems.append('em or en dash (or HTML entity) found in %s' % page['html'])
    for tag in ('section', 'div', 'article'):
        if html.count('<' + tag) != html.count('</%s>' % tag):
            problems.append('unbalanced <%s> tags: %d open, %d close'
                            % (tag, html.count('<' + tag), html.count('</%s>' % tag)))
    if html.count('<h1') != 1:
        problems.append('expected exactly one <h1>, found %d' % html.count('<h1'))

    # duplicate ids break every in-page anchor that follows them
    ids = re.findall(r'id="([^"]+)"', html)
    dupes = sorted({i for i in ids if ids.count(i) > 1})
    if dupes:
        problems.append('duplicate id attributes: %s' % ', '.join(dupes))

    # an anchor pointing at nothing is a dead end mid-funnel
    dead = sorted({a for a in re.findall(r'href="#([^"]+)"', html)
                   if a and a not in ids})
    if dead:
        problems.append('anchors with no target: %s' % ', '.join('#' + d for d in dead))

    # Visible copy, with <script> and <style> bodies removed so the
    # structured data cannot vouch for itself further down.
    stripped = re.sub(r'<(script|style)\b[^>]*>.*?</\1>', ' ', html, flags=re.S | re.I)
    body = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', stripped)).strip()

    # The title and the meta description are copy too. They are what a
    # visitor reads in the search result, and they sit inside
    # attributes, so the tag stripper above throws them away.
    meta = ' '.join(re.findall(r'<title>(.*?)</title>', html, re.S)
                    + re.findall(r'<meta[^>]+content="([^"]*)"', html))

    hits = sorted({w for w in BRITISH if w in (body + ' ' + meta).lower()})
    if hits:
        problems.append('British spelling in copy: %s' % ', '.join(hits))
    if '—' in meta or '–' in meta:
        problems.append('em or en dash in the title or a meta description')

    blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.S)
    graph = []
    for block in blocks:
        try:
            graph.append(json.loads(block))
        except json.JSONDecodeError as exc:
            problems.append('JSON-LD is not valid: %s' % exc)

    # FAQ answers live in two places and must stay identical, or the
    # accordion and the answer engines disagree about what we said.
    norm = lambda t: re.sub(r'\s+', ' ', t).strip()
    for doc in graph:
        for node in doc.get('@graph', [doc]):
            if node.get('@type') != 'FAQPage':
                continue
            for q in node.get('mainEntity', []):
                if norm(q['name']) not in body:
                    problems.append('FAQ question not in the accordion: %s' % q['name'])
                if norm(q['acceptedAnswer']['text']) not in body:
                    problems.append('FAQ answer does not match the accordion: %s' % q['name'])

    missing = [m for m in re.findall(r'src="([^"]+)"', html)
               if not m.startswith(('http', 'data:')) and not os.path.exists(m.split('?')[0])]
    if missing:
        problems.append('referenced files do not exist: %s' % ', '.join(missing))

    for path in page['css']:
        css = open(path, encoding='utf-8').read()
        if css.count('{') != css.count('}'):
            problems.append('unbalanced braces in %s' % path)
        if '—' in css or '–' in css:
            problems.append('em or en dash found in %s' % path)
    for path in page['js']:
        js = open(path, encoding='utf-8').read()
        if '—' in js or '–' in js:
            problems.append('em or en dash found in %s' % path)

    return problems


def build(page):
    html = open(page['html'], encoding='utf-8').read()

    for path in page['css']:
        css = open(path, encoding='utf-8').read()
        pattern = r'<link rel="stylesheet" href="%s(?:\?[^"]*)?">' % re.escape(path)
        if not re.search(pattern, html):
            raise SystemExit('%s does not link %s the way build.py expects'
                             % (page['html'], path))
        html = re.sub(pattern, '<style>\n' + css + '\n</style>', html)

    for path in page['js']:
        pattern = r'<script src="%s(?:\?[^"]*)?" defer></script>' % re.escape(path)
        if not re.search(pattern, html):
            raise SystemExit('%s does not link %s the way build.py expects'
                             % (page['html'], path))
        html = re.sub(pattern, '<script>\n' + open(path, encoding='utf-8').read() + '\n</script>', html)

    def embed(match):
        path = match.group(1)
        if path.startswith(('http', 'data:')) or not os.path.exists(path):
            return match.group(0)
        mime = mimetypes.guess_type(path)[0] or 'application/octet-stream'
        data = base64.b64encode(open(path, 'rb').read()).decode()
        return 'src="data:%s;base64,%s"' % (mime, data)

    html, count = re.subn(r'src="([^"]+)"', embed, html)

    html = html.replace('<body class="moqui-page">', '''<body class="moqui-page">

<!-- ============================================================
     GENERATED FILE. Do not edit.
     Run build.py to regenerate it from the source files. Web fonts
     load from Google Fonts, so open this with an internet connection.
     ============================================================ -->
''')

    open(page['out'], 'w', encoding='utf-8').write(html)
    return count, len(html.encode())


def main(argv):
    targets = [p for p in PAGES if not argv or p['name'] in argv]
    if not targets:
        raise SystemExit('no page named %s. Known pages: %s'
                         % (', '.join(argv), ', '.join(p['name'] for p in PAGES)))

    failed = False
    for page in targets:
        problems = check(page)
        if problems:
            failed = True
            print('FAILED  %s' % page['html'])
            for problem in problems:
                print('  -', problem)
            continue
        count, size = build(page)
        print('built   %-26s %2d assets inlined  %.0f KB'
              % (page['out'], count, size / 1024))

    return 1 if failed else 0


# Guarded so the checks can be imported and exercised without the
# module building every page as a side effect of the import.
if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
