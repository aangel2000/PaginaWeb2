const form = document.getElementById("loginForm")
const mensaje = document.getElementById("mensaje")

function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto
    mensaje.className = "alert alert-" + tipo + " mt-3"
}

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("password").value

    try {
        const respuesta = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })

        const data = await respuesta.json()

        if (!respuesta.ok) {
            mostrarMensaje(data.error || "No se pudo iniciar sesión", "danger")
            return
        }

        sessionStorage.setItem("usuario", JSON.stringify(data.usuario))
        mostrarMensaje("¡Bienvenida, " + data.usuario.nombre + "!", "success")

        setTimeout(() => {
            window.location.href = "profile.html"
        }, 1000)

    } catch (error) {
        mostrarMensaje("No se pudo conectar con el servidor", "danger")
    }
})
