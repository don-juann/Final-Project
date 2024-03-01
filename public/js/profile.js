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
        document.getElementById('edit-username').addEventListener('click', async () => {
            const newUsername = prompt('Enter new username:');
            if (newUsername) {
                username.textContent = newUsername;
                await updateUserField('username', newUsername);
            }
        });

        // Edit email
        document.getElementById('edit-email').addEventListener('click', async () => {
            const newEmail = prompt('Enter new email:');
            if (newEmail) {
                email.textContent = newEmail;
                await updateUserField('email', newEmail);
            }
        });

        // Edit country
        document.getElementById('edit-country').addEventListener('click', async () => {
            const newCountry = prompt('Enter new country:');
            if (newCountry) {
                country.textContent = newCountry;
                await updateUserField('country', newCountry);
            }
        });

        // Edit gender
        document.getElementById('edit-gender').addEventListener('click', async () => {
            const newGender = prompt('Enter new gender:');
            if (newGender) {
                gender.textContent = newGender;
                await updateUserField('gender', newGender);
            }
        });

    } catch (error) {
        console.error('Error fetching user data:', error);
    }
});

async function updateUserField(field, value) {
    try {
        const response = await fetch('/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                [field]: value
            })
        });

        if (!response.ok) {
            throw new Error('Failed to update user data');
        }

        const updatedUserData = await response.json();
        console.log('User data updated:', updatedUserData);
    } catch (error) {
        console.error('Error updating user data:', error);
    }
}

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
