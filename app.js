// app.js for BadmintonPocket v1

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main section');
  const navLinks = document.querySelectorAll('.sidebar nav ul li a');

  // Navigation click handler
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);

      // Show matching section, hide others
      sections.forEach(section => {
        section.style.display = section.id === targetId ? 'block' : 'none';
      });

      // Update active class on links
      navLinks.forEach(nav => nav.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Show first section by default and highlight first nav link
  if (sections.length) {
    sections.forEach((section, i) => section.style.display = i === 0 ? 'block' : 'none');
    navLinks[0].classList.add('active');
  }
});

// Sample videos (replace URLs with real ones)
const videos = {
  beginner: [
    { title: "Basic Grip & Stance", url: "https://www.youtube.com/embed/VcQ9b-1NOqA" },
    { title: "Footwork Drills", url: "https://www.youtube.com/embed/ZjZ8PyBfEEk" }
  ],
  intermediate: [
    { title: "Smash Techniques", url: "https://www.youtube.com/embed/8oXYlr_pH3o" },
    { title: "Drop Shots & Net Play", url: "https://www.youtube.com/embed/x9dxpeJ6GvQ" }
  ],
  advanced: [
    { title: "Deception Shots", url: "https://www.youtube.com/embed/2k0lvnkhAZg" },
    { title: "Mental Toughness", url: "https://www.youtube.com/embed/Otq50FYBo2I" }
  ]
};

// Load videos into the video-list div based on selected level
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
document.getElementById('level-select').addEventListener('change', e => {
  loadVideos(e.target.value);
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
  loadVideos('beginner'); // default to beginner videos
});