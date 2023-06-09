window.addEventListener("load", () => {
    let toastMessage = document.querySelector(".toast-message")

    if (toastMessage) {
        switch (toastMessage.getAttribute("data-status")) {
            case "success":
                toastr.success(toastMessage.innerHTML)
                break

            case "info":
                toastr.info(toastMessage.innerHTML)
                break

            case "warning":
                toastr.warning(toastMessage.innerHTML)
                break

            case "error":
                toastr.error(toastMessage.innerHTML)
                break
        }
    }
})