const STORAGE_KEY = "theme-preference";
const modes = ["light", "dark", "auto"];
const labels = {
  light: "Light",
  dark: "Dark",
  auto: "Auto"
};
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
const toggle = document.querySelector("[data-theme-toggle]");
const label = document.querySelector("[data-theme-label]");

function selectedMode() {
  return localStorage.getItem(STORAGE_KEY) || "light";
}

function resolvedTheme(mode) {
  if (mode === "auto") {
    return mediaQuery.matches ? "dark" : "light";
  }

  return mode;
}

function applyTheme(mode) {
  document.documentElement.dataset.theme = resolvedTheme(mode);

  if (toggle && label) {
    label.textContent = labels[mode];
    toggle.setAttribute("aria-label", `Theme mode: ${labels[mode]}`);
  }
}

if (toggle) {
  toggle.addEventListener("click", () => {
    const currentIndex = modes.indexOf(selectedMode());
    const nextMode = modes[(currentIndex + 1) % modes.length];
    localStorage.setItem(STORAGE_KEY, nextMode);
    applyTheme(nextMode);
  });
}

mediaQuery.addEventListener("change", () => {
  if (selectedMode() === "auto") {
    applyTheme("auto");
  }
});

applyTheme(selectedMode());
