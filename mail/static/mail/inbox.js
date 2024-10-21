document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  
  

  // By default, load the inbox
  load_mailbox('inbox')
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#display-email').style.display = 'none';


  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
  document.querySelector('form').onsubmit = function() {
      const body = document.querySelector("#compose-body").value;
      const subject = document.querySelector("#compose-subject").value;
      const recipient = document.querySelector("#compose-recipients").value;

      fetch('/emails', {
        method: 'POST',
        body: JSON.stringify({
            recipients: recipient,
            subject: subject,
            body: body
        })
      })
      .then(response => response.json())
      .then(email => {
          console.log("email sent",email);  
      })};}


//global variable
let array_email=[] ;
//function
function load_mailbox(mailbox) {
  console.log(`Loading ${mailbox} mailbox`);

  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#display-email').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  
  fetch(`/emails/${mailbox}`)
 .then(response => {
  console.log("Response status:", response.status);
  return response.json()})
 .then(emails => {
    console.log(`${mailbox} emails:`,emails);
    if (emails.length === 0) {
      document.querySelector('#emails-view').innerHTML += '<p>No emails to display.</p>';
    }
    emails.forEach(email => {
      array_email.push(email);
      var emailData;
      try {
          emailData = json.parse(emailData);  
          sort(array_email);
      } catch (error) {
          // If parsing fails, use the email as is
          emailData = email;
      }
      const emailElement = document.createElement('div');
      emailElement.className="divas"
      emailElement.id = emailData.id;
      if (mailbox =='inbox') {
            emailElement.innerHTML = `
                <p>from: ${emailData.sender}</p>
                <br>
                
                <p > Subject: ${emailData.subject}</p>
                 <p >${emailData.timestamp}</p>
            `;
          }
        else if (mailbox =='sent') {
            emailElement.innerHTML = `
               <p > to: ${emailData.recipients}</p>
               <br>
                
               <p > Subject: ${emailData.subject}</p>
                <p "> ${emailData.timestamp}</p>
            `;}
        
            // Add the email element to the emails view
            
            document.querySelector('#emails-view').append(emailElement);
        });       
    })}

 //change the background when an email have been readed



function read_mail(event) {
    const emailId = event.target.id;
    
    console.log('_________',array_email,'________')
    const email = array_email.find(email => email.id == parseInt(emailId)); 
    console.log('Found email:'t);
    if (email){
      email.read=true;
     }}




function display(emailId){
 
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#display-email').style.display = 'block';
  
 
  let emailId = parseInt(Id);
  console.log(emailId);
  if (typeof(emailId)==Number) {
    console.log(emailId)
  fetch(`/emails/${emailId}`)
 .then(response => response.json())
 .then(email => {
    // Print email
    console.log(email);
    document.querySelector('#display-email').innerHTML = `
    <p > date :  ${email.timestamp}</p>
    <p>from:  ${email.sender}</p>
    <p > to:  ${email.recipients}</p>
    <p > Subject:  ${email.subject}</p>
    <p > Body:  ${email.body}</p>
    <p > date :  ${email.timestamp}</p>
    `;
    

   
});
}
else{
  console.log(typeof(emailId));
  console.error('Invalid email ID:', emailId);
}}


document.body.addEventListener('click', function(event) {
  const emailElement = event.target.closest('.divas'); // Assuming '.divas' is the class for email elements
  if (emailElement) {
      const emailId = parseInt(emailElement.id); // Get the email ID from the element's ID
      markAsRead(emailId); // Call the function to mark as read
      displayEmailDetails(emailId);
      emailElement.classList.add('reading'); // Call the function to display email details
  }
});