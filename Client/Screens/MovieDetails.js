/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VictoryPie } from 'victory-native';
import ViewMoreText from 'react-native-view-more-text';
// import { movies } from '../data';
import { AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const MovieDetails = ({ navigation, route }) => {
  const data = [
    { x: 'favourite', y: 10 },
    { x: 'liked', y: 60 },
    { x: 'unliked', y: 30 },
  ];

  const graphicColor = ['#ffafcc', '#83c5be', '#d00000'];
  return (
    <ScrollView style={styles.container}>
      <View>
        <Image
          style={styles.secondaryPicture}
          source={{
            uri:
              'https://image.tmdb.org/t/p/w300/' + route.params.backdrop_path,
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
                uri:
                  'https://image.tmdb.org/t/p/w300/' + route.params.poster_path,
              }}
              resizeMode="contain"
            />
            <Ionicons
              name="md-heart-sharp"
              size={24}
              color="#ffafcc"
              style={styles.posterIcon}
            />
            <View style={styles.titleAdd}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                {' '}
                {route.params.title}{' '}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  // console.log('route.params', route.params);
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
        <Text> details </Text>
        <ViewMoreText
          numberOfLines={2}
          // renderViewMore={this.renderViewMore}
          // renderViewLess={this.renderViewLess}
          textStyle={{ textAlign: 'center' }}
          style={{ width: 300 }}
        >
          <Text>{route.params.overview}</Text>
        </ViewMoreText>

        <Text> cast </Text>
      </View>
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
  posters: {
    // flex: 1,
    width: 70,
    height: 100,
    marginTop: 20,
    marginRight: 0,
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
    height: 200,
    width: width,
  },
  button: {
    borderRadius: 50,
    borderColor: 'black',
  },
  posterIcon: {
    position: 'absolute',
    top: 15,
    left: 52,
    right: 0,
    bottom: 0,
  },
  titleAdd: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-around',
    top: 15,
    left: 80,
  },
});

export default MovieDetails;
