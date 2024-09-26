import React, {useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import Slider from './Slider';
import CustomButton from '../../component/customButton';
import CustomTitle from '../../component/customTitle';
import {Item} from './Data';
import {setOptions} from '../../reducers/slices/optionSlice';

const Carousel2 = () => {
  const selected = useSelector(state => state.options);
  const [selectedOptions, setSelectedOptions] = useState<
    {title: string; selected: string}[]
  >(selected.selectedOptions);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();

  const {index} = route.params;

  const handleDone = () => {
    // Dispatch selected options to Redux
    dispatch(setOptions(selectedOptions));
    navigation.navigate('CycleJournal');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <CustomTitle
        goBack={true}
        customStyle={styles.title}
        title={index >= 3 ? 'Other Statistics' : 'Menstrual period'}
      />
      <View style={{flex: 0.95}}>
        <Slider
          itemList={Item}
          setSelectedOptions={setSelectedOptions}
          initialIndex={index}
        />
      </View>
      <CustomButton
        customStyle={styles.done}
        title={'Done'}
        onPress={handleDone}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  done: {
    position: 'absolute',
    width: 120,
    bottom: 40,
  },
  title: {
    flex: 0.05,
  },
});

export default Carousel2;
