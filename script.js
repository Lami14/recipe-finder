const form = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultsSection = document.getElementById("results");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();

  if (!query) return;

  resultsSection.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await res.json();

    if (!data.meals) {
      resultsSection.innerHTML = "<p>No recipes found. Try another search.</p>";
      return;
    }

    displayRecipes(data.meals);
  } catch (error) {
    resultsSection.innerHTML = "<p>Error fetching recipes.</p>";
    console.error(error);
  }
});

function displayRecipes(meals) {
  resultsSection.innerHTML = meals
    .map(
      (meal) => `
      <div class="recipe">
        <h3>${meal.strMeal}</h3>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <p><a href="${meal.strSource || '#'}" target="_blank">View Recipe</a></p>
      </div>
    `
    )
    .join("");
}
