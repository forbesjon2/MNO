const WebSocket = require('ws');
import React from 'react';
import Loading from "../src/screens/init/Loading";
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import srcStore from "../src/Store";
/*********************************************************************
 * Test
 *********************************************************************/
describe('Loading renders correctly', () =>{
    it('Should render correctly.', () =>{    
        const LoadingData = renderer.create(<Loading />).getInstance();
        
        expect(LoadingData.testTestfucj()).toEqual(53);
        // expect('a').toBe('a');
    });
});
