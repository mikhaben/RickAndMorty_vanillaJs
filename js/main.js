//* ACTIVATE DARK MODE ------------------------------------
const darkModeBtn = document.getElementById('dark-mode')
const backgroundBody = document.getElementById('body')

darkModeBtn.onclick = function (e) {
   e.preventDefault()
   backgroundBody.classList.toggle('dark-mode');

   if (backgroundBody.classList.contains('dark-mode')) {
      localStorage.setItem('background', 'dark-mode')
   } else {
      localStorage.setItem('background', '')
   }
}
document.addEventListener("DOMContentLoaded", function (e) {
   let LocalStorageData = localStorage.getItem("background")
   let checkLocal = LocalStorageData ? document.body.className += LocalStorageData : ''
})

//* MAIN CARD LIST ------------------------------------
async function getData() {
   try {

      const cardHtml = data => `
      <div class="card">
         <img src="${data.image}" class="card__img" alt="image">
         <div class="card__body">
           <h5 class="card__title">${data.name}</h5>
           <span class="status">${data.status}</span> - <span class="gender">${data.species}</span>
            <button class="card-btn" id="card-${data.id}" data-url="https://rickandmortyapi.com/api/character/${data.id}">
             All episodes
            </button>
         </div>
      </div>
      `
      const url = 'https://rickandmortyapi.com/api/character'
      const response = await fetch(url)
      const data = await response.json()
      const arr = data.results

      for (let i in arr) {
         document.getElementById('card-box').innerHTML = arr.map(cardHtml).join('')
      }

   } catch (e) {
      console.error(e)
   }
}
getData()
   .then(data => {

      //* CARD PAGE OF CHARACTER ---------------------------

      let box = document.getElementById('card-box')

      box.onclick = function (event) {
         let target = event.target

         if (target.className == 'card-btn') {
            const charPageUrl = target.dataset.url

            document.getElementById('card-box').innerHTML = ""

            async function createCharacterPage() {

               const charPage = data => `
               <div class="card-info__box">
                  <img src="${data.image}" alt="image" class="card-info__img">
                  <div class="card-info__text">
                  <h3>${data.name}</h3>
                  <div class="card-info__status">
                     <div class="card-info__status_status">&#8987; ${data.status}</div>
                     <div class="card-info__status_species">&#128125; ${data.species}</div>
                     <div class="card-info__status_gender">&#128107; ${data.gender}</div>
                     <div class="card-info__status_location">&#127759; ${data.location.name}</div>
                     </div>
                  <div class="card-info__episode">
                     <strong>Watch all episodes</strong>
                        &#128073;<br>
                        <div id='episode-column' class='episode-column'>

                        </div>
                  </div>
                 </div>
               </div>
               `

               const response = await fetch(charPageUrl)
               const data = await response.json()
               const links = data.episode

               document.getElementById('card-box').innerHTML = charPage(data)


               links.forEach((e) => {
                  document.getElementById('episode-column').innerHTML += `
                              <a href="${e}" target="_blank">${e}</a>
                           `
               })
            }
            createCharacterPage()
         }

      };
   }
   )


//* ADD CARD FORM -----------------------------------------

const form = document.getElementById('form')
if (form) { form.addEventListener('submit', addData) }

function addData(e) {
   e.preventDefault()

   let formElements = document.getElementById("form").elements
   let formData = {};

   for (let i = 0; i < formElements.length; i++)
      if (formElements[i].type != "submit") {
         if (formElements[i].type == "text") {
            formData[formElements[i].name] = formElements[i].value
         } else if (formElements[i].type == "radio" && formElements[i].checked) {
            formData[formElements[i].name] = formElements[i].value
         }
      }

   function createNewCard() {
      document.getElementById('added-cards').innerHTML += `
      <div class="new-card">
         <img src="${formData.src_img}" alt="img">
         <div class="new-card__description">
            <h2>${formData.name}</h2>
            <div><span>gender:</span> ${formData.gender}</div><br>
            <div><span>small history:</span><br>${formData.description}</div>
         </div>
      </div>
      `
   }
   createNewCard()
   form.reset();
}