// Animaciones compartidas por las maquetas de inspiración de DinBank.
(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || typeof gsap === "undefined") return;

    const select = (selector) => gsap.utils.toArray(selector);
    const addFrom = (timeline, selector, options, position) => {
        const targets = select(selector);
        if (targets.length) timeline.from(targets, options, position);
        return timeline;
    };
    const animateFrom = (selector, options) => {
        const targets = select(selector);
        if (targets.length) gsap.from(targets, options);
    };
    const animateTo = (selector, options) => {
        const targets = select(selector);
        if (targets.length) gsap.to(targets, options);
    };
    const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });

    addFrom(entrance, ".sidebar", { x: -28, opacity: 0, duration: .55 });
    addFrom(entrance, ".topbar", { y: 18, opacity: 0, duration: .42 }, "-=.22");
    addFrom(entrance, ".balance-card, .hero, .goal-hero", { y: 22, opacity: 0, duration: .52, stagger: .08 }, "-=.18");
    addFrom(entrance, ".quick-actions .action-card, .monthly-overview, .dashboard-grid > *, .transfer-layout, .saving-layout, .settings-layout > *, .settings-content > .panel, .tips-row > *, .section-bar, .toolbar, .goal-grid > *, .bottom-grid > *, .content-grid > *, .movements", { y: 18, opacity: 0, duration: .42, stagger: .08 }, "-=.26");

    // El Dino se mueve como un personaje, sin el rebote vertical continuo anterior.
    select(".dino-hero, .balance-card img, .safe-card img, .tip-card img, .suggestion img").forEach((dino, index) => {
        gsap.to(dino, {
            rotation: index % 2 ? -1.2 : 1.2,
            x: index % 2 ? -3 : 3,
            scale: 1.018,
            transformOrigin: "50% 90%",
            duration: 2.8 + index * .12,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });

    animateFrom(".chart-line", { strokeDashoffset: 900, duration: 1.25, delay: .55, ease: "power2.out" });
    animateFrom(".chart-area", { opacity: 0, duration: .6, delay: .8 });
    animateFrom(".progress span, .progress-track span", { width: 0, duration: .9, delay: .72, ease: "power2.out" });
    animateFrom(".plant-image", { scale: .55, transformOrigin: "50% 100%", duration: .7, delay: .55, ease: "back.out(1.5)" });
    animateTo(".plant-image", { rotation: .8, duration: 2.1, repeat: -1, yoyo: true, ease: "sine.inOut" });

    select(".card, .safe-card, .tip-card, .action-card, .contact, .movement, .filters button, .quick-amounts button, .period-grid button, .continue-button, .new-goal, .new-card button, .load-more, .text-button, .settings-nav, .theme").forEach((element) => {
        const moveY = gsap.quickTo(element, "y", { duration: .24, ease: "power2.out" });
        element.addEventListener("mouseenter", () => moveY(-4));
        element.addEventListener("mouseleave", () => moveY(0));
        element.addEventListener("focusin", () => moveY(-3));
        element.addEventListener("focusout", () => moveY(0));
    });

    select(".menu-item").forEach((item) => {
        item.addEventListener("mouseenter", () => gsap.to(item, { x: 4, duration: .2, ease: "power2.out" }));
        item.addEventListener("mouseleave", () => gsap.to(item, { x: 0, duration: .2, ease: "power2.out" }));
    });
})();
