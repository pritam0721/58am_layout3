// Mobile Menu Script
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });
    }

    // Auto-focus on name field when 'Contact' is clicked
    const contactLinks = document.querySelectorAll('a[href="#contact"]');
    const nameInput = document.querySelector('.hero-form-card input[placeholder="Full Name"]');

    if (nameInput) {
        contactLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Allow default smooth scroll
                setTimeout(() => {
                    nameInput.focus();
                }, 800); // Wait for scroll to finish
            });
        });
    }


    // Cost Calculator Logic
    const agentSlider = document.getElementById('agentSlider');
    const agentCountDisplay = document.getElementById('agentCount');
    const monthlySavingsDisplay = document.getElementById('monthlySavings');

    if (agentSlider && agentCountDisplay && monthlySavingsDisplay) {
        const savingsPerAgent = 1300; // Estimated monthly savings per agent (GBP)

        function updateCalculator() {
            const count = agentSlider.value;
            const totalSavings = count * savingsPerAgent;
            
            agentCountDisplay.textContent = count;
            monthlySavingsDisplay.textContent = `£${totalSavings.toLocaleString()}`;
        }

        agentSlider.addEventListener('input', updateCalculator);
        // Initialize
        updateCalculator();
    }
});
