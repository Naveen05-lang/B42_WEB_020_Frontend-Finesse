let fbURL = "https://b42-web-020-frontend-finesse-default-rtdb.firebaseio.com/users.json";

let msg = document.getElementById('msg-div');

function showMessage(message, color = "red") {
    msg.innerHTML = `<p style="color:${color};">${message}</p>`;
}

function logIn() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (!email || !password) {
        showMessage("⚠️ Please enter email and password.");
        return;
    }

    authenticateUser(email, password);
}


async function authenticateUser(email, password) {
    try {
        const res = await fetch(fbURL);
        const data = await res.json();

        const user = Object.values(data).find(user =>
            user.email === email && user.password === password
        );

        if (user) {
            window.location.href="homePage.html"
        } else {
            alert("❌ Invalid email or password.");
        }
    } catch (error) {
        console.error("⚠️ Error:", error);
        showMessage("⚠️ An error occurred while logging in.");
    }
}




