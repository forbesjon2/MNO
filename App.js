import React from 'react';
import Store from "./src/Store";
import {Provider} from 'react-redux';
import AppContent from "./AppContent";

export default function App() {return (<Provider store={Store}><AppContent /></Provider>);}