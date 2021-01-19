/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import apiKey from '../assets/apikey';
import { LogBox } from 'react-native';
import Details from '../Components/MovieDetails-details';
import Cast from '../Components/MovieDetails-cast';
import Crew from '../Components/MovieDetails-crew';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

const { width } = Dimensions.get('window');

const MovieDetails = ({
  navigation,
  route,
  liked,
  disliked,
  favourites,
  watchlist,
}) => {
  //? To add when multiple number of user for stats
  // const data = [
  //   { x: 'favourite', y: favourites.length },
  //   { x: 'liked', y: liked.length },
  //   { x: 'unliked', y: disliked.length },
  // ];
  // const data = [
  //   { x: 'favourite', y: 10 },
  //   { x: 'liked', y: 60 },
  //   { x: 'unliked', y: 30 },
  // ];
  // const graphicColor = ['#ffafcc', '#83c5be', '#d00000'];

  const [details, setDetails] = useState([]);
  const [, setCredits] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [detailsClicked, setDetailsClicked] = useState(true);
  const [castClicked, setCastClicked] = useState(false);
  const [crewClicked, setCrewClicked] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${route.params.id}?${apiKey}&language=en-US`,
    )
      .then((res) => res.json())
      .then((result) => {
        setDetails(() => result);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
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

  function isInList(list) {
    return list.map((movie) => movie).find((el) => el.id === details.id);
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator color="#fec89a" />
      ) : (
        <View>
          <ImageBackground
            style={styles.secondaryPicture}
            source={{
              uri: 'https://image.tmdb.org/t/p/w400/' + details.backdrop_path,
            }}
          />
          <View style={styles.movieIntro}>
            <View>
              <View style={styles.titleAdd}>
                <Text
                  style={{ fontSize: 20, fontWeight: 'bold', marginLeft: -5 }}
                >
                  {' '}
                  {details.title}{' '}
                </Text>
                <FlatList
                  style={{ marginTop: 5, marginBottom: 10 }}
                  horizontal={true}
                  // numColumns={3}
                  data={details.genres}
                  keyExtractor={({ id }) => id.toString()}
                  renderItem={({ item }) => <Text>{item.name + '  '}</Text>}
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
            {/* <VictoryPie
                data={data}
                width={150}
                height={150}
                colorScale={graphicColor}
                labelRadius={({ innerRadius }) => innerRadius + 25}
              /> */}
          </View>
          <View>
            <Image
              style={styles.posters}
              source={{
                uri: 'https://image.tmdb.org/t/p/w400/' + details.poster_path,
              }}
              resizeMode="contain"
            />
            {isInList(favourites) !== undefined && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AddToList', route.params);
                }}
              >
                <Ionicons
                  name="md-heart-sharp"
                  size={30}
                  color="#ffafcc"
                  style={styles.posterIcon}
                />
              </TouchableOpacity>
            )}
            {isInList(liked) !== undefined && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AddToList', route.params);
                }}
              >
                <AntDesign
                  name="like1"
                  size={30}
                  color="#83c5be"
                  style={styles.posterIcon}
                />
              </TouchableOpacity>
            )}
            {isInList(disliked) !== undefined && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AddToList', route.params);
                }}
              >
                <AntDesign
                  name="dislike1"
                  size={30}
                  color="#d00000"
                  style={styles.posterIcon}
                />
              </TouchableOpacity>
            )}

            {isInList(watchlist) !== undefined && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AddToList', route.params);
                }}
              >
                <MaterialCommunityIcons
                  name="eye-plus-outline"
                  size={30}
                  color="#f6bd60"
                  style={styles.posterIcon}
                />
              </TouchableOpacity>
            )}
          </View>
          <View>
            <View style={styles.TabBarMainContainer}>
              <TouchableOpacity
                onPress={() => {
                  setDetailsClicked(true);
                  setCastClicked(false);
                  setCrewClicked(false);
                }}
                activeOpacity={0.4}
                style={styles.button}
              >
                <Text style={styles.TextStyle}> DETAILS </Text>
              </TouchableOpacity>

              <View style={{ height: 50, backgroundColor: '#fff', width: 2 }} />

              <TouchableOpacity
                onPress={() => {
                  setDetailsClicked(false);
                  setCastClicked(true);
                  setCrewClicked(false);
                }}
                activeOpacity={0.4}
                style={styles.button}
              >
                <Text style={styles.TextStyle}> CAST </Text>
              </TouchableOpacity>

              <View style={{ height: 50, backgroundColor: '#fff', width: 2 }} />

              <TouchableOpacity
                onPress={() => {
                  setDetailsClicked(false);
                  setCastClicked(false);
                  setCrewClicked(true);
                }}
                activeOpacity={0.4}
                style={styles.button}
              >
                <Text style={styles.TextStyle}> CREW </Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              {detailsClicked === true && (
                <Details
                  navigation={navigation}
                  details={details}
                  recommendations={recommendations}
                />
              )}
              {castClicked === true && (
                <Cast route={route} setLoading={setLoading} />
              )}
              {crewClicked === true && (
                <Crew route={route} setLoading={setLoading} />
              )}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    flex: 1,
  },
  movieIntro: {
    backgroundColor: '#d8e2dc',
    height: 105,
  },
  posters: {
    width: 70,
    height: 100,
    top: -135,
    left: 15,
    position: 'absolute',
    borderWidth: 0.5,
    borderColor: 'white',
  },
  secondaryPicture: {
    height: 210,
    width: width,
  },
  posterIcon: {
    position: 'absolute',
    top: -147,
    left: 65,
    right: 0,
    bottom: 0,
  },
  titleAdd: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    top: 5,
    left: 120,
    flex: 1,
  },
  TabBarMainContainer: {
    justifyContent: 'space-around',
    height: 40,
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    height: 40,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#f8edeb',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  TextStyle: {
    textAlign: 'center',
    fontSize: 12,
    color: '#6d6875',
  },
});

export default MovieDetails;
