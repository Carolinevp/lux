import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const UserLists = ({ navigation, title, userlist }) => {
  return (
    <View>
      <Text>{title}</Text>
      <FlatList
        horizontal={true}
        data={userlist}
        keyExtractor={({ id }, index) => id.toString()}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MovieDetails', item);
              }}
            >
              <View style={styles.posterBox}>
                <Image
                  style={styles.posters}
                  resizeMode="contain"
                  source={{
                    uri: 'https://image.tmdb.org/t/p/w400/' + item.poster_path,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  posters: {
    width: 70,
    height: 100,
    borderRadius: 8,
  },
  posterBox: {
    borderRadius: 8,
    marginTop: 20,
    marginRight: 10,
    marginBottom: 10,
    elevation: 3,
  },
});

export default UserLists;
