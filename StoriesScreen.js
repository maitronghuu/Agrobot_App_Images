import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import  { useState, useEffect } from 'react';
import db from './components/config';
import { useNavigation } from '@react-navigation/native';


const StoriesScreen = () => {
    const navigation = useNavigation();
    const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const ref = db.database().ref('stories/1');
    const handleData = (snapshot) => {
      setImageUrl(snapshot.val().imageUrl);
    };
    ref.on('value', handleData);
    return () => {
      ref.off('value', handleData);
    };
  }, []);

  return (
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  )
}

export default StoriesScreen

const styles = StyleSheet.create({})