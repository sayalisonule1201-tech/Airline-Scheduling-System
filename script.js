let flights=JSON.parse(localStorage.getItem("flights"))||[
{flightNo:101,source:"Mumbai",destination:"Delhi",departure:"06:00",arrival:"08:30",status:"Scheduled"},
{flightNo:102,source:"Delhi",destination:"Bangalore",departure:"10:00",arrival:"12:45",status:"Scheduled"},
{flightNo:103,source:"Chennai",destination:"Kolkata",departure:"14:00",arrival:"16:20",status:"Scheduled"}
];

function saveData(){
localStorage.setItem("flights",JSON.stringify(flights));
loadFlights();
}

function addFlight(){
let flightNo=document.getElementById("flightNo").value.trim();
let source=document.getElementById("source").value.trim();
let destination=document.getElementById("destination").value.trim();
let departure=document.getElementById("departure").value;
let arrival=document.getElementById("arrival").value;
let status=document.getElementById("status").value;

if(flightNo===""||source===""||destination===""||departure===""||arrival===""){
alert("Please fill all fields");
return;
}

if(flights.find(f=>f.flightNo==Number(flightNo))){
alert("Flight number already exists");
return;
}

flights.push({
flightNo:Number(flightNo),
source,
destination,
departure,
arrival,
status
});

resetForm();
saveData();
}

function resetForm(){
document.getElementById("flightNo").value="";
document.getElementById("source").value="";
document.getElementById("destination").value="";
document.getElementById("departure").value="";
document.getElementById("arrival").value="";
document.getElementById("status").value="Scheduled";
}

function loadFlights(data=flights){

const table=document.getElementById("flightTable");

table.innerHTML="";

if(data.length===0){
table.innerHTML="<tr><td colspan='7'>No Flights Found</td></tr>";
updateStats();
return;
}

data.forEach(f=>{

let cls=f.status.toLowerCase();

table.innerHTML+=`
<tr>
<td>${f.flightNo}</td>
<td>${f.source}</td>
<td>${f.destination}</td>
<td>${f.departure}</td>
<td>${f.arrival}</td>
<td class="${cls}">${f.status}</td>
<td>
<button class="action-btn edit" onclick="editFlight(${f.flightNo})">Edit</button>
<button class="action-btn cancel" onclick="cancelFlight(${f.flightNo})">Cancel</button>
<button class="action-btn delete" onclick="deleteFlight(${f.flightNo})">Delete</button>
</td>
</tr>
`;
});

updateStats();
}

function updateStats(){

document.getElementById("totalFlights").innerText=flights.length;

document.getElementById("scheduledFlights").innerText=
flights.filter(f=>f.status==="Scheduled").length;

document.getElementById("cancelledFlights").innerText=
flights.filter(f=>f.status==="Cancelled").length;

document.getElementById("departedFlights").innerText=
flights.filter(f=>f.status==="Departed").length;

}

function searchFlight(){

let source=document.getElementById("searchSource").value.trim().toLowerCase();

let destination=document.getElementById("searchDestination").value.trim().toLowerCase();

let result=flights.filter(f=>
f.source.toLowerCase().includes(source)&&
f.destination.toLowerCase().includes(destination)
);

loadFlights(result);

}

function clearSearch(){

document.getElementById("searchSource").value="";
document.getElementById("searchDestination").value="";

loadFlights();

}

function editFlight(flightNo){

let index=flights.findIndex(f=>f.flightNo===flightNo);

if(index===-1){
return;
}

let f=flights[index];

let no=prompt("Flight Number",f.flightNo);
if(no===null)return;

let source=prompt("Source",f.source);
if(source===null)return;

let destination=prompt("Destination",f.destination);
if(destination===null)return;

let departure=prompt("Departure Time",f.departure);
if(departure===null)return;

let arrival=prompt("Arrival Time",f.arrival);
if(arrival===null)return;

let status=prompt("Status (Scheduled/Delayed/Cancelled/Departed)",f.status);
if(status===null)return;

flights[index]={
flightNo:Number(no),
source:source.trim(),
destination:destination.trim(),
departure,
arrival,
status
};

saveData();

}

function cancelFlight(flightNo){

let index=flights.findIndex(f=>f.flightNo===flightNo);

if(index===-1){
return;
}

if(confirm("Are you sure you want to cancel this flight?")){

flights[index].status="Cancelled";

saveData();

}

}

function deleteFlight(flightNo){

let index=flights.findIndex(f=>f.flightNo===flightNo);

if(index===-1){
return;
}

if(confirm("Delete this flight permanently?")){

flights.splice(index,1);

saveData();

}

}

window.onload=function(){

if(!localStorage.getItem("flights")){

localStorage.setItem("flights",JSON.stringify(flights));

}

flights=JSON.parse(localStorage.getItem("flights"));

loadFlights();

};
