import React from 'react';
import { AuthProvider } from './context/AuthContextManager';
import ProtectedRoutes from './components/ProtectedRoutes';
import { View, StyleSheet } from 'react-native';

export default function App() {
  return (
    <AuthProvider>
      <View style={styles.container}>
        <ProtectedRoutes />
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
});
