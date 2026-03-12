async function update(){
  const buttonAdd = document.querySelector(".add");
  const input_quote = document.querySelector("#quote");
  const input_author = document.querySelector("#author");
  buttonAdd.addEventListener("click", async (e) => {
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
  const req = await fetch("http://localhost:3000/api/quote");
  const datas = await req.json();

  section.insertAdjacentHTML(
    "beforeend",
    `<h2>${datas["author"]}</h2><h3>${datas["quote"]}</h3><button class="sup" data-id = "${datas["_id"]}">Supprimer</button><button class = "updt" data-id = "${datas["_id"]}">Modifier</button>`
  );
  const buttonSup = document.querySelector(".sup");
  buttonSup.addEventListener("click", async (e) => {
    const req = await fetch(
      `http://localhost:3000/api/quote/${buttonSup.dataset["id"]}`,
      {
        method: "DELETE",
        headers:{authorization :'Bearer '+localStorage.token}
      },
    );
  });
  const buttonUpdt = document.querySelector(".updt");
  buttonUpdt.addEventListener("click", async (e) => {
    e.preventDefault();
    buttonUpdt.insertAdjacentHTML(
    "afterend",
    `<form action="#" method="post">
            <input type="text" name="quote" id="quote" placeholder="La citation : ">
            <input type="text" name="author" id="author" placeholder="L'auteur : ">
            <button class="add" data-id = "${datas["_id"]}">Modifier</button>
        </form>`
    );
    update()
});

}

init();
