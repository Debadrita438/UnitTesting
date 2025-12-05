import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useReducer, useState } from 'react';
import CFirst from '../../../components/CFirst';

const initialState = {
  quantity: 0,
};

const quantityReducer = (
  state: { quantity: number },
  action: { type: any },
) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, quantity: state.quantity + 1 };
    case 'DECREMENT':
      return { ...state, quantity: state.quantity - 1 };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const HomeScreen = () => {
  const [count, setCount] = useState(0);
  const [double, setDouble] = useState(0);
  const [value, setValue] = useState('Start');

  const [state, dispatch] = useReducer(quantityReducer, initialState);

  const handlePress = () => {
    setCount(pre => pre + 1);
    setDouble(pre => pre + 2);
  };

  const handleTimer = () => {
    setTimeout(() => {
      setValue('Done');
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text testID="count">{count}</Text>
      <Text testID="double">{double}</Text>
      <Text testID="quantity">Quantity: {state.quantity}</Text>
      <Text testID="value">{value}</Text>

      <Pressable testID="btn" onPress={handlePress}>
        <Text>Press me</Text>
      </Pressable>

      <Pressable testID="inc" onPress={() => dispatch({ type: 'INCREMENT' })}>
        <Text>Increment</Text>
      </Pressable>

      <Pressable testID="dec" onPress={() => dispatch({ type: 'DECREMENT' })}>
        <Text>Decrement</Text>
      </Pressable>
      <Pressable testID="reset" onPress={() => dispatch({ type: 'RESET' })}>
        <Text>Reset</Text>
      </Pressable>
      <Pressable testID="timer" onPress={handleTimer}>
        <Text>Run Timer</Text>
      </Pressable>

      {/* rendering the component based on condition */}
      {count === 1 && <CFirst text={'Going to render this component'} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
