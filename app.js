document.addEventListener('DOMContentLoaded', () => {
  // —————————
  // USER GREETING
  let username = localStorage.getItem('bp_username');
  if (!username) {
    username = prompt('Enter your name:') || 'Guest';
    localStorage.setItem('bp_username', username);
  }
  const greetEl = document.getElementById('user-greeting');
  if (greetEl) greetEl.textContent = `Logged in as ${username}`;

  // —————————
  // SIDEBAR & TABS
  document.getElementById('sidebar-toggle')
    ?.addEventListener('click', () => document.body.classList.toggle('sidebar-open'));
  document.getElementById('dark-toggle')
    ?.addEventListener('click', () => {
      const dm = document.body.classList.toggle('dark-mode');
      document.getElementById('dark-toggle').textContent =
        dm ? '☀️ Light Mode' : '🌙 Dark Mode';
    });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.nav-link').forEach(x=>x.classList.remove('active'));
      document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
      link.classList.add('active');
      document.getElementById(link.getAttribute('href').slice(1))
              ?.classList.add('active');
      if (window.innerWidth < 768) document.body.classList.remove('sidebar-open');
    });
  });

  // —————————
  // PLAYERS
  document.querySelectorAll('.player-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.player-card').forEach(c=>c.hidden=true);
      document.getElementById(link.dataset.id).hidden = false;
    });
  });

  // —————————
  // VIDEOS
  const videos = {
    beginner: [
      {title:"Fix Predictable Shots",url:"https://www.youtube.com/embed/gqIsUa4gCz4"},
      {title:"Overhead Pronation Mastery",url:"https://www.youtube.com/embed/JzkigWSDucw"},
      {title:"Dry Swing Perfection",url:"https://www.youtube.com/embed/GolGwsK9Nxg"},
      {title:"Net Cross‐Court Forehand",url:"https://www.youtube.com/embed/w4us5HVuFgg"},
      {title:"Backhand Drive Basics",url:"https://www.youtube.com/embed/SoXecwpUKnE"},
      {title:"Grip Hacks You Need",url:"https://www.youtube.com/embed/pGd56ZQwAvE"},
      {title:"Beginner Defensive Tips",url:"https://www.youtube.com/embed/zDzsdU4LO0g"}
    ],
    intermediate: [
      {title:"Dropshot Improvement",url:"https://www.youtube.com/embed/WY9tbZTuS_c"},
      {title:"Stance Fixes",url:"https://www.youtube.com/embed/S6idcFJ2Ym8"},
      {title:"Net Lift Variations",url:"https://www.youtube.com/embed/qy4XJ3ZGkcE"},
      {title:"Overhead Swing Phases",url:"https://www.youtube.com/embed/eVNY8r6Oeek"},
      {title:"Backhand Angle Control",url:"https://www.youtube.com/embed/fCq-SO6rixQ"},
      {title:"Consistency Drills",url:"https://www.youtube.com/embed/K88F95osw0I"},
      {title:"Tactics & Court Control",url:"https://www.youtube.com/embed/MrvYbLAnecY"}
    ],
    advanced: [
      {title:"Lee vs Bullet Smasher Analysis",url:"https://www.youtube.com/embed/xWyMt08KWJY"},
      {title:"Lin Dan Olympics Breakdown",url:"https://www.youtube.com/embed/FF86j8I-ndM"},
      {title:"Match of the Century",url:"https://www.youtube.com/embed/R9cd-RwuFk8"},
      {title:"Momota Footwork Secrets",url:"https://www.youtube.com/embed/osptHe5dyPM"},
      {title:"Strategic Insights 2021",url:"https://www.youtube.com/embed/yxBVlMncudg"}
    ],
    footwork: [
      {title:"Lin Dan’s Legendary Steps",url:"https://www.youtube.com/embed/CBgcPzbA9Kw"},
      {title:"8 Speed Steps",url:"https://www.youtube.com/embed/0E6mm6PgeY4"},
      {title:"Ladder & Hopscotch Combo",url:"https://www.youtube.com/embed/jNdlYBI5ZGU"}
    ],
    strategy: [
      {title:"Deceptions You Must Master",url:"https://www.youtube.com/embed/z5L7SWuj860"},
      {title:"Opponent Control Tactics",url:"https://www.youtube.com/embed/MrvYbLAnecY"},
      {title:"Tournament Mindset Prep",url:"https://www.youtube.com/embed/R0rsw3mRTOA"}
    ]
  };
  const lvl = document.getElementById('level-select');
  const vlist = document.getElementById('video-list');
  function loadVideos(cat){
    if (!vlist) return;
    vlist.innerHTML = '';
    (videos[cat]||[]).forEach(v=>{
      const d = document.createElement('div');
      d.innerHTML = `<h3>${v.title}</h3>
                     <iframe src="${v.url}" allowfullscreen></iframe>`;
      vlist.appendChild(d);
    });
  }
  if (lvl && vlist) {
    lvl.addEventListener('change', ()=>loadVideos(lvl.value));
    loadVideos(lvl.value);
  }

  // —————————
  // WORKOUTS
  const workouts = {
    beginner:{ Mon:['10min jog','4×30s shuttles'], Tue:['3×10 push-ups','30s plank'] },
    intermediate:{ Mon:['15min intervals','5×40m shuttles'], Tue:['4×8 squats','3×15 lunges'] },
    advanced:{ Mon:['20min intervals','6×50m shuttles'], Tue:['5×5 back squats','4×6 deadlifts'] }
  };
  const wsel = document.getElementById('workout-level-select');
  const wplan= document.getElementById('workout-plan');
  function renderW(lv){
    if(!wplan)return;
    wplan.innerHTML='';
    Object.entries(workouts[lv]||{}).forEach(([day,exs])=>{
      const d=document.createElement('div');
      d.className='workout-day';
      d.innerHTML=`<h3>${day}</h3><ul>${exs.map(x=>`<li>${x}</li>`).join('')}</ul>`;
      wplan.appendChild(d);
    });
  }
  if(wsel&&wplan){
    wsel.addEventListener('change',()=>renderW(wsel.value));
    renderW(wsel.value);
  }

  // —————————
  // FILM ANALYSIS (single-frame)
  const upload = document.getElementById('video-upload');
  const gameVid= document.getElementById('game-video');
  const canvas = document.getElementById('frame-canvas');
  const analyze= document.getElementById('analyze-btn');
  const out    = document.getElementById('analysis-result');
  if(upload && gameVid && canvas && analyze && out){
    (async()=>{
      let detector;
      try {
        detector = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet,
          { modelType:'SinglePose.Lightning' }
        );
      } catch(e){ out.textContent='Model load failed'; return; }

      upload.addEventListener('change', e=>{
        const f = e.target.files[0];
        if(f) gameVid.src = URL.createObjectURL(f);
      });

      analyze.addEventListener('click', async ()=>{
        out.textContent = 'Processing…';
        await new Promise(r=>gameVid.onloadedmetadata=r);
        gameVid.pause();
        canvas.width = gameVid.videoWidth;
        canvas.height= gameVid.videoHeight;
        const ctx = canvas.getContext('2d');
        // single-frame
        gameVid.currentTime = gameVid.duration/2;
        await new Promise(r=>gameVid.addEventListener('seeked',r,{once:true}));
        ctx.drawImage(gameVid,0,0);
        const poses = await detector.estimatePoses(gameVid).catch(()=>[]);
        const pts = poses[0]?.keypoints
          .filter(k=>k.score>0.3).map(k=>k.name).join(', ');
        out.textContent = pts
          ? `Detected keypoints: ${pts}`
          : 'No keypoints detected.';
      });
    })();
  }

  // —————————
  // IN-BROWSER CHAT (gpt4all-browser)
  ;(async()=>{
    const chatWin = document.getElementById('chat-window');
    const chatIn  = document.getElementById('chat-input');
    const chatBtn = document.getElementById('chat-send');
    if (!chatWin||!chatIn||!chatBtn) return;

    // init GPT4All
    await GPT4AllBrowser.init({
      wasm: '',         // auto-fetch
      model: ''         // auto-fetch quantized model
    });
    const gpt = GPT4AllBrowser;

    function append(who, txt) {
      const m = document.createElement('div');
      m.className = `chat-message ${who}`;
      m.textContent = txt;
      chatWin.appendChild(m);
      chatWin.scrollTop = chatWin.scrollHeight;
    }

    chatBtn.addEventListener('click', async () => {
      const txt = chatIn.value.trim();
      if (!txt) return;
      append('user', txt);
      chatIn.value = '';
      append('ai', '…thinking…');
      const placeholder = [...chatWin.querySelectorAll('.chat-message.ai')].pop();

      try {
        const reply = await gpt.chat(txt);
        placeholder.textContent = reply;
      } catch {
        placeholder.textContent = 'Error: model failed.';
      }
    });
  })();

});