import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import ScreenName from '../contants/ScreenName';
import AsyncStorageKey from '../contants/AsyncStrogeKey';

export default function SplashScreen() {
  const navigation = useNavigation();
  async function checkOnboardingComplate() {
    const onboardingComplate = await AsyncStorage.getItem(
      AsyncStorageKey.onboardingComplate,
      await AsyncStorage.clear(),
    );
    if (onboardingComplate === 'true') {
      navigation.replace(ScreenName.taskList);
    } else {
      navigation.replace(ScreenName.onboarding);
    }
  }

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animation/Animation - 1719236679696.json')}
        autoPlay
        loop={false}
        onAnimationFinish={() => {
          setTimeout(() => {
            checkOnboardingComplate();
          }, 900);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
