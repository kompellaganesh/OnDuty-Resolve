import styles from '../styles/styles';
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
export class secondscreenbooking extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
   

    this.state = {
      BOOK_ID: '',
      Employee_ADDPERSON: [],
      Employee_ADDCHARGE: [],
      Employee_NARRATIVE: '',
      Image_Source: 'https://lh3.googleusercontent.com/7byfpPoWE_v1Lzm3nTCvlD_hELIOF7b8GJ7wLphbSm98hJtyO6KBpx4lVl9OR8POsc964W2QsVAUayTiwgJckyhWGA=s1024',
      savepress: '',

    }
     var person = realm.objects('Add_Person').filtered('reportids == 2').filtered('fieldids ==  $0',this.props.navigation.state.params.ID).sorted('person_id');
    var charge = realm.objects('Add_Charge').filtered('fieldids ==  $0',this.props.navigation.state.params.ID).sorted('charge_id');

    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      persondatasrc : ds.cloneWithRows(person),
      chargedatasrc : ds.cloneWithRows(charge),
    }

    realm.addListener('change', () => {
      this.setState({
        persondatasrc: this.state.persondatasrc.cloneWithRows(person),
        chargedatasrc : this.state.chargedatasrc.cloneWithRows(charge),
      })
    });
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'
    ]);

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
  Cancel_Employee = () => {
    this.setState({

      BOOK_ID: this.props.navigation.state.params.ID,
      Employee_ADDPERSON: this.props.navigation.state.params.ARRAYPERSON,
      Employee_ADDCHARGE: this.props.navigation.state.params.ARRAYCHARGE,
      Employee_NARRATIVE: this.props.navigation.state.params.NARRATIVE,
      Image_Source: this.props.navigation.state.params.IMAGE
    })


  }
  save_Employee = () => {
    this.setState({ savepress: true });
    Alert.alert(
      'Report Saved',
      'Report is Saved')
  }
  unsave_Employee() {
    this.setState({ savepress: false });
  }
  componentWillMount() {
    this.setState({
      BOOK_ID: this.props.navigation.state.params.ID,
      Employee_ADDPERSON: this.props.navigation.state.params.ARRAYPERSON,
      Employee_ADDCHARGE: this.props.navigation.state.params.ARRAYCHARGE,
      Employee_NARRATIVE: this.props.navigation.state.params.NARRATIVE,
      Image_Source: this.props.navigation.state.params.IMAGE,
      savepress: this.props.navigation.state.params.savename,


    })


  }
  GoToaddpersonActivity(reportid,bookid,personid, firstname, lastname, middlename, country, state, city, postalcode, streetaddress, apartmentnumber, age, license, ssn, gender, eyes, hair, height, weight, race, ethnicity, citizenship, homephone, workphone, cellphone, otherphone, personimage) {

    this.setState({ savepress: false });
    this.props.navigation.navigate('addperson', {
      REPORTID:reportid,
      FIELDID:bookid,
      ID: personid,
      FIRSTNAME: firstname,
      LASTNAME: lastname,
      MIDDLENAME: middlename,
      COUNTRY: country,
      STATE: state,
      CITY: city,
      POSTALCODE: postalcode,
      STREETADDRESS: streetaddress,
      APARTMENTNUMBER: apartmentnumber,
      AGE: age,
      LICENSE: license,
      SSN: ssn,
      GENDER: gender,
      EYES: eyes,
      HAIR: hair,
      HEIGHT: height,
      WEIGHT: weight,
      RACE: race,
      ETHNICITY: ethnicity,
      CITIZENSHIP: citizenship,
      HOMEPHONE: homephone,
      WORKPHONE: workphone,
      CELPHONE: cellphone,
      OTHERPHONE: otherphone,
      IMAGE: personimage

    });
  }
   GoToaddchargeActivity(bookid,chargeid,chargecode,chargemodifier,offensedate,chargetype,chargecounts) {

    this.setState({ savepress: false });
    this.props.navigation.navigate('addcharge', {
      FIELDID:bookid,
      ID: chargeid,
      CHARGECODE:chargecode,
      CHARGEMODIFIER:chargemodifier,
      OFFENSEDATE:offensedate,
      CHARGETYPE:chargetype,
      CHARGECOUNTS:chargecounts
    });
  }

  
  GoToNarrationActivity(reportid,bookid,narrationtext){
        this.setState({ savepress: false });

    this.props.navigation.navigate('Narrative',{
      REPORTID:reportid,
      ID:bookid,
      NARRATION:narrationtext
    })
  }
  GoToAttachmentActivity(reportid,bookid,attachment){
        this.setState({ savepress: false });

    this.props.navigation.navigate('Attachment',{
      REPORTID:reportid,
      ID:bookid,
      ATTACHMENT:attachment
    })
  }

  Delete_alert = () => {
    Alert.alert(
      'Confirm',
      'This action will delete the Report. Do you want to continue?',
      [
        { text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {

          text: 'YES', onPress: () => {
             realm.write(() => {

              var ID = this.state.BOOK_ID - 1;
              this.setState({ BOOK_ID: this.state.BOOK_ID - 1 })
              realm.delete(realm.objects('Booking_Info')[ID]);
              realm.delete(realm.objects('Add_Person').filtered('reportids == 2').filtered('fieldids ==  $0',ID + 1));
              realm.delete(realm.objects('Add_Charge').filtered('fieldids ==  $0',ID + 1));

               if(realm.objects('Booking_Info').length != 0)
                {
                for (i = 1; i <= realm.objects('Booking_Info').length; i++) {
                realm.objects('Booking_Info')[i - 1].BookingID = i;
                }}
             if(realm.objects('Add_Person').length != 0)
                {
                for (i = ID+2; i <= realm.objects('Booking_Info').length+1; i++) {
                realm.objects('Add_Person').filtered('reportids == 2').filtered('fieldids == $0',i)[0].fieldids = i-1;}
                for(i=1;i<=realm.objects('Add_Person').length;i++){
               realm.objects('Add_Person')[i-1].person_id = i
               }}
               if(realm.objects('Add_Charge').length != 0)
                {
                   for (i = ID+2; i <= realm.objects('Booking_Info').length+1; i++) {              
              for(j=0;j<=realm.objects('Add_Charge').filtered('fieldids == $0',i).length-1;j++){
                realm.objects('Add_Charge').filtered('fieldids == $0',i)[j].fieldids = i-1;
              }
            }
              for(i=1;i<=realm.objects('Add_Charge').length;i++){
               realm.objects('Add_Charge')[i-1].charge_id = i
               }}}
            );
             this.props.navigation.goBack();
          }
        },
      ],
      { cancelable: false }
    )

  }
   remind_alert = () => {
  this.props.navigation.goBack();
  }

  namelistview = () => {

    var ID = this.state.BOOK_ID ;
    var obj = realm.objects('Booking_Info');
    if (realm.objects('Add_Person').filtered('reportids == 2').filtered('fieldids ==  $0',this.props.navigation.state.params.ID).length == 0) {
      return (
        <View><View style={{ backgroundColor: '#D3D3D3', height: 35 }}><Text style={{ paddingHorizontal: 30, fontSize: 20 }}>PERSON</Text></View>
          <View style={{ flex: 1, }} >
            <TouchableOpacity onPress={this.GoToaddpersonActivity.bind(this,2, ID,realm.objects('Add_Person').length, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'https://lh3.googleusercontent.com/0Kgou0TtfKxvX2wPezXfbZwxmR6qAWEdemPNB57dQrjyRHC42cIPzEbESf2PDcJCc7WGO79dwsnCq-_6XaHnhmKyZJ8=s1024')} >
              <Text style={{ color: 'blue', textAlign: 'center', fontSize: 20 }}>+Person</Text>

            </TouchableOpacity>

          </View></View>



      );
    }
    else if (realm.objects('Add_Person').filtered('reportids == 2').filtered('fieldids ==  $0',this.props.navigation.state.params.ID).length == 1){
      return (

        <View><View style={{ backgroundColor: '#D3D3D3', height: 50 }}><Text style={{ paddingHorizontal: 30, fontSize: 20 }}>PERSON</Text></View>
          <View style={{ flex: 1 }} >
            <ListView

              dataSource={this.state.persondatasrc}
              enableEmptySections={true}
              RefreshList={this.onRefreshList}
              renderSeparator={this.ListViewItemSeparator}


              renderRow={(rowData) => <View style={{ flex: 1 }} >

                <TouchableOpacity onPress={this.GoToaddpersonActivity.bind(this,2, ID,rowData.person_id, rowData.person_firstname, rowData.person_lastname, rowData.person_middlename, rowData.person_address_country, rowData.person_address_state, rowData.person_address_city, rowData.person_address_postalcode, rowData.person_address_streetaddress, rowData.person_address_apartmentnumber, rowData.person_age, rowData.person_licensenumber, rowData.person_SSN, rowData.person_Gender, rowData.person_Eyes, rowData.person_hair, rowData.person_height, rowData.person_weight, rowData.person_Race, rowData.person_ethnicity, rowData.person_citizenship, rowData.person_HomePhone, rowData.person_workphone, rowData.person_cellphone, rowData.person_otherphone, rowData.person_image)} >
                  <View style={styles.ganesh}>

                    <Image style={{ width: 60, height: 60, borderRadius: 30, marginRight: 2 }} source={{ uri: rowData.person_image }} />


                    <View>



                      <Text style={styles.textViewContainer} >{rowData.person_firstname + ' ' + rowData.person_lastname}</Text>

                      <Text style={styles.textViewContainer} >{rowData.person_cellphone}</Text>
                    </View>


                  </View>

                </TouchableOpacity>

              </View>} />



          </View></View>



      );
    }
  }
   chargelistview = () => {

    var ID = this.state.BOOK_ID ;
    var obj = realm.objects('Booking_Info');
    if (realm.objects('Add_Charge').filtered('fieldids ==  $0',this.props.navigation.state.params.ID).length == 0) {
      return (
        <View><View style={{ backgroundColor: '#D3D3D3', height: 35 }}><Text style={{ paddingHorizontal: 30, fontSize: 20 }}>CHARGE</Text></View>
          <View style={{ flex: 1, }} >
            <TouchableOpacity onPress={this.GoToaddchargeActivity.bind(this, ID,realm.objects('Add_Charge').length, '', '', '', '', '')} >
              <Text style={{ color: 'blue', textAlign: 'center', fontSize: 20 }}>+Charge</Text>

            </TouchableOpacity>

          </View></View>



      );
    }
    else {
      return (

        <View><View style={{ backgroundColor: '#D3D3D3', height: 50 }}><Text style={{ paddingHorizontal: 30, fontSize: 20 }}>CHARGE</Text></View>
          <View style={{ flex: 1 }} >
            <ListView

              dataSource={this.state.chargedatasrc}
              enableEmptySections={true}
              RefreshList={this.onRefreshList}
              renderSeparator={this.ListViewItemSeparator}


              renderRow={(rowData) => <View style={{ flex: 1 }} >

                <TouchableOpacity onPress={this.GoToaddchargeActivity.bind(this, ID,rowData.charge_id, rowData.charge_code, rowData.charge_modifier, rowData.charge_offense_date, rowData.charge_type, rowData.charge_counts)} >
                  <View style={styles.ganesh}>

                    <Image style={{ width: 60, height: 60, borderRadius: 30, marginRight: 2 }} source={{ uri: 'https://lh3.googleusercontent.com/GHqycYSrCwbwUVVJwUoTjeRY3ngN6-auFlNLgpRhmZwaYE9ZYR_50J4RyaOW90dGoJKkS1cth2TeobUNw9-Hfc3JzA=s1024' }} />


                    <View>



                      <Text style={styles.textViewContainer} >{rowData.charge_code}</Text>

                    </View>


                  </View>

                </TouchableOpacity>

              </View>} />

            <TouchableOpacity onPress={this.GoToaddchargeActivity.bind(this, ID,realm.objects('Add_Charge').length, '', '', '', '', '')} >
              <Text style={{ color: 'blue', textAlign: 'center', fontSize: 20 }}>+Additional Charge</Text>

            </TouchableOpacity>


          </View></View>



      );
    }
  }
  
  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 1.5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }
  
  Narrativelistview = () => {
    var ID = this.state.BOOK_ID - 1;
    var obj = realm.objects('Booking_Info');
    if(ID >= 0){
    if (obj[ID].location_narrative == '') {
      return (
        <View><View style={{ backgroundColor: '#D3D3D3', height: 35 }}><Text style={{ paddingHorizontal: 30, fontSize: 20 }}>NARRATIVE</Text></View>
          <View style={{ flex: 1, }} >
            <TouchableOpacity onPress={this.GoToNarrationActivity.bind(this,2, obj[ID].BookingID, obj[ID].location_narrative)} >
              <Text style={{ color: 'blue', textAlign: 'center', fontSize: 20 }}>+NARRATIVE</Text>

            </TouchableOpacity>

          </View></View>



      );
    }
    else {
      return (

        <View><View style={{ backgroundColor: '#D3D3D3', height: 35 }}><Text style={{ paddingHorizontal: 30, fontSize: 20 }}>NARRATIVE</Text></View>
          <View style={{ flex: 1, }} >
            <TouchableOpacity onPress={this.GoToNarrationActivity.bind(this, 2,obj[ID].BookingID, obj[ID].location_narrative)} >
              <View style={{ flex: 1, flexDirection: 'row', width: "100%", padding: 10, }}>

                <View>
                  <Text style={{ textAlignVertical: 'center', padding: 5, fontSize: 15, color: '#000', marginRight: 5, }} >{obj[ID].location_narrative}</Text>


                </View>
              </View>

            </TouchableOpacity>

          </View></View>



      );
    }}
    else{
      console.log('yfv');
    }
  }
  attachmentlistview = () => {
    var ID = this.state.BOOK_ID - 1;
    var obj = realm.objects('Booking_Info');
    if(ID >= 0){
    if (obj[ID].location_image == 'https://lh3.googleusercontent.com/7byfpPoWE_v1Lzm3nTCvlD_hELIOF7b8GJ7wLphbSm98hJtyO6KBpx4lVl9OR8POsc964W2QsVAUayTiwgJckyhWGA=s1024') {
      return (
        <View><View style={{ backgroundColor: '#D3D3D3', height: 35 }}><Text style={{ paddingHorizontal: 30, fontSize: 20 }}>ATTACHMENT</Text></View>
          <View style={{ flex: 1, }} >
            <TouchableOpacity onPress={this.GoToAttachmentActivity.bind(this,2, obj[ID].BookingID, obj[ID].location_image)} >
              <Text style={{ color: 'blue', textAlign: 'center', fontSize: 20 }}>+ATTACHMENT</Text>

            </TouchableOpacity>

          </View></View>



      );
    }
    else {
      return (

        <View><View style={{ backgroundColor: '#D3D3D3', height: 35 }}><Text style={{ paddingHorizontal: 30, fontSize: 20 }}>ATTACHMENT</Text></View>
          <View style={{ flex: 1, }} >
            <TouchableOpacity onPress={this.GoToAttachmentActivity.bind(this, 2,obj[ID].BookingID, obj[ID].location_image)} >
              <View style={{ flex: 1, flexDirection: 'row', width: "100%", padding: 10, }}>

             <Image style={{ width: 60, height: 60, borderRadius: 30, marginRight: 2 }} source={{ uri: obj[ID].location_image }} />

              </View>

            </TouchableOpacity>

          </View></View>



      );
    }}
    else{
      console.log('jkdv');
    }
  }


  render() {
    return (
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.remind_alert}>
            <View style={{ paddingHorizontal: 15 }}>

              <Image style={{

                width: 30,
                height: 30

              }} source={{ uri: 'https://lh3.googleusercontent.com/cf4onbPhuhLqLIKxgzqdSGaYOXpi9757g6I8_fcDW5Gt8uGuHorXEe1ALlP5Mzn_nymYDQIKhap1NMmNpaiuU1bMLA=s1024' }} />
            </View>
          </TouchableOpacity>


          <View style={styles.whitespace}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Booking</Text></View>
          <TouchableOpacity onPress={this.Delete_alert}



          >
            <View style={{ paddingHorizontal: 15 }}>

              <Image style={{
                width: 30,
                height: 30

              }} source={{ uri: 'https://lh3.googleusercontent.com/Hyqd6on3-bOQjI9kqfXreq4FM7yqPl4NZJjhixamVjzed6JTEdRTc6mhY-syc65R5XkokbJwT39ktlUWCKYDsHJa=s1024' }} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.save_Employee}



          >
            <View style={{ paddingHorizontal: 15 }}>

              <Image style={{
                width: 30,
                height: 30

              }} source={{ uri: 'https://lh3.googleusercontent.com/rNJqTi0dnvzXmsoHl1LAiLJYE09kV381OZnruvWjKMAJ8f0yRvsQrFXWR-CCGYKFGUhnWz1TqSJ8beHXyOZabCXPDVM=s1024' }} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity



          >
            <View style={{ paddingHorizontal: 15 }}>

              <Image style={{
                width: 40,
                height: 40

              }} source={{ uri: 'https://lh3.googleusercontent.com/cnDwhjCUuMXbzgtrv0pRydXQn__Bf_wkS3OC0rOuMzecO3cXPaSv_NjxdaN3E4uEts_fobn5uiGtivcruD5SYbyRlQ=s1024' }} />
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={{ height: 50 }}>
          </View>
          {this.namelistview()}
          {this.chargelistview()}
          {this.Narrativelistview()}
          {this.attachmentlistview()}
         <View style={{ height: 50 }}>
          </View><View style={{ height: 50 }}>
          </View>
        </ScrollView></View>
    )
  }
}
export default secondscreenbooking;