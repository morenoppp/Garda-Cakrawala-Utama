document.addEventListener("DOMContentLoaded", () => {
    
    // ================================================================ //
    // 1. LOGIKA INTERSECTION OBSERVER (ANIMASI BERULANG SAAT SCROLL)   //
    // ================================================================ //
    const observerOptions = {
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active"); 
            } 
            else {
                entry.target.classList.remove("active"); 
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach(el => observer.observe(el));


    // ================================================================ //
    // 2. LOGIKA EFEK MENGETIK (TYPING EFFECT) PADA HERO SECTION        //
    // ================================================================ //
    const sourceTextElement = document.getElementById('source-text');
    const typedTextElement = document.getElementById('typed-text');
    
    if (sourceTextElement && typedTextElement) {
        const textToType = sourceTextElement.textContent;
        let charIndex = 0;
        
        setTimeout(() => {
            function typeWriter() {
                if (charIndex < textToType.length) {
                    typedTextElement.innerHTML += textToType.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeWriter, 25); 
                } else {
                    typedTextElement.classList.add('finished');
                }
            }
            typeWriter(); 
        }, 800); 
    }


    // ================================================================ //
    // 3. SMOOTH SCROLL NAVBAR                                          //
    // ================================================================ //
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ================================================================ //
    // 4. LOGIKA HAMBURGER MENU (MOBILE) DI PERBARUI                    //
    // ================================================================ //
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active'); // Memicu animasi "X"
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active'); // Menutup animasi "X"
            });
        });
    }

    // ================================================================ //
    // 5. SLIDER HORIZONTAL OTOMATIS (SANGAT SMOOTH & MANTUL)           //
    // ================================================================ //
    const slider = document.querySelector('.kompetensi-grid');

    if (slider) {
        let isDown = false;
        let isInteracting = false;
        let startX;
        let scrollLeft;
        let scrollDirection = 1; // 1 = Kanan, -1 = Kiri
        let exactScrollLeft = slider.scrollLeft;

        const smoothAutoScroll = () => {
            if (!isInteracting && !isDown) {
                const maxScroll = slider.scrollWidth - slider.clientWidth;

                if (slider.scrollLeft >= maxScroll - 2) {
                    scrollDirection = -1; 
                } else if (slider.scrollLeft <= 0) {
                    scrollDirection = 1;  
                }

                exactScrollLeft += 0.6 * scrollDirection;
                slider.scrollLeft = exactScrollLeft;

                if (Math.abs(slider.scrollLeft - exactScrollLeft) > 2) {
                    exactScrollLeft = slider.scrollLeft;
                }
            }
            requestAnimationFrame(smoothAutoScroll); 
        };

        requestAnimationFrame(smoothAutoScroll);

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            isInteracting = true;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            exactScrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            isInteracting = false;
        });

        slider.addEventListener('mouseenter', () => {
            isInteracting = true; 
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            setTimeout(() => { isInteracting = false; }, 1000); 
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; 
            slider.scrollLeft = scrollLeft - walk;
            exactScrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('touchstart', () => {
            isInteracting = true; 
        });

        slider.addEventListener('touchend', () => {
            exactScrollLeft = slider.scrollLeft;
            setTimeout(() => {
                isInteracting = false;
            }, 1500); 
        });
    }
});
