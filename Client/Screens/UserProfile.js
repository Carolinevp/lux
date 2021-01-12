import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import UserChart from '../Components/UserChart';
// import UserLists from '../Components/UserLists';
import UserProfileInfo from '../Components/UserProfileInfo';
import { movies } from '../data';

const UserProfile = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <UserProfileInfo />
      <UserChart />
      <ScrollView horizontal={true}>
        <View>
          <Text>Last seen</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('MovieDetails', movies[0])}
          >
            <Image
              style={styles.posters}
              source={{
                uri: 'https://image.tmdb.org/t/p/w300/' + movies[0].poster_path,
              }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text>Want to watch</Text>
          <View style={styles.movies}>
            <TouchableOpacity
              onPress={() => navigation.navigate('MovieDetails', movies[1])}
            >
              <Image
                style={styles.posters}
                source={{
                  uri:
                    'https://image.tmdb.org/t/p/w300/' + movies[1].poster_path,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('MovieDetails', movies[2])}
            >
              <Image
                style={styles.posters}
                source={{
                  uri:
                    'https://image.tmdb.org/t/p/w300/' + movies[2].poster_path,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('MovieDetails', movies[3])}
            >
              <Image
                style={styles.posters}
                source={{
                  uri:
                    'https://image.tmdb.org/t/p/w300/' + movies[3].poster_path,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text>Favourite</Text>
          <View style={styles.movies}>
            <TouchableOpacity
              onPress={() => navigation.navigate('MovieDetails', movies[4])}
            >
              <Image
                style={styles.posters}
                source={{
                  uri:
                    'https://image.tmdb.org/t/p/w300/' + movies[4].poster_path,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  movies: {
    flexDirection: 'row',
  },
  posters: {
    width: 70,
    height: 100,
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
  movieLists: {
    flexDirection: 'column',
  },
});

export default UserProfile;

// const [userList, setUserList] = useState([]);
//   return (
//     <View style={styles.container}>
//       <UserProfileInfo />
//       <UserChart />
//       <FlatList
//         style={styles.movies}
//         data={users.user_movies}
//         keyExtractor={({ id }, index) => id.toString()}
//         renderItem={({ item }) => <UserLists categorie={item} />}
//       />
//     </View>
//   );
