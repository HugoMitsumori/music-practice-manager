import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Checkbox, Text } from 'react-native-paper'
import CloseButton from './CloseButton'

const PracticeListItem = ({ item, onToggle }: Props) => {
  return (
    <View style={styles.practiceItem}>
      <Checkbox status={item.completed ? 'checked' : 'unchecked'} onPress={onToggle} />
      <Text>{item.description}</Text>
      <CloseButton onPress={() => {}} />
    </View>
  )
}

const styles = StyleSheet.create({
  practiceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

interface Props {
  item: PracticeTask,
  onToggle: () => void,
}

export default PracticeListItem
