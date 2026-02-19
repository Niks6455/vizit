import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { YandexMetrika } from "./_components/YandexMetrika"
import { MailRuPixel } from "./_components/MailRuPixel"

const inter = Inter({
  variable: "--font-body-face",
  subsets: ["latin", "cyrillic"],
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display-face",
  subsets: ["latin"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-face",
  subsets: ["latin", "cyrillic"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Никита Капылов — Front-end Developer",
  description:
    "Сайт-визитка: Front-end разработчик (React/Next.js). Проекты, опыт, стек и контакты.",
  icons: {
    icon: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <YandexMetrika />
        <MailRuPixel />
      </body>
    </html>
  )
}
