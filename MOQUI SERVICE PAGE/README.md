# Moqui Service Page, HotWax Systems

Source for the Moqui Solutions, Development and Consulting service page at
`hotwaxsystems.com/services/moqui-framework-development/`, plus the HubSpot CMS
package that ships it.

## Folders

| Folder | What it is |
| --- | --- |
| [`moqui-page-hubspot/`](moqui-page-hubspot/) | **The deliverable.** HubSpot CMS theme: 8 custom modules, one page template, stylesheet and motion script. Deploy this. |
| [`moqui-page/`](moqui-page/) | Standalone static build of the same page. Design reference and local preview, not deployed. |
| [`erp-graphic/`](erp-graphic/) | Standalone animated ERP architecture graphic, built separately. |
| [`PAGE_CONTENT.md`](PAGE_CONTENT.md) | Approved page copy, section by section. Source of truth for wording. |

## Deploying

See [`moqui-page-hubspot/README.md`](moqui-page-hubspot/README.md) for the
Design Manager walkthrough, and
[`moqui-page-hubspot/IMPLEMENTATION-PLAN.md`](moqui-page-hubspot/IMPLEMENTATION-PLAN.md)
for the module-by-module field reference.

The three folders are deliberately siblings. A HubSpot theme folder must
contain only theme files, so the static build and the ERP graphic cannot live
inside `moqui-page-hubspot/` without breaking `hs upload` and the Design
Manager import.

## Previewing the static build locally

```bash
cd moqui-page
python3 -m http.server 8000
# open http://localhost:8000/index.html
```
