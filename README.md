# gio-data-pro  

## Data Projects, Architecture, Concepts, Discussions & Personal Portfolio

Welcome to **gio-data-pro**, my portfolio and documentation space for data projects, experiments, and architectural explorations.  

It’s built with **MkDocs + Material Theme** and serves both as an online CV and a living knowledge base for my work in data engineering, analytics, and applied open data.

---

## Local Development (Quickstart)

Clone the repo and start the local MkDocs development server.  
You’ll need **Python 3.10+** and a virtual environment.

### 1. Create and activate a virtual environment

```bash
python -m venv .venv
source .venv/bin/activate   # macOS/Linux
# or
.\.venv\Scripts\activate    # Windows
````

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

*(If you don’t have a `requirements.txt` yet, simply run:)*

```bash
pip install mkdocs-material mkdocs-macros-plugin mkdocs-minify-plugin \
            mkdocs-git-revision-date-localized-plugin
```

### 3. Run the local server

```bash
mkdocs serve
```

You’ll see output like:

```
INFO    -  Serving on http://127.0.0.1:8000/
```

Then open your browser at [http://127.0.0.1:8000](http://127.0.0.1:8000) to preview your site.

---

## Adding or Editing Content

### Add a New Project

1. Create a new Markdown file under `docs/projects/`
   Example:

   ```bash
   docs/projects/my_new_project.md
   ```
2. Add your content — use headings, tables, Mermaid diagrams, and images under `docs/assets/images/`.
3. Update `mkdocs.yml` to include your new page:

   ```yaml
   nav:
     - Projects:
         - My New Project: projects/my_new_project.md
   ```
4. Run `mkdocs serve` again to see the changes live.

### Edit an Existing Page

* Simply open any file under `docs/` and edit in Markdown.
* All pages support **Mermaid diagrams**, **emoji**, and **cards** (thanks to MkDocs Material).
* You can use callout blocks like:

  ```markdown
  !!! tip
      This is a useful tip box.
  ```

---

## Tips for `mkdocs.yml`

* To **add navigation sections**, group items under `nav:` like:

  ```yaml
  nav:
    - Home: index.md
    - About: about.md
    - CV:
        - Overview: cv/index.md
        - Projects: cv/cv_projects.md
  ```

* Add new **features** (like dark/light mode toggle or footer) under `theme:`.
* Define social links in the `extra:` section.
* To use custom CSS or JS:

  ```yaml
  extra_css:
    - assets/css/custom.css
  extra_javascript:
    - assets/js/custom.js
  ```
* Want to deploy quickly (repo needs to be public)? Use:

  ```bash
  mkdocs gh-deploy --force
  ```

---

## Pro Tips

* **Use icons** for faster visual scanning check the [docs](https://squidfunk.github.io/mkdocs-material/reference/icons-emojis/).
* **Use Mermaid** to make [diagrams](https://squidfunk.github.io/mkdocs-material/reference/icons-emojis/) (works natively in Material).
* **Use Cards** for nice layout [grids](https://squidfunk.github.io/mkdocs-material/reference/grids/):

  ```html
  <div class="grid cards" markdown>
  - :material-bike: **MapAqua**
    Find drinking water sources for cyclists across Switzerland.
  - :material-map: **VeloCrash**
    Visualize cycling accident data for safer rides.
  </div>
  ```
* **Keep commits atomic** — one project or one change per commit.
* **Preview before pushing** — `mkdocs serve` refreshes automatically.

---

## Repository Structure

```
gio-data-pro/
├── docs/
│   ├── index.md
│   ├── about.md
│   ├── cv/
│   │   ├── index.md
│   │   ├── ...md
│   ├── projects/
│   │   ├── ...md
│   └── assets/
│       ├── images/
│       └── css/
├── mkdocs.yml
├── README.md
└── requirements.txt
```

---

## License

All content © 2025 Giovanni López.
Text and documentation licensed under **CC BY-NC 4.0** (non-commercial reuse allowed with attribution).
Code snippets under **MIT License**.

---

> **gio-data-pro** is my living data lab, where engineering meets storytelling, and where open data, design, and curiosity share the same ride.
