import React from 'react';
import srcStore from "./src/Store";
import { Provider } from 'react-redux';
import {KeyboardAvoidingView} from 'react-native';
import AppContent from "./AppContent";
export default function App() {
  
  return (
    <Provider store={srcStore}>
      <AppContent />
    </Provider>
  );
}