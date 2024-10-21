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
          
      })
      
    };
    
    

  }
  

  let array_email = [];

function load_mailbox(mailbox) {
  console.log(`Loading ${mailbox} mailbox`);
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  
  

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
      // Parse the JSON data if it's stored in the body
      var emailData;
      array_email = [];
      try {
          emailData = JSON.parse(email.body);
          array_email.push(emailData);
          sort(emailData);
      } catch (error) {
          // If parsing fails, use the email as is
          emailData = email;
      }
      const emailElement = document.createElement('div');
      emailElement.className="divas"
      emailElement.id = emailData.id;
      
     
      
      if (mailbox =='inbox') {
            emailElement.innerHTML = `
                <p id = "myp1">from: ${emailData.sender}</p>
                <br>
                
                <p id = "myp2"> Subject: ${emailData.subject}</p>
                 <p id = "myp3">${emailData.timestamp}</p>
            `;
          }
        else if (mailbox =='sent') {
            emailElement.innerHTML = `
               <p id = "myp1"> to: ${emailData.recipients}</p>
               <br>
                
               <p id = "myp2"> Subject: ${emailData.subject}</p>
                <p id = "myp3"> ${emailData.timestamp}</p>
            `;}
        
            // Add the email element to the emails view
            
            document.querySelector('#emails-view').append(emailElement);
        });

        
    });
    
  

}
document.addEventListener('DOMContentLoaded', function() {
document.body.addEventListener('click', read_mail);
function read_mail(event) {
  
    const emailId = event.target.id;
    console.log(emailId);
    console.log(array_email)
    const emaill = array_email.find(email =>{
      if( email.id === emailId){
    email.read = True;
    email.save;}})
   emaill.color='gray';
    }}
      
  )

