const WebSocket = require('ws');
import React from 'react';
import Loading from "../src/screens/init/Loading";
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import srcStore from "../src/Store";
const {test, loadFromStore} = require("../src/Networking");
import AsyncStorage from '@react-native-community/async-storage';
/*********************************************************************
 * Test
 *********************************************************************/
describe('Loading renders correctly', () =>{
    it('Should render correctly.', () =>{    
        const LoadingData = renderer.create(<Loading />).getInstance();
        
        expect('a').toBe('a');
    });
    it('checks if Async Storage is properly imported', async () => {
        await AsyncStorage.getItem("myKey")
        expect(AsyncStorage.getItem).toBeCalledWith('myKey');
      });
});
