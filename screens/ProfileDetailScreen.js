import { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from 'react-native';

import { api } from '../api/client';

export default function ProfileDetailScreen({ route, navigation }) {
  const { id } = route.params;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const abortControllerRef = useRef(null);
  const requestIdRef = useRef(0);

  const fetchProfile = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const currentRequestId = ++requestIdRef.current;

    setLoading(true);
    setError(null);

    try {
      const res = await api.get(`/profiles/${id}`, {
        signal: controller.signal,
      });

      if (currentRequestId !== requestIdRef.current) return;

      setProfile(res.data);
    } catch (err) {
      if (err.name === 'CanceledError') return;

      if (err.response) {
        if (err.response.status === 404) {
          setError({
            type: 'NOT_FOUND',
            message: 'This profile no longer exists.',
          });
        } else if (err.response.status >= 500) {
          setError({
            type: 'SERVER',
            message: 'Server error. Please try again later.',
          });
        } else {
          setError({
            type: 'UNKNOWN',
            message: 'Something went wrong.',
          });
        }
      } else {
        setError({
          type: 'NETWORK',
          message: 'No internet connection.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ useEffect DOĞRU YER
  useEffect(() => {
    fetchProfile();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error.message}</Text>

        {error.type === 'NOT_FOUND' && (
          <Pressable onPress={() => navigation.goBack()}>
            <Text>Go back to list</Text>
          </Pressable>
        )}

        {error.type !== 'NOT_FOUND' && (
          <Pressable onPress={fetchProfile}>
            <Text>Retry</Text>
          </Pressable>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.email}>{profile.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  name: { fontSize: 24, fontWeight: 'bold' },
  email: { fontSize: 16, color: '#666', marginTop: 8 },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
