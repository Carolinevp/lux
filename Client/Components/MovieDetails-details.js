/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import moment from 'moment';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ViewMoreText from 'react-native-view-more-text';
import MovieCarousel from './MovieCarousel';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

function timeConvert(num) {
  const hours = Math.floor(num / 60);
  const minutes = num % 60;
  return `${hours}h ${minutes}m`;
}

const Details = ({ navigation, details, recommendations }) => {
  return (
    <View style={styles.details}>
      {details && details.tagline ? (
        <View style={styles.subCat}>
          <Text style={{ fontStyle: 'italic' }}>{details.tagline}</Text>
        </View>
      ) : (
        <></>
      )}
      <View style={styles.subCat}>
        <Text style={styles.titleCat}>Year:</Text>
        <Text>{moment(details && details.release_date).format('YYYY')}</Text>
      </View>
      <View style={styles.subCat}>
        <Text style={styles.titleCat}>Runtime:</Text>
        <Text>{timeConvert(details && details.runtime)}</Text>
      </View>
      <View style={styles.subCat}>
        <Text style={styles.titleCat}>Synopsis:</Text>
        <ViewMoreText numberOfLines={2} style={{ width: '100%' }}>
          <Text>{details && details.overview}</Text>
        </ViewMoreText>
      </View>
      <View style={styles.subCat}>
        <Text style={styles.titleCat}>Genre:</Text>
        <FlatList
          horizontal={true}
          data={details && details.genres}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => <Text>{item && item.name + '  '}</Text>}
        />
      </View>
      <View style={styles.subCat}>
        <Text style={styles.titleCat}>Language:</Text>
        <Text>{details && details.original_language}</Text>
      </View>
      {details.production_countries && details.production_countries.length > 0 && (
        <View style={styles.subCat}>
          <Text style={styles.titleCat}>Countries:</Text>
          <FlatList
            horizontal={true}
            data={details.production_countries}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => <Text>{item.name + '  '}</Text>}
          />
        </View>
      )}

      <MovieCarousel
        navigation={navigation}
        title="You might also like:"
        list={recommendations}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  movieIntro: {
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    // alignItems: 'center',
    backgroundColor: '#d8e2dc',
    maxHeight: 115,
  },
  details: {
    marginLeft: 10,
    marginBottom: 900,
  },
  subCat: {
    marginTop: 6,
  },
  titleCat: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#6d6875',
  },
});

export default Details;
