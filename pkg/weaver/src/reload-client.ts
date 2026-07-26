/**
 * @alwatr/weaver — browser live-reload glue.
 *
 * Two things change source in dev, and they reach the browser by two paths:
 *
 *  - Pages / render graph: the dev server runs under `bun --watch`, which restarts the whole
 *    process on a change. Each run owns a unique build id, sent when the socket opens; after a
 *    restart the client reconnects, sees a *different* id, and reloads. A plain network blip
 *    reconnects to the same id and is ignored.
 *  - Client JS / CSS: these are `Bun.build` inputs, invisible to `bun --watch`. weaver watches
 *    them in-process, rebuilds the affected bundle, and publishes a `reload` message — which the
 *    client always acts on.
 */

/** The WebSocket route the dev server upgrades for live-reload. */
export const reloadPath = '/__weaver/reload';

/** Pub/sub topic + payload the server publishes after an in-process JS/CSS rebuild. */
export const reloadTopic = 'reload';

/**
 * The client script, as a self-invoking snippet. Kept dependency-free and defensive:
 * it survives server restarts (reconnect loop) and never throws into the page.
 */
const reloadClientScript = `<script>(function(){
  var url = (location.protocol === 'https:' ? 'wss://' : 'ws://') + location.host + ${JSON.stringify(reloadPath)};
  var buildId;
  function connect(){
    try {
      var ws = new WebSocket(url);
      ws.onmessage = function(event){
        // Explicit rebuild signal (JS/CSS changed in-process): always reload.
        if (event.data === ${JSON.stringify(reloadTopic)}) { location.reload(); return; }
        // Otherwise it's a build id. First one seen = this page's baseline; a later, different
        // id means bun --watch restarted the server with newer output, so reload.
        if (buildId === undefined) buildId = event.data;
        else if (event.data !== buildId) location.reload();
      };
      ws.onclose = function(){ setTimeout(connect, 400); };
      ws.onerror = function(){ try { ws.close(); } catch (_e) {} };
    } catch (_e) { setTimeout(connect, 400); }
  }
  connect();
})();</script>`;

/**
 * Inject the live-reload snippet into an HTML document.
 *
 * Inserts right before `</body>` when present (so the page is otherwise byte-identical to
 * the production output up to that point), otherwise appends. Non-HTML payloads (e.g. a
 * web app manifest) must not be passed here.
 */
export function injectReloadScript(html: string): string {
  const index = html.lastIndexOf('</body>');
  if (index === -1) return html + reloadClientScript;
  return html.slice(0, index) + reloadClientScript + html.slice(index);
}
