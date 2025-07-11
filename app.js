// app.js

// Sidebar collapse toggle
const sidebarToggle = document.getElementById('sidebar-toggle');
sidebarToggle.addEventListener('click', () => {
  document.body.classList.toggle('collapsed');
});

// Navigation tabs
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.page');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));
    link.classList.add('active');
    document.getElementById(link.getAttribute('href').slice(1)).classList.add('active');
    // auto-hide sidebar on mobile after click
    if (window.innerWidth <= 768) document.body.classList.add('collapsed');
  });
});

// Dark mode toggle
const darkToggle = document.getElementById('dark-toggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  darkToggle.textContent = document.body.classList.contains('dark-mode')
    ? '☀️ Light Mode'
    : '🌙 Dark Mode';
});

// Player toggle logic
document.querySelectorAll('.player-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.player-card').forEach(card => card.hidden = true);
    document.getElementById(link.dataset.id).hidden = false;
  });
});

// Video rendering logic
const levelSelect = document.getElementById('level-select');
const videoList = document.getElementById('video-list');
const videos = {
  beginner: [
    { title: "Your Shots Are WAY Too Predictable! Here's How to Fix It", url: "https://www.youtube.com/embed/gqIsUa4gCz4" },
    { title: "Want To MASTER Badminton Overhead Pronation", url: "https://www.youtube.com/embed/JzkigWSDucw" },
    { title: "Master Dry Swing Today!", url: "https://www.youtube.com/embed/GolGwsK9Nxg" },
    { title: "Forehand Net Cross-Court Technique", url: "https://www.youtube.com/embed/w4us5HVuFgg" },
    { title: "Magical Cross Net Shot Tutorial", url: "https://www.youtube.com/embed/6kFhxbab55E" },
    { title: "Two Types of Backhand Drive", url: "https://www.youtube.com/embed/SoXecwpUKnE" },
    { title: "Two Deceptive Badminton Shots You Should Be Using", url: "https://www.youtube.com/embed/NQXEusQZvTM" },
    { title: "Beginner Defensive Mistakes to Avoid", url: "https://www.youtube.com/embed/zDzsdU4LO0g" },
    { title: "9 Mistakes Ruining Your Return of Flick Serve", url: "https://www.youtube.com/embed/AVs3bIhdQig" },
    { title: "5 Beginner Badminton Mistakes", url: "https://www.youtube.com/embed/ySBotNdN7NU" },
    { title: "Master the V-Grip: Chop & Punch Power!", url: "https://www.youtube.com/embed/aW1e4REHSWc" },
    { title: "Badminton Grip Hack – Never Lose Your Racket Again", url: "https://www.youtube.com/embed/pGd56ZQwAvE" }
  ],
  intermediate: [
    { title: "Improve Your Dropshot Instantly!", url: "https://www.youtube.com/embed/WY9tbZTuS_c" },
    { title: "Fix Your Badminton Stance Today", url: "https://www.youtube.com/embed/S6idcFJ2Ym8" },
    { title: "When Opponent Returns Hard – What To Do", url: "https://www.youtube.com/embed/XKCa1KnnH5Q" },
    { title: "Master Lunging in Badminton", url: "https://www.youtube.com/embed/AJfdtR8Ogus" },
    { title: "Forehand Straight Lift Technique", url: "https://www.youtube.com/embed/J-qiOgGEwBM" },
    { title: "3 Ways of Net Lifting – Forehand Tutorial", url: "https://www.youtube.com/embed/qy4XJ3ZGkcE" },
    { title: "3 Ways to Practice Net Lifts", url: "https://www.youtube.com/embed/jNdlYBI5ZGU" },
    { title: "Perfect Your Overhead Swing – 3 Phases", url: "https://www.youtube.com/embed/eVNY8r6Oeek" },
    { title: "Master Backhand Shots – Change Angles", url: "https://www.youtube.com/embed/fCq-SO6rixQ" },
    { title: "Forehand Deception Tutorial", url: "https://www.youtube.com/embed/pYptyL25FtQ" },
    { title: "4 Skills You're Ignoring – Boost Consistency", url: "https://www.youtube.com/embed/h4D4vb4OZUg" },
    { title: "Control Your Opponent – Badminton Tactics", url: "https://www.youtube.com/embed/MrvYbLAnecY" },
    { title: "Consistency in 4 Minutes", url: "https://www.youtube.com/embed/K88F95osw0I" },
    { title: "Master Finger Power for Backhand", url: "https://www.youtube.com/embed/8MS42n1gtcg" },
    { title: "Perfect Your Net Spin", url: "https://www.youtube.com/embed/z0hXKlgA3p8" },
    { title: "Fix Your Heavy Hand Swing", url: "https://www.youtube.com/embed/EdCmk9BFsXQ" }
  ],
  advanced: [
    { title: "Lee Chong Wei vs Bullet Smasher – Match Breakdown", url: "https://www.youtube.com/embed/xWyMt08KWJY" },
    { title: "Lin Dan’s Best Form – 2008 Olympics", url: "https://www.youtube.com/embed/FF86j8I-ndM" },
    { title: "Greatest Match Ever – Lin Dan vs Lee Chong Wei", url: "https://www.youtube.com/embed/R9cd-RwuFk8" },
    { title: "Practice Deceptions – Lee Zii Jia", url: "https://www.youtube.com/embed/z5L7SWuj860" },
    { title: "Lin Dan’s Forehand Anticipation Footwork", url: "https://www.youtube.com/embed/CBgcPzbA9Kw" },
    { title: "Lin Dan Footwork Analysis – 4 Components", url: "https://www.youtube.com/embed/9gZx_6UYyo0" },
    { title: "From Bad to Pro – Footwork Must-Haves", url: "https://www.youtube.com/embed/9QPPvSdNj9w" },
    { title: "Studying 2008 Lin Dan – Strategic Insights", url: "https://www.youtube.com/embed/yxBVlMncudg" },
    { title: "Lee Chong Wei Beats Prime Momota – Match Analysis", url: "https://www.youtube.com/embed/Ghvsu-eamKY" },
    { title: "Kodai Naraoka vs Chou Tien Chen – Breakdown", url: "https://www.youtube.com/embed/t4o6z5PboSE" },
    { title: "Kento Momota’s Transitional Footwork", url: "https://www.youtube.com/embed/osptHe5dyPM" },
    { title: "Kento Momota – Rising of The King", url: "https://www.youtube.com/embed/lDCw1Ic9QUQ" },
    { title: "Using Holds for Shot Variety", url: "https://www.youtube.com/embed/pwyacObMGj8" },
    { title: "5 Singles Playstyles Tutorial", url: "https://www.youtube.com/embed/9_zISjHJq2E" },
    { title: "8 Footwork Steps to Increase Speed", url: "https://www.youtube.com/embed/0E6mm6PgeY4" },
    { title: "Slice Smash – Most Effective Shot", url: "https://www.youtube.com/embed/W-fGXIgTzUg" },
    { title: "Raising Happy Badminton Kids", url: "https://www.youtube.com/embed/bqCpufQ-AXI" },
    { title: "Lin Dan’s Secret Strategy Explained", url: "https://www.youtube.com/embed/IlHI0q-UCMc" }
  ],
  footwork: [
    { title: "Lin Dan’s Legendary Footwork", url: "https://www.youtube.com/embed/CBgcPzbA9Kw" },
    { title: "Smooth Footwork – Lin Dan Analysis", url: "https://www.youtube.com/embed/9gZx_6UYyo0" },
    { title: "Footwork Must-Have Skills", url: "https://www.youtube.com/embed/9QPPvSdNj9w" },
    { title: "Kento Momota Transitional Step", url: "https://www.youtube.com/embed/osptHe5dyPM" },
    { title: "8 Steps to Make You Faster", url: "https://www.youtube.com/embed/0E6mm6PgeY4" }
  ],
  strategy: [
    { title: "Deceptions You Should Practice – Lee Zii Jia", url: "https://www.youtube.com/embed/z5L7SWuj860" },
    { title: "Control Your Opponent – Badminton Tactics", url: "https://www.youtube.com/embed/MrvYbLAnecY" },
    { title: "Badminton Consistency – Key Concepts", url: "https://www.youtube.com/embed/K88F95osw0I" },
    { title: "Singles Playstyles Breakdown", url: "https://www.youtube.com/embed/9_zISjHJq2E" },
    { title: "Lin Dan's Strategic Insights", url: "https://www.youtube.com/embed/IlHI0q-UCMc" },
    { title: "Fix Your Heavy-Handed Swing", url: "https://www.youtube.com/embed/EdCmk9BFsXQ" },
    { title: "Tournament Mindset Preparation", url: "https://www.youtube.com/embed/R0rsw3mRTOA" }
  ]
};

function loadVideos(level) {
  videoList.innerHTML = '';
  if (!videos[level]) return;
  videos[level].forEach(video => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${video.title}</h3>
      <iframe src="${video.url}" allowfullscreen></iframe>
    `;
    videoList.appendChild(div);
  });
}

loadVideos(levelSelect.value);
levelSelect.addEventListener('change', () => loadVideos(levelSelect.value));
```[43dcd9a7-70db-4a1f-b0ae-981daa162054](https://github.com/rxliuli/blog/tree/cf25bc01317c3d91ced9c0c21a17c1c9f6600da7/source%2F_posts%2F6586ffbb50ac49ceb31397ce58b49f16.md?citationMarker=43dcd9a7-70db-4a1f-b0ae-981daa162054 "1")[43dcd9a7-70db-4a1f-b0ae-981daa162054](https://github.com/jbhbrown/DEAN-Website/tree/344053872d3aef1c64a7dadd4c605d0deb0e5f53/jdb393-project-3%2Fgallery.php?citationMarker=43dcd9a7-70db-4a1f-b0ae-981daa162054 "2")[43dcd9a7-70db-4a1f-b0ae-981daa162054](https://github.com/al996/Jewelry-by-Mamta/tree/23ea741dfe5161131c441406cd3ab02ba8e99c6b/about.php?citationMarker=43dcd9a7-70db-4a1f-b0ae-981daa162054 "3")