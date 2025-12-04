import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

interface IFirstProps {
  text: string;
}

const CFirst: React.FC<IFirstProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      {/* <Text>This is the first component</Text> */}
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default CFirst;
