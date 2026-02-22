(function () {
  const COLORS = ["red", "orange", "yellow", "green", "blue", "violet", "white"];

  const lights = [
    { id: 1, name: "Living room back", isOn: true, color: "orange" },
    { id: 2, name: "Living room front", isOn: true, color: "yellow" },
    { id: 3, name: "Bedroom Right", isOn: true, color: "white" },
    { id: 4, name: "TV Strip", isOn: true, color: "white" },
    { id: 5, name: "Bedroom Left", isOn: true, color: "white" },
    { id: 6, name: "Office", isOn: true, color: "white" },
    { id: 7, name: "Balcony", isOn: false, color: "blue" }
  ];

  const grid = document.getElementById("lights");
  const allToggle = document.getElementById("all-toggle");
  const allSwatches = document.getElementById("all-swatches");
  const toast = document.getElementById("demo-toast");
  const dismissToast = document.getElementById("dismiss-toast");

  if (toast && dismissToast) {
    if (window.localStorage.getItem("huetube-demo-toast-dismissed") === "1") {
      toast.classList.add("hidden");
    }

    dismissToast.addEventListener("click", () => {
      toast.classList.add("hidden");
      window.localStorage.setItem("huetube-demo-toast-dismissed", "1");
    });
  }

  function bulbSrc(light) {
    return light.isOn ? `images/${light.color}.gif` : "images/black.gif";
  }

  function renderSwatches(container, onPick) {
    container.innerHTML = "";
    COLORS.forEach((color) => {
      const b = document.createElement("button");
      b.className = "swatch";
      b.style.background = color === "white" ? "#f0f0f0" : color;
      b.type = "button";
      b.title = color;
      b.addEventListener("click", () => onPick(color));
      container.appendChild(b);
    });
  }

  function render() {
    const allOn = lights.every((l) => l.isOn);
    allToggle.textContent = allOn ? "ALL ON" : "ALL OFF";
    allToggle.setAttribute("aria-pressed", String(allOn));

    grid.innerHTML = "";
    lights.forEach((light) => {
      const card = document.createElement("article");
      card.className = "card";

      const title = document.createElement("h2");
      title.textContent = light.name;
      card.appendChild(title);

      const row = document.createElement("div");
      row.className = "row";

      const toggle = document.createElement("button");
      toggle.className = "toggle-btn light-toggle";
      toggle.type = "button";
      toggle.textContent = light.isOn ? "ON" : "OFF";
      toggle.setAttribute("aria-pressed", String(light.isOn));
      toggle.addEventListener("click", () => {
        light.isOn = !light.isOn;
        render();
      });

      const bulb = document.createElement("img");
      bulb.className = "bulb";
      bulb.alt = `${light.name} bulb`;
      bulb.src = bulbSrc(light);

      row.appendChild(toggle);
      row.appendChild(bulb);
      card.appendChild(row);

      const swatches = document.createElement("div");
      swatches.className = "swatches";
      swatches.style.marginTop = "10px";
      renderSwatches(swatches, (color) => {
        light.color = color;
        light.isOn = true;
        render();
      });

      card.appendChild(swatches);
      grid.appendChild(card);
    });
  }

  allToggle.addEventListener("click", () => {
    const shouldTurnOn = !lights.every((l) => l.isOn);
    lights.forEach((l) => {
      l.isOn = shouldTurnOn;
    });
    render();
  });

  renderSwatches(allSwatches, (color) => {
    lights.forEach((l) => {
      l.color = color;
      l.isOn = true;
    });
    render();
  });

  render();
})();
