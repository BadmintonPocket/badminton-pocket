// refs
const sidebarToggle = document.getElementById('sidebar-toggle');
const darkToggle    = document.getElementById('dark-toggle');
const navLinks      = document.querySelectorAll('.nav-link');
const sections      = document.querySelectorAll('.page');
const playerLinks   = document.querySelectorAll('.player-link');
const levelSelect   = document.getElementById('level-select');
const videoList     = document.getElementById('video-list');

// sidebar collapse
sidebarToggle.addEventListener('click', () => {
  document.body.classList.toggle('sidebar-open');
});

// tab navigation
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));
    link.classList.add('active');
    document.getElementById(link.getAttribute('href').slice(1))
            .classList.add('active');
    if (window.innerWidth <= 768) {
      document.body.classList.remove('sidebar-open');
    }
  });
});

// dark mode toggle
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  darkToggle.textContent = document.body.classList.contains('dark-mode')
    ? '☀️ Light Mode'
    : '🌙 Dark Mode';
});

// player cards toggle
playerLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.player-card')
            .forEach(c => c.hidden = true);
    document.getElementById(link.dataset.id).hidden = false;
  });
});

// video library
const videos = {
  beginner: [
    { title: "Your Shots Are WAY Too Predictable! Here's How to Fix It", url: "https://www.youtube.com/embed/gqIsUa4gCz4" },
    /* …other beginner videos… */
  ],
  intermediate: [
    { title: "Improve Your Dropshot Instantly!", url: "https://www.youtube.com/embed/WY9tbZTuS_c" },
    /* … */
  ],
  advanced: [
    { title: "Lin Dan vs Lee Chong Wei – Breakdown", url: "https://www.youtube.com/embed/R9cd-RwuFk8" },
    /* … */
  ],
  footwork: [
    { title: "8 Steps to Make You Faster", url: "https://www.youtube.com/embed/0E6mm6PgeY4" }
  ],
  strategy: [
    { title: "Control Your Opponent – Tactics", url: "https://www.youtube.com/embed/MrvYbLAnecY" }
  ]
};

// render videos
function loadVideos(level) {
  videoList.innerHTML = '';
  if (!videos[level]) return;
  videos[level].forEach(v => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${v.title}</h3>
      <iframe src="${v.url}" allowfullscreen></iframe>
    `;
    videoList.appendChild(div);
  });
}

loadVideos(levelSelect.value);
levelSelect.addEventListener('change', () => loadVideos(levelSelect.value));