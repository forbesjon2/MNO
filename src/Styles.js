import {StyleSheet} from 'react-native';



/*************************************************************************
 * This file holds all of the styles used in the app to keep everything
 * more organized there is a naming convention. 
 * 
 * The only styles that are not used in here are inline or conditional styles
 * 
 * 
 * Naming convention (filename lowercase):
 *      <fileName>_<style>
 *************************************************************************/
const styles = StyleSheet.create({

/*************************************************************************
 * ######################################################################
 * ######################################################################
 * ######################################################################
 *                          #################
 *                          
 *                          Discover directory
 *                          
 *                          #################
 * ######################################################################
 * ######################################################################
 * ######################################################################
 * ######################################################################
 *************************************************************************/

//___________________________Discover.js______________________________________

    discover_searchIcon:{
        textAlign:"center", 
        color:"black", 
        textAlignVertical:"center", 
        position:"absolute", 
        marginLeft: 280, 
        marginTop:4, 
        fontSize:22
    },
    discover_deselectedButton:{
        fontSize:26, 
        height: 30, 
        maxWidth: 90, 
        fontFamily: "Khula-Light", 
        color: "black"
    },
    discover_selectedButton:{
        fontSize:32, 
        height: 30,
        fontFamily: "Khula-ExtraBold", 
        color: "black", 
        lineHeight: 44, 
        maxWidth: 120
    },
    discover_headerText:{
        fontFamily:"Khula-Light",
        fontSize: 38,
        flex: 1, 
        marginLeft: 55,
        maxWidth:150,
        alignSelf: "center",
        color: "black",
    },
    discover_textInput:{
        flex:1,
        color: "black",
        fontFamily:"Khula-Light",
        fontSize: 20,
        margin:0,
        padding:0,
        textAlignVertical:"bottom",
        borderBottomWidth:1,
        borderBottomColor:"gray"
    },
    discover_topContentView:{
        flex: 3,
        flexDirection:"row",
    },
    discover_bottomContentView:{
        flex: 8,
    },
    discover_tripleList:{
        flex:1,
        alignSelf:"center",
    },
    discover_friendRow:{
        flex:1, 
        flexDirection:"row",
        maxHeight:50,
        marginTop:20
    },
    discover_friendImage:{
        width: 40,
        height: 40,
        borderRadius: 20,
        alignSelf:"center",
        shadowOffset:{width:0, height:10},
        shadowRadius:20,
        shadowOpacity:0.8,
        shadowColor:"#000"
    },
    discover_friendNameText:{
        fontFamily:"Roboto-Medium", 
        fontSize: 19,
        color:"black",
        minHeight:26,
        maxHeight:26,
    },
    discover_friendFriendsText:{
        fontFamily:"Roboto-Regular", 
        fontSize: 13,
        paddingTop:5,
        color:"black",
    },
    discover_viewProfileBorder:{
        borderColor:"#975EF7",
        borderRadius: 5,
        backgroundColor:"#F8FAFB",
        maxHeight:25,
        minHeight:25,
        minWidth:60,
        maxWidth:60,
        borderWidth:1,
        alignItems:"center",
    },
    discover_viewProfileText:{
        color:"#975EF7",
        opacity:0.6,
        fontFamily:"Roboto-Regular", 
        fontSize: 14,
        justifyContent:"center"
    },
    discover_serverTileList:{
        marginTop:40,
        marginHorizontal:20,
    },


















/*************************************************************************
* ######################################################################
* ######################################################################
* ######################################################################
*                          #################
*                          
*                           Events directory
*                          
*                          #################
* ######################################################################
* ######################################################################
* ######################################################################
* ######################################################################
*************************************************************************/

//___________________________Events.js___________________________________

    events_eventView:{
        flex: 1,
        flexDirection:"row",
        height: 85,
        borderRadius:12,
        backgroundColor:"#0A60E2",
        marginLeft:15,
        marginRight:15,
        marginTop:12,
        shadowColor: '#000000',
        shadowOffset: {width: 0,height: 3},
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    events_eventTimeView:{
        alignItems:"center",
        width:80,
        marginLeft:5
    },
    events_eventTimeViewText:{
        fontFamily: "Khula-Regular",
        fontSize:15,
        color:"white",
        paddingTop:14,
        textAlign:"right"
    },
    events_eventViewTwo:{
        marginLeft:10,
        marginRight:10,
        flex:1,
        alignItems:"flex-start"
    },
    events_eventHeading:{
        fontFamily: "Khula-Bold",
        color:"white",
        fontSize:19,
        paddingTop:11,
    
    },
    events_eventDescription:{
        fontFamily: "Khula-Regular",
        color:"white",
        paddingTop:8
    },















    







    


//___________________________singleEventView.js___________________________________
    singleeventview_heading:{
        marginLeft:16, 
        marginRight:20, 
        lineHeight:34, 
        fontFamily:"Roboto-Medium", 
        fontSize:26, 
        color:"white"
    },
    singleeventview_dateText:{
        color:"white",
        fontFamily:"Roboto-Light",
        marginLeft:16,
        fontSize:16,
        marginTop:30,
    },
    singleeventview_timeText:{
        color:"white", 
        fontFamily:"Roboto-Light", 
        marginLeft:16, 
        fontSize:16, 
        marginBottom:20,
    },
    singleeventview_icon:{
        color:"#897BD1",
        flex:1,
        flexDirection:"column",
        textAlign:"center",
        fontSize:24
    },
    singleeventview_itemView:{
        flex:1,
        flexDirection:"row",
        marginTop:10,
        marginRight:10
    },
    singleeventview_textBorder:{
        flex:7,
        flexDirection:"column",
        borderBottomColor:"#BEBEBE",
        borderBottomWidth:1.5,
        paddingBottom:12
    },

















    









/*************************************************************************
* ######################################################################
* ######################################################################
* ######################################################################
*                          #################
*                          
*                           Home directory
*                          
*                          #################
* ######################################################################
* ######################################################################
* ######################################################################
* ######################################################################
*************************************************************************/

//___________________________ContentView.js___________________________________
    contentview_text:{
        fontFamily:"DidactGothic-Regular",
        fontSize:16,
        paddingLeft:10,
        paddingRight:10,
    },

















    




//___________________________Home.js_______________________________________

    home_header:{
        textAlign:"center",
        alignSelf:"center",
        height:100,
        flex:1,
        flexDirection:"row",
        maxHeight:40,
        paddingTop:8,
    },
    home_headerText:{
        fontFamily:"DidactGothic-Regular",
        fontSize:21,
        color:"black",
        flex:8,
        flexDirection:"column",
        textAlign:"center"
    },
    home_headerIcon:{
        fontSize:28,
        flex:1,
        flexDirection:"column",
    },
    home_mainView:{
        flex:1,
    },
    home_topViewImage:{
        width:60,
        height:60,
        borderRadius:30,
        left:30,
        top:14
    },
    home_topViewName:{
        fontFamily: "Roboto-Bold",
        fontSize: 36,
        top:25,
        color:"black",
        left:20,
        width:230
    },


    // Styles for the scrollView (list of pages)
    home_sideLanguageMenu:{
        fontSize: 48,
        marginLeft:18,
        marginTop:10,
        color:"black"
    },
    home_sideHeaderText:{
        fontFamily: "Khula-SemiBold",
        fontSize: 28,
        flex:5,
        flexDirection:"column",
    },
    home_sideHeaderView:{
        left:8,
        flex:1,
        flexDirection:"row",
        marginTop:22,
    },
    home_sideHeaderIcon:{
        fontSize:30,
        flex:1,
        lineHeight:34,
        flexDirection:"column",
        color:"gray"
    },
    home_sideElementText:{
        paddingLeft:23,
        fontFamily: "Khula-Regular",
        fontSize: 21,
        flex:5,
        flexDirection:"column"
    },
    home_sideElementSelected:{
        flex:1,
        flexDirection:"row",
        color:"black",
        opacity: 1
    },
    home_sideElementView:{
        left:20,
        flex:1,
        flexDirection:"row",
        opacity:0.6
    },
    home_sideSelectedView:{
        borderLeftWidth: 2,
        borderLeftColor:"#0000ff",
        marginLeft:20,
        marginBottom:10
    },
    home_sideNormalView:{
        marginBottom:10,
    },


    //styles for the right nav bar
    home_rightHeader:{
        flexDirection:"row",
        flex:1,
        minWidth:350,
    },
    home_rightHeaderBold:{
        fontFamily:"Khula-Bold",
        fontSize:33,
        color:"white",
        alignSelf:"center",
        marginTop:10
    },
    home_rightHeaderLight:{
        fontFamily:"Khula-Light",
        fontSize:33,
        color:"white",
        alignSelf:"center",
        marginTop:10
    },
    home_rightHeaderDescription:{
        fontFamily:"Roboto-Light", 
        fontSize:15,
        color:"white",
        marginRight:10,
        lineHeight:20,
        marginBottom:15,
    },

    //styles for the 404 page (found in bareComponents.js)
    home_404Text:{
        fontFamily:"Roboto-Thin",
        fontSize:60,
        color:"black"
    },
    home_404Header:{
        fontFamily:"Khula-Bold",
        color:"black",
        fontSize: 30,
    },
    home_404HeaderUnderlined:{
        fontFamily:"Khula-Bold",
        color:"black",
        fontSize: 30,
        borderBottomColor: "#5D75F7",
        borderBottomWidth:3,
    },
    home_404Content:{
        marginTop:28,
        fontFamily:"Roboto-Light",
        fontSize:18,  
    },
    home_404Button:{
         backgroundColor:"#5D75F7",
         fontFamily:"Roboto-Regular",
         fontSize:16,
         color:"white",
         width:140,
         height:35,
         borderRadius:10
    },
    home_404ButtonText:{
         fontFamily:"Roboto-Regular",
         fontSize:16,
         color:"white",
         marginLeft:23,
         marginTop:6
    },












    




//___________________________HomeComponent.js________________________________

    homecomponent_mainView:{
        flex: 1, 
        flexDirection:"column",
        paddingTop:20,
        paddingBottom:20,
    },
    homecomponent_headerView:{
        flex:1,
        flexDirection:"row",
        paddingLeft:10,
        paddingRight:10,
    },
    homecomponent_headerTextView:{
        flex:3,
        flexDirection:"column",
        paddingLeft:12
    },
    homecomponent_headerName:{
        fontFamily:"Khula-Bold",
        fontSize:20,
        color:"black"
    },
    homecomponent_headerSubName:{
        fontFamily:"Khula-Regular",
        fontSize:14,

    },
    homecomponent_headerImgView:{
        width:50,
        height:50,
        borderRadius:10,
    },
    homecomponent_subContentView:{
        paddingLeft:10,
        paddingRight:10,
        paddingTop:10,
        flex:1,
        flexDirection:"row"
    },
    homecomponent_contentView:{
        paddingTop:10
    },




















    




/*************************************************************************
 * ######################################################################
 * ######################################################################
 * ######################################################################
 *                          #################
 *                          
 *                           init directory
 *                          
 *                          #################
 * ######################################################################
 * ######################################################################
 * ######################################################################
 * ######################################################################
 *************************************************************************/

 //___________________________SchoolSearch.js___________________________________
    schoolsearch_bottomPageTextJapanese:{
        fontFamily:"DidactGothic-Regular",
        color:"white",
        fontSize:14,
        padding: 0,
        flex:1,
        flexDirection:"column",
        textAlign:"right"
    },
    schoolsearch_bottomPageTextEnglish:{
        fontFamily:"Khula-Light", 
        fontSize:17,
        lineHeight:26,
        color:"white",
        padding: 0,
        flex:1,
        flexDirection:"column",
        textAlign:"left"
    },
    schoolsearch_main:{
        flex:1,
        flexDirection:"column",
        backgroundColor:"#42368A",
    },
    schoolsearch_header:{
        fontFamily:"DidactGothic-Regular",
        fontSize:38,
        color:"white",
        marginTop:10,
        marginBottom:8,
        paddingLeft:20,
        paddingTop:20
    },
    schoolsearch_subHeader:{
        fontFamily:"Roboto-Light",
        fontSize:18,
        color:"white",
        opacity:0.7,
        lineHeight:19,
        paddingLeft:20,
        paddingRight:20
    },
    schoolsearch_textInput:{
        flex:1,
        color: "white",
        fontFamily:"Khula-Light",
        fontSize: 20,
        margin:0,
        padding:0,
        textAlignVertical:"bottom",
        borderBottomWidth:1,
        borderBottomColor:"white",
        minWidth:300, 
        maxWidth:300
    },
    schoolsearch_textInputView:{
        maxHeight:35,
        minHeight:35,
        marginBottom:60,
        paddingLeft:20,
        paddingRight:20
    },
    schoolsearch_groupMain:{
        maxHeight:350,
        minHeight:350,
        minWidth: 290,
        maxWidth: 290,
        marginHorizontal:20,
        backgroundColor:"white",
        marginTop:10,
        borderRadius:12
    },
    schoolsearch_groupContentText:{
        fontFamily: "Khula-Regular",
        fontSize:21,
        paddingLeft:3,
        color:"black",
        paddingTop:12
    },
    schoolsearch_groupHeaderText:{
        fontFamily: "DidactGothic-Regular",
        fontSize:18,
        paddingLeft:3,
        paddingTop:1,
        paddingBottom:4,
    },


























//___________________________SignIn.js___________________________________
    signin_main:{
        flex:1,
        flexDirection:"column",
        backgroundColor:"white",
        margin:20
    },
    signin_header:{
        fontFamily:"DidactGothic-Regular",
        fontSize:38,
        color:"black",
        marginTop:10,
        marginBottom:8
    },
    signin_subHeader:{
        fontFamily:"DidactGothic-Regular",
        fontSize:18,
        color:"gray",
        lineHeight:19,
    },
    signin_textInput:{
        marginTop:50,
        minWidth:270,
        maxWidth:270,
        color: "black",
        fontFamily:"Khula-Regular",
        fontSize: 20,
        margin:0,
        padding:0,
        textAlignVertical:"bottom",
        borderBottomWidth:1,
        borderBottomColor:"gray"
    },
    signin_button:{
        height:48,
        width: 180,
        borderRadius: 10,
        flexDirection:"row",
        backgroundColor:"#CE2E7B",
        marginLeft:20,
        marginTop:20,
        marginBottom:70
    },
    signin_buttonText:{
        flex:1,
        fontFamily:"DidactGothic-Regular",
        fontSize:18,
        flexDirection:"column",
        color:"white",
        alignSelf:"center",
        marginLeft:20
    },
    signin_buttonIcon:{
        alignSelf:"center",
        color:"white",
        fontSize:40,
        marginRight:20,
    },
    signin_footerText:{
        fontFamily:"DidactGothic-Regular",
        fontSize:18
    },



















    





//___________________________SignUp.js___________________________________
    signup_main:{
        flex:1,
        flexDirection:"column",
        backgroundColor:"white",
        margin:20
    },
    signup_header:{
        fontFamily:"DidactGothic-Regular",
        fontSize:38,
        color:"black",
        marginTop:10,
        marginBottom:8
    },
    signup_subHeader:{
        fontFamily:"DidactGothic-Regular",
        fontSize:18,
        color:"gray",
        lineHeight:19,
    },
    signup_textInput:{
        marginTop:20,
        minWidth:270,
        maxWidth:270,
        color: "black",
        fontFamily:"Khula-Regular",
        fontSize: 20,
        margin:0,
        padding:0,
        textAlignVertical:"bottom",
        borderBottomWidth:1,
        borderBottomColor:"gray"
    },
    signup_button:{
        height:48,
        width: 180,
        borderRadius: 10,
        flexDirection:"row",
        backgroundColor:"#CE2E7B",
        marginLeft:20,
        marginTop:20,
        marginBottom:60
    },
    signup_buttonText:{
        flex:1,
        fontFamily:"DidactGothic-Regular",
        fontSize:18,
        flexDirection:"column",
        color:"white",
        alignSelf:"center",
        marginLeft:20
    },
    signup_buttonIcon:{
        alignSelf:"center",
        color:"white",
        fontSize:40,
        marginRight:20,
    },
    signup_footerText:{
        fontFamily:"DidactGothic-Regular",
        fontSize:18
    },




















    




//___________________________ValidateEmail.js___________________________________
    validateemail_main:{
        flex:1,
        flexDirection:"column",
        backgroundColor:"white",
        marginLeft:20,
        marginRight:20,
        marginBottom:20
    },
    validateemail_header:{
        fontFamily:"DidactGothic-Regular",
        fontSize:38,
        color:"black",
        marginTop:40,
        marginBottom:12
    },
    validateemail_subHeader:{
        fontFamily:"DidactGothic-Regular",
        fontSize:18,
        color:"gray",
        lineHeight:19,
    },
    validateemail_textInput:{
        marginTop:50,
        minWidth:270,
        maxWidth:270,
        color: "black",
        fontFamily:"Khula-Regular",
        fontSize: 20,
        margin:0,
        padding:0,
        textAlignVertical:"bottom",
        borderBottomWidth:1,
        borderBottomColor:"gray"
    },
    validateemail_button:{
        height:40,
        width: 200,
        borderRadius: 10,
        flexDirection:"row",
        backgroundColor:"#CE2E7B",
        marginTop:20,
        marginBottom:70
    },
    validateemail_buttonText:{
        flex:1,
        fontFamily:"DidactGothic-Regular",
        fontSize:18,
        flexDirection:"column",
        color:"white",
        alignSelf:"center",
        marginLeft:20
    },
    validateemail_buttonIcon:{
        alignSelf:"center",
        color:"white",
        fontSize:40,
        marginRight:20,
    },
    validateemail_footerText:{
        fontFamily:"DidactGothic-Regular",
        fontSize:18
    },

































/*************************************************************************
 * ######################################################################
 * ######################################################################
 * ######################################################################
 *                          #################
 *                          
 *                           messages directory
 *                          
 *                          #################
 * ######################################################################
 * ######################################################################
 * ######################################################################
 * ######################################################################
 *************************************************************************/

 //___________________________Chat.js___________________________________

    chat_header:{
        flex: 1,
        flexDirection:"row",
        justifyContent:"space-evenly",
    },
    chat_headerButton:{
        fontSize:30,
        marginLeft: 14,
        marginTop:10,
        height: 30,
    },
    chat_buttonTouchable:{
        flex:1,
        marginTop:20,
        alignSelf:"center"
    },
    chat_headerText:{
        flex:14,
        alignSelf: "center",
        marginLeft: 155,
        marginTop:5,
        fontFamily:"Khula-SemiBold",
        color: "black",
        fontSize: 20,
        lineHeight:40,
    },
    chat_content: {
        flex:14,
        backgroundColor: "white"
    },
    chat_footer:{
        borderTopWidth: 1,
        borderColor:"#E6E6E6",
        height:60,
        flexDirection:"row",
        justifyContent: "space-evenly"
    },

    //chat styles
    chat_CSmain:{
        marginVertical:13,
    },
    chat_CSleftView:{
        backgroundColor:"white",
        shadowColor: "#B3B3B3",
        shadowOffset:{width: 8, height: 8},
        shadowRadius: 8,
        borderRadius: 25,
        marginLeft: 18,
    },
    chat_CSleftText:{
        fontFamily:"Khula-SemiBold",
        fontSize:16,
        color: "black",
        margin:13,
    },
    chat_CSrightText:{
        fontFamily:"Khula-SemiBold",
        fontSize:14,
        color: "white",
        margin:18,
    },
    chat_CSrightView:{
        backgroundColor:"#476BF2",
        shadowColor:"black",
        shadowOffset:{width: 8, height: 8},
        shadowRadius: 8,
        borderRadius: 25,
        marginRight: 18,
    },































//___________________________Chat.js___________________________________
    


















    


/*************************************************************************
 * ######################################################################
 * ######################################################################
 * ######################################################################
 *                          #################
 *                          
 *                          Profile directory
 *                          
 *                          #################
 * ######################################################################
 * ######################################################################
 * ######################################################################
 * ######################################################################
 *************************************************************************/

//___________________________Profile.js_________________________________________

    profile_serverTile:{
        flex:1, 
        flexDirection:"column", 
        marginHorizontal:18, 
        marginVertical:8,
        borderRadius:5,
        minWidth:170, 
        maxWidth:170, 
        maxHeight:60, 
        minHeight:60,
        justifyContent:"center",
        shadowOffset:{width:0, height:10},
        shadowRadius:5,
        shadowOpacity:0.25
    }, 
    profile_serverTileText:{
        fontFamily:"Roboto-Medium", 
        fontSize:19,
        alignSelf:"center", 
        color:"white",
    },
    profile_tagTileText:{
        fontFamily:"Khula-SemiBold", 
        fontSize: 19,
        alignSelf:"center", 
        color:"black",
        opacity:0.7, 
    },
    profile_tagTile:{
        flex:0.5,
        paddingVertical:5,
        justifyContent:"center"
    }, 
    profile_name:{
        fontFamily:"Khula-SemiBold",
        fontSize:24,
        opacity:1,
        justifyContent:"flex-end"
    },
    profile_subName:{
        alignSelf:"center", 
        fontFamily:"Roboto-Regular", 
        fontSize:14,
        opacity:0.6,
    },
    profile_menuView:{
        flex:1, 
        flexDirection:"column", 
        alignSelf:"center"
    },
    profile_menuButton:{
        alignSelf:"center", 
        fontFamily:"Roboto-Medium", 
        fontSize:36, 
        lineHeight:26, 
        color:"#5D75F7",
    },
    profile_menuText:{
        alignSelf:"center", 
        fontFamily:"Roboto-Regular", 
        fontSize:14,
        opacity:0.6
    },
    profile_menuNumber:{
        opacity:0.7,
        alignSelf:"center", 
        fontFamily:"Khula-Bold", 
        fontSize:24, 
        maxHeight:30
    },
    profile_friendButton:{
        opacity:0.7,
        fontFamily:"Khula-Regular",
        color:"black",
        fontSize:16
    },
    profile_topViewImage:{
        width: 80,
        height: 80,
        borderRadius: 40,
        shadowOffset:{width:0, height:10},
        shadowRadius:20,
        shadowOpacity:0.8,
        shadowColor:"#000"
    },























/*************************************************************************
 * ######################################################################
 * ######################################################################
 * ######################################################################
 *                          #################
 *                          
 *                          Settings directory
 *                          
 *                          #################
 * ######################################################################
 * ######################################################################
 * ######################################################################
 * ######################################################################
 *************************************************************************/

//___________________________Settings.js_________________________________________
    
    settings_main:{
        flex: 1,
        flexDirection: "column",
    },
    settings_buttonText:{
        fontSize: 21,
        fontFamily:"Roboto-Regular",
        color: "black", 
        lineHeight: 48,       
    },
    settings_topicHeader:{
        fontSize: 52,
        fontFamily:"Roboto-Regular",
        color: "black",
    },
    settings_header:{
        fontSize: 56,
        fontFamily:"DidactGothic-Regular",
        color: "black",
        lineHeight: 50,
    },
    settings_headerForeign:{
        fontSize: 54,
        color:"black",
        lineHeight: 65,
    },
    settings_scroll:{
        flex: 20,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: "column",
    },
























/*************************************************************************
 * ######################################################################
 * ######################################################################
 * ######################################################################
 *                          #################
 *                          
 *                          Components directory
 *                          
 *                          #################
 * ######################################################################
 * ######################################################################
 * ######################################################################
 * ######################################################################
 *************************************************************************/

 //___________________________BareComponents.js_________________________________________

    bareComponents_profileRow:{
        flex:1, 
        flexDirection:"row",
        maxHeight:50,
        marginTop:10,
        marginBottom:15
    },
    bareComponents_profileText:{
        fontFamily:"DidactGothic-Regular", 
        fontSize: 21,
        color:"white",
        minHeight:34,
        maxHeight:34,
        alignSelf:"center"
    },
    bareComponents_profileImage:{
        width: 34,
        height: 34,
        borderRadius: 16,
        alignSelf:"center",
        shadowOffset:{width:0, height:10},
        shadowRadius:20,
        shadowOpacity:0.8,
        shadowColor:"#000"
    },

    bareComponents_eventTile:{
        borderBottomColor:"black",
        height:140,
        marginHorizontal:20,
        borderBottomWidth:1,
        flex:1,
        flexDirection:"column",
    },
    bareComponents_eventHeading:{
        fontFamily:"Khula-SemiBold",
        fontSize:21,
        marginTop:10,
        color:"black"
    },
    bareComponents_eventDate:{
        fontFamily:"Khula-Regular",
        marginTop:4,
        fontSize:16,
        color:"black",
    },
    bareComponents_eventDescription:{
        fontFamily:"Khula-Light",
        marginTop:8,
        fontSize:14,
        color:"black",
    },

    bareComponents_serverTile:{
        height:140,
        flex:1,
        padding:10,
        marginVertical:6,
        flexDirection:"column",
        backgroundColor:"#EEEEEE",
        borderRadius: 8
    },
    bareComponents_serverAttr:{
        fontFamily:"Khula-Regular",
        fontSize: 18,
    },
    bareComponents_serverHeader:{
        fontFamily:"Khula-SemiBold",
        fontSize:16,
    },



     //___________________________Nav.js_________________________________________
    nav_navBar:{
        flexDirection: "column",
        maxHeight: 90,
        minHeight: 90,
    },
    nav_scrollView:{
        flexDirection:"row",
        flex: 1,
        maxHeight: 40,
        minHeight: 40,
    },
    nav_dragLine:{
        textAlign:"center", 
        fontSize:34, 
        minHeight: 20, 
        maxHeight:20, 
        lineHeight:32, 
    },
    nav_viewModule:{
        minHeight: 35,
        maxHeight: 35,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        marginHorizontal: 9,
    },
    nav_navButton:{
        fontFamily: "DidactGothic-Regular", 
        paddingTop: 2,
        fontSize:24,
    },

    //___________________________NavContent.js_________________________________________
    navContent_headerTextDiscover:{
        backgroundColor: "black",
        color: "white",
        fontFamily: "Khula-Light",
        fontSize: 45,
        marginLeft: 10,
        flex:1,
        flexDirection:"row",
        maxHeight:120
    },
    navContent_eventItemText:{
        color: "white",
        fontFamily: "Khula-Light",
        marginLeft: 10,
        marginTop: 25,
    },
    navContent_textInput:{
        color:"white",
        flex:9,
        minWidth:270,
        maxWidth:270,
        flexDirection:"column",
        fontFamily: "Khula-Light",
        fontSize:19,
        lineHeight:24,
        padding:6,
        maxHeight: 80,
        minHeight: 80,
        textAlignVertical:"bottom",
        borderColor: 'gray', 
        borderWidth: 1, 
        borderRadius:5, 
        textAlignVertical:"top", 
    },
    navContent_clipSendIcon:{
        flex:1,
        maxHeight:45,
        flexDirection:"column",
        fontSize:26,
        maxWidth:50,
        minWidth:50,
        marginLeft:10,
        marginRight:5,
        textAlign:"center",
        opacity:0.7,
        color:"white",
    },
});

export {styles};