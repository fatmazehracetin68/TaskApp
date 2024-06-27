import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';

export default function App() {
  return (
    <SafeAreaView>
      <View style={styles.bg}>
        <Text>index</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  bg: {
    backgroundColor: 'red',
  },
});
