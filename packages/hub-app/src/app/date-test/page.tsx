'use client';

import React, { useEffect, useState } from 'react';

export default function DateTest() {
  const [now, setNow] = useState('');

  useEffect(() => {
    const current = new Date();
    setNow(current.toString() + ' | ISO: ' + current.toISOString());
    console.log('[DateTest] new Date():', current, '| ISO:', current.toISOString());
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <h1>Date Test</h1>
      <p>
        <strong>Current time from <code>new Date()</code>:</strong>
      </p>
      <pre>{now}</pre>
      <p>Check your browser console for the raw <code>Date</code> object as well.</p>
    </div>
  );
} 