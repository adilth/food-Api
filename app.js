function getFetch() {
  //   const choice = userInput;
  let inputValue = document.getElementById("bracode").value;
  if (inputValue.length !== 12) {
    // alert("pleace ensure");
    let vild = document.querySelector("p");
    vild.innerText = "please ensure to enter 12 number";
    document.getElementById("bracode").style.border = "2px solid red";
    return;
  }
  const url = `https://world.openfoodfacts.org/api/v0/product/${inputValue}.json`;

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
      if (data.status === 1) {
        //calladdition stuff
        const item = new ProductInfo(data.product);
        item.showInfo();
        item.listIngredients();
      } else if (data.status == 0) {
        //
        alert(`the choice is not ${inputValue} good`);
      }
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

class ProductInfo {
  constructor(productData) {
    //passing in data.product
    this.name = productData.product_name;
    this.ingredients = productData.ingredients;
    this.image = productData.image_url;
  }
  showInfo() {
    document.getElementById("product-img").src = this.image;
    document.getElementById("product-name").innerHTML = this.name;
  }
  listIngredients() {
    let table = document.getElementById("ingredient-table");
    for (let i = 1; i < table.rows.length; i++) {
      table.deleteRow(i);
    }
    for (let key in this.ingredients) {
      let newRow = table.insertRow(-1);
      let newiCell = newRow.insertCell(0);
      let newVCell = newRow.insertCell(1);
      let newVgCell = newRow.insertCell(2);
      let newIText = document.createTextNode(this.ingredients[key].text);
      let vegStatus = !this.ingredients[key].vegetarian
        ? "unknown"
        : this.ingredients[key].vegetarian;
      let veganStatus = !this.ingredients[key].vegan
        ? "unknown"
        : this.ingredients[key].vegan;
      let newVText = document.createTextNode(vegStatus);
      let newVgText = document.createTextNode(veganStatus);
      newiCell.appendChild(newIText);
      newVCell.appendChild(newVText);
      newVgCell.appendChild(newVgText);
      if (vegStatus === "no") {
        newVCell.classList.add("non-veg-item");
      } else if (vegStatus === "unknown" || vegStatus === "maybe") {
        newVCell.classList.add("unknown-maybe-item");
      }
    }
  }
}

//011110038364 - tortilla soup, found 041196910759 - Progresso soup, found 070164008235 - Matzo soup, found
