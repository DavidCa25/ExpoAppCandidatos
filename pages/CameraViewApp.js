import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRoute, useNavigation } from '@react-navigation/native';
import CameraApp from "./Camara";
import { useState } from "react";

const CameraViewApp = () => {
    const insets = useSafeAreaInsets();
    const route = useRoute();
    const navigation = useNavigation();
    const { setImage } = route.params;
    const [scanned, setScanned] = useState(false);

    const handleReturn = () => {
        navigation.goBack();
    };

    return (
        <View
            style={{
                flex: 1,
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text style={styles.title}>Bienvenido al Scanner de QR</Text>
            <CameraApp scanned={scanned} setScanned={setScanned} setImage={setImage} />
            <TouchableOpacity
                style={styles.button}
                onPress={handleReturn}
            >
                <Text style={styles.buttonText}>Regresar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        marginBottom: 20
    },
    button: {
        marginBottom: 40,
        backgroundColor: 'gray',
        borderRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 1,
        height: '9%',
        width: '35%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    }
});

export default CameraViewApp;
