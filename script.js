let ulContainer = document.querySelector(".ulContainer");
let form = document.querySelector(".form");
let inventaire = [];
function render(array) {
  let li = "";
  array.forEach((elementr) => {
    if (elementr.type === "nonAlco") {
      li =
        li +
        `<li>Nom boisson: <input class="inputBoisson" type="text" value="${elementr.boisson}"readonly> 
         Quantite: <input class="inputQuantite" type="number" value="${elementr.quantite}"readonly> 
         Prix d'achat: <input class="inputPrixAchate" type="number" value="${elementr.prixAchate}"readonly> 
         Prix de vente: <input type="number" class="inputPrixVente" value="${elementr.prixVente}"readonly> 
         Marge % : <input type="number" class="inputMarge" value="${elementr.marge}"readonly> 
         Prix de vente TTC <input type="number" class="inputPrixVenteTtc" value="${elementr.prixVenteTtc}"readonly>
         Type : <input class="inputType" type="text" value="${elementr.type}"readonly>
         <input type="number" class="inputDegree" value="${elementr.degre}"readonly hidden>
         <button type='button' class='btn-Mof'>EDIT</button> <button type='button' class='btn-Sup'>Supprimer</button>  </li>`;
    } else {
      li =
        li +
        `<li>Nom boisson: <input class="inputBoisson" type="text" value="${elementr.boisson}"readonly> 
         Quantite: <input class="inputQuantite" type="number" value="${elementr.quantite}"readonly> 
         Prix d'achat: <input class="inputPrixAchate" type="number" value="${elementr.prixAchate}"readonly> 
         Prix de vente: <input type="number" class="inputPrixVente" value="${elementr.prixVente}"readonly> 
         Marge % : <input type="number" class="inputMarge" value="${elementr.marge}"readonly> 
         Prix de vente TTC <input type="number" class="inputPrixVenteTtc" value="${elementr.prixVenteTtc}"readonly>
         Type : <input class="inputType" type="text" value="${elementr.type}"readonly>
         Degree :  <input type="number" class="inputDegree" value="${elementr.degre}"readonly>
         <button type='button' class='btn-Mof'>EDIT</button> <button type='button' class='btn-Sup'>Supprimer</button>  </li>`;
    }
  });
  ulContainer.innerHTML = li;
  let inputBoisson = document.querySelectorAll(".inputBoisson");
  let inputQuantite = document.querySelectorAll(".inputQuantite");
  let inputPrixAchate = document.querySelectorAll(".inputPrixAchate");
  let inputPrixVente = document.querySelectorAll(".inputPrixVente");
  let inputMarge = document.querySelectorAll(".inputMarge");
  let inputPrixVenteTtc = document.querySelectorAll(".inputPrixVenteTtc");
  let inputType = document.querySelectorAll(".inputType");
  let inputDegre = document.querySelectorAll(".inputDegree");
  let modif = document.querySelectorAll(".btn-Mof");
  modif.forEach((element, index) => {
    element.addEventListener("click", () => {
      if (element.innerText.toLowerCase() == "edit") {
        element.style.backgroundColor = "green";
        element.innerText = "SAVE";
        inputBoisson[index].removeAttribute("readonly");
        inputQuantite[index].removeAttribute("readonly");
        inputPrixAchate[index].removeAttribute("readonly");
        inputPrixVente[index].removeAttribute("readonly", "readonly");
        inputMarge[index].removeAttribute("readonly");
        inputPrixVenteTtc[index].removeAttribute("readonly");
        inputType[index].removeAttribute("readonly");
        inputDegre[index].removeAttribute("readonly", "hidden");
      } else {
        element.innerText = "EDIT";

        inputBoisson[index].setAttribute("readonly", "readonly");
        inputQuantite[index].setAttribute("readonly", "readonly");
        inputPrixAchate[index].setAttribute("readonly", "readonly");
        inputPrixVente[index].setAttribute("readonly", "readonly");
        inputMarge[index].setAttribute("readonly", "readonly");
        inputPrixVenteTtc[index].setAttribute("readonly", "readonly");
        inputType[index].setAttribute("readonly", "readonly");
        inputDegre[index].setAttribute("readonly", "readonly");
        inventaire[index].boisson = inputBoisson[index].value;
        inventaire[index].quantite = inputQuantite[index].value;
        inventaire[index].prixAchate = inputPrixAchate[index].value;
        inventaire[index].prixVente = inputPrixVente[index].value;
        inventaire[index].marge = (
          (inputPrixVente[index].value / inputPrixAchate[index].value) *
          100
        ).toFixed(2);
        inventaire[index].prixVenteTtc = (
          inputPrixVente[index].value * 1.2
        ).toFixed(2);
        inventaire[index].type = inputType[index].value;
        if (inventaire[index].type === "nonAlco") {
          inputDegre[index].value = undefined;
        }
        inventaire[index].degre = inputDegre[index].value;

        render(inventaire);
        console.log(inventaire);
      }
    });
  });
  let allsuppBtn = document.querySelectorAll(".btn-Sup");
  allsuppBtn.forEach((elementsup, indexsup) => {
    elementsup.addEventListener("click", () => {
      inventaire.splice(indexsup, 1);
      render(inventaire);
      console.log(inventaire);
    });
  });

  inputQuantite.forEach((element, index) => {
    if (inputQuantite[index].value >= 10) {
      element.style.backgroundColor = "rgb(198, 255, 198";
    } else {
      element.style.backgroundColor = "#fad4d4";
    }
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
let inputQuantiteColor = document.querySelectorAll(".inputQuantite");

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
