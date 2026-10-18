// Captura de Elementos
const botaoJogar = document.getElementById("btn-jogar");
const menuInicial = document.getElementById("menu-inicial");
const telaJogo = document.getElementById("tela-jogo");
const mensagemInicioJogo = document.getElementById("mensagem-inicio-jogo");
const inputNome = document.getElementById("nome-lanchonete");
const erroNome = document.getElementById("erro-nome");
const tituloLanchonete = document.getElementById("titulo-lanchonete");
const botaoCreditos = document.getElementById("btn-creditos");
const janelaCreditos = document.getElementById("tela-creditos");
const botaoVoltar = document.getElementById("btn-voltar");

const btnHotdog = document.getElementById("btn-hotdog");
const contadorEl = document.getElementById("contador-hotdog");

// Variáveis básicas do Jogo
let hotdogs = 0;
let valorClique = 1;
// let hotdogsPorSegundo = 0; // TODO: Implementar na próxima fase

// Lista de Melhorias planeadas (Array de Objetos)
const upgrades = [
    { id: 'luva', nome: 'Luvas Térmicas', tipo: 'chefe', custo: 20, efeito: 1 },
    { id: 'estagiario', nome: 'Estagiário', tipo: 'funcionario', custo: 50, efeito: 1 }
];

// --- NAVEGAÇÃO E MENUS ---
botaoJogar.addEventListener("click", () => {
    const nome = inputNome.value.trim();
    if (nome === "") {
        erroNome.textContent = "Digite o nome da lanchonete!";
        inputNome.focus();
        return;
    }
    erroNome.textContent = "";
    tituloLanchonete.textContent = nome;

    menuInicial.classList.add("hidden");
    telaJogo.classList.remove("hidden");
    mensagemInicioJogo.classList.add("mensagem-inicio-animando");
});

mensagemInicioJogo.addEventListener("animationend", () => {
    mensagemInicioJogo.classList.add("hidden");
});

// --- LÓGICA DE CLIQUES ---
btnHotdog.addEventListener("click", () => {
    hotdogs += valorClique;
    contadorEl.textContent = hotdogs;
});

// --- LOJA (Incompleta) ---
function comprarUpgrade(index) {
    // TODO: Criar a lógica de comprar melhorias, verificar se tem dinheiro e atualizar a tela
    console.log("Clicou para comprar o item da posição: " + index);
    alert("Loja ainda em construção!");
}

// --- CRÉDITOS ---
function fecharCreditos() {
    janelaCreditos.classList.add("hidden");
    botaoCreditos.focus();
}

botaoCreditos.addEventListener("click", () => {
    janelaCreditos.classList.remove("hidden");
    botaoVoltar.focus();
});

botaoVoltar.addEventListener("click", fecharCreditos);