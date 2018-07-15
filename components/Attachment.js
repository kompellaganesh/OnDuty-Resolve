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
  TouchableOpacity,
  Image,
  BackHandler,
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

export class Attachment extends Component{
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
      attachment: '',
    }
  }
   GoToImageActivity(employee_image) {
    if (employee_image == 'https://lh3.googleusercontent.com/7byfpPoWE_v1Lzm3nTCvlD_hELIOF7b8GJ7wLphbSm98hJtyO6KBpx4lVl9OR8POsc964W2QsVAUayTiwgJckyhWGA=s1024') {
      const options = {
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
          skipBackup: true
        }
      };

      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled photo picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          let source = response.uri;

          this.setState({

            attachment: source

          });
        }
      });
    }
    else {
      this.props.navigation.navigate('BigImageActivity', {

        IMAGE: employee_image

      });

    }

  }
   showimage_image = () => {
    if (this.state.attachment == 'https://lh3.googleusercontent.com/7byfpPoWE_v1Lzm3nTCvlD_hELIOF7b8GJ7wLphbSm98hJtyO6KBpx4lVl9OR8POsc964W2QsVAUayTiwgJckyhWGA=s1024') {
      return (
        <TouchableOpacity onPress={this.GoToImageActivity.bind(this, this.state.attachment)}>
          <View style={{
            width: 233,
            height: 300,
            borderRadius: 20,
            marginLeft:30
          }}>


            <Image style={{
              width: 233,
              height: 300,
              borderRadius: 20,
            }} source={{ uri: this.state.attachment }} />


          </View>

        </TouchableOpacity>

      );
    } else {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.GoToImageActivity.bind(this, this.state.attachment)}>
            <View style={{
              width: 233,
              height: 300,
              borderRadius: 20,
            }}>


              <Image style={{
                width: 233,
                height: 300,
                borderRadius: 20,
              }} source={{ uri: this.state.attachment }} />


            </View>

          </TouchableOpacity>
          <TouchableOpacity onPress={this.Clear_Image}>


            <View style={{ paddingHorizontal: 30, justifyContent: 'center', alignItems: 'center' }}>

              <Image style={{
                width: 60,
                height: 60

              }} source={{ uri: 'https://lh3.googleusercontent.com/Hyqd6on3-bOQjI9kqfXreq4FM7yqPl4NZJjhixamVjzed6JTEdRTc6mhY-syc65R5XkokbJwT39ktlUWCKYDsHJa=s1024' }} />
              <Text style={{ fontSize: 20 }}>Delete</Text>
            </View>


          </TouchableOpacity></View>


      );
    }
  }
  Clear_Image = () => {
    this.setState({


      attachment: 'https://lh3.googleusercontent.com/7byfpPoWE_v1Lzm3nTCvlD_hELIOF7b8GJ7wLphbSm98hJtyO6KBpx4lVl9OR8POsc964W2QsVAUayTiwgJckyhWGA=s1024',
    })


  }
 
    Update_Attachment = () => {
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
          obj[ID].location_image = this.state.attachment
      });
      this.props.navigation.goBack();
      
    }
  componentWillMount(){
    this.setState(
    {
      FI_ID:this.props.navigation.state.params.ID,
      attachment:this.props.navigation.state.params.ATTACHMENT
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
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Attachment</Text></View>

        <TouchableOpacity


          onPress={this.Update_Attachment}
        >
          <View style={{ paddingHorizontal: 10 }}>

            <Image style={{
              width: 40,
              height: 40

            }} source={{ uri: 'https://lh3.googleusercontent.com/9ZHLjA-PkUZLolpB3ubiuQWKNzth8BTeyTKF00ItsWDT79PIhqGRkmSm9iLNnqQyPZPV3UmIs3k51gBuoAmUKfQSrw=s1024' }} />
          </View>
        </TouchableOpacity>
        
      </View>


    );

  }
  render(){
    return(
      <View>
      {this.showheader_header()}
      {this.showimage_image()}
      </View>
      )
  }


}
export default Attachment;