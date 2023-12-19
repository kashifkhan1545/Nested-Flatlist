// src/store/store.js
import { configureStore  } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; // You need to install '@react-native-async-storage/async-storage' separately
import dataReducer, { setExpandedItems } from '../slices/dataSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    
    blacklist: ['register'],
  };
  
  const persistedReducer = persistReducer(persistConfig, dataReducer);
  
  const store = configureStore({
    reducer: {
      data: persistedReducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: false, // Disable serializable check during rehydration
      });
    },
  });

const initialDataState = [
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
];
// store.dispatch({ type: 'HANDLE_REHYDRATION', payload: { register: yourCustomValue } });
store.dispatch(setExpandedItems(initialDataState));

export const persistor = persistStore(store);

export default store;