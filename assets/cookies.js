/* ═══════════════════════════════════════
   COOKIE CONSENT — Logic
═══════════════════════════════════════ */

(function () {
  'use strict';

  // Check if user already made a choice
  const consent = localStorage.getItem('cookie_consent');
  if (consent) return; // Don't show banner if already accepted/rejected

  // Wait for DOM
  document.addEventListener('DOMContentLoaded', function () {
    // Inject HTML
    const bannerHTML = `
      <div class="cookie-overlay" id="cookieOverlay"></div>
      <div class="cookie-banner" id="cookieBanner">
        <div class="cookie-banner-inner">

          <div class="cookie-main">
            <div class="cookie-text">
              <h3><span>🍪</span> Este sitio utiliza cookies</h3>
              <p>Utilizamos cookies propias y de terceros para analizar el tráfico, personalizar tu experiencia y mostrarte publicidad relevante. Puedes aceptar todas, rechazar las no esenciales o configurar tus preferencias. Más información en nuestra <a href="politica-cookies.html">Política de Cookies</a>.</p>
            </div>
            <div class="cookie-buttons">
              <button class="cookie-btn cookie-btn-accept" id="cookieAcceptAll">Aceptar todas</button>
              <button class="cookie-btn cookie-btn-reject" id="cookieRejectAll">Solo necesarias</button>
              <button class="cookie-btn cookie-btn-config" id="cookieToggleConfig">Configurar preferencias</button>
            </div>
          </div>

          <div class="cookie-config" id="cookieConfig">
            <div class="cookie-config-inner">

              <div class="cookie-option">
                <div class="cookie-option-info">
                  <h4>Cookies necesarias</h4>
                  <p>Imprescindibles para el funcionamiento del sitio web. No se pueden desactivar.</p>
                </div>
                <label class="cookie-toggle">
                  <input type="checkbox" checked disabled>
                  <span class="cookie-toggle-slider"></span>
                </label>
              </div>

              <div class="cookie-option">
                <div class="cookie-option-info">
                  <h4>Cookies de análisis</h4>
                  <p>Nos ayudan a entender cómo interactúas con el sitio web mediante la recopilación de datos anónimos (Google Analytics).</p>
                </div>
                <label class="cookie-toggle">
                  <input type="checkbox" id="cookieAnalytics" checked>
                  <span class="cookie-toggle-slider"></span>
                </label>
              </div>

              <div class="cookie-option">
                <div class="cookie-option-info">
                  <h4>Cookies de marketing</h4>
                  <p>Permiten mostrarte anuncios personalizados y medir la eficacia de nuestras campañas (Meta Pixel).</p>
                </div>
                <label class="cookie-toggle">
                  <input type="checkbox" id="cookieMarketing" checked>
                  <span class="cookie-toggle-slider"></span>
                </label>
              </div>

              <div class="cookie-config-save">
                <button class="cookie-btn cookie-btn-accept" id="cookieSaveConfig">Guardar preferencias</button>
              </div>

            </div>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', bannerHTML);

    // Show banner with slight delay for smooth entrance
    const banner = document.getElementById('cookieBanner');
    const overlay = document.getElementById('cookieOverlay');

    setTimeout(function () {
      banner.classList.add('active');
      overlay.classList.add('active');
    }, 800);

    // ─── Button handlers ───

    // Accept all
    document.getElementById('cookieAcceptAll').addEventListener('click', function () {
      saveConsent({ necessary: true, analytics: true, marketing: true });
      closeBanner();
    });

    // Reject non-essential
    document.getElementById('cookieRejectAll').addEventListener('click', function () {
      saveConsent({ necessary: true, analytics: false, marketing: false });
      closeBanner();
    });

    // Toggle config panel
    document.getElementById('cookieToggleConfig').addEventListener('click', function () {
      const config = document.getElementById('cookieConfig');
      config.classList.toggle('active');
      this.textContent = config.classList.contains('active') ? 'Ocultar preferencias' : 'Configurar preferencias';
    });

    // Save custom config
    document.getElementById('cookieSaveConfig').addEventListener('click', function () {
      const analytics = document.getElementById('cookieAnalytics').checked;
      const marketing = document.getElementById('cookieMarketing').checked;
      saveConsent({ necessary: true, analytics: analytics, marketing: marketing });
      closeBanner();
    });

    // ─── Helpers ───

    function saveConsent(preferences) {
      const data = {
        preferences: preferences,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('cookie_consent', JSON.stringify(data));

      // Here you would enable/disable actual tracking scripts based on preferences
      // For example:
      // if (preferences.analytics) { loadGoogleAnalytics(); }
      // if (preferences.marketing) { loadMetaPixel(); }
    }

    function closeBanner() {
      banner.classList.remove('active');
      overlay.classList.remove('active');
      // Remove from DOM after animation
      setTimeout(function () {
        banner.remove();
        overlay.remove();
      }, 500);
    }
  });
})();
