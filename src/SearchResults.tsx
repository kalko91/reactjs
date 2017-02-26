'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text,
  Navigator
} from 'react-native';

interface Props {
    listings:any;
    navigator:Navigator;
}

interface State {
  dataSource:any;
}

export default class SearchResults extends Component<Props, State> {
  constructor(props:Props) {
    super(props);
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.guid !== r2.guid});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.listings)
    };
  }
  redirectToHome(){
    this.props.navigator.push({
        index:0,
    });
  }
  rowPressed(propertyGuid:any) {
    var property = this.props.listings.filter((prop:any) => prop.guid === propertyGuid)[0];
  }


  renderRow(rowData:any, sectionID:number, rowID:number) {
    var price = rowData.price_formatted.split(' ')[0];
    return (

      <TouchableHighlight onPress={() => this.rowPressed(rowData.guid)}
          underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: rowData.img_url }} />
            <View  style={styles.textContainer}>
              <Text style={styles.price}>£{price}</Text>
              <Text style={styles.title}
                    numberOfLines={1}>{rowData.title}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.content}>
      <View style={styles.backButton}>
      <TouchableHighlight style={styles.button}
          underlayColor='#99d9f4' onPress={this.redirectToHome.bind(this)}>
              <Text style={styles.buttonText} >Back</Text>
      </TouchableHighlight>
      </View>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  content:{
    backgroundColor:'white',
  } as React.ViewStyle,
  backButton:{
    height:80,
  } as React.ViewStyle,
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  } as React.ViewStyle,
  textContainer: {
    flex: 1
  } as React.ViewStyle,
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  } as React.ViewStyle,
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  } as React.ViewStyle,
  title: {
    fontSize: 20,
    color: '#656565'
  } as React.ViewStyle,
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  } as React.ViewStyle,
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  }as React.ViewStyle,
  button: {
    height: 10,
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
});
