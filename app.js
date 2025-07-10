document.addEventListener('DOMContentLoaded', () => {
  // Navigation buttons
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('main .page');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      pages.forEach(p => p.classList.remove('active'));

      link.classList.add('active');
      const targetId = link.getAttribute('href').substring(1);
      document.getElementById(targetId).classList.add('active');
    });
  });

  // Video data
  const videos = {
    beginner: [
      { title: "Basic Grip & Stance", url: "https://www.youtube.com/embed/VcQ9b-1NOqA" },
      { title: "Footwork Drills", url: "https://www.youtube.com/embed/ZjZ8PyBfEEk" },
      { title: "Basic Serve Technique", url: "https://www.youtube.com/embed/5NXYlDbWy58" },
      { title: "Backhand Basics", url: "https://www.youtube.com/embed/IHpl7k2An3I" },
      { title: "Net Play Fundamentals", url: "https://www.youtube.com/embed/jTgvip1B2kE" },
      { title: "Clear Shot Tutorial", url: "https://www.youtube.com/embed/9EvgtrCrzKA" },
      { title: "Footwork Speed Drills", url: "https://www.youtube.com/embed/GJ-EJ2c1qD4" },
      { title: "Smash Preparation", url: "https://www.youtube.com/embed/z-HWVGNOqGU" },
      { title: "Drop Shot Techniques", url: "https://www.youtube.com/embed/RO-mjBpc3Fc" },
      { title: "Positioning Tips", url: "https://www.youtube.com/embed/EaGxlB4x2r4" }
    ],
    intermediate: [
      { title: "Smash Techniques", url: "https://www.youtube.com/embed/8oXYlr_pH3o" },
      { title: "Drop Shots & Net Play", url: "https://www.youtube.com/embed/x9dxpeJ6GvQ" },
      { title: "Advanced Footwork", url: "https://www.youtube.com/embed/3T3hQZ9WLOQ" },
      { title: "Powerful Clears", url: "https://www.youtube.com/embed/5qRJXv22rMY" },
      { title: "Anticipation Drills", url: "https://www.youtube.com/embed/3PdrnOm84fg" },
      { title: "Deception Moves", url: "https://www.youtube.com/embed/9VOqfZDJp5k" },
      { title: "Smash Defense", url: "https://www.youtube.com/embed/VmNQ7NfgqFQ" },
      { title: "Net Kill Strategies", url: "https://www.youtube.com/embed/IlRX6Xv5x_E" },
      { title: "Position Rotation", url: "https://www.youtube.com/embed/3QPiOS4d1Ow" },
      { title: "Shot Placement", url: "https://www.youtube.com/embed/91whCqbt_2s" }
    ],
    advanced: [
      { title: "Deception Shots", url: "https://www.youtube.com/embed/2k0lvnkhAZg" },
      { title: "Mental Toughness", url: "https://www.youtube.com/embed/Otq50FYBo2I" },
      { title: "Speed & Agility", url: "https://www.youtube.com/embed/W8US-YFmu8c" },
      { title: "Advanced Smash Variations", url: "https://www.youtube.com/embed/wYBxjQO61iQ" },
      { title: "Tactical Game Planning", url: "https://www.youtube.com/embed/EkJQ54r-XKw" },
      { title: "Anticipation & Reaction", url: "https://www.youtube.com/embed/Tos4w_H4ox4" },
      { title: "Deceptive Net Shots", url: "https://www.youtube.com/embed/L7xk0bWLDhk" },
      { title: "Endurance Training", url: "https://www.youtube.com/embed/kcG6WQ0b3Ks" },
      { title: "Match Analysis", url: "https://www.youtube.com/embed/15SwSwRgO0M" },
      { title: "Pro Player Tactics", url: "https://www.youtube.com/embed/yf1sY4e4P3M" }
    ]
  };

  const videoList = document.getElementById('video-list');
  const levelSelect = document.getElementById('level-select');

  function loadVideos(level) {
    videoList.innerHTML = '';
    if (!videos[level]) return;
    videos[level].forEach(video => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${video.title}</h3>
        <iframe 
          width="560" 
          height="315" 
          src="${video.url}" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      `;
      videoList.appendChild(div);
    });
  }

  loadVideos(levelSelect.value);

  levelSelect.addEventListener('change', () => {
    loadVideos(levelSelect.value);
  });

  // Dark mode toggle
  const darkToggleBtn = document.getElementById('dark-toggle');
  darkToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if(document.body.classList.contains('dark-mode')){
      darkToggleBtn.textContent = '☀️';
    } else {
      darkToggleBtn.textContent = '🌙';
    }
  });
});