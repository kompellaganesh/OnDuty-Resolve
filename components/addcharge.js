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
  BackHandler,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  Alert,
  View
} from 'react-native';
export class addcharge extends Component {
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
      CHARGECODE:'',
      CHARGEMODIFIER:'',
      OFFENSEDATE:'',
      CHARGETYPE:'',
      CHARGECOUNTS:''
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
      CHARGECODE:this.props.navigation.state.params.CHARGECODE,
      CHARGEMODIFIER:this.props.navigation.state.params.CHARGEMODIFIER,
      OFFENSEDATE:this.props.navigation.state.params.OFFENSEDATE,
      CHARGETYPE:this.props.navigation.state.params.CHARGETYPE,
      CHARGECOUNTS:this.props.navigation.state.params.CHARGECOUNTS
      
    })


  }
  componentWillMount() {
    { this.Cancel_Employee() }

  }
  Update_Employee = () => {
    if(this.props.navigation.state.params.CHARGECODE == ''){
      if (this.state.CHARGECODE == '') {
      Alert.alert(
        'Cannot Save',
        'Charge Code cannot be empty')
    }
    else {
      realm.write(() => {
      realm.create('Add_Charge', {
        fieldids:this.state.FIELDID,
        charge_id: this.state.ID + 1,
        charge_code: this.state.CHARGECODE, 
        charge_modifier: this.state.CHARGEMODIFIER,
        charge_offense_date: this.state.OFFENSEDATE,
        charge_type: this.state.CHARGETYPE,
        charge_counts: this.state.CHARGECOUNTS,
        
      
    })})
    this.props.navigation.navigate('secondscreenbooking');

    
    }}
    else{

      if (this.state.CHARGECODE == '') {
      Alert.alert(
        'Cannot Save',
        'Charge Code cannot be empty')
    }
    else {
      realm.write(() => {

        var Id = this.props.navigation.state.params.ID - 1;
        var obj = realm.objects('Add_Charge');
        obj[Id].charge_code= this.state.CHARGECODE; 
        obj[Id].charge_modifier= this.state.CHARGEMODIFIER;
        obj[Id].charge_offense_date= this.state.OFFENSEDATE;
        obj[Id].charge_type= this.state.CHARGETYPE;
        obj[Id].charge_counts= this.state.CHARGECOUNTS;
      
       });
      this.props.navigation.navigate('secondscreenbooking');
    }

    }
    
  }

  Delete_Name = () => {
    if (this.props.navigation.state.params.CHARGECODE == '' && this.state.CHARGECODE == '') {
      this.props.navigation.navigate('secondscreenbooking');

    }
    else if (this.props.navigation.state.params.CHARGECODE == '' && this.state.CHARGECODE != '') {
      Alert.alert(
        'Confirm',
        'This action will remove unsaved Person data. Do you want to continue?',
        [
          { text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          {
            text: 'YES', onPress: () => {
              this.props.navigation.navigate('secondscreen');
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
                realm.delete(realm.objects('Add_Charge')[id]);
               for(i=1;i<=realm.objects('Add_Charge').length;i++){
               realm.objects('Add_Charge')[i-1].charge_id = i
               }
              });
                this.props.navigation.navigate('secondscreenbooking');
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
         
          <TextField
            
            label=" * Charge Code:"
            tintColor='red'
            keyboardType={'default'}
            textColor="#000007"
            underlineColorAndroid="transparent"
            value={this.state.CHARGECODE}
            baseColor="#000007"
            onChangeText={(text) => { this.setState({ CHARGECODE: text }) }}
          />
          <Picker
              selectedValue={this.state.CHARGEMODIFIER}
              onValueChange={(itemValue, itemIndex) => this.setState({ CHARGEMODIFIER: itemValue })}>
              <Picker.Item label="MODIFIER" value="MODIFIER" />
              <Picker.Item label="MODIFIER1" value="MODIFIER1" />
              <Picker.Item label="MODIFIER2" value="MODIFIER2" />
              <Picker.Item label="MODIFIER3" value="MODIFIER3" />
            </Picker>
         
          <TextField
            label=" Offense Date/Time:"
            keyboardType={'default'}
            textColor="#000007"
            baseColor="#000007"
            underlineColorAndroid="transparent"
            value={this.state.OFFENSEDATE}
            onChangeText={(text) => { this.setState({ OFFENSEDATE: text }) }}
          />
          <Picker
              selectedValue={this.state.CHARGETYPE}
              onValueChange={(itemValue, itemIndex) => this.setState({ CHARGETYPE: itemValue })}>
              <Picker.Item label="Charge Type:" value="Charge Type:" />
              <Picker.Item label="City" value="City" />
              <Picker.Item label="Federal" value="Federal" />
              <Picker.Item label="Municipal" value="Municipal" />
              <Picker.Item label="State" value="State" />
            </Picker>
            <TextField
            label=" Charge Counts:"
            keyboardType={'default'}
            textColor="#000007"
            baseColor="#000007"
            underlineColorAndroid="transparent"
            value={this.state.CHARGECOUNTS}
            onChangeText={(text) => { this.setState({ CHARGECOUNTS: text }) }}
          />
        </ScrollView>
      </View>

    );
  }
}
export default addcharge;