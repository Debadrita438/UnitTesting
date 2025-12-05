import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { navigate } from '../../../navigation/rootNavigation';

const LoginScreen = () => {
  return (
    <View>
      <Text>LoginScreen</Text>
      <Pressable
        style={{ alignSelf: 'center' }}
        onPress={() => {
          navigate('Signup');
        }}
        testID="signup"
      >
        <Text style={{ marginTop: 10 }}>Go to Signup</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;
