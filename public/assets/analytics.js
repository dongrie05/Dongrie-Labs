// Google tag (contentor GTM-W737S83Q). Só carrega depois de o visitante aceitar os cookies,
// como diz a Política de Privacidade. Usa a mesma chave de consentimento das páginas em Next.js.
(function () {
  var KEY = "dongrielabs-cookie-consent", ID = "GTM-W737S83Q", loaded = false;

  function load() {
    if (loaded) return; loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    window.gtag("js", new Date());
    var s = document.createElement("script");
    s.async = true; s.src = "https://www.googletagmanager.com/gtm.js?id=" + ID;
    document.head.appendChild(s);
  }

  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  if (get() === "accepted") return load();
  if (get() === "declined") return;

  function banner() {
    var b = document.createElement("div");
    b.setAttribute("role", "region"); b.setAttribute("aria-label", "Cookies");
    b.style.cssText = "position:fixed;left:12px;right:12px;bottom:12px;z-index:9999;max-width:640px;margin:0 auto;padding:16px 18px;border-radius:16px;" +
      "background:#0c0b2b;border:1px solid rgba(243,244,255,.16);color:#f3f4ff;font:14px/1.5 Archivo,system-ui,sans-serif;" +
      "display:flex;flex-wrap:wrap;gap:12px 16px;align-items:center;justify-content:space-between;box-shadow:0 20px 60px -20px rgba(0,0,0,.8)";
    var btn = "min-height:44px;padding:0 18px;border-radius:99px;font:600 14px Archivo,system-ui,sans-serif;cursor:pointer;";
    b.innerHTML = '<p style="margin:0;flex:1 1 260px;color:rgba(243,244,255,.8)">Usamos cookies só para perceber como o site é usado. ' +
      '<a href="/pt/privacy" style="color:#c7a6ff">Política de Privacidade</a></p>' +
      '<span style="display:flex;gap:8px"><button type="button" data-c="declined" style="' + btn + 'background:none;color:#f3f4ff;border:1px solid rgba(243,244,255,.3)">Recusar</button>' +
      '<button type="button" data-c="accepted" style="' + btn + 'background:#f3f4ff;color:#030116;border:0">Aceitar</button></span>';
    b.addEventListener("click", function (e) {
      var v = e.target && e.target.getAttribute && e.target.getAttribute("data-c");
      if (!v) return;
      set(v); b.remove();
      if (v === "accepted") load();
    });
    document.body.appendChild(b);
  }
  if (document.body) banner(); else document.addEventListener("DOMContentLoaded", banner);
})();
