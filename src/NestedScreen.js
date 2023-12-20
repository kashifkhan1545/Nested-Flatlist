// src/NestedScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addData, deleteItem } from './slices/dataSlice';

const NestedScreen = ({ route }) => {
  const { itemId } = route.params;
  const dispatch = useDispatch();
  const item = useSelector((state) => state.data.data.find((mainItem) => mainItem.id === itemId));

  const [isModalVisible, setModalVisible] = useState(false);
  const [enteredText, setEnteredText] = useState('');

  const handleDeleteItem = (itemId) => {
    dispatch(deleteItem(itemId));
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSaveModal = () => {
    if (enteredText.trim() !== '') {
      dispatch(addData({ id: itemId, text: enteredText }));
    }
    handleCloseModal();
  };

  const renderNestedItem = ({ item, index }) => {
    return (
      <View style={styles.nestedItemContainer}>
        <View style={styles.itemContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={() => handleDeleteItem(item.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>Del</Text>
            </TouchableOpacity>
          </View>
        </View>

        {item.subItems && item.subItems.length > 0 && renderNestedSubitems(item.subItems)}
      </View>
    );
  };

  const renderNestedSubitems = (subitems) => {
    return (
      <View style={styles.nestedSubitemsContainer}>
        <FlatList
          data={subitems}
          keyExtractor={(subItem) => subItem.id.toString()}
          renderItem={renderNestedItem}
          style={styles.mainList}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Subitems</Text>
      <View style={styles.addButtonContainer}>
        {/* Add button below the text "subitems" */}
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {/* Nested FlatList */}
      <FlatList
        data={item.subItems}
        keyExtractor={(subItem) => subItem.id.toString()}
        renderItem={renderNestedItem}
        style={styles.mainList}
      />

      {/* Modal */}
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
    top: 140,
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
    backgroundColor: '#3498db',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nestedItemContainer: {
    marginLeft: 5,
  },
  nestedSubitemsContainer: {
    marginLeft: -5,
  },
  itemText: {
    color: 'white',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  deleteButtonText: {
    color: 'white',
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width:240,
    
  },
  addButtonText: {
    color: 'white',
    textAlign:'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
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
  addButtonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
});

export default NestedScreen;
