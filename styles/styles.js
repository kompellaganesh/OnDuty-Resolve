import {StyleSheet,
} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,

  },
   textViewContainer: {
 
      textAlignVertical:'center', 
      padding:5,
      fontSize: 15,
      color: '#000',
      marginRight:5,
      
     },
  header1: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderBottomColor: '#E1E1E1',
    height: 40,
    alignItems: 'center',
    marginLeft: '40%'
  },
  TextInputStyle:
  {
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 25,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    borderBottomColor: '#E1E1E1',
    borderBottomWidth: 1,
    height: 50,
    alignItems: 'center',
  },
  title: {
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: 20,
    color: 'white'
  },
  whitespace: {
    alignItems: 'center',
    flex: 1
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    fontSize: 20,
    height: 50,
  },
  ganesh:{
        flex: 1,
        flexDirection: 'row',
        width:"100%",
        padding: 10,
        alignItems:'center'
        
    },
});