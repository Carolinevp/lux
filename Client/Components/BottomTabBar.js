import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BottomTabBar = ({ navigation }) => {
  const navigateToProfile = () => {
    navigation.navigate('UserProfile');
  };

  const navigateToDiscover = () => {
    navigation.navigate('Discover');
  };

  const navigateToSearch = () => {
    navigation.navigate('Search');
  };
  return (
    <View style={styles.TabBarMainContainer}>
      <TouchableOpacity
        onPress={navigateToProfile}
        activeOpacity={0.6}
        style={styles.button}
      >
        <AntDesign name="user" size={24} color="black" />
        <Text style={styles.TextStyle}> Profile </Text>
      </TouchableOpacity>

      <View style={styles.separators} />

      <TouchableOpacity
        onPress={navigateToDiscover}
        activeOpacity={0.6}
        style={styles.button}
      >
        <MaterialCommunityIcons
          name="movie-filter-outline"
          size={24}
          color="black"
        />
        <Text style={styles.TextStyle}> Discover </Text>
      </TouchableOpacity>

      <View style={styles.separators} />

      <TouchableOpacity
        onPress={navigateToSearch}
        activeOpacity={0.6}
        style={styles.button}
      >
        <AntDesign name="search1" size={24} color="black" />
        <Text style={styles.TextStyle}> Search </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  TabBarMainContainer: {
    justifyContent: 'space-around',
    height: 50,
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    height: 50,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#f8edeb',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  TextStyle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 10,
  },
  separators: {
    height: 50,
    backgroundColor: '#fff',
    width: 2,
  },
});

export default BottomTabBar;
