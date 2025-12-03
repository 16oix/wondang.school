function applyMode() {
  const mode = localStorage.getItem("mode") || "light";
  if(mode==="dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

applyMode(); 

function toggleDarkMode() {
  const mode = localStorage.getItem("mode") || "light";
  if(mode==="dark") localStorage.setItem("mode","light");
  else localStorage.setItem("mode","dark");
  applyMode();
}
