import React, {useState} from 'react';
import {
  View,
  Text,
  Alert,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
// import 'moment/locale/es'; for spanish date
import shortid from 'shortid';

const Form = ({appointments, setAppointments, setShowForm}) => {
  // States for Inputs
  const [patient, setPatient] = useState('');
  const [doctor, setDoctor] = useState('');
  const [telephone, setTelephone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [symptom, setSymptom] = useState('');

  // States for Picker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  // Date Picker Set Up
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const dateConfirm = date => {
    // moment.locale('es'); for spanish date
    setDate(moment(date).format('LL'));
    hideDatePicker();
  };

  // Time Picker Set Up
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const timeConfirm = time => {
    setTime(moment(time).format('LT'));
    hideTimePicker();
  };

  // Create New Appointment
  const createNewAppointment = () => {
    if (
      // Validation
      patient.trim() === '' ||
      doctor.trim() === '' ||
      telephone.trim() === '' ||
      date.trim() === '' ||
      time.trim() === '' ||
      symptom.trim() === ''
    ) {
      // Fail Validation
      showAlert();
      return;
    }

    // Create New Appointment
    const appointment = {patient, doctor, telephone, date, time, symptom};
    appointment.id = shortid.generate();
    const newAppointment = [...appointments, appointment];

    // Set the appointment on the State
    setAppointments(newAppointment);

    // Close Form
    setShowForm(false);
  };

  // Alert for fail validation
  const showAlert = () => {
    Alert.alert('Error', 'All fields are required', [{text: 'OK'}]);
  };

  // Separator
  const Separator = () => <View style={styles.separator} />;

  return (
    <>
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.label}>Patient:</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setPatient(text)}
          />
        </View>
        <View>
          <Text style={styles.label}>Doctor:</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setDoctor(text)}
          />
        </View>
        <View>
          <Text style={styles.label}>Telephone:</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setTelephone(text)}
            keyboardType="numeric"
          />
        </View>
        <View>
          <View style={styles.containerDateTime}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.textDateTime}>{date}</Text>
          </View>
          <View style={styles.btnDateTime}>
            <Button title="Select a Date" onPress={showDatePicker} />
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={dateConfirm}
            onCancel={hideDatePicker}
            headerTextIOS="Select a Date"
            cancelTextIOS="Cancel"
            confirmTextIOS="OK"
          />
        </View>
        <View>
          <View style={styles.containerDateTime}>
            <Text style={styles.label}>Time:</Text>
            <Text style={styles.textDateTime}>{time}</Text>
          </View>
          <View style={styles.btnDateTime}>
            <Button title="Select a Time" onPress={showTimePicker} />
          </View>
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={timeConfirm}
            onCancel={hideTimePicker}
            headerTextIOS="Select a Time"
            cancelTextIOS="Cancel"
            confirmTextIOS="OK"
            is24Hour
          />
        </View>
        <View>
          <Text style={styles.label}>Symptom:</Text>
          <TextInput
            style={styles.inputMultiline}
            onChangeText={text => setSymptom(text)}
            multiline
          />
        </View>
        <Separator />
        <View>
          <TouchableHighlight
            onPress={() => createNewAppointment()}
            style={styles.btnSubmit}>
            <Text style={styles.textSubmit}>Create New Appointment</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: '2.5%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  label: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    marginTop: 10,
    height: 40,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
  },
  inputMultiline: {
    marginTop: 10,
    height: 80,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
  },
  containerDateTime: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  textDateTime: {
    marginTop: 24,
    marginLeft: 10,
    fontSize: 14,
  },
  btnDateTime: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  separator: {
    marginTop: 10,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textSubmit: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  btnSubmit: {
    marginVertical: 10,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
});

export default Form;
