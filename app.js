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

// Real badminton training videos (updated)
const videos = {
  beginner: [
    { title: "Badminton Training for Beginners", url: "https://www.youtube.com/embed/D2QDyXXJtVc" },
    { title: "Basic Badminton for Beginners", url: "https://www.youtube.com/embed/1UIhKZCPMYM" },
    { title: "The Ultimate Footwork Tutorial for Beginners", url: "https://www.youtube.com/embed/NhNEEcLPjpc" },
    { title: "Beginner, Intermediate, Advanced: Sweet Spot Challenge", url: "https://www.youtube.com/embed/bThPFpkmkIY" },
    { title: "Basic Badminton for Beginners - Part 1 of 3", url: "https://www.youtube.com/embed/MsHMCZlcrXM" }
  ],
  intermediate: [
    { title: "Badminton Training for Intermediate Players", url: "https://www.youtube.com/embed/yXJz0iAcZdE" },
    { title: "Badminton Drills For Intermediate Players", url: "https://www.youtube.com/embed/flFsPfIVlRA" },
    { title: "5 Common Mistakes Intermediate Badminton Players Make", url: "https://www.youtube.com/embed/XfNghQJ-zpA" },
    { title: "EASILY MISSED Dos and Don'ts For Intermediate Badminton Players", url: "https://www.youtube.com/embed/-BBIYDt1LVc" },
    { title: "Badminton Training - Intermediate Level", url: "https://www.youtube.com/embed/sdXWaMsYJck" }
  ],
  advanced: [
    { title: "Badminton Training - Advanced Badminton Tips for Professionals", url: "https://www.youtube.com/embed/bSfNzZh1lHI" },
    { title: "Copy these Advanced Badminton Training Drills to Improve", url: "https://www.youtube.com/embed/MBiTb0ZayE8" },
    { title: "Advanced Badminton - How to Improve Speed for Badminton", url: "https://www.youtube.com/embed/sdXWaMsYJck" },
    { title: "Weighted Vest Workout for Badminton", url: "https://www.youtube.com/embed/sdXWaMsYJck" },
    { title: "Badminton - Single Defence From Beginner to Advanced", url: "https://www.youtube.com/embed/Wr2IDCBnKow" }
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
document.getElementById('level-select').addEventListener('change', e => {
  loadVideos(e.target.value);
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
  loadVideos('beginner'); // default to beginner videos
});