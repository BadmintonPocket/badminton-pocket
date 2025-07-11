document.addEventListener('DOMContentLoaded', () => {
  // refs
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const darkToggle    = document.getElementById('dark-toggle');
  const navLinks      = [...document.querySelectorAll('.nav-link')];
  const pages         = [...document.querySelectorAll('.page')];
  const playerLinks   = [...document.querySelectorAll('.player-link')];
  const levelSelect   = document.getElementById('level-select');
  const videoList     = document.getElementById('video-list');
  const workoutSelect = document.getElementById('workout-level-select');
  const workoutPlan   = document.getElementById('workout-plan');

  // SIDEBAR toggle
  sidebarToggle.addEventListener('click', () => {
    document.body.classList.toggle('sidebar-open');
  });

  // TAB navigation
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      pages.forEach(p => p.classList.remove('active'));

      link.classList.add('active');
      const id = link.getAttribute('href').substring(1);
      document.getElementById(id).classList.add('active');

      // collapse on mobile
      if (window.innerWidth < 768) {
        document.body.classList.remove('sidebar-open');
      }
    });
  });

  // DARK-MODE toggle
  darkToggle.addEventListener('click', () => {
    const dark = document.body.classList.toggle('dark-mode');
    darkToggle.textContent = dark ? '☀️ Light Mode' : '🌙 Dark Mode';
  });

  // PLAYER-card toggle
  playerLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.player-card')
              .forEach(c => c.hidden = true);
      document.getElementById(link.dataset.id).hidden = false;
    });
  });

  // FULL video library
  const videos = {
    beginner: [
      { title: "Your Shots Are WAY Too Predictable! Here's How to Fix It", url: "https://www.youtube.com/embed/gqIsUa4gCz4" },
      { title: "Want To MASTER Badminton Overhead Pronation",               url: "https://www.youtube.com/embed/JzkigWSDucw" },
      { title: "Master Dry Swing Today!",                                    url: "https://www.youtube.com/embed/GolGwsK9Nxg" },
      { title: "Forehand Net Cross-Court Technique",                         url: "https://www.youtube.com/embed/w4us5HVuFgg" },
      { title: "Magical Cross Net Shot Tutorial",                            url: "https://www.youtube.com/embed/6kFhxbab55E" },
      { title: "Two Types of Backhand Drive",                                url: "https://www.youtube.com/embed/SoXecwpUKnE" },
      { title: "Two Deceptive Badminton Shots You Should Be Using",           url: "https://www.youtube.com/embed/NQXEusQZvTM" },
      { title: "Beginner Defensive Mistakes to Avoid",                       url: "https://www.youtube.com/embed/zDzsdU4LO0g" },
      { title: "9 Mistakes Ruining Your Return of Flick Serve",              url: "https://www.youtube.com/embed/AVs3bIhdQig" },
      { title: "5 Beginner Badminton Mistakes",                              url: "https://www.youtube.com/embed/ySBotNdN7NU" },
      { title: "Master the V-Grip: Chop & Punch Power!",                     url: "https://www.youtube.com/embed/aW1e4REHSWc" },
      { title: "Badminton Grip Hack – Never Lose Your Racket Again",          url: "https://www.youtube.com/embed/pGd56ZQwAvE" }
    ],
    intermediate: [
      { title: "Improve Your Dropshot Instantly!",      url: "https://www.youtube.com/embed/WY9tbZTuS_c" },
      { title: "Fix Your Badminton Stance Today",       url: "https://www.youtube.com/embed/S6idcFJ2Ym8" },
      { title: "When Opponent Returns Hard – What To Do",url: "https://www.youtube.com/embed/XKCa1KnnH5Q" },
      { title: "Master Lunging in Badminton",           url: "https://www.youtube.com/embed/AJfdtR8Ogus" },
      { title: "Forehand Straight Lift Technique",     url: "https://www.youtube.com/embed/J-qiOgGEwBM" },
      { title: "3 Ways of Net Lifting – Forehand Tutorial", url: "https://www.youtube.com/embed/qy4XJ3ZGkcE" },
      { title: "3 Ways to Practice Net Lifts",          url: "https://www.youtube.com/embed/jNdlYBI5ZGU" },
      { title: "Perfect Your Overhead Swing – 3 Phases",url: "https://www.youtube.com/embed/eVNY8r6Oeek" },
      { title: "Master Backhand Shots – Change Angles", url: "https://www.youtube.com/embed/fCq-SO6rixQ" },
      { title: "Forehand Deception Tutorial",           url: "https://www.youtube.com/embed/pYptyL25FtQ" },
      { title: "4 Skills You're Ignoring – Boost Consistency", url: "https://www.youtube.com/embed/h4D4vb4OZUg" },
      { title: "Control Your Opponent – Badminton Tactics",    url: "https://www.youtube.com/embed/MrvYbLAnecY" },
      { title: "Consistency in 4 Minutes",              url: "https://www.youtube.com/embed/K88F95osw0I" },
      { title: "Master Finger Power for Backhand",      url: "https://www.youtube.com/embed/8MS42n1gtcg" },
      { title: "Perfect Your Net Spin",                 url: "https://www.youtube.com/embed/z0hXKlgA3p8" },
      { title: "Fix Your Heavy Hand Swing",             url: "https://www.youtube.com/embed/EdCmk9BFsXQ" }
    ],
    advanced: [
      { title: "Lee Chong Wei vs Bullet Smasher – Match Breakdown", url: "https://www.youtube.com/embed/xWyMt08KWJY" },
      { title: "Lin Dan’s Best Form – 2008 Olympics",               url: "https://www.youtube.com/embed/FF86j8I-ndM" },
      { title: "Greatest Match Ever – Lin Dan vs Lee Chong Wei",    url: "https://www.youtube.com/embed/R9cd-RwuFk8" },
      { title: "Practice Deceptions – Lee Zii Jia",                 url: "https://www.youtube.com/embed/z5L7SWuj860" },
      { title: "Lin Dan’s Forehand Anticipation Footwork",          url: "https://www.youtube.com/embed/CBgcPzbA9Kw" },
      { title: "Lin Dan Footwork Analysis – 4 Components",          url: "https://www.youtube.com/embed/9gZx_6UYyo0" },
      { title: "From Bad to Pro – Footwork Must-Haves",             url: "https://www.youtube.com/embed/9QPPvSdNj9w" },
      { title: "Studying 2008 Lin Dan – Strategic Insights",        url: "https://www.youtube.com/embed/yxBVlMncudg" },
      { title: "Lee Chong Wei Beats Prime Momota – Match Analysis", url: "https://www.youtube.com/embed/Ghvsu-eamKY" },
      { title: "Kodai Naraoka vs Chou Tien Chen – Breakdown",       url: "https://www.youtube.com/embed/t4o6z5PboSE" },
      { title: "Kento Momota’s Transitional Footwork",              url: "https://www.youtube.com/embed/osptHe5dyPM" },
      { title: "Kento Momota – Rising of The King",                 url: "https://www.youtube.com/embed/lDCw1Ic9QUQ" },
      { title: "Using Holds for Shot Variety",                      url: "https://www.youtube.com/embed/pwyacObMGj8" },
      { title: "5 Singles Playstyles Tutorial",                     url: "https://www.youtube.com/embed/9_zISjHJq2E" },
      { title: "8 Footwork Steps to Increase Speed",                url: "https://www.youtube.com/embed/0E6mm6PgeY4" },
      { title: "Slice Smash – Most Effective Shot",                 url: "https://www.youtube.com/embed/W-fGXIgTzUg" },
      { title: "Raising Happy Badminton Kids",                      url: "https://www.youtube.com/embed/bqCpufQ-AXI" },
      { title: "Lin Dan’s Secret Strategy Explained",               url: "https://www.youtube.com/embed/IlHI0q-UCMc" }
    ],
    footwork: [
      { title: "Lin Dan’s Legendary Footwork",       url: "https://www.youtube.com/embed/CBgcPzbA9Kw" },
      { title: "Smooth Footwork – Lin Dan Analysis", url: "https://www.youtube.com/embed/9gZx_6UYyo0" },
      { title: "Footwork Must-Have Skills",          url: "https://www.youtube.com/embed/9QPPvSdNj9w" },
      { title: "Kento Momota Transitional Step",     url: "https://www.youtube.com/embed/osptHe5dyPM" },
      { title: "8 Steps to Make You Faster",         url: "https://www.youtube.com/embed/0E6mm6PgeY4" }
    ],
    strategy: [
      { title: "Deceptions You Should Practice – Lee Zii Jia", url: "https://www.youtube.com/embed/z5L7SWuj860" },
      { title: "Control Your Opponent – Badminton Tactics",    url: "https://www.youtube.com/embed/MrvYbLAnecY" },
      { title: "Badminton Consistency – Key Concepts",         url: "https://www.youtube.com/embed/K88F95osw0I" },
      { title: "Singles Playstyles Breakdown",                 url: "https://www.youtube.com/embed/9_zISjHJq2E" },
      { title: "Lin Dan's Strategic Insights",                url: "https://www.youtube.com/embed/IlHI0q-UCMc" },
      { title: "Fix Your Heavy-Handed Swing",                  url: "https://www.youtube.com/embed/EdCmk9BFsXQ" },
      { title: "Tournament Mindset Preparation",               url: "https://www.youtube.com/embed/R0rsw3mRTOA" }
    ]
  };

  function loadVideos(level) {
    videoList.innerHTML = '';
    const list = videos[level] || [];
    list.forEach(v => {
      const d = document.createElement('div');
      d.innerHTML = `<h3>${v.title}</h3>
                     <iframe src="${v.url}" allowfullscreen></iframe>`;
      videoList.appendChild(d);
    });
  }
  levelSelect.addEventListener('change', () => loadVideos(levelSelect.value));
  loadVideos(levelSelect.value);

  // WORKOUT SPLITS
  const workouts = {
    beginner: {
      Monday:   ['10 min light jog + dynamic leg swings','4×30s shuttle-runs','3×15 walking lunges','5 min four-corner footwork'],
      Tuesday:  ['3×15 bodyweight squats','3×10 push-ups','3×20s plank','5 min split-step shadow footwork'],
      Wednesday:['5×30s side-shuffles','3×12 single-leg deadlift','5 min hop-scotch drill'],
      Thursday: ['3×10 bent-over rows','3×12 overhead presses','3×20 Russian twists'],
      Friday:   ['10 min moderate run','4×30s high-knee footwork','30 net swings & 30 clear swings'],
      Saturday: ['4×5 min rally practice','10 min cool-down & stretch']
    },
    intermediate: {
      Monday:   ['15 min interval run','5×40m shuttle-runs','5 min cross-court footwork'],
      Tuesday:  ['4×8 goblet squats','4×10 single-arm rows','3×20 Russian twists'],
      Wednesday:['3×8 box jumps','5 min agility ladder','3×15 lateral bounds'],
      Thursday: ['4×8 pull-ups','4×10 push-ups','3×12 dips','3×30s side-plank'],
      Friday:   ['10 min tempo run','3×20 fly-runs','30 drive swings'],
      Saturday: ['30 min multi-shuttle drill','15 min tactical rally','10 min stretch']
    },
    advanced: {
      Monday:   ['20 min interval run','6×50m shuttle-runs','4×8 eight-corner footwork'],
      Tuesday:  ['5×5 back squats','4×6 deadlifts','4×8 weighted lunges','4×15 windshield-wipers'],
      Wednesday:['4×6 depth jumps','10 min advanced ladder','4×8 bounding'],
      Thursday: ['5×5 push-press','4×8 weighted pull-ups','4×10 dips','3×60s hollow hold'],
      Friday:   ['10 min tempo run','5×20m fly-runs','30 flick-serve returns','30 drive drills'],
      Saturday: ['Best-of-three match simulation','15 min cool-down & stretch']
    }
  };

  function renderWorkouts(level) {
    workoutPlan.innerHTML = '';
    const days = workouts[level] || {};
    Object.entries(days).forEach(([day, exs]) => {
      const wrap = document.createElement('div');
      wrap.classList.add('workout-day');
      wrap.innerHTML = `<h3>${day}</h3><ul>${exs.map(x=>`<li>${x}</li>`).join('')}</ul>`;
      workoutPlan.appendChild(wrap);
    });
  }
  workoutSelect.addEventListener('change', () => renderWorkouts(workoutSelect.value));
  renderWorkouts(workoutSelect.value);
});