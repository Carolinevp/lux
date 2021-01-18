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
import { VictoryPie } from 'victory-native';
import { AntDesign } from '@expo/vector-icons';
import apiKey from '../assets/apikey';
import { LogBox } from 'react-native';
import Details from '../Components/MovieDetails-details';
import Cast from '../Components/MovieDetails-cast';
import Crew from '../Components/MovieDetails-crew';

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
  const [, setCredits] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [detailsClicked, setDetailsClicked] = useState(true);
  const [castClicked, setCastClicked] = useState(false);
  const [crewClicked, setCrewClicked] = useState(false);

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
              <View
                style={{
                  flex: 1,
                }}
              >
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
                    keyExtractor={({ id }) => id.toString()}
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
            <Image
              style={styles.posters}
              source={{
                uri: 'https://image.tmdb.org/t/p/w400/' + details.poster_path,
              }}
              resizeMode="contain"
            />
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
                {detailsClicked === true ? (
                  <Details
                    navigation={navigation}
                    details={details}
                    recommendations={recommendations}
                  />
                ) : (
                    <></>
                  )}
                {castClicked === true ? (
                  <Cast route={route} setLoading={setLoading} />
                ) : (
                    <></>
                  )}
                {crewClicked === true ? (
                  <Crew route={route} setLoading={setLoading} />
                ) : (
                    <></>
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
    // alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
  },
  movieIntro: {
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    // alignItems: 'center',
    backgroundColor: '#d8e2dc',
    maxHeight: 105,
    // zIndex: 1,
  },
  posters: {
    width: 70,
    height: 100,
    top: 180,
    left: 15,
    position: 'absolute',
    borderWidth: 0.5,
    // borderRadius: 8,
    borderColor: 'white',
  },
  secondaryPicture: {
    height: 210,
    width: width,
  },
  posterIcon: {
    position: 'absolute',
    top: 5,
    left: 60,
    right: 0,
    bottom: 0,
  },
  titleAdd: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-around',
    top: 5,
    left: 100,
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
