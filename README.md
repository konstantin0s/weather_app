create-react-app already handles testing with jest and has flow typing right out of the box with a few quick commands that only take a few seconds to implement. Setting this up on your own with configuring your .babelrc, setting up your jest config inside of package.json, and more just takes much more time when you’re all on your own…
The app is build with external api (weather where node.js, express.js is used in the backend as a middleware, and React.js framework in the front end to display the api data. The style is very minimalistic, the focus was on having a completely functional app where when a user lands for the first time can see a list of cities on home page. On the home page, the user is able to click on a city and see the weather results on a separate detail screen.
Clone the app with: ~ git clone
Run npm install from both folders: root folder and client folder to install all the packages.
Add .env file into root folder with gif api key ( your own app key).

 From root folder, run:
a. ~ npm install (to install middleware)
b. ~ cd client (frontend / react)
c. ~ npm install (install react packages)
d. ~ cd root folder
e. ~ npm run dev (start the backend & frontend)



User stories
1. As a Reviewer, I want a web application that can show the weather data that is supplied by my server: (https://us-central1-mobile-assignment-
server.cloudfunctions.net/weather ). = done
2. As a User, I want to see a home screen with all the cities that are available on the API. = done
3. As a User, I want the cities to be sorted alphabetically. = done
4. As a User, I want to be able to refresh the data that is on the home screen. = done
5. As a User, I want to be able to click on a city and see the weather results on a separate detail screen. = done
6. As a User, I want all the temperatures to be displayed in Celsius. The API returns also Fahrenheit and Kelvin, so they need to be converted:
Celsius = Kelvin - 273.15
Celsius = (Fahrenheit - 32) / 1.8 = done
7. As a User, I want the temperatures to be displayed in chronological order. = not yet
8. As a User, I want to have the ability to hide/unhide a city and remember my choice after a page reload. = not yet
9. As a Reviewer, I want a subject in the README.md explaining how to run the application. = not yet
10. As a Reviewer, I want a subject in the README.md explaining the chosen architecture. = not yet
11. As a Reviewer, I want the application delivered in a zipped Git repo. The Git repo may not be published to a public location. A private GitHub repo is also fine, please invite elements-interviews.
12. As a Reviewer, I want a report of User Stories that couldn't be finished or have a comment. Please add it to the README.md of your project.
13. As a Reviewer, I value the usage of the React or Vue framework. If there is a reason for using another framework, please specify it in the
README.md.
14. As a Reviewer, I value the usage of TypeScript over JavaScript. If there is a reason for writing JavaScript, please specify it in the README.
md
