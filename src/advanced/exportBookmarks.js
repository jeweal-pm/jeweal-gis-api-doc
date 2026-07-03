export function downloadBookmarksJson(bookmarks, apiData) {
  const payload = {
    exportedAt: new Date().toISOString(),
    baseUrl: apiData.baseUrl,
    bookmarks: bookmarks.map(b => ({
      title: b.endpoint.title,
      method: b.endpoint.method,
      path: b.endpoint.path,
      breadcrumb: b.breadcrumb,
      selection: b.selection,
    })),
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `gis-api-bookmarks-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export function downloadBookmarksMarkdown(bookmarks, apiData) {
  const lines = [
    '# GIS API Bookmarks',
    '',
    `Base URL: \`${apiData.baseUrl}\``,
    '',
  ];

  bookmarks.forEach(b => {
    lines.push(`- **${b.endpoint.method}** ${b.endpoint.title}`);
    lines.push(`  - Path: \`${b.endpoint.path}\``);
    lines.push(`  - Module: ${b.breadcrumb}`);
    lines.push('');
  });

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `gis-api-bookmarks-${Date.now()}.md`;
  link.click();
  URL.revokeObjectURL(url);
}
