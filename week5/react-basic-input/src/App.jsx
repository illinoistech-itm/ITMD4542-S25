import { useState } from 'react'
import Box from './components/Box'
import './App.css'
import InputArea from './components/InputArea'

function App() {
  const [color, setColor] = useState('#ff0000');
  const [text, setText] = useState('box div');

  return (
    <div id="app">
      <InputArea text={text} color={color} handleChangeText={setText} handleChangeColor={setColor} />
      <Box color={color} text={text} />
    </div>
  )
}

export default App
