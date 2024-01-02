console.log("Hello World")

const btn = document.querySelectorAll('.btn');


btn.forEach(btn => {
    btn.addEventListener('click', (e) => console.log(e.target.innerText));
})