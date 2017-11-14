

//ATTENZIONE
//
//
//SOLO PER CODICE CHE INFLUENZA 4.html

$(document).ready(function(){
  //flussi stile timeline a scorrimento sul mobile
  var el = document.getElementById("container-timeline-mobile");
  //el.addEventListener("touchstart", hidder, false);
  el.addEventListener("touchmove", hidder, false);

  //slide event
  var elToHide = document.getElementById("call-action");
  function hidder(){
  	elToHide.style.opacity = 0;
  	setTimeout(displayNone, 200);
  }
  function displayNone(){
  	elToHide.style.display = 'none';
  }

  //accordion change icon when clicked
    function toggleIcon(e) {
          $(e.target)
              .prev('#acc')
              .find(".more-less")
              .toggleClass('plus minus');
      }
      $('#Lux').on('hidden.bs.collapse', toggleIcon);
      $('#Lux').on('shown.bs.collapse', toggleIcon);

      $('#India').on('hidden.bs.collapse', toggleIcon);
      $('#India').on('shown.bs.collapse', toggleIcon);

      $('#HK').on('hidden.bs.collapse', toggleIcon);
      $('#HK').on('shown.bs.collapse', toggleIcon);

      $('#Zuc').on('hidden.bs.collapse', toggleIcon);
      $('#Zuc').on('shown.bs.collapse', toggleIcon);

      $('#Hen').on('hidden.bs.collapse', toggleIcon);
      $('#Hen').on('shown.bs.collapse', toggleIcon);

});
