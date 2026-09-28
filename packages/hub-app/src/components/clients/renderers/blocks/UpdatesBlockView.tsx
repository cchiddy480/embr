'use client';

import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';
import { GuideCard } from './GuideCard';
import type { UpdatesBlock, Theme } from '../../../../types/blocks-schema';

interface UpdatesBlockViewProps {
  block: UpdatesBlock;
  theme: Theme;
  clientId: string;
}

interface GuideUpdate {
  id: string;
  message: string;
  postedAt: Timestamp | number | null;
}

const MONO_FONT = "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

function formatPostedAt(postedAt: GuideUpdate['postedAt']): string {
  if (!postedAt) return '';
  const date = postedAt instanceof Timestamp ? postedAt.toDate() : new Date(postedAt);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

export function UpdatesBlockView({ theme, clientId }: UpdatesBlockViewProps) {
  const [updates, setUpdates] = useState<GuideUpdate[]>([]);
  const [connError, setConnError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'client-configs', clientId, 'updates'), orderBy('postedAt', 'desc'), limit(50));
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setUpdates(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<GuideUpdate, 'id'>) })));
        setConnError(false);
        setLoading(false);
      },
      () => {
        // Keep whatever was last loaded on screen — never a blank/error state.
        setConnError(true);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [clientId]);

  return (
    <div aria-live="polite" className="flex flex-col gap-3">
      {connError && (
        <div
          className="rounded-2xl px-4 py-3 text-sm"
          style={{ border: `1px solid ${theme.colors.border ?? `${theme.colors.text}1a`}`, color: theme.colors.textSecondary }}
        >
          Showing the last saved version — we could not reach the live feed just now.
        </div>
      )}
      {loading ? (
        <GuideCard theme={theme} className="text-center">
          <p style={{ color: theme.colors.textSecondary }}>Loading updates.</p>
        </GuideCard>
      ) : updates.length === 0 ? (
        <GuideCard theme={theme} className="text-center">
          <p style={{ color: theme.colors.textSecondary }}>No updates yet. Anything that changes will show up here the moment it is posted.</p>
        </GuideCard>
      ) : (
        updates.map((update) => (
          <GuideCard key={update.id} theme={theme} className="p-4">
            <p style={{ color: theme.colors.text, fontFamily: `'${theme.fonts.body}', sans-serif` }}>{update.message}</p>
            {update.postedAt && (
              <p className="text-xs mt-2" style={{ color: theme.colors.textSecondary, fontFamily: MONO_FONT }}>{formatPostedAt(update.postedAt)}</p>
            )}
          </GuideCard>
        ))
      )}
    </div>
  );
}
