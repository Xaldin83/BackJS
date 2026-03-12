const button = document.querySelector("button");
button.addEventListener("click", async (e) => {
  e.preventDefault();
  const input_mail = document.querySelector("#mail");
  const input_password = document.querySelector("#password");
  const obj = { email: input_mail.value, password: input_password.value };
  const req = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: { "Content-type": "application/json" },
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
