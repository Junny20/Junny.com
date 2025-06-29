$("button").on("click", () => {
  const email = $("#email").val();
  const isEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (email.length !== 0) {
    if (!isEmail(email)) {
      Swal.fire({
        theme: "dark",
        backdrop: false,
        titleText: "Invalid email",
        icon: "error",
        confirmButtonText: "Try again",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/subscribe";
        }
      });
    } else {
        Swal.fire({
            theme: "dark",
            backdrop: false,
            titleText: "Subscribed!",
            icon: "success",
            confirmButtonText: "Return to homepage",
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "/";
            }
        })
    }
  }
});
