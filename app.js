// app.js

// Navigation tabs
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.page');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));
    link.classList.add('active');
    const target = link.getAttribute('href').substring(1);
    document.getElementById(target).classList.add('active');
  });
});

// Dark mode toggle
const toggle = document.getElementById('dark-toggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggle.textContent = document.body.classList.contains('dark-mode')
    ? '☀️ Light Mode'
    : '🌙 Dark Mode';
});

// Player toggle logic
document.querySelectorAll('.player-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.player-card').forEach(card => card.hidden = true);
    const id = link.getAttribute('data-id');
    document.getElementById(id).hidden = false;
  });
});

// Video rendering logic
const levelSelect = document.getElementById('level-select');
const videoList = document.getElementById('video-list');

const videos = {
  beginner: [
    { title: "Your Shots Are WAY Too Predictable! Here's How to Fix It", url: "https://www.youtube.com/embed/gqIsUa4gCz4" },
    { title: "Want To MASTER Badminton Overhead Pronation",       url: "https://www.youtube.com/embed/JzkigWSDucw" }
  ],
  intermediate: [
    { title: "Intermediate Dropshot Drill", url: "https://www.youtube.com/embed/WY9tbZTuS_c" }
  ],
  advanced: [
    { title: "Lin Dan vs Lee Chong Wei – Breakdown", url: "https://www.youtube.com/embed/R9cd-RwuFk8" }
  ],
  footwork: [
    { title: "8 Steps to Make You Faster", url: "https://www.youtube.com/embed/0E6mm6PgeY4" }
  ],
  strategy: [
    { title: "Control Your Opponent – Tactics", url: "https://www.youtube.com/embed/MrvYbLAnecY" }
  ]
};

function loadVideos(level) {
  videoList.innerHTML = '';
  if (!videos[level]) return;
  videos[level].forEach(video => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${video.title}</h3>
      <iframe src="${video.url}" allowfullscreen></iframe>
    `;
    videoList.appendChild(div);
  });
}

loadVideos(levelSelect.value);
levelSelect.addEventListener('change', () => loadVideos(levelSelect.value));