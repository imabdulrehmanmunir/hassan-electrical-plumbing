document.addEventListener("DOMContentLoaded", () => {
    // 1. Set current year in footer
    document.getElementById("year").textContent = new Date().getFullYear();

    // 2. Initialize AOS Animation
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 50,
        disable: 'mobile' // Disables animations on mobile for better Lighthouse performance
    });

    // 3. Sticky Header & Back to Top Logic
    const navbar = document.getElementById("navbar");
    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        if (window.scrollY > 500) {
            backToTop.classList.remove("opacity-0", "invisible");
            backToTop.classList.add("opacity-100", "visible");
        } else {
            backToTop.classList.remove("opacity-100", "visible");
            backToTop.classList.add("opacity-0", "invisible");
        }
    });

    // 4. Language Switcher Logic
    const langBtn = document.getElementById("lang-switch");
    const htmlTag = document.documentElement;

    // Check Local Storage for saved preference
    const savedLang = localStorage.getItem("preferredLanguage") || "en";
    if (savedLang === "ar") {
        htmlTag.setAttribute("dir", "rtl");
        htmlTag.setAttribute("lang", "ar");
    }

    langBtn.addEventListener("click", () => {
        const currentDir = htmlTag.getAttribute("dir");
        if (currentDir === "ltr") {
            htmlTag.setAttribute("dir", "rtl");
            htmlTag.setAttribute("lang", "ar");
            localStorage.setItem("preferredLanguage", "ar");
        } else {
            htmlTag.setAttribute("dir", "ltr");
            htmlTag.setAttribute("lang", "en");
            localStorage.setItem("preferredLanguage", "en");
        }
        
        // Refresh AOS on layout direction change
        setTimeout(() => AOS.refresh(), 100);
    });

    // 5. Statistics Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetCount = entry.target;
                const target = +targetCount.getAttribute('data-target');
                
                const updateCount = () => {
                    const count = +targetCount.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        targetCount.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 15);
                    } else {
                        targetCount.innerText = target;
                    }
                };

                updateCount();
                observer.unobserve(targetCount); // Run once
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});
