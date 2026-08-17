# Website-Content-

Website design templates I've built — each one self-contained in its own folder,
ready to lift into a real site.

| Template | What it is | Built for |
|---|---|---|
| [hotwax-hero-banner](hotwax-hero-banner/) | Animated hero banner — rotating showcase of solution cards with floating info chips, stage bar and client logo strip. Ships as a static page **and** a HubSpot custom module. | HotWax Systems |

## Running any template

Each folder is plain HTML/CSS/JS with no build step:

```bash
cd <template-folder>
python3 -m http.server 8899
# open http://127.0.0.1:8899/
```

See the README inside each folder for the details.
