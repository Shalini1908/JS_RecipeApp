const BASE_URL = "http://localhost:8080";

// Function to fetch recipes from the JSON Server
async function fetchRecipes() {
  const res = await fetch(`${BASE_URL}/recipes`);
  const recipes = await res.json();
  return recipes;
}

// Function to add a new recipe
const addRecipe = async()=>{
  const recipeName = document.getElementById("recipeName").value;
  const recipeType = document.getElementById("recipeType").value;
  const recipeDescription = document.getElementById("recipeDescription").value;

  if (recipeName === "" || recipeType === "" || recipeDescription === "") {
    alert("Please fill in all the fields");
    return; // Exit the function if any field is empty
  }

  const newRecipe = {
    name: recipeName,
    type: recipeType,
    description: recipeDescription,
  };

  const res = await fetch(`${BASE_URL}/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRecipe),
  });

  if (res.ok) {
    alert("Recipe added successfully!");
    clearForm();
    loadRecipes();
  } else {
    alert("Failed to add recipe.");
  }
}

// Function to delete a recipe
const deleteRecipe = async(recipeId)=>{
  const res = await fetch(`${BASE_URL}/recipes/${recipeId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    alert("Recipe deleted successfully!");
    loadRecipes();
  } else {
    alert("Failed to delete recipe.");
  }
}

const loadRecipes = async()=> {
  const recipes = await fetchRecipes();
  const recipeItems = document.getElementById("recipeItems");
  recipeItems.innerHTML = "";

  recipes.forEach((recipe) => {
    const listItem = document.createElement("ul");

    listItem.style.boxShadow = "rgba(149, 157, 165, 0.2) 0px 8px 24px";
    listItem.style.padding = "20px";
    listItem.style.display = "flex";
    listItem.style.flexDirection = "column";
    listItem.style.margin = "auto";
    listItem.style.width = "340px";
    listItem.style.height = "200px";
    listItem.style.fontSize = "20px";

    const recipeDetails = document.createElement("li");
    recipeDetails.style.listStyle = "none";

    recipeDetails.innerHTML = `
      Recipe: ${recipe.name},
      Type: ${recipe.type},
      Description: ${recipe.description}
    `;

    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.width = "350px";
    buttonContainer.style.height = "68px";
    buttonContainer.style.justifyContent = "space-between";

    buttonContainer.style.margin = "auto";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.border = "none";
    deleteButton.style.backgroundColor = "red";
    deleteButton.style.color = "white";
    deleteButton.style.margin = "auto";
    deleteButton.style.padding = "8px 16px";
    deleteButton.style.textAlign = "center";
    deleteButton.style.textDecoration = "none";
    deleteButton.style.marginTop = "8px";
    deleteButton.style.fontSize = "16px";
    deleteButton.style.width = "100px";
    deleteButton.style.height = "40px";
    deleteButton.style.cursor = "pointer";

    deleteButton.addEventListener("click", () => {
      deleteRecipe(recipe.id);
    });

    const updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.style.backgroundColor = "#4CAF50";
    updateButton.style.border = "none";
    updateButton.style.color = "white";
    updateButton.style.padding = "8px 16px";
    updateButton.style.textAlign = "center";
    updateButton.style.textDecoration = "none";
    updateButton.style.marginTop = "8px";
    updateButton.style.fontSize = "16px";
    updateButton.style.width = "100px";
    updateButton.style.height = "40px";
    updateButton.style.cursor = "pointer";

    updateButton.addEventListener("click", () => {
      updaterecipe(recipe.id);
    });

    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(updateButton);

    listItem.appendChild(recipeDetails);
    listItem.appendChild(buttonContainer);
    recipeItems.appendChild(listItem);
  });
}

// Function to update the recipe name , type and description
const updaterecipe = async(id)=> {
  const newName = window.prompt("Enter new name for the recipe");
  const newType = window.prompt("Enter new type for the recipe");
  const newDescription = window.prompt("Enter new description for the recipe");

  const update = {};

  if (newName !== null) {
    update.name = newName;
  }

  if (newType !== null) {
    update.type = newType;
  }

  if (newDescription !== null) {
    update.description = newDescription;
  }

  await fetch(`${BASE_URL}/recipes/${id}`, {
    method: "PATCH",
    body: JSON.stringify(update),
    headers: {
      "Content-Type": "application/json",
    },
  });

  loadRecipes();
}

// Function to clear the recipe form
function clearForm() {
  document.getElementById("recipeName").value = "";
  document.getElementById("recipeType").value = "";
  document.getElementById("recipeDescription").value = "";
}

// Load recipes when the page loads
window.onload = function () {
  loadRecipes();
};


