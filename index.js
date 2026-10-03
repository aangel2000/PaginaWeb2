import express from "express"
 
const API_URL = "http://localhost:5000"
 
const app = express()
 
app.use(express.static("Public"))
 
// Proxy hacia la Rest API: el navegador llama a /api/... (mismo origen, sin CORS)
// y el servidor del front lo reenvía a http://localhost:5000/...
app.use("/api", express.json(), async (req, res) => {
    try {
        const tieneBody = !["GET", "HEAD"].includes(req.method)
 
        const respuesta = await fetch(API_URL + req.url, {
            method: req.method,
            headers: { "Content-Type": "application/json" },
            body: tieneBody ? JSON.stringify(req.body ?? {}) : undefined
        })
 
        const texto = await respuesta.text()
 
        res.status(respuesta.status)
            .type(respuesta.headers.get("content-type") || "application/json")
            .send(texto)
    } catch (error) {
        console.error("No se pudo conectar con la API:", error.message)
        res.status(502).json({ error: "No se pudo conectar con la API" })
    }
})
 
app.listen(3000, console.log("http://localhost:3000"))