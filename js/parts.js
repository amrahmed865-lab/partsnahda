import { db, auth } from "./firebase.js";

import {
collection,
addDoc,
serverTimestamp,
onSnapshot
}
from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

import {
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const saveBtn = document.getElementById("saveBtn");

const partName = document.getElementById("partName");
const manufacturer = document.getElementById("manufacturer");
const partNumber = document.getElementById("partNumber");
const machine = document.getElementById("machine");
const repairCenter = document.getElementById("repairCenter");
const repairSerial = document.getElementById("repairSerial");
const reason = document.getElementById("reason");
const notes = document.getElementById("notes");

const partsContainer =
document.getElementById("partsContainer");

let currentUser=null;

onAuthStateChanged(auth,user=>{

 if(!user){
   location.href="index.html";
   return;
 }

 currentUser=user;

});

saveBtn.onclick = async()=>{

 if(!partName.value.trim()) return;

 await addDoc(
   collection(db,"parts"),
   {

    partName:partName.value,

    manufacturer:manufacturer.value,

    partNumber:partNumber.value,

    machine:machine.value,

    repairCenter:repairCenter.value,

    repairSerial:repairSerial.value,

    reason:reason.value,

    notes:notes.value,

    status:"out",

    createdBy:currentUser.email,

    createdAt:serverTimestamp()

   }
 );

 partName.value="";
 manufacturer.value="";
 partNumber.value="";
 machine.value="";
 repairCenter.value="";
 repairSerial.value="";
 reason.value="";
 notes.value="";

};

onSnapshot(
 collection(db,"parts"),
 snapshot=>{

   partsContainer.innerHTML="";

   let out=0;
   let returned=0;
   let installed=0;

   snapshot.forEach(doc=>{

     const p=doc.data();

     if(p.status==="out") out++;
     if(p.status==="returned") returned++;
     if(p.status==="installed") installed++;

     partsContainer.innerHTML += `
      <div class="part">

       <h3>${p.partName}</h3>

       <p>🏭 ${p.manufacturer||"-"}</p>

       <p>🖨 ${p.machine||"-"}</p>

       <p>🔧 ${p.repairCenter||"-"}</p>

       <p>🏷 ${p.repairSerial||"-"}</p>

       <span class="badge out">
        خارج للصيانة
       </span>

      </div>
     `;

   });

   document.getElementById("outCount").innerText=out;
   document.getElementById("returnedCount").innerText=returned;
   document.getElementById("installedCount").innerText=installed;
   document.getElementById("totalCount").innerText=snapshot.size;

 });
