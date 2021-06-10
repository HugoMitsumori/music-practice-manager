import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import {
  Button,
  Text,
  TextInput,
  Provider as PaperProvider,
} from 'react-native-paper'
import PracticeListItem from '../components/PracticeListItem'

const LIST_KEY = 'list'

const Main = (): JSX.Element => {
  const [list, setList] = useState([] as Array<PracticeTask>)
  const [itemDescription, setItemDescription] = useState('')

  const addCurrentItem = () => {
    if (itemDescription) {
      const newListItem: PracticeTask = { description: itemDescription, completed: false }
      setList((currentList: Array<PracticeTask>) => [...currentList, newListItem])
      setItemDescription('')
    }
  }

  const saveList = async (): Promise<void> => {
    try {
      await AsyncStorage.setItem(LIST_KEY, JSON.stringify(list))
    } catch (err) {
      console.log(err)
    }
  }

  const getSavedList = async (): Promise<Array<PracticeTask>> => {
    let value
    try {
      value = await AsyncStorage.getItem(LIST_KEY)
    } catch (err) {
      console.log(err)
    }

    if (typeof value === 'string') {
      return JSON.parse(value)
    }

    return []
  }

  const toggleListItem = (itemIndex: number): void => {
    setList((currentList: Array<PracticeTask>) => {
      const [...updatedList] = currentList
      updatedList[itemIndex].completed = !updatedList[itemIndex].completed
      return updatedList
    })
  }

  useEffect(() => {
    const readSaved = async () => {
      const savedList = await getSavedList()
      if (savedList && Array.isArray(savedList) && savedList.length > 0) {
        setList(savedList)
      }
    }
    readSaved()
  }, [])

  useEffect(() => {
    saveList()
  }, [list])

  return (
    <PaperProvider>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.actionArea}>
            <Text>Add items to the list!</Text>
            <TextInput label="Item" value={itemDescription} onChangeText={setItemDescription} />
            <Button mode="contained" icon="plus" onPress={addCurrentItem}>
              Add Item
            </Button>
            <Button mode="contained" color="red" onPress={() => setList([])}>
              Clear List
            </Button>
          </View>
          <View style={styles.list}>
            {list.map((item: PracticeTask, itemIndex: number) => (
              <PracticeListItem
                key={item.description}
                item={item}
                onToggle={() => toggleListItem(itemIndex)}
              />
            ))}
          </View>
          <StatusBar style="auto" />
        </View>
      </TouchableWithoutFeedback>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 50,
  },
  actionArea: {
    width: '80%',
    height: 200,
    justifyContent: 'space-around',
  },
  list: {
    width: '80%',
  },
})

export default Main
