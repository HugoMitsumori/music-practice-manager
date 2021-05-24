import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

const Main = (): React.FC => (
  <View style={styles.container}>
    <Text>Open up Main.tsx to start working on your app!</Text>
    <StatusBar style="auto" />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Main
