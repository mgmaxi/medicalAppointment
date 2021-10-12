import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';

const Appointment = ({item, deletePatient}) => {
  return (
    <View style={styles.appointment}>
      <View>
        <Text style={styles.label}>Patient</Text>
        <Text style={styles.text}>{item.patient}</Text>
      </View>
      <View>
        <Text style={styles.label}>Doctor</Text>
        <Text style={styles.text}>{item.doctor}</Text>
      </View>
      <View>
        <Text style={styles.label}>Symptom</Text>
        <Text style={styles.text}>{item.symptom}</Text>
      </View>

      <View>
        <TouchableHighlight
          onPress={() => deletePatient(item.id)}
          style={styles.btnDelete}>
          <Text style={styles.textDelete}>Eliminar</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appointment: {
    marginTop: 5,
    marginHorizontal: '2.5%',
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    borderBottomColor: '#e1e1e1',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRadius: 2,
  },
  label: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    fontSize: 18,
  },
  btnDelete: {
    marginHorizontal: '35%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FF0000',
  },
  textDelete: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Appointment;
