const colors = ["#FF6B6B","#4ECDC4","#45B7D1","#FFA36C","#6C5CE7","#FD79A8"];

function avatarCircle() {
  const color = colors[Math.floor(Math.random()*colors.length)];
  return `<div class="avatar" style="background:${color};"></div>`;
}

function avatarPattern() {
  const c = colors[Math.floor(Math.random()*colors.length)];
  return `<svg class='avatar' viewBox='0 0 100 100'>
    <rect width='100' height='100' fill='${c}'/>
    <circle cx='50' cy='50' r='30' fill='white' opacity='0.4'/>
  </svg>`;
}

function avatarPixel() {
  const c = colors[Math.floor(Math.random()*colors.length)];
  return `<svg class='avatar' viewBox='0 0 10 10'>
    <rect width='10' height='10' fill='${c}'/>
    <rect x='2' y='2' width='2' height='2' fill='black'/>
    <rect x='6' y='2' width='2' height='2' fill='black'/>
    <rect x='3' y='6' width='4' height='1' fill='black'/>
  </svg>`;
}

function getAvatar() {
  const type = localStorage.getItem("avatarType") || "circle";
  if(type==="pattern") return avatarPattern();
  if(type==="pixel") return avatarPixel();
  return avatarCircle();
}
