//! ------CURSOR =================
const cursor = document.querySelector(".cursor");

const animateCursor = (g, interact) => {
  const p = g.clientX - cursor.offsetWidth / 2,
    q = g.clientY - cursor.offsetHeight / 2;

  const keyframes = {
    transform: `translate(${p}px, ${q}px) scale(${interact ? 5 : 1})`,
  };

  cursor.animate(keyframes, {
    duration: 800,
    fill: "forwards",
  });
};

window.onmousemove = (g) => {
  const interactElement = g.target.closest(".interactable");
  const interact = interactElement !== null;

  animateCursor(g, interact);

  const changeIconClass = (type) => {
    switch (type) {
      case "video":
        return "bi bi-play";
      case "image":
        return "bi bi-card-image";
      case "settings":
        return "bi bi-gear";
      default:
        return "bi bi-arrow-up-right";
    }
  };

  const icons = document.querySelector(".bi");

  cursor.dataset.type = interact ? interactElement.dataset.type : "";

  if (interact) {
    icons.className = changeIconClass(interactElement.dataset.type);
  }
};

//!======================= GLOW EFFECT =======================
const handleOnMouseMove = (e) => {
  const { currentTarget: target } = e;

  const rect = target.getBoundingClientRect(),
    x = e.clientX - rect.left,
    y = e.clientY - rect.top;

  target.style.setProperty("--mouse-x", `${x}px`);
  target.style.setProperty("--mouse-y", `${y}px`);
};

for (const card of document.querySelectorAll(".about-header")) {
  card.onmousemove = (e) => handleOnMouseMove(e);
}

//! =============NAVIGATION =======================

const navBtn = document.querySelectorAll("[data-button]");
const projects = document.querySelectorAll("[data-project]");

function showProject(project) {
  projects.forEach((e) => e.classList.remove("active"));

  document.querySelectorAll(`#${project}`).forEach((e) => {
    e.classList.add("active");
  });
}

function deactivateBTN() {
  navBtn.forEach((e) => e.classList.remove("btn-active"));
}

navBtn.forEach(
  (btn) =>
    (btn.onclick = function () {
      showProject(this.dataset.button);
      deactivateBTN();
      btn.classList.add("btn-active");
    })
);
