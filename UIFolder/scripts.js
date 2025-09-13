// Posters data
let posters = [
  {
    title: "🎬 Make AI Promo Video",
    desc: "Create a 30-second promo video showcasing HTW vibes and innovation.",
    bounty: "🌺 Bounty: 50 Points",
    status: "OPEN",
    category: "tech",
    img: "https://placekitten.com/250/250"
  },
  {
    title: "📝 Write Event Blog",
    desc: "Write a recap blog post about HTW 2025 with photos and highlights.",
    bounty: "🌴 Bounty: 30 Points",
    status: "IN REVIEW",
    category: "business",
    img: "https://placekitten.com/251/251"
  },
  {
    title: "🎨 Design HTW Sticker Pack",
    desc: "Create a sticker pack mixing Hawaiian culture with tech icons.",
    bounty: "🌋 Bounty: 40 Points",
    status: "CLOSED",
    category: "business",
    img: "https://placekitten.com/252/252"
  },
  {
    title: "🌐 Code Hackathon Website",
    desc: "Help build a sleek site for HTW hackathon submissions.",
    bounty: "🏝️ Bounty: 60 Points",
    status: "OPEN",
    category: "tech",
    img: "https://placekitten.com/253/253"
  }
];

// Load posters
function renderPosters(filter = "all") {
  const grid = document.getElementById("posterGrid");
  grid.innerHTML = "";
  posters
    .filter(p => filter === "all" || p.category === filter)
    .forEach(p => {
      const col = document.createElement("div");
      col.className = "col-md-4";
      col.innerHTML = `
        <div class="poster">
          <img src="${p.img}" alt="Poster Image">
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <p><strong>${p.bounty}</strong></p>
          <p>Status: <span class="status-${p.status.toLowerCase()}">${p.status}</span></p>
        </div>
      `;
      col.querySelector(".poster").addEventListener("click", () => {
        window.location.href = "project.html"; // placeholder
      });
      grid.appendChild(col);
    });
}
renderPosters();

// Filters
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    renderPosters(btn.dataset.filter);
  });
});

// Admin overlay
const adminBtn = document.getElementById("adminTrigger");
const overlay = document.getElementById("adminOverlay");
const loginBtn = document.getElementById("loginBtn");

adminBtn.addEventListener("click", () => {
  overlay.classList.remove("d-none");
});

loginBtn.addEventListener("click", () => {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "admin" && pass === "1234") {
    window.location.href = "admin.html";
  } else {
    alert("Invalid credentials!");
  }
});
