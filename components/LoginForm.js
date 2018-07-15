import styles from '../styles/styles';
import React, { Component } from 'react';
import { TextField } from 'react-native-material-textfield';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
 
import {
  Platform,
  YellowBox,
  Dimensions,
  Picker,
  FlatList,
  BackHandler,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  Alert,
  View
} from 'react-native';

 export class LoginForm extends Component {
  static navigationOptions = {
    header: null,
  }
    constructor(props) {

    super(props);
    this.state = {
      EmailID: '',
      Password: '',
    };

  }
  
  GoToSecondActivity = () => {
    this.props.navigation.navigate('firstscreen');
  }

  loginuser = () => {
        const firebase = require("firebase");
        firebase.auth().signInWithEmailAndPassword(this.state.EmailID, this.state.Password)
      .then(() => this.props.navigation.navigate('firstscreen'))
      .catch((error) => alert('Enter valid EmailID'))
    }
    render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={{ position: 'absolute',top: 0,left: 0,bottom: 0,right: 0 ,paddingHorizontal:40, justifyContent: 'center',}} source={require('../assets/icon.png')}>

        <TouchableOpacity onPress={() => { this.popupDialog.show(); }}>
          <View style={{ marginLeft: '85%', marginBottom: 10, }}>
            <Image style={{ width: 40, height: 40 }} source={{ uri: 'https://lh3.googleusercontent.com/fCwG_1biJ0VDVsfilok4ZE7xn9Ac_9b2vGw9fNhf_vwfMVLhWdPPfhcBpmJU-tA629z-fnWWcVPQeG045nmjL6W8ew=s1024' }} />
          </View>
        </TouchableOpacity>
        <TextInput
          placeholder="EmailID"
          style={styles.TextInputStyle}
          underlineColorAndroid="transparent"
          onChangeText={(text) => { this.setState({ EmailID: text }) }}
          value={this.state.EmailID}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(text) => { this.setState({ Password: text }) }}
          secureTextEntry={true}
          style={styles.TextInputStyle}
          value={this.state.Password}
          underlineColorAndroid="transparent"
        />

        <TouchableOpacity onPress={this.loginuser}><View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '5%', backgroundColor: 'orange', height: 60, borderRadius: 10, }}><Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>SUBMIT</Text></View></TouchableOpacity>
        <PopupDialog style={{ marginRight: '90%' }} width={0.8} height={0.37} dialogTitle={<DialogTitle title="Configure Server URL:" />} ref={(popupDialog) => { this.popupDialog = popupDialog; }}>
          <ScrollView>
            <View style={styles.container}>
              <TextField
                label="Orchestration Engine URL"
                keyboardType={'default'}

                textColor="#000007"
                baseColor="#000007"
                underlineColorAndroid="transparent" />
              <TextField
                label="SSO URL"
                keyboardType={'default'}

                //keyboardType={'email-address'}
                textColor="#000007"
                baseColor="#000007"
                underlineColorAndroid="transparent"

              //onChangeText = { ( text ) => { } } 
              />
              <TextField
                label="Customer ID"

                textColor="#000007"
                baseColor="#000007"
                underlineColorAndroid="transparent"
                keyboardType={'default'}
              />
              <View style={styles.header1}>
                <TouchableOpacity>
                  <View style={{ paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 18 }}>Submit</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { this.popupDialog.dismiss(); }}>
                  <View style={{ paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 18 }}>Cancel</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View></ScrollView>
        </PopupDialog>
        </ImageBackground>
      </View>
    );
  }
}
export default LoginForm;

