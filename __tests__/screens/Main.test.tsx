import React from 'react'
import { cleanup, render } from '@testing-library/react-native'
import Main from '../../src/screens/Main'

jest.useFakeTimers()

describe('<Main />', () => {
  afterEach(() => cleanup())
  it('renders correctly', () => {
    const tree = render(<Main />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})