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

  // Sample videos (real YouTube URLs)
  const videos = {
    beginner: [
      { title: "Basic Grip & Stance", url: "https://www.youtube.com/embed/VcQ9b-1NOqA" },
      { title: "Footwork Drills", url: "https://www.youtube.com/embed/ZjZ8PyBfEEk" },
      { title: "Basic Clear Shot", url: "https://www.youtube.com/embed/Y_9GvJ1NQ5o" },
      { title: "Net Play Basics", url: "https://www.youtube.com/embed/hDcWynvBxgo" },
      { title: "Serve Techniques", url: "https://www.youtube.com/embed/jwObgnucKO8" }
    ],
    intermediate: [
      { title: "Smash Techniques", url: "https://www.youtube.com/embed/8oXYlr_pH3o" },
      { title: "Drop Shots & Net Play", url: "https://www.youtube.com/embed/x9dxpeJ6GvQ" },
      { title: "Drive Shots", url: "https://www.youtube.com/embed/kkAoqM7tdKA" },
      { title: "Footwork Patterns", url: "https://www.youtube.com/embed/1-9XQqF0aPM" },
      { title: "Rally Strategies", url: "https://www.youtube.com/embed/ckmvzJlV0oc" }
    ],
    advanced: [
      { title: "Deception Shots", url: "https://www.youtube.com/embed/2k0lvnkhAZg" },
      { title: "Mental Toughness", url: "https://www.youtube.com/embed/Otq50FYBo2I" },
      { title: "Advanced Smash Variations", url: "https://www.youtube.com/embed/hkjC7N11Zc8" },
      { title: "Doubles Tactics", url: "https://www.youtube.com/embed/WLkOlmrdR8Q" },
      { title: "Speed & Endurance Training", url: "https://www.youtube.com/embed/1KwYjP0idA4" }
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

  // Initial load of beginner videos
  loadVideos('beginner');

  // Feedback form handling
  document.getElementById('feedback-form').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('form-response').textContent = "Thanks for your feedback!";
    this.reset();
  });
});