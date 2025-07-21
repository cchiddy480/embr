'use client';

import { Button } from '@embr/ui/src/components/Button/Button';
import { Input } from '@embr/ui/src/components/Input/Input';
import { useState } from 'react';
import { Card } from '@embr/ui/src/components/Card/Card';

function MagnifierIcon() {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20" stroke="currentColor" className="text-[#0F766E]">
      <circle cx="9" cy="9" r="7" strokeWidth="2" />
      <line x1="14.5" y1="14.5" x2="18" y2="18" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function ComponentsDemo() {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  return (
    <div className="min-h-screen bg-[#101926] flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-2xl font-bold text-white mb-4">Embr UI Components Demo</h1>
      <div className="w-full max-w-xs flex flex-col gap-4">
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="ghost">Ghost Button</Button>
        <Button variant="primary" disabled>Disabled</Button>
        <Input
          label="Search"
          icon={<MagnifierIcon />}
          placeholder="Type to search..."
          value={inputValue}
          onChange={e => {
            setInputValue(e.target.value);
            setError(e.target.value.length > 10 ? 'Max 10 characters' : undefined);
          }}
          helperText="You can search for anything."
          error={error}
          name="search"
        />
        <Card
          header={<span className="text-lg font-bold text-white">Card Header</span>}
          footer={<span className="text-xs text-gray-400">Card Footer</span>}
        >
          <div className="text-white">This is the card content. Use this for schedule items, guest info, or any modular content.</div>
        </Card>
      </div>
    </div>
  );
} 