// Initialize EmailJS (Public Key placeholder)
(function(){
    emailjs.init("YOUR_PUBLIC_KEY");
})();

function handleFormSubmit(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');
    
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending Request...";
    
    const templateParams = {
        client_name: document.getElementById('clientName').value,
        client_phone: document.getElementById('clientPhone').value,
        project_type: document.getElementById('projectType').value,
        project_details: document.getElementById('projectDetails').value
    };

    // Replace with actual EmailJS Service ID and Template ID
    emailjs.send('service_default', 'template_contractor', templateParams)
        .then(function(response) {
            formStatus.className = "form-status success";
            formStatus.textContent = "Thank you! Your request has been received. We will call you shortly.";
            document.getElementById('estimateForm').reset();
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit Estimate Request";
        }, function(error) {
            formStatus.className = "form-status error";
            formStatus.textContent = "Oops! Something went wrong. Please call us directly.";
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit Estimate Request";
        });
}

function sendToWhatsApp(event) {
    event.preventDefault();
    
    // Grab input values
    const name = document.getElementById('clientName').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    const scope = document.getElementById('projectType').value;
    const details = document.getElementById('projectDetails').value.trim();
    
    // Format the message for the contractor
    const message = `*New Project Estimate Request*%0A%0A` +
                    `*Name:* ${encodeURIComponent(name)}%0A` +
                    `*Phone:* ${encodeURIComponent(phone)}%0A` +
                    `*Scope:* ${encodeURIComponent(scope)}%0A` +
                    `*Details:* ${encodeURIComponent(details)}`;
    
    // Target contractor WhatsApp number (placeholder: 15125550199)
    const contractorWhatsAppNumber = "15125550199";
    
    // Construct the wa.me URL
    const whatsappURL = `https://wa.me/${contractorWhatsAppNumber}?text=${message}`;
    
    // Show success feedback toast
    const formStatus = document.getElementById('formStatus');
    formStatus.className = "form-status success";
    formStatus.textContent = "Redirecting to WhatsApp with your project details...";
    
    // Open WhatsApp after a brief moment
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
        document.getElementById('estimateForm').reset();
        formStatus.textContent = "";
    }, 1000);
}

// Portfolio Category Filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    if (filterBtns.length > 0 && portfolioCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                portfolioCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'block';
                        // Tiny timeout for smooth display toggle if desired
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.98)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 200);
                    }
                });
            });
        });
    }
});