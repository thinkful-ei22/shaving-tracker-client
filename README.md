## ShaveReducer
A place for shave enthusiasts to come together and create a community. There is currently a market for older and younger gentlemen alike in proper shaving. The use of different razors, lathers, aftershaves, etc... Unfortunately, there currently is no convenient website or application which allows users to keep track of what they use. With ShaveReducer, those needs (and much more) are solved.

## Description

 Here, users can add various shaving products and seperate them into catgeories. We also add other useful features, such as the shave history page, which allows users to keep a log of products used for a shave and leave comments and ratings for further use. These shaves can be shared with the community of users as well.

## Link to Application

I used heroku to deploy this application: https://hetokibo-shaving-client.herokuapp.com/

The backend can be found here: https://github.com/thinkful-ei22/shaving-tracker-server

### A dummy user has been set-up:
    Username: beardy
    Password: wicked

##  Screenshots
### *The home or landing page, where users can register or login:

<img width="1422" alt="screen shot 2018-10-13 at 12 56 27 pm" src="https://user-images.githubusercontent.com/38267761/46909452-71fd6800-cee7-11e8-87c3-032b224f94c7.png">


###  *The collections page, where users can add and view their personal products:

<img width="1439" alt="screen shot 2018-10-13 at 12 57 31 pm" src="https://user-images.githubusercontent.com/38267761/46909467-d1f40e80-cee7-11e8-9ba5-476bb84b2cd1.png">
<img width="1435" alt="screen shot 2018-10-13 at 12 57 44 pm" src="https://user-images.githubusercontent.com/38267761/46909468-d3253b80-cee7-11e8-92ad-2ce17229a428.png">

### *A page where registered users can create and save their shaves:

<img width="1436" alt="screen shot 2018-10-13 at 12 57 52 pm" src="https://user-images.githubusercontent.com/38267761/46909472-e33d1b00-cee7-11e8-9c41-6e3da479dff3.png">
<img width="1433" alt="screen shot 2018-10-13 at 12 58 03 pm" src="https://user-images.githubusercontent.com/38267761/46909473-e33d1b00-cee7-11e8-9b32-7d04608bace8.png">

### *The community page where users can share and view shaves from other users:

<img width="1440" alt="screen shot 2018-10-13 at 12 58 11 pm" src="https://user-images.githubusercontent.com/38267761/46909476-f3ed9100-cee7-11e8-88d7-4b89708180fe.png">



## Tech Stack

This app was created using React for the front-end, and Node for the back-end.

*Front-end*: React was used to build the client side of this application, with Redux used for state-management. React stateful components are used to manage state for each indiviual component. React-router is used to route and connect the various components together. A react-tabs libray is used to create tabs which is used to filter the products viewed on our collection page. The react-modal libaray is used to create a modal when adding products and shaves. PapaParse is another technology used to parse data from a .csv file.

*Back-end*: Node.js was used to create the server side of this application. Mongo was used to manage the database, with mlab to host the data. The express middleware was used to help modularize the server side. Some testing was done using mocha and chai.

## Key Parts

This application has several components. A few of the main components that are responsible for our features are: **CSV-Products**, **My-collection**, **Shave-history** , and **Product-form/Shave-form**.

All of the components live in the src/components/ directory.

_CSV-Products_: The job of this component is to handle the the upload, reading, and parsing of the data from .csv files. This data is used to add a multitude of products onto our Collections page.

_My-collection_: My-collection is responsible for handling the fetched data from the database and displaying it appropriately. It filters the different kinds of shaving products by the use of tabs.

_Shave-history_: Our Shave-history component handles the creation and displaying of the shave history of users. A shave history consists of the shaving products a user may use for his or her shave. The user may also leave a rating and comment to look back on in the future. These shaves may be shared with the "community" of users of the page. Users may also filter their shave's by the date of the shave.

_Product-form/Shave-form_: These two components handle the modal that displays when adding (or editing) products and shaves. 
