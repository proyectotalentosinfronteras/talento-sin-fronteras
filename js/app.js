// ---- Lógica de Navegación del Proyecto ----
document.addEventListener("DOMContentLoaded", () => {
    console.log("¡El sistema de navegación de Talento sin Fronteras está activo!");

    // Efecto visual: Cambiar el color de la barra de navegación al hacer scroll
    const navbar = document.querySelector(".navbar");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            navbar.style.borderBottom = "1px solid #e2e8f0";
        } else {
            navbar.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
            navbar.style.borderBottom = "none";
        }
    });
});
