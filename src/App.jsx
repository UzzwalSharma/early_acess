import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'
import Ticker from './pages/Ticker'
import Features from './pages/Features'

import Hero from './pages/Herosection'
import Last from './pages/Last'

function App() {
  useEffect(() => {
    // Show welcome toast on page load
    toast.success('Welcome to PrepMate! Join 7 early birds unlocking focus.', {
      duration: 4000,
      style: {
        background: 'linear-gradient(135deg, rgba(124,58,237,0.9), rgba(6,182,212,0.7))',
        border: '1px solid rgba(124,58,237,0.5)',
      },
    });
  }, []);
  return (
    <div>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1a1a1d',
            color: '#fff',
            border: '1px solid rgba(124,58,237,0.3)',
            fontFamily: "'DM Sans', sans-serif",
          },
        }}
      />
      <Hero/>
      <Ticker/>
      <Features/>
       <Last/>
    </div>
  )
}

export default App
