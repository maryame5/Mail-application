Mail Platform

A single-page email client built using JavaScript, HTML, and CSS. The application implements essential email client features such as sending, reading, archiving, and replying to emails. All functionality is implemented within the inbox.js file.

Features

1. Send Mail

Users can compose and send emails by:

Filling out the email composition form (recipients, subject, body).

Clicking the "Send" button to send the email.

Sends a POST request to /emails with the email details.

After sending, the user is redirected to their "Sent" mailbox.

2. Mailbox

Users can navigate to their Inbox, Sent mailbox, or Archive using the navigation bar.

Displays all emails for the selected mailbox by sending a GET request to /emails/<mailbox>.

Each email is rendered in its own box with:

Sender information.

Subject line.

Timestamp of the email.

Background color to indicate read (gray) or unread (white) status.

3. View Email

Clicking on an email opens a detailed view displaying:

Sender, recipients, subject, timestamp, and body of the email.

Marks the email as read by sending a PUT request to /emails/<email_id>.

Includes a separate div in inbox.html for displaying email content while ensuring the correct views are shown/hidden.

4. Archive and Unarchive

Users can archive or unarchive received emails:

Inbox emails show an "Archive" button.

Archived emails show an "Unarchive" button.

Sends a PUT request to /emails/<email_id> to update the archive status.

After updating, the user is redirected to their Inbox.

5. Reply

Users can reply to emails by clicking the "Reply" button in the email view.

Automatically pre-fills the composition form with:

The recipient set to the sender of the original email.

The subject line prefixed with Re:  (avoiding duplicate prefixes).

The body includes a quoted line, e.g., On Jan 1 2020, 12:00 AM foo@example.com wrote: followed by the original email's text.

Technologies Used

Frontend: HTML, CSS, JavaScript

API Communication: Fetch API for sending GET and POST/PUT requests.
