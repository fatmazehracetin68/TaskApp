import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import colors from '../themes/Colors';
import CustomTextInput from '../components/CustomTextInput';
import SearchIcon from '../assets/images/search2.png';
import TodoItem from '../components/TodoItem';
import CustomButton from '../components/CustomButton';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ScreenName from '../contants/ScreenName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import renderEmptyList from '../components/EmptyText';
import Toast from 'react-native-toast-message';
import {setupMicrotasks} from 'react-native-reanimated/lib/typescript/reanimated2/threads';

export default function TaskListScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filteredTask, setFilteredTask] = useState([]);

  // const clearAll = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //   } catch (error) {
  //     console.log('error');
  //   }
  // };
  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, []),
  );

  useEffect(() => {
    filterTasks();
  }, [searchText, tasks]);

  const loadTasks = async () => {
    try {
      const existingTasks = await AsyncStorage.getItem('tasks');
      const tasks = existingTasks ? JSON.parse(existingTasks) : [];
      setTasks(tasks);
    } catch (error) {
      console.log('error');
    }
  };
  // loadTasks();

  const filterTasks = () => {
    if (searchText) {
      const filtered = tasks.filter(task =>
        task.title.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredTask(filtered);
    } else {
      setFilteredTask(tasks);
    }
  };

  const handleDleteTask = async id => {
    try {
      const updatedTask = tasks.filter(task => task.id !== id);
      console.log(updatedTask);
      setTasks(updatedTask);
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTask));
      Toast.show({
        type: 'error',
        text1: 'Task silindi',
        topOffset: 70,
      });
    } catch (error) {
      console.log(error, 'abc');
    }
  };
  const renderHeader = () => {
    <View style={styles.headerContain}>
      <Text style={styles.headerText}>Tasks</Text>
    </View>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContentContainer}>
        <SafeAreaView style={[styles.container, {marginBottom: 20}]}>
          <CustomTextInput
            value={searchText}
            onChangeText={setSearchText}
            imageSource={SearchIcon}
            placeholder="Task ara"
            style={{marginHorizontal: 0}}
          />
          <FlatList
            keyExtractor={item => item?.id.toString()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmptyList}
            ListHeaderComponent={renderHeader}
            data={filteredTask}
            renderItem={({item}) => (
              <TodoItem data={item} onDelete={() => handleDleteTask(item.id)} />
            )}
          />
        </SafeAreaView>
        <CustomButton
          onPress={() => navigation.navigate(ScreenName.addTask)}
          label={'Add Task'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  mainContentContainer: {
    height: '100%',
    position: 'absolute',
    width: Dimensions.get('screen').width,
    padding: 20,
  },
  headerContain: {
    marginBottom: 10,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'grey',
  },
});
