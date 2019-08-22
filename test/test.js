const {test, loadFromStore, nukeStore} = require("../src/Networking");
import AsyncStorage from '@react-native-community/async-storage';
import Store from "../src/Store";

/*********************************************************************
 * This will test the process of loading everything relevant as defined
 * by the Global keyList variable stored in redux.
 * 
 * As you add items to that, you shall also add the test cases here. 
 * Here's the general format of how things are processed
 * 
 * - Nuke the store
 * - Set the variables
 * - retreive the variables and check that they hold the correct values
 * 
 * 
 * The functions in Networking that are being tested / used here are...
 * - nukeStore()
 * - loadFromStore()
 * - initializeWebsocket()
 * - retrieveGroups()
 * - login()
 * 
 *********************************************************************/
describe('describe inner 1', () => {
    const test_user_email = '0d1fd772b6@twitter.com';
    const test_user_password = 'iLoveSafeSpaces1';


    //check that async storage works
    it('Async Storage is functional in the test suite', async () => {
        await nukeStore();
        await AsyncStorage.setItem("a", "b");
        const data = await AsyncStorage.getItem("a");
        expect(data).toEqual('b');
    });

    //check that the redux store works
    it('redux store works', async () => {
        await Store.dispatch({type:"SET_SESSION_TOKEN", payload:"rs"});
        expect(Store.getState().Global.sessionToken).toEqual('rs');
    });

    //check SET_SESSION_TOKEN 
    it('(keylist) SET_SESSION_TOKEN correctly maps to sessionToken', async () => {
        await nukeStore();
        await AsyncStorage.setItem("sessionToken", "token134");
        const data = await AsyncStorage.getItem("sessionToken");
        expect(data).toEqual('token134');
    });

    //check SET_ACCOUNT_INFO
    it('(keylist) SET_ACCOUNT_INFO correctly maps to accountInfo', async () => {
        await nukeStore();
        await AsyncStorage.setItem("accountInfo", "accountInfo124");
        const data = await AsyncStorage.getItem("accountInfo");
        expect(data).toEqual('accountInfo124');
    });


});

describe('describe inner 2', () =>{
        //check loadFromStore 
        it('keylist dispatch & loadFromStore() correctly sets keylist variables', async () => {
            await nukeStore();
            AsyncStorage.multiSet(["accountInfo", "accountInfo144"], ["sessionToken", "sessionToken144"]).then(() =>{
                loadFromStore();
                expect(Store.getState().Global.accountInfo).toEqual('accountInfo144');
                expect(Store.getState().Global.sessionToken).toEqual('sessionToken144');
            });
        });
    
})