import { assertDocksConfiguration, docksStore, processDock, DAY } from './_shared/docks-queue.mjs';
export default async (_request, context) => {
  if (context?.deploy?.context !== 'production') return new Response(null, { status: 204 });
  assertDocksConfiguration();
  const store = docksStore(context);
  const now = Date.now(), deadline = now + 22000;
  let processed = 0;
  for await (const page of store.list({ prefix: 'due/', paginate: true })) {
    for (const blob of page.blobs) {
      if (Date.now() > deadline) return Response.json({ processed });
      if (Number(blob.key.split('/')[1]) > now) continue;
      const index = await store.get(blob.key, { type: 'json' });
      if (!index) continue;
      const result = await processDock(store, index.jobKey);
      const step = { 0: 'material', 2: 'practice', 7: 'reflection' }[index.delay];
      if (['missing', 'expired', 'review', 'complete'].includes(result.state) || (step && result.receipts?.[step])) await store.delete(blob.key);
      processed++;
    }
  }
  for await (const page of store.list({ prefix: 'metrics/', paginate: true })) {
    for (const blob of page.blobs) {
      if (Date.now() > deadline) return Response.json({ processed });
      if (now - Date.parse(blob.key.split('/')[1]) > 30 * DAY) await store.delete(blob.key);
    }
  }
  return Response.json({ processed });
};
export const config = { schedule: '*/15 * * * *' };
