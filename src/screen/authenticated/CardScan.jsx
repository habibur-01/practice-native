// import React, {memo, useEffect, useRef, useState} from 'react';
// import {
//   Pressable,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {Camera, useCameraDevices} from 'react-native-vision-camera';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Entypo from 'react-native-vector-icons/Entypo';
// import {responsiveHeight} from 'react-native-responsive-dimensions';

// const CardScan = memo(({navigation}) => {
//   const camera = useRef(null);
//   const devices = useCameraDevices('back');
//   const device = devices.back ?? devices.find(d => d.position === 'back');
//   const [hasPermission, setHasPermission] = useState(false);
//   const [torchOn, setTorchOn] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const cameraPermission = await Camera.requestCameraPermission();
//       console.log('🚀 ~ cameraPermission:', cameraPermission);

//       if (cameraPermission === 'granted') {
//         setHasPermission(true);
//       }
//     })();
//   }, []);

//   const toggleTorch = () => setTorchOn(prev => !prev);

//   if (!hasPermission)
//     return (
//       <View>
//         <Text style={{color: '#fff'}}>Camera permission needed.</Text>
//       </View>
//     );
//   if (device == null)
//     return (
//       <View>
//         <Text style={{color: '#fff'}}>No camera found.</Text>
//       </View>
//     );
//   return (
//     <View style={styles.container}>
//       <View
//         style={{
//           zIndex: 20,
//           justifyContent: 'center',
//           alignItems: 'center',
//           padding: 20,
//         }}>
//         <Text style={styles.title}>Scan Card</Text>
//         <TouchableOpacity
//           style={styles.closeIcon}
//           onPress={() => navigation.goBack()}>
//           <AntDesign name="close" size={24} color="#f6f6f6" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.flashIcon} onPress={toggleTorch}>
//           <Entypo name="flash" size={24} color="#f6f6f6" />
//         </TouchableOpacity>
//       </View>
//       <Camera
//         ref={camera}
//         style={StyleSheet.absoluteFill}
//         device={device}
//         isActive={true}
//         photo={true}
//       />

//       {/* Overlay and Frame */}
//       {/* <View style={styles.overlay}>

//       </View> */}
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <View style={styles.frame}>
//           <Camera
//             ref={camera}
//             style={[StyleSheet.absoluteFill, styles.camera]}
//             device={device}
//             isActive={true}
//             torch={torchOn ? 'on' : 'off'}
//             photo={true}
//           />
//         </View>
//       </View>
//     </View>
//   );
// });
// const styles = StyleSheet.create({
//   container: {
//     position: 'relative',
//     flex: 1,
//     // backgroundColor: '#373737',
//   },
//   title: {
//     color: '#fff',
//     fontSize: 16,
//     textAlign: 'center',
//     zIndex: 10,
//   },
//   closeIcon: {
//     position: 'absolute',
//     top: 20,
//     left: 20,
//     zIndex: 10,
//   },
//   flashIcon: {
//     position: 'absolute',
//     top: 20,
//     right: 20,
//     zIndex: 10,
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: 100,
//     // height: '100%',
//   },
//   title: {
//     fontSize: 20,
//     color: '#fff',
//     marginBottom: 20,
//     fontWeight: '600',
//   },
//   frame: {
//     width: 300,
//     height: 180,
//     borderRadius: 12,
//     // borderWidth: 2,
//     // borderColor: '#00FFAA',
//   },
//   manualEntry: {
//     marginTop: 30,
//     color: '#ccc',
//     textDecorationLine: 'underline',
//     fontSize: 16,
//   },
//   camera: {
//     width: 300,
//     height: 180,
//     borderWidth: 1,
//     borderColor: 'red',
//   },
// });
// export default CardScan;
// import React, {useState, useEffect, useRef, useCallback} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import {Camera, useCameraDevices} from 'react-native-vision-camera';
// // import textRecognition, {
// //   TextRecognitionScript,
// // } from '@react-native-ml-kit/text-recognition';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Feather from 'react-native-vector-icons/Feather';
// import Entypo from 'react-native-vector-icons/Entypo';
// import {
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import {useDispatch} from 'react-redux';
// import {useNavigation} from '@react-navigation/native';
// // import TextRecognition from '@react-native-ml-kit/text-recognition';

// const CardScan = () => {
//   const navigation = useNavigation();
//   const [hasPermission, setHasPermission] = useState(false);
//   const [deviceReady, setDeviceReady] = useState(false);
//   const cameraRef = useRef(null);
//   const devices = useCameraDevices();
//   const device = devices.back ?? devices.find(d => d.position === 'back');
//   const [isScanning, setIsScanning] = useState(false);
//   const [torchOn, setTorchOn] = useState(false);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (device) {
//       setTimeout(() => {
//         setDeviceReady(true); // Delay to allow proper positioning
//       }, 100);
//     }
//   }, [device]);

//   useEffect(() => {
//     (async () => {
//       const cameraPermission = await Camera.requestCameraPermission();

//       if (cameraPermission === 'granted') {
//         setHasPermission(true);
//       }
//     })();
//   }, []);

//   // const scanTextFromCamera = useCallback(async () => {
//   //   if (!cameraRef.current || isScanning) return; // Prevent multiple clicks

//   //   setIsScanning(true);

//   //   try {
//   //     const photo = await cameraRef.current.takePhoto({quality: 1});
//   //     const imageUri = `file://${photo.path}`;

//   //     // Process text recognition asynchronously
//   //     const result = await textRecognition.recognize(imageUri);
//   //     if (!result.text || result.text.trim() === '') {
//   //       const hindiResult = await TextRecognition.recognize(
//   //         imageUri,
//   //         TextRecognitionScript.DEVANAGARI,
//   //       );
//   //       result.text += `\n${hindiResult.text}`; // Append Hindi text if found
//   //     }

//   //     // If the card also has Bengali, attempt recognition
//   //     if (!result.text || result.text.trim() === '') {
//   //       const bengaliResult = await TextRecognition.recognize(
//   //         imageUri,
//   //         TextRecognitionScript.BENGALI,
//   //       );
//   //       result.text += `\n${bengaliResult.text}`; // Append Bengali text if found
//   //     }
//   //     const photoType = isFront ? 'front' : 'back';

//   //     // Update Redux state without blocking UI
//   //     setTimeout(() => {
//   //       setIdProof(prevState => ({
//   //         ...prevState,
//   //         [photoType]: imageUri,
//   //         [`${photoType}Text`]: result.text,
//   //       }));

//   //       setIsScanning(false);
//   //       setIsCameraOpen(false);
//   //     }, 100); // Slight delay to free UI thread
//   //   } catch (error) {
//   //     console.error('Text scanning failed:', error);
//   //     setIsScanning(false);
//   //   }
//   // }, [isFront, setIdProof, setIsCameraOpen, isScanning]);

//   if (!deviceReady) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#D9D9D9" />
//         <Text style={styles.loadingText}>Loading Camera...</Text>
//       </View>
//     );
//   }

//   if (!devices || Object.keys(devices).length === 0) {
//     return (
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <ActivityIndicator size={36} color="#D9D9D9" />
//       </View>
//     );
//   }

//   if (!device) {
//     return (
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <Feather name="camera-off" size={24} color="#D9D9D9" />
//         <Text>No camera found</Text>
//       </View>
//     );
//   }

//   if (!hasPermission) {
//     return (
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <Text>Camera permission is required</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backBtn}>
//           <AntDesign name="close" size={24} color="#D9D9D9" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Scan card</Text>
//         <TouchableOpacity onPress={() => setTorchOn(!torchOn)}>
//           <Entypo
//             name="flash"
//             size={24}
//             color={torchOn ? '#ffdb8c' : '#f6f6f6'}
//           />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.cameraContainer}>
//         <View style={styles.cameraBox}>
//           <FontAwesome6
//             name="angle-up"
//             size={24}
//             color="white"
//             style={styles.leftTopIcon}
//           />
//           <FontAwesome6
//             name="angle-up"
//             size={24}
//             color="white"
//             style={styles.rightTopIcon}
//           />
//           {deviceReady && (
//             <View style={styles.camera}>
//               <Camera
//                 ref={cameraRef}
//                 style={StyleSheet.absoluteFill}
//                 device={device}
//                 isActive={true}
//                 torch={torchOn ? 'on' : 'off'}
//                 photo={true}
//               />
//             </View>
//           )}
//           <FontAwesome6
//             name="angle-up"
//             size={24}
//             color="white"
//             style={styles.leftBottomIcon}
//           />
//           <FontAwesome6
//             name="angle-up"
//             size={24}
//             color="white"
//             style={styles.rightBottomIcon}
//           />
//         </View>
//       </View>
//       <View style={styles.bottomContainer}>
//         <Text style={styles.textDesc}>
//           Place your document within the frame and take a photo
//         </Text>
//         <TouchableOpacity style={styles.button}>
//           {/* {isScanning ? (
//             <ActivityIndicator size={24} color={'#D9D9D9'} />
//           ) : (
//             <AntDesign name="camerao" size={24} color="#D9D9D9" />
//           )} */}
//           <AntDesign name="camerao" size={24} color="#D9D9D9" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#373737',
//   },
//   header: {
//     height: 80,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//   },
//   headerTitle: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   backBtn: {
//     backgroundColor: 'rgba(18, 18, 18, 0.9)',
//     height: 50,
//     width: 50,
//     borderRadius: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cameraContainer: {
//     flexGrow: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cameraBox: {
//     width: responsiveWidth(81),
//     height: responsiveHeight(25),
//     position: 'relative',
//     jsuatifyContent: 'center',
//     alignItems: 'center',
//   },
//   camera: {
//     width: responsiveWidth(78),
//     height: responsiveHeight(24),
//     borderRadius: 4,
//     overflow: 'hidden',
//   },
//   leftTopIcon: {
//     position: 'absolute',
//     zIndex: 999,
//     top: -16,
//     left: -8,
//     transform: 'rotate(-45deg)',
//   },
//   leftBottomIcon: {
//     position: 'absolute',
//     zIndex: 999,
//     bottom: -10,
//     left: -8,
//     transform: 'rotate(224deg)',
//   },
//   rightTopIcon: {
//     position: 'absolute',
//     zIndex: 999,
//     top: -16,
//     right: -8,
//     transform: 'rotate(45deg)',
//   },
//   rightBottomIcon: {
//     position: 'absolute',
//     zIndex: 999,
//     bottom: -10,
//     right: -8,
//     transform: 'rotate(-224deg)',
//   },
//   bottomContainer: {
//     padding: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   textDesc: {
//     color: '#fff',
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   button: {
//     width: 50,
//     height: 50,
//     borderRadius: 100,
//     marginTop: 20,
//     backgroundColor: '#000013',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: 'white',
//   },
// });

// export default CardScan;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import CardScanner from 'rn-card-scanner';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const CardScan = () => {
  const navigation = useNavigation();
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [scannerKey, setScannerKey] = useState(Date.now());

  useEffect(() => {
    requestCameraPermission();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // When screen comes into focus, reset the scanner
      setScannerKey(Date.now());
      return () => {
        // Optional: Any cleanup logic can go here
      };
    }, []),
  );

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera to scan cards.',
            buttonPositive: 'OK',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission Denied',
            'Camera access is required for scanning.',
          );
        }
      } catch (err) {
        console.warn(err);
        Alert.alert(
          'Permission Error',
          'Something went wrong while requesting permission.',
        );
      }
    }
  };

  const toggleFlash = () => {
    setFlashEnabled(prev => !prev);
  };

  const handleManualScan = async () => {
    try {
      const result = await CardScanner.scanCard();
      if (result) {
        console.log('Scan result:', result);
        Alert.alert('Card Scanned', `Card Number: ${result.cardNumber}`);
      }
    } catch (err) {
      console.warn('Card scan failed', err);
      Alert.alert('Scan Failed', err.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <AntDesign name="close" size={24} color="#a0a0a0" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan card</Text>
        <TouchableOpacity onPress={toggleFlash}>
          <Entypo
            name="flash"
            size={24}
            color={flashEnabled ? '#ffd700' : '#a0a0a0'}
          />
        </TouchableOpacity>
      </View>

      {/* Card Scanner with resettable key */}
      <CardScanner
        key={scannerKey}
        style={styles.cardScanner}
        torch={flashEnabled}
        // frameColor="#ffd700"
        didCardScan={response => {
          console.log('Card info:', response);
          if (response?.cardNumber) {
            Alert.alert('Card Scanned', `Card Number: ${response.cardNumber}`);
            navigation.navigate('CARD_INFO', {
              cardInfo: response,
            });
          } else {
            Alert.alert('Scan Failed', 'Could not detect a valid card.');
          }
        }}
      />
      {/* <TouchableOpacity style={styles.button} onPress={han}>
        <AntDesign name="camerao" size={24} color="#D9D9D9" />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    top: 0,
  },
  headerTitle: {
    color: '#a0a0a0',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backBtn: {},
  cardScanner: {
    flex: 1,
    marginTop: 80,
  },
});

export default CardScan;
