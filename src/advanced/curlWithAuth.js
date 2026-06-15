import { buildCurlCopyText } from '../utils/curlBuilder';

export function buildAuthenticatedCurl(baseUrl, endpoint, tokens) {
  let text = buildCurlCopyText(baseUrl, endpoint);
  const { authorization, posAuthorization } = tokens || {};

  if (authorization?.trim()) {
    text = text.replace(/<jwt>/g, authorization.trim());
    text = text.replace(/authorization: <jwt>/gi, `authorization: ${authorization.trim()}`);
  }
  if (posAuthorization?.trim()) {
    text = text.replace(/Pos-Authorization: <Pos-Authorization>/g, `Pos-Authorization: ${posAuthorization.trim()}`);
    text = text.replace(/<Pos-Authorization>/g, posAuthorization.trim());
  }

  return text;
}
