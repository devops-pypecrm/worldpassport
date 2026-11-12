import { Destination } from '@/lib/models';

/**
 * Keeps Destination.topUnis ("Partner universities") in step with the Universities table.
 * A university created/edited in admin → Universities is added under the destination whose
 * name matches its country; it is removed from a destination when its country changes or it is deleted.
 * Entries matched by university name (case-insensitive). Other topUnis entries are left untouched.
 */

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const ci = (s: string) => new RegExp(`^${esc(s.trim())}$`, 'i');

type UniLike = { name?: string; country?: string; ranking?: string };

export async function addUniversityToDestination(u: UniLike) {
  if (!u.name || !u.country) return;
  const dest = await Destination.findOne({ name: ci(u.country) });
  if (!dest) return;
  const list = (dest.topUnis || []) as { name: string; rank?: string; field?: string }[];
  const existing = list.find((t) => t.name.trim().toLowerCase() === u.name!.trim().toLowerCase());
  if (existing) {
    // Keep the ranking label in step with the university record
    if (u.ranking && existing.rank !== u.ranking) {
      await Destination.updateOne(
        { _id: dest._id, 'topUnis.name': existing.name },
        { $set: { 'topUnis.$.rank': u.ranking } },
      );
    }
    return;
  }
  await Destination.updateOne(
    { _id: dest._id },
    { $push: { topUnis: { name: u.name.trim(), rank: u.ranking || '', field: '' } } },
  );
}

export async function removeUniversityFromDestination(u: UniLike) {
  if (!u.name || !u.country) return;
  await Destination.updateOne(
    { name: ci(u.country) },
    { $pull: { topUnis: { name: ci(u.name) } } },
  );
}

/** Never let a sync problem fail the university save itself. */
export async function safeSync(fn: () => Promise<void>) {
  try { await fn(); } catch (err) {
    console.error('[universitySync]', err instanceof Error ? err.message : err);
  }
}
