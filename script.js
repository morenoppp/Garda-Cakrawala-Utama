document.addEventListener("DOMContentLoaded", () => {
    // 1. Animasi Muncul saat Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

    // 2. Efek Mengetik
    const source = document.getElementById('source-text');
    const typed = document.getElementById('typed-text');
    if (source && typed) {
        const text = source.textContent;
        let i = 0;
        function type() {
            if (i < text.length) {
                typed.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 30);
            }
        }
        setTimeout(type, 800);
    }

    // 3. LOGIKA BACK TO TOP[cite: 2, 6]
    const btt = document.getElementById("backToTop");
    window.addEventListener("scroll", () => {
        // Muncul jika scroll lebih dari 400px
        if (window.pageYOffset > 400) {
            btt.style.display = "flex";
        } else {
            btt.style.display = "none";
        }
    });

    btt.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
