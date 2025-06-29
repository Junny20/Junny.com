$("#submit").on("click", ()=>{
    const title = $("#title").val();
    const message = $("#message").val();
    if (title.length !== 0 && message.length !== 0) {
        Swal.fire({
            theme: "dark",
            backdrop: false,
            titleText: "Thank you!",
            icon: "success",
            confirmButtonText: "Return to homepage",
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/';
            }
        });
    }
});