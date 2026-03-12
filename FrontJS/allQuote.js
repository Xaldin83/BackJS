async function update(){
  const buttonAdd = document.querySelector(".add");
  const input_quote = document.querySelector("#quote");
  const input_author = document.querySelector("#author");
  console.log("entrez dans update")
  buttonAdd.addEventListener("click", async (e) => {
    console.log(buttonAdd)
    e.preventDefault();
    const obj = { quote: input_quote.value, author: input_author.value };
    const req = await fetch(`http://localhost:3000/api/quote/${buttonAdd.dataset["id"]}`,
      {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: { "Content-type": "application/json" ,authorization :'Bearer '+localStorage.token},
      });
  });
}

async function init() {
  const section = document.querySelector("div");
  const req = await fetch("http://localhost:3000/api/quote/all");
  const datas = await req.json();


  datas.forEach(element => {
    section.insertAdjacentHTML(
    "beforeend",
    `<h2>${element["author"]}</h2><h3>${element["quote"]}</h3><button class="sup" data-id = "${element["_id"]}">Supprimer</button><button class = "updt" data-id = "${element["_id"]}">Modifier</button>`,
  );
  });
  

  const buttonSup = document.querySelectorAll(".sup");
  buttonSup.forEach(element =>{
    element.addEventListener("click", async (e) => {
      const req = await fetch(
        `http://localhost:3000/api/quote/${element.dataset["id"]}`,
        {
          method: "DELETE",
          headers:{authorization :'Bearer '+localStorage.token}
        },
      );
    });
  })

  const buttonUpdt = document.querySelectorAll(".updt");
  buttonUpdt.forEach(element => {
    element.addEventListener("click", async (e) => {
      console.log(element)
      element.insertAdjacentHTML(
      "afterend",
      `<form action="#" method="post">
              <input type="text" name="quote" id="quote" placeholder="La citation : ">
              <input type="text" name="author" id="author" placeholder="L'auteur : ">
              <button class="add" data-id = "${element.dataset["id"]}">Modifier</button>
          </form>`
      );
      update()
    })
 });
  
}

init();
