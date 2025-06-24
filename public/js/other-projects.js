window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-music2");
  if (audio) {
    audio.volume = 0.05;
    audio.play();
  }
});

$("#gold_book").on("click", ()=>{window.location.href = "/"});


$("#lychee").hover(()=>{$("#p1").toggleClass("hidden")});
$("#potion").hover(()=>{$("#p2").toggleClass("hidden")});
$("#red_book").hover(()=>{$("#p3").toggleClass("hidden")});
$("#ring").hover(()=>{$("#p4").toggleClass("hidden")});
$("#strawberry").hover(()=>{$("#p6").toggleClass("hidden")});