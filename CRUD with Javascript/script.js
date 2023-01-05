const formBtn = document.querySelector("button");
const formEl = document.querySelector("form")
const nomeProduto = document.getElementById("nomeProduto");
const valorProduto = document.getElementById("valorProduto");
const formaPagamento = document.getElementById("formaPagamento");
const tBody = document.getElementById("tBody");

let modo = "enviar";
let contador;

if (localStorage.getItem("produtos") === null) {
    localStorage.setItem("produtos", JSON.stringify([]));
}

let arrayProdutos = JSON.parse(localStorage.getItem("produtos"));

formEl.addEventListener("submit", (e) => {

    e.preventDefault();

    if (!nomeProduto.value || !valorProduto.value || !formaPagamento.value) {
        return;
    }

    let obj = {
        nProduto: nomeProduto.value,
        vProduto: valorProduto.value,
        pagamento: formaPagamento.value
    };

    if(modo === "enviar") {
        arrayProdutos.push(obj);
        localStorage.setItem("produtos", JSON.stringify(arrayProdutos));
    } else {
        arrayProdutos[contador] = obj;
        localStorage.setItem("produtos", JSON.stringify(arrayProdutos));
        modo = "enviar";
        formBtn.innerHTML = "Enviar";
    }

    dataToTable();
    limpaDados();

    nomeProduto.focus();
});

const dataToTable = () => {

    let newRow = "";

    for (let i = 0; i < arrayProdutos.length; i++) {
        newRow += `
            <tr>
                <td>${arrayProdutos[i].nProduto}</td>
                <td>${arrayProdutos[i].vProduto}</td>
                <td>${arrayProdutos[i].pagamento}</td>
                <td>
                    <button class="btn btn-outline-danger" onclick="deleteRow(${i})">Excluir</button>
                    <button class="btn btn-outline-info" onclick="selectRow(${i})">Selecionar</button>
                </td>
            </tr>`;

        tBody.innerHTML = newRow;
    }
}

const limpaDados = () => {
    nomeProduto.value = "";
    valorProduto.value = "";
    formaPagamento.value = "";
}

const deleteRow = i => {
    arrayProdutos.splice(i, 1)
    localStorage.setItem("produtos", JSON.stringify(arrayProdutos));
    dataToTable();
}

const selectRow = i => {
    
    nomeProduto.value = arrayProdutos[i].nProduto;;
    valorProduto.value = arrayProdutos[i].vProduto;
    formaPagamento.value = arrayProdutos[i].pagamento;

    formBtn.innerHTML = "Editar";
    modo = "editar";
    contador = i;

    scroll({
        top: 0,
        behavior: "smooth"
    });
}

const retrieveData = () => {

    let dataRetrieved = JSON.parse(localStorage.getItem("produtos")); 

    for (let i = 0; i < dataRetrieved.length; i++) {
        let newRow = `
            <tr>
                <td>${dataRetrieved[i].nProduto}</td>
                <td>${dataRetrieved[i].vProduto}</td>
                <td>${dataRetrieved[i].pagamento}</td>
                <td>
                    <button class="btn btn-outline-danger" onclick="deleteRow(${i})">Excluir</button>
                    <button class="btn btn-outline-info" onclick="selectRow(${i})">Selecionar</button>
                </td>
            </tr>`;

        tBody.innerHTML += newRow;
    }
}

window.addEventListener("DOMContentLoaded", () => {
    retrieveData();
})