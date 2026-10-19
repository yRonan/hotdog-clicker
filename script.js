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
const spsEl = document.getElementById("sps-hotdog");
const valorCliqueEl = document.getElementById("valor-clique");
const indicadorCombo = document.getElementById("indicador-combo");

// Elemento onde o fundo será aplicado
const areaBalcaoEl = document.querySelector(".area-balcao"); 

const listaChefeEl = document.getElementById("lista-chefe");
const listaFuncionariosEl = document.getElementById("lista-funcionarios");
const listaFundosEl = document.getElementById("lista-de-fundos");

// Variáveis do Jogo
let hotdogs = 0;
let valorCliqueBase = 1;
let hotdogsPorSegundo = 0;

// Sistema de Combo
let historicoCliques = [];
let multiplicadorCombo = 1;

// Lista de Melhorias (Loja)
const upgrades = [
    // --- CHEFE (+ Clique) ---
    { id: 'luva', nome: 'Luvas Térmicas', tipo: 'chefe', custo: 20, efeito: 1, count: 0 },
    { id: 'ketchup', nome: 'Ketchup Premium', tipo: 'chefe', custo: 100, efeito: 5, count: 0 },
    
    // --- FUNCIONÁRIOS (+ Auto) ---
    { id: 'estagiario', nome: 'Estagiário', tipo: 'funcionario', custo: 50, efeito: 1, count: 0 },
    { id: 'chapeiro', nome: 'Chapeiro', tipo: 'funcionario', custo: 250, efeito: 10, count: 0 },
    
    // --- FUNDOS (Visual) ---
    // A propriedade 'efeito' guarda o nome da imagem na pasta img
    { id: 'fundo-praia', nome: 'Fundo Praia', tipo: 'fundo', custo: 500, efeito: 'fundo-praia.jpg', comprado: false },
    { id: 'fundo-espaco', nome: 'Fundo Espacial', tipo: 'fundo', custo: 2000, efeito: 'fundo-espaco.jpg', comprado: false }
    // --- CACHORROS QUENTES ---
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
    atualizarTela();
});

mensagemInicioJogo.addEventListener("animationend", () => {
    mensagemInicioJogo.classList.add("hidden");
});

// --- LÓGICA DE CLIQUES E COMBO ---
btnHotdog.addEventListener("click", () => {
    historicoCliques.push(Date.now());
    hotdogs += (valorCliqueBase * multiplicadorCombo);
    atualizarTela();
});

// Verificador contínuo (Combo)
setInterval(() => {
    const agora = Date.now();
    historicoCliques = historicoCliques.filter(tempo => agora - tempo <= 10000);
    
    const cliquesNosUltimos10s = historicoCliques.length;
    const cps = cliquesNosUltimos10s / 10;
    
    let novoMultiplicador = 1;
    if (cps >= 10) novoMultiplicador = 2;
    else if (cps >= 8) novoMultiplicador = 1.5;
    else if (cps >= 6) novoMultiplicador = 1.2;

    if (novoMultiplicador !== multiplicadorCombo) {
        multiplicadorCombo = novoMultiplicador;
        atualizarTela();
    }
}, 500);

// HotDogs Automáticos por segundo
setInterval(() => {
    if (hotdogsPorSegundo > 0) {
        hotdogs += hotdogsPorSegundo;
        atualizarTela();
    }
}, 1000);

// --- LOJA E INTERFACE ---
function renderizarLoja() {
    listaChefeEl.innerHTML = "";
    listaFuncionariosEl.innerHTML = "";
    if (listaFundosEl) listaFundosEl.innerHTML = ""; // Verifica se a lista de fundos existe no HTML

    upgrades.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "item-loja";
        
        // Define o texto descritivo dependendo do tipo de upgrade
        let textoEfeito = "";
        if (item.tipo === 'chefe') {
            textoEfeito = `+${item.efeito}/clique`;
        } else if (item.tipo === 'funcionario') {
            textoEfeito = `+${item.efeito}/s`;
        } else if (item.tipo === 'fundo') {
            textoEfeito = `Muda o visual`;
        }

        // Para os fundos, o botão muda se já tiver sido comprado
        let textoBotao = "COMPRAR";
        let estadoBotao = hotdogs < item.custo ? 'disabled' : '';
        let countDisplay = `(${item.count})`;
        
        if (item.tipo === 'fundo') {
            countDisplay = ""; // Fundos não mostram quantidade
            if (item.comprado) {
                textoBotao = "USAR";
                estadoBotao = ""; // Sempre pode clicar em "usar" depois de comprado
            }
        }

        div.innerHTML = `
            <div class="info-item">
                <h4>${item.nome} ${countDisplay}</h4>
                <p>${item.comprado ? 'Comprado' : `Custo: ${Math.floor(item.custo)} 🌭`} | ${textoEfeito}</p>
            </div>
            <button class="btn-comprar" onclick="comprarUpgrade(${index})" ${estadoBotao}>${textoBotao}</button>
        `;

        if (item.tipo === 'chefe') {
            listaChefeEl.appendChild(div);
        } else if (item.tipo === 'funcionario') {
            listaFuncionariosEl.appendChild(div);
        } else if (item.tipo === 'fundo' && listaFundosEl) {
            listaFundosEl.appendChild(div);
        }
    });
}

window.comprarUpgrade = function(index) {
    const item = upgrades[index];
    
    // Tratamento especial para os Fundos
    if (item.tipo === 'fundo') {
        if (!item.comprado && hotdogs >= item.custo) {
            hotdogs -= item.custo;
            item.comprado = true;
            aplicarFundo(item.efeito);
        } else if (item.comprado) {
            aplicarFundo(item.efeito); // Equipa o fundo se já o tem
        }
    } 
    // Compras normais (Chefe e Funcionários)
    else if (hotdogs >= item.custo) {
        hotdogs -= item.custo;
        item.count++;
        item.custo = item.custo * 1.5; 

        if (item.tipo === 'chefe') {
            valorCliqueBase += item.efeito;
        } else if (item.tipo === 'funcionario') {
            hotdogsPorSegundo += item.efeito;
        }
    }
    
    atualizarTela();
}

function aplicarFundo(nomeImagem) {
    // Altera a imagem de fundo da área do balcão (centro)
    // Assegure-se de que a imagem existe na pasta 'img'
    areaBalcaoEl.style.backgroundImage = `url('img/${nomeImagem}')`;
    areaBalcaoEl.style.backgroundSize = "cover";
    areaBalcaoEl.style.backgroundPosition = "center";
}

function atualizarTela() {
    contadorEl.textContent = Math.floor(hotdogs);
    
    const cliqueTotal = (valorCliqueBase * multiplicadorCombo).toFixed(1);
    valorCliqueEl.textContent = cliqueTotal.endsWith('.0') ? parseInt(cliqueTotal) : cliqueTotal;
    
    spsEl.textContent = hotdogsPorSegundo;
    
    if (multiplicadorCombo > 1) {
        indicadorCombo.textContent = `🔥 COMBO ${multiplicadorCombo}X 🔥`;
        indicadorCombo.className = "combo-ativo";
    } else {
        indicadorCombo.className = "combo-oculto";
    }

    renderizarLoja();
}

// --- CRÉDITOS ---
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
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !janelaCreditos.classList.contains("hidden")) fecharCreditos();
});