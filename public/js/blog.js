$("#return").on("click", () => {
  window.location.href = "/suggest";
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
