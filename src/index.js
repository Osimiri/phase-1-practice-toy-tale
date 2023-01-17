let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//functions 
function renderEachToyCard(toy) {
  const toyCard = document.createElement("div");
  toyCard.className = "card";

  const h2 = document.createElement("h2");
  h2.textContent = toy.name;

  const img = document.createElement("img");
  img.src = toy.image;
  img.className = "toy-avatar"

  const p = document.createElement("p");
  p.textContent = `${toy.likes} likes`;

  const button = document.createElement("button");
  button.className = "like-btn";
  button.id = toy.id;
  button.textContent = "Like ❤️";
  button.addEventListener("click", (e) => {
    console.log("clicked")
    toy.likes += 1;
    p.textContent = `${toy.likes} likes`
    updateLikes(toy)
  }
  );

  //div.append(h2, img, p, button);

  toyCard.appendChild(h2);
  toyCard.appendChild(img);
  toyCard.appendChild(p);
  toyCard.appendChild(button);

  document.querySelector('#toy-collection').appendChild(toyCard)
}

// Fetch Request's 
function getToys() {
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toys => toys.forEach(renderEachToyCard))
  //second .then names the new returned array form JSON format
}

getToys();

////////////////////////////////////////////////////////////////////////////
//////////////////////////////Add Submissions///////////////////////////////
////////////////////////////////////////////////////////////////////////////

const form = document.querySelector("form")
document.addEventListener("submit",(submit) => { //dont forget document.event listener not
  submit.preventDefault();
  const newToy = {
    name: submit.target.name.value,
    image: submit.target.image.value,
    likes: 0
}
renderEachToyCard(newToy);
addNewToy(newToy);
})

function addNewToy(newToy) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newToy)
  }
  )}

  function updateLikes (toy) {
    fetch(`http://localhost:3000/toys/${toy.id}`, {     // you use toy.id b/c its a url specific to that one toy thats being changed
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(toy)
    })
  }
   