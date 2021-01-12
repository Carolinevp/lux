/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const AddToList = ({ route }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
        {' '}
        {route.params.title}{' '}
      </Text>
      <Image
        style={styles.posters}
        source={{
          uri: 'https://image.tmdb.org/t/p/w300/' + route.params.poster_path,
        }}
      />
      <View style={styles.icons}>
        {/* <MaterialIcons name="playlist-add" size={24} color="#f6bd60" /> */}
        <MaterialCommunityIcons
          name="eye-plus-outline"
          size={24}
          color="#f6bd60"
        />
        <AntDesign name="like2" size={24} color="#83c5be" />
        <AntDesign name="dislike2" size={24} color="#d00000" />
        <Ionicons name="md-heart-sharp" size={24} color="#ffafcc" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  posters: {
    width: 320,
    height: 450,
    marginTop: 20,
    marginRight: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    // elevation: 1,
  },
  icons: {
    justifyContent: 'space-around',
    height: 50,
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
  },
  icon: {
    margin: 20,
  },
});

export default AddToList;
