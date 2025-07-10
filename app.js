// Nav logic
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main .page');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    const targetId = link.getAttribute('href').substring(1);
    sections.forEach(s => s.classList.remove('active'));
    document.getElementById(targetId).classList.add('active');
  });
});

// Dark mode toggle
const darkToggle = document.getElementById('dark-toggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  darkToggle.textContent = document.body.classList.contains('dark-mode')
    ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Beginner level training videos (more levels can be added)
const videos = {
  beginner: [
    { title: "How to Return the Flick Serve", url: "https://www.youtube.com/embed/AVs3bIhdQig" },
    { title: "How to Smash (for beginners)", url: "https://www.youtube.com/embed/9gZx_6UYyo0" },
    { title: "Serve Return Positioning", url: "https://www.youtube.com/embed/JzkigWSDucw" }
  ],
  intermediate: [],
  advanced: []
};

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
levelSelect.addEventListener('change', () => {
  loadVideos(levelSelect.value);
});