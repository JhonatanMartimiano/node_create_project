window.addEventListener("load", () => {
	let buttonsDelete = document.querySelectorAll("[data-action=delete]")

	buttonsDelete.forEach((buttonDelete) => {
		let url = buttonDelete.getAttribute("data-delete"),
			action = buttonDelete.getAttribute("data-action"),
			message = buttonDelete.getAttribute("data-confirm")
		buttonDelete.addEventListener("click", () => {
			Swal.fire({
				icon: "warning",
				title: message,
				preConfirm: () => {
					fetch(url, {
						method: "delete",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							action
						})
					})
						.then((response) => {
							if (response.ok) {
								return response.json()
							} else {
								throw new Error("Erro na requisição: " + response.status)
							}
						})
						.then((data) => {
							if (data.redirect) {
								window.location.href = data.redirect
							}
						})
						.catch((error) => {
							console.error(error)
						})
				},
			})
		})
	})
})
