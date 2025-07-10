"use client";

import { useEffect, useState } from "react";

export default function FetchTest() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/client-configs/demo-festival.json")
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <h1>Fetch Test</h1>
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      <pre>{data ? JSON.stringify(data, null, 2) : "Loading..."}</pre>
    </div>
  );
} 