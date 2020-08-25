// Easier DOM selection
const img = document.getElementById('img');
const submitBtn = document.getElementById('submit');

// Create emails object if it doesn't exist in localStorage
if (localStorage.emails === undefined) {
    var emails = {};
    localStorage.emails = JSON.stringify(emails);
    console.log(localStorage.emails);
} else {
    var emails = JSON.parse(localStorage.getItem("emails"));
    console.log(emails);
}

// Get random photo and attach to img tag
function fetchPhoto() { 
    fetch('https://source.unsplash.com/random')
    .then(response => img.src=`${response.url}`)
}

// call random image function on load button click
document.getElementById('load').addEventListener("click", function () { fetchPhoto()} )
// Call random image function on pageload
window.addEventListener("load", function () {
    fetchPhoto();
    createList();
    })

// Function validates email
function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
}
    
// Function on submit
function submit(email) { 

    if (validateEmail(email) === true) {
    // Check to see an image is not already linked to that email
    if(emails[`${email}`] == null) {
            emails[`${email}`] = `${img.src}`;

        // Reload page 
        // setTimeout(pageReload(), 2000, true)
    } else { // For when an image is already linked
        // Array check 
        if (Array.isArray(emails[`${email}`]) === false) {
        alert('This email already has an image linked to it');
        // temporarily store first URL in variable
        var tempUrl = emails[`${email}`];
        // Change email address variable to an array still holding the original URL 
        emails[`${email}`] = [`${tempUrl}`];
        // Add previous image url to new array
        emails[`${email}`].push(`${img.src}`);
    }   else {
        alert("This email already has multiple images linked to it");
        // If there is more than one image already attached to email, then add to array
        emails[`${email}`].push(`${img.src}`);
    }
}
    //  Set localstorage
    localStorage.emails = JSON.stringify(emails);
    console.log(localStorage.emails);
    createList();
    fetchPhoto();


} else {
    alert('Not a valid email address, the format should be anystring@anystring.anystring')
    }
}

// Click on submit triggers function 
submitBtn.addEventListener("click", function () {
    var emailValue = document.querySelector('#email').value;
    submit(emailValue);
})

// // Check local storage can be used
// function supportsLocalStorage() {
//     try { return 'localStorage' in window && window['localStorage'] !== null; 
//     } catch(e) { return false;
//     }
// }
// window.onload = function() {
//     if (supportsLocalStorage()) {
//     }
// }

// page reload
function pageReload()  {
    window.location.reload();
}

function createList() {
    for (const prop in emails) {
        if (document.getElementById(`${prop}`) !== null) {
            document.getElementById(`${prop}`).remove();
            console.log('code is working');
        }
        const node = document.createElement("LI");
        node.id = `${prop}`
        const textNode = document.createTextNode(`${prop}`);
        node.appendChild(textNode);
        document.getElementById("picture-list").appendChild(node);
        if(Array.isArray(emails[prop]) === true) {
            let imgs = '';
            for (i = 0; i < emails[prop].length; i++) {
                imgs += `
                    <img src="${emails[prop][i]}" alt="random image linked to ${prop}">
                `
            }
            document.getElementById(`${prop}`).innerHTML += imgs;
        } else {
           let imgs = `<img src="${emails[prop]}" alt="random image linked to ${prop}">`;
            document.getElementById(`${prop}`).innerHTML += imgs;
        } 
    }
}