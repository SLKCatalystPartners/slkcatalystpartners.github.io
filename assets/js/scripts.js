// Helper function to debounce scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Existing Code
var body = document.querySelector('body');
var menuTrigger = document.querySelector('#toggle-main-menu-mobile');
var menuContainer = document.querySelector('#main-menu-mobile');
var targetDivs = document.querySelectorAll('[data-scroll-distance]'); // Select all elements with data-scroll-distance

menuTrigger.onclick = function() {
    menuContainer.classList.toggle('open');
    menuTrigger.classList.toggle('is-active');
    body.classList.toggle('lock-scroll');
};

function handleScroll() {
    targetDivs.forEach(function(targetDiv) {
        var scrollDistance = targetDiv.getAttribute('data-scroll-distance');
        if (window.scrollY > scrollDistance) {
            targetDiv.classList.add('scrolled');
        } else {
            targetDiv.classList.remove('scrolled');
        }
    });
}

window.addEventListener('scroll', debounce(handleScroll));

// scroll

document.addEventListener("DOMContentLoaded", function() {
    const offset = 120; // Adjust this value to the height of your fixed header or desired offset
    const links = document.querySelectorAll(".scroll-link");
  
    links.forEach(link => {
      link.addEventListener("click", function(event) {
        event.preventDefault();
  
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
  
        if (targetElement) {
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition - offset;
  
          window.scrollBy({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      });
    });
  });
  
// New Script Integration
document.addEventListener('DOMContentLoaded', function() {
    const floatingBackground = document.getElementById('floatingBackground');
    const colorsCircles = ['#3a2849', '#334f4e', '#235958', '#24228c', '#006548'];
    const colorsDots = ['#00A850', '#FFC72C', '#E6F3ED', '#F9F3E1'];

    function createFloatingCircles() {
        const circleSize = 800;
        const circleOverlap = 0.5;
        const divWidth = floatingBackground.offsetWidth;
        const divHeight = floatingBackground.offsetHeight;
        const numberOfCirclesHorizontal = Math.ceil(divWidth / (circleSize * circleOverlap)) + 1;
        const numberOfCirclesVertical = Math.ceil(divHeight / (circleSize * circleOverlap)) + 1;
        const totalCircles = numberOfCirclesHorizontal * numberOfCirclesVertical;

        for (let i = 0; i < totalCircles; i++) {
            const circle = document.createElement('div');
            circle.classList.add('floating-circle');
            const size = Math.random() * 200 + circleSize;
            circle.style.width = `${size}px`;
            circle.style.height = `${size}px`;
            const color = colorsCircles[Math.floor(Math.random() * colorsCircles.length)];
            circle.style.backgroundColor = color;
            
            const column = i % numberOfCirclesHorizontal;
            const row = Math.floor(i / numberOfCirclesHorizontal);
            
            const startX = column * circleSize * circleOverlap - size / 2;
            const startY = row * circleSize * circleOverlap - size / 2;
            
            circle.style.left = `${startX}px`;
            circle.style.top = `${startY}px`;

            const translateX = (Math.random()) * 80;
            const translateY = (Math.random()) * 80;
            circle.style.setProperty('--translate-x', `${translateX}px`);
            circle.style.setProperty('--translate-y', `${translateY}px`);

            circle.style.animationDuration = `${Math.random() * 2 + 1}s`;
            circle.style.animationDelay = `${Math.random() * -3}s`;

            floatingBackground.appendChild(circle);
        }
    }

    createFloatingCircles();
    window.addEventListener('resize', () => {
        floatingBackground.innerHTML = '';
        createFloatingCircles();
    });

    // Node network code
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    const dotCount = 50;
    const connectionDistance = 100;
    let dots = [];
    let time = 0;

    const BASE_WIDTH = 1920;
    const BASE_DOT_COUNT = 50;

    class Dot {
        constructor(x, y) {
            this.x = x;
            this.baseX = x;
            this.y = y;
            this.baseY = y;
            this.vx = (Math.random() - 0.5) * 0.65 * (width / BASE_WIDTH);
            this.vy = (Math.random() - 0.5) * 0.65 * (height / BASE_WIDTH);
            this.radius = Math.random() * 2 + 1;
            this.color = colorsDots[Math.floor(Math.random() * colorsDots.length)];
            this.phaseX = Math.random() * Math.PI * 2;
            this.phaseY = Math.random() * Math.PI * 2;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        move() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx = -this.vx;
            if (this.y < 0 || this.y > height) this.vy = -this.vy;

            const waveAmplitudeX = 30;
            const waveAmplitudeY = 40;
            const waveFrequency = 0.002;
            this.x = this.baseX + Math.sin(time * 1.3 + this.phaseX) * waveAmplitudeX;
            this.y = this.baseY + Math.sin(time + this.phaseY) * waveAmplitudeY;

            this.baseX += this.vx;
            this.baseY += this.vy;
            if (this.baseX < 0 || this.baseX > width) {
                this.vx = -this.vx;
                this.baseX += this.vx;
            }
            if (this.baseY < 0 || this.baseY > height) {
                this.vy = -this.vy;
                this.baseY += this.vy;
            }
        }
    }

    function init() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;

        const scaleFactor = Math.max(0.5, Math.min(1, width / BASE_WIDTH));
        const adjustedDotCount = Math.round(BASE_DOT_COUNT * scaleFactor);

        dots = [];
        for (let i = 0; i < adjustedDotCount; i++) {
            dots.push(new Dot(Math.random() * width, Math.random() * height));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        time += 0.0005;
        for (let i = 0; i < dots.length; i++) {
            dots[i].move();
            dots[i].draw();
            for (let j = i + 1; j < dots.length; j++) {
                const dx = dots[i].x - dots[j].x;
                const dy = dots[i].y - dots[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(dots[i].x, dots[i].y);
                    ctx.lineTo(dots[j].x, dots[j].y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / connectionDistance)})`;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        init();
        createFloatingCircles();
    });
    init();
    animate();
});
