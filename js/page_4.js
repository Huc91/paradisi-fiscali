

//ATTENZIONE
//
//
//SOLO PER CODICE CHE INFLUENZA 4.html

//accordion change icon when clicked
function toggleIcon(e) {
      $(e.target)
          .prev('#acct')
          .find(".more-less")
          .toggleClass('plus minus');
  }
  $('#Lux').on('hidden.bs.collapse', toggleIcon);
  $('#Lux').on('shown.bs.collapse', toggleIcon);

  $('#Olanda').on('hidden.bs.collapse', toggleIcon);
  $('#Olanda').on('shown.bs.collapse', toggleIcon);

  $('#irl').on('hidden.bs.collapse', toggleIcon);
  $('#irl').on('shown.bs.collapse', toggleIcon);

  $('#MAN').on('hidden.bs.collapse', toggleIcon);
  $('#MAN').on('shown.bs.collapse', toggleIcon);

  $('#JER').on('hidden.bs.collapse', toggleIcon);
  $('#JER').on('shown.bs.collapse', toggleIcon);

  $('#Malta').on('hidden.bs.collapse', toggleIcon);
  $('#Malta').on('shown.bs.collapse', toggleIcon);
