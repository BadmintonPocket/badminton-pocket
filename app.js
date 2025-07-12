document.addEventListener('DOMContentLoaded', () => {
  // 1) Simple user greeting via LocalStorage
  let username = localStorage.getItem('bp_username');
  if (!username) {
    username = prompt('Enter your name:') || 'Guest';
    localStorage.setItem('bp_username', username);
  }
  document.getElementById('user-greeting').textContent =
    `Logged in as ${username}`;

  // 2) UI refs
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const darkToggle    = document.getElementById('dark-toggle');
  const navLinks      = [...document.querySelectorAll('.nav-link')];
  const pages         = [...document.querySelectorAll('.page')];
  const playerLinks   = [...document.querySelectorAll('.player-link')];
  const levelSelect   = document.getElementById('level-select');
  const videoList     = document.getElementById('video-list');
  const workoutSelect = document.getElementById('workout-level-select');
  const workoutPlan   = document.getElementById('workout-plan');
  const upload        = document.getElementById('video-upload');
  const video         = document.getElementById('game-video');
  const canvas        = document.getElementById('frame-canvas');
  const analyzeBtn    = document.getElementById('analyze-btn');
  const analysisOut   = document.getElementById('analysis-result');

  // 3) Sidebar toggle
  sidebarToggle.addEventListener('click', () =>
    document.body.classList.toggle('sidebar-open')
  );

  // 4) Tab navigation
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      pages.forEach(p => p.classList.remove('active'));
      link.classList.add('active');
      const id = link.getAttribute('href').slice(1);
      document.getElementById(id).classList.add('active');
      if (window.innerWidth < 768) document.body.classList.remove('sidebar-open');
    });
  });

  // 5) Dark mode
  darkToggle.addEventListener('click', () => {
    const dark = document.body.classList.toggle('dark-mode');
    darkToggle.textContent = dark ? '☀️ Light Mode' : '🌙 Dark Mode';
  });

  // 6) Player cards
  playerLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.player-card').forEach(c => c.hidden = true);
      document.getElementById(link.dataset.id).hidden = false;
    });
  });

  // 7) Full video library
  const videos = {
    beginner: [
      { title:"Your Shots Are WAY Too Predictable! Here's How to Fix It", url:"https://www.youtube.com/embed/gqIsUa4gCz4" },
      { title:"Want To MASTER Badminton Overhead Pronation", url:"https://www.youtube.com/embed/JzkigWSDucw" },
      { title:"Master Dry Swing Today!", url:"https://www.youtube.com/embed/GolGwsK9Nxg" },
      { title:"Forehand Net Cross-Court Technique", url:"https://www.youtube.com/embed/w4us5HVuFgg" },
      { title:"Magical Cross Net Shot Tutorial", url:"https://www.youtube.com/embed/6kFhxbab55E" },
      { title:"Two Types of Backhand Drive", url:"https://www.youtube.com/embed/SoXecwpUKnE" },
      { title:"Two Deceptive Badminton Shots You Should Be Using", url:"https://www.youtube.com/embed/NQXEusQZvTM" },
      { title:"Beginner Defensive Mistakes to Avoid", url:"https://www.youtube.com/embed/zDzsdU4LO0g" },
      { title:"9 Mistakes Ruining Your Return of Flick Serve", url:"https://www.youtube.com/embed/AVs3bIhdQig" },
      { title:"5 Beginner Badminton Mistakes", url:"https://www.youtube.com/embed/ySBotNdN7NU" },
      { title:"Master the V-Grip: Chop & Punch Power!", url:"https://www.youtube.com/embed/aW1e4REHSWc" },
      { title:"Badminton Grip Hack – Never Lose Your Racket Again", url:"https://www.youtube.com/embed/pGd56ZQwAvE" }
    ],
    intermediate: [
      { title:"Improve Your Dropshot Instantly!", url:"https://www.youtube.com/embed/WY9tbZTuS_c" },
      { title:"Fix Your Badminton Stance Today", url:"https://www.youtube.com/embed/S6idcFJ2Ym8" },
      { title:"When Opponent Returns Hard – What To Do", url:"https://www.youtube.com/embed/XKCa1KnnH5Q" },
      { title:"Master Lunging in Badminton", url:"https://www.youtube.com/embed/AJfdtR8Ogus" },
      { title:"Forehand Straight Lift Technique", url:"https://www.youtube.com/embed/J-qiOgGEwBM" },
      { title:"3 Ways of Net Lifting – Forehand Tutorial", url:"https://www.youtube.com/embed/qy4XJ3ZGkcE" },
      { title:"3 Ways to Practice Net Lifts", url:"https://www.youtube.com/embed/jNdlYBI5ZGU" },
      { title:"Perfect Your Overhead Swing – 3 Phases", url:"https://www.youtube.com/embed/eVNY8r6Oeek" },
      { title:"Master Backhand Shots – Change Angles", url:"https://www.youtube.com/embed/fCq-SO6rixQ" },
      { title:"Forehand Deception Tutorial", url:"https://www.youtube.com/embed/pYptyL25FtQ" },
      { title:"4 Skills You're Ignoring – Boost Consistency", url:"https://www.youtube.com/embed/h4D4vb4OZUg" },
      { title:"Control Your Opponent – Badminton Tactics", url:"https://www.youtube.com/embed/MrvYbLAnecY" },
      { title:"Consistency in 4 Minutes", url:"https://www.youtube.com/embed/K88F95osw0I" },
      { title:"Master Finger Power for Backhand", url:"https://www.youtube.com/embed/8MS42n1gtcg" },
      { title:"Perfect Your Net Spin", url:"https://www.youtube.com/embed/z0hXKlgA3p8" },
      { title:"Fix Your Heavy Hand Swing", url:"https://www.youtube.com/embed/EdCmk9BFsXQ" }
    ],
    advanced: [
      { title:"Lee Chong Wei vs Bullet Smasher – Match Breakdown", url:"https://www.youtube.com/embed/xWyMt08KWJY" },
      { title:"Lin Dan’s Best Form – 2008 Olympics", url:"https://www.youtube.com/embed/FF86j8I-ndM" },
      { title:"Greatest Match Ever – Lin Dan vs Lee Chong Wei", url:"https://www.youtube.com/embed/R9cd-RwuFk8" },
      { title:"Practice Deceptions – Lee Zii Jia", url:"https://www.youtube.com/embed/z5L7SWuj860" },
      { title:"Lin Dan’s Forehand Anticipation Footwork", url:"https://www.youtube.com/embed/CBgcPzbA9Kw" },
      { title:"Lin Dan Footwork Analysis – 4 Components", url:"https://www.youtube.com/embed/9gZx_6UYyo0" },
      { title:"From Bad to Pro – Footwork Must-Haves", url:"https://www.youtube.com/embed/9QPPvSdNj9w" },
      { title:"Studying 2008 Lin Dan – Strategic Insights", url:"https://www.youtube.com/embed/yxBVlMncudg" },
      { title:"Lee Chong Wei Beats Prime Momota – Match Analysis", url:"https://www.youtube.com/embed/Ghvsu-eamKY" },
      { title:"Kodai Naraoka vs Chou Tien Chen – Breakdown", url:"https://www.youtube.com/embed/t4o6z5PboSE" },
      { title:"Kento Momota’s Transitional Footwork", url:"https://www.youtube.com/embed/osptHe5dyPM" },
      { title:"Kento Momota – Rising of The King", url:"https://www.youtube.com/embed/lDCw1Ic9QUQ" },
      { title:"Using Holds for Shot Variety", url:"https://www.youtube.com/embed/pwyacObMGj8" },
      { title:"5 Singles Playstyles Tutorial", url:"https://www.youtube.com/embed/9_zISjHJq2E" },
      { title:"8 Footwork Steps to Increase Speed", url:"https://www.youtube.com/embed/0E6mm6PgeY4" },
      { title:"Slice Smash – Most Effective Shot", url:"https://www.youtube.com/embed/W-fGXIgTzUg" },
      { title:"Raising Happy Badminton Kids", url:"https://www.youtube.com/embed/bqCpufQ-AXI" },
      { title:"Lin Dan’s Secret Strategy Explained", url:"https://www.youtube.com/embed/IlHI0q-UCMc" }
    ],
    footwork: [
      { title:"Lin Dan’s Legendary Footwork", url:"https://www.youtube.com/embed/CBgcPzbA9Kw" },
      { title:"Smooth Footwork – Lin Dan Analysis", url:"https://www.youtube.com/embed/9gZx_6UYyo0" },
      { title:"Footwork Must-Have Skills", url:"https://www.youtube.com/embed/9QPPvSdNj9w" },
      { title:"Kento Momota Transitional Step", url:"https://www.youtube.com/embed/osptHe5dyPM" },
      { title:"8 Steps to Make You Faster", url:"https://www.youtube.com/embed/0E6mm6PgeY4" }
    ],
    strategy: [43dcd9a7-70db-4a1f-b0ae-981daa162054](https://github.com/systanon/Cardio_gym/tree/6fdc636d02b1ca0d7339df1992a3198d68caa580/slider.md?citationMarker=43dcd9a7-70db-4a1f-b0ae-981daa162054 "1")[43dcd9a7-70db-4a1f-b0ae-981daa162054](https://github.com/szerintedmi/roadmap-radar-chart/tree/45ee5f9f7a1d44100313358e369abb025b935cea/README.md?citationMarker=43dcd9a7-70db-4a1f-b0ae-981daa162054 "2")[
      { title:"Deceptions You Should Practice – Lee Zii Jia", url:"https://www.youtube.com/embed/z5L7SWuj860" },
      { title:"Control Your Opponent – Badminton Ta{"mode":"full","isActive":false}