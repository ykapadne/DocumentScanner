import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  Alert,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';
import RNFS from 'react-native-fs';

const CamScanner = () => {
  const [scannedImage, setScannedImage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [suffixName, setSuffixName] = useState('');
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [mrn, setMRN] = useState('');
  const [scanningInProgress, setScanningInProgress] = useState(false);

  const toggleGenderDropdown = () => {
    setShowGenderDropdown(!showGenderDropdown);
  };

  const selectGender = (gender) => {
    setSelectedGender(gender);
    toggleGenderDropdown();
  };

  const scanDocument = async () => {
    // Prompt the user to accept camera permission request if they haven't already
    if (
      Platform.OS === 'android' &&
      (await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)) !== PermissionsAndroid.RESULTS.GRANTED
    ) {
      Alert.alert('Error', 'User must grant camera permissions to use the document scanner.');
      return;
    }

    // Set scanning in progress
    setScanningInProgress(true);

    // Start the document scanner
    const { scannedImages } = await DocumentScanner.scanDocument();

    // Get back an array with scanned image file paths
    if (scannedImages.length > 0) {
      // Set the image source to view the first scanned image
      const imageFilePath = scannedImages[0];
      setScannedImage(imageFilePath);
    }

    // Scanning complete
    setScanningInProgress(false);
  };

  const isDataFilled = () => {
    return firstName && lastName && dateOfBirth && mrn;
  };

  const saveData = async () => {
    try {
      // Check if any of the required fields (firstName, lastName, dateOfBirth, and mrn) are empty
      if (!firstName || !lastName || !dateOfBirth || !mrn) {
        Alert.alert('Error', 'Please fill in all the required information.');
        return;
      }

      const data = {
        firstName,
        lastName,
        middleName,
        suffixName,
        selectedGender,
        dateOfBirth,
        mrn,
      };

      console.log('Data to be saved:', data); // Log the data to the console

      // Create a directory to store the data and images if it doesn't exist
      const folderPath = `${RNFS.DocumentDirectoryPath}/patientData`;
      await RNFS.mkdir(folderPath);

      // Save the data as a JSON file
      const dataFilePath = `${folderPath}/data.json`;
      await RNFS.writeFile(dataFilePath, JSON.stringify(data), 'utf8');

      // Save the scanned image to the folder
      if (scannedImage) {
        const imageFilePath = `${folderPath}/scannedImage.jpg`;
        await RNFS.copyFile(scannedImage, imageFilePath);
      }

      Alert.alert('Success', 'Data saved successfully.');
    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert('Error', 'Failed to save data.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Patient</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Middle Name"
        value={middleName}
        onChangeText={(text) => setMiddleName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Suffix Name"
        value={suffixName}
        onChangeText={(text) => setSuffixName(text)}
      />
      <TouchableWithoutFeedback onPress={toggleGenderDropdown}>
        <View style={styles.input}>
          <Text>{selectedGender || 'Gender'}</Text>
        </View>
      </TouchableWithoutFeedback>
      {showGenderDropdown && (
        <View style={styles.dropdown}>
          <TouchableOpacity onPress={() => selectGender('Male')} style={styles.dropdownOption}>
            <Text style={{fontWeight: "bold", color: "black"}}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => selectGender('Female')} style={styles.dropdownOption}>
            <Text style={{fontWeight: "900" , color: "black"}}>Female</Text>
          </TouchableOpacity>
        </View>
      )}
      <TextInput
        style={styles.input}
        placeholder="Date Of Birth"
        value={dateOfBirth}
        onChangeText={(text) => setDateOfBirth(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="MRN"
        value={mrn}
        onChangeText={(text) => setMRN(text)}
      />
      {scanningInProgress && (
        <View style={styles.blueOverlay}>
          <Text style={styles.blueOverlayText}>Scanning in Progress</Text>
        </View>
      )}
      {scannedImage && (
        <Image resizeMode="contain" style={styles.scannedImage} source={{ uri: scannedImage }} />
      )}
      <TouchableOpacity onPress={scanDocument} style={styles.button}>
        <Text style={styles.buttonText}>Add Face Sheet</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={saveData} style={[{width: '60%', left: 75,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,}, isDataFilled() ? styles.buttonFilled : {}]}>
        <Text style={{ color: 'black',
    fontSize: 16,
    left: 50,
    width: '100%'}}>Save Data</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    top: 22,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 16,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  button: {
    width: '110%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    left: -17,
    borderBottomWidth: 0.9,
  },
  buttonFilled: {
    backgroundColor: "#cd853f", // Change the background color when data is filled
  },
  buttonText: {
    color: 'grey',
    fontSize: 16,
    left: 9,
    width: '100%',
  },
  scannedImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  dropdown: {
    width: '100%',
    position: 'relative',
    zIndex: 1,
    borderWidth: 1,
    borderColor: 'gray',
  },
  dropdownOption: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  blueOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 255, 0.5)', // Blue overlay color with opacity
    justifyContent: 'center',
    alignItems: 'center',
  },
  blueOverlayText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CamScanner;
