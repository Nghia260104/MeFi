import React, {useRef, useState} from 'react';
import {Pressable, TextInput, StyleSheet, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {horizontalScale, scaleFontSize} from '../assets/styles/scaling';
import {getFontFamily} from '../assets/fonts/helper';

const Search = props => {
  const textInputRef = useRef(null);
  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    textInputRef.current.focus();
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSearch = searchValue => {
    setSearch(searchValue);
    //props.onSearch(searchValue);
  };

  const handleClear = () => {
    setSearch('');
    textInputRef.current.focus();
  };

  return (
    <Pressable style={styles.searchInputContainer} onPress={handleFocus}>
      {!isFocused && (
        <FontAwesomeIcon
          icon={faSearch}
          color={'#8E95A2'}
          size={scaleFontSize(20)}
        />
      )}
      <TextInput
        ref={textInputRef}
        style={styles.searchInput}
        value={search}
        placeholder="Search"
        onChangeText={value => handleSearch(value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {isFocused && search !== '' && (
        <Pressable onPress={handleClear}>
          <FontAwesomeIcon
            icon={faTimes}
            color={'#8E95A2'}
            size={scaleFontSize(20)}
          />
        </Pressable>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    flex: 1,
    height: '100%',
    fontFamily: getFontFamily(400, ''),
    fontSize: scaleFontSize(13),
    color: '#8E95A2',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(25),
    backgroundColor: '#EDEEF1',
    borderRadius: horizontalScale(15),
    gap: horizontalScale(5),
  },
});

export default Search;
