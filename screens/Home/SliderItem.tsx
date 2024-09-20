import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {ItemType} from './Data';
import {getFontFamily} from '../../assets/fonts/helper';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import ArrowDown from '../../assets/images/Home/ArrowDown.svg';
import ArrowUp from '../../assets/images/Home/ArrowUp.svg';

type Props = {
  item: ItemType;
  index: number;
  scrollX: SharedValue<number>;
  setSelectedOptions: (options: {title: string; selected: string}[]) => void;
};

const width = Dimensions.get('window').width;

const SliderItem = ({item, index, scrollX, setSelectedOptions}: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedTemperature, setSelectedTemperature] = useState('37');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    // Update the selected options state whenever an option is selected
    if (selectedOption || selectedTemperature) {
      setSelectedOptions((prevOptions: {title: string; selected: string}[]) => [
        ...prevOptions.filter(opt => opt.title !== item.title),
        {title: item.title, selected: selectedOption || selectedTemperature},
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption, selectedTemperature]);

  const rnAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.22, 0, width * 0.22],
            Extrapolation.CLAMP,
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.85, 1, 0.85],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const renderChoices = () => {
    if (item.type === 'dropdown') {
      return (
        <View style={styles.pickerContainer}>
          <TouchableOpacity
            style={styles.dropdownHeader}
            onPress={toggleDropdown}>
            <Text style={styles.choices}>Choose your temperature</Text>
            <Text style={styles.selectedTemperature}>
              {selectedTemperature} °C
            </Text>
            {dropdownVisible ? (
              <ArrowUp width={24} height={24} />
            ) : (
              <ArrowDown width={24} height={24} />
            )}
          </TouchableOpacity>

          {dropdownVisible && (
            <View style={styles.pickerOptions}>
              <Picker
                selectedValue={selectedTemperature}
                onValueChange={value => {
                  setSelectedTemperature(value);
                  setDropdownVisible(false);
                }}
                style={styles.picker}>
                <Picker.Item label="34 °C" value="34" />
                <Picker.Item label="34.50 °C" value="34.50" />
                <Picker.Item label="35 °C" value="35" />
                <Picker.Item label="35.5 °C" value="35.5" />
                <Picker.Item label="36 °C" value="36" />
                <Picker.Item label="36.5 °C" value="36.5" />
                <Picker.Item label="37 °C" value="37" />
                <Picker.Item label="37.5 °C" value="37.5" />
                <Picker.Item label="38 °C" value="38" />
                <Picker.Item label="38.5 °C" value="38.5" />
                <Picker.Item label="39 °C" value="39" />
              </Picker>
            </View>
          )}
        </View>
      );
    } else {
      return item.options?.map(option => (
        <TouchableOpacity
          key={option}
          style={styles.radioContainer}
          onPress={() => setSelectedOption(option)}>
          <Text style={styles.choices}>{option}</Text>
          <View
            style={[
              styles.radioButtonOuter,
              selectedOption === option && styles.radioButtonSelected,
            ]}>
            {selectedOption === option && (
              <View style={styles.radioButtonInner} />
            )}
          </View>
        </TouchableOpacity>
      ));
    }
  };

  return (
    <Animated.View style={[styles.itemContainer, rnAnimatedStyles]}>
      <View style={styles.item}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style={styles.choiceContainer}>
          {item.subtitle && (
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          )}
          {renderChoices()}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    width: width,
    marginTop: 80,
  },
  item: {
    height: 465,
    width: width,
    paddingHorizontal: 40,
  },
  titleContainer: {
    backgroundColor: '#FF8533',
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 8,
    justifyContent: 'flex-start',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 15,
    fontFamily: getFontFamily(600, ''),
  },
  choiceContainer: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 400,
    elevation: 5,
  },
  subtitle: {
    color: '#818181',
    fontSize: 15,
    fontFamily: getFontFamily(600, ''),
    paddingLeft: 15,
    paddingTop: 10,
  },
  choices: {
    color: '#000',
    fontSize: 13,
    fontFamily: getFontFamily(500, ''),
    borderColor: '#D9D9D9',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: '#D9D9D9',
  },
  radioButtonOuter: {
    height: 18,
    width: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF9800',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioButtonSelected: {
    borderColor: '#FF9800',
  },
  radioButtonInner: {
    height: 9,
    width: 9,
    borderRadius: 5,
    backgroundColor: '#FF9800',
  },
  pickerContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: '#D9D9D9',
  },
  dropdownHeaderText: {
    fontSize: 16,
    fontFamily: getFontFamily(500, ''),
    color: '#000',
  },
  selectedTemperature: {
    fontSize: 15,
    fontFamily: getFontFamily(700, ''),
    textAlign: 'center',
    color: '#2E2E2E',
  },
  pickerOptions: {
    marginTop: 10,
  },
  picker: {
    height: 150, // This makes the dropdown bigger
  },
});

export default SliderItem;
