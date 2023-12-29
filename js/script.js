const searchBox = document.querySelector(".searchBox")
const searchBtn = document.querySelector(".searchBtn")
const recipeContainer = document.querySelector(".recipeContainer")
const recipedetailcontent = document.querySelector(".recipe-detail-content")
const closerecipe = document.querySelector(".close-recipe")

// function to get recipe
const fetchRecipe = async (query) => {
    recipeContainer.innerHTML = `<h2>loading recipes...</h2>`
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        const response = await data.json();

        recipeContainer.innerHTML = ""
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement("div")
            recipeDiv.setAttribute("class", "recipe");
            recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span>Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> category</p>
        `
            const button = document.createElement("button")
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button)
            // adding event listener to our recipe button
            button.addEventListener("click", () => {
                openRecipePopup(meal);
            })

            recipeContainer.appendChild(recipeDiv)
        });

    } catch (error) {
        alert("there's no recipe with such name")
    }
}

const fetchIngredients = (meal) => {
    let IngredientsList = ""
    for (i = 1; i <= 20; i++) {
        const Ingredient = meal[`strIngredient${i}`];
        if (Ingredient) {
            const measure = meal[`strMeasure${i}`];
            IngredientsList += `<li>${measure} ${Ingredient}</li>`
        }
        else {
            break;
        }
    }
    return IngredientsList
}
const openRecipePopup = (meal) => {
    recipedetailcontent.innerHTML = `
    <h2 class="recipe-name">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredient-list">${fetchIngredients(meal)}</ul>
    <div  class="recipe-instructions">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    `
    recipedetailcontent.parentElement.style.display = "block";
}

closerecipe.addEventListener("click", () => {
    recipedetailcontent.parentElement.style.display = "none";
})

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (searchBox.value == "") {
        alert("Write something to search")
    }
    else {
        const searchInput = searchBox.value.trim();
        fetchRecipe(searchInput);
    }
});