import { Routes, Route } from 'react-router-dom'
import ButtonDemo from './pages/Button'
import InputSystemDemo from './pages/TextInput'

function App() {

  return (
    <>
    <Routes>
      {/* <Route path="/" element={<h1>Home</h1>} /> */}
      <Route path="/" element={<InputSystemDemo />} />
      <Route path="/button" element={<ButtonDemo />} />
      <Route path='/input' element={<InputSystemDemo />} />
    </Routes>
    </>
  )
}

export default App
