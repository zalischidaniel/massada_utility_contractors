// ===================================
// MASSADA UTILITY CONTRACTORS
// CLIENT-SIDE JAVASCRIPT
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Navigation elements
    const nav = document.getElementById('nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

    // ===================================
    // STICKY NAVIGATION ON SCROLL
    // ===================================
    const handleNavScroll = () => {
        if (window.pageYOffset > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // ===================================
    // MOBILE DRAWER TOGGLE
    // ===================================
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isActive = navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // ===================================
    // SMOOTH SCROLLING WITH OFFSET
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = nav.offsetHeight || 88;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // SCROLL REVEAL ANIMATIONS
    // ===================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!prefersReducedMotion.matches && 'IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animTargets = document.querySelectorAll(`
            .about-content,
            .about-stats,
            .about-img-box,
            .service-card,
            .safety-content,
            .safety-image-box,
            .leadership-image,
            .leadership-content,
            .culture-card,
            .contact-content,
            .contact-form
        `);

        animTargets.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
            el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            observer.observe(el);
        });

        // Add CSS class handler
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            .revealed {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(styleSheet);
    }

    // ===================================
    // INFINITE HORIZONTAL MARQUEE (Continuous Ticker)
    // ===================================
    const marqueeTrack = document.querySelector('.marquee-track');
    const firstGroup = document.querySelector('.marquee-group');

    if (marqueeTrack && firstGroup) {
        let offset = 0;
        // 0.45px per frame @ 60fps ≈ 27px/s (calm, slow, smooth, continuous)
        const baseSpeed = 0.45;
        let lastTime = performance.now();

        function renderMarquee(currentTime) {
            const deltaTime = currentTime - lastTime;
            lastTime = currentTime;

            const delta = Math.min(deltaTime / 16.667, 3);
            offset += baseSpeed * delta;

            const groupWidth = firstGroup.offsetWidth;
            if (groupWidth > 0) {
                if (offset >= groupWidth) {
                    offset = offset % groupWidth;
                }
                marqueeTrack.style.transform = `translate3d(-${offset}px, 0, 0)`;
            }

            requestAnimationFrame(renderMarquee);
        }

        requestAnimationFrame(renderMarquee);
    }

    // ===================================
    // GALLERY LIGHTBOX (Minimal, Image-Only)
    // ===================================
    const primaryItems = document.querySelectorAll('.marquee-group:first-child .gallery-item');
    const galleryImages = Array.from(primaryItems.length > 0 ? primaryItems : document.querySelectorAll('.gallery-item'))
        .map(item => item.querySelector('img'))
        .filter(Boolean);

    if (galleryImages.length > 0) {
        let currentIndex = 0;
        let lightbox = null;
        let lightboxImg = null;

        const updateImage = (index) => {
            if (index < 0) index = galleryImages.length - 1;
            if (index >= galleryImages.length) index = 0;
            currentIndex = index;
            if (lightboxImg) {
                lightboxImg.style.opacity = '0';
                lightboxImg.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    lightboxImg.src = galleryImages[currentIndex].src;
                    lightboxImg.alt = '';
                    lightboxImg.style.opacity = '1';
                    lightboxImg.style.transform = 'scale(1)';
                }, 120);
            }
        };

        const closeLightbox = () => {
            if (!lightbox) return;
            lightbox.style.opacity = '0';
            setTimeout(() => {
                if (lightbox && document.body.contains(lightbox)) {
                    document.body.removeChild(lightbox);
                }
                lightbox = null;
                lightboxImg = null;
                document.body.style.overflow = '';
            }, 200);
            document.removeEventListener('keydown', handleKey);
        };

        const handleKey = (e) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') updateImage(currentIndex - 1);
            if (e.key === 'ArrowRight') updateImage(currentIndex + 1);
        };

        const openLightbox = (index) => {
            currentIndex = index;
            lightbox = document.createElement('div');
            lightbox.className = 'lightbox-modal';
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(7, 22, 35, 0.96);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                padding: 1.5rem;
                opacity: 0;
                transition: opacity 0.25s ease;
                user-select: none;
            `;

            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '&times;';
            closeBtn.setAttribute('aria-label', 'Close');
            closeBtn.style.cssText = `
                position: absolute;
                top: 1.5rem;
                right: 2rem;
                font-size: 2.25rem;
                color: rgba(255, 255, 255, 0.85);
                background: none;
                border: none;
                cursor: pointer;
                line-height: 1;
                padding: 0.5rem;
                transition: color 0.2s ease, transform 0.2s ease;
                z-index: 10;
            `;
            closeBtn.addEventListener('mouseenter', () => {
                closeBtn.style.color = '#FFFFFF';
                closeBtn.style.transform = 'scale(1.1)';
            });
            closeBtn.addEventListener('mouseleave', () => {
                closeBtn.style.color = 'rgba(255, 255, 255, 0.85)';
                closeBtn.style.transform = 'scale(1)';
            });
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeLightbox();
            });

            const prevBtn = document.createElement('button');
            prevBtn.innerHTML = '&#8249;';
            prevBtn.setAttribute('aria-label', 'Previous image');
            prevBtn.style.cssText = `
                position: absolute;
                left: 1.5rem;
                top: 50%;
                transform: translateY(-50%);
                font-size: 3rem;
                color: rgba(255, 255, 255, 0.7);
                background: rgba(11, 31, 51, 0.4);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                width: 52px;
                height: 52px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.2s ease;
                z-index: 10;
                line-height: 1;
                padding-bottom: 4px;
            `;
            prevBtn.addEventListener('mouseenter', () => {
                prevBtn.style.color = '#FFFFFF';
                prevBtn.style.background = 'rgba(11, 31, 51, 0.8)';
                prevBtn.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            });
            prevBtn.addEventListener('mouseleave', () => {
                prevBtn.style.color = 'rgba(255, 255, 255, 0.7)';
                prevBtn.style.background = 'rgba(11, 31, 51, 0.4)';
                prevBtn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            });
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                updateImage(currentIndex - 1);
            });

            const nextBtn = document.createElement('button');
            nextBtn.innerHTML = '&#8250;';
            nextBtn.setAttribute('aria-label', 'Next image');
            nextBtn.style.cssText = `
                position: absolute;
                right: 1.5rem;
                top: 50%;
                transform: translateY(-50%);
                font-size: 3rem;
                color: rgba(255, 255, 255, 0.7);
                background: rgba(11, 31, 51, 0.4);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                width: 52px;
                height: 52px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.2s ease;
                z-index: 10;
                line-height: 1;
                padding-bottom: 4px;
            `;
            nextBtn.addEventListener('mouseenter', () => {
                nextBtn.style.color = '#FFFFFF';
                nextBtn.style.background = 'rgba(11, 31, 51, 0.8)';
                nextBtn.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            });
            nextBtn.addEventListener('mouseleave', () => {
                nextBtn.style.color = 'rgba(255, 255, 255, 0.7)';
                nextBtn.style.background = 'rgba(11, 31, 51, 0.4)';
                nextBtn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            });
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                updateImage(currentIndex + 1);
            });

            lightboxImg = document.createElement('img');
            lightboxImg.src = galleryImages[currentIndex].src;
            lightboxImg.alt = '';
            lightboxImg.style.cssText = `
                max-width: 90vw;
                max-height: 88vh;
                object-fit: contain;
                border-radius: 6px;
                box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
                cursor: default;
                transition: opacity 0.2s ease, transform 0.2s ease;
            `;
            lightboxImg.addEventListener('click', (e) => e.stopPropagation());

            lightbox.appendChild(closeBtn);
            lightbox.appendChild(prevBtn);
            lightbox.appendChild(nextBtn);
            lightbox.appendChild(lightboxImg);

            lightbox.addEventListener('click', closeLightbox);
            document.addEventListener('keydown', handleKey);

            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            requestAnimationFrame(() => {
                lightbox.style.opacity = '1';
            });
        };

        const allGalleryItems = document.querySelectorAll('.gallery-item');
        allGalleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                openLightbox(index % galleryImages.length);
            });
        });
    }

    // ===================================
    // CONTACT FORM INTERACTION
    // ===================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('name');
            const senderName = nameInput ? nameInput.value.trim() : 'there';

            alert(`Thank you, ${senderName}! Your project inquiry has been recorded. For immediate scheduling or bid inquiries, you can also call Massada directly at (417) 647-5021 or email admin@massadainc.com.`);
            contactForm.reset();
        });
    }
});
