// Waits until the page structure is ready before connecting interactive behavior.
document.addEventListener("DOMContentLoaded", () => {
  // Finds the mobile navigation button.
  const menuButton = document.querySelector(".menu-toggle");
  // Finds the main navigation container.
  const navigation = document.querySelector(".navigation");
  // Finds every navigation link.
  const navigationLinks = document.querySelectorAll(".navigation a");
  // Finds the contact form.
  const contactForm = document.querySelector("#contact-form");
  // Finds the form feedback message.
  const formFeedback = document.querySelector("#form-feedback");
  // Finds the copyright year element.
  const currentYear = document.querySelector("#current-year");

  // Displays the current year automatically.
  currentYear.textContent = new Date().getFullYear();

  // Opens or closes the mobile navigation when the menu button is selected.
  menuButton.addEventListener("click", () => {
    // Toggles the navigation visibility class.
    const navigationIsOpen = navigation.classList.toggle("is-open");
    // Updates the accessibility state of the menu button.
    menuButton.setAttribute("aria-expanded", String(navigationIsOpen));
    // Updates the accessible label to match the menu state.
    menuButton.setAttribute("aria-label", navigationIsOpen ? "Close navigation menu" : "Open navigation menu");
  });

  // Closes the mobile navigation after a visitor selects a section.
  navigationLinks.forEach((link) => {
    // Listens for a click on each navigation link.
    link.addEventListener("click", () => {
      // Hides the mobile navigation.
      navigation.classList.remove("is-open");
      // Resets the menu button accessibility state.
      menuButton.setAttribute("aria-expanded", "false");
      // Restores the menu button label.
      menuButton.setAttribute("aria-label", "Open navigation menu");
    });
  });

  // Handles contact form submissions.
  contactForm.addEventListener("submit", (event) => {
    // Prevents the browser from submitting the form to a server.
    event.preventDefault();
    // Reads the visitor's name from the form.
    const visitorName = document.querySelector("#visitor-name").value.trim();
    // Reads the visitor's email address from the form.
    const visitorEmail = document.querySelector("#visitor-email").value.trim();
    // Reads the visitor's message from the form.
    const visitorMessage = document.querySelector("#visitor-message").value.trim();
    // Sets the portfolio owner's email address after the owner updates the placeholder.
    const portfolioEmailAddress = "your.email@example.com";
    // Creates a clear email subject line.
    const emailSubject = encodeURIComponent(`Portfolio enquiry from ${visitorName}`);
    // Creates the email body with the visitor's contact details and message.
    const emailBody = encodeURIComponent(`Name: ${visitorName}\nEmail: ${visitorEmail}\n\nMessage:\n${visitorMessage}`);
    // Builds the email application link.
    const emailLink = `mailto:${portfolioEmailAddress}?subject=${emailSubject}&body=${emailBody}`;

    // Warns the portfolio owner if the placeholder email address has not been replaced.
    if (portfolioEmailAddress === "your.email@example.com") {
      // Displays an instruction instead of opening an email to a placeholder address.
      formFeedback.textContent = "Please update the portfolio email address in script.js before using this form.";
      // Stops the submission handler.
      return;
    }

    // Explains that the visitor's email application will open.
    formFeedback.textContent = "Your email application is opening with your message.";
    // Opens the visitor's default email application.
    window.location.href = emailLink;
  });
});
