# projectalphaImproved


how to call the function written in other file (I want to execute axios.js file from enrichedEvents.js) ?

Right now i have given path of axios.js in enrichedEvents.js file,
its executing, but whenever i restart the server axios.js file is executing without calling it.

THe flow goes like this:
1. signup a user 
2. login a user to get jwt token
3. Once you get jwt token, you can access all the apis.
4. create a Project, by using Post method on /projects/v1
5.create raw events, /project/v1/<projectID>/events/raw, 
6. create enriched events, /project/v1/<projectID>/events/enriched
  6.1. creating enrichedEvents should also Post data to livy calls,to execute spark jobs. In my code its axios.js file 
  consists of function to Post the rest call for livy.  
