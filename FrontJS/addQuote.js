const button = document.querySelector("button");
button.addEventListener("click", async (e) => {
  e.preventDefault();
  const input_quote = document.querySelector("#quote");
  const input_author = document.querySelector("#author");
  const obj = { quote: input_quote.value, author: input_author.value };
  const req = await fetch("http://localhost:3000/api/quote", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: { "Content-type": "application/json" ,authorization :'Bearer '+localStorage.token},
  });
  const datas = await req.json();
  console.log(datas)
  if (datas.token) {
    localStorage.setItem("token", datas["token"]);
    document.location.replace("./index.html");
  }
  else{
    const p = document.querySelector('p')
    p.textContent = datas.message
  }
});
