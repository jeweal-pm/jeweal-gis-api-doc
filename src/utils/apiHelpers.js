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

export function nestedNavKey(sectionId, subsectionId, groupId) {
  return `${sectionId}::${subsectionId}::${groupId}`;
}
