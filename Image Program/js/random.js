// ******** Actual written code ********
// // ES Modules syntax
// import Unsplash, { toJson } from '/js/node_modules/unsplash-js/dist/unsplash.min.js';
// Easier DOM selection
const img = document.getElementById('img');
const submitBtn = document.getElementById('submit');
const loadBtn = document.getElementById('load');
const linkBtn = document.getElementById('link');
const form = document.getElementById('form');
const changeEmailBtn = document.getElementById('change-email');

// Create emails object if it doesn't exist in localStorage
if (localStorage.emails === undefined) {
    var emails = {};
    localStorage.emails = JSON.stringify(emails);
    console.log(localStorage.emails);
} else {
    var emails = JSON.parse(localStorage.getItem("emails"));
    console.log(emails);
}

// *** EVENT LISTENERS ***

// call random image function on load button click
loadBtn.addEventListener("click", function () { 
    disableButtons;
    fetchPhoto();
    linkBtn.style.display = "inline-block";
} )
// Link image on click of link button 
linkBtn.addEventListener("click", function () {
    disableButtons();
    linkPhoto(emailValue);
})
// Change email button
changeEmailBtn.addEventListener("click", function () {
    changeEmailBtn.style.display= "none";
    linkBtn.style.display = "none";
    form.style.display= "block";
})
// Call random image function on pageload
window.addEventListener("load", function () {
    createList();
})
// Click on submit triggers function 
submitBtn.addEventListener("click", function () {
    emailValue = document.querySelector('#email').value;
    submit(emailValue);
})

// *** FUNCTIONS USED IN EVENT LISTENERS *** 

// Get random photo and attach to img tag
async function fetchPhoto() { 
    responseObj = await fetch(`https://source.unsplash.com/random`);
    if (responseObj.url === img.src) {
        console.log("API has randomly selected the same image again...");
        linkBtn.style.display="none";
        fetchPhoto();
    } else {
        img.src = `${responseObj.url}`;
        setTimeout(function() {
            if (responseObj.status === 200) {
                enableButtons();
            } else {
                alert('error, no image was recieved from the API');
                enableButtons();
            }
        }, 500)
    }
    linkBtn.style.display = "inline-block";
}

// Function validates email
function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
}
    
// Function on submit
function submit(email) { 

    if (validateEmail(email) === true) {
        // Disable button until request comes through
        submitBtn.disabled = "true";
        // // Fetch Photo
        // fetchPhoto();
        // Check to see an image is not already linked to that email
        if(emails[`${email}`] == null) {

        } else { // For when an image is already linked
            // Array check 
            if (Array.isArray(emails[`${email}`]) === false) {
            alert('This email already has an image linked to it');
        }  
    }
    loadBtn.style.display = "inline-block";
    form.style.display = "none";
    changeEmailBtn.style.display = "inline-block";
    if (img.src !== '') {
        linkBtn.style.display = "inline-block";
    } 
} else {
    alert('Not a valid email address, the format should be anystring@anystring.anystring')
    }
}

function linkPhoto(email) {
        // Check to see an image is not already linked to that email
        if(emails[`${email}`] == null) {
            emails[`${email}`] = `${img.src}`;
        } else { // For when an image is already linked
            // Array check 
            // If not an array (email only has one image linked to it)
            if (Array.isArray(emails[`${email}`]) === false) {
                // Check image isn't already linked 
            // temporarily store first URL in variable
            var tempUrl = emails[`${email}`];
            // Change email address variable to an array still holding the original URL 
            emails[`${email}`] = [`${tempUrl}`];
            // Add previous image url to new array
            emails[`${email}`].push(`${img.src}`);
        }  else {
            // If there is more than one image already attached to email, then add to array
            emails[`${email}`].push(`${img.src}`);
        }
        }
        createList();
        fetchPhoto();
        //  Set localstorage
        localStorage.emails = JSON.stringify(emails);
        console.log(localStorage.emails);
}

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
        // Wipe html list of photos if it already exists
        if (document.getElementById(`${prop}`) !== null) {
            document.getElementById(`${prop}`).remove();
        }
        // Write list of photos
        const node = document.createElement("LI");
        node.id = `${prop}`
        const textNode = document.createTextNode(`${prop}`);
        node.appendChild(textNode);
        document.getElementById("picture-list").appendChild(node);
        if(Array.isArray(emails[prop]) === true) {
            let imgs = '';
            for ( let i = 0; i < emails[prop].length; i++) {
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

function enableButtons() {
    submitBtn.disabled = false;
    loadBtn.disabled = false;
    linkBtn.disabled = false;
    changeEmailBtn.disabled = false;
}
function disableButtons() {
    submitBtn.disabled = true;
    loadBtn.disabled = true;
    linkBtn.disabled = true;
    changeEmailBtn.disabled = true;
}

// // ******** Code put through Babel ********
// "use strict";

// // Easier DOM selection
// var img = document.getElementById('img');
// var submitBtn = document.getElementById('submit'); // Create emails object if it doesn't exist in localStorage

// if (localStorage.emails === undefined) {
//   var emails = {};
//   localStorage.emails = JSON.stringify(emails);
//   console.log(localStorage.emails);
// } else {
//   var emails = JSON.parse(localStorage.getItem("emails"));
//   console.log(emails);
// } // Get random photo and attach to img tag


// function fetchPhoto() {
//   fetch('https://source.unsplash.com/random').then(function (response) {
//     return img.src = "".concat(response.url);
//   });
// } // call random image function on load button click


// document.getElementById('load').addEventListener("click", function () {
//   fetchPhoto();
// }); // Call random image function on pageload

// window.addEventListener("load", function () {
//   fetchPhoto();
//   createList();
// }); // Function validates email

// function validateEmail(email) {
//   var re = /\S+@\S+\.\S+/;
//   return re.test(email);
// } // Function on submit


// function submit(email) {
//   if (validateEmail(email) === true) {
//     // Check to see an image is not already linked to that email
//     if (emails["".concat(email)] == null) {
//       emails["".concat(email)] = "".concat(img.src);
//     } else {
//       // For when an image is already linked
//       // Array check 
//       if (Array.isArray(emails["".concat(email)]) === false) {
//         alert('This email already has an image linked to it'); // temporarily store first URL in variable

//         var tempUrl = emails["".concat(email)]; // Change email address variable to an array still holding the original URL 

//         emails["".concat(email)] = ["".concat(tempUrl)]; // Add previous image url to new array

//         emails["".concat(email)].push("".concat(img.src));
//       } else {
//         alert("This email already has multiple images linked to it"); // If there is more than one image already attached to email, then add to array

//         emails["".concat(email)].push("".concat(img.src));
//       }
//     } //  Set localstorage


//     localStorage.emails = JSON.stringify(emails);
//     console.log(localStorage.emails);
//     createList();
//     fetchPhoto();
//   } else {
//     alert('Not a valid email address, the format should be anystring@anystring.anystring');
//   }
// } // Click on submit triggers function 


// submitBtn.addEventListener("click", function () {
//   var emailValue = document.querySelector('#email').value;
//   submit(emailValue);
// }); // // Check local storage can be used
// // function supportsLocalStorage() {
// //     try { return 'localStorage' in window && window['localStorage'] !== null; 
// //     } catch(e) { return false;
// //     }
// // }
// // window.onload = function() {
// //     if (supportsLocalStorage()) {
// //     }
// // }
// // page reload

// function pageReload() {
//   window.location.reload();
// }

// function createList() {
//   for (var prop in emails) {
//     if (document.getElementById("".concat(prop)) !== null) {
//       document.getElementById("".concat(prop)).remove();
//       console.log('code is working');
//     }

//     var node = document.createElement("LI");
//     node.id = "".concat(prop);
//     var textNode = document.createTextNode("".concat(prop));
//     node.appendChild(textNode);
//     document.getElementById("picture-list").appendChild(node);

//     if (Array.isArray(emails[prop]) === true) {
//       var imgs = '';

//       for ( let i = 0; i < emails[prop].length; i++) {
//         imgs += "\n                    <img src=\"".concat(emails[prop][i], "\" alt=\"random image linked to ").concat(prop, "\">\n                ");
//       }

//       document.getElementById("".concat(prop)).innerHTML += imgs;
//     } else {
//       var _imgs = "<img src=\"".concat(emails[prop], "\" alt=\"random image linked to ").concat(prop, "\">");

//       document.getElementById("".concat(prop)).innerHTML += _imgs;
//     }
//   }
// }