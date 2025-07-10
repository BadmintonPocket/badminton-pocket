document.addEventListener("DOMContentLoaded", () => {
  // Dark mode toggle
  const darkToggle = document.getElementById("dark-toggle");
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    darkToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });

  // Navigation buttons
  const navLinks = document.querySelectorAll(".nav-link");
  const pages = document.querySelectorAll(".page");

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);

      navLinks.forEach(l => l.classList.remove("active"));
      pages.forEach(p => p.classList.remove("active"));

      link.classList.add("active");
      document.getElementById(targetId).classList.add("active");
    });
  });

  // Training videos
  const videos = {
    beginner: [
      { title: "Badminton Basics", url: "https://www.youtube.com/embed/xG8gZ8jZEtA" },
      { title: "Footwork Tutorial", url: "https://www.youtube.com/embed/xNmzVJP8-d0" },
      { title: "Basic Serve Tips", url: "https://www.youtube.com/embed/_n_x80b1V8k" },
      { title: "Clear Shot Technique", url: "https://www.youtube.com/embed/XULN89D5eCA" },
      { title: "Net Shot Practice", url: "https://www.youtube.com/embed/0LMvAJ1ebm0" },
      { title: "How to Grip Properly", url: "https://www.youtube.com/embed/1DQHIHdHGl4" },
      { title: "Ready Position Guide", url: "https://www.youtube.com/embed/DlU6D7aYgIA" },
      { title: "Smash for Beginners", url: "https://www.youtube.com/embed/rQKYZpH7N5I" },
      { title: "Beginner Footwork Drill", url: "https://www.youtube.com/embed/N3Euhw5j2CU" },
      { title: "Common Mistakes", url: "https://www.youtube.com/embed/FabJPloRRCk" }
    ],
    intermediate: [
      { title: "Advanced Footwork", url: "https://www.youtube.com/embed/3T3hQZ9WLOQ" },
      { title: "Jump Smash Drill", url: "https://www.youtube.com/embed/BKEXdXpO2RM" },
      { title: "Defensive Shots", url: "https://www.youtube.com/embed/OvA4eI4J0kE" },
      { title: "Footwork Speed", url: "https://www.youtube.com/embed/Fg4CmYZbn8Y" },
      { title: "Clear to Smash Transition", url: "https://www.youtube.com/embed/OIMyMQKU4jM" },
      { title: "Drive Practice", url: "https://www.youtube.com/embed/gTUBnqLYrjw" },
      { title: "Net Kill Execution", url: "https://www.youtube.com/embed/yhHM9lzt6OY" },
      { title: "Improve Accuracy", url: "https://www.youtube.com/embed/AVgkhD5j8lA" },
      { title: "Shot Variety Tips", url: "https://www.youtube.com/embed/Su3uO7XjWng" },
      { title: "Game Strategy Basics", url: "https://www.youtube.com/embed/XSnTLwAKjxg" }
    ],
    advanced: [
      { title: "Deception Mastery", url: "https://www.youtube.com/embed/l6_zN_aNZIQ" },
      { title: "Pro Training Routine", url: "https://www.youtube.com/embed/MjRvKxwcdCY" },
      { title: "Attack & Recover", url: "https://www.youtube.com/embed/W8US-YFmu8c" },
      { title: "Smash Placement Drill", url: "https://www.youtube.com/embed/n2Ay1yEfRkI" },
      { title: "Advanced Rally Control", url: "https://www.youtube.com/embed/QjIN4cM0p_k" },
      { title: "Elite Reaction Time", url: "https://www.youtube.com/embed/j3dSkAQbPaM" },
      { title: "Dominate the Net", url: "https://www.youtube.com/embed/UZo8Lr9cWSU" },
      { title: "Smash Variation Drill", url: "https://www.youtube.com/embed/bOXY9r8dxXI" },
      { title: "Movement Efficiency", url: "https://www.youtube.com/embed/kHBUHceEi1E" },
      { title: "Winning Mindset", url: "https://www.youtube.com/embed/Otq50FYBo2I" }
    ]
  };

  const levelSelect = document.getElementById("level-select");
  const videoList = document.getElementById("video-list");

  function loadVideos(level) {
    videoList.innerHTML = "";
    if (!videos[level]) return;

    videos[level].forEach(video => {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = `
        <h3>${video.title}</h3>
        <iframe width="320" height="180" src="${video.url}" frameborder="0" allowfullscreen></iframe>
      `;
      videoList.appendChild(wrapper);
    });
  }

  // Initial load
  loadVideos(levelSelect.value);
  levelSelect.addEventListener("change", () => {
    loadVideos(levelSelect.value);
  });
});