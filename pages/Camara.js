import { CameraView } from "expo-camera";
import { Alert, Button, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useRef } from "react";

const CameraApp = (props) => {
    const { scanned, setScanned, setImage } = props;
    const cameraRef = useRef(null);

    const handleTakePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setImage(photo.uri);
            setScanned(true);
        }
    };

    return (
        <View style={styles.cameraContainer}>
            <CameraView
                ref={cameraRef}
                style={styles.camera}
                facing={"back"}
            >
               
            </CameraView>
            <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
                        <Text style={styles.buttonText}>Tomar Foto</Text>
                    </TouchableOpacity>
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cameraContainer: {
        width: '95%',
        borderRadius: 1,
        marginBottom: 30,
        overflow: 'hidden',
        flex:1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 1,
        padding: 15,
        margin: 90,
        marginTop: 5,
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#000',
    },
});

export default CameraApp;
