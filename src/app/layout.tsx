"use client";
import store from "@/Store/store";
import Script from "next/script";
import { Provider } from "react-redux";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <Script
            src="https://sdk.mercadopago.com/js/v2"
            strategy="lazyOnload"
          />
          {children}
        </body>
      </html>
    </Provider>
  );
}
