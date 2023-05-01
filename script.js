let ulContainer = document.querySelector(".ulContainer");
let form = document.querySelector(".form");
let inventaire = [];
function render(array) {
  let li = "";
  array.forEach((element) => {
    if (element.type === "nonAlco") {
      li =
      li +
      `<li>Nom boisson: <input type="text" value="${element.boisson}"> Quantite: <input type="number" class="qnt" value="${element.quantite}"> Prix d'achat: <input type="number" value="${element.prixAchate}"> Prix de vente: <input type="number" value="${element.prixVente}"> Marge % : <input type="number" value="${element.marge}"> Prix de vente TTC <input type="number" value="${element.prixVenteTtc}">  </li>`;
    } else {
      li =
      li +
      `<li>Nom boisson: <input type="text" value="${element.boisson}"> Quantite: <input type="number" value="${element.quantite}"> Prix d'achat: <input type="number" value="${element.prixAchate}"> Prix de vente: <input type="number" value="${element.prixVente}"> Marge % : <input type="number" value="${element.marge}"> Prix de vente TTC <input type="number" value="${element.prixVenteTtc}"> Degree alcool: <input type="number" value="${element.degre}"> </li>`;
    }
    
  });
  ulContainer.innerHTML = li;
  
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
      data.get("prixVente") * 1.2 ,
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
)
{
  this.boisson = boisson;
  this.quantite = quantite;
  this.prixAchate = prixAchate;
  this.prixVente = prixVente;
  this.marge = marge;
  this.prixVenteTtc = prixVenteTtc
  this.type = type;
  this.degre = degre;
}