import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "./components/config";
import { ScrollView } from 'react-native-gesture-handler';



export default function App() {

  const [imageList, setImageList] = useState([]);


  useEffect(() => {
    const listRef = ref(storage);
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          getDownloadURL(itemRef).then((url) => {
            setImageList((prev) => [...prev, url]);
          });
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}> ẢNH CHỤP CÂY LÚA</Text>
      <StatusBar style="auto"></StatusBar>
      <ScrollView style={styles.scrollView}>
        <View>
          {imageList.map((url) => (
            <Image key={url} source={{ uri: url }} style={styles.image} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    padding: 5,
    marginTop: 50,
    fontSize: 20,
    color: "red",
    borderRadius: 5,
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 10,
    flexDirection: "row",
  },
  scrollView: {
    padding: 3,
    marginVertical: 5,
    marginBottom: 10,

  },
});
