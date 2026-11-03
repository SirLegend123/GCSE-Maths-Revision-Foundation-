/* Update button, shared by every page.
   Each page says which version it is with <meta name="site-version" content="...">.
   This script reads version.json from the website (skipping any saved copy). If the website
   has a newer version, an "Update now" button appears. Pressing it reloads the page fresh.
   To publish a new version, run: python3 tools/bump_version.py */
(function () {
  var script = document.currentScript;
  var meta = document.querySelector('meta[name="site-version"]');
  if (!script || !meta || location.protocol === "file:") return;
  var mine = meta.content;
  var versionUrl = new URL("version.json", script.src).href;
  var shown = false, checking = false;

  function check() {
    if (shown || checking || !window.fetch) return;
    checking = true;
    fetch(versionUrl + "?t=" + Date.now(), { cache: "no-store" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { if (d && d.version && d.version !== mine) show(); })
      .catch(function () {})
      .then(function () { checking = false; });
  }

  function update(btn) {
    btn.disabled = true;
    btn.querySelector("span").textContent = "Updating…";
    // Refresh the saved copy of this page first, so the reload gets the new one.
    fetch(location.href.split("#")[0], { cache: "reload" })
      .catch(function () {})
      .then(function () { location.reload(); });
  }

  function show() {
    shown = true;
    var css = document.createElement("style");
    css.textContent =
      ".upd{position:fixed;left:50%;transform:translateX(-50%);bottom:max(16px,env(safe-area-inset-bottom,0px));z-index:9999;" +
      "display:flex;align-items:center;gap:12px;min-height:58px;padding:12px 24px;border:0;border-radius:999px;cursor:pointer;" +
      "font:700 18px/1.3 var(--font,'Lexend',Verdana,sans-serif);letter-spacing:.02em;max-width:calc(100% - 32px);" +
      "background:var(--teal,#1B7F79);color:var(--on-accent,#fff);box-shadow:0 5px 0 var(--teal-deep,#11605B),0 10px 30px rgba(0,0,0,.25)}" +
      ".upd svg{flex:none}.upd span{white-space:nowrap}" +
      ".upd:active{transform:translateX(-50%) translateY(3px)}" +
      ".upd:focus-visible{outline:4px solid var(--sun,#F4BE1E);outline-offset:3px}" +
      ".upd:disabled{opacity:.8;cursor:default}" +
      "@media (prefers-reduced-motion:no-preference){.upd{animation:updin .35s ease-out}}" +
      "@keyframes updin{from{opacity:0;transform:translateX(-50%) translateY(20px)}}";
    document.head.appendChild(css);
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "upd";
    btn.setAttribute("aria-live", "polite");
    btn.innerHTML =
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M21 12a9 9 0 11-3-6.7"/><path d="M21 3v6h-6"/></svg><span>New version: Update now</span>';
    btn.addEventListener("click", function () { update(btn); });
    document.body.appendChild(btn);
    document.body.style.paddingBottom = "100px"; // so the button never covers the last thing on the page
  }

  check();
  setInterval(check, 5 * 60 * 1000);
  document.addEventListener("visibilitychange", function () { if (document.visibilityState === "visible") check(); });
  window.addEventListener("focus", check);
})();
