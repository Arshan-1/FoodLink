document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const donateForm = document.getElementById('donateForm');

    // Example login handler
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    window.location.href = 'donor-page.html'; // or receiver-page.html based on role
                } else {
                    alert(data.msg);
                }
            } catch (err) {
                console.error('Error logging in:', err);
            }
        });
    }

    // Example signup handler
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;

            try {
                const response = await fetch('http://localhost:5000/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, password, role })
                });
                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    window.location.href = 'donor-page.html'; // or receiver-page.html based on role
                } else {
                    alert(data.msg);
                }
            } catch (err) {
                console.error('Error signing up:', err);
            }
        });
    }

    // Example donation handler for donor page
    if (donateForm) {
        donateForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const foodType = document.getElementById('foodType').value;
            const quantity = document.getElementById('quantity').value;

            try {
                const response = await fetch('http://localhost:5000/api/donations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ foodType, quantity })
                });
                const data = await response.json();
                if (response.ok) {
                    alert('Donation successful!');
                } else {
                    alert(data.msg);
                }
            } catch (err) {
                console.error('Error donating:', err);
            }
        });
    }
});
