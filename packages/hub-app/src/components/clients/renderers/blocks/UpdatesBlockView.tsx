'use client';

import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';
import { EmbrKitCard, EmbrKitAlert } from '@embr/ui';
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
        <EmbrKitAlert
          type="warning"
          title="Showing the last saved version"
          description="We couldn't reach the live feed just now — this may be out of date."
          closable={false}
        />
      )}
      {loading ? (
        <EmbrKitCard className="p-8 text-center">
          <p style={{ color: theme.colors.textSecondary }}>Loading updates…</p>
        </EmbrKitCard>
      ) : updates.length === 0 ? (
        <EmbrKitCard className="p-8 text-center">
          <p style={{ color: theme.colors.textSecondary }}>No updates yet — anything that changes will show up here the moment it's posted.</p>
        </EmbrKitCard>
      ) : (
        updates.map((update) => (
          <EmbrKitCard key={update.id} className="p-4">
            <p style={{ color: theme.colors.text, fontFamily: `'${theme.fonts.body}', sans-serif` }}>{update.message}</p>
            {update.postedAt && (
              <p className="text-xs mt-2" style={{ color: theme.colors.textSecondary }}>{formatPostedAt(update.postedAt)}</p>
            )}
          </EmbrKitCard>
        ))
      )}
    </div>
  );
}
