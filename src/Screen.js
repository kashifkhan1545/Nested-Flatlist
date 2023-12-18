// src/Screen.js

import React from 'react';
import { SafeAreaView, FlatList, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setExpandedItems } from './slices/dataSlice';

const Screen = () => {
  const dispatch = useDispatch();
  const expandedItems = useSelector((state) => state.data.expandedItems);


    const data = [
        {
            "id": 1,
            "title": "Item 1",
            "subItems": [
                {
                    "id": 11,
                    "title": "Subitem 1.1",
                    "subItems": [
                        {
                            "id": 111,
                            "title": "Subitem 1.1.1",
                            "subItems": []
                        },
                        {
                            "id": 112,
                            "title": "Subitem 1.1.2",
                            "subItems": []
                        }
                    ]
                },
                {
                    "id": 12,
                    "title": "Subitem 1.2",
                    "subItems": []
                }
            ]
        },
        {
            "id": 2,
            "title": "Item 2",
            "subItems": [
                {
                    "id": 21,
                    "title": "Subitem 2.1",
                    "subItems": [
                        {
                            "id": 35, 
                            "title": "Subitem 2.1.1",
                            "subItems": []
                        },
                        {
                            "id": 36, 
                            "title": "Subitem 2.1.2",
                            "subItems": []
                        }
                    ]
                },
                {
                    "id": 22,
                    "title": "Subitem 2.2",
                    "subItems": []
                }
            ]
        },
        {
            "id": 3,
            "title": "Item 3",
            "subItems": [

                {
                    "id": 25,
                    "title": "Subitem 3.1",
                    "subItems": []
                }
            ]
        },

        {
            "id": 10,
            "title": "Item 4",
            "subItems": [

                {
                    "id": 29,
                    "title": "Subitem 4.1",
                    "subItems": [
                        {
                            "id": 30,
                            "title": "Subitem 4.1.1",
                            "subItems": []
                        }

                    ]
                }
            ]
        },
        {
            "id": 15,
            "title": "Item 5",
            "subItems": [

                {
                    "id": 29,
                    "title": "Subitem 5.1",
                    "subItems": [
                        {
                            "id": 30,
                            "title": "Subitem 5.1.1",
                            "subItems": []
                        }

                    ]
                }
            ]
        },
        {
            "id": 27,
            "title": "Item 6",
            "subItems": [

                {
                    "id": 29,
                    "title": "Subitem 6.1",
                    "subItems": [
                        {
                            "id": 30,
                            "title": "Subitem 6.1.1",
                            "subItems": []
                        }

                    ]
                }
            ]
        },
        {
            "id": 13,
            "title": "Item 7",
            "subItems": [

                {
                    "id": 63,
                    "title": "Subitem 7.1",
                    "subItems": [
                        {
                            "id": 50,
                            "title": "Subitem 7.1.1",
                            "subItems": []
                        }

                    ]
                }
            ]
        },
    ];

    const toggleItem = (itemId, subItems) => {
      const isItemExpanded = expandedItems.includes(itemId);
    
      // If the item is already expanded, collapse it; otherwise, expand it
      const payload = isItemExpanded ? [] : [itemId];
    
      // If the item is not expanded and has subitems, expand all subitems
      if (!isItemExpanded && subItems && subItems.length > 0) {
        const subItemIds = subItems.map((subItem) => subItem.id);
        payload.push(...subItemIds);
      }
    
      dispatch(setExpandedItems(payload));
    };
    

    
  
    const expandAllSubitems = (itemId, subItems) => {
      const itemIdsToExpand = [];
  
      const traverseSubitems = (items) => {
        items.forEach((item) => {
          itemIdsToExpand.push(item.id);
          if (item.subItems.length > 0) {
            traverseSubitems(item.subItems);
          }
        });
      };
  
      traverseSubitems(subItems);
  
      dispatch(setExpandedItems(itemIdsToExpand));
    };
  
    const renderItems = ({ item: parentItem }) => (
      
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => toggleItem(parentItem.id, parentItem.subItems)}>
          <Text style={[styles.itemText, { color: expandedItems.includes(parentItem.id) ? 'black' : '#3498DB' }]}>
            {parentItem.title}
          </Text>
        </TouchableOpacity>
        {expandedItems.includes(parentItem.id) && parentItem.subItems.length > 0 && (
          <View style={styles.subItemContainer}>
            <FlatList
              data={parentItem.subItems}
              keyExtractor={(subItem) => subItem.id.toString()}
              renderItem={({ item: subItem }) => renderSubItem(subItem)}
            />
          </View>
        )}
      </View>
    );
    
  
    const renderSubItem = (subItem) => (
      <View style={styles.subItemContainer}>
        <TouchableOpacity onPress={() => toggleItem(subItem.id, subItem.subItems)}>
          <Text style={styles.subItemText}>{subItem.title}</Text>
        </TouchableOpacity>
        {expandedItems.includes(subItem.id) && subItem.subItems.length > 0 && (
          <View style={styles.subItemContainer}>
            <FlatList
              data={subItem.subItems}
              keyExtractor={(subItem) => subItem.id.toString()}
              renderItem={({ item: nestedSubItem }) => renderSubItem(nestedSubItem)}
            />
          </View>
        )}
      </View>
    );
    
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.additionalText}>Nested FlatList Using Redux</Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItems}
          />
        </View>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    contentContainer: {
      flex: 1,
      padding: 10,
    },
    itemContainer: {
      marginLeft: 20,
      marginBottom: 5,
      backgroundColor: '#F5F5F5',
    },
    subItemContainer: {
      marginLeft: 40,
      marginBottom: 5,
      backgroundColor: '#ffff',
    },
    itemText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#3498DB',
    },
    subItemText: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'black',
    },
    additionalText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      color: 'black',
    },
  });
  
  export default Screen;