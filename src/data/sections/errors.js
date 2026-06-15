/** Reference guide — not an API module. Rendered by ErrorsGuide. */
export default {
  id: "errors",
  label: "Errors",
  icon: "⚠️",
  color: "#dc2626",
  guide: true,
  description:
    "GIS API uses conventional HTTP response codes to indicate request success or failure. Codes in the 2xx range indicate success. 4xx codes indicate a client error. 5xx codes indicate a server error.",
  guideData: {
    intro: [
      "GIS APIs return JSON for both success and error responses. A successful call typically includes success: true (or code: 200) with a data payload. Failed calls return an appropriate HTTP status, success: false, and a human-readable message explaining the failure.",
      "For authenticated routes, send a valid JWT in the authorization header. POS routes also require Pos-Authorization from generatePOSAuthToken. Missing or expired tokens return 401 Unauthorized.",
    ],
    sampleError: {
      success: false,
      code: 401,
      message: "Unauthorized — missing or invalid authorization token.",
      type: "authentication_error",
    },
    attributes: [
      {
        name: "success",
        type: "boolean",
        description: "false when the request failed. Omitted or true on success.",
      },
      {
        name: "code",
        type: "integer",
        description: "HTTP status code echoed in the JSON body (e.g. 400, 401, 404). Matches the response status.",
      },
      {
        name: "message",
        type: "string",
        description: "Human-readable explanation of the error. Display this to users or log it for support.",
      },
      {
        name: "type",
        type: "nullable string",
        description:
          "Machine-readable error category — one of authentication_error, authorization_error, validation_error, not_found_error, graphql_error, pos_session_error, conflict_error, rate_limit_error, api_error, or server_error.",
      },
      {
        name: "param",
        type: "nullable string",
        description: "When a specific request field caused the error, the parameter name (e.g. customer_id, authorization).",
      },
      {
        name: "errors",
        type: "nullable array",
        description: "Optional list of field-level validation errors. Each item may include param and message.",
      },
    ],
    httpCodes: [
      { code: 200, name: "OK", description: "Everything worked as expected." },
      { code: 400, name: "Bad Request", description: "Malformed JSON, missing required fields, or invalid parameter values." },
      { code: 401, name: "Unauthorized", description: "Missing, expired, or invalid authorization or Pos-Authorization token." },
      { code: 403, name: "Forbidden", description: "Valid token but insufficient permissions for this action or resource." },
      { code: 404, name: "Not Found", description: "The requested resource does not exist (wrong id, deleted record, unknown route)." },
      { code: 409, name: "Conflict", description: "Request conflicts with current state (duplicate entry, closed register, locked cart)." },
      { code: 422, name: "Unprocessable Entity", description: "JSON is valid but business rules reject the operation." },
      { code: 429, name: "Too Many Requests", description: "Rate limit exceeded — typically 1,000 requests/minute per API key." },
      { code: 500, name: "Internal Server Error", description: "Unexpected server failure. Retry with backoff; contact support if persistent." },
      { code: 502, name: "Bad Gateway", description: "Upstream service unreachable. Retry after a short delay." },
      { code: 503, name: "Service Unavailable", description: "Server temporarily overloaded or under maintenance." },
      { code: 504, name: "Gateway Timeout", description: "Upstream service did not respond in time." },
    ],
    errorTypes: [
      {
        type: "authentication_error",
        description: "Invalid or missing JWT — login again via Auth store-login or refresh Pos-Authorization.",
      },
      {
        type: "authorization_error",
        description: "Token is valid but the user role cannot perform this action.",
      },
      {
        type: "validation_error",
        description: "Required body fields missing or wrong type — check the Parameters table on each endpoint.",
      },
      {
        type: "not_found_error",
        description: "Referenced id does not exist (device, customer, product, supplier, etc.).",
      },
      {
        type: "graphql_error",
        description: "GraphQL query syntax error or unknown field — verify query against GraphQL module docs.",
      },
      {
        type: "pos_session_error",
        description: "POS session invalid — voucher not selected, register closed, or location mismatch.",
      },
      {
        type: "conflict_error",
        description: "Operation not allowed in current state (e.g. saving to a closed cash register).",
      },
      {
        type: "rate_limit_error",
        description: "Too many requests — slow down and retry after the Retry-After period.",
      },
      {
        type: "api_error",
        description: "Generic API failure not covered by other types.",
      },
      {
        type: "server_error",
        description: "Internal or gateway failure — safe to retry idempotent reads; use caution on writes.",
      },
    ],
    documentedMessages: [
      { code: 401, message: "Unauthorized — missing or invalid authorization token." },
      { code: 400, message: "Bad Request — invalid filter format." },
      { code: 400, message: "Bad Request — malformed GraphQL query." },
      { code: 400, message: "Bad Request — malformed GraphQL query syntax." },
      { code: 400, message: "Bad Request — missing required fields (name, deviceType)." },
      { code: 400, message: "Bad Request — missing required id or name." },
      { code: 400, message: "Bad Request — missing _id or invalid field value." },
      { code: 400, message: "Bad Request — missing Payment_method_id, name, or keys." },
      { code: 400, message: "Bad Request — missing required fields (name, label, rate, type)." },
      { code: 400, message: "Bad Request — name is required." },
      { code: 400, message: "Bad Request — missing _id or name." },
      { code: 404, message: "Not Found — no device matches the provided id." },
      { code: 404, message: "Not Found — no application key matches the provided _id." },
      { code: 404, message: "Not Found — no supplier matches the provided id." },
      { code: 429, message: "Too Many Requests — rate limit exceeded." },
    ],
    handling: [
      "Check the HTTP status code first, then read message and type from the JSON body.",
      "On 401, refresh the admin JWT via store-login. For POS routes, call generatePOSAuthToken again before retrying.",
      "On 400 or 422, compare your request body against the endpoint Parameters table — fix param fields listed in errors[].",
      "On 404, verify ids exist and belong to the current organisation / location.",
      "On 429, implement exponential backoff; do not retry writes immediately without checking idempotency.",
      "On 5xx, retry GET-style reads after a delay; for POST saves, confirm whether the operation succeeded before resubmitting.",
    ],
  },
};
