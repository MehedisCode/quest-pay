import { useEffect, useState } from 'react'
import './App.css'

const App = () => {
  const [msg, setMsg] = useState('');
  const backend_url = 'http://localhost:3000/'

  useEffect(() => {
    fetch(backend_url)
    .then((res) => {
      return res.text();
    })
    .then((data) => {
      setMsg(data);
    }, [])

  })

  return (
    <>
      <h1>Mehedi Hasan</h1>
      <h3>Data: {msg}</h3>
    </>
  )
}

export default App
