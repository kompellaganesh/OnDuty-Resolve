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
  StyleSheet,
  ScrollView,
  Text,
  BackHandler,
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

export class BigImageActivity extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'blue'
    },
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
  constructor() {
    super();
    this.state = {

      Image_Source: ''
    }
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'
    ]);
  }
  componentWillMount() {
    this.setState({

      Image_Source: this.props.navigation.state.params.IMAGE
    })

  }
  render() {

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
        <ImageZoom cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height}
          imageWidth={500}
          imageHeight={500}>
          <Image source={{ uri: this.state.Image_Source }} style={{ width: 500, height: 500, alignSelf: 'center' }} />
        </ImageZoom>
      </View>
    )
  }
}
export default BigImageActivity;