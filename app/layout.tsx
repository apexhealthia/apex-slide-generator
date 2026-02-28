export const metadata = {
  title: 'Apex Health IA - Slide Generator',
  description: 'Generates Instagram carousel slides as images',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
