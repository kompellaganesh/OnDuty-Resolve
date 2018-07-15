import realm from '../realm/realm';
import styles from '../styles/styles';
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
  BackHandler,
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
export class addperson extends Component {
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
    this.props.navigation.navigate('secondscreen');
  }
  constructor() {
    super();
    this.state = {
      FIELDID:'',
      ID: '',
      FIRSTNAME: '',
      LASTNAME: '',
      MIDDLENAME: '',
      COUNTRY: '',
      STATE: '',
      CITY: '',
      POSTALCODE: '',
      STREETADDRESS: '',
      APARTMENTNUMBER: '',
      AGE: '',
      LICENSE: '',
      SSN: '',
      GENDER: '',
      EYES: '',
      HAIR: '',
      HEIGHT: '',
      WEIGHT: '',
      RACE: '',
      ETHNICITY: '',
      CITIZENSHIP: '',
      HOMEPHONE: '',
      WORKPHONE: '',
      CELPHONE: '',
      OTHERPHONE: '',
      IMAGE: 'https://lh3.googleusercontent.com/0Kgou0TtfKxvX2wPezXfbZwxmR6qAWEdemPNB57dQrjyRHC42cIPzEbESf2PDcJCc7WGO79dwsnCq-_6XaHnhmKyZJ8=s1024'
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
      FIRSTNAME: this.props.navigation.state.params.FIRSTNAME,
      LASTNAME: this.props.navigation.state.params.LASTNAME,
      MIDDLENAME: this.props.navigation.state.params.MIDDLENAME,
      COUNTRY: this.props.navigation.state.params.COUNTRY,
      STATE: this.props.navigation.state.params.STATE,
      CITY: this.props.navigation.state.params.CITY,
      POSTALCODE: this.props.navigation.state.params.POSTALCODE,
      STREETADDRESS: this.props.navigation.state.params.STREETADDRESS,
      APARTMENTNUMBER: this.props.navigation.state.params.APARTMENTNUMBER,
      AGE: this.props.navigation.state.params.AGE,
      LICENSE: this.props.navigation.state.params.LICENSE,
      SSN: this.props.navigation.state.params.SSN,
      GENDER: this.props.navigation.state.params.GENDER,
      EYES: this.props.navigation.state.params.EYES,
      HAIR: this.props.navigation.state.params.HAIR,
      HEIGHT: this.props.navigation.state.params.HEIGHT,
      WEIGHT: this.props.navigation.state.params.WEIGHT,
      RACE: this.props.navigation.state.params.RACE,
      ETHNICITY: this.props.navigation.state.params.ETHNICITY,
      CITIZENSHIP: this.props.navigation.state.params.CITIZENSHIP,
      HOMEPHONE: this.props.navigation.state.params.HOMEPHONE,
      WORKPHONE: this.props.navigation.state.params.WORKPHONE,
      CELPHONE: this.props.navigation.state.params.CELPHONE,
      OTHERPHONE: this.props.navigation.state.params.OTHERPHONE,
      IMAGE: this.props.navigation.state.params.IMAGE,

    })


  }
  componentWillMount() {
    { this.Cancel_Employee() }

  }
  Update_Employee = () => {
    if(this.props.navigation.state.params.FIRSTNAME == ''&& this.props.navigation.state.params.LASTNAME==''){
      if (this.state.FIRSTNAME == '') {
      Alert.alert(
        'Cannot Save',
        'First Name cannot be empty')
    }
    else if (this.state.LASTNAME == '') {
      Alert.alert(
        'Cannot Save',
        'Last Name cannot be empty')
    }
    else {
      realm.write(() => {
      realm.create('Add_Person', {
        reportids:this.props.navigation.state.params.REPORTID,
        fieldids:this.state.FIELDID,
        person_id: this.state.ID + 1,
        person_firstname: this.state.FIRSTNAME, 
        person_lastname: this.state.LASTNAME,
        person_middlename: this.state.MIDDLENAME,
        person_address_country: this.state.COUNTRY,
        person_address_state: this.state.STATE,
        person_address_city: this.state.CITY,
        person_address_postalcode: this.state.POSTALCODE,
        person_address_streetaddress: this.state.STREETADDRESS,
        person_address_apartmentnumber: this.state.APARTMENTNUMBER,
        person_age:this.state.AGE,
        person_licensenumber : this.state.LICENSE,
        person_SSN : this.state.SSN,
        person_Gender : this.state.GENDER,
        person_Eyes : this.state.EYES,
        person_hair : this.state.HAIR,
        person_height : this.state.HEIGHT,
        person_weight : this.state.WEIGHT,
        person_Race : this.state.RACE,
        person_ethnicity:this.state.ETHNICITY,
        person_citizenship:this.state.CITIZENSHIP,
        person_HomePhone:this.state.HOMEPHONE,
        person_workphone:this.state.WORKPHONE,
        person_cellphone:this.state.CELPHONE,
        person_otherphone:this.state.OTHERPHONE,
        person_image: this.state.IMAGE,
        });
       });
      this.props.navigation.goBack();
    }

    
    }
    else{

      if (this.state.FIRSTNAME == '') {
      Alert.alert(
        'Cannot Save',
        'First Name cannot be empty')
    }
    else if (this.state.LASTNAME == '') {
      Alert.alert(
        'Cannot Save',
        'Last Name cannot be empty')
    }
    else {
      realm.write(() => {

        var Id = this.props.navigation.state.params.ID - 1;
        var obj = realm.objects('Add_Person');
        obj[Id].person_firstname= this.state.FIRSTNAME; 
        obj[Id].person_lastname= this.state.LASTNAME;
        obj[Id].person_middlename= this.state.MIDDLENAME;
        obj[Id].person_address_country= this.state.COUNTRY;
        obj[Id].person_address_state= this.state.STATE;
        obj[Id].person_address_city= this.state.CITY;
        obj[Id].person_address_postalcode= this.state.POSTALCODE;
        obj[Id].person_address_streetaddress= this.state.STREETADDRESS;
        obj[Id].person_address_apartmentnumber= this.state.APARTMENTNUMBER;
        obj[Id].person_age=this.state.AGE;
        obj[Id].person_licensenumber = this.state.LICENSE;
        obj[Id].person_SSN = this.state.SSN;
        obj[Id].person_Gender = this.state.GENDER;
        obj[Id].person_Eyes = this.state.EYES;
        obj[Id].person_hair = this.state.HAIR;
        obj[Id].person_height = this.state.HEIGHT;
        obj[Id].person_weight = this.state.WEIGHT;
        obj[Id].person_Race = this.state.RACE;
        obj[Id].person_ethnicity=this.state.ETHNICITY;
        obj[Id].person_citizenship=this.state.CITIZENSHIP;
        obj[Id].person_HomePhone=this.state.HOMEPHONE;
        obj[Id].person_workphone=this.state.WORKPHONE;
        obj[Id].person_cellphone=this.state.CELPHONE;
        obj[Id].person_otherphone=this.state.OTHERPHONE;
        obj[Id].person_image= this.state.IMAGE;

       });
      this.props.navigation.goBack();
    }

    }
    
  }

  Delete_Name = () => {
    if (this.props.navigation.state.params.FIRSTNAME == '' && this.props.navigation.state.params.LASTNAME == '' && this.state.FIRSTNAME == '' && this.state.LASTNAME == '') {
      this.props.navigation.goBack();

    }
    else if (this.props.navigation.state.params.FIRSTNAME == '' && this.props.navigation.state.params.LASTNAME == '' && this.state.FIRSTNAME != '' && this.state.LASTNAME != '') {
      Alert.alert(
        'Confirm',
        'This action will remove unsaved Person data. Do you want to continue?',
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

                var id = this.props.navigation.state.params.ID - 1;
                realm.delete(realm.objects('Add_Person')[id]);
               for(i=1;i<=realm.objects('Add_Person').length;i++){
               realm.objects('Add_Person')[i-1].person_id = i
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
        var obj = realm.objects('Add_Person');
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
            this.props.navigation.goBack();
          }
        },
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      ],
      { cancelable: false }
    )

  }
  GoToImageActivity(employee_image) {
    if (employee_image == 'https://lh3.googleusercontent.com/0Kgou0TtfKxvX2wPezXfbZwxmR6qAWEdemPNB57dQrjyRHC42cIPzEbESf2PDcJCc7WGO79dwsnCq-_6XaHnhmKyZJ8=s1024') {
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
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Person</Text></View>

        <TouchableOpacity


          onPress={this.Update_Employee}
        >
          <View style={{ paddingHorizontal: 10 }}>

            <Image style={{
              width: 40,
              height: 40

            }} source={{ uri: 'https://lh3.googleusercontent.com/9ZHLjA-PkUZLolpB3ubiuQWKNzth8BTeyTKF00ItsWDT79PIhqGRkmSm9iLNnqQyPZPV3UmIs3k51gBuoAmUKfQSrw=s1024' }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity


          onPress={this.Delete_Name}
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
    if (this.state.IMAGE == 'https://lh3.googleusercontent.com/0Kgou0TtfKxvX2wPezXfbZwxmR6qAWEdemPNB57dQrjyRHC42cIPzEbESf2PDcJCc7WGO79dwsnCq-_6XaHnhmKyZJ8=s1024') {
      return (
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


      IMAGE: 'https://lh3.googleusercontent.com/0Kgou0TtfKxvX2wPezXfbZwxmR6qAWEdemPNB57dQrjyRHC42cIPzEbESf2PDcJCc7WGO79dwsnCq-_6XaHnhmKyZJ8=s1024',
    })


  }

  validatephone = (text) => {
    let reg = /^\d{10}$/;
    if (reg.test(text) === true) {
      this.setState({ CELPHONE: text })
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
          <View style={{ backgroundColor: '#D3D3D3', height: 35 }}><Text style={{ paddingHorizontal: 30, fontSize: 20 }}>Name Information</Text></View>
         
          <TextField
            
            label=" * Last Name"
            tintColor='red'
            keyboardType={'default'}
            textColor="#000007"
            underlineColorAndroid="transparent"
            value={this.state.LASTNAME}
            baseColor="#000007"
            onChangeText={(text) => { this.setState({ LASTNAME: text }) }}
          />
         
          <TextField
            label=" * First Name"
            keyboardType={'default'}
            textColor="#000007"
            tintColor='red'
            baseColor="#000007"
            underlineColorAndroid="transparent"
            value={this.state.FIRSTNAME}
            onChangeText={(text) => { this.setState({ FIRSTNAME: text }) }}
          />
          
          <TextField
            label=" Middle Name"
            textColor="#000007"
            baseColor="#000007"
            underlineColorAndroid="transparent"
            keyboardType={'default'}
            value={this.state.MIDDLENAME}
            onChangeText={(text) => { this.setState({ MIDDLENAME: text }) }}
          />
          <View style={{ backgroundColor: '#D3D3D3', height: 35 }}><Text style={{ paddingHorizontal: 30, fontSize: 20 }}>Identifiers</Text></View>
          <TextField

            label=" Age"
            textColor="#000007"
            baseColor="#000007"
            underlineColorAndroid="transparent"
            keyboardType={'numeric'}
            value={this.state.AGE}
            onChangeText={(text) => { this.setState({ AGE: text }) }}
          />
          <TextField

            label=" Driver License Number"
            textColor="#000007"
            baseColor="#000007"
            underlineColorAndroid="transparent"
            keyboardType={'numeric'}
            value={this.state.LICENSE}
            onChangeText={(text) => { this.setState({ LICENSE: text }) }}
          />
           <TextField

            label=" SSN"
            textColor="#000007"
            baseColor="#000007"
            underlineColorAndroid="transparent"
            keyboardType={'numeric'}
            value={this.state.SSN}
            onChangeText={(text) => { this.setState({ SSN: text }) }}
          />
         <View style={{ backgroundColor: '#D3D3D3', height: 35 }}><Text style={{ paddingHorizontal: 30, fontSize: 20 }}>Description</Text></View>
          <Picker

              selectedValue={this.state.GENDER}
              onValueChange={(itemValue, itemIndex) => this.setState({ GENDER: itemValue })}>
              <Picker.Item label="Gender" value="Gender" />
              <Picker.Item label="FEMALE" value="FEMALE" />
              <Picker.Item label="UNKNOWN" value="UNKNOWN" />
              <Picker.Item label="MALE" value="MALE" />
              <Picker.Item label="TEST CODE TEST" value="TEST CODE TEST" />
              <Picker.Item label="TEST GENDER TEST" value="TEST GENDER TEST" />
              <Picker.Item label="TRANSGENDER" value="TRANSGENDER" />
            </Picker>
            <Picker

              selectedValue={this.state.EYES}
              onValueChange={(itemValue, itemIndex) => this.setState({ EYES: itemValue })}>
              <Picker.Item label="Eyes" value="Eyes" />
              <Picker.Item label="BLACK" value="BLACK" />
              <Picker.Item label="BLUE" value="BLUE" />
              <Picker.Item label="BROWN" value="BROWN" />
              <Picker.Item label="GRAY" value="GRAY" />
              <Picker.Item label="GREEN" value="GREEN" />
              <Picker.Item label="HAZEL" value="HAZEL" />
              <Picker.Item label="MAROON" value="MAROON" />
              <Picker.Item label="MULTI-COLOR" value="MULTI-COLOR" />
              <Picker.Item label="PINK" value="PINK" />
              <Picker.Item label="UNKNOWN" value="UNKNOWN" />

            </Picker>
            <Picker

              selectedValue={this.state.HAIR}
              onValueChange={(itemValue, itemIndex) => this.setState({ HAIR: itemValue })}>
              <Picker.Item label="Hair" value="Hair" />
              <Picker.Item label="BALDING" value="BALDING" />
              <Picker.Item label="BLACK" value="BLACK" />
              <Picker.Item label="BLONDE OR STRAWBERRY" value="BLONDE OR STRAWBERRY" />
              <Picker.Item label="BLUE" value="BLUE" />
              <Picker.Item label="BROWN" value="BROWN" />
              <Picker.Item label="GREEN" value="GREEN" />
              <Picker.Item label="GREY OR PARTIALLY GRAY" value="GREY OR PARTIALLY GRAY" />
              <Picker.Item label="MULTI-COLORED" value="MULTI-COLORED" />
              <Picker.Item label="ORANGE" value="ORANGE" />
              <Picker.Item label="PINK" value="PINK" />
              <Picker.Item label="PURPLE" value="PURPLE" />
              <Picker.Item label="RED OR AUBURN" value="RED OR AUBURN" />
              <Picker.Item label="SANDY" value="SANDY" />
              <Picker.Item label="UNKNOWN OR COMPLETELY BALD" value="UNKNOWN OR COMPLETELY BALD" />
              <Picker.Item label="WHITE" value="WHITE" />

            </Picker>
            <TextField

            label=" Height"
            textColor="#000007"
            baseColor="#000007"
            underlineColorAndroid="transparent"
            keyboardType={'default'}
            value={this.state.HEIGHT}
            onChangeText={(text) => { this.setState({ HEIGHT: text }) }}
          />
          <TextField
            label=" Weight"
            textColor="#000007"
            placeholder=" lbs"
            baseColor="#000007"
            underlineColorAndroid="transparent"
            keyboardType={'default'}
            value={this.state.WEIGHT}
            onChangeText={(text) => { this.setState({ WEIGHT: text }) }}
          />
          <Picker
              selectedValue={this.state.RACE}
              onValueChange={(itemValue, itemIndex) => this.setState({ RACE: itemValue })}>
              <Picker.Item label="Race" value="Race" />
              <Picker.Item label="AMERICAN INDIAN/ ALASKAN NATIV" value="AMERICAN INDIAN/ ALASKAN NATIV" />
              <Picker.Item label="ARABIC" value="ARABIC" />
              <Picker.Item label="ASIAN/ PACIFIC ISLANDER" value="ASIAN/ PACIFIC ISLANDER" />
              <Picker.Item label="BLACK" value="GRAY" />
              <Picker.Item label="HISPANIC" value="HISPANIC" />
              <Picker.Item label="UNKNOWN" value="UNKNOWN" />
              <Picker.Item label="WHITE" value="WHITE" />
              <Picker.Item label="TEST RACE" value="TEST RACE" />
            </Picker>
            <Picker
              selectedValue={this.state.ETHNICITY}
              onValueChange={(itemValue, itemIndex) => this.setState({ ETHNICITY: itemValue })}>
              <Picker.Item label="Ethnicity" value="Ethnicity" />
              <Picker.Item label="HISPANIC" value="HISPANIC" />
              <Picker.Item label="NON-HISPANIC" value="NON-HISPANIC" />
              <Picker.Item label="UNKNOWN" value="UNKNOWN" />
            </Picker>
            <TextField
            label=" Citizenship"
            textColor="#000007"
            baseColor="#000007"
            underlineColorAndroid="transparent"
            keyboardType={'numeric'}
            value={this.state.CITIZENSHIP}
            onChangeText={(text) =>{ this.setState({ CITIZENSHIP: text }) }}
          />
          <View style={{ backgroundColor: '#D3D3D3', height: 35 }}><Text style={{ paddingHorizontal: 30, fontSize: 20 }}>Phone</Text></View>

          <TextField

            label=" Home Phone"
            textColor="#000007"
            baseColor="#000007"
            underlineColorAndroid="transparent"
            keyboardType={'numeric'}
            value={this.state.HOMEPHONE}
            onChangeText={(text) =>{ this.setState({ HOMEPHONE: text }) }}
          />
          <TextField

            label=" Work Phone"
            textColor="#000007"
            baseColor="#000007"
            underlineColorAndroid="transparent"
            keyboardType={'numeric'}
            value={this.state.WORKPHONE}
            onChangeText={(text) =>{ this.setState({ WORKPHONE: text }) }}
          />
          <TextField

            label=" Cell Phone"
            textColor="#000007"
            baseColor="#000007"
            underlineColorAndroid="transparent"
            keyboardType={'numeric'}
            value={this.state.CELPHONE}
            onChangeText={(text) =>{ this.setState({ CELPHONE: text }) }}
          />
          <TextField

            label=" Other Phone"
            textColor="#000007"
            baseColor="#000007"
            underlineColorAndroid="transparent"
            keyboardType={'numeric'}
            value={this.state.OTHERPHONE}
            onChangeText={(text) =>{ this.setState({ OTHERPHONE: text }) }}
          />
        </ScrollView>
      </View>

    );
  }
}
export default addperson;