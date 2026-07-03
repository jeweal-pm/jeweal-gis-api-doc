function getHeaderParams(endpoint) {
  return (endpoint.params || []).filter(
    p => p.in === 'header' && !['content-type', 'accept'].includes(String(p.name).toLowerCase())
  );
}

function getHttpMethod(endpoint) {
  return endpoint.method === 'GRAPHQL' ? 'POST' : endpoint.method;
}

function resolveToken(name, tokens) {
  const lower = String(name).toLowerCase();
  if (lower === 'authorization' && tokens?.authorization?.trim()) {
    return tokens.authorization.trim();
  }
  if (name === 'Pos-Authorization' && tokens?.posAuthorization?.trim()) {
    return tokens.posAuthorization.trim();
  }
  if (lower === 'authorization' || name === 'Pos-Authorization') return '<jwt>';
  return `<${name}>`;
}

function buildHeaders(endpoint, tokens) {
  const headers = { accept: 'application/json' };
  getHeaderParams(endpoint).forEach(param => {
    headers[param.name] = resolveToken(param.name, tokens);
  });
  const isMultipart = endpoint.contentType === 'multipart/form-data';
  if (endpoint.requestBody != null && !isMultipart) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
}

export function buildFetchSnippet(baseUrl, endpoint, tokens) {
  const method = getHttpMethod(endpoint);
  const url = `${baseUrl}${endpoint.path}`;
  const headers = buildHeaders(endpoint, tokens);
  const isMultipart = endpoint.contentType === 'multipart/form-data';
  const hasBody = endpoint.requestBody != null && !isMultipart;

  let body = '';
  if (hasBody) {
    body = `\n  body: JSON.stringify(${JSON.stringify(endpoint.requestBody, null, 2)}),`;
  } else if (isMultipart) {
    body = `\n  body: formData, // build FormData from fields`;
  }

  return `const response = await fetch('${url}', {
  method: '${method}',
  headers: ${JSON.stringify(headers, null, 2)},${body}
});

const data = await response.json();`;
}

export function buildAxiosSnippet(baseUrl, endpoint, tokens) {
  const method = getHttpMethod(endpoint).toLowerCase();
  const url = `${baseUrl}${endpoint.path}`;
  const headers = buildHeaders(endpoint, tokens);
  const isMultipart = endpoint.contentType === 'multipart/form-data';
  const hasBody = endpoint.requestBody != null && !isMultipart;

  if (isMultipart) {
    return `// const formData = new FormData();\nconst { data } = await axios.${method}(\n  '${url}',\n  formData,\n  { headers: ${JSON.stringify(headers, null, 2)} }\n);`;
  }

  if (hasBody) {
    return `const { data } = await axios.${method}(\n  '${url}',\n  ${JSON.stringify(endpoint.requestBody, null, 2)},\n  { headers: ${JSON.stringify(headers, null, 2)} }\n);`;
  }

  return `const { data } = await axios.${method}(\n  '${url}',\n  { headers: ${JSON.stringify(headers, null, 2)} }\n);`;
}

export function buildPythonSnippet(baseUrl, endpoint, tokens) {
  const method = getHttpMethod(endpoint);
  const url = `${baseUrl}${endpoint.path}`;
  const headers = buildHeaders(endpoint, tokens);
  const isMultipart = endpoint.contentType === 'multipart/form-data';
  const hasBody = endpoint.requestBody != null && !isMultipart;

  const lines = [
    'import requests',
    '',
    `url = "${url}"`,
    `headers = ${JSON.stringify(headers, null, 2)}`,
  ];

  if (hasBody) {
    lines.push(`payload = ${JSON.stringify(endpoint.requestBody, null, 2)}`);
    lines.push(`response = requests.${method.toLowerCase()}(url, headers=headers, json=payload)`);
  } else if (isMultipart) {
    lines.push('# files = {"file": open("path/to/file", "rb")}');
    lines.push(`response = requests.${method.toLowerCase()}(url, headers=headers, files=files)`);
  } else {
    lines.push(`response = requests.${method.toLowerCase()}(url, headers=headers)`);
  }

  lines.push('data = response.json()');
  return lines.join('\n');
}
