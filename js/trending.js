$(window).ready(function () {
  let collectionCard = $(".collection__list");
  let listCards = $(".card");

  listCards.click(function () {
    let clickIndex = listCards.index($(this));
    $(".card:not(:eq(" + clickIndex + "))").removeClass("active");

    $(this).toggleClass("active");
  });
});
