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
  Checkbox,
  Text,
  TextInput,
  Provider as PaperProvider,
} from 'react-native-paper'

const LIST_KEY = 'list'

interface ListItem {
  description: string,
  checked: boolean,
}

const Main = (): JSX.Element => {
  const [list, setList] = useState([] as Array<ListItem>)
  const [itemDescription, setItemDescription] = useState('')

  const addCurrentItem = () => {
    if (itemDescription) {
      const newListItem = { description: itemDescription, checked: false }
      setList((currentList: Array<ListItem>) => [...currentList, newListItem])
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

  const getSavedList = async (): Promise<Array<ListItem>> => {
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
    setList((currentList: Array<ListItem>) => {
      const [...updatedList] = currentList
      updatedList[itemIndex].checked = !updatedList[itemIndex].checked
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
            {list.map((item: ListItem, itemIndex: number) => (
              <View key={item.description} style={styles.listItem}>
                <Text>{item.description}</Text>
                <Checkbox status={item.checked ? 'checked' : 'unchecked'} onPress={() => toggleListItem(itemIndex)} />
              </View>
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
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
})

export default Main
