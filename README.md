# Ticker Room

Augurian's weekly marketing news ticker — AI-generated briefings for marketing leaders in regional retail, healthcare, real estate, and grocery.

## How it works

Every Monday at 3am, a pipeline of 16 AI agents researches, writes, validates, and publishes four vertical-specific newsletters. The output lands in the `data/` folder as JSON files, which are served directly to Squarespace landing pages via the `widget/ticker.js` script.

## Verticals

| Vertical | Data file | Editor |
|----------|-----------|--------|
| Retail | `data/retail-latest.json` | Dorothy |
| Healthcare | `data/healthcare-latest.json` | Joan |
| Real Estate | `data/realestate-latest.json` | Tom |
| Grocery | `data/grocery-latest.json` | Gloria |

## Squarespace embed

Add a Code Block to your page with:

```html
<div id="ticker-room-widget" data-vertical="retail"></div>
<script src="https://raw.githubusercontent.com/Augurbot/ticker-room/main/widget/ticker.js"></script>
```

Change `data-vertical` to `healthcare`, `realestate`, or `grocery` for the other pages.

## Pipeline agents

Built and operated by Augurbot via OpenClaw. Runs every Monday 3:00–5:30am CDT.
