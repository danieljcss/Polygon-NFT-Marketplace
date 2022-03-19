import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="min-h-screen bg-gradient-to-tr from-dark-purple-900 via-dark-purple-700 to-dark-purple-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}