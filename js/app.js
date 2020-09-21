const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");

let tweets = [];

eventListeners();
function eventListeners() {
    formulario.addEventListener("submit", agregarTweet);
}

function agregarTweet(e) {
    e.preventDefault();

    const tweet = document.querySelector("#tweet").value;

    if (tweet.length == "") {
        mostrarError("Tu mensaje no puede ir vacio");
        return;
    }

    tweets = [...tweets, tweet];
    renderTweets(tweets);
}

function renderTweets(tw) {
    limpiarHTML();

    tw.forEach((tweet) => {
        const newTweet = document.createElement("p");
        newTweet.textContent = tweet;

        listaTweets.appendChild(newTweet);
    });
}

function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function mostrarError(err) {
    const mensajeError = document.createElement("p");

    mensajeError.textContent = err;
    mensajeError.classList.add("error");

    const contenido = document.querySelector("#contenido");
    contenido.appendChild(mensajeError);

    setTimeout(() => mensajeError.remove(), 3000);
}
