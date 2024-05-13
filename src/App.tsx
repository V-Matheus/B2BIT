import React from 'react'
import './styles/index.css'
import Auth from './components/Auth'

const App: React.FC = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
     <Auth />
    </div>
  )
}

export default App