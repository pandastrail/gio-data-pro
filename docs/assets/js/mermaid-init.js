(function () {
  function renderMermaid() {
    if (!window.mermaid) {
      return;
    }

    const scheme = document.body.getAttribute("data-md-color-scheme");
    const theme = scheme === "slate" ? "dark" : "default";

    window.mermaid.initialize({
      startOnLoad: false,
      theme,
    });

    window.mermaid.run({
      nodes: document.querySelectorAll(".mermaid, .language-mermaid"),
    });
  }

  if (document.readyState !== "loading") {
    renderMermaid();
  } else {
    document.addEventListener("DOMContentLoaded", renderMermaid);
  }

  if (window.document$) {
    window.document$.subscribe(renderMermaid);
  }
})();
