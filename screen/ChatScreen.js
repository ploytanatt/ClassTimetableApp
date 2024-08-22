import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons} from '@expo/vector-icons';

import axios from 'axios';
import {ip} from '../Ip'
import HeaderBar from "../component/HeaderBar";


const ChatScreen = ({navigation}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
 
  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation}/>
      <ImageBackground source={require("../assets/images/background-image.png")} resizeMode="cover" style={styles.backgroundimage}>
        <StatusBar style="auto" />
        <View style={styles.boxView}>
          <View style={styles.box}>
            <View style={styles.iconView}>
              <MaterialCommunityIcons style={styles.icon} name="account-circle-outline" />
            </View>
            <View style={styles.textView}>
              <Text style={styles.chatDetail}>Teacher Name&Surname</Text>
              <Text style={styles.chatDetail}>Subject Name</Text>
            </View>
            <View style={styles.unreadView}>
              <View style={styles.unreadNum}>
                <Text style={{fontWeight: 'bold', color: 'white', fontSize: 16}}>1</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  iconView: {
    flex: 1,
    justifyContent: 'center'
  },
  icon: {
    fontSize: 50,
    color: 'black',
  },
  backgroundimage: {
    flex: 1,
  },
  text:{
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize:20,
  },
  boxView: {
    marginTop: 10,
    paddingHorizontal: 5,
  },
  box: {
    backgroundColor: '#F7D0D5',
    width: '100%',
    height: 80,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between'
  },
  textView:{
    flex: 5,
    justifyContent: 'center'
  },
  chatDetail: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  unreadView:{
    justifyContent:"center",
  },
  unreadNum:{
    backgroundColor: 'red',
    borderRadius: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
  }
  
});

export default ChatScreen;

