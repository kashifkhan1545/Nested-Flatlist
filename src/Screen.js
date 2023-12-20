// src/Screen.js
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addData, deleteItem } from './slices/dataSlice';
import { useNavigation } from '@react-navigation/native';

const Screen = () => {
  const data = useSelector((state) => state.data.data);
  const expandedItems = useSelector((state) => state.data.expandedItems);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);
  const [enteredText, setEnteredText] = useState('');

  const handleDeleteItem = (itemId) => {
    dispatch(deleteItem(itemId));
  };

  const handleItemClick = (itemId) => {
    navigation.navigate('Nested', { itemId });
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setEnteredText('');
  };

  const handleSaveModal = () => {
    if (enteredText.trim() !== '') {
      // Dispatch the action to add data to the main flatlist
      dispatch(addData({ id: null, text: enteredText }));
    }
    handleCloseModal();
  };

  const renderItem = ({ item }) => {
    const isItemExpanded = expandedItems.includes(item.id);

    return (
      <View style={[styles.itemContainer, isItemExpanded && styles.expandedItem]}>
        <TouchableOpacity onPress={() => handleItemClick(item.id)}>
          <Text style={styles.itemText}>{item.title}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleDeleteItem(item.id)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Del</Text>
        </TouchableOpacity>

        {isItemExpanded && item.subItems.length > 0 && (
          <FlatList
            data={item.subItems}
            keyExtractor={(subItem) => subItem.id.toString()}
            renderItem={({ item: subItem }) => <Text>{subItem.title}</Text>}
            style={styles.subItemList}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>FlatList With Redux</Text>

      <View style={styles.addButtonContainer}>
        <TouchableOpacity onPress={handleOpenModal} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={styles.mainList}
      />

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.modalTextInput}
              placeholder="Enter text..."
              onChangeText={(text) => setEnteredText(text)}
            />
            <View style={styles.modalButtonContainer}>
              <Button title="Save" onPress={handleSaveModal} />
              <Button title="Close" onPress={handleCloseModal} />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
  mainList: {
    alignSelf: 'center',
    marginTop: 20,
    width: 260,
  },
  itemContainer: {
    padding: 6,
    margin: 5,
    backgroundColor: '#3498db', // Main item color
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expandedItem: {
    backgroundColor: '#2ecc71', // Subitem color
  },
  itemText: {
    color: 'white',
  },
  subItemList: {
    marginLeft: -7,
    marginTop: 15, // Indent subitems
  },
  deleteButton: {
    backgroundColor: 'red', // Change the color as desired
    padding: 10,
    borderRadius: 5,
    marginLeft: 85,
  },
  deleteButtonText: {
    color: 'white',
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width: 250, // Increase the width as needed
    marginTop:10,
  },
  addButtonText: {
    color: 'white',
    textAlign:'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTextInput: {
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default Screen;
