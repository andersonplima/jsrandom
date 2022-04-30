let pessoas_length;

function generatePessoasList(pessoasText) {
    const pessoas_container = document.getElementById("pessoas_container");
    pessoas_container.innerHTML = "";
    const sorteados_container = document.getElementById("sorteados_container");
    sorteados_container.innerHTML = "";
    const pessoas = pessoasText.split(/\r\n|\r|\n/);
    const ul_pessoas = document.createElement("ul");
    pessoas_container.appendChild(ul_pessoas);
    const ul_sorteados = document.createElement("ul");
    sorteados_container.appendChild(ul_sorteados);    
    
    pessoas_length = 0;
    pessoas.forEach(nome => {
        const li = document.createElement("li");
        li.innerText = nome;
        ul_pessoas.appendChild(li);
        pessoas_length++;
    });
}

function handlePessoasInputFileChange(e) {
    const quant_arquivos = this.files?.length ?? 0;
    const pessoas_inputfilestats = document.getElementById("pessoas_inputfilestats");
    if (quant_arquivos > 0) {
        const arquivo = this.files[0];
        const stats = `Arquivo ${arquivo.type} carregado: ${(arquivo.size / 1024).toFixed(2)} kb`;
        pessoas_inputfilestats.innerText = stats;

        const reader = new FileReader();

        reader.addEventListener("load", () => {
            generatePessoasList(reader.result);
            const sortear_button = document.getElementById("sortear_button");
            sortear_button.removeAttribute("disabled");
        }, false);

        reader.readAsText(arquivo);
    }
    else {
        pessoas_inputfilestats.innerText = "";
    }
}

function transferPessoaSorteada(pessoa_sorteada) {
    console.log('todo');
}

function sortear(deceive_count) {
    const sorteio = Math.floor(Math.random() * pessoas_length);
    const pessoas_itens = document.querySelectorAll("div#pessoas_container li");
    let pessoa_sorteada = pessoas_itens[sorteio];
    pessoa_sorteada.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    if (deceive_count > 0) {
        setTimeout(() => sortear(deceive_count - 1), 500);
    } else {
        pessoa_sorteada.setAttribute("class", "big");
        pessoa_sorteada.innerText += " 🎆";
        pessoas_length--;
        setTimeout(() => tranferPessoaSorteada(pessoa_sorteada), 1000);
    }
}

function handleSortearButtonClick() {
    sortear(5);
}

function addChangeEventListenerToPessoasInputFile() {
    const pessoas_inputfile = document.getElementById("pessoas_inputfile");
    pessoas_inputfile.addEventListener("change", handlePessoasInputFileChange, false);
}

function addClickEventListenerToSortearButton() {
    const sortear_button = document.getElementById("sortear_button");
    sortear_button.addEventListener("click", handleSortearButtonClick, false);
}

function handleWindowLoad() {
    addChangeEventListenerToPessoasInputFile();
    addClickEventListenerToSortearButton();
}

window.addEventListener("load", handleWindowLoad);
