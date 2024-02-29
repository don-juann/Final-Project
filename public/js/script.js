document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll(".carousel-slide");
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.style.display = "block";
            } else {
                slide.style.display = "none";
            }
        });
    }

    function nextSlide() {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;document.addEventListener("DOMContentLoaded", function() {
                const slides = document.querySelectorAll(".carousel-slide");
                let currentSlide = 0;
            
                function showSlide(index) {
                    slides.forEach((slide, i) => {
                        if (i === index) {
                            slide.style.display = "block";
                        } else {
                            slide.style.display = "none";
                        }
                    });
                }
            
                function nextSlide() {
                    currentSlide++;
                    if (currentSlide >= slides.length) {
                        currentSlide = 0;
                    }
                    showSlide(currentSlide);
                }
            
                // Initially show the first slide
                showSlide(currentSlide);
            
                // Change slide every 10 seconds
                setInterval(nextSlide, 10000);
            });

            
            
        }
        showSlide(currentSlide);
    }

    // Initially show the first slide
    showSlide(currentSlide);

    // Change slide every 10 seconds
    setInterval(nextSlide, 10000);    
});

document.addEventListener("DOMContentLoaded", function() {
    const quotesDiv = document.getElementById('quotes');

    fetch('https://api.api-ninjas.com/v1/quotes?category=happiness', {
        headers: {
            'X-Api-Key': '8NSItaW/ng/lQkMTBny8AQ==jMSrO4P3UNuoMatq',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.length > 0) {
            const quote = data[0].quote;
            const author = data[0].author;
            quotesDiv.innerHTML = `<blockquote>"${quote}"</blockquote><p>- ${author}</p>`;
            quotesDiv.style.display = 'block'; // Show the quotes
        } else {
            quotesDiv.innerHTML = '<p>No quotes found</p>';
            quotesDiv.style.display = 'flex';
        }
    })
    .catch(error => {
        console.error('Error fetching quotes:', error);
        quotesDiv.innerHTML = '<p>No Quotes Available At This Time</p>';
        quotesDiv.style.display = 'block'; // Show error message
    });
})

document.addEventListener('DOMContentLoaded', function () {
    const signBtn = document.getElementById('signBtn');
    const exitIcon = document.getElementById('exitIcon');

    const checkLoginStatus = () => {
        fetch('/check_login_status')
            .then(response => response.json())
            .then(data => {
                if (data.isLoggedIn) {
                    // User is logged in
                    signBtn.style.display = 'none';
                    exitIcon.style.display = 'block';
                } else {
                    // User is not logged in
                    signBtn.style.display = 'block';
                    exitIcon.style.display = 'none';
                }
            })
            .catch(error => console.error('Error:', error));
    };

    // Call the function to check login status when the page loads
    checkLoginStatus();

    exitIcon.addEventListener('click', () => {
        fetch('/logout')
            .then(response => {
                if (response.redirected) {
                    window.location.href = response.url; // Redirect to home page after logout
                } else {
                    console.error('Logout failed');
                }
            })
            .catch(error => console.error('Error:', error));
    });
});


