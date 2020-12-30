
## Welcome to Weather API, Elements Assignment

## /*** About this file
     The purpose of this file is to provide overview, setup instructions and background information of the project.

    Note : Any dependencies added / modified to this project which affect the running of the code in this project must be listed in this file. All developers must ensure that the instructions mentioned in this file are sufficient to enable a new developer to obtain a executable copy of the lastest code in this project, without invlvement from any other human assistance. 
## ** /

## SHORT DESCRIPTION & Project Technical Specifications
This project is a node/react project build with external weather api where node.js, express.js is used in the backend as a middleware, and React.js framework in the front end to display the api data. The style is very minimalistic, the focus was on having a completely functional app where when a user can land on the home page and can see a list of cities. On this page, the user is able to click on a city and see the weather results  on a separate detail screen. As requested in the assignment, the user is able to show/hide a city and the status of that choice is remembered when the page reloads. 

The project uses localstorage to make a copy of the weather array of objects to serve as a backup in case the server goes down. By having a copy of each object within the array, I am able to target a specific object to further display it's details on a diferrent page. Localstorage is used also for reducing calls to the server, the check is done and if there is data from server stored, then the call is ignored. If for some reason, the server is down, the app will keep running by simply using localstorage data.
The backend has it's own handle error in case something is not working as it should.

In the front end, react uses Material UI & animations to create a simple css design but also easy to navigate on the page.

## App requirements
   1) Ubuntu OS/Mac/Linux terminal
   2) Node
   3) Npm
   4) React


NOTE: Run npm install from both folders: root folder and client folder to install all the packages.

## Installing project specific dependency packages and tools:
1. Unzip folder & cd elements_assignment folder.
2. root folder: ~ npm install (to install middleware) 
3. ~ cd client (frontend / react)
4. client folder: ~ npm install (install react packages)

## Commands / Instructions for starting a server
5. ~ cd root folder
6. root folder: ~ npm run dev (to start the backend & frontend)


## SHORT DESCRIPTION OF APP ON THE BROWSER
7. On th home screen you will see a list with all the cities that are available on the API.
8. At the top of the home page, there are 3 buttons: 
                                                    - "Show Chronological" button, on click it will open a modal that displays a list of all the cities, weather in a chronological order.
                                                    - "Refresh data" button, on click it will make a new call to the weather api where the new data will be displayed on the page.
                                                    - "Home" button, redirects you to home page from detailed weather page.
9.  Each element has a button with show/hide, text that display the state of the element. On clicking the button to hide/unhide the city, selection is preserved after reloading the page (Local storage keeps track of the state of the city).

## Unit test
10. Testing Nodejs server, from root folder, run: npm test
11. Testing Reactjs, from client folder, run: npm run test


## User stories
3. As a User, I want the cities to be sorted alphabetically. = Homepage
4. As a User, I want to be able to refresh the data that is on the home screen. = On home page, click "Refresh Data!" button.
5. As a User, I want to be able to click on a city and see the weather results on a separate detail screen. = On home page, click "More Details.." button, under each city name.
6. As a User, I want all the temperatures to be displayed in Celsius. The API returns also Fahrenheit and Kelvin, so they need to be converted:
Celsius = Kelvin - 273.15
Celsius = (Fahrenheit - 32) / 1.8 = This can be see on a separate detail screen with the weather results
7. As a User, I want the temperatures to be displayed in chronological order. = On home page, click " Show Chronological" button.
8. As a User, I want to have the ability to hide/unhide a city and remember my choice after a page reload. =  On home page, click "Show/Hide" button.

10. As a Reviewer, I want a subject in the README.md explaining the chosen architecture. = 
## Nodejs 
The backend is used to make these requests with NodeJS. I
typically use NodeJS and a backend to help separate out logic, especially if I need to make calls to a database and or calls to an external api. Another good reason would be that I can handle sensitive information and it's better to do it on server side and not on client side.
## Single-page web app architecture
Why React.js ? 
-Fast and responsive. Since single-page applications don't update the entire page but only required content, they significantly improve a website's speed.
- Optimization.
- Client-side rendering.
- User experience. SPAs provide users with a simple linear experience.
- Easy debugging. React framework has it's own Chrome developer tools that make debugging much easier.
- Performance.
- Less complex implementation.
- Better caching. A single-page app can cache any local data effectively. 
- Create-react-app already handles testing with jest and has flow typing right out of the box with a few quick commands that only take a few seconds to implement. Setting this up on your own with configuring your .babelrc, setting up your jest config inside of package.json, and more just takes much more time when you’re all on your own.

14. As a Reviewer, I value the usage of TypeScript over JavaScript. If there is a reason for writing JavaScript, please specify it in the README.
md =
 ## CHOSEN Languages
Why Javascript? - Typescript is a powerful type system, including generics & JS features for large size project whereas JavaScript is an ideal option for small size project. The reasoning behind decision of using Javascript, is also that didn't want to spend too much time on the assignment simply because I am not very confident with using Typescript plus I have followed the the suggestion of working on under 8 hours.


