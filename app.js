// app.js for BadmintonPocket v1

// Simple navigation handling
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);

      sections.forEach(section => {
        section.style.display = section.id === targetId ? 'block' : 'none';
      });

      navLinks.forEach(nav => nav.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Show first section by default
  if (sections.length) {
    sections.forEach((section, i) => section.style.display = i === 0 ? 'block' : 'none');
    navLinks[0].classList.add('active');
  }
});

// Placeholder: Load videos for training
const videos = {
  beginner: [
    { title: "Basic Grip & Stance", url: "https://www.youtube.com/embed/1a2b3c4d" },
    { title: "Footwork Drills", url: "https://www.youtube.com/embed/5e6f7g8h" }
  ],
  intermediate: [
    { title: "Smash Techniques", url: "https://www.youtube.com/embed/9i0j1k2l" },
    { title: "Drop Shots & Net Play", url: "https://www.youtube.com/embed/3m4n5o6p" }
  ],
  advanced: [
    { title: "Deception Shots", url: "https://www.youtube.com/embed/7q8r9s0t" },
    { title: "Mental Toughness", url: "https://www.youtube.com/embed/1u2v3w4x" }
  ]
};

function loadVideos(level) {
  const container = document.getElementById('video-list');
  container.innerHTML = '';
  if (!videos[level]) return;

  videos[level].forEach(video => {
    const videoElem = document.createElement('div');
    videoElem.className = 'video-item';
    videoElem.innerHTML = `
      <h3>${video.title}</h3>
      <iframe width="320" height="180" src="${video.url}" frameborder="0" allowfullscreen></iframe>
    `;
    container.appendChild(videoElem);
  });
}

// Event listener for level select dropdown
document.getElementById('level-select')?.addEventListener('change', (e) => {
  loadVideos(e.target.value);
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
  loadVideos('beginner'); // default to beginner
});