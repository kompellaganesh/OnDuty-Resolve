import React, { Component } from 'react';
import { StackNavigator,DrawerNavigator } from 'react-navigation';
import {View} from 'react-native';
import LoginForm from './components/LoginForm';
import firstscreen from './components/firstscreen';
import secondscreen from './components/secondscreen';
import addperson from './components/addperson';
import BigImageActivity from './components/BigImageActivity';
import addlocation from './components/addlocation';
import Narrative from './components/Narrative';
import Attachment from './components/Attachment';
import addvehicle from './components/addvehicle';
import addcharge from './components/addcharge';
import addchargecitation from './components/addchargecitation';
import searchreports from './components/searchreports';
import secondscreenbooking from './components/secondscreenbooking';
import secondscreencitation from './components/secondscreencitation';

const Router = StackNavigator(
  {
    LoginForm: { screen: LoginForm },
    firstscreen: { screen: firstscreen },
    secondscreen: { screen: secondscreen },
    secondscreenbooking: { screen: secondscreenbooking },
    secondscreencitation: { screen: secondscreencitation },
    addperson: { screen: addperson },
    BigImageActivity: { screen: BigImageActivity },
    addlocation: { screen: addlocation },
    Narrative : {screen: Narrative},
    addcharge:{screen:addcharge},
    addchargecitation:{screen:addchargecitation},
    Attachment:{screen:Attachment},
    addvehicle:{screen:addvehicle},
    searchreports:{screen:searchreports},

  }
);


export default class App extends Component {

  componentDidMount() {
    const firebase = require("firebase");
    const config = {
      apiKey: "AIzaSyC6uXFZhyuzpHLnOct9hXwM_5qCEk0ut1U",
      authDomain: "dutyresolve.firebaseapp.com",
      databaseURL: "https://dutyresolve.firebaseio.com",
      storageBucket: "dutyresolve.appspot.com",
      messagingSenderId: "663097973209"
    };
    if (!firebase.apps.length) {
    firebase.initializeApp(config);
    }
  }

  
  render(){
    return(
      <Router/>
      

      )
  }}
