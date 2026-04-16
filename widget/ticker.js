/**
 * Ticker Room Widget
 * Drop this script on any Squarespace page.
 * Set window.TICKER_VERTICAL before loading, or pass ?vertical=retail in the URL.
 * Verticals: retail | healthcare | realestate | grocery
 */
(function () {
  const BASE_URL = "https://raw.githubusercontent.com/Augurbot/ticker-room/main/data/";
  const CONTAINER_ID = "ticker-room-widget";

  function getVertical() {
    if (window.TICKER_VERTICAL) return window.TICKER_VERTICAL;
    const params = new URLSearchParams(window.location.search);
    if (params.get("vertical")) return params.get("vertical");
    const el = document.getElementById(CONTAINER_ID);
    if (el && el.dataset.vertical) return el.dataset.vertical;
    return "retail";
  }

  function formatDate(dateStr) {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-");
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${months[parseInt(m,10)-1]} ${parseInt(d,10)}, ${y}`;
  }

  function render(data, container) {
    const weekOf = formatDate(data.week_of);
    let html = `
      <div class="tr-widget">
        <div class="tr-header">
          <div class="tr-label">Weekly Marketing Ticker</div>
          <div class="tr-week">Week of ${weekOf}</div>
        </div>
        <div class="tr-brief">${data.week_in_brief}</div>
        <div class="tr-items">`;

    (data.items || []).forEach(function (item) {
      html += `
          <div class="tr-item">
            <div class="tr-item-head">
              <span class="tr-tag">${item.tag || ""}</span>
              <strong class="tr-headline">${item.headline}</strong>
            </div>
            <p class="tr-happening"><strong>What's happening:</strong> ${item.whats_happening}</p>
            <p class="tr-sowhat"><strong>So what for you:</strong> ${item.so_what}</p>
          </div>`;
    });

    html += `
        </div>
        <div class="tr-take">
          <strong>This week's take:</strong> ${data.this_weeks_take}
        </div>
        <div class="tr-footer">Produced weekly by <a href="https://augurian.com" target="_blank">Augurian</a>. AI-generated. Updated every Monday.</div>
      </div>`;

    container.innerHTML = html;
  }

  function injectStyles() {
    if (document.getElementById("tr-styles")) return;
    const style = document.createElement("style");
    style.id = "tr-styles";
    style.textContent = `
      .tr-widget { font-family: inherit; max-width: 720px; margin: 0 auto; color: #1a1a1a; }
      .tr-header { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #1a1a1a; padding-bottom: 8px; margin-bottom: 16px; }
      .tr-label { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #888; }
      .tr-week { font-size: 13px; color: #555; }
      .tr-brief { font-size: 17px; font-weight: 600; margin-bottom: 24px; line-height: 1.4; }
      .tr-item { border-left: 3px solid #e0e0e0; padding-left: 16px; margin-bottom: 24px; }
      .tr-item-head { margin-bottom: 8px; }
      .tr-tag { font-size: 12px; margin-right: 8px; }
      .tr-headline { font-size: 15px; }
      .tr-happening, .tr-sowhat { font-size: 14px; line-height: 1.6; margin: 6px 0; color: #333; }
      .tr-take { background: #f7f7f7; border-radius: 6px; padding: 14px 18px; font-size: 14px; line-height: 1.6; margin-top: 8px; margin-bottom: 16px; }
      .tr-footer { font-size: 11px; color: #aaa; margin-top: 12px; }
      .tr-footer a { color: #aaa; text-decoration: underline; }
      .tr-error { font-size: 14px; color: #999; padding: 20px 0; }
    `;
    document.head.appendChild(style);
  }

  function init() {
    const container = document.getElementById(CONTAINER_ID);
    if (!container) return;

    injectStyles();
    container.innerHTML = '<p class="tr-error">Loading this week\'s ticker...</p>';

    const vertical = getVertical();
    const url = BASE_URL + vertical + "-latest.json?nocache=" + Date.now();

    fetch(url)
      .then(function (r) {
        if (!r.ok) throw new Error("Failed to load ticker data");
        return r.json();
      })
      .then(function (data) {
        render(data, container);
      })
      .catch(function () {
        container.innerHTML = '<p class="tr-error">This week\'s ticker is being prepared. Check back Monday morning.</p>';
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
