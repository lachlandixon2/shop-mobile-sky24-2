import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

export default function ProductViewScreen(props) {
  return (
    <View style={styles.container}>
      <Text  style={styles.text}>ProductViewScreen Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});