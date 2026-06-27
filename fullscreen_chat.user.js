// ==UserScript==
// @name         Full Screen Chat
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Reduces padding of chat-container-content
// @author       aerodevxp
// @match        https://fictionlab.ai/chat/*
// @match        https://fictionlab.ai/chat
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const css = `
        .chat-container-content {
            padding: 5vh 5vw !important;
        }
    `;

    if (typeof GM_addStyle !== 'undefined') {
        GM_addStyle(css);
    } else {
        const style = document.createElement('style');
        style.textContent = css;
        (document.head || document.documentElement).appendChild(style);
    }

    const observer = new MutationObserver(() => {
        if (!document.querySelector('style[data-compact-chat]')) {
            const style = document.createElement('style');
            style.setAttribute('data-compact-chat', 'true');
            style.textContent = css;
            (document.head || document.documentElement).appendChild(style);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
