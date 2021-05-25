import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  Button,
  Text,
  TextInput,
  Provider as PaperProvider,
} from 'react-native-paper'

const LIST_KEY = 'list'

const Main = (): JSX.Element => {
  const [list, setList] = useState([] as string[])
  const [listItem, setListItem] = useState('')

  const addCurrentItem = () => {
    if (listItem) {
      setList((currentList: string[]) => [...currentList, listItem])
      setListItem('')
    }
  }

  const saveList = async (): Promise<void> => {
    try {
      await AsyncStorage.setItem(LIST_KEY, JSON.stringify(list))
    } catch (err) {
      console.log(err)
    }
  }

  const getSavedList = async (): Promise<Array<string>> => {
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
      <View style={styles.container}>
        <View style={styles.actionArea}>
          <Text>Add items to the list!</Text>
          <TextInput label="Item" value={listItem} onChangeText={setListItem} />
          <Button mode="contained" icon="plus" onPress={addCurrentItem}>
            Add Item
          </Button>
          <Button mode="contained" color="red" onPress={() => setList([])}>
            Clear List
          </Button>
        </View>
        {list.map((item: string) => (
          <Text key={item} style={styles.listItem}>{item}</Text>
        ))}
        <StatusBar style="auto" />
      </View>
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
  listItem: {
    marginVertical: 5,
  },
})

export default Main
