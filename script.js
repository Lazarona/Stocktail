let ulContainer = document.querySelector(".ulContainer");
let form = document.querySelector(".form");
let inventaire = [];
var qrcode = new QRCode("qrcode");
function render(array) {
  let li = "";
  array.forEach((element, index) => {
    if (element.type === "nonAlco") {
      li =
        li +
        `<li>Nom boisson: <input class="inputBoisson" type="text" value="${element.boisson}"readonly> 
         Quantite: <input class="inputQuantite" type="number" value="${element.quantite}"readonly> 
         Prix d'achat: <input class="inputPrixAchate" type="number" value="${element.prixAchate}"readonly> 
         Prix de vente: <input type="number" class="inputPrixVente" value="${element.prixVente}"readonly> 
         Marge % : <input type="number" class="inputMarge" value="${element.marge}"readonly> 
         Prix de vente TTC <input type="number" class="inputPrixVenteTtc" value="${element.prixVenteTtc}"readonly> 
         <button type='button' class='btn-Mof'>EDIT</button>  </li>`;
    } else {
      li =
        li +
        `<li>Nom boisson: <input class="inputList" type="text" value="${element.boisson}"readonly> Quantite: <input class="inputList" type="number" value="${element.quantite}"readonly> Prix d'achat: <input type="number" class="inputList" value="${element.prixAchate}"readonly> Prix de vente: <input type="number" class="inputList" value="${element.prixVente}"readonly> Marge % : <input type="number" class="inputList" value="${element.marge}"readonly> Prix de vente TTC <input type="number" class="inputList" value="${element.prixVenteTtc}"readonly> Degree alcool: <input type="number" class="inputList" value="${element.degre}"readonly> <button type='button' class='btn-Mof'>EDIT</button> </li>`;
    }
  });
  ulContainer.innerHTML = li;
  let allButton = document.querySelectorAll(".btn-Mof");
  allButton.forEach((element, index) => {
    element.addEventListener("click", () => {
      let inputBoisson = document.querySelectorAll(".inputBoisson");
      let inputQuantite = document.querySelectorAll(".inputQuantite");
      let inputPrixAchate = document.querySelectorAll(".inputPrixAchate");
      let inputPrixVente = document.querySelectorAll(".inputPrixVente");
      let inputMarge = document.querySelectorAll(".inputMarge");
      let inputPrixVenteTtc = document.querySelectorAll(".inputPrixVenteTtc");

      if (element.innerText.toLowerCase() == "edit") {
        element.innerText = "SAVE";
        inputBoisson[index].removeAttribute("readonly");
        inputQuantite[index].removeAttribute("readonly");
        inputPrixAchate[index].removeAttribute("readonly");
        inputPrixVente[index].removeAttribute("readonly", "readonly");
        inputMarge[index].removeAttribute("readonly");
        inputPrixVenteTtc[index].removeAttribute("readonly");
      } else {
        element.innerText = "EDIT";
        inputBoisson[index].setAttribute("readonly", "readonly");
        inputQuantite[index].setAttribute("readonly", "readonly");
        inputPrixAchate[index].setAttribute("readonly", "readonly");
        inputPrixVente[index].setAttribute("readonly", "readonly");
        inputMarge[index].setAttribute("readonly", "readonly");
        inventaire[index].boisson = inputBoisson[index].value;
        inventaire[index].quantite = inputQuantite[index].value;
        inventaire[index].prixAchate = inputPrixAchate[index].value;
        inventaire[index].prixVente = inputPrixVente[index].value;
        inventaire[index].marge =
          (inputPrixVente[index].value / inputPrixAchate[index].value) * 100;
        render();
        console.log(inventaire);
      }
    });
  });
}
function addProduit(e) {
  e.preventDefault();
  let data = new FormData(form);
  if (data.get("type") === "nonAlco") {
    let produit = new Produit(
      data.get("boisson"),
      data.get("quantite"),
      data.get("prixAchate"),
      data.get("prixVente"),
      ((data.get("prixVente") / data.get("prixAchate")) * 100).toFixed(2), // .toFixed(2) make the number with only 2 decimals
      data.get("prixVente") * 1.2,
      data.get("type")
    );
    inventaire.push(produit);
    console.log(inventaire);
    render(inventaire, "all");
  } else {
    let produit = new Produit(
      data.get("boisson"),
      data.get("quantite"),
      data.get("prixAchate"),
      data.get("prixVente"),
      ((data.get("prixVente") / data.get("prixAchate")) * 100).toFixed(2),
      data.get("prixVente") * 1.2,
      data.get("type"),
      data.get("degre")
    );
    inventaire.push(produit);
    console.log(inventaire);
    render(inventaire, "all");
  }
}

form.addEventListener("submit", addProduit);

function Produit(
  boisson,
  quantite,
  prixAchate,
  prixVente,
  marge,
  prixVenteTtc,
  type,
  degre
) {
  this.boisson = boisson;
  this.quantite = quantite;
  this.prixAchate = prixAchate;
  this.prixVente = prixVente;
  this.marge = marge;
  this.prixVenteTtc = prixVenteTtc;
  this.type = type;
  this.degre = degre;
}
