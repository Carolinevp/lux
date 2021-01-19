/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { users } from '../data';

const UserProfileInfo = ({ disliked, favourites, liked }) => {
  function movieCount() {
    const countLiked = liked.map((movie) => movie.genres).length;

    const countDisliked = disliked.map((movie) => movie.genres).length;

    const countFavourites = favourites.map((movie) => movie.genres).length;

    return countFavourites + countDisliked + countLiked;
  }

  return (
    <View style={styles.header}>
      <Image
        style={styles.profilePicture}
        source={require('../assets/T0WU5R8NT-U01C4AC9BUY-93e74dc2edb4-512.jpg')}
      />
      <View style={{ flexDirection: 'column' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
          {users[0].user_name}
        </Text>
        <Text>{movieCount()} movies seen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingBottom: 20,
    width: '100%',
    backgroundColor: '#f6f6f4',
  },
  bio: {
    flexDirection: 'column',
  },
  profilePicture: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginRight: 30,
    marginLeft: 25,
  },
});

export default UserProfileInfo;
