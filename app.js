// app.js

document.addEventListener("DOMContentLoaded", () => { const navButtons = document.querySelectorAll(".nav-link"); const pages = document.querySelectorAll(".page");

navButtons.forEach((btn) => { btn.addEventListener("click", (e) => { e.preventDefault(); navButtons.forEach((b) => b.classList.remove("active")); pages.forEach((p) => p.classList.remove("active"));

btn.classList.add("active");
  const target = btn.getAttribute("href").substring(1);
  document.getElementById(target).classList.add("active");
});

});

document.getElementById("dark-toggle").addEventListener("click", () => { document.body.classList.toggle("dark-mode"); });

const videos = { beginner: [ { title: "Beginner Basics: How to Play", url: "https://www.youtube.com/embed/4ba1BqJ4S2M" }, { title: "Badminton Ready Position & Footwork", url: "https://www.youtube.com/embed/FE6P3tUNrDk" }, { title: "Gripping the Racket Correctly", url: "https://www.youtube.com/embed/6OtLVIyQ6K8" }, { title: "Underhand Serve Technique", url: "https://www.youtube.com/embed/xTxedmOEVTY" }, { title: "Backhand Basics", url: "https://www.youtube.com/embed/tZyy1RDV5sk" }, { title: "Basic Net Play", url: "https://www.youtube.com/embed/DllRjIOcycA" }, { title: "Clear Shot Tutorial", url: "https://www.youtube.com/embed/6NllQSoxWtk" }, { title: "How to Score", url: "https://www.youtube.com/embed/MWw99p_gRnk" }, { title: "Singles Rules & Tips", url: "https://www.youtube.com/embed/qUwZ-BUwCUg" }, { title: "Doubles Strategy", url: "https://www.youtube.com/embed/mUFT8Z_KppQ" } ], intermediate: [ { title: "Improve Your Smash", url: "https://www.youtube.com/embed/BF9y0q9ZMks" }, { title: "Drop Shots for Intermediates", url: "https://www.youtube.com/embed/71MwFkhp3X8" }, { title: "Control Your Racket Like a Pro", url: "https://www.youtube.com/embed/lnvYcKeO7_4" }, { title: "Net Kill Techniques", url: "https://www.youtube.com/embed/Ha1MvVaQLoE" }, { title: "Footwork Variations", url: "https://www.youtube.com/embed/RSeb5upZB8c" }, { title: "Advanced Serve Variations", url: "https://www.youtube.com/embed/lYYNfjSKO_0" }, { title: "Crosscourt Drop Shots", url: "https://www.youtube.com/embed/ZrxEbTKr-Q4" }, { title: "Deception Shots Basics", url: "https://www.youtube.com/embed/zxtm4UzmMZ8" }, { title: "Placement Strategy", url: "https://www.youtube.com/embed/obwhTZFNg2o" }, { title: "Doubles Rotation", url: "https://www.youtube.com/embed/WBLWDCbnmx0" } ], advanced: [ { title: "Advanced Footwork", url: "https://www.youtube.com/embed/hyt59nJlfT0" }, { title: "Pro Deception Techniques", url: "https://www.youtube.com/embed/9zEq2q_JqG0" }, { title: "Jump Smash Tutorial", url: "https://www.youtube.com/embed/mt1PP4t_XhE" }, { title: "Advanced Net Play", url: "https://www.youtube.com/embed/J4tKr3bs7lo" }, { title: "Mindset and Match Focus", url: "https://www.youtube.com/embed/lIAr4vB1wF8" }, { title: "Match Simulation Training", url: "https://www.youtube.com/embed/YUMn9rTyzoA" }, { title: "Speed & Agility", url: "https://www.youtube.com/embed/NkGiYOonrrA" }, { title: "High-Level Shot Combinations", url: "https://www.youtube.com/embed/PlTfZw9H4Ho" }, { title: "Breaking Opponent Rhythm", url: "https://www.youtube.com/embed/wboX0mMj6x0" }, { title: "Reading Opponent Movements", url: "https://www.youtube.com/embed/YvjXXGLsTxM" } ] };

const videoList = document.getElementById("video-list"); const levelSelect = document.getElementById("level-select");

function loadVideos(level) { videoList.innerHTML = ""; videos[level].forEach((video) => { const div = document.createElement("div"); div.innerHTML = <h3>${video.title}</h3><iframe width="320" height="180" src="${video.url}" frameborder="0" allowfullscreen></iframe>; videoList.appendChild(div); }); }

loadVideos(levelSelect.value); levelSelect.addEventListener("change", () => loadVideos(levelSelect.value)); });

