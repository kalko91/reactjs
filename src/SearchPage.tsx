'use strict';

import React, { Component } from 'react';

import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    Navigator
} from 'react-native';

interface Props  extends React.Props<SearchPage> {
    navigator:Navigator;
}

interface State {
  searchString: string;
  isLoading: boolean;
  message:string;
}

function urlForQueryAndPage(key:string, value:string, pageNumber:number) {
  var data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber
  };
  data[key] = value;

  var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return 'http://api.nestoria.co.uk/api?' + querystring;
};


export default class SearchPage extends Component<Props, State> {
  constructor(props: Props) {
        super(props);

        this.state = {
          searchString: 'london',
          isLoading: false,
          message: ''
        };
    }


  public onSearchTextChanged(event: {nativeEvent:{text:string}}) {
    this.setState({ searchString: event.nativeEvent.text });
  }

  private _handleResponse(response:any) {
    this.setState({ isLoading: false , message: '' });
    if (response.application_response_code.substr(0, 1) === '1') {
      this.props.navigator.push({
          title: 'Results',
          index:1,
          passProps: {
            listings: response.listings
          }
          // component: SearchResults,
          // passProps: {listings: response.listings}
      });
      console.log('Properties found: ' + response.listings.length);
    } else {
      this.setState({ message: 'Location not recognized; please try again.'});
    }
  }

  private _executeQuery(query:string) {
    console.log(query);
    this.setState({ isLoading: true });
    fetch(query)
      .then(response => response.json())
      .then(json => this._handleResponse(json['response']))
      .catch(error =>
         this.setState({
          isLoading: false,
          message: 'Something bad happened ' + error
       }));
  }

  public onSearchPressed() {
    var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
    this._executeQuery(query);
  }


  public render() {
    var spinner = this.state.isLoading ?
    ( <ActivityIndicator
        size='large'/> ) :
    ( <View/>);
    return (

      <View style={styles.container}>
        <Text style={styles.description}>
          Search for houses to buy!
        </Text>
        <Text style={styles.description}>
          Search by place-name, postcode or search near your location.
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this.onSearchTextChanged.bind(this)}
            placeholder='Search via name or postcode'/>
          <TouchableHighlight style={styles.button}
              underlayColor='#99d9f4' onPress={this.onSearchPressed.bind(this)}>
            <Text style={styles.buttonText}
            >Go</Text>
          </TouchableHighlight>
        </View>

          {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
}
// <View style={styles.flowRight}>
//   <TouchableHighlight style={styles.button}
//       underlayColor='#99d9f4' >
//     <Text style={styles.buttonText}>Location</Text>
//   </TouchableHighlight>
// </View>
const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  }  as React.ViewStyle,
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  } as React.ViewStyle,
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  } as React.ViewStyle,
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  }as React.ViewStyle,
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  } as React.ViewStyle,
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  }as React.ViewStyle
});
