import styles from '../styles/styles';
import React, { Component } from 'react';
import { TextField } from 'react-native-material-textfield';
import realm from '../realm/realm';
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
  Alert,
  View
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import { requestPermission, checkPermission } from 'react-native-android-permissions';
export default class location extends Components{
   getlatlong() {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)
      this.setState({
        latitude: lat,
        longitude: long,
      })
      Geocoder.setApiKey('AIzaSyBG-xFfVfilofGW35T82DCVXubdIo7tDwM');
      Geocoder.from(this.state.latitude, this.state.longitude).then(
        json => {                                                                                                            
          var address_component = json.results[0].formatted_address.split(',');
          STREETADDRESS = '';
          for (i = 0; i <= address_component.length - 4; i++) {
            STREETADDRESS = STREETADDRESS + address_component[i] + ',';
          }
          if (address_component[address_component.length - 3] == 'AP') {
            cityaddress_1 = 'Andhra Pradesh'
          }
          else if (address_component[address_component.length - 3] == 'AR') {
            cityaddress_1 = 'Arunachal Pradesh'
          }
          else if (address_component[address_component.length - 3] == 'AS') {
            cityaddress_1 = 'Assam'
          }

          else if (address_component[address_component.length - 3] == 'BR') {
            cityaddress_1 = 'Bihar'
          }
          else if (address_component[address_component.length - 3] == 'CT' || address_component[address_component.length - 3] == 'CG') {
            cityaddress_1 = 'Chhattisgarh'
          }
          else if (address_component[address_component.length - 3] == 'GA') {
            cityaddress_1 = 'Goa'
          }
          else if (address_component[address_component.length - 3] == 'GJ') {
            cityaddress_1 = 'Gujarat'
          }
          else if (address_component[address_component.length - 3] == 'HR') {
            cityaddress_1 = 'Haryana'
          }
          else if (address_component[address_component.length - 3] == 'HP') {
            cityaddress_1 = 'Himachal Pradesh'
          }
          else if (address_component[address_component.length - 3] == 'JK') {
            cityaddress_1 = 'Jammu and Kashmir'
          }
          else if (address_component[address_component.length - 3] == 'JH') {
            cityaddress_1 = 'Jharkhand'
          }
          else if (address_component[address_component.length - 3] == 'KA') {
            cityaddress_1 = 'Karnataka'
          }
          else if (address_component[address_component.length - 3] == 'KL') {
            cityaddress_1 = 'Kerala'
          }
          else if (address_component[address_component.length - 3] == 'MP') {
            cityaddress_1 = 'Madhya Pradesh'
          }
          else if (address_component[address_component.length - 3] == 'MH') {
            cityaddress_1 = 'Maharashtra'
          } else if (address_component[address_component.length - 3] == 'MN') {
            cityaddress_1 = 'Manipur'
          } else if (address_component[address_component.length - 3] == 'ML') {
            cityaddress_1 = 'Meghalaya'
          } else if (address_component[address_component.length - 3] == 'MZ') {
            cityaddress_1 = 'Mizoram'
          } else if (address_component[address_component.length - 3] == 'NL') {
            cityaddress_1 = 'Nagaland'
          } else if (address_component[address_component.length - 3] == 'OR' || address_component[address_component.length - 3] == 'Orissa' || address_component[address_component.length - 3] == 'OD') {
            cityaddress_1 = 'Odisha'
          } else if (address_component[address_component.length - 3] == 'PB') {
            cityaddress_1 = 'Punjab'
          }
          else if (address_component[address_component.length - 3] == 'RJ') {
            cityaddress_1 = 'Rajasthan'
          }
          else if (address_component[address_component.length - 3] == 'SK') {
            cityaddress_1 = 'Sikkim'
          }
          else if (address_component[address_component.length - 3] == 'TN') {
            cityaddress_1 = 'Tamil Nadu'
          }
          else if (address_component[address_component.length - 3] == 'TG' || address_component[address_component.length - 3] == 'TS') {
            cityaddress_1 = 'Telangana'
          }
          else if (address_component[address_component.length - 3] == 'TR') {
            cityaddress_1 = 'Tripura'
          }
          else if (address_component[address_component.length - 3] == 'UP') {
            cityaddress_1 = 'Uttar Pradesh'
          }
          else if (address_component[address_component.length - 3] == 'UK' || address_component[address_component.length - 3] == 'Uttaranchal' || address_component[address_component.length - 3] == 'UT') {
            cityaddress_1 = 'Uttarakhand'
          }
          else if (address_component[address_component.length - 3] == 'WB') {
            cityaddress_1 = 'West Bengal'
          }
          else {
            cityaddress_1 = address_component[address_component.length - 3]
          }


          this.setState({
            Employee_COUNTRY: address_component[address_component.length - 1].toUpperCase(),
            Employee_STATE: address_component[address_component.length - 2].split(' ')[1],
            Employee_CITY: cityaddress_1,

            Employee_POSTALCODE: address_component[address_component.length - 2].split(' ')[address_component[address_component.length - 2].split(' ').length - 1],

            Employee_STREETADDRESS: STREETADDRESS
          })
        },
        error => {
          Alert.alert('error occured please try again');
        })
    }, error => Alert.alert('Turn on location services'), )


  }
  getData() {
    checkPermission("android.permission.ACCESS_FINE_LOCATION").then((result) => {
      console.log("Already Granted!");
      console.log(result);
      this.getlatlong();

    },
      (result) => {

        setTimeout(() => {
          requestPermission("android.permission.ACCESS_FINE_LOCATION").then((result) => {
            this.getlatlong();

          }, (result) => {
            this.refs.toast.show('Permission Denied', 500);
            console.log(result);
          });
        }, 0);
      });

  }
	render(){
		return(
			<View>
			<ScrollView>
          <View style={styles.container}>
          </View>
          <View style={{ borderWidth: 0.5, borderColor: '#000007', paddingHorizontal: 10 }} >
            <TouchableOpacity onPress={() => { this.getData() }}>
              <View style={{ marginLeft: '88%', marginTop: 10 }}>
                <Image style={{ width: 50, height: 50 }} source={{ uri: 'https://lh3.googleusercontent.com/FeFOsTFCtFwsE9e_ZaNFknAZXqJ-YFWuGe4qM9VdvX2EvfGj2X8CE_BW5VE-GArcDNTVpnpng0uICYFbdDZ59G2sVA=s1024' }} />
              </View>
            </TouchableOpacity>
            <TextField
              ref={(input) => { this.tenthTextInput = input; }}
              onSubmitEditing={() => { this.elevenTextInput.focus(); }}
              returnKeyType={"next"}
              label="Street Address"
              textColor="#000007"
              baseColor="#000007"
              keyboardType={'default'}
              underlineColorAndroid="transparent"
              value={this.state.Employee_STREETADDRESS}
              onChangeText={(text) => { this.setState({ Employee_STREETADDRESS: text }) }}
            />
            <TextField
              ref={(input) => { this.elevenTextInput = input; }}
              returnKeyType={"done"}
              label="Apartment Number"
              textColor="#000007"
              baseColor="#000007"
              keyboardType={'default'}
              underlineColorAndroid="transparent"
              value={this.state.Employee_APARTMENTNUMBER}
              onChangeText={(text) => { this.setState({ Employee_APARTMENTNUMBER: text }) }}
            />

            <TextField
              ref={(input) => { this.ninthTextInput = input; }}
              onSubmitEditing={() => { this.tenthTextInput.focus(); }}
              returnKeyType={"next"}
              label="Postal Code"
              textColor="#000007"
              baseColor="#000007"
              keyboardType={'numeric'}
              underlineColorAndroid="transparent"
              value={this.state.Employee_POSTALCODE}
              onChangeText={(text) => { this.setState({ Employee_POSTALCODE: text }) }}
            />
            <TextField
              ref={(input) => { this.eightTextInput = input; }}
              onSubmitEditing={() => { this.ninthTextInput.focus(); }}
              returnKeyType={"next"}
              label="City"
              textColor="#000007"
              baseColor="#000007"
              keyboardType={'default'}
              underlineColorAndroid="transparent"
              value={this.state.Employee_CITY}
              onChangeText={(text) => { this.setState({ Employee_CITY: text }) }}
            />
            <Picker

              selectedValue={this.state.Employee_STATE}
              onValueChange={(itemValue, itemIndex) => this.setState({ Employee_STATE: itemValue })}>
              <Picker.Item label="State" value="State" />
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
            <Picker
              selectedValue={this.state.Employee_COUNTRY}
              onValueChange={(itemValue, itemIndex) => this.setState({ Employee_COUNTRY: itemValue })}>
              <Picker.Item label="Country" value="Country" />
              <Picker.Item label="AFGHANISTAN " value=" AFGHANISTAN" />
              <Picker.Item label="ALBANIA " value=" ALBANIA" />
              <Picker.Item label="ALGERIA " value=" ALGERIA" />
              <Picker.Item label="ANDORRA " value=" ANDORRA" />
              <Picker.Item label="ANGOLA  " value=" ANGOLA" />
              <Picker.Item label="ANTIGUA & BARBUDA " value=" ANTIGUA & BARBUDA" />
              <Picker.Item label="ARGENTINA " value=" ARGENTINA" />
              <Picker.Item label="ARMENIA " value=" ARMENIA" />
              <Picker.Item label="AUSTRALIA " value=" AUSTRALIA" />
              <Picker.Item label="AUSTRIA " value=" AUSTRIA" />
              <Picker.Item label="AZERBAIJAN  " value=" AZERBAIJAN" />
              <Picker.Item label="BAHAMAS, THE  " value=" BAHAMAS, THE" />
              <Picker.Item label="BAHRAIN " value=" BAHRAIN" />
              <Picker.Item label="BANGLADESH  " value=" BANGLADESH" />
              <Picker.Item label="BARBADOS  " value=" BARBADOS" />
              <Picker.Item label="BELARUS " value=" BELARUS" />
              <Picker.Item label="BELGIUM " value=" BELGIUM" />
              <Picker.Item label="BELIZE  " value=" BELIZE" />
              <Picker.Item label="BENIN " value=" BENIN" />
              <Picker.Item label="BHUTAN  " value=" BHUTAN" />
              <Picker.Item label="BOLIVIA " value=" BOLIVIA" />
              <Picker.Item label="BOSNIA & HERZEGOVINA  " value=" BOSNIA & HERZEGOVINA" />
              <Picker.Item label="BOTSWANA  " value=" BOTSWANA" />
              <Picker.Item label="BRAZIL  " value=" BRAZIL" />
              <Picker.Item label="BRUNEI  " value=" BRUNEI" />
              <Picker.Item label="BULGARIA  " value=" BULGARIA" />
              <Picker.Item label="BURKINA FASO  " value=" BURKINA FASO" />
              <Picker.Item label="BURUNDI " value=" BURUNDI" />
              <Picker.Item label="CABO VERDE  " value=" CABO VERDE" />
              <Picker.Item label="CAMBODIA  " value=" CAMBODIA" />
              <Picker.Item label="CAMEROON  " value=" CAMEROON" />
              <Picker.Item label="CANADA  " value=" CANADA" />
              <Picker.Item label="CENTRAL AFRICAN REPUBLIC  " value=" CENTRAL AFRICAN REPUBLIC" />
              <Picker.Item label="CHAD  " value=" CHAD" />
              <Picker.Item label="CHILE " value=" CHILE" />
              <Picker.Item label="CHINA " value=" CHINA" />
              <Picker.Item label="COLOMBIA  " value=" COLOMBIA" />
              <Picker.Item label="COMOROS " value=" COMOROS" />
              <Picker.Item label="COSTA RICA  " value=" COSTA RICA" />
              <Picker.Item label="CÔTE D'IVOIRE " value=" CÔTE D'IVOIRE" />
              <Picker.Item label="CROATIA " value=" CROATIA" />
              <Picker.Item label="CUBA  " value=" CUBA" />
              <Picker.Item label="CYPRUS  " value=" CYPRUS" />
              <Picker.Item label="CZECH REPUBLIC  " value=" CZECH REPUBLIC" />
              <Picker.Item label="DEMOCRATIC REPUBLIC OF THE CONGO  " value=" DEMOCRATIC REPUBLIC OF THE CONGO" />
              <Picker.Item label="DENMARK " value=" DENMARK" />
              <Picker.Item label="DJIBOUTI  " value=" DJIBOUTI" />
              <Picker.Item label="DOMINICA  " value=" DOMINICA" />
              <Picker.Item label="DOMINICAN REPUBLIC  " value=" DOMINICAN REPUBLIC" />
              <Picker.Item label="ECUADOR " value=" ECUADOR" />
              <Picker.Item label="EGYPT " value=" EGYPT" />
              <Picker.Item label="EL SALVADOR " value=" EL SALVADOR" />
              <Picker.Item label="EQUATORIAL GUINEA " value=" EQUATORIAL GUINEA" />
              <Picker.Item label="ERITREA " value=" ERITREA" />
              <Picker.Item label="ESTONIA " value=" ESTONIA" />
              <Picker.Item label="ETHIOPIA  " value=" ETHIOPIA" />
              <Picker.Item label="FEDERATED STATES OF MICRONESIA  " value=" FEDERATED STATES OF MICRONESIA" />
              <Picker.Item label="FIJI  " value=" FIJI" />
              <Picker.Item label="FINLAND " value=" FINLAND" />
              <Picker.Item label="FRANCE  " value=" FRANCE" />
              <Picker.Item label="GABON " value=" GABON" />
              <Picker.Item label="GAMBIA, THE " value=" GAMBIA, THE" />
              <Picker.Item label="GEORGIA " value=" GEORGIA" />
              <Picker.Item label="GERMANY " value=" GERMANY" />
              <Picker.Item label="GHANA " value=" GHANA" />
              <Picker.Item label="GREECE  " value=" GREECE" />
              <Picker.Item label="GRENADA " value=" GRENADA" />
              <Picker.Item label="GUATEMALA " value=" GUATEMALA" />
              <Picker.Item label="GUINEA  " value=" GUINEA" />
              <Picker.Item label="GUINEA-BISSAU " value=" GUINEA-BISSAU" />
              <Picker.Item label="GUYANA  " value=" GUYANA" />
              <Picker.Item label="HAITI " value=" HAITI" />
              <Picker.Item label="HONDURAS  " value=" HONDURAS" />
              <Picker.Item label="HUNGARY " value=" HUNGARY" />
              <Picker.Item label="ICELAND " value=" ICELAND" />
              <Picker.Item label="INDIA" value=" INDIA" />
              <Picker.Item label="INDONESIA " value=" INDONESIA" />
              <Picker.Item label="IRAN  " value=" IRAN" />
              <Picker.Item label="IRAQ  " value=" IRAQ" />
              <Picker.Item label="IRELAND " value=" IRELAND" />
              <Picker.Item label="ISRAEL  " value=" ISRAEL" />
              <Picker.Item label="ITALY " value=" ITALY" />
              <Picker.Item label="JAMAICA " value=" JAMAICA" />
              <Picker.Item label="JAPAN " value=" JAPAN " />
              <Picker.Item label="JORDAN  " value=" JORDAN  " />
              <Picker.Item label="KAZAKHSTAN  " value=" KAZAKHSTAN  " />
              <Picker.Item label="KENYA " value=" KENYA " />
              <Picker.Item label="KIRIBATI  " value=" KIRIBATI" />
              <Picker.Item label="KOSOVO  " value=" KOSOVO" />
              <Picker.Item label="KUWAIT  " value=" KUWAIT" />
              <Picker.Item label="KYRGYZSTAN  " value=" KYRGYZSTAN" />
              <Picker.Item label="LAOS  " value=" LAOS" />
              <Picker.Item label="LATVIA  " value=" LATVIA" />
              <Picker.Item label="LEBANON " value=" LEBANON" />
              <Picker.Item label="LESOTHO " value=" LESOTHO" />
              <Picker.Item label="LIBERIA " value=" LIBERIA" />
              <Picker.Item label="LIBYA " value=" LIBYA" />
              <Picker.Item label="LIECHTENSTEIN " value=" LIECHTENSTEIN" />
              <Picker.Item label="LITHUANIA " value=" LITHUANIA" />
              <Picker.Item label="LUXEMBOURG  " value=" LUXEMBOURG" />
              <Picker.Item label="MACEDONIA " value=" MACEDONIA" />
              <Picker.Item label="MADAGASCAR  " value=" MADAGASCAR" />
              <Picker.Item label="MALAWI  " value=" MALAWI" />
              <Picker.Item label="MALAYSIA  " value=" MALAYSIA" />
              <Picker.Item label="MALDIVES  " value=" MALDIVES" />
              <Picker.Item label="MALI  " value=" MALI" />
              <Picker.Item label="MALTA " value=" MALTA" />
              <Picker.Item label="MARSHALL ISLANDS  " value=" MARSHALL ISLANDS" />
              <Picker.Item label="MAURITANIA  " value=" MAURITANIA" />
              <Picker.Item label="MAURITIUS " value=" MAURITIUS" />
              <Picker.Item label="MEXICO  " value=" MEXICO" />
              <Picker.Item label="MOLDOVA " value=" MOLDOVA" />
              <Picker.Item label="MONACO  " value=" MONACO" />
              <Picker.Item label="MONGOLIA  " value=" MONGOLIA" />
              <Picker.Item label="MONTENEGRO  " value=" MONTENEGRO" />
              <Picker.Item label="MOROCCO " value=" MOROCCO" />
              <Picker.Item label="MOZAMBIQUE  " value=" MOZAMBIQUE" />
              <Picker.Item label="MYANMAR " value=" MYANMAR" />
              <Picker.Item label="NAMIBIA " value=" NAMIBIA" />
              <Picker.Item label="NAURU " value=" NAURU" />
              <Picker.Item label="NEPAL " value=" NEPAL" />
              <Picker.Item label="NETHERLANDS " value=" NETHERLANDS" />
              <Picker.Item label="NEW ZEALAND " value=" NEW ZEALAND" />
              <Picker.Item label="NICARAGUA " value=" NICARAGUA" />
              <Picker.Item label="NIGER " value=" NIGER" />
              <Picker.Item label="NIGERIA " value=" NIGERIA" />
              <Picker.Item label="NORTH KOREA " value=" NORTH KOREA" />
              <Picker.Item label="NORWAY  " value=" NORWAY" />
              <Picker.Item label="OMAN  " value=" OMAN" />
              <Picker.Item label="PAKISTAN  " value=" PAKISTAN" />
              <Picker.Item label="PALAU " value=" PALAU" />
              <Picker.Item label="PALESTINE " value=" PALESTINE" />
              <Picker.Item label="PANAMA  " value=" PANAMA" />
              <Picker.Item label="PAPUA NEW GUINEA  " value=" PAPUA NEW GUINEA" />
              <Picker.Item label="PARAGUAY  " value=" PARAGUAY" />
              <Picker.Item label="PERU  " value=" PERU" />
              <Picker.Item label="PHILIPPINES " value=" PHILIPPINES" />
              <Picker.Item label="POLAND  " value=" POLAND" />
              <Picker.Item label="PORTUGAL  " value=" PORTUGAL" />
              <Picker.Item label="QATAR " value=" QATAR" />
              <Picker.Item label="REPUBLIC OF THE CONGO " value=" REPUBLIC OF THE CONGO" />
              <Picker.Item label="ROMANIA " value=" ROMANIA" />
              <Picker.Item label="RUSSIA  " value=" RUSSIA" />
              <Picker.Item label="RWANDA  " value=" RWANDA" />
              <Picker.Item label="SAINT KITTS & NEVIS " value=" SAINT KITTS & NEVIS" />
              <Picker.Item label="SAINT LUCIA " value=" SAINT LUCIA" />
              <Picker.Item label="SAINT VINCENT & THE GRENADINES  " value=" SAINT VINCENT & THE GRENADINES" />
              <Picker.Item label="SAMOA " value=" SAMOA" />
              <Picker.Item label="SAN MARINO  " value=" SAN MARINO" />
              <Picker.Item label="SÃO TOMÉ & PRÍNCIPE " value=" SÃO TOMÉ & PRÍNCIPE" />
              <Picker.Item label="SAUDI ARABIA  " value=" SAUDI ARABIA" />
              <Picker.Item label="SENEGAL " value=" SENEGAL" />
              <Picker.Item label="SERBIA  " value=" SERBIA" />
              <Picker.Item label="SEYCHELLES  " value=" SEYCHELLES" />
              <Picker.Item label="SIERRA LEONE  " value=" SIERRA LEONE" />
              <Picker.Item label="SINGAPORE " value=" SINGAPORE" />
              <Picker.Item label="SLOVAKIA  " value=" SLOVAKIA" />
              <Picker.Item label="SLOVENIA  " value=" SLOVENIA" />
              <Picker.Item label="SOLOMON ISLANDS " value=" SOLOMON ISLANDS" />
              <Picker.Item label="SOMALIA " value=" SOMALIA" />
              <Picker.Item label="SOUTH AFRICA  " value=" SOUTH AFRICA" />
              <Picker.Item label="SOUTH KOREA " value=" SOUTH KOREA" />
              <Picker.Item label="SOUTH SUDAN " value=" SOUTH SUDAN" />
              <Picker.Item label="SPAIN " value=" SPAIN" />
              <Picker.Item label="SRI LANKA " value=" SRI LANKA" />
              <Picker.Item label="SUDAN " value=" SUDAN" />
              <Picker.Item label="SURINAME  " value=" SURINAME" />
              <Picker.Item label="SWAZILAND " value=" SWAZILAND" />
              <Picker.Item label="SWEDEN  " value=" SWEDEN" />
              <Picker.Item label="SWITZERLAND " value=" SWITZERLAND" />
              <Picker.Item label="SYRIA " value=" SYRIA" />
              <Picker.Item label="TAJIKISTAN  " value=" TAJIKISTAN" />
              <Picker.Item label="TANZANIA  " value=" TANZANIA" />
              <Picker.Item label="THAILAND  " value=" THAILAND" />
              <Picker.Item label="TIMOR-LESTE " value=" TIMOR-LESTE" />
              <Picker.Item label="TOGO  " value=" TOGO" />
              <Picker.Item label="TONGA " value=" TONGA" />
              <Picker.Item label="TRINIDAD & TOBAGO " value=" TRINIDAD & TOBAGO" />
              <Picker.Item label="TUNISIA " value=" TUNISIA" />
              <Picker.Item label="TURKEY  " value=" TURKEY" />
              <Picker.Item label="TURKMENISTAN  " value=" TURKMENISTAN" />
              <Picker.Item label="TUVALU  " value=" TUVALU" />
              <Picker.Item label="UGANDA  " value=" UGANDA" />
              <Picker.Item label="UKRAINE " value=" UKRAINE" />
              <Picker.Item label="UNITED ARAB EMIRATES  " value=" UNITED ARAB EMIRATES" />
              <Picker.Item label="UNITED KINGDOM  " value=" UNITED KINGDOM" />
              <Picker.Item label="UNITED STATES " value=" UNITED STATES" />
              <Picker.Item label="URUGUAY " value=" URUGUAY" />
              <Picker.Item label="UZBEKISTAN  " value=" UZBEKISTAN" />
              <Picker.Item label="VANUATU " value=" VANUATU" />
              <Picker.Item label="VATICAN CITY  " value=" VATICAN CITY" />
              <Picker.Item label="VENEZUELA " value=" VENEZUELA" />
              <Picker.Item label="VIETNAM " value=" VIETNAM" />
              <Picker.Item label="YEMEN " value=" YEMEN" />
              <Picker.Item label="ZAMBIA  " value=" ZAMBIA" />
              <Picker.Item label="ZIMBABWE  " value=" ZIMBABWE" />
            </Picker>
          </View>
        </ScrollView></View>)
	}
}