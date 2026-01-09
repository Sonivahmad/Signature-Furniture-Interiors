document.addEventListener('DOMContentLoaded', function () {
    // 1. Update Year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // 2. Mobile Menu
    const mobileToggle = document.getElementById('mobileToggle');
    const nav = document.getElementById('nav');
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileToggle.classList.toggle('open');
        });
    }

    // 3. GSAP Animations
    if (typeof gsap !== 'undefined') {
        try {
            // Hero Title Fade-in with stagger
            gsap.to('.hero-title .line', {
                opacity: 1, 
                y: 0, 
                duration: 1.2, 
                stagger: 0.15, 
                ease: 'power4.out',
                delay: 0.3,
                clearProps: 'opacity,y'
            });

            // Hero Subtitle fade-in
            gsap.to('.hero-sub', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.8,
                ease: 'power2.out',
                clearProps: 'opacity,y'
            });

            // Hero CTAs fade-in
            gsap.to('.hero-ctas .btn', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                delay: 1.2,
                ease: 'power2.out',
                clearProps: 'opacity,y'
            });

            // Hero Media gentle zoom animation (continuous)
            gsap.to('.hero-media', {
                scale: 1.08,
                duration: 20,
                ease: 'none',
                repeat: -1,
                yoyo: true
            });

            // ScrollTrigger Animations for Sections
            if (typeof ScrollTrigger !== 'undefined') {
                gsap.registerPlugin(ScrollTrigger);

                gsap.utils.toArray('.section').forEach(sec => {
                    const children = sec.querySelectorAll(':scope > *');
                    
                    gsap.to(children, {
                        y: 0,
                        opacity: 1,
                        stagger: 0.1,
                        duration: 0.6,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: sec,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                            once: true
                        },
                        delay: 0.1
                    });
                });

                // Refresh ScrollTrigger after layout loads
                window.addEventListener('load', () => ScrollTrigger.refresh());
            }

            // Project Hover (Magnetic Effect)
            document.querySelectorAll('.project').forEach(p => {
                p.addEventListener('mousemove', (e) => {
                    const rect = p.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    gsap.to(p, { x: x * 0.1, y: y * 0.1, duration: 0.5 });
                });
                p.addEventListener('mouseleave', () => gsap.to(p, { x: 0, y: 0, duration: 0.5 }));
            });

            // Hero Mouse Parallax
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.addEventListener('mousemove', (e) => {
                    const rect = hero.getBoundingClientRect();
                    const px = (e.clientX - rect.left) / rect.width - 0.5;
                    const py = (e.clientY - rect.top) / rect.height - 0.5;
                    gsap.to('.hero-title', { x: px * 25, y: py * 15, duration: 1.2 });
                    gsap.to('.hero-media', { x: px * 15, y: py * 10, duration: 1.8 });
                });
            }

            // WhatsApp FAB magnetic hover
            const fab = document.querySelector('.whatsapp-fab');
            if (fab) {
                fab.addEventListener('mousemove', (e) => {
                    const rect = fab.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    gsap.to(fab, { x: x * 0.4, y: y * 0.4, duration: 0.4 });
                });
                fab.addEventListener('mouseleave', () => gsap.to(fab, { x: 0, y: 0, duration: 0.6 }));
            }

        } catch (err) {
            console.warn('GSAP Animation Error:', err);
        }
    }
});