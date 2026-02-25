"use client";

import { useEffect } from "react";
import "@n8n/chat/style.css";
import { createChat } from "@n8n/chat";

export default function AIChatBox() {
    useEffect(() => {
        const webhookUrl = process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL;

        if (webhookUrl) {
            createChat({
                webhookUrl,
                showWelcomeScreen: true,
                initialMessages: [
                    'Hello! I\'m your Apex Care AI assistant. 👋',
                    'How can I help you with your healthcare needs today?'
                ],
                i18n: {
                    en: {
                        title: 'Apex Care AI',
                        subtitle: 'Expert Health & Platform Support',
                        footer: 'Secure • Professional • Instant',
                        getStarted: 'Start Consultation',
                        inputPlaceholder: 'Search medicines, check blood...',
                        closeButtonTooltip: 'Close Chat',
                    },
                },
            });
        }
    }, []);

    return (
        <div id="n8n-chat-container">
            <style jsx global>{`
                :root {
                    /* Customizing n8n Chat to match Apex Care Premium Theme */
                    --chat--color--primary: #2563eb; /* Blue-600 */
                    --chat--color--primary-shade-50: #1d4ed8;
                    --chat--color--primary--shade-100: #1e40af;
                    --chat--color--secondary: #4f46e5; /* Indigo-600 */
                    
                    --chat--spacing: 1rem;
                    --chat--border-radius: 1.25rem;
                    
                    /* Header Customization */
                    --chat--header--background: linear-gradient(135deg, #4f46e5 0%, #2563eb 100%);
                    --chat--header--color: #ffffff;
                    --chat--heading--font-size: 1.25rem;
                    
                    /* Message Customization */
                    --chat--message--bot--background: #ffffff;
                    --chat--message--user--background: #2563eb;
                    --chat--message--border-radius: 1rem;
                    
                    /* Window Customization */
                    --chat--window--width: 380px;
                    --chat--window--height: 550px;
                    --chat--window--border-radius: 1.5rem;
                    --chat--window--box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    
                    /* Toggle Button */
                    --chat--toggle--size: 60px;
                    --chat--toggle--background: #2563eb;
                    --chat--toggle--hover--background: #1d4ed8;
                }

                #n8n-chat {
                    font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
                }

                /* Adding the "Online" Pulse Dot manually via CSS if possible or just rely on n8n UI */
            `}</style>
        </div>
    );
}
