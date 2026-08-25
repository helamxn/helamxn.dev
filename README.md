# helamxn.dev

> Portafolio web interactivo con interfaz estilo terminal / CLI de Unix, desarrollado con **Astro** y **TypeScript**.

🌐 **Sitio web:** [https://helamxn.dev](https://helamxn.dev)

---

## ⚡ Características

* **Experiencia de Consola Interactiva:**
  * Navegación y ejecución de comandos en tiempo real (`whoami`, `ls`, `projects`, `journey`, `skills`, `tools`, `contact`, `clear`, `help`).
  * Autocompletado accesible con sugerencias (`Tab`).
  * Historial de comandos (`↑` / `↓`).
  * Atajo para limpiar terminal (`Ctrl + L`).
  * Accesibilidad por teclado y enlace de salto (*Skip Link*).
* **Diseño y Estética:**
  * Tema oscuro inspirado en consolas Unix / Linux con paleta semántica.
  * Tipografía monoespaciada *Cascadia Code*.
  * Arte ASCII personalizado para la identidad del perfil.
* **Rendimiento y SEO:**
  * Generación de sitio estático ultra rápido (SSG) con **Astro**.
  * Metadatos completos: Open Graph, Twitter Cards y datos estructurados Schema.org (`Person`).
  * Respaldo accesible con soporte para `<noscript>`.

---

## 🛠️ Stack Tecnológico

* **Framework:** [Astro](https://astro.build/)
* **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
* **Estilos:** Vanilla CSS (CSS Variables, Flexbox, CSS Grid)
* **Tipografía:** [Cascadia Code](https://github.com/microsoft/cascadia-code)
* **Gestor de paquetes:** [pnpm](https://pnpm.io/)

---

## 📁 Estructura del Proyecto

```text
/
├── public/                  # Favicon y recursos estáticos
├── src/
│   ├── components/          # Componentes generales (Header, Footer)
│   │   └── terminal/        # Componentes de la consola y comandos
│   │       └── outputs/     # Vistas de salida de cada comando
│   ├── config/              # Configuración general del sitio y SEO
│   ├── data/                # Datos del portafolio y lista de comandos
│   ├── layouts/             # Layout principal (HTML head, SEO, fuentes)
│   ├── pages/               # Página principal (index.astro)
│   ├── scripts/             # Lógica interactiva de la terminal (terminal.ts)
│   ├── styles/              # Hoja de estilos global (global.css)
│   └── types/               # Definiciones de tipos TypeScript
├── astro.config.mjs         # Configuración de Astro
├── package.json
└── tsconfig.json
```

---

## 💻 Comandos Disponibles en la Terminal Web

| Comando | Alias | Descripción |
| :--- | :--- | :--- |
| `whoami` | `about`, `bio`, `id` | Muestra perfil, resumen y áreas de interés |
| `ls` | `dir`, `list` | Lista las secciones disponibles |
| `projects` | `proyectos`, `repos` | Muestra proyectos destacados y repositorios |
| `journey` | `experience`, `timeline` | Trayectoria laboral y académica |
| `skills` | `habilidades` | Lista de habilidades técnicas y blandas |
| `tools` | `herramientas`, `stack` | Herramientas y tecnologías utilizadas |
| `contact` | `contacto`, `email` | Información de contacto y redes |
| `help` | `?`, `--help` | Muestra la ayuda de comandos |
| `clear` | `cls` | Limpia la pantalla de la terminal |

---

## 🚀 Instalación y Desarrollo Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/helamxn/helamxn.dev.git
   cd helamxn.dev
   ```

2. **Instalar dependencias:**
   ```bash
   pnpm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   pnpm dev
   ```
   El sitio estará disponible en `http://localhost:4321`.

4. **Construir para producción:**
   ```bash
   pnpm build
   ```

5. **Previsualizar la compilación de producción:**
   ```bash
   pnpm preview
   ```
