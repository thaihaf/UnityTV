
$("#player__burger").click(function (e){
    $("#player__burger").toggleClass("active");
    $(".player__games").toggle();
});
const player = new Plyr('#player');