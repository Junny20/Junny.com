$("#return").on("click", () => {
  window.location.href = "/post";
});

$(".blog").on("click", () => {
  window.location.href = "/content";
})

window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-music");
  if (audio) {
    audio.volume = 0.1;
    audio.play()
  }
});
