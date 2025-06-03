// DARK/LIGHT MODE TOGGLE 
const themeToggle = document.querySelector('.extensions-button2'); // not querySelectorAll

const moonSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 22 22"><g clip-path="url(#a)"><path stroke="#091540" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.98" d="M20.125 11.877A7.333 7.333 0 1 1 10.124 1.875a9.168 9.168 0 1 0 10.001 10.002Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h22v22H0z"/></clipPath></defs></svg>`;

const sunSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 22 22"><g clip-path="url(#a)"><path stroke="#FBFDFE" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.98" d="M11 1.833v1.834m0 14.666v1.834M3.667 11H1.833m3.955-5.212L4.492 4.492m11.72 1.296 1.297-1.296M5.788 16.215l-1.296 1.296m11.72-1.296 1.297 1.296M20.167 11h-1.834m-2.75 0a4.583 4.583 0 1 1-9.167 0 4.583 4.583 0 0 1 9.167 0Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h22v22H0z"/></clipPath></defs></svg>`;

let isDarkMode = false;

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    themeToggle.innerHTML = isDarkMode ?  sunSVG : moonSVG ;
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  });
}


// 	Loads data from an external file (your JSON).
fetch ('data.json')
// Converts the raw file into actual JavaScript data (array of objects).
.then(function(response) {
  return response.json();
})
.then(function(data) {

 const container = document.getElementById('extension-list');

  //Loops through each item in the data.
  data.forEach(function(item) {
    const extensionDiv = document.createElement('div'); //dynamically creates html
    extensionDiv.classList.add('extent-items');
    extensionDiv.innerHTML =  //inserts the content inside the element
     `
     <div class = "top">
     <div class ="ex"> 
     <div>
     <img src = "${item.logo}" alt="${item.name} logo" width = "40" height = "40" />
     </div>
     <div class"item">
     <h3>${item.name}</h3>
     <p>${item.description}</p>
     </div>
     </div>
     </div>
     <div class = "ex2">     
     <button class = "remove-button">Remove</button>
     
     <label class = "switch">
     <input type= "checkbox" ${item.isActive ? "checked" : ""}>

     <span class = "slider"></span>
     </label>
     </div>
     </div>
     `;
     container.appendChild(extensionDiv); //adds element (new HTML) to the div with class id
  });


  

    const removeButton = document.querySelectorAll('.remove-button');
// Function to reset buttons background (remove inline styles)
    function resetButtonBackgrounds() {
  removeButton.forEach(btn => {
    btn.style.backgroundColor = '';
  });
}

// Click event to set color based on theme
removeButton.forEach(button => {
  button.addEventListener('click', () => {
    removeButton.forEach(btn => {
      btn.style.backgroundColor = '';
    });
    const currentTheme = document.body.getAttribute('data-theme');

    const activeColor = currentTheme === 'dark' ? 'hsl(3, 86%, 64%)' : 'hsl(3, 77%, 44%)'

 button.style.backgroundColor = activeColor; 
  });
});

// Observe changes on data-theme attribute of body to reset button colors
const body = document.body;
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.attributeName === 'data-theme') {
      resetButtonBackgrounds();
    }
  });
});



observer.observe(body, { attributes: true });


(() => {
  const buttons = document.querySelectorAll('.buttons3 button');

  function resetButtonsBackground() {
    buttons.forEach(btn => {
      btn.style.backgroundColor = '';
    });
  }

  function resetBodyBackground() {
    const currentTheme = document.body.getAttribute('data-theme');
    document.body.style.backgroundColor = '';
  }

  
   

  // Add click event listeners to buttons
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => {
        btn.style.backgroundColor = '';
      });
     
    

      const currentTheme = document.body.getAttribute('data-theme');
      const activeColor = currentTheme === 'dark' ? 'hsl(3, 86%, 64%)' : 'hsl(3, 77%, 44%)';

      button.style.backgroundColor = activeColor;

       if (button.id === 'active') {
        document.body.style.backgroundColor = activeColor;
      } else {
        resetBodyBackground();

      }

      
      const filter = button.id;
      const allItems = document.querySelectorAll('.extent-items');
      allItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const isChecked = checkbox.checked;
        const shouldShow =
          filter === 'all' ||
          (filter === 'active' && isChecked) ||
          (filter === 'inactive' && !isChecked);

        if (shouldShow) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });


  // Observe theme changes and reset button and body backgrounds
  const body = document.body;
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'data-theme') {
        resetButtonsBackground();
        resetBodyBackground();
      }
    });
  });

  observer.observe(body, { attributes: true });
})();

})


  

  










    
  