$("#submit").on("click", ()=>{
    const title = $("#title").val();
    const message = $("#message").val();
    if (title.length !== 0 && message.length !== 0) {
        Swal.fire({
            title: "Feedback sent!",
            icon: "success",
            confirmbuttontext: "Return to homepage",
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/';
            }
        });
    }
});