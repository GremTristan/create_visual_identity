export const metadata = {
  title: "Brand Studio — Identité visuelle",
  description: "Construis une identité visuelle professionnelle en 8 étapes guidées.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, padding: 0, background: "#F0F2F7" }}>
        {children}
      </body>
    </html>
  );
}
