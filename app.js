// Navigation
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.page');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    sections.forEach(s => s.classList.remove('active'));
    const target = link.getAttribute('href').substring(1);
    document.getElementById(target).classList.add('active');
  });
});

// Dark mode
const darkToggle = document.getElementById('dark-toggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  darkToggle.textContent = document.body.classList.contains('dark-mode')
    ? '☀️ Light Mode'
    : '🌙 Dark Mode';
});

// Video database (partial set from Footwork + Strategy for demo)
const videos = {
  beginner: [/* Insert beginner list here */],
  intermediate: [/* Insert intermediate list here */],
  advanced: [/* Insert advanced list here */],
  footwork: [
    { title: "Forehand Net Cross-Court Technique", url: "https://www.youtube.com/embed/w4us5HVuFgg" },
    { title: "4 Corner Footwork – Step-by-Step Tutorial", url: "https://www.youtube.com/embed/fBa08o5GEqw" },
    { title: "Smooth Footwork Analysis – Lin Dan", url: "https://www.youtube.com/embed/9gZx_6UYyo0" }
  ],
  strategy: [
    { title: "Why You Should Practice Deceptions (Lee Zii Jia)", url: "https://www.youtube.com/embed/z5L7SWuj860" },
    { title: "Control Your Opponent | Badminton Tactics", url: "https://www.youtube.com/embed/MrvYbLAnecY" },
    { title: "Focus and Mental Toughness", url: "https://www.youtube.com/embed/aW1e4REHSWc" }
  ]
};

// Rendering function
const levelSelect = document.getElementById('level-select');
const videoList = document.getElementById('video-list');

function loadVideos(level) {
  videoList.innerHTML = '';
  if (!videos[level]) return;
  videos[level].forEach(video => {
    const div = document.createElement('div');
    div.innerHTML = `<h3>${video.title}</h3><iframe src="${video.url}" allowfullscreen></iframe>`;
    videoList.appendChild(div);
  });
}

loadVideos(levelSelect.value);
levelSelect.addEventListener('change', () => loadVideos(levelSelect.value));