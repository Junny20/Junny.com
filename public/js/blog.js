$("#return").on("click", () => {
  window.location.href = "/suggest";
});

$("#subscribe").on("click", () => {
  window.location.href = "/subscribe";
});

$(".blog").on("click", () => {
  window.location.href = "/content";
})

window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-music");
  if (audio) {
    audio.volume = 0.01;
    audio.play()
  }
});
