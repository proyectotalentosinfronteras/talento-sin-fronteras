// ---- Lógica del Consultor de Orientación con IA ----
document.addEventListener("DOMContentLoaded", () => {
    const tarjetas = document.querySelectorAll(".feature-card");

    // Añadir una pequeña interacción de prueba cuando el usuario hace clic en las herramientas
    tarjetas.forEach((tarjeta) => {
        tarjeta.addEventListener("click", () => {
            const tituloHerramienta = tarjeta.querySelector("h3").innerText;
            alert(`🤖 Asistente IA:\n\nHas seleccionado la herramienta "${tituloHerramienta}".\n¡Muy pronto podrás interactuar con este módulo inteligente en tiempo real!`);
        });
    });
});
