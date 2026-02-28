export default function Home() {
  return (
    <main style={{ padding: '40px', fontFamily: 'system-ui' }}>
      <h1>Apex Health IA - Slide Generator</h1>
      <p>API endpoint: <code>/api/slide?data=BASE64_JSON</code></p>
      <h2>Slide Types</h2>
      <ul>
        <li><strong>cover</strong>: type, headline, subtitle</li>
        <li><strong>content</strong>: type, title, bullets[], slideNumber, totalSlides</li>
        <li><strong>cta</strong>: type, headline, body</li>
      </ul>
    </main>
  )
}
