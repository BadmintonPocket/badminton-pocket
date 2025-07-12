document.addEventListener('DOMContentLoaded', () => {
  try {
    // 1) User greeting via localStorage
    let username = localStorage.getItem('bp_username');
    if (!username) {
      username = prompt('Enter your name:') || 'Guest';
      localStorage.setItem('bp_username', username);
    }
    const greetEl = document.getElementById('user-greeting');
    if (greetEl) greetEl.textContent = `Logged in as ${username}`;

    // 2) Sidebar toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', () =>
        document.body.classList.toggle('sidebar-open')
      );
    }

    // 3) Dark mode
    const darkToggle = document.getElementById('dark-toggle');
    if (darkToggle) {
      darkToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        darkToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
      });
    }

    // 4) Tab navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const pages    = document.querySelectorAll('.page');
    navLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        pages.forEach(p => p.classList.remove('active'));
        link.classList.add('active');
        const id = link.getAttribute('href').slice(1);
        const page = document.getElementById(id);
        if (page) page.classList.add('active');
        if (window.innerWidth < 768) {
          document.body.classList.remove('sidebar-open');
        }
      });
    });

    // 5) Player cards
    const playerLinks = document.querySelectorAll('.player-link');
    playerLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        document.querySelectorAll('.player-card').forEach(c => c.hidden = true);
        const card = document.getElementById(link.dataset.id);
        if (card) card.hidden = false;
      });
    });

    // 6) Video library loader
    const levelSelect = document.getElementById('level-select');
    const videoList   = document.getElementById('video-list');
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
        { title:"Fix Your Badminton Stance Today",     url:"https://www.youtube.com/embed/S6idcFJ2Ym8" },
        { title:"When Opponent Returns Hard – What To Do", url:"https://www.youtube.com/embed/XKCa1KnnH5Q" },
        { title:"Master Lunging in Badminton",         url:"https://www.youtube.com/embed/AJfdtR8Ogus" },
        { title:"Forehand Straight Lift Technique",    url:"https://www.youtube.com/embed/J-qiOgGEwBM" },
        { title:"3 Ways of Net Lifting – Forehand Tutorial", url:"https://www.youtube.com/embed/qy4XJ3ZGkcE" },
        { title:"3 Ways to Practice Net Lifts",        url:"https://www.youtube.com/embed/jNdlYBI5ZGU" },
        { title:"Perfect Your Overhead Swing – 3 Phases", url:"https://www.youtube.com/embed/eVNY8r6Oeek" },
        { title:"Master Backhand Shots – Change Angles", url:"https://www.youtube.com/embed/fCq-SO6rixQ" },
        { title:"Forehand Deception Tutorial",         url:"https://www.youtube.com/embed/pYptyL25FtQ" },
        { title:"4 Skills You're Ignoring – Boost Consistency", url:"https://www.youtube.com/embed/h4D4vb4OZUg" },
        { title:"Control Your Opponent – Badminton Tactics", url:"https://www.youtube.com/embed/MrvYbLAnecY" },
        { title:"Consistency in 4 Minutes",            url:"https://www.youtube.com/embed/K88F95osw0I" },
        { title:"Master Finger Power for Backhand",    url:"https://www.youtube.com/embed/8MS42n1gtcg" },
        { title:"Perfect Your Net Spin",               url:"https://www.youtube.com/embed/z0hXKlgA3p8" },
        { title:"Fix Your Heavy Hand Swing",           url:"https://www.youtube.com/embed/EdCmk9BFsXQ" }
      ],
      advanced: [
        { title:"Lee Chong Wei vs Bullet Smasher – Match Breakdown", url:"https://www.youtube.com/embed/xWyMt08KWJY" },
        { title:"Lin Dan’s Best Form – 2008 Olympics",             url:"https://www.youtube.com/embed/FF86j8I-ndM" },
        { title:"Greatest Match Ever – Lin Dan vs Lee Chong Wei",  url:"https://www.youtube.com/embed/R9cd-RwuFk8" },
        { title:"Practice Deceptions – Lee Zii Jia",               url:"https://www.youtube.com/embed/z5L7SWuj860" },
        { title:"Lin Dan’s Forehand Anticipation Footwork",        url:"https://www.youtube.com/embed/CBgcPzbA9Kw" },
        { title:"Lin Dan Footwork Analysis – 4 Components",        url:"https://www.youtube.com/embed/9gZx_6UYyo0" },
        { title:"From Bad to Pro – Footwork Must-Haves",          url:"https://www.youtube.com/embed/9QPPvSdNj9w" },
        { title:"Studying 2008 Lin Dan – Strategic Insights",     url:"https://www.youtube.com/embed/yxBVlMncudg" },
        { title:"Lee Chong Wei Beats Prime Momota – Match Analysis", url:"https://www.youtube.com/embed/Ghvsu-eamKY" },
        { title:"Kodai Naraoka vs Chou Tien Chen – Breakdown",     url:"https://www.youtube.com/embed/t4o6z5PboSE" },
        { title:"Kento Momota’s Transitional Footwork",           url:"https://www.youtube.com/embed/osptHe5dyPM" },
        { title:"Kento Momota – Rising of The King",              url:"https://www.youtube.com/embed/lDCw1Ic9QUQ" },
        { title:"Using Holds for Shot Variety",                   url:"https://www.youtube.com/embed/pwyacObMGj8" },
        { title:"5 Singles Playstyles Tutorial",                  url:"https://www.youtube.com/embed/9_zISjHJq2E" },
        { title:"8 Footwork Steps to Increase Speed",             url:"https://www.youtube.com/embed/0E6mm6PgeY4" },
        { title:"Slice Smash – Most Effective Shot",              url:"https://www.youtube.com/embed/W-fGXIgTzUg" },
        { title:"Raising Happy Badminton Kids",                   url:"https://www.youtube.com/embed/bqCpufQ-AXI" },
        { title:"Lin Dan’s Secret Strategy Explained",            url:"https://www.youtube.com/embed/IlHI0q-UCMc" }
      ],
      footwork: [
        { title:"Lin Dan’s Legendary Footwork", url:"https://www.youtube.com/embed/CBgcPzbA9Kw" },
        { title:"Smooth Footwork – Lin Dan Analysis", url:"https://www.youtube.com/embed/9gZx_6UYyo0" },
        { title:"Footwork Must-Have Skills",      url:"https://www.youtube.com/embed/9QPPvSdNj9w" },
        { title:"Kento Momota Transitional Step", url:"https://www.youtube.com/embed/osptHe5dyPM" },
        { title:"8 Steps to Make You Faster",     url:"https://www.youtube.com/embed/0E6mm6PgeY4" }
      ],
      strategy: [
        { title:"Deceptions You Should Practice – Lee Zii Jia", url:"https://www.youtube.com/embed/z5L7SWuj860" },
        { title:"Control Your Opponent – Badminton Tactics", url:"https://www.youtube.com/embed/MrvYbLAnecY" },
        { title:"Badminton Consistency – Key Concepts", url:"https://www.youtube.com/embed/K88F95osw0I" },
        { title:"Singles Playstyles Breakdown", url:"https://www.youtube.com/embed/9_zISjHJq2E" },
        { title:"Lin Dan's Strategic Insights", url:"https://www.youtube.com/embed/IlHI0q-UCMc" },
        { title:"Fix Your Heavy-Handed Swing", url:"https://www.youtube.com/embed/EdCmk9BFsXQ" },
        { title:"Tournament Mindset Preparation", url:"https://www.youtube.com/embed/R0rsw3mRTOA" }
      ]
    };

    function loadVideos(cat) {
      if (!videoList) return;
      videoList.innerHTML = '';
      (videos[cat] || []).forEach(v => {
        const div = document.createElement('div');
        div.innerHTML = `
          <h3>${v.title}</h3>
          <iframe src="${v.url}" allowfullscreen></iframe>
        `;
        videoList.appendChild(div);
      });
    }
    if (levelSelect && videoList) {
      levelSelect.addEventListener('change', () => loadVideos(levelSelect.value));
      loadVideos(levelSelect.value);
    }

    // 7) Workouts renderer
    const workoutSelect = document.getElementById('workout-level-select');
    const workoutPlan   = document.getElementById('workout-plan');
    const workouts = {
      beginner: {
        Monday:   ['10 min jog + leg swings','4×30s shuttles','3×15 lunges','5 min 4-corner footwork'],
        Tuesday:  ['3×15 squats','3×10 push-ups','3×20s plank','5 min shadow split-step'],
        Wednesday:['5×30s side-shuffles','3×12 single-leg deadlift','5 min hopscotch'],
        Thursday: ['3×10 rows','3×12 press','3×20 Russian twists'],
        Friday:   ['10 min run','4×30s high-knee','30 net & 30 clear swings'],
        Saturday: ['4×5 min rallies','10 min cooldown/stretches']
      },
      intermediate: {
        Monday:   ['15 min intervals','5×40m shuttles','5 min cross-court'],
        Tuesday:  ['4×8 goblet squats','4×10 rows','3×20 Russian twists'],
        Wednesday:['3×8 box jumps','5 min ladder','3×15 lateral bounds'],
        Thursday: ['4×8 pull-ups','4×10 push-ups','3×12 dips','3×30s side-plank'],
        Friday:   ['10 min tempo run','3×20 fly-runs','30 drive swings'],
        Saturday: ['30 min multi-shuttle','15 min tactical rally','10 min stretch']
      },
      advanced: {
        Monday:   ['20 min intervals','6×50m shuttles','4×8 eight-corner'],
        Tuesday:  ['5×5 back squats','4×6 deadlifts','4×8 weighted lunges','4×15 windshield wipers'],
        Wednesday:['4×6 depth jumps','10 min advanced ladder','4×8 bounding'],
        Thursday: ['5×5 push-press','4×8 weighted pull-ups','4×10 dips','3×60s hollow hold'],
        Friday:   ['10 min run + 5×20m fly-runs','30 flick-serve returns','30 drive drills'],
        Saturday: ['Best-of-three matches','15 min cooldown & stretch']
      }
    };

    function renderWorkouts(lvl) {
      if (!workoutPlan) return;
      workoutPlan.innerHTML = '';
      Object.entries(workouts[lvl] || {}).forEach(([day, exs]) => {
        const w = document.createElement('div');
        w.className = 'workout-day';
        w.innerHTML = `<h3>${day}</h3><ul>${exs.map(x => `<li>${x}</li>`).join('')}</ul>`;
        workoutPlan.appendChild(w);
      });
    }
    if (workoutSelect && workoutPlan) {
      workoutSelect.addEventListener('change', () => renderWorkouts(workoutSelect.value));
      renderWorkouts(workoutSelect.value);
    }

    // 8) Film analysis with MoveNet
    const upload     = document.getElementById('video-upload');
    const gameVideo  = document.getElementById('game-video');
    const frameCanvas= document.getElementById('frame-canvas');
    const analyzeBtn = document.getElementById('analyze-btn');
    const analysisOut= document.getElementById('analysis-result');

    if (upload && gameVideo && frameCanvas && analyzeBtn && analysisOut) {
      (async () => {
        const detector = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet,
          { modelType: 'SinglePose.Lightning' }
        );

        upload.addEventListener('change', e => {
          const file = e.target.files[0];
          if (file) gameVideo.src = URL.createObjectURL(file);
        });

        async function analyzeFilm() {
          frameCanvas.width  = gameVideo.videoWidth;
          frameCanvas.height = gameVideo.videoHeight;
          const ctx = frameCanvas.getContext('2d');
          let sumY = 0, count = 0;

          for (let t = 0; t < gameVideo.duration; t += 0.5) {
            gameVideo.currentTime = t;
            await new Promise(r => (gameVideo.onseeked = r));
            ctx.drawImage(gameVideo, 0, 0);
            const poses = await detector.estimatePoses(gameVideo);
            const kp = poses[0]?.keypoints
              .find(pt => pt.name === 'left_elbow' && pt.score > 0.4);
            if (kp) {
              sumY += kp.y;
              count++;
            }
          }
          return count ? (sumY / count).toFixed(1) : null;
        }

        analyzeBtn.addEventListener('click', async () => {
          const avgY = await analyzeFilm();
          analysisOut.textContent = avgY
            ? `Avg left-elbow Y: ${avgY}px`
            : 'Could not detect keypoints.';
        });
      })();
    }

  } catch (err) {
    console.error('App initialization error:', err);
  }
});