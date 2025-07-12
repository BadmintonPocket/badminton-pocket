document.addEventListener('DOMContentLoaded', () => {
  // 1) User greeting
  let username = localStorage.getItem('bp_username');
  if (!username) {
    username = prompt('Enter your name:') || 'Guest';
    localStorage.setItem('bp_username', username);
  }
  const greetEl = document.getElementById('user-greeting');
  if (greetEl) greetEl.textContent = `Logged in as ${username}`;

  // 2) Sidebar toggle
  const sbt = document.getElementById('sidebar-toggle');
  if (sbt) sbt.addEventListener('click', () =>
    document.body.classList.toggle('sidebar-open')
  );

  // 3) Dark mode
  const dmt = document.getElementById('dark-toggle');
  if (dmt) dmt.addEventListener('click', () => {
    const dm = document.body.classList.toggle('dark-mode');
    dmt.textContent = dm ? '☀️ Light Mode' : '🌙 Dark Mode';
  });

  // 4) Tab nav
  const nav = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page');
  nav.forEach(l => l.addEventListener('click', e => {
    e.preventDefault();
    nav.forEach(x=>x.classList.remove('active'));
    pages.forEach(p=>p.classList.remove('active'));
    l.classList.add('active');
    const tgt = document.getElementById(l.getAttribute('href').slice(1));
    if (tgt) tgt.classList.add('active');
    if (window.innerWidth<768) document.body.classList.remove('sidebar-open');
  }));

  // 5) Player cards
  document.querySelectorAll('.player-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.player-card').forEach(c=>c.hidden=true);
      const card = document.getElementById(link.dataset.id);
      if (card) card.hidden = false;
    });
  });

  // 6) Videos
  const videos = {
    beginner: [
      {title:"Your Shots Are WAY Too Predictable!",url:"https://www.youtube.com/embed/gqIsUa4gCz4"},
      {title:"Want To MASTER Overhead Pronation",url:"https://www.youtube.com/embed/JzkigWSDucw"},
      {title:"Master Dry Swing Today!",url:"https://www.youtube.com/embed/GolGwsK9Nxg"},
      {title:"Forehand Net Cross-Court Technique",url:"https://www.youtube.com/embed/w4us5HVuFgg"},
      {title:"Magical Cross Net Shot Tutorial",url:"https://www.youtube.com/embed/6kFhxbab55E"}
    ],
    intermediate: [
      {title:"Improve Your Dropshot Instantly!",url:"https://www.youtube.com/embed/WY9tbZTuS_c"},
      {title:"Fix Your Badminton Stance Today",url:"https://www.youtube.com/embed/S6idcFJ2Ym8"},
      {title:"When Opponent Returns Hard – What To Do",url:"https://www.youtube.com/embed/XKCa1KnnH5Q"}
    ],
    advanced: [
      {title:"Lee Chong Wei vs Bullet Smasher – Breakdown",url:"https://www.youtube.com/embed/xWyMt08KWJY"},
      {title:"Lin Dan’s Best Form – 2008 Olympics",url:"https://www.youtube.com/embed/FF86j8I-ndM"}
    ],
    footwork: [
      {title:"Lin Dan’s Legendary Footwork",url:"https://www.youtube.com/embed/CBgcPzbA9Kw"},
      {title:"8 Steps to Make You Faster",url:"https://www.youtube.com/embed/0E6mm6PgeY4"}
    ],
    strategy: [
      {title:"Control Your Opponent – Tactics",url:"https://www.youtube.com/embed/MrvYbLAnecY"},
      {title:"Deceptions You Should Practice",url:"https://www.youtube.com/embed/z5L7SWuj860"}
    ]
  };
  const lvl = document.getElementById('level-select');
  const vlist = document.getElementById('video-list');
  function loadVideos(cat){
    if(!vlist)return;
    vlist.innerHTML='';
    (videos[cat]||[]).forEach(v=>{
      const d=document.createElement('div');
      d.innerHTML=`<h3>${v.title}</h3>
        <iframe src="${v.url}" allowfullscreen></iframe>`;
      vlist.appendChild(d);
    });
  }
  if(lvl&&vlist){
    lvl.addEventListener('change',()=>loadVideos(lvl.value));
    loadVideos(lvl.value);
  }

  // 7) Workouts
  const workouts = {
    beginner:{Mon:['10min jog','4×30s shuttles'],Tue:['3×10 push-ups','3×20s plank']},
    intermediate:{Mon:['15min intervals','5×40m shuttles'],Tue:['4×8 squats','3×15 lunges']},
    advanced:{Mon:['20min intervals','6×50m shuttles'],Tue:['5×5 back squats','4×6 deadlifts']}
  };
  const wsel=document.getElementById('workout-level-select');
  const wplan=document.getElementById('workout-plan');
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

  // 8) Film Analyzer
  const upload = document.getElementById('video-upload');
  const vid    = document.getElementById('game-video');
  const cvs    = document.getElementById('frame-canvas');
  const btn    = document.getElementById('analyze-btn');
  const out    = document.getElementById('analysis-result');

  if(upload&&vid&&cvs&&btn&&out){
    (async()=>{
      let detector;
      try{
        detector = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet,
          {modelType:'SinglePose.Lightning'}
        );
      }catch(e){
        out.textContent='Model load failed';
        console.error(e);
        return;
      }

      upload.addEventListener('change',e=>{
        const f=e.target.files[0];
        if(f) vid.src=URL.createObjectURL(f);
      });

      btn.addEventListener('click',async()=>{
        out.textContent='Processing…';
        await new Promise(r=>vid.onloadedmetadata=r);
        vid.pause();
        cvs.width=vid.videoWidth;
        cvs.height=vid.videoHeight;
        const ctx=cvs.getContext('2d');
        // single-frame at midpoint
        vid.currentTime=vid.duration/2;
        await new Promise(r=>vid.addEventListener('seeked',r,{once:true}));
        ctx.drawImage(vid,0,0);
        let poses=[];
        try{poses=await detector.estimatePoses(vid)}catch(e){console.error(e)}
        const keys=poses[0]?.keypoints
          .filter(k=>k.score>0.3).map(k=>k.name).join(', ');
        out.textContent=keys
          ? `Detected keypoints: ${keys}`
          : 'No keypoints detected.';
      });
    })();
  }
});