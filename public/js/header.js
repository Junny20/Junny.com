$("#about").click(() => {
  if (window.location.pathname !== "/about") {
    window.location.pathname = "/about";
  } else {
    window.location.pathname = "/";
  }
});
$("#contact").click(() => {
  if (window.location.pathname !== "/contact") {
    window.location.pathname = "/contact";
  } else {
    window.location.pathname = "/";
  }
});
$("#github").click(() => {
  window.location.href = "https://github.com/Junny20";
});
$("#blogpage").click(() => {
  if (window.location.pathname !== "/blog") {
    window.location.pathname = "/blog";
  } else {
    window.location.pathname = "/";
  }
});
