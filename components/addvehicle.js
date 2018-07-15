import styles from '../styles/styles';
import realm from '../realm/realm';
import { StackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import Popover from 'react-native-popover-view';
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
  StyleSheet,
  ScrollView,
  BackHandler,
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

export class addvehicle extends Component {
  static navigationOptions = {
    header: null,
  };
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
  GoToSecondActivity = () => {
    this.props.navigation.goBack();
  }
  constructor() {
    super();
    this.state = {
      FIELDID:'',
      ID: '',
      PLATE: '',
      PLATEYEAR: '',
      PLATETYPE: '',
      PLATESTATE: '',
      VEHICLEYEAR: '',
      COLOR: '',
      COLOR2: '',
      VIN: '',
      BODYSTYLE: '',
      BODYTYPE: '',
      NOTES: '',
      IMAGE: 'https://lh3.googleusercontent.com/VD_6uiGvWgA1O4nVUukE2caj2YdhsizINJaXuhgcS4HuJazKADGcztO8BqWxJOiYjLH7FQhsBPEeF25ifnFd_pBu=s1024',
    
    }
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'
    ]);
  }


  Cancel_Employee = () => {
    this.setState({
      FIELDID: this.props.navigation.state.params.FIELDID,
      ID: this.props.navigation.state.params.ID,
      PLATE: this.props.navigation.state.params.PLATE,
      PLATEYEAR: this.props.navigation.state.params.PLATEYEAR,
      PLATETYPE: this.props.navigation.state.params.PLATETYPE,
      PLATESTATE: this.props.navigation.state.params.PLATESTATE,
      VEHICLEYEAR: this.props.navigation.state.params.VEHICLEYEAR,
      COLOR: this.props.navigation.state.params.COLOR,
      COLOR2: this.props.navigation.state.params.COLOR2,
      VIN: this.props.navigation.state.params.VIN,
      BODYSTYLE: this.props.navigation.state.params.BODYSTYLE,
      BODYTYPE: this.props.navigation.state.params.BODYTYPE,
      NOTES: this.props.navigation.state.params.NOTES,
      IMAGE: this.props.navigation.state.params.IMAGE,

    })


  }
  componentWillMount() {
    { this.Cancel_Employee() }

  }
  Update_vehicle = () => {
    if(this.props.navigation.state.params.PLATE == ''){
      if (this.state.PLATE == '') {
      Alert.alert(
        'Cannot Save',
        'Plate cannot be empty')
    }
    else {
      realm.write(() => {
 realm.create('Add_Vehicle', {
        reportids:this.props.navigation.state.params.REPORTID,
        fieldids:this.state.FIELDID,
        vehicle_id: this.state.ID + 1,
        vehicle_plate: this.state.PLATE, 
        vehicle_plateyear: this.state.PLATEYEAR,
        vehicle_platetype: this.state.PLATETYPE,
        vehicle_patestate:this.state.PLATESTATE,
        vehicle_year: this.state.VEHICLEYEAR,
        vehicle_Color: this.state.COLOR,
        vehicle_Color2: this.state.COLOR2,
        vehicle_VIN: this.state.VIN,
        vehicle_BodyStyle: this.state.BODYSTYLE,
        vehicle_Bodytype: this.state.BODYTYPE,
        vehicle_Notes:this.state.NOTES,
        vehicle_image : this.state.IMAGE,
        });
       });
      this.props.navigation.goBack();
    }

    
    }
    else{

      if (this.state.PLATE == '') {
      Alert.alert(
        'Cannot Save',
        'Plate cannot be empty')
    }
    else {
      realm.write(() => {

        var ID = this.props.navigation.state.params.ID - 1;
        var obj = realm.objects('Add_Vehicle');
        obj[ID].vehicle_id= this.state.ID,
        obj[ID].vehicle_plate= this.state.PLATE, 
        obj[ID].vehicle_plateyear= this.state.PLATEYEAR,
        obj[ID].vehicle_platetype= this.state.PLATETYPE,
        obj[ID].vehicle_patestate=this.state.PLATESTATE,
        obj[ID].vehicle_year= this.state.VEHICLEYEAR,
        obj[ID].vehicle_Color= this.state.COLOR,
        obj[ID].vehicle_Color2= this.state.COLOR2,
        obj[ID].vehicle_VIN= this.state.VIN,
        obj[ID].vehicle_BodyStyle= this.state.BODYSTYLE,
        obj[ID].vehicle_Bodytype= this.state.BODYTYPE,
        obj[ID].vehicle_Notes=this.state.NOTES,
        obj[ID].vehicle_image = this.state.IMAGE

       });
      this.props.navigation.goBack();
    }

    }
    
  }

  Delete_VEHICLLE = () => {
    if (this.props.navigation.state.params.PLATE == '' && this.state.PLATE == '') {
      this.props.navigation.goBack();

    }
    else if (this.props.navigation.state.params.PLATE == '' && this.state.PLATE != '') {
      Alert.alert(
        'Confirm',
        'This action will remove unsaved Vehicle data. Do you want to continue?',
        [
          { text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          {
            text: 'YES', onPress: () => {
              this.props.navigation.goBack();
            }
          },

        ],
        { cancelable: false }
      )
    }
    else {
      Alert.alert(
        'Confirm',
        'This action will remove the Person from this Report. Do you want to continue?',
        [
          { text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          {
            text: 'YES', onPress: () => {

              realm.write(() => {

                var id = this.state.ID - 1;
                realm.delete(realm.objects('Add_Vehicle')[id]);
               for(i=1;i<=realm.objects('Add_Vehicle').length;i++){
               realm.objects('Add_Vehicle')[i-1].vehicle_id = i
               }
              });
                this.props.navigation.goBack();
            }
          },

        ],
        { cancelable: false }
      )


    }

  }
  remind_Name = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to leave this employee',
      [
        {
          text: 'yes', onPress: () => {
            realm.write(() => {
        var ID = this.state.ID - 1;
        var obj = realm.objects('Add_Vehicle');
        obj[ID].person_id= this.props.navigation.state.params.ID;
        obj[ID].person_firstname= this.props.navigation.state.params.FIRSTNAME; 
        obj[ID].person_lastname= this.props.navigation.state.params.LASTNAME;
        obj[ID].person_middlename= this.props.navigation.state.params.MIDDLENAME;
        obj[ID].person_address_country= this.props.navigation.state.params.COUNTRY;
        obj[ID].person_address_state= this.props.navigation.state.params.STATE;
        obj[ID].person_address_city= this.props.navigation.state.params.CITY;
        obj[ID].person_address_postalcode= this.props.navigation.state.params.POSTALCODE;
        obj[ID].person_address_streetaddress= this.props.navigation.state.params.STREETADDRESS;
        obj[ID].person_address_apartmentnumber= this.props.navigation.state.params.APARTMENTNUMBER;
        obj[ID].person_age=this.props.navigation.state.params.AGE;
        obj[ID].person_licensenumber = this.props.navigation.state.params.LICENSE;
        obj[ID].person_SSN = this.props.navigation.state.params.SSN;
        obj[ID].person_Gender = this.props.navigation.state.params.GENDER;
        obj[ID].person_Eyes = this.props.navigation.state.params.EYES;
        obj[ID].person_hair = this.props.navigation.state.params.HAIR;
        obj[ID].person_height = this.props.navigation.state.params.HEIGHT;
        obj[ID].person_weight = this.props.navigation.state.params.WEIGHT;
        obj[ID].person_Race = this.props.navigation.state.params.RACE;
        obj[ID].person_ethnicity=this.props.navigation.state.params.ETHNICITY;
        obj[ID].person_citizenship=this.props.navigation.state.params.CITIZENSHIP;
        obj[ID].person_HomePhone=this.props.navigation.state.params.HOMEPHONE;
        obj[ID].person_workphone=this.props.navigation.state.params.WORKPHONE;
        obj[ID].person_cellphone=this.props.navigation.state.params.CELPHONE;
        obj[ID].person_otherphone=this.props.navigation.state.params.OTHERPHONE;
        obj[ID].person_image=this.props.navigation.state.params.IMAGE;
            });
            //this.refs.toast.show('Employee Deleted', 200, () => {
            this.props.navigation.goBack();
            // something you want to do at close
            //});



          }
        },
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      ],
      { cancelable: false }
    )

  }


  GoToImageActivity(employee_image) {
    if (employee_image == 'https://lh3.googleusercontent.com/VD_6uiGvWgA1O4nVUukE2caj2YdhsizINJaXuhgcS4HuJazKADGcztO8BqWxJOiYjLH7FQhsBPEeF25ifnFd_pBu=s1024') {
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

            IMAGE: source

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
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Vehicle</Text></View>

        <TouchableOpacity


          onPress={this.Update_vehicle}
        >
          <View style={{ paddingHorizontal: 10 }}>

            <Image style={{
              width: 40,
              height: 40

            }} source={{ uri: 'https://lh3.googleusercontent.com/9ZHLjA-PkUZLolpB3ubiuQWKNzth8BTeyTKF00ItsWDT79PIhqGRkmSm9iLNnqQyPZPV3UmIs3k51gBuoAmUKfQSrw=s1024' }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity


          onPress={this.Delete_VEHICLLE}
        >
          <View style={{ paddingHorizontal: 10 }}>

            <Image style={{
              width: 40,
              height: 40

            }} source={{ uri: 'https://lh3.googleusercontent.com/Hyqd6on3-bOQjI9kqfXreq4FM7yqPl4NZJjhixamVjzed6JTEdRTc6mhY-syc65R5XkokbJwT39ktlUWCKYDsHJa=s1024' }} />
          </View>
        </TouchableOpacity>
      </View>


    );

  }

  showimage_image = () => {
    if (this.state.IMAGE == 'https://lh3.googleusercontent.com/VD_6uiGvWgA1O4nVUukE2caj2YdhsizINJaXuhgcS4HuJazKADGcztO8BqWxJOiYjLH7FQhsBPEeF25ifnFd_pBu=s1024') {
      return (
        <TouchableOpacity onPress={this.GoToImageActivity.bind(this, this.state.IMAGE)}>
          <View style={{
            width: 233,
            height: 200,
            borderRadius: 20,
          }}>


            <Image style={{
              width: 233,
              height: 200,
              borderRadius: 20,
            }} source={{ uri: this.state.IMAGE }} />


          </View>

        </TouchableOpacity>

      );
    } else {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.GoToImageActivity.bind(this, this.state.IMAGE)}>
            <View style={{
              width: 233,
              height: 300,
              borderRadius: 20,
            }}>


              <Image style={{
                width: 233,
                height: 300,
                borderRadius: 20,
              }} source={{ uri: this.state.IMAGE }} />


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


      IMAGE: 'https://lh3.googleusercontent.com/VD_6uiGvWgA1O4nVUukE2caj2YdhsizINJaXuhgcS4HuJazKADGcztO8BqWxJOiYjLH7FQhsBPEeF25ifnFd_pBu=s1024',
    })


  }

  validateplateyear = (text) => {
    let reg = /^\d{4}$/;
    if (reg.test(text) === true) {
      this.setState({ PLATEYEAR: text })
    }
  }
  validatevehicleyear = (text) => {
    let reg = /^\d{4}$/;
    if (reg.test(text) === true) {
      this.setState({ VEHICLEYEAR: text })
    }
  }



  render() {

    return (

      <View style={{
        flex: 1,
        justifyContent: 'center',
      }}>
        {this.showheader_header()}
        

        <ScrollView>

          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            marginTop: 30,
          }}>
            {this.showimage_image()}

          </View>
          <View style={{ backgroundColor: '#D3D3D3', height: 35 }}><Text style={{ paddingHorizontal: 30, fontSize: 20 }}>Vehicle Information</Text></View>
          <TextField
            
            label="  * Plate:"
            tintColor='red'
            keyboardType={'default'}
            textColor="#000007"
            underlineColorAndroid="transparent"
            value={this.state.PLATE}
            baseColor="#000007"
            onChangeText={(text) => { this.setState({ PLATE: text }) }}
          />
          
          <TextField
            label="  Plate Year:"
            textColor="#000007"
            baseColor="#000007"
            underlineColorAndroid="transparent"
            keyboardType={'numeric'}
            value={this.state.PLATEYEAR}
            onChangeText={(text) => { this.validateplateyear(text) }}
          />
          <Picker

              selectedValue={this.state.PLATETYPE}
              onValueChange={(itemValue, itemIndex) => this.setState({ PLATETYPE: itemValue })}>
              <Picker.Item label=" Plate Type" value="Plate Type" />
              <Picker.Item label="ALL OTHERS" value="ALL OTHERS" />
              <Picker.Item label="ALL-TERRAIN VEHICLE" value="ALL-TERRAIN VEHICLE" />
              <Picker.Item label="AMATEUR RADIO OR CITIZENS BAND" value="AMATEUR RADIO OR CITIZENS BAND" />
              <Picker.Item label="AMBULANCE" value="AMBULANCE" />
              <Picker.Item label="ANTIQUE" value="ANTIQUE" />
              <Picker.Item label="APPORTIONED" value="APPORTIONED" />
              <Picker.Item label="ARMED FORCES RESERVIST" value="ARMED FORCES RESERVIST" />
              <Picker.Item label="BUS" value="BUS" />
              <Picker.Item label="CAB" value="CAB" />
              <Picker.Item label="CITY-OWNED OR MUNICIPAL VEHICLE" value="CITY-OWNED OR MUNICIPAL VEHICLE" />
              <Picker.Item label="CLASSIC" value="CLASSIC" />
              <Picker.Item label="COLLECTOR" value="COLLECTOR" />
              <Picker.Item label="COLLEGIATE" value="COLLEGIATE" />
              <Picker.Item label="COMMEMORATIVE" value="COMMEMORATIVE" />
              <Picker.Item label="COMMERCIAL" value="COMMERCIAL" />
              <Picker.Item label="CONSERVATION" value="CONSERVATION" />
              <Picker.Item label="CONSULAR CORPS" value="CONSULAR CORPS" />
              <Picker.Item label="COUNTY-OWNED VEHICLE" value="COUNTY-OWNED VEHICLE" />
              <Picker.Item label="DEALER" value="DEALER" />
              <Picker.Item label="DENTIST" value="DENTIST" />
              <Picker.Item label="DIPLOMATIC" value="DIPLOMATIC" />
              <Picker.Item label="DISABLED VETERAN" value="DISABLED VETERAN" />
              <Picker.Item label="DOCTOR" value="DOCTOR" />
              <Picker.Item label="DRIVE-AWAY" value="DRIVE-AWAY" />
              <Picker.Item label="DUNE BUGGY" value="DUNE BUGGY" />
              <Picker.Item label="DUPLICATE,REISSUE,OR REPLACE" value="DUPLICATE,REISSUE,OR REPLACE" />
              <Picker.Item label="EXEMPT" value="EXEMPT" />
              <Picker.Item label="FARM VEHICLE" value="FARM VEHICLE" />
              <Picker.Item label="FIRE DEPARTMENT" value="FIRE DEPARTMENT" />
              <Picker.Item label="FOREIGN GOVERNMENT" value="FOREIGN GOVERNMENT" />
              <Picker.Item label="HANDICAPPED PERSON" value="HANDICAPPED PERSON" />
              <Picker.Item label="HEARING IMPAIRED" value="HEARING IMPAIRED" />
              <Picker.Item label="HISTORIC" value="HISTORIC" />
              <Picker.Item label="HORSELESS CARRIAGE" value="HORSELESS CARRIAGE" />
              <Picker.Item label="INTERNATIONS PLATE" value="INTERNATIONS PLATE" />
              <Picker.Item label="IN-TRANSIT" value="IN-TRANSIT" />
              <Picker.Item label="JUDGE OR JUSTICE" value="JUDGE OR JUSTICE" />
              <Picker.Item label="LAW ENFORCEMENT" value="LAW ENFORCEMENT" />
              <Picker.Item label="LEGISLATIVE,STATE" value="LEGISLATIVE,STATE" />
              <Picker.Item label="LEGISLATIVE,U.S." value="LEGISLATIVE,U.S." />
              <Picker.Item label="MANUFACTURER" value="MANUFACTURER" />
              <Picker.Item label="MEDAL OF HONOR" value="MEDAL OF HONOR" />
              <Picker.Item label="MILITARY RESERVIST" value="MILITARY RESERVIST" />
              <Picker.Item label="MILITARY VEHICLE,CANADIAN" value="MILITARY VEHICLE,CANADIAN" />
              <Picker.Item label="MILITARY VEHICLE,U.S." value="MILITARY VEHICLE,U.S." />
              <Picker.Item label="MOPED" value="MOPED" />
              <Picker.Item label="MOTORCYCLE" value="MOTORCYCLE" /> 
              <Picker.Item label="MOTORCYCLE DEALER" value="MOTORCYCLE DEALER" />
              <Picker.Item label="NATIONAL GUARD MEMBER" value="NATIONAL GUARD MEMBER" />
              <Picker.Item label="OMNIBUS" value="OMNIBUS" />
              <Picker.Item label="ORGANIZATION" value="ORGANIZATION" />
              <Picker.Item label="PERSONALIZED/CUSTOMIZED" value="PERSONALIZED/CUSTOMIZED" />
              <Picker.Item label="PHARMACIST" value="PHARMACIST" />
              <Picker.Item label="PHYSICIAN" value="PHYSICIAN" />
              <Picker.Item label="PRESS" value="PRESS" />
              <Picker.Item label="PRISONER OF WAR" value="PRISONER OF WAR" />
              <Picker.Item label="PROFESSIONAL SPORTS TEAM" value="PROFESSIONAL SPORTS TEAM" />
              <Picker.Item label="PROFESSIONS" value="PROFESSIONS" />
              <Picker.Item label="PURPLE HEART" value="PURPLE HEART" />
              <Picker.Item label="RECIPROCAL(OR RECIPROCITY)" value="RECIPROCAL(OR RECIPROCITY)" />
              <Picker.Item label="REGULAR PASSENGER AUTOMOBILE P" value="REGULAR PASSENGER AUTOMOBILE P" />
              <Picker.Item label="RENTED VEHICLE OR TRAILER" value="RENTED VEHICLE OR TRAILER" />
              <Picker.Item label="SCHOOL VEHICLE" value="SCHOOL VEHICLE" />
              <Picker.Item label="SEMITRUCK" value="SEMITRUCK" />
              <Picker.Item label="SENATOR" value="SENATOR" />
              <Picker.Item label="SNOWMOBILE" value="SNOWMOBILE" />
              <Picker.Item label="SPECIAL PURPOSE COMMERCIAL VEHICLE" value="SPECIAL PURPOSE COMMERCIAL VEHICLE" />
              <Picker.Item label="STREET CLEANER" value="STREET CLEANER" />
              <Picker.Item label="STREET ROD" value="STREET ROD" />
              <Picker.Item label="TAXI" value="TAXI" />
              <Picker.Item label="TEMPORARY" value="TEMPORARY" />
              <Picker.Item label="TRAILER" value="TRAILER" />
              <Picker.Item label="TRANSPORTER" value="TRANSPORTER" />
              <Picker.Item label="TRUCK" value="TRUCK" />
              <Picker.Item label="TRUCK-TRACTOR" value="TRUCK-TRACTOR" />
              <Picker.Item label="US.GOVERNMENT VEHICLES" value="US.GOVERNMENT VEHICLES" />
              <Picker.Item label="VETERAN OF FOREIGN WARS" value="VETERAN OF FOREIGN WARS" />
              <Picker.Item label="VETERINARY" value="VETERINARY" />
              <Picker.Item label="VIETNAM VETERAN" value="VIETNAM VETERAN" />
              <Picker.Item label="VINTAGE" value="VINTAGE" />
              <Picker.Item label="WELDING TRUCK" value="WELDING TRUCK" />
              <Picker.Item label="WILD LIFE" value="WILD LIFE" />
             </Picker>

             <Picker

              selectedValue={this.state.PLATESTATE}
              onValueChange={(itemValue, itemIndex) => this.setState({ PLATESTATE: itemValue })}>
              <Picker.Item label=" Plate State" value="State" />
              <Picker.Item label="Andra Pradesh" value="Andra Pradesh" />
              <Picker.Item label="Arunachal Pradesh" value="Arunachal Pradesh" />
              <Picker.Item label="Assam" value="Assam" />
              <Picker.Item label="Bihar" value="Bihar" />
              <Picker.Item label="Chhattisgarh" value="Chhattisgarh" />
              <Picker.Item label="Goa" value="Goa" />
              <Picker.Item label="Gujarat" value="Gujarat" />
              <Picker.Item label="Haryana" value="Haryana" />
              <Picker.Item label="Himachal Pradesh" value="Himachal Pradesh" />
              <Picker.Item label="Jammu and Kashmir  " value="Jammu and Kashmir" />
              <Picker.Item label="Jharkhand  " value="Jharkhand" />
              <Picker.Item label="Karnataka  " value="Karnataka" />
              <Picker.Item label="Kerala" value="Kerala" />
              <Picker.Item label="Madhya Pradesh" value="Madya Pradesh" />
              <Picker.Item label="Maharashtra  " value="Maharashtra" />
              <Picker.Item label="Manipur  " value="Manipur" />
              <Picker.Item label="Meghalaya  " value="Meghalaya" />
              <Picker.Item label="Mizoram  " value="Mizoram" />
              <Picker.Item label="Nagaland   " value="Nagaland" />
              <Picker.Item label="Odisha   " value="Odisha" />
              <Picker.Item label="Punjab   " value="Punjab   " />
              <Picker.Item label="Rajasthan  " value="Rajasthan" />
              <Picker.Item label="Sikkim   " value="Sikkim" />
              <Picker.Item label="Tamil Nadu   " value="Tamil Nadu" />
              <Picker.Item label="Telangana" value="Telangana" />
              <Picker.Item label="Tripura  " value="Tripura" />
              <Picker.Item label="Uttarakhand  " value="Uttarakhand" />
              <Picker.Item label="Uttar Pradesh  " value="Uttar Pradesh" />
              <Picker.Item label="West Bengal  " value="West Bengal" />
            </Picker>
          <TextField

            label="  Vehicle Year:"
            textColor="#000007"
            baseColor="#000007"
            underlineColorAndroid="transparent"
            keyboardType={'numeric'}
            value={this.state.VEHICLEYEAR}
            onChangeText={(text) => { this.validatevehicleyear(text) }}
          />
          <Picker

              selectedValue={this.state.COLOR}
              onValueChange={(itemValue, itemIndex) => this.setState({ COLOR: itemValue })}>
              <Picker.Item label=" COLOR" value="COLOR" />
              <Picker.Item label="ALUMINIUM" value="ALUMINIUM" />
              <Picker.Item label="AMETHYST" value="AMETHYST" />
              <Picker.Item label="BEIGE" value="BEIGE" />
              <Picker.Item label="BLACK" value="BLACK" />
              <Picker.Item label="BLUE" value="BLUE" />
              <Picker.Item label="BRONZE" value="BRONZE" />
              <Picker.Item label="BROWN" value="BROWN" />
              <Picker.Item label="BURGUNDY" value="BURGUNDY" />
              <Picker.Item label="CAMOUFLAGE" value="CAMOUFLAGE" />
              <Picker.Item label="CHROME  " value="CHROME" />
              <Picker.Item label="COPPER  " value="COPPER" />
              <Picker.Item label="CREAM  " value="CREAM" />
              <Picker.Item label="DARK BLUE" value="DARK BLUE" />
              <Picker.Item label="DARK GREEN" value="DARK GREEN" />
              <Picker.Item label="GOLD  " value="GOLD" />
              <Picker.Item label="GREEN  " value="GREEN" />
              <Picker.Item label="GREY  " value="GREY" />
              <Picker.Item label="IVORY  " value="IVORY" />
              <Picker.Item label="LAVENDER   " value="LAVENDER" />
              <Picker.Item label="LIGHT BLUE   " value="LIGHT BLUE" />
              <Picker.Item label="LIGHT GREEN   " value="LIGHT GREEN   " />
              <Picker.Item label="MAROON  " value="MAROON" />
              <Picker.Item label="MAUVE   " value="MAUVE" />
              <Picker.Item label="MULTI-COLORED   " value="MULTI-COLORED" />
              <Picker.Item label="ORANGE" value="ORANGE" />
              <Picker.Item label="PINK  " value="PINK" />
              <Picker.Item label="PURPLE  " value="PURPLE" />
              <Picker.Item label="RED  " value="RED" />
              <Picker.Item label="SILVER  " value="SILVER" />
              <Picker.Item label="STAINLESS STEEL   " value="STAINLESS STEEL" />
              <Picker.Item label="TAN" value="TAN" />
              <Picker.Item label="TAUPE  " value="TAUPE" />
              <Picker.Item label="TEAL  " value="TEAL" />
              <Picker.Item label="TURQUOISE  " value="TURQUOISE" />
              <Picker.Item label="WHITE  " value="WHITE" />
              <Picker.Item label="YELLOW  " value="YELLOW" />
             </Picker>
             <Picker

              selectedValue={this.state.COLOR2}
              onValueChange={(itemValue, itemIndex) => this.setState({ COLOR2: itemValue })}>
              <Picker.Item label=" COLOR2" value="COLOR" />
              <Picker.Item label="ALUMINIUM" value="ALUMINIUM" />
              <Picker.Item label="AMETHYST" value="AMETHYST" />
              <Picker.Item label="BEIGE" value="BEIGE" />
              <Picker.Item label="BLACK" value="BLACK" />
              <Picker.Item label="BLUE" value="BLUE" />
              <Picker.Item label="BRONZE" value="BRONZE" />
              <Picker.Item label="BROWN" value="BROWN" />
              <Picker.Item label="BURGUNDY" value="BURGUNDY" />
              <Picker.Item label="CAMOUFLAGE" value="CAMOUFLAGE" />
              <Picker.Item label="CHROME  " value="CHROME" />
              <Picker.Item label="COPPER  " value="COPPER" />
              <Picker.Item label="CREAM  " value="CREAM" />
              <Picker.Item label="DARK BLUE" value="DARK BLUE" />
              <Picker.Item label="DARK GREEN" value="DARK GREEN" />
              <Picker.Item label="GOLD  " value="GOLD" />
              <Picker.Item label="GREEN  " value="GREEN" />
              <Picker.Item label="GREY  " value="GREY" />
              <Picker.Item label="IVORY  " value="IVORY" />
              <Picker.Item label="LAVENDER   " value="LAVENDER" />
              <Picker.Item label="LIGHT BLUE   " value="LIGHT BLUE" />
              <Picker.Item label="LIGHT GREEN   " value="LIGHT GREEN   " />
              <Picker.Item label="MAROON  " value="MAROON" />
              <Picker.Item label="MAUVE   " value="MAUVE" />
              <Picker.Item label="MULTI-COLORED   " value="MULTI-COLORED" />
              <Picker.Item label="ORANGE" value="ORANGE" />
              <Picker.Item label="PINK  " value="PINK" />
              <Picker.Item label="PURPLE  " value="PURPLE" />
              <Picker.Item label="RED  " value="RED" />
              <Picker.Item label="SILVER  " value="SILVER" />
              <Picker.Item label="STAINLESS STEEL   " value="STAINLESS STEEL" />
              <Picker.Item label="TAN" value="TAN" />
              <Picker.Item label="TAUPE  " value="TAUPE" />
              <Picker.Item label="TEAL  " value="TEAL" />
              <Picker.Item label="TURQUOISE  " value="TURQUOISE" />
              <Picker.Item label="WHITE  " value="WHITE" />
              <Picker.Item label="YELLOW  " value="YELLOW" />
             </Picker>
            <View style={{ backgroundColor: '#D3D3D3', height: 35 }}><Text style={{ paddingHorizontal: 30, fontSize: 20 }}>Vehicle Description</Text></View>

          <TextField

            label="  VIN#:"
            textColor="#000007"
            baseColor="#000007"
            underlineColorAndroid="transparent"
            keyboardType={'default'}
            value={this.state.VIN}
            onChangeText={(text) =>{ this.setState({ VIN: text }) }}
          />
          <TextField

            label="  Body Style"
            textColor="#000007"
            baseColor="#000007"
            underlineColorAndroid="transparent"
            keyboardType={'default'}
            value={this.state.BODYSTYLE}
            onChangeText={(text) =>{ this.setState({ BODYSTYLE: text }) }}
          />

          <Picker

              selectedValue={this.state.BODYTYPE}
              onValueChange={(itemValue, itemIndex) => this.setState({ BODYTYPE: itemValue })}>
              <Picker.Item label=" Body Type:" value="Body Type:" />
              <Picker.Item label="AIRCRAFT" value="AIRCRAFT" />
              <Picker.Item label="BICYCLE" value="BICYCLE" />
              <Picker.Item label="BOATS" value="BOATS" />
              <Picker.Item label="CARGO TRUCK" value="CARGO TRUCK" />
              <Picker.Item label="COMMERCIAL TRANSPORT (BUSES)" value="COMMERCIAL TRANSPORT (BUSES)" />
              <Picker.Item label="EMERGENCY VEHICLE" value="EMERGENCY VEHICLE" />
              <Picker.Item label="FARM EQUIPMENT" value="FARM EQUIPMENT" />
              <Picker.Item label="GOVERNMENT/PUBLIC VEHICLE" value="GOVERNMENT/PUBLIC VEHICLE" />
              <Picker.Item label="HEAVY CONSTRUCTION,INDUSTRIAL" value="HEAVY CONSTRUCTION,INDUSTRIAL" />
              <Picker.Item label="MOPED/SCOOTER/GO CART/AT  " value="MOPED/SCOOTER/GO CART/AT" />
              <Picker.Item label="MOTORCYCLE  " value="MOTORCYCLE" />
              <Picker.Item label="OTHER MOTOR VEHICLE  " value="OTHER MOTOR VEHICLE" />
              <Picker.Item label="PASSENGER CAR" value="PASSENGER CAR" />
              <Picker.Item label="PASSENGER TRUCK" value="PASSENGER TRUCK" />
              <Picker.Item label="RECREATIONAL VEHICLES  " value="RECREATIONAL VEHICLES" />
              <Picker.Item label="TRAILER  " value="TRAILER" />
              </Picker>
         
          <Text style={{marginLeft:15,fontSize:20}}>Notes:</Text>
          
          <TextInput
          style={{height:200,borderWidth: 2,
            textAlignVertical: "top",
            borderColor: 'black',
            width: '90%',
            borderRadius: 10,
            margin: 20,
            marginRight:10,
            fontSize: 25}}
          underlineColorAndroid="transparent"
          multiline={true} 
          onChangeText={(text) => { this.setState({ NOTES: text }) }}
          value={this.state.NOTES}
        />
        </ScrollView>
      </View>

    );
  }
}
export default addvehicle;