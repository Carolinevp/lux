/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { users } from '../data';

const UserProfileInfo = () => {
  return (
    <View style={styles.header}>
      <Image
        style={styles.profilePicture}
        source={require('../assets/T0WU5R8NT-U01C4AC9BUY-93e74dc2edb4-512.jpg')}
      />
      <View style={{ flexDirection: 'column' }}>
        <Text style={{ fontWeight: 'bold' }}>{users[0].user_name}</Text>
        <Text>{users[0].nb_seen} movies seen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  bio: {
    flexDirection: 'column',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
});

export default UserProfileInfo;
