import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';

const IneApp = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [frontImage, setFrontImage] = useState(null);
    const [backImage, setBackImage] = useState(null);

    const handleVerify = () => {
        if (frontImage && backImage) {
            navigation.navigate('CandidatoVotar');
        } else {
            alert("Por favor, toma ambas fotos antes de continuar.");
        }
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
            <Text style={styles.title}>INE FRONTAL</Text>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navigation.navigate('CameraViewApp', { setImage: setFrontImage })}
            >
                {frontImage ? <Image source={{ uri: frontImage }} style={styles.image} /> : <Text style={styles.buttonText}>Tomar Foto</Text>}
            </TouchableOpacity>

            <Text style={styles.title}>INE TRASERA</Text>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navigation.navigate('CameraViewApp', { setImage: setBackImage })}
            >
                {backImage ? <Image source={{ uri: backImage }} style={styles.image} /> : <Text style={styles.buttonText}>Tomar Foto</Text>}
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleVerify}>
                <Text style={styles.buttonText}>Verificar</Text>
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
        backgroundColor: '#6200ea',
        padding: 10,
        borderRadius: 8,
        marginVertical: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    buttonContainer: {
        width: '90%',
        height: '20%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    }
});

export default IneApp;
