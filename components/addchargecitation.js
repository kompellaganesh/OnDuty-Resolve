import realm from '../realm/realm';
import styles from '../styles/styles';
import { StackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { TextField } from 'react-native-material-textfield';

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
  Text,
  TextInput,
  BackHandler,
  Alert,
  View
} from 'react-native';
export class addchargecitation extends Component {
  static navigationOptions = {
    header: null,
  };
  GoToSecondActivity = () => {
    this.props.navigation.navigate('secondscreenbooking');
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
      FIELDID:'',
      ID: '',
      CHARGEVIOLATION:'',
      CHARGEORDINANCE:'',
      COURTDATE:'',
      COMPLIANCEDATE:'',
      FEEAMOUNT:'',
      COMMENTS:''
     }
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'
    ]);
  }


  Cancel_Employee = () => {
    this.setState({
      FIELDID:this.props.navigation.state.params.FIELDID,
      ID: this.props.navigation.state.params.ID,
      CHARGEVIOLATION:this.props.navigation.state.params.CHARGEVIOLATION,
      CHARGEORDINANCE:this.props.navigation.state.params.CHARGEORDINANCE,
      COURTDATE:this.props.navigation.state.params.COURTDATE,
      COMPLIANCEDATE:this.props.navigation.state.params.COMPLIANCEDATE,
      FEEAMOUNT:this.props.navigation.state.params.FEE,
      COMMENTS:this.props.navigation.state.params.COMMENTS
      
    })


  }
  componentWillMount() {
    { this.Cancel_Employee() }

  }
  Update_Employee = () => {
    if((this.props.navigation.state.params.CHARGEVIOLATION == ''||this.props.navigation.state.params.CHARGEVIOLATION == ' * Violation') && this.props.navigation.state.params.CHARGEORDINANCE == ''){
      if (this.state.CHARGEVIOLATION == ''||this.state.CHARGEVIOLATION == ' * Violation') {
      Alert.alert(
        'Cannot Save',
        'Charge Violation cannot be empty')
    }
    else if (this.state.CHARGEORDINANCE == '') {
      Alert.alert(
        'Cannot Save',
        'Charge Ordinance cannot be empty')
    }
    else {
      realm.write(() => {
      realm.create('Add_Charge_Citation', {
        fieldids:this.state.FIELDID,
        charge_id: this.state.ID + 1,
        charge_violation: this.state.CHARGEVIOLATION, 
        charge_ordinance: this.state.CHARGEORDINANCE,
        charge_Court_Date: this.state.COURTDATE,
        charge_Compliance_Date: this.state.COMPLIANCEDATE,
        charge_Fee_Amount: this.state.FEEAMOUNT,
        charge_Comments:this.state.COMMENTS,
      
    })})
    this.props.navigation.navigate('secondscreencitation');

    
    }}
    else{

      if (this.state.CHARGEVIOLATION == ''||this.state.CHARGEVIOLATION == ' * Violation') {
      Alert.alert(
        'Cannot Save',
        'Charge Violation cannot be empty')
    }
    else if (this.state.CHARGEORDINANCE == '') {
      Alert.alert(
        'Cannot Save',
        'Charge Ordinance cannot be empty')
    }
    else {
      realm.write(() => {

        var Id = this.props.navigation.state.params.ID - 1;
        var obj = realm.objects('Add_Charge_Citation');
        obj[Id].charge_violation= this.state.CHARGEVIOLATION; 
        obj[Id].charge_ordinance= this.state.CHARGEORDINANCE;
        obj[Id].charge_Court_Date= this.state.COURTDATE;
        obj[Id].charge_Compliance_Date= this.state.COMPLIANCEDATE;
        obj[Id].charge_Fee_Amount= this.state.FEEAMOUNT;
        obj[Id].charge_Comments=this.state.COMMENTS;

       });
      this.props.navigation.navigate('secondscreencitation');
    }

    }
    
  }

  Delete_Name = () => {
    if (this.props.navigation.state.params.CHARGEVIOLATION == '' && this.state.CHARGEVIOLATION == '' && this.props.navigation.state.params.CHARGEORDINANCE == '' && this.state.CHARGEORDINANCE == '') {
      this.props.navigation.navigate('secondscreencitation');

    }
    else if (this.props.navigation.state.params.CHARGEVIOLATION == '' && this.state.CHARGEVIOLATION != ''&& this.props.navigation.state.params.CHARGEORDINANCE == '' && this.state.CHARGEORDINANCE != '') {
      Alert.alert(
        'Confirm',
        'This action will remove unsaved Charge data. Do you want to continue?',
        [
          { text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          {
            text: 'YES', onPress: () => {
              this.props.navigation.navigate('secondscreencitation');
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
                realm.delete(realm.objects('Add_Charge_Citation')[id]);
               for(i=1;i<=realm.objects('Add_Charge_Citation').length;i++){
               realm.objects('Add_Charge_Citation')[i-1].charge_id = i
               }
              });
                this.props.navigation.navigate('secondscreencitation');
            }
          },

        ],
        { cancelable: false }
      )


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
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Charge</Text></View>

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
  render() {

    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
      }}>
        {this.showheader_header()}
        

        <ScrollView>

          <View style={{ backgroundColor: '#D3D3D3', height: 35 }}><Text style={{ paddingHorizontal: 30, fontSize: 20 }}>Charge Details</Text></View>
         <Picker
              selectedValue={this.state.CHARGEVIOLATION}
              onValueChange={(itemValue, itemIndex) => this.setState({ CHARGEVIOLATION: itemValue })}>
              <Picker.Item label=" * Violation" value=" * Violation" />
              <Picker.Item label="ACCELERATE RAPIDLY" value="ACCELERATE RAPIDLY" />
              <Picker.Item label="ACCIDENT(ANY TYPE)" value="ACCIDENT(ANY TYPE)" />
              <Picker.Item label="BRAKING RAPIDLY" value="BRAKING RAPIDLY" />
              <Picker.Item label="DRIVING INTO OPPOSITE TRAF" value="DRIVING INTO OPPOSITE TRAF" />
              <Picker.Item label="DRIVING OFF ROADWAY" value="DRIVING OFF ROADWAY" />
              <Picker.Item label="ERRATIC BRAKING" value="ERRATIC BRAKING" />
              <Picker.Item label="FOLLOWING TOO CLOSELY" value="FOLLOWING TOO CLOSELY" />
              <Picker.Item label="INAPPROPRIATE STOPPING" value="INAPPROPRIATE STOPPING" />
              <Picker.Item label="INCONSISTENT SIGNALING" value="INCONSISTENT SIGNALING" />
              <Picker.Item label="NO HEADLIGHTS" value="NO HEADLIGHTS" />
              <Picker.Item label="OTHER-NOT LISTED" value="OTHER-NOT LISTED" />
              <Picker.Item label="REDDI RPORT (DUI BOLO)" value="REDDI RPORT (DUI BOLO)" />
              <Picker.Item label="SPEEDING" value="SPEEDING" />
              <Picker.Item label="STOPPED IN ROADWAY" value="STOPPED IN ROADWAY" />
              <Picker.Item label="STRADDLE LANE MARKER" value="STRADDLE LANE MARKER" />
              <Picker.Item label="SWERVING" value="SWERVING" />
              <Picker.Item label="TURN VIOLATION" value="TURN VIOLATION" />
              <Picker.Item label="VERY SLOW SPEED" value="VERY SLOW SPEED" />
              <Picker.Item label="WAEVING" value="WAEVING" />
            </Picker>
          <TextField
            
            label=" * Ordinance:"
            tintColor='red'
            keyboardType={'default'}
            textColor="#000007"
            underlineColorAndroid="transparent"
            value={this.state.CHARGEORDINANCE}
            baseColor="#000007"
            onChangeText={(text) => { this.setState({ CHARGEORDINANCE: text }) }}
          />
          
         
          <TextField
            label=" Court Date/Time:"
            keyboardType={'default'}
            textColor="#000007"
            baseColor="#000007"
            underlineColorAndroid="transparent"
            value={this.state.COURTDATE}
            onChangeText={(text) => { this.setState({ COURTDATE: text }) }}
          />
          <TextField
            label=" Compliance Date/Time:"
            keyboardType={'default'}
            textColor="#000007"
            baseColor="#000007"
            underlineColorAndroid="transparent"
            value={this.state.COMPLIANCEDATEM}
            onChangeText={(text) => { this.setState({ COMPLIANCEDATEM: text }) }}
          />
          <TextField
            label=" Fee Amount:"
            keyboardType={'numeric'}
            textColor="#000007"
            baseColor="#000007"
            underlineColorAndroid="transparent"
            value={this.state.FEEAMOUNT}
            onChangeText={(text) => { this.setState({ FEEAMOUNT: text }) }}
          />
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
          onChangeText={(text) => { this.setState({ COMMENTS: text }) }}
          value={this.state.COMMENTS}
        />
        </ScrollView>
      </View>

    );
  }
}
export default addchargecitation;