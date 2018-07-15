import styles from '../styles/styles';
import realm from '../realm/realm';
import React, { Component } from 'react';
import Popover from 'react-native-popover-view';
import { TextField } from 'react-native-material-textfield';
import ExpanableList from 'react-native-expandable-section-flatlist';
import { StackNavigator,DrawerNavigator } from 'react-navigation';

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
import { ListView } from 'realm/react-native';
import ImageZoom from 'react-native-image-pan-zoom';
export class firstscreen extends Component {
  static navigationOptions =
  {
    title: 'OnDutyResolve',
    headerLeft: (
      <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
        <Image style={{marginLeft:30,width:35,height:35}}
          source={{ uri: 'https://lh3.googleusercontent.com/vNLeVt7VE5jgFk9wUrnaqg7Y9TLE-xNs1rSZL1U7DJrqO15JT1j2prRgdaBYlL1pjMO1joVqUbJzOYBdUBgIY6LST9c=s1024' }}
      />
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: 'blue'
    },
    headerTitleStyle: {
      alignSelf: 'center',
      marginLeft: '20%'
    }
  };

  constructor() {
    super();
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'
    ]);

    var booking = realm.objects('Booking_Info').sorted('BookingID');
    var fieldinterview = realm.objects('Field_Interview_Info').sorted('fieldID');
    var citation = realm.objects('Citation_Info').sorted('CitationID');
    var supplement = realm.objects('Accident_Supplement_Info').sorted('accidentsupplementID');
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      time: '',
      name:'',
      isVisible: false,
      dataSourceFI: ds.cloneWithRows(fieldinterview),
      dataSourcebook:ds.cloneWithRows(booking),
      dataSourcecit:ds.cloneWithRows(citation),
      dataSourcesupp:ds.cloneWithRows(supplement)
    };
    realm.addListener('change', () => {
      this.setState({ 
        dataSourceFI: this.state.dataSourceFI.cloneWithRows(fieldinterview),
        dataSourcebook:this.state.dataSourcebook.cloneWithRows(booking),
      dataSourcecit:this.state.dataSourcecit.cloneWithRows(citation),
      dataSourcesupp:this.state.dataSourcesupp.cloneWithRows(supplement)
        })
    });

  }
  GoToThirdActivity(fi_id, personarray, veharray, fi_address_country, fi_address_state, fi_address_city, fi_address_postalcode, fi_address_streetaddress, fi_address_apartmentnumber, fi_narrative, fi_image, fi_save_name) {
    this.props.navigation.navigate('secondscreen', {
      ID: fi_id,
      ARRAYPERSON: personarray,
      ARRAYVEHICLE: veharray,
      COUNTRY: fi_address_country,
      STATE: fi_address_state,
      CITY: fi_address_city,
      POSTALCODE: fi_address_postalcode,
      STREETADDRESS: fi_address_streetaddress,
      APARTMENTNUMBER: fi_address_apartmentnumber,
      NARRATIVE: fi_narrative,
      IMAGE: fi_image,
      savename: fi_save_name,
      
    });
  }
  GoToCitationActivity(citationid, personarray, veharray, fi_address_country, fi_address_state, fi_address_city, fi_address_postalcode, fi_address_streetaddress, fi_address_apartmentnumber,chargearray, fi_narrative, fi_image, fi_save_name) {
    this.props.navigation.navigate('secondscreencitation', {
      ID: citationid,
      ARRAYPERSON: personarray,
      ARRAYVEHICLE: veharray,
      COUNTRY: fi_address_country,
      STATE: fi_address_state,
      CITY: fi_address_city,
      POSTALCODE: fi_address_postalcode,
      STREETADDRESS: fi_address_streetaddress,
      APARTMENTNUMBER: fi_address_apartmentnumber,
      ARRAYCHARGE:chargearray,
      NARRATIVE: fi_narrative,
      IMAGE: fi_image,
      savename: fi_save_name,
      
    });
  }
   GoToSupplementActivity(citationid, personarray, veharray, fi_address_country, fi_address_state, fi_address_city, fi_address_postalcode, fi_address_streetaddress, fi_address_apartmentnumber,chargearray, fi_narrative, fi_image, fi_save_name) {
    this.props.navigation.navigate('secondscreencitation', {
      ID: citationid,
      ARRAYPERSON: personarray,
      ARRAYVEHICLE: veharray,
      COUNTRY: fi_address_country,
      STATE: fi_address_state,
      CITY: fi_address_city,
      POSTALCODE: fi_address_postalcode,
      STREETADDRESS: fi_address_streetaddress,
      APARTMENTNUMBER: fi_address_apartmentnumber,
      ARRAYCHARGE:chargearray,
      NARRATIVE: fi_narrative,
      IMAGE: fi_image,
      savename: fi_save_name,
      
    });
  }
   GoToBookingActivity(book_id, personarray, chargearray,narrative,image,save_name) {
    this.props.navigation.navigate('secondscreenbooking', {
      ID: book_id,
      ARRAYPERSON: personarray,
      ARRAYCHARGE: chargearray,
      NARRATIVE: narrative,
      IMAGE: image,
      savename: save_name,
    });
  }
  GetTime() {
    var date, currentdate, month, year, hour, minutes, seconds, fullTime;
    var currentdate = new Date().getDate();
    if (currentdate < 10) {
      currentdate = '0' + currentdate.toString();
    }
    var month = new Date().getMonth() + 1;
    if (month < 10) {
      month = '0' + month.toString();
    }
    var year = new Date().getFullYear();

    date = new Date();

    hour = date.getHours();
    if (hour < 10) {
      hour = '0' + hour.toString();
    }

    minutes = date.getMinutes();

    if (minutes < 10) {
      minutes = '0' + minutes.toString();
    }


    seconds = date.getSeconds();

    if (seconds < 10) {
      seconds = '0' + seconds.toString();
    }


    fullTime = month.toString() + '/' + currentdate.toString() + '/' + year.toString() + ' ' + hour.toString() + ':' + minutes.toString() + ':' + seconds.toString();
    fullname = year.toString()+month.toString()+date.toString()+hour.toString()+minutes.toString();


    this.setState({

      time: fullTime,
      name: fullname,

    });
  }

  GoToThirdAddActivity(fi_id, personarray, veharray, fi_address_country, fi_address_state, fi_address_city, fi_address_postalcode, fi_address_streetaddress, fi_address_apartmentnumber, fi_narrative, fi_image, fi_save_name) {

    this.closePopover();
   
    realm.write(() => {
      var Id = realm.objects('Field_Interview_Info').length + 1;
      realm.create('Field_Interview_Info', {
        fieldID: Id,
        person_add: [],
        vehicle_add: [],
        location_country: '',
        location_state: '',
        location_city: '',
        location_postalcode: '',
        location_streetaddress: '',
        location_apartmentnumber: '',
        location_narrative: '',
        location_image: 'https://lh3.googleusercontent.com/7byfpPoWE_v1Lzm3nTCvlD_hELIOF7b8GJ7wLphbSm98hJtyO6KBpx4lVl9OR8POsc964W2QsVAUayTiwgJckyhWGA=s1024',
        createtime: this.state.time,
        reportname: this.state.name,
      });
    });
    this.props.navigation.navigate('secondscreen', {
      ID: fi_id,
      ARRAYPERSON: personarray,
      ARRAYVEHICLE: veharray,
      COUNTRY: fi_address_country,
      STATE: fi_address_state,
      CITY: fi_address_city,
      POSTALCODE: fi_address_postalcode,
      STREETADDRESS: fi_address_streetaddress,
      APARTMENTNUMBER: fi_address_apartmentnumber,
      NARRATIVE: fi_narrative,
      IMAGE: fi_image,
      savename: fi_save_name,
    });

  }
  GoToCitationAddActivity(citationid, personarray, veharray, fi_address_country, fi_address_state, fi_address_city, fi_address_postalcode, fi_address_streetaddress, fi_address_apartmentnumber,chargearray, fi_narrative, fi_image, fi_save_name) {

    this.closePopover();
   
    realm.write(() => {
      var Id = realm.objects('Citation_Info').length + 1;
      realm.create('Citation_Info', {
        CitationID: Id,
        person_add: [],
        vehicle_add: [],
        location_country: '',
        location_state: '',
        location_city: '',
        location_postalcode: '',
        location_streetaddress: '',
        location_apartmentnumber: '',
        add_charge:[],
        location_narrative: '',
        location_image: 'https://lh3.googleusercontent.com/7byfpPoWE_v1Lzm3nTCvlD_hELIOF7b8GJ7wLphbSm98hJtyO6KBpx4lVl9OR8POsc964W2QsVAUayTiwgJckyhWGA=s1024',
        createtime: this.state.time,
        reportname: this.state.name,
      });
    });
    this.props.navigation.navigate('secondscreencitation', {
      ID: citationid,
      ARRAYPERSON: personarray,
      ARRAYVEHICLE: veharray,
      ARRAYCHARGE:chargearray,
      COUNTRY: fi_address_country,
      STATE: fi_address_state,
      CITY: fi_address_city,
      POSTALCODE: fi_address_postalcode,
      STREETADDRESS: fi_address_streetaddress,
      APARTMENTNUMBER: fi_address_apartmentnumber,
      NARRATIVE: fi_narrative,
      IMAGE: fi_image,
      savename: fi_save_name,
    });

  }
  showdata_data = (apartment,street,city,state,postal,country,time) => {
    if(street == ''){
      return (
      <View>
     <Text style={{ textAlignVertical: 'center', padding: 5, fontSize: 15, color: '#000', marginRight: 5, }} >{time}</Text>
      </View>
    );

    }
    else{
       return (
      <View>
      <Text style={{ textAlignVertical: 'center', padding: 5, fontSize: 15, color: '#000', marginRight: 5, }} >{apartment + ' ' + street + ' ' + city + ' ' + state + ' ' + postal + ' ' + country}</Text>
     <Text style={{ textAlignVertical: 'center', padding: 5, fontSize: 15, color: '#000', marginRight: 5, }} >{time}</Text>

      </View>
    );

    }

  }
  GoToBookingAddActivity(book_id, personarray, chargearray,narrative,image,save_name) {

    this.closePopover();
    
    realm.write(() => {
      var Id = realm.objects('Booking_Info').length + 1;
      realm.create('Booking_Info', {
        BookingID: Id,
        person_add: [],
        charge_add: [],
        location_narrative: '',
        location_image: 'https://lh3.googleusercontent.com/7byfpPoWE_v1Lzm3nTCvlD_hELIOF7b8GJ7wLphbSm98hJtyO6KBpx4lVl9OR8POsc964W2QsVAUayTiwgJckyhWGA=s1024',
        createtime: this.state.time,
        reportname:this.state.name

      });
    });
    this.props.navigation.navigate('secondscreenbooking', {
      ID: book_id,
      ARRAYPERSON: personarray,
      ARRAYCHARGE: chargearray,
      NARRATIVE: narrative,
      IMAGE: image,
      savename: save_name,
    });
  }
  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 1.0,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }
showPopover() {
    this.setState({ isVisible: true });
  }
  componentDidMount() {

    this.Clock = setInterval(() => this.GetTime(), 1000);

  }

  componentWillUnmount() {

    clearInterval(this.Clock);

  }

  closePopover() {
    this.setState({ isVisible: false });
  }

  render() {
    return (




      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 4 }}>
        <ScrollView>
        <View style={{ backgroundColor: '#D3D3D3', height: 50 }}><Text style={{ paddingHorizontal: 30, fontSize: 30 }}>Field Interview</Text></View>




          <ListView

            dataSource={this.state.dataSourceFI}
            enableEmptySections={true}
            RefreshList={this.onRefreshList}
            renderSeparator={this.ListViewItemSeparator}


            renderRow={(rowData) => <View style={{ flex: 1, }} >
              <TouchableOpacity onPress={this.GoToThirdActivity.bind(this, rowData.fieldID, rowData.person_add, rowData.vehicle_add, rowData.location_country, rowData.location_state, rowData.location_city, rowData.location_postalcode, rowData.location_streetaddress, rowData.location_apartmentnumber, rowData.location_narrative, rowData.location_image, true)} >
                <View style={{ flex: 1, flexDirection: 'row', width: "100%", padding: 10, alignItems:'center'}}>

                  <Image style={{ width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: 'black', marginRight: 10 }} source={{ uri: 'https://lh3.googleusercontent.com/_yjSzF77qNX1Et1BjWmyFsl249AWmH361VnqMEezwwCBVZnvxs8AP3YT854zpDNZQtGszxQGmUktTuOrugmnlk8OW74=s1024' }} />
                  <View>
                    <Text style={{ textAlignVertical: 'center', padding: 5, fontSize: 15, color: '#000', marginRight: 5, }} >{'FI-' + rowData.createtime.split(' ')[0].split('/')[2] + rowData.createtime.split(' ')[0].split('/')[0] + rowData.createtime.split(' ')[0].split('/')[1] + rowData.createtime.split(' ')[1].split(':')[0] + rowData.createtime.split(' ')[1].split(':')[1] + rowData.fieldID}</Text>
                    {this.showdata_data(rowData.location_apartmentnumber,rowData.location_streetaddress,rowData.location_city,rowData.location_state,rowData.location_postalcode,rowData.location_country,rowData.createtime)}
                  </View>
                </View>

              </TouchableOpacity>

            </View>

            }

          />
          <View style={{ height: 20 }}>
          </View>
          <View style={{ backgroundColor: '#D3D3D3', height: 50 }}><Text style={{ paddingHorizontal: 30, fontSize: 30 }}>Booking</Text></View>

          <ListView

            dataSource={this.state.dataSourcebook}
            enableEmptySections={true}
            RefreshList={this.onRefreshList}
            renderSeparator={this.ListViewItemSeparator}


            renderRow={(rowData) => <View style={{ flex: 1, }} >
              <TouchableOpacity onPress={this.GoToBookingActivity.bind(this, rowData.BookingID, rowData.person_add, rowData.charge_add, rowData.location_narrative, rowData.location_image, true)}>
                <View style={{ flex: 1, flexDirection: 'row', width: "100%", padding: 10,alignItems:'center' }}>

                  <Image style={{ width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: 'black', marginRight: 10 }} source={{ uri: 'https://lh3.googleusercontent.com/_yjSzF77qNX1Et1BjWmyFsl249AWmH361VnqMEezwwCBVZnvxs8AP3YT854zpDNZQtGszxQGmUktTuOrugmnlk8OW74=s1024' }} />
                  <View>
                    <Text style={{ textAlignVertical: 'center', padding: 5, fontSize: 15, color: '#000', marginRight: 5, }} >{'BK-' + rowData.createtime.split(' ')[0].split('/')[2] + rowData.createtime.split(' ')[0].split('/')[0] + rowData.createtime.split(' ')[0].split('/')[1] + rowData.createtime.split(' ')[1].split(':')[0] + rowData.createtime.split(' ')[1].split(':')[1] + rowData.BookingID}</Text>
                    <Text style={{ textAlignVertical: 'center', padding: 5, fontSize: 15, color: '#000', marginRight: 5, }} >{rowData.createtime}</Text>

                  </View>
                </View>

              </TouchableOpacity>

            </View>

            }

          />
          <View style={{ height: 20 }}>
          </View>
          <View style={{ backgroundColor: '#D3D3D3', height: 50 }}><Text style={{ paddingHorizontal: 30, fontSize: 30 }}>Citation</Text></View>

          <ListView

            dataSource={this.state.dataSourcecit}
            enableEmptySections={true}
            RefreshList={this.onRefreshList}
            renderSeparator={this.ListViewItemSeparator}


            renderRow={(rowData) => <View style={{ flex: 1, }} >
              <TouchableOpacity onPress={this.GoToCitationActivity.bind(this, rowData.CitationID, rowData.person_add, rowData.vehicle_add, rowData.location_country, rowData.location_state, rowData.location_city, rowData.location_postalcode, rowData.location_streetaddress, rowData.location_apartmentnumber, rowData.add_charge,rowData.location_narrative, rowData.location_image, true)} >
                <View style={{ flex: 1, flexDirection: 'row', width: "100%", padding: 10, alignItems:'center'}}>

                  <Image style={{ width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: 'black', marginRight: 10 }} source={{ uri: 'https://lh3.googleusercontent.com/_yjSzF77qNX1Et1BjWmyFsl249AWmH361VnqMEezwwCBVZnvxs8AP3YT854zpDNZQtGszxQGmUktTuOrugmnlk8OW74=s1024' }} />
                  <View>
                    <Text style={{ textAlignVertical: 'center', padding: 5, fontSize: 15, color: '#000', marginRight: 5, }} >{'CT-' + rowData.createtime.split(' ')[0].split('/')[2] + rowData.createtime.split(' ')[0].split('/')[0] + rowData.createtime.split(' ')[0].split('/')[1] + rowData.createtime.split(' ')[1].split(':')[0] + rowData.createtime.split(' ')[1].split(':')[1] + rowData.CitationID}</Text>
                    {this.showdata_data(rowData.location_apartmentnumber,rowData.location_streetaddress,rowData.location_city,rowData.location_state,rowData.location_postalcode,rowData.location_country,rowData.createtime)}

                  </View>
                </View>

              </TouchableOpacity>

            </View>

            }

          />
          <View style={{ height: 20 }}>
          </View>
          <View style={{ backgroundColor: '#D3D3D3', height: 50 }}><Text style={{ paddingHorizontal: 30, fontSize: 30 }}>Accident</Text></View>

          <ListView

            dataSource={this.state.dataSourcesupp}
            enableEmptySections={true}
            RefreshList={this.onRefreshList}
            renderSeparator={this.ListViewItemSeparator}


            renderRow={(rowData) => <View style={{ flex: 1, }} >
              <TouchableOpacity>
                <View style={{ flex: 1, flexDirection: 'row', width: "100%", padding: 10, alignItems:'center'}}>

                  <Image style={{ width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: 'black', marginRight: 10 }} source={{ uri: 'https://lh3.googleusercontent.com/_yjSzF77qNX1Et1BjWmyFsl249AWmH361VnqMEezwwCBVZnvxs8AP3YT854zpDNZQtGszxQGmUktTuOrugmnlk8OW74=s1024' }} />
                  <View>
                    <Text style={{ textAlignVertical: 'center', padding: 5, fontSize: 15, color: '#000', marginRight: 5, }} >{'SUPP-' + rowData.createtime.split(' ')[0].split('/')[2] + rowData.createtime.split(' ')[0].split('/')[0] + rowData.createtime.split(' ')[0].split('/')[1] + rowData.createtime.split(' ')[1].split(':')[0] + rowData.createtime.split(' ')[1].split(':')[1] + rowData.accidentsupplementID}</Text>
                    <Text style={{ textAlignVertical: 'center', padding: 5, fontSize: 15, color: '#000', marginRight: 5, }} >{rowData.location_apartmentnumber + ' ' + rowData.location_streetaddress + ' ' + rowData.location_city + ' ' + rowData.location_state + ' ' + rowData.location_postalcode + ' ' + rowData.location_country}</Text>


                    <Text style={{ textAlignVertical: 'center', padding: 5, fontSize: 15, color: '#000', marginRight: 5, }} >{rowData.createtime}</Text>

                  </View>
                </View>

              </TouchableOpacity>

            </View>

            }

          />
          <View style={{ height: 20 }}>
          </View>
          <View style={{ backgroundColor: '#D3D3D3', height: 50 }}><Text style={{ paddingHorizontal: 30, fontSize: 30 }}>Accident Supplement</Text></View>
         


         </ScrollView>
        <Popover

          isVisible={this.state.isVisible}
          fromView={this.touchable}
          onClose={() => this.closePopover()}>
          <View style={styles.header}>

            <Text style={{ alignItems: 'center', alignSelf: 'center', fontSize: 20, color: 'white', paddingHorizontal: 20 }}>select Report Type</Text><TouchableOpacity onPress={() => this.closePopover()}>
              <View style={{ paddingHorizontal: 10 }}>
                <Image style={{ width: 30, height: 30 }} source={{ uri: 'https://lh3.googleusercontent.com/MmQUPVTdaMuyTWuXRnGKbLzbNshTBN1zr3q5jOxSXUWZS4rAJJ8zwExsytuNByGu3g9Akbgtrq2ysLRfYpknsdIkLg=s1024' }} />
              </View>
            </TouchableOpacity></View>
          <View><TouchableOpacity onPress={this.GoToBookingAddActivity.bind(this, realm.objects('Booking_Info').length + 1, [], [],'', 'https://lh3.googleusercontent.com/0Kgou0TtfKxvX2wPezXfbZwxmR6qAWEdemPNB57dQrjyRHC42cIPzEbESf2PDcJCc7WGO79dwsnCq-_6XaHnhmKyZJ8=s1024', false, false,this.state.name)}><Text style={styles.item}>Booking</Text></TouchableOpacity></View>
          <View><TouchableOpacity onPress={this.GoToCitationAddActivity.bind(this, realm.objects('Citation_Info').length + 1, [], [], '', '', '', '', '', '',[], '', 'https://lh3.googleusercontent.com/0Kgou0TtfKxvX2wPezXfbZwxmR6qAWEdemPNB57dQrjyRHC42cIPzEbESf2PDcJCc7WGO79dwsnCq-_6XaHnhmKyZJ8=s1024', false)}><Text style={styles.item}>Citation</Text></TouchableOpacity></View>
          <View><TouchableOpacity><Text style={styles.item}>Accident Supplement</Text></TouchableOpacity></View>
          <View><TouchableOpacity><Text style={styles.item}>Accident</Text></TouchableOpacity></View>
          <View><TouchableOpacity onPress={this.GoToThirdAddActivity.bind(this, realm.objects('Field_Interview_Info').length + 1, [], [], '', '', '', '', '', '', '', 'https://lh3.googleusercontent.com/0Kgou0TtfKxvX2wPezXfbZwxmR6qAWEdemPNB57dQrjyRHC42cIPzEbESf2PDcJCc7WGO79dwsnCq-_6XaHnhmKyZJ8=s1024', false)}><Text style={styles.item}>Field Interview</Text></TouchableOpacity></View>



        </Popover>
        <View style={{
          height: 70,
          width: '100%',
          alignItems: 'center',
          flexDirection: 'row',
          bottom: 20,

        }}>
          <TouchableOpacity onPress={() => this.showPopover()}>
            <Text style={{ fontSize: 20, marginTop: 40, color: 'blue' }}  >New Report</Text>
          </TouchableOpacity>
          <View style={styles.whitespace}></View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('searchreports')}>
            <Text style={{ fontSize: 20, marginTop: 40, color: 'blue' }}>Search Reports</Text></TouchableOpacity>
        </View>
      </View>

    )
  }

}
export default firstscreen;