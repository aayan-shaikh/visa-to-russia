// src/scripts/gsap-splittext.js
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

function animateAllTextElements() {
    document.fonts.ready.then(() => {
        const selectors = [
            "h1", "h2", "h3", "h4", "h5", "h6", "p", ".question",
        ];
        const elements = document.querySelectorAll(selectors.join(","));

        elements.forEach((el) => {
            gsap.set(el, { opacity: 1 });

            // Split the text into lines
            const split = SplitText.create(el, {
                type: "lines",
                linesClass: "line",
                autoSplit: true,
                mask: "lines",
            });

            // Animate lines when element comes into view
            gsap.from(split.lines, {
                scrollTrigger: {
                    trigger: el,

                    toggleActions: "play none none none",
                    once: true, // animate only once
                },
                duration: 1.2, // slower animation
                yPercent: 100,
                opacity: 0,
                stagger: 0.15, // slower stagger
                ease: "back",
                clearProps: "all", // clean up after animation
            });
        });
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", animateAllTextElements);
} else {
    animateAllTextElements();
}
