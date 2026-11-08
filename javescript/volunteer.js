 // volunteer.js - validation and response for the Bright Beginnings volunteer form
    

// Wait until the page has loaded, then find the form
document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("volunteer-form");
    var responseBox = document.getElementById("form-response");

    // Messages shown after a valid submission, based on the area of interest.
    // Edit these to match your real programmes.
    var interestInfo = {
        "food-distribution": {
            name: "Food Distribution",
            text: "You'll help pack and hand out meals to children. Volunteers are needed most on weekday mornings and weekends."
        },
        "tutoring": {
            name: "Educational Support",
            text: "You'll help children with homework and reading. Tutoring sessions run in the afternoons after school."
        },
        "events": {
            name: "Logistics",
            text: "You'll help set up and run our school-supply drives and community events."
        },
        "admin": {
            name: "Admin support",
            text: "You'll help with records, emails and organising donations. This can often be done flexibly."
        }
    };

    // Show an error under a field (or clear it if message is empty)
    function setError(fieldId, message) {
        document.getElementById(fieldId + "-error").textContent = message;
    }

    // Check every field. Returns true only if everything is valid.
    function validateForm() {
        var valid = true;

        // Full name: 2-60 characters, letters/spaces/hyphens/apostrophes
        var name = document.getElementById("fullname").value.trim();
        if (!/^[A-Za-z][A-Za-z '\-]{1,59}$/.test(name)) {
            setError("fullname", "Please enter your full name (letters only, at least 2 characters).");
            valid = false;
        } else {
            setError("fullname", "");
        }

        // Email: simple format check
        var email = document.getElementById("email").value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("email", "Please enter a valid email address, e.g. name@example.com.");
            valid = false;
        } else {
            setError("email", "");
        }

        // Phone: South African format, 0821234567 or +27821234567
        var phone = document.getElementById("phone").value.trim().replace(/\s/g, "");
        if (!/^(\+27|0)[0-9]{9}$/.test(phone)) {
            setError("phone", "Please enter a valid South African number, e.g. 0821234567.");
            valid = false;
        } else {
            setError("phone", "");
        }

        // Area of interest must be chosen
        if (document.getElementById("interest").value === "") {
            setError("interest", "Please choose an area of interest.");
            valid = false;
        } else {
            setError("interest", "");
        }

        // At least one availability box must be ticked
        var ticked = document.querySelectorAll('input[name="availability"]:checked');
        if (ticked.length === 0) {
            setError("availability", "Please select at least one option.");
            valid = false;
        } else {
            setError("availability", "");
        }

        return valid;
    }

    // When the form is submitted
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // stop the page from reloading
        responseBox.textContent = "";

        if (!validateForm()) {
            return; // errors are already showing
        }

        // Collect the valid data
        var name = document.getElementById("fullname").value.trim();
        var interestKey = document.getElementById("interest").value;
        var days = [];
        document.querySelectorAll('input[name="availability"]:checked').forEach(function (box) {
            days.push(box.value);
        });

        var info = interestInfo[interestKey];

        // Build the response with textContent (safer than innerHTML for user input)
        var heading = document.createElement("h3");
        heading.textContent = "Thank you, " + name + "!";

        var line1 = document.createElement("p");
        line1.textContent = "Your application for " + info.name + " has been received.";

        var line2 = document.createElement("p");
        line2.textContent = info.text;

        var line3 = document.createElement("p");
        line3.textContent = "Availability noted: " + days.join(" and ") + ". We will contact you within 5 working days.";

        responseBox.appendChild(heading);
        responseBox.appendChild(line1);
        responseBox.appendChild(line2);
        responseBox.appendChild(line3);

        form.reset();
        responseBox.scrollIntoView({ behavior: "smooth" });
    });

    // Clear the error messages and response when the form is reset
    form.addEventListener("reset", function () {
        ["fullname", "email", "phone", "interest", "availability"].forEach(function (id) {
            setError(id, "");
        });
        responseBox.textContent = "";
    });
});