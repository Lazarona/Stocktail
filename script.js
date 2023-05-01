let ulContainer = document.querySelector(".ulContainer");
let form = document.querySelector(".form");
let inventaire = [];
function render(array) {
  let li = "";
  array.forEach((element) => {
    li =
      li +
      `<li>Nom boisson: <input type="text" value="${element.boisson}"> Quantite: <input type="number" size=1 value="${element.quantite}"> Prix d'achat: <input type="number" value="${element.prixAchate}"> Prix de vente: <input type="number" value="${element.prixVente}"> Marge: <input type="number" value="${element.marge}">% Prix de vente TTC <input type="number" value="${element.prixVenteTtc}">  </li>`;
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
    (data.get("prixVente") / data.get("prixAchate")) * 100,
    data.get("prixVente") * 1.2 ,
    //typeBoisson: type.value,
    //if (type boisson=alco) {
    //  1.creation de button degree
    //  2.button degree add to form
    //   // degre function 
    // }
    
  );
  inventaire.push(produit);
  console.log(inventaire);
  render(inventaire, "all");
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
  degreAlcool
) {
  this.boisson = boisson;
  this.quantite = quantite;
  this.prixAchate = prixAchate;
  this.prixVente = prixVente;
  this.marge = marge;
  this.prixVenteTtc = prixVenteTtc
  this.type = type;
  this.degreAlcool = degreAlcool;
}
