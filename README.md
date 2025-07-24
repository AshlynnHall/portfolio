Short summary of API integration:

    I added a weather API of my hometown and where I'll be living again next week. This weather API is integrated into my index page using openweathermap.org and shows the following for the location of Spring, TX:

    -Current temperature in Farenheit
    -The high temperature of the day
    -The current humidity percentage
    -The current weather state (sunny, cloudy, raining, etc)
    -An icon to that represent the current weather state

What I added:

    First I deployed the webpage to Render as a Web Service. I added a .env file that multiple files would reference for the API key hosted on openweathermap.org. I added the key to Render as an enviroment variable so that the API would work both locally and on the hosted site.

    I created a weather.js file that collects the data from the API that will be displayed. Before it displays it, it converts everything into the proper formatting and grabs the correct icons to be displayed to match the current weather condition. It then builds and displays the data. 

    There is error handling, loading content when connection is slow, and a retry button if the API fails to load.

    I added CSS to make the API look seamless and clean on the index page. 

    Unrelated to the API, I fixed the mobile view on the home page and added content to the "Work Experience" section. I put the Work Experience and Weather next to each other on desktop view and now have them stack when on mobile.


How to test the Weather API:

    To test that the API is working correctly, you can just visit the homepage and it should display.

    To test the loading functionality:
    -Open Developer Tools on the homepage (Right click > Inspect or F12)
    -Go to Network tab
    -At the top right below the tabs, there is a connection icon, click it and change it from the default to "3G".
    -Refresh the page to display the loading functionality

    To test error/retry display:
    
    -Open Developer Tools on the homepage (Right click > Inspect or F12)
    -Go to Network tab
    -Right-click on "weather?lat=30.0799&long=-95...." and click "Block request URL"
    -Refresh the page to see the error/retry display