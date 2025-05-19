import { Routes, Route } from 'react-router-dom'
import ButtonDemo from './Button'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/button" element={<ButtonDemo />} />
    </Routes>
    </>
  )
}

export default App
