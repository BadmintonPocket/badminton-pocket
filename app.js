// Navigation
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main .page');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    sections.forEach(s => s.classList.remove('active'));
    const target = link.getAttribute('href').substring(1);
    document.getElementById(target).classList.add('active');
  });
});

// Dark mode
const darkToggle = document.getElementById('dark-toggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  darkToggle.textContent = document.body.classList.contains('dark-mode')
    ? '☀️ Light Mode'
    : '🌙 Dark Mode';
});

// Updated Video Data
const videos = {
  beginner: [
    { title: "Basic Drive Shot Tutorial", url: "https://www.youtube.com/embed/gqIsUa4gCz4" },
    { title: "Serve Return Positioning for Beginners", url: "https://www.youtube.com/embed/JzkigWSDucw" },
    { title: "Common Defensive Mistakes Beginners Make", url: "https://www.youtube.com/embed/GolGwsK9Nxg" },
    { title: "Shadow Footwork Drill for Beginners", url: "https://www.youtube.com/embed/w4us5HVuFgg" },
    { title: "Beginner Grip Guide", url: "https://www.youtube.com/embed/6kFhxbab55E" },
    { title: "Split Step Fundamentals", url: "https://www.youtube.com/embed/SoXecwpUKnE" },
    { title: "Forehand Clear Basics", url: "https://www.youtube.com/embed/NQXEusQZvTM" },
    { title: "Net Kill Footwork for Beginners", url: "https://www.youtube.com/embed/xWyMt08KWJY" },
    { title: "Short Serve Technique", url: "https://www.youtube.com/embed/FF86j8I-ndM" },
    { title: "Forehand Net Shot Tutorial", url: "https://www.youtube.com/embed/R9cd-RwuFk8" },
    { title: "Beginner Footwork Patterns", url: "https://www.youtube.com/embed/z5L7SWuj860" },
    { title: "Drop Shot Basics for Beginners", url: "https://www.youtube.com/embed/CBgcPzbA9Kw" },
    { title: "Smash Technique for Beginners", url: "https://www.youtube.com/embed/9gZx_6UYyo0" },
    { title: "3 Essential Beginner Shots", url: "https://www.youtube.com/embed/9QPPvSdNj9w" },
    { title: "How to Return a Flick Serve", url: "https://www.youtube.com/embed/AVs3bIhdQig" },
    { title: "Correct Racket Holding Technique", url: "https://www.youtube.com/embed/yxBVlMncudg" },
    { title: "Racket Preparation for Beginners", url: "https://www.youtube.com/embed/Ghvsu-eamKY" }
  ],
  intermediate: [
    { title: "Footwork Correction Drill", url: "https://www.youtube.com/embed/WY9tbZTuS_c" },
    { title: "Net Shot Deception Techniques", url: "https://www.youtube.com/embed/S6idcFJ2Ym8" },
    { title: "Net Lift Strategy", url: "https://www.youtube.com/embed/XKCa1KnnH5Q" },
    { title: "Midcourt Offensive Play", url: "https://www.youtube.com/embed/AJfdtR8Ogus" },
    { title: "Wall Rally Practice Drill", url: "https://www.youtube.com/embed/t4o6z5PboSE" },
    { title: "Backhand Clear Tips", url: "https://www.youtube.com/embed/J-qiOgGEwBM" },
    { title: "Advanced Net Kill Drill", url: "https://www.youtube.com/embed/_RVbO0PD1BI" },
    { title: "Smash Jump Practice", url: "https://www.youtube.com/embed/qy4XJ3ZGkcE" },
    { title: "Backhand Basics Tutorial", url: "https://www.youtube.com/embed/jNdlYBI5ZGU" },
    { title: "Smash Angle Drills", url: "https://www.youtube.com/embed/eVNY8r6Oeek" },
    { title: "Doubles Defense Footwork", url: "https://www.youtube.com/embed/fCq-SO6rixQ" },
    { title: "Drive vs Push Comparison", url: "https://www.youtube.com/embed/pYptyL25FtQ" },
    { title: "Deep Backhand Clear Technique", url: "https://www.youtube.com/embed/osptHe5dyPM" },
    { title: "Crosscourt Net Shot Tutorial", url: "https://www.youtube.com/embed/_ebb6FEV1oU" },
    { title: "Footwork Pattern Drill", url: "https://www.youtube.com/embed/lDCw1Ic9QUQ" },
    { title: "Fast Recovery Footwork", url: "https://www.youtube.com/embed/h4D4vb4OZUg" },
    { title: "Recovering During Rallies", url: "https://www.youtube.com/embed/MrvYbLAnecY" }
  ],
  advanced: [
    { title: "Jump Smash Variations", url: "https://www.youtube.com/embed/zDzsdU4LO0g" },
    { title: "Pro-Level Deception Techniques", url: "https://www.youtube.com/embed/K88F95osw0I" },
    { title: "High-Level Footwork Drills", url: "https://www.youtube.com/embed/pwyacObMGj8" },
    { title: "Precision Shot Placement", url: "https://www.youtube.com/embed/9_zISjHJq2E" },
    { title: "Doubles Anticipation Guide", url: "https://www.youtube.com/embed/8MS42n1gtcg" },
    { title: "Transition Movement Footwork", url: "https://www.youtube.com/embed/0E6mm6PgeY4" },
    { title: "Recovering Under Pressure", url: "https://www.youtube.com/embed/ySBotNdN7NU" },
    { title: "Change of Pace Drill", url: "https://www.youtube.com/embed/z0hXKlgA3p8" },
    { title: "Focus and Mental Toughness", url: "https://www.youtube.com/embed/aW1e4REHSWc" },
    { title: "Pro Warm-up Routine", url: "https://www.youtube.com/embed/W-fGXIgTzUg" },
    { title: "Smash Deception Technique", url: "https://www.youtube.com/embed/bqCpufQ-AXI" },
    { title: "Backcourt Control Tutorial", url: "https://www.youtube.com/embed/IlHI0q-UCMc" },
    { title: "Tactical Court Positioning", url: "https://www.youtube.com/embed/EdCmk9BFsXQ" },
    { title: "Rally Strategy Analysis", url: "https://www.youtube.com/embed/pGd56ZQwAvE" },
    { title: "Defensive Deception Techniques", url: "https://www.youtube.com/embed/lLwp8O9OOS8" },
    { title: "Tournament Mindset Preparation", url: "https://www.youtube.com/embed/R0rsw3mRTOA" }
  ]
};

// Video rendering
const levelSelect = document.getElementById('level-select');
const videoList = document.getElementById('video-list');

function loadVideos(level) {
  videoList.innerHTML = '';
  if (!videos[level]) return;
  videos[level].forEach(video => {
    const div = document.createElement('div');
    div.innerHTML = `<h3>${video.title}</h3><iframe src="${video.url}" allowfullscreen></iframe>`;
    videoList.appendChild(div);
  });
}

loadVideos(levelSelect.value);
levelSelect.addEventListener('change', () => loadVideos(levelSelect.value));