'use strict';
import React, {Component} from 'react';
// var SearchPage = require('./build/SearchPage').default
import SearchPage from './build/SearchPage';
import SearchResults from './build/SearchResults';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,

} from 'react-native';


export default class HelloWorld extends Component {
  static get defaultProps() {
   return {
     title: 'MyScene'
   };
 }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
        Welcome to React! {this.props.title}
        </Text>

        <Text style={styles.instructions}>
        To get started, edit index.android.js
        </Text>

        <Text style={styles.instructions}>
        Double tap R on your keyboard to reload,
        Shake or press menu button for dev menu
        </Text>

      </View>

      );
  }
}
 class ReactNativeTS extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{title:'Index Page', index: 0 }}
        configureScene={(route, routeStack) =>
          Navigator.SceneConfigs.FloatFromRight}
        renderScene={(route, navigator) => {
          console.debug(route);
            if(route.index == 0) {
             return <SearchPage navigator={navigator}/>
            }
            if(route.index == 1) {
             return <SearchResults navigator={navigator} {...route.passProps}/>
            }
        }}
      />
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  nav: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


AppRegistry.registerComponent('ReactNativeTS', () => ReactNativeTS);
