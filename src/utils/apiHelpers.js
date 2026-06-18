/** Collect every endpoint from a section (flat list). */
export function getSectionEndpoints(section) {
  if (section.endpoints?.length) return section.endpoints;
  return (section.subsections || []).flatMap(sub => [
    ...(sub.endpoints || []),
    ...((sub.childGroups || []).flatMap(g => g.endpoints || [])),
  ]);
}

export function countSectionEndpoints(section) {
  if (section.guide && section.guideData?.workflows) {
    return section.guideData.workflows.reduce((acc, wf) => acc + wf.items.length, 0);
  }
  if (section.guide && section.guideData?.httpCodes) {
    return section.guideData.httpCodes.length;
  }
  return getSectionEndpoints(section).length;
}

export function findEndpoint(sections, selection) {
  if (!selection) return null;
  const section = sections.find(s => s.id === selection.sectionId);
  if (!section) return null;

  if (selection.subsectionId) {
    const subsection = section.subsections?.find(s => s.id === selection.subsectionId);
    if (!subsection) return null;

    if (selection.nestedGroupId) {
      const group = subsection.childGroups?.find(g => g.id === selection.nestedGroupId);
      return group?.endpoints?.find(e => e.id === selection.endpointId) ?? null;
    }
    return subsection.endpoints?.find(e => e.id === selection.endpointId) ?? null;
  }

  return section.endpoints?.find(e => e.id === selection.endpointId) ?? null;
}

function getFlatEndpointEntries(sections) {
  const entries = [];

  (sections || []).forEach(section => {
    if (section.guide) return;

    (section.endpoints || []).forEach(endpoint => {
      entries.push({
        endpoint,
        selection: { sectionId: section.id, endpointId: endpoint.id },
      });
    });

    (section.subsections || []).forEach(subsection => {
      (subsection.endpoints || []).forEach(endpoint => {
        entries.push({
          endpoint,
          selection: {
            sectionId: section.id,
            subsectionId: subsection.id,
            endpointId: endpoint.id,
          },
        });
      });

      (subsection.childGroups || []).forEach(group => {
        (group.endpoints || []).forEach(endpoint => {
          entries.push({
            endpoint,
            selection: {
              sectionId: section.id,
              subsectionId: subsection.id,
              nestedGroupId: group.id,
              endpointId: endpoint.id,
            },
          });
        });
      });
    });
  });

  return entries;
}

export function getEndpointNeighbors(sections, selection) {
  if (!selection?.endpointId) return { prev: null, next: null };
  const entries = getFlatEndpointEntries(sections);
  const index = entries.findIndex(item =>
    item.selection.sectionId === selection.sectionId
    && item.selection.subsectionId === selection.subsectionId
    && item.selection.nestedGroupId === selection.nestedGroupId
    && item.selection.endpointId === selection.endpointId
  );

  if (index < 0) return { prev: null, next: null };
  return {
    prev: index > 0 ? entries[index - 1] : null,
    next: index < entries.length - 1 ? entries[index + 1] : null,
  };
}

export function nestedNavKey(sectionId, subsectionId, groupId) {
  return `${sectionId}::${subsectionId}::${groupId}`;
}
