export const metadata = {
  title: "Identité visuelle · Cours IA",
  description: "Apprends à créer une identité visuelle de marque professionnelle avec l'IA",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, padding: 0, background: "#0e0e0f", overscrollBehavior: "none" }}>
        {children}
      </body>
    </html>
  );
}
