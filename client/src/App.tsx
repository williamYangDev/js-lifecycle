import { useEffect, useState } from 'react'

function App() {
  const [status, setStatus] = useState<string>('checking...')

  useEffect(() => {
    fetch('/api/health')
      .then((r) => r.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus('error'))
  }, [])

  return (
    <div>
      <h1>js-lifecycle</h1>
      <p>API status: {status}</p>
    </div>
  )
}

export default App
