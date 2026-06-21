import { db, auth } from "./firebase.js";
import {
collection,
addDoc,
serverTimestamp,
onSnapshot,
doc,
updateDoc
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
window.nextStatus = async (id,status)=>{

 const ref = doc(db,"parts",id);

 if(status==="out"){

   await updateDoc(ref,{
     status:"returned",
     returnedBy:currentUser.email,
     returnedAt:serverTimestamp()
   });

 }

 else if(status==="returned"){

   await updateDoc(ref,{
     status:"installed",
     installedBy:currentUser.email,
     installedAt:serverTimestamp()
   });

 }

};

window.addReminder = async(id)=>{

 const title = prompt("عنوان التذكير");

 if(!title) return;

 const value = prompt("بعد كام؟");

 if(!value) return;

 const unit = prompt("minutes / hours / days");

 if(!unit) return;

 alert(`تم إنشاء التذكير: ${title}`);

};

 

 window.nextStatus = async (id,status)=>{

 const ref = doc(db,"parts",id);

 if(status==="out"){

   await updateDoc(ref,{
     status:"returned",
     returnedBy:currentUser.email,
     returnedAt:serverTimestamp()
   });

 }

 else if(status==="returned"){

   await updateDoc(ref,{
     status:"installed",
     installedBy:currentUser.email,
     installedAt:serverTimestamp()
   });

 }

};

window.addReminder = async(id)=>{

 const title = prompt("عنوان التذكير");

 if(!title) return;

 const value = prompt("بعد كام؟");

 if(!value) return;

 const unit = prompt("minutes / hours / days");

 if(!unit) return;

 alert(`تم إنشاء التذكير: ${title}`);

};

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

reminders:[],

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

   snapshot.forEach(partDoc=>{

     const p = partDoc.data();
     const id = partDoc.id;

     let badgeClass="out";
     let statusText="خارج للصيانة";

     if(p.status==="out"){
       out++;
     }

     if(p.status==="returned"){
       badgeClass="returned";
       statusText="عادت من المركز";
       returned++;
     }

     if(p.status==="installed"){
       badgeClass="installed";
       statusText="تم تركيبها";
       installed++;
     }

     partsContainer.innerHTML += `
     <div class="part">

       <h3>${p.partName}</h3>

       <p>🏭 ${p.manufacturer || "-"}</p>

       <p>🖨 ${p.machine || "-"}</p>

       <p>🔧 ${p.repairCenter || "-"}</p>

       <p>🏷 ${p.repairSerial || "-"}</p>

       <span class="badge ${badgeClass}">
         ${statusText}
       </span>

      <div style="margin-top:10px">

${
 p.status !== "installed"
 ?
 `
 <button onclick="nextStatus('${id}','${p.status}')">
 ${p.status==="out"
   ? "عادت من المركز"
   : "تم تركيبها"}
 </button>
 `
 :
 `<button disabled>مكتملة</button>`
}

<button onclick="addReminder('${id}')">
⏰ تذكير
</button>

</div>

     </div>
     `;

   });

   document.getElementById("outCount").innerText = out;
   document.getElementById("returnedCount").innerText = returned;
   document.getElementById("installedCount").innerText = installed;
   document.getElementById("totalCount").innerText = snapshot.size;

 });
