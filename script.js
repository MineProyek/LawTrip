// Script for hamburger menu toggle on mobile
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Smooth scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Close nav menu on mobile after click
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // Download button functionality
    const downloadBtn = document.querySelector('.download-button');
    downloadBtn.addEventListener('click', () => {
        // For demo, download a placeholder PDF file
        const link = document.createElement('a');
        link.href = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
        link.download = 'Materi_Edukasi_LAWTRIP.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Contact form submission handler
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Terima kasih atas pesan Anda! Kami akan segera menghubungi Anda.');
        contactForm.reset();
    });

    // QR Code interaction - Enlarge on click
    const qrCodeImg = document.getElementById('qr-code-img');
    if (qrCodeImg) {
        qrCodeImg.addEventListener('click', () => {
            // Create overlay for modal effect
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            overlay.style.backdropFilter = 'blur(5px)';
            overlay.style.display = 'flex';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            overlay.style.zIndex = '2000';
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.3s ease';

            // Clone the QR code image for the overlay
            const enlargedImg = qrCodeImg.cloneNode();
            enlargedImg.style.maxWidth = '90vw';
            enlargedImg.style.maxHeight = '90vh';
            enlargedImg.style.borderRadius = '15px';
            enlargedImg.style.boxShadow = '0 0 30px rgba(255, 69, 0, 0.7)';
            enlargedImg.style.cursor = 'pointer';
            enlargedImg.style.transform = 'scale(0.8)';
            enlargedImg.style.transition = 'transform 0.3s ease';

            overlay.appendChild(enlargedImg);
            document.body.appendChild(overlay);

            // Trigger reflow to enable transition
            setTimeout(() => {
                overlay.style.opacity = '1';
                enlargedImg.style.transform = 'scale(1)';
            }, 10);

            // Close overlay when clicked
            overlay.addEventListener('click', () => {
                overlay.style.opacity = '0';
                enlargedImg.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    document.body.removeChild(overlay);
                }, 300);
            });

            // Close overlay with Escape key
            const closeOnEscape = (e) => {
                if (e.key === 'Escape') {
                    overlay.style.opacity = '0';
                    enlargedImg.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        document.body.removeChild(overlay);
                        document.removeEventListener('keydown', closeOnEscape);
                    }, 300);
                }
            };

            document.addEventListener('keydown', closeOnEscape);
        });
    }
});
