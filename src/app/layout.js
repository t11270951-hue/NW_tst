export const metadata = {
  title: "ERCOT Mock CRR Lab",
  description: "Private CRR sandbox with congestion chart",
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
