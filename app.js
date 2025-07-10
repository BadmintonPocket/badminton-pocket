// --- Navigation & Section Toggle ---

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main section');
  const navLinks = document.querySelectorAll('.sidebar nav ul li a');

  function showSection(id) {
    sections.forEach(section => {
      section.style.display = section.id === id ? 'block' : 'none';
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + id);
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      showSection(targetId);
    });
  });

  // Show default section on load
  showSection('training');
});

// --- Training Videos & Streak ---

const videos = {
  beginner: [
    { title: "Basic Grip & Stance", url: "https://www.youtube.com/embed/VcQ9b-1NOqA" },
    { title: "Footwork Drills", url: "https://www.youtube.com/embed/ZjZ8PyBfEEk" },
    { title: "Basic Serve Technique", url: "https://www.youtube.com/embed/5NXYlDbWy58" },
    { title: "Net Play Basics", url: "https://www.youtube.com/embed/9JjrIkgjXf4" },
    { title: "Basic Smash", url: "https://www.youtube.com/embed/aDbs3-jX7t0" }
  ],
  intermediate: [
    { title: "Smash Techniques", url: "https://www.youtube.com/embed/8oXYlr_pH3o" },
    { title: "Drop Shots & Net Play", url: "https://www.youtube.com/embed/x9dxpeJ6GvQ" },
    { title: "Advanced Footwork", url: "https://www.youtube.com/embed/3T3hQZ9WLOQ" },
    { title: "Backhand Shots", url: "https://www.youtube.com/embed/xPcsNQvFjHY" },
    { title: "Clear Shots", url: "https://www.youtube.com/embed/4X3TNgWqQ2c" }
  ],
  advanced: [
    { title: "Deception Shots", url: "https://www.youtube.com/embed/2k0lvnkhAZg" },
    { title: "Mental Toughness", url: "https://www.youtube.com/embed/Otq50FYBo2I" },
    { title: "Speed & Agility", url: "https://www.youtube.com/embed/W8US-YFmu8c" },
    { title: "Smash Power", url: "https://www.youtube.com/embed/7HKwAjA0PBY" },
    { title: "Tournament Strategy", url: "https://www.youtube.com/embed/JbGkhd3Ae_w" }
  ]
};

function loadVideos(level) {
  const container = document.getElementById('video