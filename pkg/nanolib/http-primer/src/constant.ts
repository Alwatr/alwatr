/**
 * Object representing standard HTTP methods.
 */
export const HttpMethods = {
  /**
   * GET: Requests a representation of the specified resource.
   */
  GET: 'GET',

  /**
   * HEAD: Asks for a response identical to that of a GET request, but without the response body.
   */
  HEAD: 'HEAD',

  /**
   * POST: Submits data to be processed (e.g., from an HTML form) to the identified resource.
   */
  POST: 'POST',

  /**
   * PUT: Uploads a representation of the specified URI.
   */
  PUT: 'PUT',

  /**
   * DELETE: Deletes the specified resource.
   */
  DELETE: 'DELETE',

  /**
   * CONNECT: Establishes a tunnel to the server identified by the target resource.
   */
  CONNECT: 'CONNECT',

  /**
   * OPTIONS: Describes the communication options for the target resource.
   */
  OPTIONS: 'OPTIONS',

  /**
   * TRACE: Performs a message loop-back test along the path to the target resource.
   */
  TRACE: 'TRACE',

  /**
   * PATCH: Applies partial modifications to a resource.
   */
  PATCH: 'PATCH',
} as const;

/**
 * Object representing standard HTTP status codes.
 */
export const HttpStatusCodes = {
  /**
   * 100 Continue: The server has received the request headers and the client should proceed to send the request body.
   */
  Info_100_Continue: 100,

  /**
   * 101 Switching Protocols: The server understands and is willing to comply with the clients request to switch protocols.
   */
  Info_101_Switching_Protocols: 101,

  /**
   * 102 Processing: The server has received and is processing the request, but no response is available yet.
   */
  Info_102_Processing: 102,

  /**
   * 103 Early Hints: The server is sending some response headers before the final HTTP message.
   */
  Info_103_Early_Hints: 103,

  /**
   * 200 OK: The request has succeeded.
   */
  Success_200_OK: 200,

  /**
   * 201 Created: The request has been fulfilled and resulted in a new resource being created.
   */
  Success_201_Created: 201,

  /**
   * 202 Accepted: The request has been accepted for processing, but the processing has not been completed.
   */
  Success_202_Accepted: 202,

  /**
   * 203 Non-Authoritative Information: The server is a transforming proxy that received a 200 OK
   * from the origin server but is returning a modified version of the origins response.
   */
  Success_203_Non_Authoritative_Information: 203,

  /**
   * 204 No Content: The server successfully processed the request and is not returning any content.
   */
  Success_204_No_Content: 204,

  /**
   * 205 Reset Content: The server successfully processed the request,
   * asks that the client reset its document view, and is not returning any content.
   */
  Success_205_Reset_Content: 205,

  /**
   * 206 Partial Content: The server is delivering only part of the resource due to a range header sent by the client.
   */
  Success_206_Partial_Content: 206,

  /**
   * 207 Multi-Status: The message body that follows is an XML message
   * and can contain a number of separate response codes, depending on how many sub-requests were made.
   */
  Success_207_Multi_Status: 207,

  /**
   * 208 Already Reported: The members of a DAV binding have already been enumerated
   * in a preceding part of the (multi-status) response, and are not being included again.
   */
  Success_208_Already_Reported: 208,

  /**
   * 226 IM Used: The server has fulfilled a request for the resource, and the response is a representation
   * of the result of one or more instance-manipulations applied to the current instance.
   */
  Success_226_IM_Used: 226,

  /**
   * 300 Multiple Choices: The request has more than one possible response.
   */
  Redirect_300_Multiple_Choices: 300,

  /**
   * 301 Moved Permanently: The URL of the requested resource has been changed permanently.
   */
  Redirect_301_Moved_Permanently: 301,

  /**
   * 302 Found: The URL of the requested resource has been changed temporarily.
   */
  Redirect_302_Found: 302,

  /**
   * 303 See Other: The response to the request can be found under another URI using a GET method.
   */
  Redirect_303_See_Other: 303,

  /**
   * 304 Not Modified: The resource has not been modified since the version specified
   * by the request headers If-Modified-Since or If-None-Match.
   */
  Redirect_304_Not_Modified: 304,

  /**
   * 305 Use Proxy: The requested resource is only available through a proxy, the address for which is provided in the response.
   */
  Redirect_305_Use_Proxy: 305,

  /**
   * 306 Switch Proxy: No longer used. Originally meant "Subsequent requests should use the specified proxy."
   */
  Redirect_306_Switch_Proxy: 306,

  /**
   * 307 Temporary Redirect: The server sends this response to direct the client
   * to get the requested resource at another URI with the same method that was used in the prior request.
   */
  Redirect_307_Temporary_Redirect: 307,

  /**
   * 308 Permanent Redirect: This means that the resource is now permanently located at another URI,
   * specified by the Location: HTTP Response header.
   */
  Redirect_308_Permanent_Redirect: 308,

  /**
   * 400 Bad Request: The server cannot or will not process the request due to something that is perceived to be a client error.
   */
  Error_Client_400_Bad_Request: 400,

  /**
   * 401 Unauthorized: The request has not been applied because it lacks valid authentication credentials for the target resource.
   */
  Error_Client_401_Unauthorized: 401,

  /**
   * 402 Payment Required: Reserved for future use.
   */
  Error_Client_402_Payment_Required: 402,

  /**
   * 403 Forbidden: The client does not have access rights to the content, so the server is refusing to give the requested resource.
   */
  Error_Client_403_Forbidden: 403,

  /**
   * 404 Not Found: The server can not find the requested resource.
   */
  Error_Client_404_Not_Found: 404,

  /**
   * 405 Method Not Allowed: The request method is known by the server but is not supported by the target resource.
   */
  Error_Client_405_Method_Not_Allowed: 405,

  /**
   * 406 Not Acceptable: The target resource does not have a current representation that would be acceptable
   * to the user agent, according to the proactive negotiation header fields received in the request,
   * and the server is unwilling to supply a default representation.
   */
  Error_Client_406_Not_Acceptable: 406,

  /**
   * 407 Proxy Authentication Required: Similar to 401 Unauthorized,
   * but it indicates that the client needs to authenticate itself in order to use a proxy.
   */
  Error_Client_407_Proxy_Authentication_Required: 407,

  /**
   * 408 Request Timeout: The server timed out waiting for the request.
   */
  Error_Client_408_Request_Timeout: 408,

  /**
   * 409 Conflict: The request could not be processed because of conflict in the request, such as an edit conflict.
   */
  Error_Client_409_Conflict: 409,

  /**
   * 410 Gone: The requested resource is no longer available and will not be available again.
   */
  Error_Client_410_Gone: 410,

  /**
   * 411 Length Required: The server refuses to accept the request without a defined Content-Length header.
   */
  Error_Client_411_Length_Required: 411,

  /**
   * 412 Precondition Failed: One or more conditions given in the request header fields evaluated to false when tested on the server.
   */
  Error_Client_412_Precondition_Failed: 412,

  /**
   * 413 Payload Too Large: The server is refusing to process a request because the request payload is larger
   * than the server is willing or able to process.
   */
  Error_Client_413_Payload_Too_Large: 413,

  /**
   * 414 URI Too Long: The server is refusing to service the request because the URI is longer than the server is willing to interpret.
   */
  Error_Client_414_URI_Too_Long: 414,

  /**
   * 415 Unsupported Media Type: The server is refusing to service the request
   * because the entity of the request is in a format not supported by the requested resource for the requested method.
   */
  Error_Client_415_Unsupported_Media_Type: 415,

  /**
   * 416 Range Not Satisfiable: The client has asked for a portion of the file, but the server cannot supply that portion.
   */
  Error_Client_416_Range_Not_Satisfiable: 416,

  /**
   * 417 Expectation Failed: The server cannot meet the requirements of the Expect request-header field.
   */
  Error_Client_417_Expectation_Failed: 417,

  /**
   * 421 Misdirected Request: The request was directed at a server that is not able to produce a response.
   */
  Error_Client_421_Misdirected_Request: 421,

  /**
   * 422 Unprocessable Entity: The request was well-formed but was unable to be followed due to semantic errors.
   */
  Error_Client_422_Unprocessable_Entity: 422,

  /**
   * 423 Locked: The resource that is being accessed is locked.
   */
  Error_Client_423_Locked: 423,

  /**
   * 424 Failed Dependency: The request failed due to a failure of a previous request.
   */
  Error_Client_424_Failed_Dependency: 424,

  /**
   * 425 Too Early: The server is unwilling to risk processing a request that might be replayed.
   */
  Error_Client_425_Too_Early: 425,

  /**
   * 426 Upgrade Required: The server refuses to perform the request using the current protocol
   * but might be willing to do so after the client upgrades to a different protocol.
   */
  Error_Client_426_Upgrade_Required: 426,

  /**
   * 428 Precondition Required: The origin server requires the request to be conditional.
   */
  Error_Client_428_Precondition_Required: 428,

  /**
   * 429 Too Many Requests: The user has sent too many requests in a given amount of time ("rate limiting").
   */
  Error_Client_429_Too_Many_Requests: 429,

  /**
   * 431 Request Header Fields Too Large: The server is unwilling to process the request because its header fields are too large.
   */
  Error_Client_431_Request_Header_Fields_Too_Large: 431,

  /**
   * 451 Unavailable For Legal Reasons: The user requests an illegal resource, such as a web page censored by a government.
   */
  Error_Client_451_Unavailable_For_Legal_Reasons: 451,

  /**
   * 500 Internal Server Error: A generic error message, given when no more specific message is suitable.
   */
  Error_Server_500_Internal_Server_Error: 500,

  /**
   * 501 Not Implemented: The server either does not recognize the request method, or it lacks the ability to fulfill the request.
   */
  Error_Server_501_Not_Implemented: 501,

  /**
   * 502 Bad Gateway: The server was acting as a gateway or proxy and received an invalid response from the upstream server.
   */
  Error_Server_502_Bad_Gateway: 502,

  /**
   * 503 Service Unavailable: The server is currently unavailable (because it is overloaded or down for maintenance).
   */
  Error_Server_503_Service_Unavailable: 503,

  /**
   * 504 Gateway Timeout: The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.
   */
  Error_Server_504_Gateway_Timeout: 504,

  /**
   * 505 HTTP Version Not Supported: The server does not support the HTTP protocol version used in the request.
   */
  Error_Server_505_HTTP_Version_Not_Supported: 505,

  /**
   * 506 Variant Also Negotiates: Transparent content negotiation for the request results in a circular reference.
   */
  Error_Server_506_Variant_Also_Negotiates: 506,

  /**
   * 507 Insufficient Storage: The server is unable to store the representation needed to complete the request.
   */
  Error_Server_507_Insufficient_Storage: 507,

  /**
   * 508 Loop Detected: The server detected an infinite loop while processing the request.
   */
  Error_Server_508_Loop_Detected: 508,

  /**
   * 510 Not Extended: Further extensions to the request are required for the server to fulfill it.
   */
  Error_Server_510_Not_Extended: 510,

  /**
   * 511 Network Authentication Required: The client needs to authenticate to gain network access.
   */
  Error_Server_511_Network_Authentication_Required: 511,
} as const;

/**
 * Object representing standard HTTP status messages.
 */
export const HttpStatusMessages = {
  100: 'Continue',
  101: 'Switching Protocols',
  102: 'Processing',
  103: 'Early Hints',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  207: 'Multi-Status',
  208: 'Already Reported',
  226: 'IM Used',
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  307: 'Temporary Redirect',
  308: 'Permanent Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Payload Too Large',
  414: 'URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Range Not Satisfiable',
  417: 'Expectation Failed',
  418: "I'm a Teapot",
  421: 'Misdirected Request',
  422: 'Unprocessable Entity',
  423: 'Locked',
  424: 'Failed Dependency',
  425: 'Too Early',
  426: 'Upgrade Required',
  428: 'Precondition Required',
  429: 'Too Many Requests',
  431: 'Request Header Fields Too Large',
  451: 'Unavailable For Legal Reasons',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  506: 'Variant Also Negotiates',
  507: 'Insufficient Storage',
  508: 'Loop Detected',
  509: 'Bandwidth Limit Exceeded',
  510: 'Not Extended',
  511: 'Network Authentication Required',
};

/**
 * Type representing standard HTTP status codes.
 */
export type HttpStatusCode = keyof typeof HttpStatusMessages;

/**
 * Object representing standard MIME types.
 */
export const MimeTypes = {
  'AAC': 'audio/aac',
  'ABW': 'application/x-abiword',
  'ARC': 'application/x-freearc',
  'AVI': 'video/x-msvideo',
  'AZW': 'application/vnd.amazon.ebook',
  'BIN': 'application/octet-stream',
  'BMP': 'image/bmp',
  'BZ': 'application/x-bzip',
  'BZ2': 'application/x-bzip2',
  'CSH': 'application/x-csh',
  'CSS': 'text/css',
  'CSV': 'text/csv',
  'DOC': 'application/msword',
  'DOCX': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'EOT': 'application/vnd.ms-fontobject',
  'EPUB': 'application/epub+zip',
  'GZ': 'application/gzip',
  'GIF': 'image/gif',
  'HTML': 'text/html',
  'ICO': 'image/vnd.microsoft.icon',
  'ICS': 'text/calendar',
  'JAR': 'application/java-archive',
  'JPEG': 'image/jpeg',
  'JS': 'text/javascript',
  'JSON': 'application/json',
  'JSONLD': 'application/ld+json',
  'MID': 'audio/midi',
  'MIDI': 'audio/midi',
  'MJS': 'text/javascript',
  'MP3': 'audio/mpeg',
  'MP4': 'video/mp4',
  'MPEG': 'video/mpeg',
  'MPKG': 'application/vnd.apple.installer+xml',
  'ODP': 'application/vnd.oasis.opendocument.presentation',
  'ODS': 'application/vnd.oasis.opendocument.spreadsheet',
  'ODT': 'application/vnd.oasis.opendocument.text',
  'OGA': 'audio/ogg',
  'OGV': 'video/ogg',
  'OGX': 'application/ogg',
  'OPUS': 'audio/opus',
  'OTF': 'font/otf',
  'PNG': 'image/png',
  'PDF': 'application/pdf',
  'PHP': 'application/x-httpd-php',
  'PPT': 'application/vnd.ms-powerpoint',
  'PPTX': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'RAR': 'application/vnd.rar',
  'RTF': 'application/rtf',
  'SH': 'application/x-sh',
  'SVG': 'image/svg+xml',
  'SWF': 'application/x-shockwave-flash',
  'TAR': 'application/x-tar',
  'TIFF': 'image/tiff',
  'TS': 'video/mp2t',
  'TTF': 'font/ttf',
  'TXT': 'text/plain',
  'VS': 'application/x-sh',
  'WAV': 'audio/wav',
  'WEBA': 'audio/webm',
  'WEBM': 'video/webm',
  'WEBP': 'image/webp',
  'WOFF': 'font/woff',
  'WOFF2': 'font/woff2',
  'XHTML': 'application/xhtml+xml',
  'XLS': 'application/vnd.ms-excel',
  'XLSX': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'XML': 'application/xml',
  'XUL': 'application/vnd.mozilla.xul+xml',
  'ZIP': 'application/zip',
  '3GP': 'video/3gpp',
  '3G2': 'video/3gpp2',
  '7Z': 'application/x-7z-compressed',
} as const;
