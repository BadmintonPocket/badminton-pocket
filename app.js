// Navigation handling
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main section');
  const navLinks = document.querySelectorAll('.sidebar nav ul li a');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);

      sections.forEach(section => {
        section.style.display = section.id === targetId ? 'block' : 'none';
      });

      navLinks.forEach(nav => nav.classList.remove('active'));
      link.classList.add('active');
    });
  });

  if (sections.length) {
    sections.forEach((section, i) => section.style.display = i === 0 ? 'block' : 'none');
    navLinks[0].classList.add('active');
  }
});

// Training videos data
const trainingVideos = {
  beginner: [
    { title: "Basic Grip & Stance", url: "https://www.youtube.com/embed/VcQ9b-1NOqA" },
    { title: "Footwork Drills", url: "https://www.youtube.com/embed/ZjZ8PyBfEEk" },
    { title: "Serve Basics", url: "https://www.youtube.com/embed/ozcG-x1T9tw" },
    { title: "Clear Shots", url: "https://www.youtube.com/embed/4ZbmknlHliM" },
    { title: "Net Play", url: "https://www.youtube.com/embed/tI2YsLj3S5s" }
  ],
  intermediate: [
    { title: "Smash Techniques", url: "https://www.youtube.com/embed/8oXYlr_pH3o" },
    { title: "Drop Shots & Net Play", url: "https://www.youtube.com/embed/x9dxpeJ6GvQ" },
    { title: "Footwork Speed", url: "https://www.youtube.com/embed/K29m9dN-Ws0" },
    { title: "Backhand Shots", url: "https://www.youtube.com/embed/wT_MU4_p6vw" },
    { title: "Defense Tactics", url: "https://www.youtube.com/embed/W8f-_9Yv4k4" }
  ],
  advanced: [
    { title: "Deception