import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ConvexReactClient, ConvexProvider } from "convex/react";
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);
createRoot(document.getElementById('root')).render(

  <ConvexProvider client={convex}>
      <App />
    </ConvexProvider>
 
)
