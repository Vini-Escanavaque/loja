const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const shop = document.getElementById("shop");
const npc = document.getElementById("npc");
const sections = document.querySelectorAll(".section");

let npcPos = { x: -100, y: 10 }; 
let targetPos = null;
let speed = 5;
let walking = false; // controla estado da animação

// Início do "jogo"
startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  shop.style.display = "flex";
  targetPos = { x: 40, y: 20 };
});

// Atualiza posição e animação do NPC
function updateNpc() {
  if (targetPos) {
    let dx = targetPos.x - npcPos.x;
    let dy = targetPos.y - npcPos.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 1) {
      npcPos.x = targetPos.x;
      npcPos.y = targetPos.y;
      targetPos = null;
      if (walking) {
        walking = false;
        npc.classList.remove("walking");
      }
    } else {
      if (!walking) {
        walking = true;
        npc.classList.add("walking");
      }
      let move = Math.min(dist, speed);
      npcPos.x += (dx / dist) * move;
      npcPos.y += (dy / dist) * move;
    }

    npc.style.left = npcPos.x + "px";
    npc.style.bottom = npcPos.y + "px";
  }

  requestAnimationFrame(updateNpc);
}
updateNpc();

// Clique nas seções
sections.forEach(section => {
  section.addEventListener("click", () => {
    const url = section.dataset.url;
    const rect = section.getBoundingClientRect();
    const shopRect = shop.getBoundingClientRect();

    const sectionCenterY =
      shop.offsetHeight - (rect.top - shopRect.top) - rect.height / 2;

    targetPos = {
      x: rect.left - shopRect.left - npc.offsetWidth - 5,
      y: sectionCenterY - npc.offsetHeight / 2,
    };

    // Espera o NPC "chegar"
    setTimeout(() => {
      window.open(url, "_blank");
    }, 700);
  });
});
