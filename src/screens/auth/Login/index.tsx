import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { navigate } from '../../../navigation/rootNavigation';
import { setToken } from '../../../storage/auth.slice';
import { useAppDispatch } from '../../../hooks';

const LoginScreen = () => {
  const dispatch = useAppDispatch();

  const loginHandler = () => {
    dispatch(setToken('123'));
  };

  return (
    <View testID="login-screen">
      <Text>LoginScreen</Text>
      <Pressable
        style={{ alignSelf: 'center' }}
        onPress={loginHandler}
        testID="login"
      >
        <Text style={{ marginTop: 10 }}>Login</Text>
      </Pressable>
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
