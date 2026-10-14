// ─────────────────────────────────────
// app.js – Frontend JavaScript
// Handles form submit & talks to backend
// ─────────────────────────────────────

// Step 1: Get the form element from HTML using its id
var form = document.getElementById("regForm");

// Step 2: Listen for the "submit" event on the form
// async = this function can use "await" (wait for things to finish)
form.addEventListener("submit", async function (e) {

  // Stop page from reloading (default browser behavior)
  e.preventDefault();

  // ── Get values from form fields ──
  var name  = document.getElementById("name").value.trim();
  var event = document.getElementById("event").value;

  // ── Validation: check if fields are empty ──
  if (!name || !event) {
    alert("⚠️ Please fill in all fields before submitting.");
    return; // Stop here – don't go further
  }

  // ── Update button: show loading state ──
  var btn     = document.getElementById("submitBtn");
  var btnText = document.getElementById("btnText");
  btn.disabled    = true;           // Disable button so user can't click again
  btnText.textContent = "Submitting...";  // Change button text

  // ── Hide any previous messages ──
  document.getElementById("successMsg").style.display = "none";
  document.getElementById("errorMsg").style.display   = "none";

  // ── Try to send data to backend ──
  try {

    // fetch() = built-in browser tool to send/receive data over internet
    var response = await fetch("http://localhost:3000/register", {
      method:  "POST",    // POST = we are SENDING data

      headers: {
        "Content-Type": "application/json"  // Tell server: data is in JSON format
      },

      // JSON.stringify() converts JS object → JSON text string for sending
      body: JSON.stringify({
        name:  name,
        event: event
      })
    });

    // Wait for server's response and convert it from JSON text → JS object
    var result = await response.json();

    if (result.success) {
      // ✅ Backend saved it – show green success message
      document.getElementById("successMsg").style.display = "block";
      form.reset(); // Clear the form fields
    } else {
      // ❌ Backend had an error – show red error message
      document.getElementById("errorMsg").style.display = "block";
    }

  } catch (err) {
    // This runs if server is unreachable (not running etc.)
    document.getElementById("errorMsg").textContent =
      "❌ Cannot connect to server. Make sure server.js is running.";
    document.getElementById("errorMsg").style.display = "block";
  }

  // ── Restore button back to normal ──
  btn.disabled        = false;
  btnText.textContent = "Register Now →";
});
