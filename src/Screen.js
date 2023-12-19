// src/Screen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setExpandedItems, addData } from './slices/dataSlice';

const Screen = () => {
  const data = useSelector((state) => state.data.data);
  const expandedItems = useSelector((state) => state.data.expandedItems);
  const dispatch = useDispatch();

  // State to manage modal visibility, entered text, and selected item
  const [isModalVisible, setModalVisible] = useState(false);
  const [enteredText, setEnteredText] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedItemId(null);
  };

  const handleSaveModal = () => {
    if (enteredText.trim() !== '' && selectedItemId !== null) {
      // Dispatch action to add data to the selected item
      dispatch(addData({ id: selectedItemId, text: enteredText }));

      // Close the modal
      handleCloseModal();
    }
  };

  const handleItemClick = (itemId) => {
    const isItemExpanded = expandedItems.includes(itemId);
    const updatedExpandedItems = isItemExpanded
      ? expandedItems.filter((id) => id !== itemId)
      : [...expandedItems, itemId];

    dispatch(setExpandedItems(updatedExpandedItems));
  };

  const renderItem = ({ item }) => {
    const isItemExpanded = expandedItems.includes(item.id);
  
    return (
      <View style={[styles.itemContainer, isItemExpanded && styles.expandedItem]}>
        <TouchableOpacity onPress={() => handleItemClick(item.id)}>
          <Text style={styles.itemText}>{item.title}</Text>
        </TouchableOpacity>
  
        {/* Add button for each main item */}
        <TouchableOpacity
          onPress={() => {
            setSelectedItemId(item.id);
            setModalVisible(true);
          }}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
  
        {isItemExpanded && item.subItems.length > 0 && (
          <FlatList
            data={item.subItems}
            keyExtractor={(subItem) => subItem.id.toString()}
            renderItem={({ item: subItem }) => renderItem({ item: subItem })}
            style={styles.subItemList}
          />
        )}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>FlatList With Redux</Text>

      {/* MainList */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={styles.mainList}
      />

      {/* Modal */}
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
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
    color:'black',
  },
  mainList: {
    alignSelf: 'center', 
    marginTop: 20, 
    width: 260,
  },
  itemContainer: {
    padding: 10,
    margin: 5,
    backgroundColor: '#3498db', // Main item color
    borderRadius: 5,
  },
  expandedItem: {
    backgroundColor: '#2ecc71', // Subitem color
  },
  itemText: {
    color: 'white',
  },
  subItemList: {
    marginLeft: 10,
    marginTop:15, // Indent subitems
  },
  addButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
  },

  // Modal styles
  modalContainer: {
    top:80,
    width: '80%',
    height:'30%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    left:38,
  },
  modalTextInput: {
    borderWidth:1,
    marginBottom: 20,
    width: 200,
    borderRadius:18,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
});

export default Screen;
