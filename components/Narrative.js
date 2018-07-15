import styles from '../styles/styles';
import { StackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import Popover from 'react-native-popover-view';
import realm from '../realm/realm';
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
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  Alert,
  View
} from 'react-native';
import { ListView } from 'realm/react-native';
import ImagePicker from 'react-native-image-picker';
import Communications from 'react-native-communications';
import Toast, { DURATION } from 'react-native-easy-toast';
import ImageZoom from 'react-native-image-pan-zoom';
import Geocoder from 'react-native-geocoding';
import { requestPermission, checkPermission } from 'react-native-android-permissions';

export class Narrative extends Component{
  static navigationOptions = {
    header: null,
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.goBack(); // works best when the goBack is async
    return true;
  }
   constructor() {
    super();
    this.state = {
      FI_ID:'',
      Narrativetext: '',
    }
  }

  Cancel_narrative=()=>{
    if(this.state.Narrativetext == ''){

    }
    else{
            Alert.alert(
        'Confirm',
        'This action will clear the Narrative data. Do you want to continue?',
        [
          { text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          {
            text: 'YES', onPress: () => {
              realm.write(() => {
        var ID = this.state.FI_ID - 1;
        if(this.props.navigation.state.params.REPORTID == 1){
          var obj = realm.objects('Field_Interview_Info');
        }
        else if(this.props.navigation.state.params.REPORTID == 2){
          var obj = realm.objects('Booking_Info');
        }
        else if(this.props.navigation.state.params.REPORTID == 3){
        var obj = realm.objects('Citation_Info');
      }
          obj[ID].location_narrative = '';
          this.setState({
            Narrativetext:''
          })
        }
      );
            }
          },

        ],
    
      )

    } }
    Update_Narrative = () => {
      if(this.props.navigation.state.params.REPORTID == 1){
        var obj = realm.objects('Field_Interview_Info');
      }
      else if(this.props.navigation.state.params.REPORTID == 2){
        var obj = realm.objects('Booking_Info');
      }
      else if(this.props.navigation.state.params.REPORTID == 3){
        var obj = realm.objects('Citation_Info');
      }
         realm.write(() => {
        var ID = this.state.FI_ID - 1;
        
          obj[ID].location_narrative = this.state.Narrativetext
        });
      this.props.navigation.goBack();
    
  }
  componentWillMount(){
    this.setState(
    {
      FI_ID:this.props.navigation.state.params.ID,
      Narrativetext:this.props.navigation.state.params.NARRATION
    })
 }

  showheader_header = () => {

    return (
      <View style={styles.header}>
        <TouchableOpacity onPress = {() => {this.props.navigation.goBack()}}>
          <View style={{ paddingHorizontal: 10 }}>

            <Image style={{

              width: 40,
              height: 40

            }} source={{ uri: 'https://lh3.googleusercontent.com/cf4onbPhuhLqLIKxgzqdSGaYOXpi9757g6I8_fcDW5Gt8uGuHorXEe1ALlP5Mzn_nymYDQIKhap1NMmNpaiuU1bMLA=s1024' }} />
          </View>
        </TouchableOpacity>


        <View style={styles.whitespace}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Narrative</Text></View>

        <TouchableOpacity


          onPress={this.Update_Narrative}
        >
          <View style={{ paddingHorizontal: 10 }}>

            <Image style={{
              width: 40,
              height: 40

            }} source={{ uri: 'https://lh3.googleusercontent.com/9ZHLjA-PkUZLolpB3ubiuQWKNzth8BTeyTKF00ItsWDT79PIhqGRkmSm9iLNnqQyPZPV3UmIs3k51gBuoAmUKfQSrw=s1024' }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity


          onPress={this.Cancel_narrative}
        >
          <View style={{ paddingHorizontal: 10 }}>

             <Text style = {{fontSize:20,fontWeight:'bold'}}>CLEAR</Text>
          </View>
        </TouchableOpacity>
      </View>


    );

  }
  render(){
    return(
      <View>
      {this.showheader_header()}
      <Text style={{marginLeft:20,fontSize:30}}>
        Narrative:
      </Text>
      <Text style={{marginLeft:20}}>
        (*Tap to enter text)
      </Text>
      <TextInput
          style={{height:600,borderWidth: 2,
            textAlignVertical: "top",
    borderColor: 'black',
    width: '90%',
    borderRadius: 10,
    margin: 20,
    marginRight:10,
    fontSize: 25}}
          underlineColorAndroid="transparent"
          multiline={true} 
          onChangeText={(text) => { this.setState({ Narrativetext: text }) }}
          value={this.state.Narrativetext}
        /></View>
      )
  }
}
export default Narrative;