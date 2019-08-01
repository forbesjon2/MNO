import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Keyboard} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {styles} from "../../Styles";

/*************************************************************************
 * The BareComponents class's purpose is to include all redundant methods
 * that dont require access to the parent class's state. 
 * 
 * The purpose it serves is to keep some of the main classes organized.
 * 
 * 
 * It's important to keep the documentation of each of these methods
 * similar to each other
 *      description
 *      classes the function is used by
 *      argument format expectation
 * 
 * 
 * Heres an index of all methods listed here
 * 
 * 
 * 
*************************************************************************/
export default class BareComponents extends React.PureComponent{
    /*************************************************************************
    * 
    * 
    * This component is used by 
    *       src/init/SchoolSearch.js as well as 
    *       src/Discover/Discover.js
    *       
    * 
    * @argument width expects a number representing the image's width
    * @argument height expects a number representing the image's height
    *************************************************************************/
    returnImg(w, h, url){
        let width = 50;
        let height = [w > width ? h * (width / w) : h * (w / width)][0];
        return(<Image source={{uri:url}} style={{ minWidth:width, minHeight:height, alignSelf:"center", marginTop:20}}/>);
    }











    /*************************************************************************
     * This is a search implementation using javascript regex. 
     *
     * @argument preFilteredData the original data that is never changed but
     * rather used as a reference
     * 
     * @argument inputStr is the string of characters that the user entered 
     * in the text box
     * 
     * @argument matchArray the array of JSON elements to search.
     * 
     * ["name", "epithet"] would search {"name":"<...>", "epithet":"<...>"}
     * for each iteration
     * 
    *************************************************************************/
   searchFunction(preFilteredData, inputStr, matchArray){
    Keyboard.dismiss()
    var filteredArray = [];
    var regex = new RegExp(inputStr.toLowerCase(), 'g');
    for(var i in preFilteredData){
        var isMatch = false;
        for(let j in matchArray){
            let enteredData = preFilteredData[i][matchArray[j]].toLowerCase();
            if(enteredData.match(regex) != null) {
                isMatch = true;
                break;
            }
        }
        if(isMatch) filteredArray.push(preFilteredData[i]);
    }
    return filteredArray;
    }








    /*************************************************************************
     * This generates the list of users that is being searched
     * array -> {"name":"<some name>", "friends":<some number>, "icon":"<image url>"}
     * 
     * this component is used by
     *      /src/Profile/Profile.js
     *      /src/Discover/Discover.js
     * 
     * TODO I will eventually link this to the user profile screen
     *************************************************************************/
    profileView(profileSearchData){
        profileSearchData = JSON.parse(JSON.stringify(profileSearchData));
        return(
        <View style={styles.discover_friendRow}>
            <View style={{flex:1, flexDirection:"column", justifyContent:"center"}}>
                <Image source={{uri:profileSearchData["icon"]}} style={styles.discover_friendImage}/>
            </View>
            <View style={{flex:3, flexDirection:"column"}}>
                <View style={{flex:1, flexDirection:"row"}}>
                    <Text style={styles.discover_friendNameText}>{profileSearchData["name"]}</Text>
                </View>
                <View style={{flex:1, flexDirection:"row"}}>
                    <Text style={styles.discover_friendFriendsText}>{profileSearchData["friends"]} friends</Text>
                </View>
            </View>
            <View style={{flex:1, flexDirection:"column"}}>
                <View style={styles.discover_viewProfileBorder}>
                    <Text style={styles.discover_viewProfileText}>view</Text>
                </View>
            </View>
        </View>
        );
    }





    /*************************************************************************
     * This generates the list of users that is being searched. It is meant to
     * be used on a black background
     * array -> {"alias":"<some alias>", "icon":"<image url>", "uuid":"<user uuid>"}
     * 
     * this component is used by
     *      /src/Home/Home.js
     * 
     * TODO I will eventually link this to the user profile screen
     * @param profileSearchData requires an alias, icon url, and uuid (not shown)
     *      {"alias":"<some alias>", "icon":"<image url>", "uuid":"<user uuid>"}
     *************************************************************************/
    profileViewLight(profileSearchData){
        profileSearchData = JSON.parse(JSON.stringify(profileSearchData));
        return(
        <View style={styles.bareComponents_profileRow}>
            <View style={{flex:1, flexDirection:"column", justifyContent:"center"}}>
                <Image source={{uri:profileSearchData["icon"]}} style={styles.bareComponents_profileImage}/>
            </View>
            <View style={{flex:3, flexDirection:"column"}}>
                <View style={{flex:1, flexDirection:"row"}}>
                    <Text style={styles.bareComponents_profileText}>{profileSearchData["alias"]}</Text>
                </View>
            </View>
        </View>
        );
    }



    /*************************************************************************
    * This returns the JSX for each element (Group) in the flatlist. An example
    * of the expected format of the input data can be found in GroupData.json
    * 
    * This component is used by 
    *       src/init/SchoolSearch.js as well as 
    *       src/Discover/Discover.js
    * 
    * @argument item expects the following format (uuid is used elsewhere)
    *   {
    *       "uuid":"<unique identifier>",  "name":"<group name>", 
    *       "epithet":"<group acronym>",   "members":<number of members>, 
    *       "servers":<number of servers>, "icon":"<icon url>"
    *   }
    * @argument isLight 
    * 
    *************************************************************************/
    groupView(item, isLight){
        item = JSON.parse(JSON.stringify(item));
        let buttonColor = 'rgba(66,54,138,0.2)';
        let backgroundColor = 'white';
        let borderColor = '#D0D1D3';
        if(!isLight){
            buttonColor = 'white';
            backgroundColor = 'rgba(66,54,138,0.2)';
            borderColor = 'white';
        }
        return(
            <View style={[groupStyles.main, {backgroundColor: backgroundColor}]}>
        <View style={{flex:1, flexDirection:"column", margin:15}}>
            {/* Name */}
            <View style={{flex:1, maxHeight:50, minHeight:50, flexDirection:"row", borderBottomColor:borderColor, borderBottomWidth:2}}>
                <Text numberOfLines={1} style={[groupStyles.contentText]}>{item["name"]}</Text>
            </View>

            {/* Epithet & icon */}
            <View style={{flex:1, maxHeight:80, minHeight:80, flexDirection:"row",  borderBottomColor:borderColor, borderBottomWidth:2}}>
                <View style={{flex:1, flexDirection:"column"}}>
                    <Text numberOfLines={1} style={[groupStyles.headerText, {color:'rgba(66,54,138,1)'}]}>epithet</Text>
                    <Text numberOfLines={1} style={groupStyles.contentText}>{item["epithet"]}</Text>
                </View>
                <View style={{flex:1, flexDirection:"column"}}>
                    {this.returnImg(item["scale"].split("x")[0], item["scale"].split("x")[1], item["icon"])}
                </View>
            </View>

            {/* Members &  Groups*/}
            <View style={{flex:1, flexDirection:"row",  borderBottomColor:borderColor, borderBottomWidth:2, maxHeight:120, minHeight:120}}>
                <View style={{flex:1, flexDirection:"column", borderRightColor:borderColor, borderRightWidth:2}}>
                <Text numberOfLines={1} style={[groupStyles.headerText, {color:'rgba(66,54,138,1)'}]}>members</Text>
                    <Text numberOfLines={1} style={[groupStyles.contentText, {alignSelf:"center", fontSize:48}]}>{item["members"]}</Text>
                </View>
                <View style={{flex:1, flexDirection:"column"}}>
                <Text numberOfLines={1} style={[groupStyles.headerText, {color:'rgba(66,54,138,1)'}]}>servers</Text>
                    <Text numberOfLines={1} style={[groupStyles.contentText, {alignSelf:"center", fontSize:48}]}>{item["servers"]}</Text>
                </View>
            </View>
            
            {/* Nav Button */}
            <TouchableOpacity style={{borderRadius:12}}>
                <View style={{backgroundColor:buttonColor, width:220, borderRadius:8, alignSelf:"center", marginTop:12, minHeight:45, maxHeight:45, flex:1, flexDirection:"row"}}>
                    <Text style={{color:'rgba(66,54,138,1)', paddingTop:9, paddingLeft:12, fontSize:18, flex:4, flexDirection:"column"}}>Select school.</Text>
                    <Ionicons name={"ios-arrow-round-forward"} style={{color:'rgba(66,54,138,1)', fontSize:42, flex:1, flexDirection:"column", alignSelf:"center"}} />
                </View>
            </TouchableOpacity>
        </View>
    </View>);
    }




    /**************************************************************************
     * A simple function that returns the word 'menu' in one of 6 random 
     * languages.
     * 
     * this component is used by
     *      /src/Home/Home.js
     **************************************************************************/
    randomLanguage(){
        switch(Math.floor(Math.random() * 6) + 1){    
            case 1: return(<Text style={styles.home_sideLanguageMenu}>功能表</Text>);
            case 2: return(<Text style={styles.home_sideLanguageMenu}>메뉴</Text>);
            case 3: return(<Text style={styles.home_sideLanguageMenu}>菜单</Text>);
            case 4: return(<Text style={styles.home_sideLanguageMenu}>Menú</Text>);
            case 5: return(<Text style={styles.home_sideLanguageMenu}>Меню</Text>);
            case 4: return(<Text style={styles.home_sideLanguageMenu}>Menü</Text>);
            case 5: return(<Text style={styles.home_sideLanguageMenu}>منوی</Text>);
            default: return(<Text style={styles.home_sideLanguageMenu}>メニュー</Text>);  
        }
    }
}



const groupStyles = StyleSheet.create({
    main:{
        maxHeight:350,
        minHeight:350,
        minWidth: 290,
        maxWidth: 290,
        marginHorizontal:20,
        marginTop:10,
        borderRadius:12
    },
    contentText:{
        fontFamily: "Khula-Regular",
        fontSize:21,
        paddingLeft:3,
        color:"black",
        paddingTop:12
    },
    headerText:{
        fontFamily: "DidactGothic-Regular",
        fontSize:18,
        paddingLeft:3,
        paddingTop:1,
        paddingBottom:4,
    },
});