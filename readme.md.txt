This project is host to the git hub : https://github.com/saurabh222132/newEcommerceapp

and frontend deployed on netlify / and backend deployed on the render 

> working of  project: 

 Frontend : - structure of app

 redux toolkit is used : 

   /node_modueles
   /public 
   /src 
         /features         --------------------------{  this folder contains  all the features of the app } 
                   /cart
                         >cart.js   ----------------------{ this is main file } 
                         >cartAPI.js     -------------------{ the API file is used to fetch all the data required to the cart.js from the backend }
                         >cartSlice.js ---------------------{ cartSlice.js is used to store the state in the redux store / it is part of redux toolkit} 
                  /auth
                         /component
                                     >Login.js
                                     >Signup.js
                                     >Logout.js
                          >authAPI.js
                          >authSlice.js
             /pages                         ---------------------{ this folder contains the complete pages that is need to render } 
                         >Homepage.js
                         > cartpage.js
                         >loginpage.js 
         >app.js
         /pages 
         >App.js
         >index.js
   >data.js
   >package.json
   etc


/==========================================================================================/
 
 wroking of authentication 

 for authentication we have used jwt. flow of authentication 

 1>firstly use signup to the page 
 2> when user login to the page their password and email send to the backend and there is check that is it valid user and password is correct. 

  if yes , then we generate the access token and refresh token , now access token send in json response and refresh token send in cookie to the client side.
  

 ??Note : for the cross site error when you send cookie from port 4000 to 3000 you have to  use cors middleweare with options { credentials : true } to set cookie in frontend and to send the request to backend with cookie you need to use { withCredentials : ture } option in axios .

// access token and refresh token 
       
       > expires time of access token is small from some minuts to hours 
       > expires time of refresh token is from 14day of month 
          > the cookie with { httpOnly : true } can only be access by the server side

 3> now , in frontend we store the accesss token in the localStorage or the state of the app and we have to send this                 token in the authorization header of every request.

   (it's better to store the app in the state of app because when app is closed the state vanished so no fear of hacking of access token , but in local storage there can be hack your access token ).
     and refresh token stored in cookies 

      the refresh token is sent to the server automatically with cookie because cookie is autometically sent with every consecutive requests

4> now , when the access token is expires we make a to the  ( /auth/refresh endpoint )  to server to get the new access token in the response . and now we store the new access token in the local storage. 

5> for the refresh of the accesstoken we use the "axios interceptors" that has access to the req and response object before passing to actual object. 
 >  when access token is expires the reponse is return with 403 error message. 
 > so when we get the 403 errror then we send the request to the refresh token from the server. 
 > for more detail see the axios intercerptor tutorials. 
   