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

let badgeClass="out";
let statusText="خارج للصيانة";

if(p.status==="returned"){
 badgeClass="returned";
 statusText="عادت من المركز";
}

if(p.status==="installed"){
 badgeClass="installed";
 statusText="تم تركيبها";
}

partsContainer.innerHTML += `
<div class="part">

<h3>${p.partName}</h3>

<p>🏭 ${p.manufacturer||"-"}</p>

<p>🖨 ${p.machine||"-"}</p>

<p>🔧 ${p.repairCenter||"-"}</p>

<p>🏷 ${p.repairSerial||"-"}</p>

<span class="badge ${badgeClass}">
${statusText}
</span>

<div style="margin-top:10px">

<button
onclick="nextStatus('${doc.id}','${p.status}')">

${p.status==="out"
?"عادت من المركز"
:p.status==="returned"
?"تم تركيبها"
:"مكتملة"}

</button>

</div>

</div>
`;

   });

   document.getElementById("outCount").innerText=out;
   document.getElementById("returnedCount").innerText=returned;
   document.getElementById("installedCount").innerText=installed;
   document.getElementById("totalCount").innerText=snapshot.size;

 });
