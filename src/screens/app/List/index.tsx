import { Text, FlatList, ActivityIndicator, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListScreen = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://dummyjson.com/users?limit=10');
      //   console.log('res:', res.data);

      setData(res.data.users);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View testID="list-screen">
      {loading && <ActivityIndicator testID="loader" />}
      {error && <Text testID="error">Failed to load</Text>}
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Text>
            {item.firstName} {item.lastName}
          </Text>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default ListScreen;
