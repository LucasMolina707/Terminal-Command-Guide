// 1. Lógica de Copiado
function copyCommand(button) {
    const text = button.parentElement.querySelector('.cmd-text').innerText;
    
    navigator.clipboard.writeText(text).then(() => {
        button.classList.add('copied');
        
        // Cambia el icono temporalmente por un check SVG
        const originalSVG = button.innerHTML;
        button.innerHTML = '<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
        
        setTimeout(() => {
            button.classList.remove('copied');
            button.innerHTML = originalSVG;
        }, 1500);
    });
}

// 2. Buscador Sensible y Auto-filtrante
document.getElementById('searchInput').addEventListener('input', function(e) {
    const term = cleanText(e.target.value);
    const rows = document.querySelectorAll('#commandsTable tbody tr');

    rows.forEach(row => {
        const content = cleanText(row.innerText);
        if (content.includes(term)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});

// Función para quitar tildes y caracteres raros (Mejora ortografía)
function cleanText(text) {
    return text.toLowerCase()
               .normalize("NFD")
               .replace(/[\u0300-\u036f]/g, "") // Quita tildes
               .trim();
}