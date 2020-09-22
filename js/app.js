const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");

let tweets = [];

eventListeners();
function eventListeners() {
    formulario.addEventListener("submit", agregarTweet);

    document.addEventListener("DOMContentLoaded", () => {
        tweets = JSON.parse(localStorage.getItem("tweets")) || [];

        renderTweets();
    });
}

function agregarTweet(e) {
    e.preventDefault();

    const tweet = document.querySelector("#tweet").value;

    if (tweet.length == "") {
        mostrarError("Tu mensaje no puede ir vacio");
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet,
    };

    tweets = [...tweets, tweetObj];
    renderTweets();
    formulario.reset();
}

function renderTweets() {
    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach((tweet) => {
            const btnEliminar = document.createElement("a");
            btnEliminar.classList.add("borrar-tweet");
            btnEliminar.textContent = "X";
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            };

            const newTweet = document.createElement("li");
            newTweet.textContent = tweet.tweet;
            newTweet.appendChild(btnEliminar);
            listaTweets.appendChild(newTweet);
        });
    }
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

function borrarTweet(id) {
    tweets = tweets.filter((tweet) => tweet.id !== id);
    renderTweets();
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
