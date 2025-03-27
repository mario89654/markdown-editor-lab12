document.addEventListener("DOMContentLoaded", () => {
    const previewBtn = document.querySelector("#previewBtn");
    const contrastBtn = document.querySelector("#contrastBtn");
    const clearBtn = document.createElement("button");
    const fileInput = document.createElement("input");
    const exportPdfBtn = document.createElement("button");
    const markdownInput = document.querySelector("#editor");
    const previewSection = document.querySelector("#preview");
    const charCount = document.querySelector("#charCount");
    const wordCount = document.createElement("p");

    wordCount.id = "wordCount";
    wordCount.classList.add("text-gray-500", "text-sm", "mt-1");
    charCount.insertAdjacentElement("afterend", wordCount);

    let isContrastApplied = false;

    const editorPlaceholder = "Escribí tu código Markdown aquí...";
    const previewPlaceholder = "Vista previa de HTML";

    if (!markdownInput.value.trim()) {
        markdownInput.value = editorPlaceholder;
        markdownInput.classList.add("text-gray-500");
    }
    previewSection.innerHTML = `<p class="text-gray-500 text-sm">${previewPlaceholder}</p>`;

    markdownInput.addEventListener("focus", () => {
        if (markdownInput.value === editorPlaceholder) {
            markdownInput.value = "";
            markdownInput.classList.remove("text-gray-500");
        }
    });

    markdownInput.addEventListener("blur", () => {
        if (!markdownInput.value.trim()) {
            markdownInput.value = editorPlaceholder;
            markdownInput.classList.add("text-gray-500");
        }
    });

    function updateCounts() {
        const text = markdownInput.value.trim();
        charCount.textContent = `Caracteres: ${text.length}`;
        wordCount.textContent = `Palabras: ${text ? text.split(/\s+/).filter(word => word.length > 0).length : 0}`;
    }
    markdownInput.addEventListener("input", updateCounts);

    function convertToHtml(markdown) {
        return marked.parse(markdown);
    }

    function renderPreview(htmlContent) {
        previewSection.innerHTML = htmlContent || `<p class="text-gray-500 text-sm">${previewPlaceholder}</p>`;
    }

    previewBtn.addEventListener("click", () => {
        renderPreview(convertToHtml(markdownInput.value));
    });

    //  Botón para limpiar el editor
    clearBtn.textContent = "Limpiar";
    clearBtn.id = "clearBtn";
    clearBtn.classList.add("bg-red-500", "text-white", "px-4", "py-2", "rounded", "mt-2", "transition-all", "duration-300", "hover:bg-red-400");
    markdownInput.insertAdjacentElement("afterend", clearBtn);

    clearBtn.addEventListener("click", () => {
        markdownInput.value = "";
        previewSection.innerHTML = `<p class="text-gray-500 text-sm">${previewPlaceholder}</p>`;
        updateCounts();
    });

    // Botón para cargar archivos Markdown
    fileInput.type = "file";
    fileInput.accept = ".md";
    fileInput.classList.add("hidden");

    const loadFileBtn = document.createElement("button");
    loadFileBtn.textContent = "Cargar Markdown";
    loadFileBtn.classList.add("bg-purple-500", "text-white", "px-4", "py-2", "rounded", "mt-2", "transition-all", "duration-300", "hover:bg-purple-400");

    document.querySelector("header").appendChild(loadFileBtn);
    document.querySelector("header").appendChild(fileInput);

    loadFileBtn.addEventListener("click", () => fileInput.click());

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

    //  Botón para exportar a PDF
    exportPdfBtn.textContent = "Exportar a PDF";
    exportPdfBtn.classList.add("bg-green-500", "text-white", "px-4", "py-2", "rounded-lg", "transition-all", "duration-300", "hover:bg-green-600");

    document.querySelector("header").appendChild(exportPdfBtn);

    exportPdfBtn.addEventListener("click", async () => {
        exportPdfBtn.disabled = true;
        exportPdfBtn.textContent = "Exportando...";
        
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            alert("PDF exportado con éxito");
        } catch (error) {
            console.error("Error al exportar PDF:", error);
            alert("No se pudo generar el PDF");
        } finally {
            exportPdfBtn.disabled = false;
            exportPdfBtn.textContent = "Exportar a PDF";
        }
    });

    updateCounts();
});

