export function summarizeDocks(jobs, events) {
  const groups = new Map();
  const group = (eventId) => {
    if (!groups.has(eventId)) groups.set(eventId, { eventId, views: 0, starts: 0, submissions: 0, conversationsRequested: 0, highPriority: 0, materialsAcceptedByProvider: 0, complementsAcceptedByProvider: 0 });
    return groups.get(eventId);
  };
  for (const event of events) {
    const row = group(event.eventId);
    if (event.event === 'docks_presentation_view') row.views++;
    if (event.event === 'docks_lead_start') row.starts++;
  }
  for (const job of jobs) {
    const row = group(job.lead.eventId);
    row.submissions++;
    row.conversationsRequested += job.lead.commercialConsent ? 1 : 0;
    row.highPriority += job.lead.qualification.stars >= 4 ? 1 : 0;
    row.materialsAcceptedByProvider += job.receipts?.material?.id ? 1 : 0;
    row.complementsAcceptedByProvider += ['practice', 'reflection'].filter((step) => job.receipts?.[step]?.id).length;
  }
  return [...groups.values()].map((row) => ({ ...row, submissionPerViewRate: row.views ? row.submissions / row.views : null }));
}
