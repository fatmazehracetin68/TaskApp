import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScreenName from '../contants/ScreenName';
import SplashScreen from '../pages/SplashScreen';
import OnboardScreen from '../pages/OnboardScreen';
import TaskListScreen from '../pages/TaskListScreen';
import AddTaskScreen from '../pages/AddTaskScreen';
import colors from '../themes/Colors';

export default function Routes() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background.primary,
        },
        headerTintColor: colors.text,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name={ScreenName.splash}
        component={SplashScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={ScreenName.taskList}
        component={TaskListScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={ScreenName.onboarding}
        component={OnboardScreen}
      />
      <Stack.Screen name={ScreenName.addTask} component={AddTaskScreen} />
    </Stack.Navigator>
  );
}
