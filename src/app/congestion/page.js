"use client";

import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

function formatTs(ts) {
  const d = new Date(ts);
  return d.toLocaleString(undefined, { hour: "2-digit", minute: "2-digit", month: "short", day: "2-digit" });
}

function generateMockData(hours = 48, stepMin = 15) {
  const now = Date.now();
  const out = [];
  const n = Math.floor((hours * 60) / stepMin);
  let base = 0;
  for (let i = n; i >= 0; i--) {
    const t = now - i * stepMin * 60_000;
    const phi = i / 6;
    const jitter = () => (Math.random() - 0.5) * 8;
    base = base * 0.9 + jitter();
    out.push({
      timestamp: new Date(t).toISOString(),
      west: 10 * Math.sin(phi * 0.6) + 15 + jitter() + base,
      north: 12 * Math.sin(phi * 0.55 + 0.3) + 5 + jitter() + base,
      south: 8 * Math.sin(phi * 0.5 - 0.2) - 2 + jitter() + base,
      houston: 11 * Math.sin(phi * 0.65 + 0.7) + jitter() + base,
      panhandle: 14 * Math.sin(phi * 0.7 - 0.4) - 4 + jitter() + base,
    });
  }
  return out;
}

export default function CongestionPage() {
  const [data, setData] = useState([]);
  const [useMock] = useState(true);

  useEffect(() => {
    if (useMock) setData(generateMockData());
  }, [useMock]);

  const series = [
    { key: "west", label: "West" },
    { key: "north", label: "North" },
    { key: "south", label: "South" },
    { key: "houston", label: "Houston" },
    { key: "panhandle", label: "Panhandle" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4">
      <h1 className="text-2xl font-semibold mb-4">ERCOT Congestion ($/MW)</h1>
      <div className="h-[420px] bg-white p-3 rounded-xl border">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tickFormatter={formatTs} minTickGap={30} />
            <YAxis label={{ value: "$/MW", angle: -90, position: "insideLeft" }} domain={["auto", "auto"]} />
            <Tooltip formatter={(value) => (typeof value === "number" ? value.toFixed(2) : value)} labelFormatter={formatTs} />
            <Legend />
            {series.map((s) => (
              <Line key={s.key} type="monotone" dataKey={s.key} name={s.label} dot={false} strokeWidth={2} isAnimationActive={false} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
