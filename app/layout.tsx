import "./globals.css";

export const metadata = {
  title: "CDM — Deal coordination without the handoff",
  description: "Turn closed-won sales conversations into coordinated action.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#0b0d12", color: "#e7e9ee", margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
