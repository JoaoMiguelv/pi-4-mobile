import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, TouchableOpacity, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import DatePicker from 'react-native-date-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

const Main = () => {
  const [selectedOption, setSelectedOption] = useState('hourly');
  const [chartData, setChartData] = useState(null);
  const [chartVisible, setChartVisible] = useState(false);

  const now = new Date();
  now.setHours(now.getHours() - 3);

  const [date, setDate] = useState(now)
  const [open, setOpen] = useState(false)
  const formattedDate = date ? date.toDateString() : 'Selecione a data';

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = async () => {
    console.log('Selected Date:', date);
    console.log('Selected Option:', selectedOption);

    const dateYMD = date.toISOString().slice(0, 10);

    console.log('Selected Date', dateYMD);
    // const token = await AsyncStorage.getItem('token');
    // const headersList = {
    //   "Accept": "*/*",
    //   "Content-Type": "application/json",
    //   "Authorization": `Bearer ${token}`
    // }

    // const response = api.get(`/products/1/consumption?type={selectedOption}&date=${dateYMD}`, headersList);
    // console.log('Response:', response);

    const resultMock = {
      consumptionInKw: {
        data: [79, 12, 45, 64, 92, 30, 57, 81, 9, 37, 68, 23, 98, 51, 76],
        averag: 15,
        mode: 10
      },

      consumptionInMoney: {
        data: [79, 12, 45, 64, 92, 30, 57, 81, 9, 37, 68, 23, 98, 51, 76],
        averag: 15,
        mode: 10
      }
    }

    //console.log('Response:', resultMock);

    setChartVisible(true);
    setChartData(resultMock.consumptionInKw.data);

  };

  const options = [
    {
      label: 'Por hora',
      value: 'hourly',
    },
    {
      label: 'Por dia',
      value: 'daily',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.calendar}>
          <Button title={formattedDate} onPress={() => setOpen(true)} />
          <DatePicker
            modal
            open={open}
            date={date}
            mode="date"
            onConfirm={(date) => {
              setOpen(false)
              setDate(date)
            }}
            onCancel={() => {
              setOpen(false)
            }}
          />
        </View>

        <View style={[styles.optionsContainer, styles.horizontalOptionsContainer]}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionButton,
                selectedOption === option.value && styles.selectedOptionButton,
                index < options.length - 1 && { marginRight: 60 },
              ]}
              onPress={() => handleOptionChange(option.value)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedOption === option.value && styles.selectedOptionText,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Buscar" onPress={handleSubmit} />
      </View>

      <View style={styles.chartContainer}>
        {chartData && (
          <LineChart
            data={{
              labels: chartData.map((_, index) => String(index + 1)),
              datasets: [
                {
                  data: chartData,
                  color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                  strokeWidth: 2,
                },
              ],
            }}
            width={380}
            height={200}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },
  topContainer: {
    width: '80%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  optionsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  horizontalOptionsContainer: {
    flexDirection: 'row',
  },
  optionButton: {
    padding: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
  },
  selectedOptionButton: {
    backgroundColor: 'blue',
  },
  optionText: {
    fontSize: 16,
  },
  selectedOptionText: {
    color: 'white',
  },
  buttonContainer: {
    width: '80%',
    marginTop: 8,
    marginBottom: 16
  },
  chartContainer: {
    marginTop: 16,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  calendar: {
    width: '100%',
    marginTop: 8,
    marginBottom: 16,
  }
});

export default Main;
