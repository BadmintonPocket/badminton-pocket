document.addEventListener('DOMContentLoaded', () => {
  // Navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      pages.forEach(p => p.classList.remove('active'));
      link.classList.add('active');
      const target = link.getAttribute('data-target');
      document.getElementById(target).classList.add('active');
    });
  });

  // Videos data (10 videos each)
  const videos = {
    beginner: [
      { title: "Basic Grip & Stance", url: "https://www.youtube.com/embed/VcQ9b-1NOqA" },
      { title: "Footwork Drills", url: "https://www.youtube.com/embed/ZjZ8PyBfEEk" },
      { title: "Basic Serve Technique", url: "https://www.youtube.com/embed/5NXYlDbWy58" },
      { title: "Overhead Clear", url: "https://www.youtube.com/embed/v7ZShTchruY" },
      { title: "Basic Net Play", url: "https://www.youtube.com/embed/7_b30QQ6dM4" },
      { title: "Basic Smash", url: "https://www.youtube.com/embed/Yz-Jp2q4NXI" },
      { title: "Footwork Patterns", url: "https://www.youtube.com/embed/XMvXtWRWpjM" },
      { title: "Backhand Basics", url: "https://www.youtube.com/embed/ov8kO0gWIpE" },
      { title: "Clear vs Drop Shot", url: "https://www.youtube.com/embed/k5X-tncC2js" },
      { title: "Basic Rally Drills", url: "https://www.youtube.com/embed/xq8efRSNNcA" }
    ],
    intermediate: [
      { title: "Smash Techniques", url: "https://www.youtube.com/embed/8oXYlr_pH3o" },
      { title: "Drop Shots & Net Play", url: "https://www.youtube.com/embed/x9dxpeJ6GvQ" },
      { title: "Advanced Footwork", url: "https://www.youtube.com/embed/3T3hQZ9WLOQ" },
      { title: "Backhand Smash", url: "https://www.youtube.com/embed/pX5J3VGzNj0" },
      { title: "Drive Shots", url: "https://www.youtube.com/embed/xRMVpRz2X5g" },
      { title: "Net Kill", url: "https://www.youtube.com/embed/_Cmz9VfpHYw" },
      { title: "Defense Techniques", url: "https://www.youtube.com/embed/9vX5D1KwqYs" },
      { title: "Smash Defense", url: "https://www.youtube.com/embed/OW2Q2HTMYQU" },
      { title: "Quick Recovery", url: "https://www.youtube.com/embed/3Q6R92n_WtI" },
      { title: "Mixed Doubles Strategy", url: "https://www.youtube.com/embed/ZvF_j7Ey1RA" }
    ],
    advanced: [
      { title: "Deception Shots", url: "https://www.youtube.com/embed/2k0lvnkhAZg" },
      { title: "Mental Toughness", url: "https://www.youtube.com/embed/Otq50FYBo2I" },
      { title: "Speed & Agility", url: "https://www.youtube.com/embed/W8US-YFmu8c" },
      { title: "Advanced Drop Shots", url: "https://www.youtube.com/embed/4uhDX7EvqXk" },
      { title: "Net Play Tactics", url: "https://www.youtube.com/embed/1h9mFb6aSbM" },
      { title: "Smash Variation", url: "https://www.youtube.com/embed/jq7oe70B38A" },
      { title: "Footwork Drills Pro", url: "https://www.youtube.com/embed/xfmM-8aGSwQ" },
      { title: "Tactical Clears", url: "https://www.youtube.com/embed/MG1DO13ukl4" },
      { title: "Match Analysis", url: "https://www.youtube.com/embed/IXlzXliObKs" },
      { title: "Advanced Defense", url: "https://www.youtube.com/embed/l-HQIXD9_KM" }
    ]
  };

  const videoList = document.getElementById('video-list');
  const levelSelect = document.getElementById('level-select');

  function loadVideos(level) {
    videoList.innerHTML = '';
    if (!videos[level]) return;
    videos[level].forEach(video => {
      const div = document.createElement