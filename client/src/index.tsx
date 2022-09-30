import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import ThemeProvider from './components/providers/ThemeProvider'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Router>
)
