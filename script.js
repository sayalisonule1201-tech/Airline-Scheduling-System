let flights=JSON.parse(localStorage.getItem("flights"))||[
{flightNo:101,source:"Mumbai",destination:"Delhi",departure:"06:00",arrival:"08:30",status:"Scheduled"},
{flightNo:102,source:"Delhi",destination:"Bangalore",departure:"10:00",arrival:"12:45",status:"Scheduled"},
{flightNo:103,source:"Chennai",destination:"Kolkata",departure:"14:00",arrival:"16:20",status:"Scheduled"}
];

saveData();

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
alert("Fill all fields");
return;
}

let exists=flights.some(f=>f.flightNo==flightNo);

if(exists){
alert("Flight already exists");
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

document.getElementById("flightNo").value="";
document.getElementById("source").value="";
document.getElementById("destination").value="";
document.getElementById("departure").value="";
document.getElementById("arrival").value="";
document.getElementById("status").value="Scheduled";

saveData();
}

function loadFlights(list=flights){
let table=document.getElementById("flightTable");
table.innerHTML="";

list.forEach((f,index)=>{

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
<button class="action-btn edit" onclick="editFlight(${index})">Edit</button>
<button class="action-btn cancel" onclick="cancelFlight(${index})">Cancel</button>
<button class="action-btn delete" onclick="deleteFlight(${index})">Delete</button>
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

function editFlight(index){

let f=flights[index];

let flightNo=prompt("Flight Number",f.flightNo);
if(flightNo===null)return;

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
flightNo:Number(flightNo),
source,
destination,
departure,
arrival,
status
};

saveData();

}

function cancelFlight(index){

if(confirm("Cancel this flight?")){

flights[index].status="Cancelled";

saveData();

}

}

function deleteFlight(index){

if(confirm("Delete this flight?")){

flights.splice(index,1);

saveData();

}

}

window.onload=function(){

loadFlights();

};
}
