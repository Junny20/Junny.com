$("#submit").on("click", () => {
  Swal.fire({
    title: "Message sent!",
    text: "Thanks for getting in touch!",
    icon: "success",
    confirmButtonText: "Return to homepage",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/";
    }
  });
});
