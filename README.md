# React Twitter Revisited Starter
# react-twitter

1.

fetch in Home.js to get tweets does not work with default bearer token auth configuration.

Authorization is denied when I make the fetch request. 

before hitting the tweet route, the authorization is required for the route. 

the defualt token extractions for cookies in auth.js line 29 does not work.

temp-solution: was finding another place the token is stored on the req object, and extracting the data from there. 



2.
why in Home.js do I have to bind this to logutFunc for this to be related to class.




Trying to solve issure

Not instruction to install/use bearerToken, or put in requireAuth array?!