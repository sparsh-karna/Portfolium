// Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const portfolioDetailsForm = document.getElementById('portfolioDetailsForm');
    const initialForm = document.getElementById('initialForm');
    const portfolioContent = document.getElementById('portfolioContent');
    const loader = document.querySelector('.netflix-loader');

    portfolioDetailsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading screen
        initialForm.style.display = 'none';
        loader.style.display = 'flex';

        // Get form values
        const formData = {
            fullName: document.getElementById('fullName').value,
            title: document.getElementById('title').value,
            about: document.getElementById('about').value,
            profileImage: document.getElementById('profileImage').value,
            skills: {
                react: document.getElementById('reactSkill').value,
                javascript: document.getElementById('jsSkill').value,
                nodejs: document.getElementById('nodeSkill').value,
                python: document.getElementById('pythonSkill').value
            },
            social: {
                github: document.getElementById('github').value,
                linkedin: document.getElementById('linkedin').value,
                twitter: document.getElementById('twitter').value
            }
        };

        // Update portfolio content with form data
        updatePortfolio(formData);

        // Hide loader and show portfolio after a delay
        setTimeout(() => {
            loader.style.display = 'none';
            portfolioContent.style.display = 'block';
        }, 1500);
    });
});

// Update Portfolio Content
function updatePortfolio(data) {
    // Update hero section
    document.getElementById('heroName').textContent = data.fullName;
    document.getElementById('heroTitle').textContent = data.title;

    // Update about section
    document.getElementById('profileImg').src = data.profileImage;
    document.getElementById('profileImg').alt = data.fullName;
    document.getElementById('aboutText').textContent = data.about;

    // Update skills
    document.getElementById('reactProgress').style.width = `${data.skills.react}%`;
    document.getElementById('jsProgress').style.width = `${data.skills.javascript}%`;
    document.getElementById('nodeProgress').style.width = `${data.skills.nodejs}%`;
    document.getElementById('pythonProgress').style.width = `${data.skills.python}%`;

    // Update social links
    document.getElementById('githubLink').href = data.social.github;
    document.getElementById('linkedinLink').href = data.social.linkedin;
    document.getElementById('twitterLink').href = data.social.twitter;
}

// Smooth Scrolling
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Contact form submitted');
        contactForm.reset();
    });
}

// Skills Animation
const skillBars = document.querySelectorAll('.progress');
const skillsSection = document.querySelector('.skills');

const animateSkills = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillBars.forEach(bar => {
                const targetWidth = bar.getAttribute('style').match(/\d+/)[0];
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = `${targetWidth}%`;
                }, 100);
            });
            observer.unobserve(entry.target);
        }
    });
};

const skillsObserver = new IntersectionObserver(animateSkills, {
    threshold: 0.5
});

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}