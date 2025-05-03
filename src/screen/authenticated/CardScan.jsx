import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Modal,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import PhotoManipulator from 'react-native-photo-manipulator';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
// import ImageSize from 'react-native-image-size';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const FRAME_WIDTH = SCREEN_WIDTH * 0.9;
const FRAME_HEIGHT = FRAME_WIDTH * 0.64;
const FRAME_X = (SCREEN_WIDTH - FRAME_WIDTH) / 2;
const FRAME_Y = (SCREEN_HEIGHT - FRAME_HEIGHT) / 2;

export default function CardScanner() {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [croppedImageUri, setCroppedImageUri] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const devices = useCameraDevices();
  const device = devices.back ?? devices.find(d => d.position === 'back');

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermission();

      if (cameraPermission === 'granted') {
        setHasPermission(true);
      }
    })();
  }, []);

  const takePhotoAndCrop = async () => {
    try {
      const photo = await cameraRef.current.takePhoto({
        qualityPrioritization: 'quality',
        flash: 'off',
      });

      const fullImageUri = `file://${photo.path}`;

      // 🔁 Set based on actual photo output resolution (you can log it once and reuse)
      const imgWidth = Dimensions.get('window').width;
      const imgHeight = Dimensions.get('window').height;

      const scaleX = imgWidth / SCREEN_WIDTH;
      const scaleY = imgHeight / SCREEN_HEIGHT;

      const cropX = (imgWidth - cropWidth) / 2;
      const cropY = (imgHeight - cropHeight) / 2;
      const cropWidth = 400;
      const cropHeight = 300;

      const croppedUri = await PhotoManipulator.crop(fullImageUri, {
        x: cropX,
        y: cropY,
        width: cropWidth,
        height: cropHeight,
      });

      setCroppedImageUri(fullImageUri);
      setModalVisible(true);
    } catch (error) {
      console.error('Photo crop failed:', error);
    }
  };

  if (!device || !hasPermission) {
    return (
      <View style={styles.centered}>
        <Text style={{color: 'white'}}>Waiting for camera access...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />

      {/* <View style={styles.frameOverlay}>
        <View style={styles.frameBox} />
      </View> */}
      {/* Overlay UI */}
      <View style={styles.overlayContainer}>
        <View style={styles.overlayTop} />
        <View style={styles.middleRow}>
          <View style={styles.overlaySide} />
          <View style={styles.scanFrame} />
          <View style={styles.overlaySide} />
        </View>
        <View style={styles.overlayBottom} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <AntDesign name="close" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Scan Card</Text>
        <TouchableOpacity onPress={() => setTorchOn(!torchOn)}>
          <Entypo name="flash" size={22} color={'#fff'} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.captureButton} onPress={takePhotoAndCrop}>
        <Text>Scan</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          {croppedImageUri && (
            <Image
              source={{uri: croppedImageUri}}
              style={styles.previewImage}
              resizeMode="cover"
            />
          )}
          <View style={styles.modalButtons}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.modalBtn}>
              <Text style={styles.modalBtnText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // Save or upload logic goes here
                setModalVisible(false);
              }}
              style={styles.modalBtnConfirm}>
              <Text style={styles.modalBtnText}>Use Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  centered: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  frameOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //   frameBox: {
  //     width: FRAME_WIDTH,
  //     height: FRAME_HEIGHT,
  //     borderColor: '#00ffcc',
  //     borderWidth: 2,
  //     borderRadius: 8,
  //   },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayTop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  middleRow: {
    flexDirection: 'row',
    height: FRAME_HEIGHT,
  },
  overlaySide: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  scanFrame: {
    width: FRAME_WIDTH,
    height: FRAME_HEIGHT,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#00FFAA',
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 20,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  bottom: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  instruction: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  captureButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#333',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: SCREEN_WIDTH * 0.9,
    height: (FRAME_HEIGHT / FRAME_WIDTH) * SCREEN_WIDTH * 0.9,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  modalBtn: {
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 8,
  },
  modalBtnConfirm: {
    padding: 10,
    backgroundColor: '#0f0',
    borderRadius: 8,
  },
  modalBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
