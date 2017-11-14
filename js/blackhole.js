/*Luca Ucciero @Rai Team Data Journalism*/

//display the rest of the article
//get the div that contains it
/*window.onresize = function(){
  location.reload();
}*/

//scroll direction
var lastScrollTop = 0;
var downScroll = false;
var upScroll = false;
var elScrolled = document.getElementById('graf-blackhole-container');
// element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element. credits: https://stackoverflow.com/questions/31223341/detecting-scroll-direction
window.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
   var st =  window.pageYOffset; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
   if (st > lastScrollTop){
       // downscroll code
       downScroll = true;
       upScroll = false;

   } else {
      // upscroll code
      downScroll = false;
      upScroll = true;
   }
   lastScrollTop = st;
}, false);

var elcontainer = document.getElementById('text-roll');
var elcontainerHeight = elcontainer.offsetHeight - window.innerHeight/2;
//d3
//spatial varibles
var documentwidth = window.innerWidth;
var parent = document.getElementById('graf-blackhole-container');
var phone = false;

//tipography variable
var moneyfontSize = 18;
var mobileModifier = 0.6;
var labelSize = 30;

//distance
var distanceSpacer = 300;

var width = parent.offsetWidth/2,
    height = parent.offsetHeight;

//Number of particles
var moneys = [200];

//smaller screen
if (documentwidth < 1200){
  mobileModifier = 0.5;
}
//smartphone variables
if (documentwidth < 900){
    phone = true;
    moneyfontSize = 16;
    mobileModifier = 0.4;
    var width = parent.offsetWidth,
        height = parent.offsetHeight/2;
    var elcontainerHeight = elcontainer.offsetHeight + window.innerHeight/2;
    var labelSize = 18;
    var moneys = [100];
}

if (documentwidth < 500){
  //distance
  var distanceSpacer = 180;
}

if (documentwidth < 400){
    phone = true;
    moneyfontSize = 12;
    mobileModifier = 0.25;
    var width = parent.offsetWidth,
        height = parent.offsetHeight/2;
    //distance
    var distanceSpacer = 120;
    var labelSize = 12;
}




//color variables
var cMain = '#29a47d', //green
    cSecond = '#b02081', //purple
    cThird = '#255eff', //blue
    cBlack = '#212121', //black
    cWhite = '#fafafa'; //white

//Currency to render
var currency = ['£', '$', '€', '¥', '₹', '₽'],
    currencyLength = currency.length;

//container for the data of each "particle"
var money = [];

//Shall i spin it?
var spin = true;
//append rect for zuckerman & henry only once
rectsAppended = false;
//append labels only once
labelsAppended = false;

//valuation zuckman & henry
var valuation = [8.7, 30];
var yScale = d3.scaleLinear()
    .domain(valuation)
    .range([height/8, height-height/1.5]);

var svg = d3.select('#graf-blackhole')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

svg.append('circle')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('r', 30)
    .attr('id', 'blackhole-outer')
    .attr('fill', '#191919');


svg.append('circle')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('r', 22)
    .attr('id', 'blackhole-inner')
    .attr('fill', '#000000');

svg = svg.append('g');

for (var i=0; i<moneys[0]; i++) {
svg.append('text')
    .text(function (d){
      //select a random sign currency to "render"
      var randomIndex = Math.round(Math.random() * currencyLength);
      return currency[randomIndex];
    })
    .attr("text-anchor", "middle")
    .attr("x",function (d) {

        return width / 2;
    })
    .attr("y", function (d, i) {

        var distance = (((height-distanceSpacer) / 2)+30) - Math.floor((Math.random() * (height-distanceSpacer) / 2)-30);
        //console.log('dist '+distance);
        var mid = 1500/distance;
        //chaos mode active: stay with this speed variable
        var speed =  ((Math.random() * 10)+1) *  Math.PI / 180;
        //spiral physics mode active: stay with this speed variable
        //var speed = mid * Math.PI / 180;
        //console.log('speed '+speed+" | "+'mid '+mid);
        var rotation = 0;
        money.push([speed, distance, rotation]);
        return distance;
    })
    .attr("font-family", "sans-serif")
    .attr('class', 'money')
    .attr("font-size", moneyfontSize)
    .attr("fill", cMain)
    .attr("font-weight","regular")
}

//! Step 1

//0 speed, 1 distance, 2 rotation

//spin around
//the movement to do in a time fragment of 100 milliseconds
    function newPlace() {

      if (spin == false) {
        return;
      } else {
      svg.selectAll('.money')
          .transition()
          .delay(0)
          .duration(100)
          .attr('x', function (d, i) {

              var rotation = money[i][2] + money[i][0];
              money[i][2] = rotation;
              return width / 2 + Math.cos(money[i][2]) * money[i][1];
          })
          .attr('y', function (d, i) {
              return height / 2 + Math.sin(money[i][2]) * money[i][1];
          });
      }
    }


//! Step 2
//Attract everything to the black hole center
function magnet() {
  if (downScroll){
    spin = false;
    svg.selectAll('.money')
        .transition()
        .ease(d3.easeExpIn)
        .delay(0)
        .duration(1500)
        .attr('x', width / 2 )
        .attr('y', height /2 );

    explosion();
 }
}

//! Step 3
//Collapse explosion
function explosion() {

  svg.selectAll('.money')
    .transition()
    .ease(d3.easeExpOut)
    .duration(100)
    .delay(1500)
    .attr("fill", "#000")
    .attr("opacity", 0);

  /*d3.select('#graf-blackhole')
    .selectAll('circle#blackhole-outer')
    .transition()
    .ease(d3.easeExpOut)
    .delay(0)
    .duration(300)
    .attr('r', 21 )
    .on('end', innerExplosion );*/

innerExplosion();
function innerExplosion() {
  d3.select('#graf-blackhole')
      .selectAll('circle#blackhole-inner')
      .transition()
      .ease(d3.easeExpOut)
      .delay(1500)
      .duration(1500)
      .attr('r', width)
      .attr('fill', '#212121');
    }
}

//! Step 4
//Money Rain into a rectangle
function moneyRain() {
    if (downScroll){
    //in case of skipping during magnet function
    svg.selectAll('.money')
        .transition()
        .ease(d3.easeExpOut)
        .duration(10)
        .attr('x', width / 2 )
        .attr('y', height /2 );

    d3.select('#graf-blackhole')
        .selectAll('circle#blackhole-inner')
        .transition()
        .ease(d3.easeExpOut)
        .delay(0)
        .duration(500)
        .attr('r', width)
        .attr('fill', cMain);

    if (!rectsAppended) {
    //zuckerman rect
    svg.append('rect')
        .attr('x', width/2 - 45)
        .attr('y', height /2 + height /4)
        .attr('height', 1)
        .attr('width', 45)
        .attr('class', 'black-money')
        .attr('id', 'zuck')
        .attr('fill', cBlack )
        .attr('opacity', 0 );
    //henry rect
    svg.append('rect')
      .attr('x', width/2)
      .attr('y', height /2 + height /4)
      .attr('height', 1)
      .attr('width', 45)
      .attr('class', 'black-money')
      .attr('id', 'henry')
      .attr('fill', cBlack )
      .attr('opacity', 0 );

    rectsAppended = true;
    }

    //the rain
    var dMoneyRect = 0;
    svg.selectAll('.money')
        .transition()
        .ease(d3.easeExpOut)
        .duration(500)
        .attr("fill", cBlack)
        .attr("opacity", 1)
        .transition()
        .ease(d3.easeExpOut)
        .duration(500)
        .delay(function(d, i) {
          dMoneyRect = dMoneyRect + i;
          //console.log(dMoneyRect);
          return i * 20;
        })
        .on("end", blackMoneyRect)
        .attr('x', function (d, i) {
          return width/2 + ((Math.random() * 72)-36)
        })
        .attr('y', function (d, i) {
          return height /2 + height /4 - i * moneyfontSize / moneyfontSize * mobileModifier;
        });
  function blackMoneyRect(){
    svg.selectAll('.black-money')
      .attr('opacity', 1)
      .transition()
      .ease(d3.easeExpOut)
      .duration(dMoneyRect - 500)
      .attr('height', height /4)
      .attr('y', height /4 + height /4);
    }
  }
};

function removeMoney(){
  svg.selectAll('.money')
    .transition()
    .duration(0)
    .attr('opacity', 0 );
  }
//! before divide Step
function beforeCleanDivide(){
  if (downScroll){
    //in case of skipping during money rain
    removeMoney();
    svg.selectAll('.black-money')
      .transition()
      .ease(d3.easeExpOut)
      .duration(10)
      .attr('opacity', 1)
      .attr('height', height /4)
      .attr('y', height /4 + height /4);
  }
};

//! Step 5
//Divide the rectagle and show the data
function divide(){
  if (downScroll){
    //in case of skipping during money rain
    removeMoney();
    svg.selectAll('.black-money')
      .transition()
      .ease(d3.easeExpOut)
      .duration(10)
      .attr('opacity', 1)
      .attr('height', height /4)
      .attr('y', height /4 + height /4);

    //animation of the scene
    svg.select('#zuck')
      .transition()
      .ease(d3.easeExpOut)
      .delay(10)
      .duration(500)
      .attr('x', width/4-22.5 )

    svg.select('#henry')
      .transition()
      .ease(d3.easeExpOut)
      .delay(10)
      .duration(500)
      .attr('x', width - width/4 -22.5 )


    svg.selectAll('.black-money')
      .data(valuation)
      .transition()
      .ease(d3.easeExpOut)
      .delay(510)
      .duration(500)
      .attr('height', function(d){
        return yScale(d);
      })
      .attr('y', function(d){
        return height /2 + height /4 - yScale(d);
      });

      if (!labelsAppended) {
        svg.append('text')
          .text('Zucman')
          .attr('x', width/4)
          .attr('y', height - height /4 + 30)
          .attr("font-family", "Space Mono", "sans-serif")
          .attr("font-size", labelSize)
          .attr("fill", cBlack)
          .attr("class", "labella")
          .attr('opacity', 0)
          .attr("font-weight","bold")
          .attr("text-anchor", "middle")
          .transition()
          .ease(d3.easeExpOut)
          .delay(510)
          .duration(500)
          .attr('opacity', 1)

        svg.append('text')
          .text('$8,7 trilioni')
          .attr('x', width/4)
          .attr('y', height - height /4 + 30  + labelSize*1.5)
          .attr("font-family", "Space Mono", "sans-serif")
          .attr("font-size", labelSize)
          .attr("fill", cBlack)
          .attr("class", "labella")
          .attr('opacity', 0)
          .attr("font-weight","bold")
          .attr("text-anchor", "middle")
          .transition()
          .ease(d3.easeExpOut)
          .delay(510)
          .duration(500)
          .attr('opacity', 1)

      svg.append('text')
        .text('Henry')
        .attr('x', width - width/4)
        .attr('y', height - height /4 + 30)
        .attr("font-family", "Space Mono", "sans-serif")
        .attr("font-size", labelSize)
        .attr("fill", cBlack)
        .attr("class", "labella")
        .attr('opacity', 0)
        .attr("font-weight","bold")
        .attr("text-anchor", "middle")
        .transition()
        .ease(d3.easeExpOut)
        .delay(510)
        .duration(500)
        .attr('opacity', 1)

        svg.append('text')
          .text('$26/36 trilioni ')
          .attr('x', width - width/4)
          .attr('y', height - height /4 + 30 + labelSize*1.5)
          .attr("font-family", "Space Mono", "sans-serif")
          .attr("font-size", labelSize)
          .attr("fill", cBlack)
          .attr("class", "labella")
          .attr('opacity', 0)
          .attr("font-weight","bold")
          .attr("text-anchor", "middle")
          .transition()
          .ease(d3.easeExpOut)
          .delay(510)
          .duration(500)
          .attr('opacity', 1)
    }

  }
};


//inverse d3 transition /////////////////////

function sameHeight(){
  if (upScroll){
    svg.selectAll('.black-money')
      .transition()
      .ease(d3.easeExpOut)
      .duration(10)
      .attr('opacity', 1)
      .attr('height', height /4)
      .attr('y', height /4 + height /4);

    svg.selectAll('.labella')
      .transition()
      .ease(d3.easeExpOut)
      .duration(10)
      .attr('opacity', 0)

  }
};

function unite(){
  if (upScroll){
    svg.select('#zuck')
      .transition()
      .ease(d3.easeExpOut)
      .delay(10)
      .duration(100)
      .attr('x', width/2 - 45 );

    svg.select('#henry')
      .transition()
      .ease(d3.easeExpOut)
      .delay(10)
      .duration(100)
      .attr('x', width/2 );
  }
};

function emptyMoneyRect(){
    if (upScroll){

      svg.select('#zuck')
        .transition()
        .delay(0)
        .duration(0)
        .attr('x', width/2 - 45 );

      svg.select('#henry')
        .transition()
        .delay(0)
        .duration(0)
        .attr('x', width/2 );

      svg.selectAll('.money')
          .transition()
          .duration(0)
          .attr('opacity', 1)
          .attr('y', height /2 + height /4)
          .transition()
          .ease(d3.easeExpOut)
          .duration(500)
          .delay(function(d, i) {
            return i * 5;
          })
          .attr('x', width/2)
          .attr('y', height/2);

      svg.selectAll('.black-money')
          .transition()
          .duration(0)
          .transition()
          .duration(1000)
          .attr('height', 0)
          .attr('y', height/2+height/4);
    }
};

function implosion(){
    if (upScroll){

      //empty money data
      money = [];

      d3.select('#graf-blackhole')
          .selectAll('circle#blackhole-inner')
          .transition()
          .ease(d3.easeExpOut)
          .delay(0)
          .duration(500)
          .attr('r', 22)
          .attr('fill', '#000000');

      svg.selectAll('.money')
          .transition()
          .duration(100)
          .delay(100)
          .attr('x', width/2)
          .attr('y', height/2)
          .attr("fill", cMain)
          .transition()
          .duration(300)
          .delay(100)
          .attr("y", function (d, i) {

              var distance = (((height-distanceSpacer) / 2)+30) - Math.floor((Math.random() * (height-distanceSpacer) / 2)-30);
              //console.log('dist '+distance);
              var mid = 1500/distance;
              //chaos mode active: stay with this speed variable
              var speed =  ((Math.random() * 10)+1) *  Math.PI / 180;
              //spiral physics mode active: stay with this speed variable
              //var speed = mid * Math.PI / 180;
              //console.log('speed '+speed+" | "+'mid '+mid);
              var rotation = 0;
              money.push([speed, distance, rotation]);
              return distance;
          })

      svg.selectAll('.black-money')
          .transition()
          .duration(100)
          .delay(100)
          .attr('opacity', 0)

      function spinActivator(){
        spin = true;
        return;
      }
      setTimeout(spinActivator, 400);

    }
};




//test function with setTimeout

/*
//repeat, repeat, repeat the spin
setInterval(newPlace, 100);
//attract that money
setTimeout(magnet, 5000);
setTimeout(explosion, 7000);
setTimeout(moneyRain, 8500);
setTimeout(divide, 20000);
*/


//scroll magic to make it scrollytelling
// init
//repeat, repeat, repeat the spin
setInterval(newPlace, 100);

// calculate how many divs inside every sticky element, and quit stickness one div before
//var containerHeight = $('.vheight').height() * (($("#blackdiv1 > div").length));
/*var elcontainer = document.getElementsByClassName('slide');
var elcontainerLenght = elcontainer.length;
var elcontainerHeight = elcontainer[0].offsetHeight * (elcontainerLenght - 2);
console.log(elcontainerLenght + ' | ' + elcontainerHeight );*/


var controller = new ScrollMagic.Controller();

var step0 = new ScrollMagic.Scene({triggerElement: "#graf-blackhole-container", triggerHook: "onLeave", duration:elcontainerHeight, offset:0})
	//.addIndicators({name: "lock window"})
	.setPin("#graf-blackhole-container", {pushFollowers: false})
	.addTo(controller);

// create scene
var step1 = new ScrollMagic.Scene({
        triggerElement: "#magnet"
    })
    .on('start', magnet )
    //.addIndicators({name: "magnet"})
    .addTo(controller);

/*var step2 = new ScrollMagic.Scene({
        triggerElement: "#explosion"
    })
    .on('start', explosion )
    //.addIndicators()
    .addTo(controller);*/

var step3 = new ScrollMagic.Scene({
          triggerElement: "#money-rain"
      })
      .on('start', moneyRain )
      //.addIndicators()
      .addTo(controller);

var step4 = new ScrollMagic.Scene({
          triggerElement: "#clean-divide"
        })
        .on('start', beforeCleanDivide )
        //.addIndicators()
        .addTo(controller);

var step5 = new ScrollMagic.Scene({
            triggerElement: "#divide"
        })
        .on('start', divide )
        //.addIndicators()
        .addTo(controller);


//inverse scrolly manage
var invStep1 = new ScrollMagic.Scene({
            triggerElement: "#divide"
        })
        .on('start', sameHeight )
        //.addIndicators()
        .addTo(controller);

var invStep2 = new ScrollMagic.Scene({
              triggerElement: "#clean-divide"
          })
          .on('start', unite )
          //.addIndicators()
          .addTo(controller);

var invStep3 = new ScrollMagic.Scene({
              triggerElement: "#money-rain"
          })
          .on('start', emptyMoneyRect)
          //.addIndicators()
          .addTo(controller);

var invStep3 = new ScrollMagic.Scene({
                triggerElement: "#explosion"
            })
            .on('start', implosion)
            //.addIndicators()
            .addTo(controller);
