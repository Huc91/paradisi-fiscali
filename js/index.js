

//ATTENZIONE
//
//
//SOLO PER CODICE CHE INFLUENZA index.html

$(document).ready(function(){

//get scroll position to hide or reveal the cap name
var capTop = document.getElementById("cap-top");
var ph = document.getElementById("top");
window.onscroll = function (e) {
  if (window.scrollY >= document.getElementById("f-i").scrollTop+ph.offsetHeight) {
    capTop.style.opacity = 0;
    capTop.innerHTML = "Ep.1</br>Chi è rimasto in paradiso";
    capTop.style.opacity = 1;
  } else {
    capTop.style.opacity = 0;
    capTop.innerHTML = "Paradisi Fiscali";
    capTop.style.opacity = 1;
  }
};



//mapbox maps
//access Token
mapboxgl.accessToken = 'pk.eyJ1IjoicmFpZGF0YWpvdXJuYWxpc20iLCJhIjoiY2o3dnUza2cxNHdpMjJxcnJmNmh4dXhkbiJ9.P-Ps_O_Cv6IcC8oIVeYJIQ';

//initiliaze maps
var map1 = new mapboxgl.Map({
  container: 'map1', // container id
  style: 'mapbox://styles/raidatajournalism/cj92ht88mlp132rojgghdil81', // stylesheet location
  center: [9.892, 38.292], // starting position [lng, lat]
  zoom: 1.8 // starting zoom
});

var map2 = new mapboxgl.Map({
  container: 'map2',
  style: 'mapbox://styles/raidatajournalism/cj92ifq0b3p552so4lp4i0nd7',
  center: [11.892, 54.626],
  zoom: 2.2
});


//layers to hide and show
var layerMap1 = {
ita: ['seychellesitaly', 'gibraltar_maldives_marshall italy', 'Italia', 'mauritius italy' ],
oxfam: ['delaware6', 'gibraltar_maldives_marshall oxfam', 'seychelles oxfam', 'Oxfam', 'mauritius Oxfam'],
ue:	['seychellesUe', 'Ue2', 'seychelles oxfam', 'gibraltar_maldives_marshall UE copy', 'mauritius UE']
};

var layerMap2Country = {
    ottimo: ['mauritius coMPLIANT', 'complian'],
    buono: ['largely compliant', 'seychelles largely compliant', 'gibraltar largely compliant'],
    suff:	['partially compliant', 'marshall islands partially compliant'],
    insuff: ['NON compliant']
  };

var layerMap2Year	= {
        year17: ['2017', 'gibraltar', 'seychelles6'],
        year18: ['2018', 'Marshall ISlands', 'mauritius']
      };

//checkRadio
function checkRadio(mID, layerMap, ida){
//generate the lengend name to use
var len = 'legenda_'+ida;
var legendMap = document.getElementsByName(len);
//iterate trough the option of the radio button
//for each radio button:
legendMap.forEach(function(element){
  //element.checked ? console.log(element.id + ' checked' ) : console.log(element.id + ' not_checked' );
  //array used later to push some key
  var groups = [];
  //if the radio button is checked:
  if (element.checked) {
    //iterate trough the layerMap object selected
    for (var key in layerMap) {
      //iterate only trough property that i Added when I generated it (Javascript thing)
      if (layerMap.hasOwnProperty(key)) {
        //push the name of the key to the groups array
        // I Know it's stupid I could do everything inside this
        //key loop but I coulnd't figure out why it wansn't working
        //so that's the solution i found early. The real solution
        //is to to use groups[key] and not groups.key
        //to access the object properties
         groups.push(key);
        }
      }
    //iterate the groups object
    groups.forEach (function(group){
      //show all the layer by iterating all layers
      //and activate them
      layerMap[group].forEach (function(layer){
        showLayer(layer);
      })
      //if the group name is not the same of the id of
      //the radio button activated hide them.
      // that's good, because we want to filter based
      //on the selected option
      //if i want to show italy
      // i want to hide everything else
      if (group !== element.id && element.className !== 'all') {
      layerMap[group].forEach (function(layer){
        hideLayer(layer);
      })
      }
    })
    }
  })

  //the fuctions that i use to hide/show
  function hideLayer(layerID) {
    //mapbox method to hide layer
    mID.setLayoutProperty(layerID, 'visibility', 'none');
  }

  function showLayer(layerID) {
    //mapbox method to show layer
      mID.setLayoutProperty(layerID, 'visibility', 'visible');
  }
};

//maps on load code to execute
map1.on('load', function () {
//prevent scrolling of map if i'm just passing trough
map1.scrollZoom.disable();
var timer;
var timerOut;
var addControlla = false;

if ( addControlla === false ){
map1.addControl(new mapboxgl.NavigationControl());
addControlla = true;
}

$('.timer').on('mouseover', function(){
timer = setTimeout(function(){
map1.scrollZoom.enable();
console.log('scroll_enanled');

}, 2000);
});

$('.timer').on('mouseout', function(){
timerOut = setTimeout(function(){
map1.scrollZoom.disable();
console.log('scroll_disabled');
}, 2000);
});

// disable map rotation using right click + drag
map1.dragRotate.disable();
// disable map rotation using touch rotation gesture
map1.touchZoomRotate.disableRotation();

//select what control layer to append the change event
$( "#layer-map1" ).change(function() {
//pass arguments to the checkRadio function
//map where to act, the layers objects, the string of the map
checkRadio(map1, layerMap1, 'map1');
});
});

//map2
map2.on('load', function () {

map2.addControl(new mapboxgl.NavigationControl());
map2.scrollZoom.disable();
map2.dragRotate.disable();
map2.touchZoomRotate.disableRotation();


$( "#layer-map2" ).change(function() {
//pass arguments to the checkRadio function
//map where to act, the layers objects, the string of the map
checkRadio(map2, layerMap2Country, 'map2');
});
$( "#layer2-map2" ).change(function() {
//pass arguments to the checkRadio function
//map where to act, the layers objects, the string of the map
checkRadio(map2, layerMap2Year, '2map2');
});
});
});
