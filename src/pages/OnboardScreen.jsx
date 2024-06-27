import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import colors from '../themes/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStrogeKey from '../contants/AsyncStrogeKey';
import {useNavigation} from '@react-navigation/native';

const width = Dimensions.get('screen').width;

export default function OnboardScreen() {
  const navigation = useNavigation();
  const handleOnboardingComplate = async () => {
    await AsyncStorage.setItem(AsyncStrogeKey.onboardingComplate, 'true');
    navigation.replace('AddTask');
  };

  return (
    <View style={styles.container}>
      <View style={styles.ellipseBackground}>
        <View style={styles.inlineContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/task2.png')}
              style={styles.image}
              resizeMode="stretch"
            />
          </View>
          <View style={styles.footerContainer}>
            <Text style={styles.title}>Haydi İşlerini Planla</Text>
            <TouchableOpacity
              onPress={handleOnboardingComplate}
              style={styles.buttonContainer}>
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    alignItems: 'center',
  },
  ellipseBackground: {
    width: width,
    backgroundColor: colors.primary,
    height: '70%',
    borderBottomLeftRadius: width / 2,
    borderBottomRightRadius: width / 2,
    transform: [{scaleX: 1.5}],
  },
  inlineContainer: {
    width: width,
    height: '100%',
    position: 'absolute',
  },
  imageContainer: {alignItems: 'center', marginTop: 180},
  image: {
    height: 300,
    width: 300,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30%',
  },
  title: {
    color: colors.text.secondary,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
  },
  buttonContainer: {
    backgroundColor: colors.primary,
    margin: 20,
    width: 60,
    height: 60,
    borderRadius: 35,
  },
  plus: {
    color: colors.background.secondary,
    fontSize: 45,
    alignSelf: 'center',
  },
});
