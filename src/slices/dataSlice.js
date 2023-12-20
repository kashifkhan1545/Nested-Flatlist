// src/slices/dataSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { ActionTypes } from '../constants';

// Move the JSON data into the initial state
const initialState = {
  expandedItems: [],
  data: [
    {
      "id": 1,
      "title": "Item 1",
      "subItems": [
          {
              "id": 2,
              "title": "Subitem 1.1",
              
              "subItems": [
                  {
                      "id": 3,
                      "title": "Subitem 1.1.1",
                      "subItems": []
                  },
                  {
                      "id": 4,
                      "title": "Subitem 1.1.2",
                      "subItems": []
                  }
              ]
          },
          {
              "id": 5,
              "title": "Subitem 1.2",
              "subItems": []
          }
      ]
  },
  {
      "id": 6,
      "title": "Item 2",
      "subItems": [
          {
              "id": 7,
              "title": "Subitem 2.1",
              "subItems": [
                  {
                      "id": 8, 
                      "title": "Subitem 2.1.1",
                      "subItems": []
                  },
                  {
                      "id": 9, 
                      "title": "Subitem 2.1.2",
                      "subItems": []
                  }
              ]
          },
          {
              "id": 10,
              "title": "Subitem 2.2",
              "subItems": []
          }
      ]
  },
  {
      "id": 11,
      "title": "Item 3",
      "subItems": [

          {
              "id": 12,
              "title": "Subitem 3.1",
              "subItems": []
          }
      ]
  },

  {
      "id": 13,
      "title": "Item 4",
      "subItems": [

          {
              "id": 14,
              "title": "Subitem 4.1",
              "subItems": [
                  {
                      "id": 15,
                      "title": "Subitem 4.1.1",
                      "subItems": []
                  }

              ]
          }
      ]
  },
  {
    "id": 16,
    "title": "Item 5",
    "subItems": [

        {
            "id": 17,
            "title": "Subitem 5.1",
            "subItems": [
                {
                    "id": 18,
                    "title": "Subitem 5.1.1",
                    "subItems": []
                }

            ]
        }
    ]
},
  {
      "id": 19,
      "title": "Item 6",
      "subItems": [

          {
              "id": 20,
              "title": "Subitem 6.1",
              "subItems": [
                  {
                      "id": 21,
                      "title": "Subitem 6.1.1",
                      "subItems": []
                  }

              ]
          }
      ]
  },
  {
      "id": 22,
      "title": "Item 7",
      "subItems": [

          {
              "id": 23,
              "title": "Subitem 7.1",
              "subItems": [
                  {
                      "id": 24,
                      "title": "Subitem 7.1.1",
                      "subItems": []
                  }

              ]
          }
      ]
  },
  {
    "id": 25,
    "title": "Item 8",
    "subItems": [

        {
            "id": 26,
            "title": "Subitem 8.1",
            "subItems": [
                {
                    "id": 27,
                    "title": "Subitem 8.1.1",
                    "subItems": []
                }

            ]
        }
    ]
},
  ],
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
      setExpandedItems: (state, action) => {
        const payloadArray = Array.isArray(action.payload)
          ? action.payload.filter((item) => typeof item !== 'function')
          : [];
  
        state.expandedItems = [...payloadArray];
      },
      addData: (state, action) => {
        const { id, text } = action.payload;
        
       
        if (id === null) {
          state.data.push({ id: state.data.length + 1, title: text, subItems: [] });
        } else {
          
          const itemToUpdate = findItemById(state.data, id);
  
          if (itemToUpdate) {
            if (!itemToUpdate.subItems) {
              itemToUpdate.subItems = [];
            }
  
            itemToUpdate.subItems.push({ title: text, id: generateUniqueId(), subItems: [] });
          }
        }
      },
      deleteItem: (state, action) => {
        const itemId = action.payload;
        const updatedData = deleteItemById(state.data, itemId);
        state.data = updatedData;
      },
    },
  });

 
const deleteItemById = (data, id) => {
    return data.reduce((acc, item) => {
      if (item.id === id) {
        return acc;
      }
  
      const updatedSubItems = deleteItemById(item.subItems || [], id);
  
      return [...acc, { ...item, subItems: updatedSubItems }];
    }, []);
  };
 
  const findItemById = (data, id) => {
    for (const item of data) {
      if (item.id === id) {
        return item;
      }
  
      const foundSubItem = findItemById(item.subItems, id);
      if (foundSubItem) {
        return foundSubItem;
      }
    }
  
    return null;
  };
  
  
  const generateUniqueId = () => {
    return Math.random().toString(36).substring(7);
  };
  
  export const { setExpandedItems, addData,deleteItem } = dataSlice.actions;
  export default dataSlice.reducer;