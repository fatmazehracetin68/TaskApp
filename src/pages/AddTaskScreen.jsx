import {View, Text, StyleSheet} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import LottieView from 'lottie-react-native';
import CustomTextInput from '../components/CustomTextInput';
import TaskNameIcon from '../assets/images/search2.png';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../themes/Colors';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import ScreenName from '../contants/ScreenName';
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message';

export default function AddTaskScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {data} = route.params || {};
  const [title, setTitle] = useState(data?.title || '');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(data?.status || null);
  const [startDate, setStartDate] = useState(data?.startDate || '');
  const [endDate, setEndDate] = useState(data?.endDate || '');
  const [items, setItems] = useState([
    {label: 'Open', value: 'open'},
    {label: 'Progress', value: 'progress'},
    {label: 'Pending', value: 'pending'},
    {label: 'Closed', value: 'closed'},
  ]);

  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

  const handleConfirmStartDate = date => {
    setStartDate(date.toString());
    hideStarDatePicker();
  };
  const handleConfirmEndDate = date => {
    setEndDate(date.toString());
    hideEndDatePicker();
  };

  const hideStarDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisible(false);
  };

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: data ? 'Update Task' : 'Add Task',
    });
  }, [navigation, data]);
  const showEndDatePicker = () => {
    setEndDatePickerVisible(true);
  };

  const handleAddTask = async () => {
    if (!title || !startDate || !endDate || !value) {
      Toast.show({
        type: 'error',
        text1: 'hata',
        text2: 'Lütfen tüm alanları doldurunuz',
        topOffset: 60,
      });
      return;
    }

    const newTask = {
      id: data?.id || uuid.v4(),
      title,
      startDate,
      endDate,
      status: value,
    };

    try {
      const existingTask = await AsyncStorage.getItem('tasks');
      let tasks = existingTask ? JSON.parse(existingTask) : [];

      if (data) {
        tasks = tasks.map(task => (task.id === data.id ? newTask : task));
      } else {
        tasks.push(newTask);
      }
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));

      Toast.show({
        type: 'success',
        text1: data ? 'Task güncellendi' : 'Task eklendi',
        topOffset: 60,
      });
      navigation.navigate(ScreenName.taskList);
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <View style={styles.inlineContainer}>
        <View style={styles.taskImageContainer}>
          <LottieView
            autoPlay
            loop
            style={{height: 200, width: '100%', marginLeft: 40}}
            source={require('../assets/animation/pen-Animation.json')}
          />
        </View>
        <CustomTextInput
          imageSource={TaskNameIcon}
          label={'Task Adı'}
          onChangeText={setTitle}
          value={title}
        />
        <View style={{flexDirection: 'row'}}>
          <CustomTextInput
            onPressIcon={() => showStartDatePicker()}
            imageSource={TaskNameIcon}
            style={{width: '40%'}}
            label={'Başlangıç Zamanı'}
            onChangeText={setStartDate}
            isDate
            value={startDate}
          />
          <CustomTextInput
            onPressIcon={() => showEndDatePicker()}
            imageSource={TaskNameIcon}
            style={{width: '40%'}}
            label={'Bitiş zamanı'}
            isDate
            onChangeText={setEndDate}
            value={endDate}
          />
        </View>
        <View style={styles.dropdownContainer}>
          <View>
            <Text style={styles.status}>Status</Text>
            <DropDownPicker
              listMode="SCROLLVIEW"
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              containerStyle={{width: '90%'}}
              style={{borderWidth: 0}}
            />
          </View>
        </View>
      </View>
      <CustomButton
        onPress={handleAddTask}
        label={data ? 'Update Task' : 'Save Task'}
        style={{width: '80%'}}
      />

      <DateTimePickerModal
        onCancel={hideStarDatePicker}
        isVisible={isStartDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmStartDate}
      />
      <DateTimePickerModal
        onCancel={hideEndDatePicker}
        isVisible={isEndDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmEndDate}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    alignItems: 'center',
  },
  inlineContainer: {
    width: '100%',
  },
  taskImageContainer: {
    marginTop: 60,
  },
  dropdownContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 150,
  },
  status: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: '600',
    color: colors.text.primary,
  },
});
