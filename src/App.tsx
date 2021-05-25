import React from 'react'
import { registerRootComponent } from 'expo'
import Main from './screens/Main'

export default function App() {
  return (
    <Main />
  )
}

registerRootComponent(App)
