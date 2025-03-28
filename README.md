# Documentación del Proyecto

## Descripción

Este proyecto es un editor de Markdown con vista previa en HTML. Permite cargar archivos `.md`, contar caracteres y palabras, exportar a PDF y manejar tiempos de carga simulados con opción de cancelación.

## Funcionalidades Principales

- **Vista previa en tiempo real** de Markdown convertido a HTML.
- **Carga de archivos Markdown** desde el sistema de archivos.
- **Conteo dinámico** de caracteres y palabras.
- **Exportación a PDF** con simulación de tiempos de carga.
- **Cancelación de operaciones** en la exportación a PDF.

## Uso de Promesas y Try/Catch

### **Carga de archivos Markdown**

#### Código de Exportación

```javascript
fileInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    loadFileBtn.textContent = "Cargando...";
    try {
        const content = await file.text();
        markdownInput.value = content;
        updateCounts();
        renderPreview(convertToHtml(content));
    } catch (error) {
        alert("Error al leer el archivo");
    } finally {
        loadFileBtn.textContent = "Cargar Markdown";
    }
});
```

#### Detalles de la Implementación

- Se usa una **promesa con `await`** para leer el contenido del archivo.
- El bloque `try/catch` maneja posibles errores, como que el archivo no se pueda leer.
- `finally` restablece el botón a su estado original tras completar la operación.

---

### **Exportación a PDF con simulación de carga y cancelación**

#### Código relevante

```javascript
exportPdfBtn.addEventListener("click", () => {
    exportPdfBtn.disabled = true;
    exportPdfBtn.textContent = "Exportando...";
    cancelBtn.classList.remove("hidden");

    const delay = Math.floor(Math.random() * 5000) + 1000; // Entre 1s y 6s
    exportTimeout = setTimeout(() => {
        alert("PDF exportado con éxito");
        exportPdfBtn.disabled = false;
        exportPdfBtn.textContent = "Exportar a PDF";
        cancelBtn.classList.add("hidden");
    }, delay);
});

cancelBtn.addEventListener("click", () => {
    if (exportTimeout) {
        clearTimeout(exportTimeout);
        exportPdfBtn.disabled = false;
        exportPdfBtn.textContent = "Exportar a PDF";
        alert("Operación cancelada");
        cancelBtn.classList.add("hidden");
    }
});
```

#### Explicación

- Se simula un **tiempo de carga aleatorio** usando `setTimeout`.
- La variable `exportTimeout` guarda la referencia al temporizador.
- **El botón de cancelación** (`cancelBtn`) detiene la operación con `clearTimeout`.
- Se actualiza la interfaz para reflejar el estado de la operación.

## Requisitos

- Navegador compatible con JavaScript.
- Biblioteca `marked.js` para procesar Markdown.
- Tailwind CSS para estilos.
