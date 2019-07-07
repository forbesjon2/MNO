# Overview
These .json files will contain the test data used throughout the app. A description of the contents will be explained in this file
<br>
_To include in .js files_ var < someName> = require(< some file>);_<br>
var content = [];
jsonData.< someName>.forEach(element => {
    content.push(component);    
});

## MessagesHome.json
Used by src/messages/MessagesHome.js
<br>
This lists the most recent message in every conversation that isn't deleted

## Chats.json
not used by anything. May be used by Chat.js??


## HomeData.json
Used by Home.js
<br>
"Global" lists the most important content. Eventually we're going to add "Notifications" after "Global"..
<br>
"Global"(array) --> {"Name"(string), "Rooms"(array)}
<br>
"Name" will be the school names at first. These wont be any longer than 6 characters(?). Examples include UNL, MSU...
<br>
"Rooms" will always be preceded with an '@' and can be 12 characters max(?)
<br>

## CalendarData.json
used by the calendar page. This lists everything under 'Dates'.. most of the logic for pulling dates for a specific month
is pulled by the app (decides which months it wants) and is filtered and sent by the web application
<br>
< date> --> events(array)
<br>
Event
{< date YYYY-MM-DD as string>:[{ }, { }]}
{"2019-09-23":[{"School day off": "all day"}, {"Auction":"all day"}]},


<br>

## AccountInfo.json
used by the profile & other pages.
<br>
_name:_ user's full name may be the same as another user's name. (Example: Marshall Keagan)
<br>
_subName:_ right now this will just be the user's degree since its used for university purposes. (Example: Biological Systems Engineering)
<br>
_alias:_ the users tag. Begins with an '@' and has to be unique (Example: @mkagan)
<br>
_description:_ the user's description
<br>
_imageuri:_ The user's profile image link
<br>
_followers:_ An integer representing how many followers that user has
<br>
_following:_ An integer representing how many people this user is following
<br>
_groups:_ A list of groups. For each group there will be a name and a list of at least one room. For each room there will be the room name and the number of followers. The unique tag will be < groupName> @ < room>
<br>
_schedule:_ TODO edit this. not sure if ill keep this but its useful for scheduling tutor stuff idk
<br>
<br>
<br>