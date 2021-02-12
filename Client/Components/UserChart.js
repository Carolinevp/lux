import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { VictoryPie } from 'victory-native';
import Svg, { Circle } from 'react-native-svg';

import UserLists from './UserLists';
import { graphicColor } from '../assets/chartInfo';

const UserChart = ({ liked, disliked, favourites, navigation, lastSeen }) => {
  function genreCount(category) {
    const countLiked = liked
      .map((movie) => movie.genres)
      .map((movie) => movie.filter((arr) => arr.name === category))
      .filter((movie) => movie.length > 0).length;

    const countDisliked = disliked
      .map((movie) => movie.genres)
      .map((movie) => movie.filter((arr) => arr.name === category))
      .filter((movie) => movie.length > 0).length;

    const countFavourites = favourites
      .map((movie) => movie.genres)
      .map((movie) => movie.filter((arr) => arr.name === category))
      .filter((movie) => movie.length > 0).length;

    return countFavourites + countDisliked + countLiked;
  }

  const data = [
    { x: 'comedy', y: genreCount('Comedy') },
    { x: 'drama', y: genreCount('Drama') },
    { x: 'thriller', y: genreCount('Thriller') },
    { x: 'action', y: genreCount('Action') },
    { x: 'documentary', y: genreCount('Documentary') },
    { x: 'adventure', y: genreCount('Adventure') },
    { x: 'animation', y: genreCount('Animation') },
    { x: 'crime', y: genreCount('Crime') },
    { x: 'family', y: genreCount('Family') },
    { x: 'fantasy', y: genreCount('Fantasy') },
    { x: 'history', y: genreCount('History') },
    { x: 'horror', y: genreCount('Horror') },
    { x: 'music', y: genreCount('Music') },
    { x: 'mystery', y: genreCount('Mystery') },
    { x: 'romance', y: genreCount('Romance') },
    { x: 'sci fi', y: genreCount('Science Fiction') },
    { x: 'TV movie', y: genreCount('TV movie') },
    { x: 'war', y: genreCount('War') },
    { x: 'western', y: genreCount('Western') },
  ];

  const data2 = data.filter((cat) => cat.y > 1).sort((a, b) => b.y - a.y);

  return (
    <View style={styles.userInfo}>
      <View style={styles.infoBox}>
        <Text style={styles.info}> My Info: </Text>
        <View>
          {lastSeen.length > 0 && (
            <UserLists
              navigation={navigation}
              title="LAST SEEN"
              userlist={lastSeen}
            />
          )}
        </View>
      </View>
      <View style={styles.chart}>
        <Svg width={350} height={350}>
          <Circle cx={150} cy={150} r={20} fill="#b36a5e" />
          <VictoryPie
            animate={{ easing: 'exp' }}
            data={data2}
            width={300}
            height={300}
            standalone={false}
            colorScale={graphicColor}
            padAngle={1}
            innerRadius={25}
            labelRadius={({ innerRadius }) => innerRadius + 7}
            labelPlacement={({ index }) => (index ? 'parallel' : 'vertical')}
          />
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    width: '100%',
    backgroundColor: '#D8E2DC',
    flexDirection: 'row',
    height: 240,
    marginBottom: 20,
  },
  chart: {
    right: 5,
    bottom: 20,
    position: 'absolute',
    width: 270,
    height: 250,
  },
  info: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  infoBox: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 40,
    marginTop: 20,
  },
});

export default UserChart;
