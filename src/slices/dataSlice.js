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
                      "id": 51, 
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
              "id": 37,
              "title": "Subitem 4.1",
              "subItems": [
                  {
                      "id": 54,
                      "title": "Subitem 4.1.1",
                      "subItems": []
                  }

              ]
          }
      ]
  },
  {
    "id": 100,
    "title": "Item 5",
    "subItems": [

        {
            "id": 87,
            "title": "Subitem 5.1",
            "subItems": [
                {
                    "id": 91,
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
              "id": 77,
              "title": "Subitem 6.1",
              "subItems": [
                  {
                      "id": 99,
                      "title": "Subitem 6.1.1",
                      "subItems": []
                  }

              ]
          }
      ]
  },
  {
      "id": 213,
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
        const itemToUpdate = findItemById(state.data, id);
  
        if (itemToUpdate) {
          // Ensure that the subItems array is initialized
          if (!itemToUpdate.subItems) {
            itemToUpdate.subItems = [];
          }
  
          // Add the entered text to the selected item's subItems
          itemToUpdate.subItems.push({ title: text, id: generateUniqueId(), subItems: [] });
        }
      },
    },
  });
  // Utility function to find an item by ID in the hierarchical data structure
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
  
  // Utility function to generate a unique ID (you can replace this with your preferred ID generation logic)
  const generateUniqueId = () => {
    return Math.random().toString(36).substring(7);
  };
  
  export const { setExpandedItems, addData } = dataSlice.actions;
  export default dataSlice.reducer;