import { View, Text } from 'react-native'
import React from 'react'
import { AuthProvider } from './src/context/AuthContext'
import Routes from './src/Navigation/Routes'

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App