function estimate() {
  var roomsNu = parseInt(document.getElementById('roomsNu').value);
  var own = document.querySelector('input[name="own"]:checked');
  var estimate = 0;

  if (isNaN(roomsNu) || roomsNu < 1 || roomsNu > 10) {
    alert('Please enter a number of rooms between 1 and 10.');
    return;
  }

  if (!own) {
    alert('Please select whether you own the apartment.');
    return;
  }

  if (own.value === 'yes') {
    estimate = roomsN * 200;
  } else {
    estimate = roomsNu * 220;
  }

  // Count selected people checkboxes using a classic for-loop
  var peopleSel = document.querySelectorAll('input[name="people"]:checked');
  var totalPeople = 0;
  for (var i = 0; i < peopleSel.length; i++) {
    totalPeople += parseInt(peopleSel[i].value, 10);
  }

  if (totalPeople === 0) {
    alert('Please select how many people live in your place.');
    return;
  }

  var resultText =
    '$' +
    estimate.toLocaleString() +
    ' for ' +
    totalPeople +
    (totalPeople === 1 ? ' person' : ' people');

  document.getElementById('cost').innerHTML = resultText;
  alert('Estimate Cost: ' + resultText);
}

function subscribe() {
  var email = document.getElementById('sub-email').value;
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === '') {
    alert('Please enter your email address.');
  } else if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
  } else {
    alert('Thank you for subscribing to our newsletter.');
  }
}

/* ============ DOM Content Loaded ============ */
document.addEventListener('DOMContentLoaded', function () {
  // Initialize timeline milestones
  var milestones = [
    { year: 2021, text: 'Founded Decor4U' },
    { year: 2022, text: 'Launched online platform' },
    { year: 2023, text: 'Reached 10k subscribers' },
    { year: 2024, text: 'Opened first showroom' },
  ];

  var timelineList = document.getElementById('timeline-list');
  if (timelineList) {
    var i = 0;
    while (i < milestones.length) {
      var m = milestones[i];
      var li = document.createElement('li');
      li.innerHTML =
        '<span class="year">' +
        m.year +
        '</span> <span class="milestone">' +
        m.text +
        '</span>';
      timelineList.appendChild(li);
      i++;
    }
  }

  // Initialize scroll animations
  initScrollAnimations();

  // Mobile hamburger menu toggle
  var navToggle = document.getElementById('nav-toggle');
  var headerNav = document.querySelector('header nav');
  if (navToggle && headerNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = headerNav.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when any nav link is clicked
    var navLinks = headerNav.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        headerNav.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
});

/* Promotion countdown */
if (document.getElementById('promo')) {
  runClock();
  setInterval(runClock, 1000);
}

function runClock() {
  var currentDay = new Date();
  var endPromo = new Date('Jan 01, 2026');

  var days = document.getElementById('days');
  var hrs = document.getElementById('hrs');
  var mins = document.getElementById('mins');
  var secs = document.getElementById('secs');

  if (days && hrs && mins && secs) {
    var daysLeft = (endPromo - currentDay) / (1000 * 60 * 60 * 24);
    days.innerHTML = Math.floor(daysLeft);

    var hrsLeft = (daysLeft - Math.floor(daysLeft)) * 24;
    hrs.innerHTML = Math.floor(hrsLeft);

    var minsLeft = (hrsLeft - Math.floor(hrsLeft)) * 60;
    mins.innerHTML = Math.floor(minsLeft);

    var secsLeft = (minsLeft - Math.floor(minsLeft)) * 60;
    secs.innerHTML = Math.floor(secsLeft);
  }
}

/* ============ Scroll Animations ============ */

function initScrollAnimations() {
  // Options for Intersection Observer
  const observerOptions = {
    root: null, // viewport
    threshold: 0.05, // trigger when 5% of element is visible
    rootMargin: '0px 0px 100px 0px', // trigger earlier before element enters viewport
  };

  // Create Intersection Observer
  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Add animation class when element comes into view
        entry.target.classList.add('animate-in');

        // Optional: stop observing after animation (for one-time animations)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with animation classes
  const animatedElements = document.querySelectorAll(
    '.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale'
  );

  animatedElements.forEach(function (element, index) {
    // Add staggered delay for items in a list/group
    if (element.classList.contains('stagger')) {
      element.style.transitionDelay = index * 0.05 + 's';
    }

    observer.observe(element);
  });
}

// Add dynamic header and parallax effects on scroll
var lastScrollTop = 0;
window.addEventListener('scroll', function () {
  const scrolled = window.pageYOffset;
  const header = document.querySelector('header');

  // Add shadow and styling to header on scroll
  if (header) {
    if (scrolled > 50) {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      header.style.transition = 'all 0.3s ease';
    } else {
      header.style.boxShadow = 'none';
    }
  }

  // Parallax effect for images
  const parallaxElements = document.querySelectorAll('.parallax-element');
  parallaxElements.forEach(function (element) {
    const speed = element.dataset.speed || 0.5;
    element.style.transform = 'translateY(' + scrolled * speed + 'px)';
  });

  lastScrollTop = scrolled;
});

// Add smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});
