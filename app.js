document.addEventListener('DOMContentLoaded', () => {
  // Navigation buttons
  const navButtons = document.querySelectorAll('nav button.nav-btn');
  const sections = document.querySelectorAll('main .section');

  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active from all buttons
      navButtons.forEach(btn => btn.classList.remove('active'));
      // Hide all sections
      sections.forEach(section => section.classList.remove('active'));

      // Activate clicked button & matching section
      button.classList.add('active');
      const targetId = button.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // Video data with 10 videos each level (only titles & legit YouTube embed URLs)
  const videos = {
    beginner: [
      { title: "Basic Grip & Stance", url: "https://www.youtube.com/embed/VcQ9b-1NOqA" },
      { title: "Footwork Drills", url: "https://www.youtube.com/embed/ZjZ8PyBfEEk" },
      { title: "Basic Serve Technique", url: "https://www.youtube.com/embed/5NXYlDbWy58" },
      { title: "Forehand Clear", url: "https://www.youtube.com/embed/e5gOX22mTEA" },
      { title: "Backhand Clear", url: "https://www.youtube.com/embed/w3xGQRGvlIk" },
      { title: "Basic Net Play", url: "https://www.youtube.com/embed/BFr9FocC4Jk" },
      { title: "Shadow Footwork", url: "https://www.youtube.com/embed/9H39Zfwf7s0" },
      { title: "Basic Dropshot", url: "https://www.youtube.com/embed/PH5pBf9SZ2Q" },
      { title: "Basic Smash", url: "https://www.youtube.com/embed/1yZi6qI9cSY" },
      { title: "Basic Backhand Smash", url: "https://www.youtube.com/embed/FeNw3bMlcjI" }
    ],
    intermediate: [
      { title: "Smash Techniques", url: "https://www.youtube.com/embed/8oXYlr_pH3o" },
      { title: "Drop Shots & Net Play", url: "https://www.youtube.com/embed/x9dxpeJ6GvQ" },
      { title: "Advanced Footwork", url: "https://www.youtube.com/embed/3T3hQZ9WLOQ" },
      { title: "Net Kill", url: "https://www.youtube.com/embed/yeUYRtQXKoY" },
      { title: "Drive Shots", url: "https://www.youtube.com/embed/7xwFZ6ScbW4" },
      { title: "Backhand Net Play", url: "https://www.youtube.com/embed/mFYnQcqLHmw" },
      { title: "Clear Shots", url: "https://www.youtube.com/embed/PK3u7cooq2k" },
      { title: "Smash Variations", url: "https://www.youtube.com/embed/Xtya6DNVb2M" },
      { title: "Overhead Shots", url: "https://www.youtube.com/embed/7T0BvEZZnRE" },
      { title: "Mixed Doubles Tactics", url: "https://www.youtube.com/embed/IZFi6__guF8" }
    ],
    advanced: [
      { title: "Deception Shots", url: "https://www.youtube.com/embed/2k0lvnkhAZg" },
      { title: "Mental Toughness", url: "https://www.youtube.com/embed/Otq50FYBo2I" },
      { title: "Speed & Agility", url: "https://www.youtube.com/embed/W8US-YFmu8c" },
      { title: "Advanced Smashes", url: "https://www.youtube.com/embed/oy_LvG4cRnc" },
      { title: "Fast Drops", url: "https://www.youtube.com/embed/aN2nEYQj72o" },
      { title: "Net Deception", url: "https://www.youtube.com/embed/D8jWzLnpP04" },
      { title: "Anticipation Drills", url: "https://www.youtube.com/embed/xv7B44zQpFQ" },
      { title: "Positional Play", url: "https://www.youtube.com/embed/h2WnS5Xe3Kw" },
      { title: "Tournament Preparation", url: "https://www.youtube.com/embed/COmn_Ga9hWY" },
      { title: "Match Analysis", url: "https://www.youtube.com/embed/HhV4-rxJqns" }
    ]
  };

  const videoList = document.getElementById('video-list');
  const levelSelect = document.getElementById('level-select');

  function loadVideos(level) {
    videoList.innerHTML = '';
    if (!videos[level]) return;

    videos[level].forEach(video => {
      const videoDiv = document.createElement('div');
      videoDiv.innerHTML = `
        <h3>${video.title}</h3>
        <iframe src="${video.url}" frameborder="0" allowfullscreen></iframe>
      `;
      videoList.appendChild(videoDiv);
    });
  }

  // Initial load
  loadVideos(levelSelect.value);

  levelSelect.addEventListener('change', (e) => {
    loadVideos(e.target.value);
  });

  // Players data including Lee Zii Jia and Kento Momota
  const players = [
    {
      name: "Lin Dan",
      bio: "Two-time Olympic champion and one of the greatest badminton players of all time.",
      signatureShots: ["Powerful Smash", "Fast Drop Shot", "Deceptive Net Play"]
    },
    {
      name: "Carolina Marin",
      bio: "Olympic gold medalist known for her aggressive playing style and speed.",
      signatureShots: ["Fast Drive", "Crosscourt Smash", "Net Kill"]
    },
    {
      name: "Viktor Axelsen",
      bio: "World Champion known for his tall stature and strong overhead shots.",
      signatureShots: ["Heavy Smash", "Clear Shot", "Net Shot"]
    },
    {
      name: "Lee Zii Jia",
      bio: "Malaysian badminton star known for his speed and aggressive style.",
      signatureShots: ["Quick Smash", "Fast Footwork", "Sneaky Net Play"]
    },
    {
      name: "Kento Momota",
      bio: "Japanese badminton legend known for his tactical gameplay and stamina.",
      signatureShots: ["Precision Dropshot", "Strong Defense", "Deceptive Clears"]
    }
  ];

  const playerList = document.getElementById('player-list');
  const playerBio = document.getElementById('player-bio');

  players.forEach((player, i) => {
    const li = document