const fbURL = "https://w3datalog-default-rtdb.firebaseio.com/users.json";
const msg = document.getElementById('msg-div');

// Function to Show Messages
function showMessage(message, color = "red") {
    msg.innerHTML = `<p style="color:${color};">${message}</p>`;
}

// Login Function
function logIn() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (!email || !password) {
        showMessage("⚠️ Please enter email and password.");
        return;
    }

    authenticateUser(email, password);
}

// Signup Function
function signUp() {
    const fName = document.getElementById('signup-fName').value.trim();
    const lName = document.getElementById('signup-lName').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const confPass = document.getElementById('signup-confirm-password').value.trim();

    if (!fName || !lName || !email || !password || !confPass) {
        showMessage("⚠️ Please enter all fields.");
        return;
    }
    if (password.length < 6) {
        showMessage("⚠️ Password must be at least 6 characters.");
        return;
    }
    if (password !== confPass) {
        showMessage("⚠️ Password and Confirm Password should be some");
        return;

    }

    const newUser = { fName, lName, email, password };
    registerUser(newUser);
}

// Authenticate User (Login)
async function authenticateUser(email, password) {
    try {
        const res = await fetch(fbURL);
        const data = await res.json();

        const user = Object.values(data).find(user =>
            user.email === email && user.password === password
        );

        if (user) {
            showMessage(`✅ Login successful! Welcome, ${user.fName} ${user.lName}`, "green");
            console.log("✅ User authenticated:", user);
        } else {
            showMessage("❌ Invalid email or password.");
            console.warn("❌ Login failed: Incorrect credentials.");
        }
    } catch (error) {
        console.error("⚠️ Error:", error);
        showMessage("⚠️ An error occurred while logging in.");
    }
}

// Register User (Signup)
async function registerUser(user) {
    try {
        console.log('in registretion');
        const res = await fetch(fbURL.replace(".json", "") + ".json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        const userID = await res.json();
        showMessage("✅ Account created successfully!", "green");
        console.log("New user registered:", userID.name);
    } catch (error) {
        console.error("⚠️ Error:", error);
        showMessage("⚠️ An error occurred during signup.");
    }
}
