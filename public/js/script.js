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
