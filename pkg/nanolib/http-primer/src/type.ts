export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD' | 'CONNECT' | 'TRACE';

/**
 * Represents the collection of HTTP response headers.
 *
 * For supporting custom headers, you can use intersection with a dictionary type, e.g., `HttpResponseHeaders & DictionaryReq<string>`.
 */
export type HttpResponseHeaders = {
  /**
   * Indicates if the server supports range requests for the target resource.
   */
  'accept-ranges'?: string;

  /**
   * Specifies the time in seconds the object has been in a proxy cache.
   */
  'age'?: string;

  /**
   * Lists the set of HTTP methods supported by the resource identified by the Request-URI.
   */
  'allow'?: string;

  /**
   * Specifies caching directives for both requests and responses.
   */
  'cache-control'?: string;

  /**
   * Controls whether the network connection stays open after the current transaction.
   */
  'connection'?: string;

  /**
   * Suggests a filename for the downloaded resource or how the content should be displayed.
   */
  'content-disposition'?: string;

  /**
   * Indicates what content encodings have been applied to the entity-body.
   */
  'content-encoding'?: string;

  /**
   * Describes the natural language(s) of the intended audience for the enclosed entity.
   */
  'content-language'?: string;

  /**
   * Indicates the size of the entity-body, in bytes, sent to the recipient.
   */
  'content-length'?: string | number;

  /**
   * Indicates an alternate location for the returned data.
   */
  'content-location'?: string;

  /**
   * Indicates where in a full body message a partial message belongs.
   */
  'content-range'?: string;

  /**
   * Indicates the media type of the entity-body sent to the recipient.
   */
  'content-type'?: string;

  /**
   * Indicates the date and time at which the message was originated.
   */
  'date'?: string;

  /**
   * Provides the current value of the entity tag for the requested variant.
   */
  'etag'?: string;

  /**
   * Gives the date/time after which the response is considered stale.
   */
  'expires'?: string;

  /**
   * Indicates the date and time at which the origin server believes the variant was last modified.
   */
  'last-modified'?: string;

  /**
   * Provides a list of URIs associated with the resource.
   */
  'link'?: string;

  /**
   * Used in redirection, or when a new resource has been created.
   */
  'location'?: string;

  /**
   * Used for backward compatibility with HTTP/1.0 caches.
   */
  'pragma'?: string;

  /**
   * Requests authentication information from the client for a proxy server.
   */
  'proxy-authenticate'?: string;

  /**
   * Indicates how long the user agent should wait before making a follow-up request.
   */
  'retry-after'?: string;

  /**
   * Contains information about the software used by the origin server to handle the request.
   */
  'server'?: string;

  /**
   * Used to send cookies from the server to the user agent.
   */
  'set-cookie'?: string[];

  /**
   * Tells browsers to access the server using HTTPS only.
   */
  'strict-transport-security'?: string;

  /**
   * Allows the sender to include additional fields at the end of chunked messages.
   */
  'trailer'?: string;

  /**
   * Specifies the form of encoding used to safely transfer the entity to the user.
   */
  'transfer-encoding'?: string;

  /**
   * Determines how to match future request headers to decide whether a cached response
   * can be used rather than requesting a fresh one from the origin server.
   */
  'vary'?: string;

  /**
   * Lists all intermediate proxies the message has traversed
   */
  'via'?: string;

  /**
   * Contains additional information about the status or transformation of a message that might not be reflected in the status code.
   */
  'warning'?: string;

  /**
   * Indicates the authentication scheme that should be used to access the requested entity.
   */
  'www-authenticate'?: string;
};

/**
 * Represents the collection of all HTTP Request headers.
 *
 * For supporting custom headers, you can use intersection with a dictionary type, e.g., `HttpResponseHeaders & DictionaryReq<string>`.
 */
export type HttpRequestHeaders = {
  /**
   * Content-Types that are acceptable for the response.
   *
   * Example: `accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*\/*;q=0.8'`
   */
  'accept'?: string;

  /**
   * Character sets that are acceptable.
   *
   * Example: `accept-charset: 'utf-8, iso-8859-1;q=0.5'`
   */
  'accept-charset'?: string;

  /**
   * List of acceptable encodings.
   *
   * Example: `accept-encoding: 'gzip, deflate, br'`
   */
  'accept-encoding'?: string;

  /**
   * List of acceptable languages for the response.
   *
   * Example: `accept-language: 'en-US,en;q=0.5'`
   */
  'accept-language'?: string;

  /**
   * Authentication credentials for HTTP authentication.
   *
   * Example: `authorization: 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='`
   */
  'authorization'?: string;

  /**
   * Used to specify directives that MUST be obeyed by all caching mechanisms along the request/response chain.
   *
   * Example: `cache-control: 'no-cache'`
   */
  'cache-control'?: string;

  /**
   * The type of encoding used on the data.
   *
   * Example: `content-encoding: 'gzip'`
   */
  'content-encoding'?: string;

  /**
   * The natural language or languages of the intended audience for the enclosed content.
   *
   * Example: `content-language: 'en-US'`
   */
  'content-language'?: string;

  /**
   * The length of the request body in octets (8-bit bytes).
   *
   * Example: `content-length: '1234'`
   */
  'content-length'?: string;

  /**
   * An alternate location for the returned data (like a redirect).
   *
   * Example: `content-location: '/index.html'`
   */
  'content-location'?: string;

  /**
   * A Base64-encoded binary MD5 sum of the content of the request body.
   *
   * Example: `content-md5: 'Q2hlY2sgSW50ZWdyaXR5IQ=='`
   */
  'content-md5'?: string;

  /**
   * The MIME type of the body of the request (used with POST and PUT requests).
   *
   * Example: `content-type: 'application/x-www-form-urlencoded'`
   */
  'content-type'?: string;

  /**
   * An HTTP cookie previously sent by the server with `Set-Cookie`.
   *
   * Example: `cookie: 'sessionid=38afes7a8'`
   */
  'cookie'?: string;

  /**
   * The date and time that the message was originated (in "HTTP-date" format as defined by RFC 7231).
   *
   * Example: `date: 'Sun, 06 Nov 1994 08:49:37 GMT'`
   */
  'date'?: string;

  /**
   * The email address of the user making the request.
   *
   * Example: `from: 'user@example.com'`
   */
  'from'?: string;

  /**
   * The domain name of the server (for virtual hosting), and the TCP port number on which the server is listening.
   * The port number may be omitted if the port is the standard port for the service requested.
   *
   * Example: `host: 'en.wikipedia.org:8080'`
   */
  'host'?: string;

  /**
   * Only send the response if the entity has not been modified since a specific time.
   *
   * Example: `if-modified-since: 'Sat, 29 Oct 1994 19:43:31 GMT'`
   */
  'if-modified-since'?: string;

  /**
   * Allows a 304 Not Modified to be returned if content is unchanged.
   *
   * Example: `if-none-match: '"737060cd8c284d8af7ad3082f209582d"'`
   */
  'if-none-match'?: string;

  /**
   * If the entity is unchanged, send me the part(s) that I am missing; otherwise, send me the entire new entity.
   *
   * Example: `if-range: '"737060cd8c284d8af7ad3082f209582d"'`
   */
  'if-range'?: string;

  /**
   * Only send the response if the entity has been modified since a specific time.
   *
   * Example: `if-unmodified-since: 'Sat, 29 Oct 1994 19:43:31 GMT'`
   */
  'if-unmodified-since'?: string;

  /**
   * Limit the number of times the message can be forwarded through proxies or gateways.
   *
   * Example: `max-forwards: '10'`
   */
  'max-forwards'?: string;

  /**
   * Implementation-specific headers that may have various effects anywhere along the request-response chain.
   *
   * Example: `pragma: 'no-cache'`
   */
  'pragma'?: string;

  /**
   * Authorization credentials for connecting to a proxy.
   *
   * Example: `proxy-authorization: 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='`
   */
  'proxy-authorization'?: string;

  /**
   * Request only part of an entity. Bytes are numbered from 0.
   *
   * Example: `range: 'bytes=500-999'`
   */
  'range'?: string;

  /**
   * This is the address of the previous web page from which a link to the currently requested page was followed.
   * (The word "referrer" is misspelled in the RFC as well as in most implementations.)
   *
   * Example: `referer: 'https://en.wikipedia.org/wiki/Main_Page'`
   */
  'referer'?: string;

  /**
   * The user agent string of the user agent.
   *
   * Example: `user-agent: 'Mozilla/5.0 (X11; Linux x86_64; rv:12.0) Gecko/20100101 Firefox/21.0'`
   */
  'user-agent'?: string;

  /**
   * Ask the server to upgrade to another protocol.
   *
   * Example: `upgrade: 'h2c, HTTPS/1.3, IRC/6.9, RTA/x11, websocket'`
   */
  'upgrade'?: string;

  /**
   * Informs the server of proxies through which the request was sent.
   *
   * Example: `via: '1.0 fred, 1.1 example.com (Apache/1.1)'`
   */
  'via'?: string;

  /**
   * A general warning about possible problems with the entity body.
   *
   * Example: `warning: '199 Miscellaneous warning'`
   */
  'warning'?: string;

  /**
   * Tells all caching mechanisms from server to client whether they may cache this object.
   * It is similar to Cache-Control: no-cache, but only applies to proxies and does not apply to private caches.
   *
   * Example: `age: '12'`
   */
  'age'?: string;

  /**
   * Appends " trailers " to the list of acceptable transfer encodings in the `TE` header.
   *
   * Example: `allow: 'GET, HEAD'`
   */
  'allow'?: string;

  /**
   *  What partial content range types this server supports via the `Range` header.
   *
   * Example: `a-im: 'feed'`
   */
  'a-im'?: string;

  /**
   * Alternative addresses (e-mail) to reply to for user agents that support multiple reply addresses
   * in the `From` header field
   *
   * Example: `alt-svc: 'h3-29=":443"; ma=86400, h3-T051=":443"; ma=86400, h3-Q050=":443"; ma=86400,
   * h3-Q046=":443"; ma=86400, h3-Q043=":443"; ma=86400, quic=":443"; ma=86400; v="43,46"'`
   */
  'alt-used'?: string;

  /**
   *  Authentication credentials for HTTP authentication
   *
   * Example: `apply-to-redirect-ref: 'false'`
   */
  'apply-to-redirect-ref'?: string;

  /**
   *  Used in redirection, or when a new resource has been created. This refresh redirects after 5 seconds.
   * This is a proprietary, non-standard header extension introduced by Netscape and supported by most web browsers.
   *
   * Example: `authentication-control: 'max-age=3600'`
   */
  'authentication-info'?: string;

  /**
   *  An HTTP cookie previously sent by the server with `Set-Cookie` (sent when connecting to a proxy)
   *
   * Example: `connection: 'keep-alive'`
   */
  'connection'?: string;

  /**
   *  The MIME type of the body of the request (used with POST and PUT requests)
   *
   * Example: `content-range: 'bytes 200-1000/67589'`
   */
  'content-range'?: string;

  /**
   *  The date and time that the message was sent (in "HTTP-date" format as defined by RFC 7231)
   *
   * Example: `content-security-policy: 'default-src 'self'; img-src *'`
   */
  'content-security-policy'?: string;

  /**
   *  Control options for the current connection and list of hop-by-hop response fields.
   *
   * Example: `content-security-policy-report-only: 'default-src 'self'; report-uri /csp-violation-report-endpoint/'`
   */
  'content-security-policy-report-only'?: string;

  /**
   *  An identifier for a specific dialog in the browser (for cross-document communication), such as prompting the user
   * for a username and password
   *
   * Example: `cross-origin-embedder-policy: 'require-corp'`
   */
  'cross-origin-embedder-policy'?: string;

  /**
   *  An optional token returned by an origin in response to a preflight request
   * that includes the `Access-Control-Request-Headers` to indicate that the actual request can include
   * those headers.
   *
   * Example: `cross-origin-opener-policy: 'same-origin'`
   */
  'cross-origin-opener-policy'?: string;

  /**
   *  The destination of a message (e-mail)
   *
   * Example: `cross-origin-resource-policy: 'cross-origin'`
   */
  'cross-origin-resource-policy'?: string;

  /**
   *  Requests HTTP Public Key Pinning (HPKP) to associate a specific cryptographic public key with a certain web server
   * to decrease the risk of MITM attacks with forged certificates. Deprecated and removed from Browsers
   *
   * Example: `device-memory: '0.25'`
   */
  'device-memory'?: string;

  /**
   *  Used to identify the protocol at the application layer of the OSI model
   *
   * Example: `dnt: '1'`
   */
  'dnt'?: string;

  /**
   *  The `Expect` HTTP header indicates expectations that need to be fulfilled by the server in order to properly
   * handle the request.
   *
   * Example: `downlink: '10'`
   */
  'downlink'?: string;

  /**
   *  Specifies the effective connection type the user agent has to the network.
   *
   * Example: `ect: '4g'`
   */
  'ect'?: string;

  /**
   *  The `Early-Data` header indicates a request that includes an Early Data body
   *
   * Example: `early-data: '1'`
   */
  'early-data'?: string;

  /**
   *  The `Expect-CT` header is used by a server to indicate that browsers should evaluate connections to the host
   * for Certificate Transparency compliance and report failures to the specified URI. Deprecated and removed from browsers.
   *
   * Example: `expect: '100-continue'`
   */
  'expect-ct'?: string;

  /**
   *  Additional information about the client or user agent, typically for statistical purposes
   * or for determining the capabilities of the client software
   *
   * Example: `expect-ct: 'max-age=86400, report-uri="https://report-uri.example.com/report"'`
   */
  'forwarded'?: string;

  /**
   *  The `Keep-Alive` general header allows the sender to hint about how the connection may be used to
   * set a timeout and a maximum amount of requests.
   *
   * Example: `keep-alive: 'timeout=5, max=1000'`
   */
  'keep-alive'?: string;

  /**
   *  Specifies the preferred maximum estimated round trip time (rtt) of the connection
   *
   * Example: `large-allocation: '1'`
   */
  'large-allocation'?: string;

  /**
   *  The `Last-Event-ID` header identifies the last event ID processed by the client.
   *
   * Example: `last-event-id: '123'`
   */
  'last-event-id'?: string;

  /**
   *  An arbitrary, opaque byte sequence used for linking multiple requests together
   *
   * Example: `link: '</feed.xml>; rel="alternate"'`
   */
  'link'?: string;

  /**
   *  Used with the Location response header to indicate the identifier of the payload body sent in the request
   *
   * Example: `location: '/new/document'`
   */
  'origin'?: string;

  /**
   *  The `Ping-From` header specifies a URI where a pong response may be sent.
   *
   * Example: `ping-from: 'https://example.com/pong'`
   */
  'ping-from'?: string;

  /**
   *  The `Ping-To` header specifies a URI that will accept a pong response.
   *
   * Example: `ping-to: 'https://example.com/pong'`
   */
  'ping-to'?: string;

  // ... (Previous headers from the previous response) ...

  /**
   *  Initiates an HTTP 2 Server Push. This is a request for the server to push the given resources to the client in
   * anticipation of their use.
   *
   * Example: `push-policy: 'push_critical_resources_first'`
   */
  'push-policy'?: string;

  /**
   *  The `Purpose` header is used to indicate the purpose of the present request
   * (such as prefetch, prerender, or an actual browse).
   *
   * Example: `purpose: 'prefetch'`
   */
  'purpose'?: string;

  /**
   *  Used to indicate the part of a document to return.
   *
   * Example: `referrer-policy: 'no-referrer'`
   */
  'referrer-policy'?: string;

  /**
   *  The `Retry-After` response HTTP header indicates how long the user agent should wait
   * before making a follow-up request.
   *
   * Example: `retry-after: '3600'`
   */
  'retry-after'?: string;

  /**
   *  The `Save-Data` client hint request header indicates the user's preference for reduced data usage.
   *
   * Example: `save-data: 'on'`
   */
  'save-data'?: string;

  /**
   *  The `Sec-Fetch-Dest` header indicates the request's destination. It can be one of the following values:
   *  - audio: An audio file.
   *  - audioworklet: An audio worklet.
   *  - document: A document.
   *  - embed: An embedded resource.
   *  - empty: An empty response (e.g., in response to a HEAD request).
   *  - font: A font file.
   *  - frame: An iframe.
   *  - image: An image file.
   *  - manifest: A manifest file.
   *  - object: An object or an EMBED element.
   *  - paintworklet: A paint worklet.
   *  - report: A report.
   *  - script: A script.
   *  - serviceworker: A service worker.
   *  - sharedworker: A shared worker.
   *  - style: A stylesheet.
   *  - track: A track file.
   *  - video: A video file.
   *  - worker: A dedicated worker.
   *  - xslt: An XSLT stylesheet.
   *
   * Example: `sec-fetch-dest: 'image'`
   */
  'sec-fetch-dest'?: string;

  /**
   *  The `Sec-Fetch-Mode` header indicates how the resource was fetched.
   * It can be one of the following values:
   *  - cors: A cross-origin request using the CORS protocol.
   *  - navigate: A navigation request.
   *  - nested-navigate: A nested navigation request.
   *  - no-cors: A simple cross-origin request that does not use CORS.
   *  - same-origin: A same-origin request.
   *  - websocket: A WebSocket request.
   *
   * Example: `sec-fetch-mode: 'cors'`
   */
  'sec-fetch-mode'?: string;

  /**
   *  The `Sec-Fetch-Site` header indicates the relationship between the site
   * making the request and the site hosting the resource.
   * It can be one of the following values:
   *  - cross-site: The request is made to a different site than the one the request
   * originated from, including when the first-party and third-party sites have the same owner.
   *  - same-origin: The request is made to the same site (the same scheme, host, and port).
   *  - same-site: The request is made to a different site, but both sites share the same
   * registered domain name (eTLD+1).
   *  - none: The request is made to a data URL or Blob URL.
   *
   * Example: `sec-fetch-site: 'cross-site'`
   */
  'sec-fetch-site'?: string;

  /**
   *  The `Sec-Fetch-User` header indicates whether the resource request was initiated by a user gesture or not.
   * It can be one of the following values:
   *  - ?1: The request was initiated by a user gesture.
   *  - ?0: The request was not initiated by a user gesture.
   *
   * Example: `sec-fetch-user: '?1'`
   */
  'sec-fetch-user'?: string;

  /**
   *  The `Sec-GPC` HTTP header is a signal that the user prefers a Global Privacy Control setting
   * of 1, meaning "Do Not Sell or Share My Personal Information."
   *
   * Example: `sec-gpc: '1'`
   */
  'sec-gpc'?: string;

  /**
   * The `Sec-WebSocket-Accept` header field is used in the WebSocket opening handshake.
   * It is sent from the server to the client to confirm that the server is willing to initiate a WebSocket connection.
   *
   * Example: `sec-websocket-accept: 's3pPLMBiTxaQ9kYGzzhZRbK+xOo='`
   */
  'sec-websocket-accept'?: string;

  // ... (Previous headers from the previous response) ...

  /**
   * The `Sec-WebSocket-Extensions` header field is used in the WebSocket opening handshake.
   * It is sent from the client to the server to indicate which extensions it would like to use,
   * and from the server to the client to indicate which extensions the server is willing to use.
   *
   * Example: `sec-websocket-extensions: 'permessage-deflate; client_max_window_bits'`
   */
  'sec-websocket-extensions'?: string;

  /**
   * The `Sec-WebSocket-Key` header field is used in the WebSocket opening handshake.
   * It is sent from the client to the server to provide a random value that the server
   * will use to generate the `Sec-WebSocket-Accept` header field.
   *
   * Example: `sec-websocket-key: 'dGhlIHNhbXBsZSBub25jZQ=='`
   */
  'sec-websocket-key'?: string;

  /**
   * The `Sec-WebSocket-Protocol` header field is used in the WebSocket opening handshake.
   * It is sent from the client to the server to indicate which subprotocols it would like to use,
   * and from the server to the client to indicate which subprotocol the server has selected.
   *
   * Example: `sec-websocket-protocol: 'chat, superchat'`
   */
  'sec-websocket-protocol'?: string;

  /**
   * The `Sec-WebSocket-Version` header field is used in the WebSocket opening handshake.
   * It is sent from the client to the server to indicate which version of the WebSocket protocol it is using.
   *
   * Example: `sec-websocket-version: '13'`
   */
  'sec-websocket-version'?: string;

  /**
   * The `Server` header field contains information about the software used by the origin server
   * to handle the request.
   *
   * Example: `server: 'Apache/2.4.1 (Unix)'`
   */
  'server'?: string;

  /**
   * The `Service-Worker-Navigation-Preload` header is used to control the behavior of
   * service worker navigation preloads.
   *
   * Example: `service-worker-navigation-preload: 'true'`
   */
  'service-worker-navigation-preload'?: string;

  /**
   * The `SourceMap` or `X-SourceMap` HTTP header links a generated code file (such as a JavaScript or CSS file)
   * to an original source code file, enabling developers to debug the generated code
   * in the context of the original source code.
   *
   * Example: `sourcemap: '/path/to/file.js.map'`
   */
  'sourcemap'?: string;

  /**
   * The `Strict-Transport-Security` (HSTS) response header informs browsers that a website
   * should only be accessed using HTTPS, and that any future attempts to access it using HTTP should automatically
   * be converted to HTTPS.
   *
   * Example: `strict-transport-security: 'max-age=31536000; includeSubDomains'`
   */
  'strict-transport-security'?: string;

  /**
   * The `TE` header specifies the transfer encodings that the user agent is willing to accept
   * in the response and indicates a preference for chunked transfer encoding if the server supports it.
   *
   * Example: `te: 'trailers, deflate'`
   */
  'te'?: string;

  /**
   * The `Timing-Allow-Origin` response header specifies origins that are allowed to see values of attributes
   * retrieved via features of the Resource Timing API, which would otherwise be reported as zero due to cross-origin restrictions.
   *
   * Example: `timing-allow-origin: 'https://www.example.com'`
   */
  'timing-allow-origin'?: string;

  /**
   * The `Trailer` general header indicates that the given set of header fields
   * will be present in the trailer of a message encoded with chunked transfer encoding.
   *
   * Example: `trailer: 'Expires'`
   */
  'trailer'?: string;

  /**
   * The `Transfer-Encoding` header field lists the transfer encodings applied to the message body
   * in order to ensure safe and proper transfer of the message.
   *
   * Example: `transfer-encoding: 'chunked'`
   */
  'transfer-encoding'?: string;

  /**
   * The `Upgrade-Insecure-Requests` header sends a signal to the server expressing the client’s preference
   * for an encrypted and authenticated response, and that it can successfully handle the upgrade-insecure-requests CSP directive.
   *
   * Example: `upgrade-insecure-requests: '1'`
   */
  'upgrade-insecure-requests'?: string;

  /**
   * The `Want-Digest` header field specifies one or more digest algorithms that the client would like to
   * receive applied to the message body of a response.
   *
   * Example: `want-digest: 'SHA-256'`
   */
  'want-digest'?: string;

  /**
   * The `X-Content-Type-Options` response HTTP header indicates whether or not the browser should sniff (determine)
   * the MIME type of a file.
   *
   * Example: `x-content-type-options: 'nosniff'`
   */
  'x-content-type-options'?: string;

  /**
   * The `X-DNS-Prefetch-Control` HTTP header controls DNS prefetching, a feature by which browsers proactively
   * perform domain name resolution on both links that the user may choose to follow as well as URLs for items referenced
   * by the document, including images, scripts, and style sheets.
   *
   * Example: `x-dns-prefetch-control: 'off'`
   */
  'x-dns-prefetch-control'?: string;

  /**
   * The `X-Forwarded-For` (XFF) header is a de-facto standard header for identifying the originating IP address
   * of a client connecting to a web server through an HTTP proxy or a load balancer.
   *
   * Example: `x-forwarded-for: 'client1, proxy1, proxy2'`
   */
  'x-forwarded-for'?: string;

  /**
   * The `X-Forwarded-Host` (XFH) header is a de-facto standard header for identifying the original host requested by the client
   * in the Host HTTP request header, since the Host header is usually overwritten by proxies.
   *
   * Example: `x-forwarded-host: 'en.wikipedia.org'`
   */
  'x-forwarded-host'?: string;

  /**
   * The `X-Forwarded-Proto` (XFP) header is a de-facto standard header for identifying the protocol (HTTP or HTTPS) that a client
   * used to connect to your proxy or load balancer.
   *
   * Example: `x-forwarded-proto: 'https'`
   */
  'x-forwarded-proto'?: string;

  /**
   * The `X-Frame-Options` HTTP response header can be used to indicate whether or not a browser should be allowed
   * to render a page in a `<frame>`, `<iframe>`, `<embed>` or `<object>`.
   *
   * Example: `x-frame-options: 'SAMEORIGIN'`
   */
  'x-frame-options'?: string;

  /**
   * The `X-Requested-With` header is commonly used to identify Ajax requests.
   * Most JavaScript frameworks send this header with requests.
   *
   * Example: `x-requested-with: 'XMLHttpRequest'`
   */
  'x-requested-with'?: string;

  /**
   * The `X-XSS-Protection` HTTP header is a basic protection against cross-site scripting (XSS) attacks for older browsers.
   *
   * Example: `x-xss-protection: '1; mode=block'`
   */
  'x-xss-protection'?: string;
};
