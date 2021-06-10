import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const CloseButton = ({ onPress }: Props) => (
  <TouchableOpacity onPress={onPress}>
    <Ionicons name="close" size={24} color="red" />
  </TouchableOpacity>
)

interface Props {
  onPress: () => void,
}

export default CloseButton
