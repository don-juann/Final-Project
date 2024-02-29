document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('/profile', {
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();

        // Update the DOM with user data
        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const country = document.getElementById('country');
        const gender = document.getElementById('gender');

        username.textContent = userData.username;
        email.textContent = userData.email;
        country.textContent = userData.country;
        gender.textContent = userData.gender;

        // Change background image
        const description = `${userData.country} ${userData.gender}`; // Creating a description based on user data
        changeBackgroundImage(description);

        // Edit username
        document.getElementById('edit-username').addEventListener('click', () => {
            const newUsername = prompt('Enter new username:');
            if (newUsername) {
                username.textContent = newUsername;
                // Here you can send an AJAX request to update the username on the server
            }
        });

        // Edit email
        document.getElementById('edit-email').addEventListener('click', () => {
            const newEmail = prompt('Enter new email:');
            if (newEmail) {
                email.textContent = newEmail;
                // Here you can send an AJAX request to update the email on the server
            }
        });

        // Edit country
        document.getElementById('edit-country').addEventListener('click', () => {
            const newCountry = prompt('Enter new country:');
            if (newCountry) {
                country.textContent = newCountry;
                // Here you can send an AJAX request to update the country on the server
            }
        });

        // Edit gender
        document.getElementById('edit-gender').addEventListener('click', () => {
            const newGender = prompt('Enter new gender:');
            if (newGender) {
                gender.textContent = newGender;
                // Here you can send an AJAX request to update the gender on the server
            }
        });

    } catch (error) {
        console.error('Error fetching user data:', error);
    }
});

function changeBackgroundImage(description) {
    fetch(`/background?description=${encodeURIComponent(description)}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch background image');
            }
            return response.json();
        })
        .then((data) => {
            // Check if data.urls exists and has regular property
            if (data.urls && data.urls.regular) {
                const backgroundImageUrl = data.urls.regular;
                document.body.style.backgroundImage = `url(${backgroundImageUrl})`;
            } else {
                console.error('Invalid response format from Unsplash API:', data);
            }
        })
        .catch((error) => {
            console.error("Error fetching background image:", error);
        });
}
