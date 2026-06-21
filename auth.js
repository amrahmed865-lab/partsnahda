import { auth } from "./firebase.js";

import {
 signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const email=document.getElementById("email");
const password=document.getElementById("password");
const loginBtn=document.getElementById("loginBtn");
const msg=document.getElementById("msg");

loginBtn.onclick=async()=>{

 try{

  await signInWithEmailAndPassword(
   auth,
   email.value,
   password.value
  );

  location.href="parts.html";

 }catch(err){

  msg.textContent=err.message;

 }

};
