import Link from "next/link";

export default function Page() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-2">ERCOT Mock CRR Lab</h1>
      <p className="text-slate-600 mb-6">
        Starter app. Use the Congestion chart below, then we’ll wire live data and history.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li><Link className="text-blue-700 underline" href="/congestion">Congestion ($/MW) chart</Link></li>
      </ul>
    </main>
  );
}
