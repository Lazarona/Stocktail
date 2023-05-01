let ulContainer = document.querySelector(".ulContainer");
let form = document.querySelector(".form");
let inventaire = [];
function render(array) {
  let li = "";
  array.forEach((element) => {
    li =
      li +
      `<li>Nom boisson: <input type="text" value="${element.boisson}"> Quantite: <input type="number" value="${element.quantite}"> Prix d'achat: <input type="number" value="${element.prixAchate}"> Prix de vente: <input type="number" value="${element.prixVente}"> Marge: ${element.marge}% </li>`;
  });
  ulContainer.innerHTML = li;
}
function addProduit(e) {
  e.preventDefault();
  let data = new FormData(form);
  let produit = new Produit(
    data.get("boisson"),
    data.get("quantite"),
    data.get("prixAchate"),
    data.get("prixVente"),
    (data.get("prixVente") / data.get("prixAchate")) * 100
    //prixVenteTtc: prixVente * tva,
    //typeBoisson: type.value,
    // degre function
  );
  inventaire.push(produit);
  render(inventaire, "all");
}

form.addEventListener("submit", addProduit);

function Produit(
  boisson,
  quantite,
  prixAchate,
  prixVente,
  marge,
  type,
  degreAlcool
) {
  this.boisson = boisson;
  this.quantite = quantite;
  this.prixAchate = prixAchate;
  this.prixVente = prixVente;
  this.marge = marge;
  this.type = type;
  this.degreAlcool = degreAlcool;
}
