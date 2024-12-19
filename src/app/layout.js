import "./globals.css";
import Navbar from "../components/Navbar";
import { HeroProvider } from "../context/HeroContext";

export const metadata = {
  title: "MARVEL",
  description: "projeto criado usando api marvel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/m logo.png" />
        <link rel="apple-touch-icon" href="/logo192.png" />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rowdies:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap"
          rel="stylesheet"
        />

        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className="antialiased"
        style={{ fontFamily: "Rowdies, sans-serif" }}
      >
        
        <HeroProvider><Navbar />{children}</HeroProvider>
      </body>
    </html>
  );
}
