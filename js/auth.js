import { auth } from "./firebase.js";

import {
 signInWithEmailAndPassword,
 onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const msg = document.getElementById("msg");

loginBtn.onclick = async () => {

 try {

   await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
   );

   location.href = "parts.html";

 } catch(err){

   msg.textContent = err.message;

 }

};

onAuthStateChanged(auth,user=>{

 if(user && location.pathname.includes("index.html")){

   location.href="parts.html";

 }

});
