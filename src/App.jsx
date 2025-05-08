import React from "react"
import ErrorBoundary from "./utils/ErrorBoundary"
import Home from "./pages/Home"


function App() {

  return (
    <ErrorBoundary>
      <Home />
    </ErrorBoundary>
  )
}

export default App
