// ==UserScript==
// @name         FictionLab Chat Input Focus
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Auto-focuses the chat input textarea (crucial for PC)
// @author       aerodevxp
// @match        https://fictionlab.ai/chat/*
// @match        https://fictionlab.ai/chat
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const SELECTOR = 'textarea#chat-input.chat-input';

    function focusInput() {
        const input = document.querySelector(SELECTOR);
        if (input) {
            input.focus();
            // Move cursor to end
            const len = input.value.length;
            input.setSelectionRange(len, len);
            return true;
        }
        return false;
    }

    if (focusInput()) {
        return;
    }

    const observer = new MutationObserver((mutations, obs) => {
        if (focusInput()) {
            // Stop observing once found and focused
            // Keep observing if you want to re-focus on dynamic page changes
            // obs.disconnect();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    let lastUrl = location.href;
    const urlObserver = new MutationObserver(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            if (location.href.includes('fictionlab.ai/chat')) {
                focusInput();
            }
        }
    });
    urlObserver.observe(document.body, { childList: true, subtree: true });

    let attempts = 0;
    const maxAttempts = 20;
    const interval = setInterval(() => {
        if (focusInput() || ++attempts >= maxAttempts) {
            clearInterval(interval);
        }
    }, 500);
})();
