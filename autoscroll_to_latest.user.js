// ==UserScript==
// @name         FictionLab Auto Scroll to Bottom
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Scrolls to bottom when new chat messages appear
// @author       aeroraphxp
// @match        https://fictionlab.ai/chat/*
// @match        https://fictionlab.ai/chat
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    let initialized = false;

    function scrollToBottom() {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }

    setTimeout(() => {
        initialized = true;

        const observer = new MutationObserver((mutations) => {
            if (!initialized) return;

            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === 1) {
                        if (node.classList?.contains('box-chat') || node.querySelector?.('.box-chat')) {
                            scrollToBottom();
                            break;
                        }
                    }
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }, 1500);
})();
