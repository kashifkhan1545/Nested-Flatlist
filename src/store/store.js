// src/store/store.js
import { configureStore  } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
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
];

// store.dispatch({ type: 'HANDLE_REHYDRATION', payload: { register: yourCustomValue } });


export const persistor = persistStore(store);

export default store;