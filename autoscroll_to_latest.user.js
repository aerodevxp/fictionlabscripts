// ==UserScript==
// @name         FictionLab Auto Scroll to Bot Messages
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Scrolls to bottom when bot message finishes generating
// @author       aeroraphxp
// @match        https://fictionlab.ai/chat/*
// @match        https://fictionlab.ai/chat
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const scrolledMessages = new WeakSet();

    function scrollToBottom() {
        const targets = [
            document.querySelector('.chat-container-content'),
            document.querySelector('.chat-container'),
            document.documentElement,
            document.body
        ];

        for (const target of targets) {
            if (target && target.scrollHeight > target.clientHeight) {
                target.scrollTop = target.scrollHeight;
            }
        }

        window.scrollTo(0, document.body.scrollHeight);
    }

    function scrollToBotMessage(botMess) {
        console.log('Scrolling to bot-mess');

        // Scroll the bot messageinto view first
        botMess.scrollIntoView({ block: 'start', behavior: 'smooth' });

        setTimeout(() => {
            scrollToBottom();
        }, 100);

        scrolledMessages.add(botMess);
    }

    function waitForTextBot(botMess) {
        const textBot = botMess.querySelector('.text-bot');
        if (textBot && textBot.textContent.trim().length > 0) {
            console.log('Found .text-bot in bot-mess');
            scrollToBotMessage(botMess);
            return;
        }

        console.log('Waiting for .text-bot in bot-mess...');

        const observer = new MutationObserver(() => {
            const textBot = botMess.querySelector('.text-bot');
            if (textBot && textBot.textContent.trim().length > 0 && !scrolledMessages.has(botMess)) {
                console.log('Found .text-bot after waiting');
                scrollToBotMessage(botMess);
                observer.disconnect();
            }
        });

        observer.observe(botMess, { childList: true, subtree: true });

        setTimeout(() => observer.disconnect(), 60000);
    }

    setTimeout(() => {
        console.log('Starting observer...');

        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === 1) {
                        if (node.classList?.contains('bot-mess')) {
                            console.log('Detected new bot-mess');
                            waitForTextBot(node);
                        } else if (node.querySelector?.('.bot-mess')) {
                            const botMessElements = node.querySelectorAll('.bot-mess');
                            botMessElements.forEach(botMess => {
                                if (!scrolledMessages.has(botMess)) {
                                    console.log('Found bot-mess in subtree');
                                    waitForTextBot(botMess);
                                }
                            });
                        }
                    }
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
        console.log('Observer ready. Waiting for bot messages...');
    }, 2000);
})();
