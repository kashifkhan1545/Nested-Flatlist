import React, { useState } from 'react';
import { SafeAreaView, FlatList, Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const Screen = () => {
    const [expandedItems, setExpandedItems] = useState([]);

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

    const toggleItem = (itemId) => {
        setExpandedItems((prevExpandedItems) => {
            if (prevExpandedItems.includes(itemId)) {
                return prevExpandedItems.filter((id) => id !== itemId);
            } else {
                return [...prevExpandedItems, itemId];
            }
        });
    };

    const renderItems = ({ item }) => (
        
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => toggleItem(item.id)}>
                <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
            {expandedItems.includes(item.id) && item.subItems.length > 0 && (
                <FlatList
                    data={item.subItems}
                    keyExtractor={(subItem) => subItem.id.toString()}
                    renderItem={renderSubItems}
                />
            )}
        </View>
    );

    const renderSubItems = ({ item }) => (
        <View style={styles.subItemContainer}>
            <TouchableOpacity onPress={() => toggleItem(item.id)}>
                <Text style={styles.subItemText}>{item.title}</Text>
            </TouchableOpacity>
            {expandedItems.includes(item.id) && item.subItems.length > 0 && (
                <FlatList
                    data={item.subItems}
                    keyExtractor={(subItem) => subItem.id.toString()}
                    renderItem={renderSubItems}
                />
            )}
        </View>
    );

    return (
       
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
            <Text style={styles.additionalText}>Nested FlatList</Text>
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
        textAlign:'center',
        color: 'black', 
    },
});

export default Screen;