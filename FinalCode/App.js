import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading : true,
      source : null
    };
  }

  componentDidMount(){
    return fetch(`https://reactnative.dev/movies.json`)
    .then ((response) => response.json() )
    .then ( (responseJSON) => {
        this.setState({
          isLoading : false,
          source: responseJSON.movies,
        })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render(){
    if(this.state.isLoading){
      return (
        <View style = {styles.container}>
          <ActivityIndicator/>
        </View>
      )
    }
    else {
      let movies = this.state.source.map((val, key) => {
          return <View key = {key} style={styles.item}>
            <Text>{val.title}</Text>
            </View>
      });
  return (
    <View style={styles.container}>
        {movies}
    </View>
  );
    }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    alignSelf: 'stretch',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  }
});
