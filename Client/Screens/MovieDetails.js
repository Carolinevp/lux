/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VictoryPie } from 'victory-native';
import ViewMoreText from 'react-native-view-more-text';
// import { movies } from '../data';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import apiKey from '../assets/apikey';
import MovieCarousel from '../Components/MovieCarousel';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

const { width } = Dimensions.get('window');

const MovieDetails = ({ navigation, route, liked, disliked, favourites }) => {
  // const data = [
  //   { x: 'favourite', y: favourites.length },
  //   { x: 'liked', y: liked.length },
  //   { x: 'unliked', y: disliked.length },
  // ];
  const data = [
    { x: 'favourite', y: 10 },
    { x: 'liked', y: 60 },
    { x: 'unliked', y: 30 },
  ];
  const graphicColor = ['#ffafcc', '#83c5be', '#d00000'];

  const [details, setDetails] = useState([]);
  const [credits, setCredits] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     Alert.alert('Refreshed');
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${route.params.id}?${apiKey}&language=en-US`,
    )
      .then((res) => res.json())
      .then((result) => {
        setDetails(result);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    return () => {
      // console.log('unmount');
    };
  }, [route.params.id]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${route.params.id}/credits?${apiKey}&language=en-US`,
    )
      .then((res) => res.json())
      .then((result) => {
        setCredits(result);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${route.params.id}/recommendations?${apiKey}&language=en-US&page=1`,
    )
      .then((res) => res.json())
      .then((result) => {
        setRecommendations(result.results);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function isInList(movie) {
    let icon;
    // if (watchlist.includes(movie)) {
    //   icon = (
    //     <MaterialCommunityIcons
    //       name="eye-plus-outline"
    //       size={34}
    //       color="#f6bd60"
    //     />
    //   );
    // }
    if (liked.includes(movie)) {
      icon = <AntDesign name="like2" size={34} color="#83c5be" />;
    }
    if (disliked.includes(movie)) {
      icon = <AntDesign name="dislike2" size={34} color="#d00000" />;
    }
    if (favourites.includes(movie)) {
      icon = <Ionicons name="md-heart-sharp" size={34} color="#ffafcc" />;
    }
    return icon;
  }

  // console.log('favourites', favourites);
  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator color="#fec89a" />
      ) : (
          <View>
            <Image
              style={styles.secondaryPicture}
              source={{
                uri: 'https://image.tmdb.org/t/p/w400/' + details.backdrop_path,
              }}
            />
            <View style={styles.movieIntro}>
              <View
                style={{
                  flex: 1,
                }}
              >
                <Image
                  style={styles.posters}
                  source={{
                    uri: 'https://image.tmdb.org/t/p/w400/' + details.poster_path,
                  }}
                  resizeMode="contain"
                />
                {favourites.includes(details) ? (
                  <Ionicons
                    name="md-heart-sharp"
                    size={24}
                    color="#ffafcc"
                    style={styles.posterIcon}
                  />
                ) : (
                    <></>
                  )}
                <View style={styles.titleAdd}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    {' '}
                    {details.title}{' '}
                  </Text>
                  <FlatList
                    // horizontal={true}
                    numColumns={3}
                    data={details.genres}
                    keyExtractor={({ id }, index) => id.toString()}
                    renderItem={({ item }) => <Text>{item.name + ' '}</Text>}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('AddToList', route.params);
                    }}
                  >
                    <AntDesign name="pluscircleo" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <VictoryPie
                data={data}
                width={150}
                height={150}
                colorScale={graphicColor}
                labelRadius={({ innerRadius }) => innerRadius + 25}
              />
            </View>
            <View style={styles.details}>
              <Text> details </Text>
              <Text>{details.tagline}</Text>
              <Text style={styles.titleCat}>Year:</Text>
              <Text>{moment(details.release_date).format('YYYY')}</Text>
              <Text style={styles.titleCat}>Synopsis:</Text>
              <ViewMoreText
                numberOfLines={2}
                // renderViewMore={this.renderViewMore}
                // renderViewLess={this.renderViewLess}
                // textStyle={{ textAlign: 'center' }}
                style={{ width: 300 }}
              >
                <Text>{details.overview}</Text>
              </ViewMoreText>

              <Text style={styles.titleCat}>Genre:</Text>
              <FlatList
                horizontal={true}
                data={details.genres}
                keyExtractor={({ id }, index) => id.toString()}
                renderItem={({ item }) => <Text>{item.name + ' '}</Text>}
              />
              {/* <Text>Country:</Text>
              <Text>{details.production_countries[0].name}</Text> */}
              <Text style={styles.titleCat}>Language:</Text>
              <Text>{details.original_language}</Text>
            </View>
            <MovieCarousel
              navigation={navigation}
              title="You might also like:"
              list={recommendations}
            />
            <Text> Cast: </Text>
            <View style={styles.cast}>
              <FlatList
                // horizontal={true}
                numColumns={3}
                // columnWrapperStyle
                data={credits.cast}
                keyExtractor={({ id }, index) => id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.box}>
                    <TouchableOpacity
                    // onPress={() => {
                    //   navigation.navigate('MovieDetails', item);
                    // }}
                    >
                      <Image
                        style={styles.castPicture}
                        source={{
                          uri:
                            'https://image.tmdb.org/t/p/w400/' +
                            item.profile_path,
                        }}
                      />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 14 }}> {item.name}</Text>
                    <Text style={{ fontSize: 10 }}>{item.character}</Text>
                  </View>
                )}
              />
            </View>
          </View>
        )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    // alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
  },
  movieIntro: {
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    // alignItems: 'center',
    backgroundColor: '#d8e2dc',
  },
  details: {
    marginLeft: 10,
  },
  posters: {
    // flex: 1,
    width: 70,
    height: 100,
    marginTop: 20,
    marginRight: 0,
    marginLeft: 10,
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
  secondaryPicture: {
    height: 220,
    width: width,
  },
  button: {
    borderRadius: 50,
    borderColor: 'black',
  },
  posterIcon: {
    position: 'absolute',
    top: 12,
    left: 60,
    right: 0,
    bottom: 0,
  },
  titleAdd: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-around',
    top: 15,
    left: 100,
  },
  titleCat: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  castPicture: {
    width: 110,
    height: 160,
    borderRadius: 2,
    // marginTop: 25,
    // marginHorizontal: 10,
  },
  cast: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // flex: 1,
  },
  box: {
    width: 110,
    height: 210,
    borderRadius: 2,
    backgroundColor: '#dbe7e4',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: 10,
    // alignItems: 'center',
    // flexWrap: 'wrap',
  },
});

export default MovieDetails;
