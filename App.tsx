import React, { useState, useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StyleSheet, Text, ImageBackground, View } from 'react-native'
import { Button, Overlay } from 'react-native-elements'
import ProgressCircle from 'react-native-progress-circle'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Picker from '@gregfrench/react-native-wheel-picker'
import Grades from './utils/grades'

const PickerItem = Picker.Item

Icon.loadFont()

const App = () => {
  const [ascents, setAscents] = useState(0)
  const [visible, setVisible] = useState(false)
  const [grade, setGrade] = useState('4A')

  const toggleOverlay = () => {
    setVisible(!visible)
  }

  const handleCompleteButton = () => {
    if (ascents < 10) {
      setAscents(ascents < 10 ? ascents + 1 : 10)
    } else {
      toggleOverlay()
    }
  }

  const handleGradeChange = (value: string) => {
    setAscents(0)
    setGrade(value)
  }

  useEffect(() => {
    if (ascents === 10) {
      toggleOverlay()
    }
  }, [ascents])

  return (
    <SafeAreaProvider>
      <ImageBackground source={require('./images/mountain-1.png')} style={styles.container}>
        <View style={styles.gradeContainer}>
          <Text style={styles.gradeLabel}>{'GRADE'}</Text>
          <Text style={styles.grade}>{grade}</Text>
        </View>
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
          icon={<Icon size={18} style={{ marginRight: 8 }} name="check" color="#black" />}
          containerStyle={styles.buttonContainer}
          title={ascents === 10 ? 'CHANGE GRADE' : 'COMPLETED ASCENT'}
          onPress={handleCompleteButton}
        />
        <Button type={'clear'} titleStyle={styles.resetButton} title={'Reset'} onPress={() => setAscents(0)} />
      </ImageBackground>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={styles.overlayContainer}>
          <Text style={styles.congratsTitle}>Congratulations! You have completed 10ASCENTS</Text>
          <Text style={styles.congratsDescription}>You are now ready to try routes one grade higher!</Text>
          <Picker
            style={{ width: 150, height: 180 }}
            lineColor="#000000"
            selectedValue={grade}
            itemStyle={{ color: 'black', fontSize: 26 }}
            onValueChange={(value) => handleGradeChange(value)}
          >
            {Grades.map((value, i) => (
              <PickerItem label={value} value={value} key={i} />
            ))}
          </Picker>
        </View>
      </Overlay>
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
  gradeContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  gradeLabel: {
    fontWeight: '200',
    color: 'white',
    fontSize: 24,
  },
  grade: {
    fontWeight: '700',
    color: 'white',
    fontSize: 24,
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
    marginTop: 16,
    fontSize: 12,
  },
  overlayContainer: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  congratsTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  congratsDescription: {
    fontSize: 12,
    fontWeight: '300',
  },
})

export default App
