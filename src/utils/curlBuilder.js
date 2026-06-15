function getHeaderParams(endpoint) {
  return (endpoint.params || []).filter(
    p => p.in === 'header' && !['content-type', 'accept'].includes(String(p.name).toLowerCase())
  );
}

function getHttpMethod(endpoint) {
  return endpoint.method === 'GRAPHQL' ? 'POST' : endpoint.method;
}

export function buildCurlSegments(baseUrl, endpoint) {
  const headerParams = getHeaderParams(endpoint);
  const httpMethod = getHttpMethod(endpoint);
  const isMultipart = endpoint.contentType === 'multipart/form-data';
  const hasJsonBody = endpoint.requestBody != null && !isMultipart;
  const hasMultipartBody = isMultipart && endpoint.requestBody != null;

  const segments = [
    { key: 'a', cont: true, pre: '', kw: '--request', arg: httpMethod },
    { key: 'b', cont: true, pre: '  ', kw: '--url', arg: `"${baseUrl}${endpoint.path}"` },
    { key: 'c', cont: headerParams.length > 0 || hasJsonBody || hasMultipartBody, pre: '  ', kw: '--header', arg: "'accept: application/json'" },
  ];

  headerParams.forEach((param, i) => {
    const key = String.fromCharCode(100 + i);
    const isLastHeader = i === headerParams.length - 1;
    const placeholder = param.name.toLowerCase() === 'authorization' || param.name === 'Pos-Authorization'
      ? '<jwt>'
      : `<${param.name}>`;
    segments.push({
      key,
      cont: !isLastHeader || hasJsonBody || hasMultipartBody,
      pre: '  ',
      kw: '--header',
      arg: `'${param.name}: ${placeholder}'`,
    });
  });

  if (hasJsonBody) {
    segments.push({ key: 'z-body-h', cont: true, pre: '  ', kw: '--header', arg: "'Content-Type: application/json'" });
    segments.push({
      key: 'z-body-d',
      cont: false,
      pre: '  ',
      kw: '--data-raw',
      arg: `'${JSON.stringify(endpoint.requestBody)}'`,
    });
  }

  if (hasMultipartBody) {
    const entries = Object.entries(endpoint.requestBody);
    entries.forEach(([field, value], i) => {
      const isFile = field === 'file' || String(value).match(/\.(xlsx|xls|csv|pdf|png|jpe?g)$/i);
      const formArg = isFile ? `'${field}=@${value}'` : `'${field}=${value}'`;
      segments.push({
        key: `z-form-${i}`,
        cont: i < entries.length - 1,
        pre: '  ',
        kw: '--form',
        arg: formArg,
      });
    });
  }

  return segments;
}

export function buildCurlCopyText(baseUrl, endpoint) {
  const headerParams = getHeaderParams(endpoint);
  const httpMethod = getHttpMethod(endpoint);
  const isMultipart = endpoint.contentType === 'multipart/form-data';
  const hasJsonBody = endpoint.requestBody != null && !isMultipart;
  const hasMultipartBody = isMultipart && endpoint.requestBody != null;

  let text = `curl -X ${httpMethod} "${baseUrl}${endpoint.path}" \\\n  -H "accept: application/json"`;

  headerParams.forEach(param => {
    const placeholder = param.name.toLowerCase() === 'authorization' || param.name === 'Pos-Authorization'
      ? '<jwt>'
      : `<${param.name}>`;
    text += ` \\\n  -H "${param.name}: ${placeholder}"`;
  });

  if (hasJsonBody) {
    text += ` \\\n  -H "Content-Type: application/json" \\\n  -d '${JSON.stringify(endpoint.requestBody)}'`;
  }

  if (hasMultipartBody) {
    Object.entries(endpoint.requestBody).forEach(([field, value]) => {
      const isFile = field === 'file' || String(value).match(/\.(xlsx|xls|csv|pdf|png|jpe?g)$/i);
      text += isFile
        ? ` \\\n  -F "${field}=@${value}"`
        : ` \\\n  -F "${field}=${value}"`;
    });
  }

  return text;
}
