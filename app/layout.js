import "./globals.css";
import { Vazirmatn } from "next/font/google";
import { metadata } from "./metadata";
import Providers from "./providers";

const vazirmatn = Vazirmatn({ subsets: ["latin"] });
export { metadata };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${vazirmatn.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
