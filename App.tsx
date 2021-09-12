import React, { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StyleSheet, Text, ImageBackground } from 'react-native'
import { Button } from 'react-native-elements'
import ProgressCircle from 'react-native-progress-circle'

const App = () => {
  const [ascents, setAscents] = useState(0)

  return (
    <SafeAreaProvider>
      <ImageBackground source={require('./images/mountain-1.png')} style={styles.container}>
        <ProgressCircle
          percent={ascents * 10}
          radius={80}
          borderWidth={8}
          color={'#d4af37'}
          shadowColor="#999"
          bgColor={'white'}
        >
          <Text style={styles.ascents}>{ascents}</Text>
        </ProgressCircle>
        <Button
          raised
          buttonStyle={styles.button}
          titleStyle={styles.buttonLabel}
          containerStyle={styles.buttonContainer}
          title={'COMPLETED ASCENT'}
          onPress={() => setAscents(ascents + 1)}
        />
        <Button type={'clear'} titleStyle={styles.resetButton} title={'Reset'} onPress={() => setAscents(0)} />
      </ImageBackground>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  ascents: {
    fontWeight: '900',
    color: 'black',
    fontSize: 72,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 28,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 16,
    paddingLeft: 16,
  },
  buttonContainer: {
    marginTop: 16,
    borderRadius: 28,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 16,
    paddingLeft: 16,
  },
  buttonLabel: {
    color: 'black',
    fontWeight: '900',
    fontSize: 12,
  },
  resetButton: {
    color: 'white',
  },
})

export default App
