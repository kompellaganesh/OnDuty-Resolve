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
  BackHandler,
  Picker,
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
import ImagePicker from 'react-native-image-picker';
import Communications from 'react-native-communications';
import Toast, { DURATION } from 'react-native-easy-toast';
import ImageZoom from 'react-native-image-pan-zoom';
import Geocoder from 'react-native-geocoding';
import { requestPermission, checkPermission } from 'react-native-android-permissions';

export class searchreports extends Component{
  static navigationOptions = {
    header: null,
  }
  constructor() {
    super();

    var booking = realm.objects('Booking_Info').filtered('createtime.split(' ')[0] == $0',this.state.createtime).filtered('BookingID == $0',this.state.Report_ID[15]).sorted('BookingID');
    var fieldinterview = realm.objects('Field_Interview_Info').filtered('createtime.split(' ')[0] == $0',this.state.createtime).filtered().sorted('fieldID');
    var citation = realm.objects('Citation_Info').filtered('createtime.split(' ')[0] == $0',this.state.createtime).sorted('CitationID');
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      Report_ID:'',
      date_create:'',
      noofrecords:'',
      report_type:'',
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
        })
    });

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
   Cancel_data=()=>{
             this.setState({
            Report_ID:'',
           date_create:'',
           noofrecords:'',
           report_type:'Report Type:',
          })

    } 
    searchdata = () => {
      if(this.state.report_type == Booking){
        if(this.state.date_create == ''){
          if(this.state.noofrecords == ALL){

          }
          else{

          }
        }
        else(){

        }

      }
      else if(this.state.report_type == Citation){

      }
      else if(this.state.report_type == Field Interview){
        
      }


       }
  componentWillMount(){
     this.setState({
            Report_ID:'',
           date_create:'',
           noofrecords:'',
           report_type:'',
          })

  }

  showheader_header = () => {
    if((this.state.report_type == 'Report Type:'||this.state.report_type == '') && this.state.date_create == ''){
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
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Search Reports</Text></View>

        
        <TouchableOpacity


          onPress={this.Cancel_data}
        >
          <View style={{ paddingHorizontal: 10 }}>

             <Text style = {{fontSize:20,fontWeight:'bold'}}>CLEAR</Text>
          </View>
        </TouchableOpacity>
      </View>


    );
    }
    else{
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
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Search Reports</Text></View>
      </View>
      );
    }}
  render(){
    return(
      <View>
      {this.showheader_header()}
      <ScrollView>
      <View style={{margin:20,borderWidth:1,}}>
      
        <Text style={{fontWeight:'bold',fontSize:20,color:'blue'}}>Search Reports</Text>
      
      
       <TextField
              label=" Report ID:"
              
              textColor="#000007"
              baseColor="#000007"
              keyboardType={'default'}
              underlineColorAndroid="transparent"
              value={this.state.Report_ID}
              onChangeText={(text) => { this.setState({ Report_ID: text }) }}
            />
       <TextField
             
              label=" Created On:"
              placeholder="mm/dd/yyyy"
              textColor="#000007"
              baseColor="#000007"
              keyboardType={'numeric'}
              underlineColorAndroid="transparent"
              value={this.state.date_create}
              onChangeText={(text) => { this.setState({ date_create: text }) }}
            />

      
      
       <Picker

              selectedValue={this.state.report_type}
              onValueChange={(itemValue, itemIndex) => this.setState({ report_type: itemValue })}>
              <Picker.Item label=" Report Type:" value="Report Type:" />
              <Picker.Item label="Accident" value="Accident" />
              <Picker.Item label="Accident Supplement" value="Accident Supplement" />
              <Picker.Item label="Booking" value="Booking" />
              <Picker.Item label="Citation" value="Citation" />
              <Picker.Item label="Field Interview" value="Field Interview" />
             
              </Picker>
               <Picker

              selectedValue={this.state.noofrecords}
              onValueChange={(itemValue, itemIndex) => this.setState({ noofrecords: itemValue })}>
              <Picker.Item label=" # Records to Return" value="# Records to Return" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="10" value="10" />
              <Picker.Item label="15" value="15" />
              <Picker.Item label="20" value="20" />
              <Picker.Item label="25" value="25" />
              <Picker.Item label="30" value="30" />
              <Picker.Item label="35" value="35" />
              <Picker.Item label="40" value="40" />
              <Picker.Item label="45" value="45" />
              <Picker.Item label="50" value="50" />
              <Picker.Item label="ALL" value="ALL" />
             
              </Picker>
              <View style={{alignItems:'center',justifyContent:'center'}}><TouchableOpacity onPress={this.searchdata}><View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '5%', backgroundColor: 'blue',width:'60%' ,borderRadius:5,height: 50 }}><Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', textAlign: 'center',marginBottom:20 }}>SEARCH LOCAL</Text></View></TouchableOpacity>
              </View><View style={{ height: 15 }}></View>


              </View></ScrollView></View>

      
      
      )
  }


}
export default searchreports;
