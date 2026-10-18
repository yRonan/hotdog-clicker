const botaoJogar = document.getElementById("btn-jogar");
const menuInicial = document.getElementById("menu-inicial");
const telaJogo = document.getElementById("tela-jogo");
const mensagemInicioJogo = document.getElementById("mensagem-inicio-jogo");
const botaoCreditos = document.getElementById("btn-creditos");
const janelaCreditos = document.getElementById("tela-creditos");
const botaoVoltar = document.getElementById("btn-voltar");

if (!botaoJogar || !menuInicial || !telaJogo || !mensagemInicioJogo || !botaoCreditos || !janelaCreditos || !botaoVoltar) {
    throw new Error("Não foi possível inicializar o menu: elementos necessários não encontrados.");
}

botaoJogar.addEventListener("click", () => {
    menuInicial.classList.add("hidden");
    telaJogo.classList.remove("hidden");
    mensagemInicioJogo.classList.add("mensagem-inicio-animando");
});

mensagemInicioJogo.addEventListener("animationend", () => {
    mensagemInicioJogo.classList.add("hidden");
});

function fecharCreditos() {
    janelaCreditos.classList.add("hidden");
    janelaCreditos.setAttribute("aria-hidden", "true");
    botaoCreditos.focus();
}

botaoCreditos.addEventListener("click", () => {
    janelaCreditos.classList.remove("hidden");
    janelaCreditos.setAttribute("aria-hidden", "false");
    botaoVoltar.focus();
});

botaoVoltar.addEventListener("click", fecharCreditos);

document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && !janelaCreditos.classList.contains("hidden")) {
        fecharCreditos();
    }
});