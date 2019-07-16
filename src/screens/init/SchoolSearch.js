import React from 'react';
import { View, TouchableWithoutFeedback, Text , FlatList, TextInput} from "react-native";
import { connect } from "react-redux";
import {Ionicons} from '@expo/vector-icons';
import {styles} from "../../Styles";
import BareComponents from '../../components/other/BareComponents';


/*************************************************************************
 * This is the School Search screen, it appears after you enter your
 * login information
 * 
 * Notes:
 * the list is set up to be semi efficient using flatlist but it is a very 
 * simple implementation
 *************************************************************************/
class SchoolSearch extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text:"",
            groupData:[],
            searchData:[],

            //general page integration
            components: new BareComponents(),
        }
        //sets the safe area background for iOS
        this.props.dispatch({type:"SET_SAFE_AREA_BACKGROUND", payload:"#42368A"});
    }

    /*************************************************************************
    * This performs operations essential for icon sizing. 
    * 
    * For every Group (or school) it recieves from the API, it gets & calculates 
    * the correct dimensions for the icon.
    * 
    * It then appends that to the state
    *************************************************************************/
    componentWillMount(){
        let groupData = JSON.parse(JSON.stringify(this.props.groupData["groups"]));
        this.setState({searchData:groupData, groupData:groupData})
    }

    /*************************************************************************
    * associates a key for every item in the flatlist. We use keyExtractor to 
    * preserve the naming of 'uuid' from the API
    *************************************************************************/
    _keyExtractor = (item, index) => item.uuid;
    
    //implements BareComponents searchFunction() to perform a simple search
    search(){
        let filterData = this.state.components.searchFunction(this.state.groupData, this.state.text, ["name", "epithet"]);
        this.setState({searchData: filterData});
    }

    render(){
    return(
    <View style={styles.schoolsearch_main}>

        {/* Header */}
        <Text style={styles.schoolsearch_header}>Search for your school.</Text>
        <Text style={[styles.schoolsearch_subHeader, {marginBottom:25}]}>{this.state.groupData.length} schools available</Text>
        <View style={styles.schoolsearch_textInputView}>
            <TextInput
            style={styles.schoolsearch_textInput}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text} 
            selectionColor={"black"}
            autoCorrect={false}
            numberOfLines={1}
            onFocus={() =>{[this.state.text == "Search" ? this.setState({text:""}) :null]}}
            clearTextOnFocus={true}
            onSubmitEditing={() => this.search()}
            maxLength={125}/>
            <TouchableWithoutFeedback onPress={() => this.search()}> 
                <Ionicons name="ios-search" style={[{textAlign:"center", color:"white", textAlignVertical:"center", position:"absolute", marginLeft: 300, marginTop:4, fontSize:22}]}/>
            </TouchableWithoutFeedback>
        </View>
        <FlatList 
            horizontal={true}
            data={this.state.searchData}
            keyExtractor={this._keyExtractor}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => 
            this.state.components.groupView(item, true)}
        />
        <View style={{flex:1, flexDirection:"row", maxHeight:20, marginHorizontal:10, marginBottom:5}}>
            <Text style={styles.schoolsearch_bottomPageTextEnglish}>miniowl, 2019</Text>
            {/* Find, Discover, Explore */}
            <Text style={styles.schoolsearch_bottomPageTextJapanese}>発見、発見、探検</Text>
        </View>
    </View>
    );
}}

const mapStateToProps = (store) => ({
    groupData: store.Global.groupData
});

const schoolSearchScreen = connect(mapStateToProps)(SchoolSearch);
export default schoolSearchScreen;