document.addEventListener('DOMContentLoaded', () => {
  // Navigation logic
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href').substring(1);

      navLinks.forEach(l => l.classList.remove('active'));
      pages.forEach(p => p.classList.remove('active'));

      link.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });

  // Dark mode toggle
  const darkToggle = document.getElementById('dark-toggle');
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });

  // Training videos by level
  const videos = {
    beginner: [
      { title: "Basic Grip & Stance", url: "https://www.youtube.com/embed/VcQ9b-1NOqA" },
      { title: "Footwork Drills", url: "https://www.youtube.com/embed/ZjZ8PyBfEEk" },
      { title: "Basic Serve", url: "https://www.youtube.com/embed/5NXYlDbWy58" },
      { title: "Clear Shot Basics", url: "https://www.youtube.com/embed/URHOZhJCOIo" },
      { title: "Drive Shot Drill", url: "https://www.youtube.com/embed/5s-rpZZqW18" },
      { title: "Badminton Basics", url: "https://www.youtube.com/embed/F5LkUtwAnzE" },
      { title: "Racket Positioning", url: "https://www.youtube.com/embed/f_OoEDm6Z0E" },
      { title: "Rules Overview", url: "https://www.youtube.com/embed/52h_1Ueis3g" },
      { title: "Common Mistakes", url: "https://www.youtube.com/embed/hUtZr1_QnFo" },
      { title: "Serve Rules", url: "https://www.youtube.com/embed/A-q6TLgnRRY" }
    ],
    intermediate: [
      { title: "Smash Basics", url: "https://www.youtube.com/embed/8oXYlr_pH3o" },
      { title: "Drop Shots", url: "https://www.youtube.com/embed/x9dxpeJ6GvQ" },
      { title: "Net Play Tips", url: "https://www.youtube.com/embed/ppOTYrTYbQw" },
      { title: "Footwork Patterns", url: "https://www.youtube.com/embed/3T3hQZ9WLOQ" },
      { title: "Doubles Rotation", url: "https://www.youtube.com/embed/mqNgnbmZXfQ" },
      { title: "Backhand Clear", url: "https://www.youtube.com/embed/CyZ-rqNVGm8" },
      { title: "Singles Tactics", url: "https://www.youtube.com/embed/mTNUZ_j8WMM" },
      { title: "Flick Serve", url: "https://www.youtube.com/embed/ZARsCUURHxI" },
      { title: "Drive Defense", url: "https://www.youtube.com/embed/_liRQTSUuec" },
      { title: "Fast Flat Exchange", url: "https://www.youtube.com/embed/ZVX5cRW0ef4" }
    ],
    advanced: [
      { title: "Deception Shots", url: "https://www.youtube.com/embed/2k0lvnkhAZg" },
      { title: "Mental Toughness", url: "https://www.youtube.com/embed/Otq50FYBo2I" },
      { title: "Speed & Agility", url: "https://www.youtube.com/embed/W8US-YFmu8c" },
      { title: "Advanced Net Kill", url: "https://www.youtube.com/embed/9NwueCz9Fiw" },
      { title: "Crosscourt Smash", url: "https://www.youtube.com/embed/Dh0g-5KjOG4" },
      { title: "Jump Smash", url: "https://www.youtube.com/embed/93I3Bo7AZrM" },
      { title: "Advanced Footwork", url: "https://www.youtube.com/embed/dp8ckYQVgrA" },
      { title: "Smash Recovery", url: "https://www.youtube.com/embed/zUeFhx0H9Co" },
      { title: "Front Court Rotation", url: "https://www.youtube.com/embed/0duRJ6EOMSo" },
      { title: "Advanced Singles Strategy", url: "https://www.youtube.com/embed/YbdEMZ7pG9k" }
    ]
  };

  const levelSelect = document.getElementById('level-select');
  const videoList = document.getElementById('video-list');

  function loadVideos(level) {
    videoList.innerHTML = '';
    if (!videos[level]) return;

    videos[level].forEach(video => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${video.title}</h3>
        <iframe src="${video.url}" frameborder="0" allowfullscreen></iframe>
      `;
      videoList.appendChild(div);
    });
  }

  levelSelect.addEventListener('change', () => {
    loadVideos(levelSelect.value);
  });

  // Initial load
  loadVideos(levelSelect.value);
});