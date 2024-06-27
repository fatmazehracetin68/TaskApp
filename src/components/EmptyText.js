import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const renderEmptyList = () => {
  <View style={styles.emptyListContainer}>
    <Icon name="text-box-remove" size={60} color={'grey'} />
    <Text style={styles.emptyTask}>Empty Task</Text>
  </View>;
};

const styles = StyleSheet.create({
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '500',
    color: 'grey',
  },
});

export default renderEmptyList;
