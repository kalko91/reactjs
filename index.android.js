'use strict';

import React, {Component} from 'react';
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
      // <HelloWorld />
        <Navigator
        initialRoute={{ title: 'My Initial Scene', index: 0 }}
        renderScene={(route, navigator) => {
          return <HelloWorld title={route.title}/>
        }}
      />
      // <View style={styles.container}>
      // <Navigator
      // style={styles.nav}
      // initialRoute={{
      //   title: 'Property Finder',
      //   component: HelloWorld,
      // }}/>
      // </View>
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
