(function () {
  function renderMermaid() {
    if (!window.mermaid) return;

    // Sync Mermaid theme to MkDocs Material color scheme
    const scheme = document.body.getAttribute("data-md-color-scheme");
    const theme = scheme === "slate" ? "dark" : "default";

    // Default config for all diagrams
    window.mermaid.initialize({
      startOnLoad: false,
      theme,                 // "dark" or "default"
      look: "handDrawn",     // 👈 make hand-drawn the default
      // Optional: keep per-diagram overrides via %%{init: ...}%% working (default behavior)
      // securityLevel: "strict", // keep strict unless you know you need 'loose'
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

  // Re-run on MkDocs Material page changes (instant navigation)
  if (window.document$) {
    window.document$.subscribe(renderMermaid);
  }
})();
