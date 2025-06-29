$("#submit").on("click", () => {
  const subject = $("#subject").val()
  const message = $("#message").val()
  if (subject.length !== 0 && message.length !== 0) {
    Swal.fire({
      theme: "dark",
      backdrop: false,
      title: "Message sent!",
      text: "Thanks for getting in touch!",
      icon: "success",
      confirmButtonText: "Return to homepage",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/";
      }
    });
  }
});
