console.log(document.querySelector('.github span img'));
const username = document.querySelector('#fullName');
const email = document.querySelector('#email');
const submitTicket = document.querySelector('#generate-ticket')
const git_username = document.querySelector('#git-username');
const uploadedAvatar = document.getElementById('uploadedAvatar');

const dropbox = document.getElementById('avatar-dropbox');
const fileInput = document.getElementById('avatar');
const changeBtn = document.querySelector('.btn-2');
const removeBtn = document.querySelector('.btn-1');

const emailErr = document.querySelector('.email-input');
const fullNameErr = document.querySelector('.f-name');
const userNameErr = document.querySelector('.u-name');


let readerResult = "";
let file;



//set all error message to hidden

document.querySelectorAll('.error').forEach((element) => {
   element.setAttribute('hidden', '');

})
// handles file upload for drag and drop
dropbox.addEventListener('dragover', (event) => {
event.preventDefault()
dropbox.classList.add('boxFocused');
});


dropbox.addEventListener('dragleave' , () => {
   dropbox.classList.remove('boxFocused');
});


dropbox.addEventListener('drop', (event) => {
   event.preventDefault();
   dropbox.classList.remove('boxFocused');
   file = event.dataTransfer.files[0];

   handleFile(file);

})



// handle file upload by the input click 

fileInput.addEventListener('change', () => {
   file = fileInput.files[0];
   handleFile(file);
})

//handles submit functionality
submitTicket.addEventListener('click', (event)=>{
    event.preventDefault();
 
   console.log(username.value);
   console.log(email.value);
   console.log(git_username.value);
   //display error messages when fields are empty.
   if(!username.value){
      fullNameErr.removeAttribute('hidden');
      return
   }

   if(!email.value || !(email.value.includes('@')) && !(email.value.includes('.'))){
      emailErr.removeAttribute('hidden');
      return
   }


     if(!git_username.value){
        userNameErr.removeAttribute('hidden');
           return
     }

     if(!file){
      alert("You must upload your avatar.");
      return;
     }



     //set the form section to hidden and show the generated ticket.
     document.getElementById('form-section').setAttribute('hidden', '');
     document.getElementById('ticket-section').removeAttribute('hidden');

     document.querySelector('.full_name').textContent = username.value;
     document.querySelector('.email').textContent = email.value;

     document.querySelector('.personal_details .name').textContent = username.value;
     document.querySelector('.personal_details .github').textContent = git_username.value;
     
     console.log(file);
     const reader2 = new FileReader();
  reader2.onload = function () {
   console.log("FileReader result:", reader2.result); // Check if the result is valid
 document.querySelector('.qweety').src = reader2.result;
 };


 reader2.readAsDataURL(file)
}
)


changeBtn.addEventListener('click', (event) => {
   event.preventDefault();
   document.querySelector('#avatar').click();

   const file = fileInput.files[0];
   handleFile(file);
})


//remove error message when user types in 

email.addEventListener('input', () =>{
emailErr.setAttribute('hidden', '');
});

username.addEventListener('input', () =>{
   fullNameErr.setAttribute('hidden', '');
   });

   git_username.addEventListener('input', () =>{
      userNameErr.setAttribute('hidden', '');
      });




// functions


function handleFile(file){

   //checks for file size and shows error if file is greater than 500KB
   const caution = document.querySelector('.caution-txt');
   if(file.size > 500 * 1024){
     document.querySelector('.caution-message').textContent = " File too large. Please upload a photo under 500KB.";
     caution.classList.add('error');
     return
   }
   
   caution.classList.remove('error');
   document.querySelector('.caution-message').textContent = " Upload your photo (JPG or PNG, max size: 500KB).";
   // read the file

   const reader = new FileReader();

   reader.onload = function (){
      uploadedAvatar.src = reader.result;
      
   }

   reader.readAsDataURL(file);

   document.querySelector('.buttons').removeAttribute('hidden');
   document.querySelector('.drag-txt').setAttribute('hidden', '')


}



