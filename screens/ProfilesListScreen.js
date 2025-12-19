import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { api } from '../api/client';

export default function ProfilesListScreen({ navigation }) {
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchProfiles = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const res = await api.get(`/profiles?page=${page}&limit=10`);

      if (res.data.length === 0) {
        setHasMore(false);
      } else {
        setProfiles(prev => [...prev, ...res.data]);
        setPage(prev => prev + 1);
      }
    } catch (err) {
      setError('Failed to load profiles');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.card}
      onPress={() =>
        navigation.navigate('ProfileDetail', { id: item.id })
      }
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
    </Pressable>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  if (error && profiles.length === 0) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
        <Pressable onPress={fetchProfiles}>
          <Text>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={fetchProfiles}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 12,
    borderRadius: 8,
  },
  name: { fontSize: 18, fontWeight: 'bold' },
  email: { color: '#666' },
  footer: { padding: 20 },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
