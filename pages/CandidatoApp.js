import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from 'axios';



const CandidatoApp = () => {


  const insets = useSafeAreaInsets();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenV, setIsModalOpenV] = useState(false);
  const [candidatoSeleccionado, setCandidatoSeleccionado] = useState(null);
  const [listCandidatos, setListCandidatos] = useState([]);
  const [setLoading, loading] = useState(true);

  useEffect(() => {
    fetchCandidatos();
  }, []);

  const fetchCandidatos = async () => {
      try {
        const response = await axios.get('https://6znv4w6mgae4.share.zrok.io/api/candidatos/');
        setListCandidatos(response.data)
       
        set
      } catch (error) {
        console.log(error)
       
      }
  }

  
  


  const abrirModal = (candidato) => {
    setCandidatoSeleccionado(candidato);
    setIsModalOpen(true);
  };

  const votarPorCandidato = (candidatoId) => {
    try {
        
    } catch (error) {
      
    }
  };


  const setOpen = (value) => {
    setIsModalOpen(value);
  };

  const setOpen1 = (value) => {
    setIsModalOpenV(value);
  };

  


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Jornada Electoral</Text>
      </View>

      <View style={styles.content}>
        
        <FlatList
          data={listCandidatos}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.partido}</Text>
              </View>
              <View style={styles.cardContent}>
                <View style={styles.itemContainer}>
                  <Image source={{ uri: item.imgFoto }} style={styles.thumbnail} />
                  <Text style={styles.candidateName}>{item.candidato}</Text>
                </View>
                <TouchableOpacity style={styles.buttonOutline} onPress={() => abrirModal(item)}>
                  <Text style={styles.buttonText}>Detalle</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => votarPorCandidato(item._id)}  >
                  <Text style={styles.buttonText}>Votar</Text>
                </TouchableOpacity>
                
              </View>
            </View>
          )}
        />
      </View>

      <Modal visible={isModalOpen} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Propuesta</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setOpen(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <View>
              {candidatoSeleccionado && candidatoSeleccionado.propuestas.map((propuesta, index) => (
                <Text key={index} style={styles.propuestaText}>{propuesta.titulo}</Text>
              ))}
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={isModalOpenV} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Encuestas</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setOpen1(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <View style={styles.chartContainer}>
              {/* Suponiendo que tienes un componente de gráfico adecuado */}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#6200ea',
    padding: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 8,
    marginVertical: 10,
    padding: 20,
  },
  cardHeader: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContent: {
    flexDirection: 'column',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  candidateName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#6200ea',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonOutline: {
    borderColor: '#6200ea',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonRound: {
    backgroundColor: '#ff1744',
    padding: 10,
    borderRadius: 50,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#6200ea',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
  },
  propuestaText: {
    fontSize: 16,
    marginVertical: 5,
  },
  chartContainer: {
    alignItems: 'center',
    width: '100%',
  },
});

export default CandidatoApp;

