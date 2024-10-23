document.addEventListener('DOMContentLoaded', function() {

   //Use buttons to toggle between views
 //document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  //document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
 //document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
 document.querySelector('#emails-view').addEventListener('click', read_mail);
  document.querySelector('#emails-view').addEventListener('click', display);
 // document.querySelector('#arch').addEventListener('click', archive);

  

  // By default, load the inbox
  load_mailbox('inbox');
});
document.querySelector('button', button => {
  button.onclick = function() {
    const email = this.dataset.section;
    console.log('this dataset email',this.dataset.section);
    history.pushState({emails: email}, "", `/emails/${email}`);
      load_mailbox(email)
  };
});
;

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
      emailElement.setAttribute('data-section', emailElement.id);
      if (mailbox =='inbox') {
            emailElement.innerHTML = `
                <p>from: ${emailData.sender}</p>                
                <p > Subject: ${emailData.subject}</p>
                <p >${emailData.timestamp}</p>
                <div><button id ="archive"> archive  </button>   </div>      `;
          }
        else if (mailbox =='sent') {
            emailElement.innerHTML = `
               <p > to: ${emailData.recipients}</p>
               <p > Subject: ${emailData.subject}</p>
              <p "> ${emailData.timestamp}</p>
            `;}
          
        
            // Add the email element to the emails view
            
            document.querySelector('#emails-view').append(emailElement);
        });       
    })}

 //change the background when an email have been readed



function read_mail(event) {

    let email_id = parseInt(event.target.id);
    const emailelement  = event.target.closest('.divas');
    
    fetch(`/emails/${email_id}`, {
      method: 'PUT',
      body: JSON.stringify({
          read: true
      })
    })
    .then(
    emailelement.classList.add('reading')) }





 function display(event){ 
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#display-email').style.display = 'block';
  document.querySelector('#emails-view').style.display = 'none';
  const Id = event.target.id;
   
  let emailId = parseInt(Id);
  console.log(emailId);
  
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
    `;});

 }

 

  function archive(event){
    let email_id = parseInt(event.target.id);
    
      fetch(`/emails/${email_id}`, {
      method: 'PUT',
      body: JSON.stringify({
        archived: true
      })
    })

    
  }
  window.onpopstate = function(event) {
    console.log(event.state.section);
    load_mailbox(event.state.section);
}

  
      
     




