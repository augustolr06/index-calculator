import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from '@nexds/web'
import { GlobalStyle } from './global.styles.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ThemeProvider theme="dark">
      <GlobalStyle />
      <App />
    </ThemeProvider>,
)
