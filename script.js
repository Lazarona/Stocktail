let ulContainer = document.querySelector(".ulContainer");
let form = document.querySelector(".form");
let connexion = document.querySelector(".connexion");
let inventaire = [];
function connexion(e) {
  let email = document.forms["myForm"]["email"].value;
  let password = document.forms["myForm"]["password"].value;
  connexion.addEventListener("click", () => {
    if (email == true && password == true) {
      document.location.href = "index.html";
      return true;
    } else {
      alert("Connexion impossible, email ou mot de passe erroné");
    }
  });
}

function render(array) {
  let li = "";
  let url = "";
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

         <button type='button' class='btn-Mof'>EDIT</button> <button type='button' class='btn-Sup'>Supprimer</button>
         <button type='button' class='qrcode'>QRcode></li>`;
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
         <button type='button' class='btn-Mof'>EDIT</button> <button type='button' class='btn-Sup'>Supprimer</button>
         <button type='button' class='qrcode'>QRcode></li>`;
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

  modif.forEach(
    (element, index) => {
      element.addEventListener("click", () => {
        if (element.innerText.toLowerCase() == "edit") {
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
          inventaire[index].marge =
            (inputPrixVente[index].value / inputPrixAchate[index].value) * 100;
          inventaire[index].prixVenteTtc = inputPrixVente[index].value * 1.2;
          inventaire[index].type = inputType[index].value;
        }
        if (inventaire[index].type === "nonAlco") {
          inputDegre[index].value = undefined;
        }
        inventaire[index].degre = inputDegre[index].value;

        render(inventaire);
        console.log(inventaire);

        function ff_qrcode_gen_action(element, action) {
          switch (action) {
            case "click":
              inputBoisson;
              inputQuantite;
              inputPrixAchated;
              inputPrixVented;
              inputMarged;
              inputPrixVenteTtc;
              inputType;
              inputDegre;

              url = encodeURI(url);
              // encodage de l'url pour la compréhension de certains caractères
              QrCode =
                "https://chart.googleapis.com/chart?cht=qr&chs=250x250&chld=L|1&chl=" +
                url;
              QrCode =
                "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" +
                url;
              document.getElementById("qrCodeImg").setAttribute("src", _qrCode);
              document.getElementById("qrcode").style.visibility = "visible";
              break;
            default:
          }
        }
      });
    },
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
    }
  );
}
