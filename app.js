// Search Button
const button = document.getElementById('searchButton');
// Meal Name or First Word
const mealHolder = document.getElementById('meal');
// Result
const resultHolder = document.getElementById('Result');

// Search Button
button.addEventListener('click', (event) => {
    event.preventDefault();
    const Input = document.getElementById('Search').value;
    loadData(Input);
});

function loadData(Input) {
    let url = "";
    if (Input.length === 1) {
        // Food Api
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${Input}`;
        mealHolder.innerHTML = null;
        resultHolder.innerHTML = null;
    }
    // Food Api
    else {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${Input}`;
        mealHolder.innerHTML = null;
        resultHolder.innerHTML = null;
    }
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayData(data)
        })
        .catch(error => displayError('Something Went Wrong 😵!! Please Try After Sometime'));

}
const displayData = data => {
    data.meals.forEach(element => {
        const div = document.createElement('div');
        const food = `
        <div class="col">
            <div class="card h-100">
                <img class="card-img-top" src="${element.strMealThumb}"/>
                <div class="card-body">
                    <h4 class="card-title mx-auto">${element.strMeal}</h4>
                    <button class="btn details" onclick="displayMealDetails('${element.strMeal}')">Know More</button>
                </div>
            </div>
        </div> `;
        div.innerHTML = food;
        mealHolder.appendChild(div);
    });
}

const displayMealDetails = (mealDetails) => {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealDetails}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Only String Name Allowed : ', mealDetails);
            resultHolder.style.display = "block"
            const div = document.createElement('div');
            let element;
            let mealInfo;
            for (let i = 0; i < data.meals.length; i++) {
                element = data.meals[i];
                if (mealDetails === element.strMeal) {
                    mealInfo = `
                    <img src="${element.strMealThumb}" class="card-img-top">
                    <div class="card-body">
                    <h3 class="card-title">${element.strMeal}</h3>
                    <p>Things You Need For This:</p>
                    <ul>                    
                        <li>${element.strIngredient1}</li>
                        <li>${element.strIngredient2}</li>
                        <li>${element.strIngredient3}</li>
                        <li>${element.strIngredient4}</li>
                        <li>${element.strIngredient5}</li>
                        <li>${element.strIngredient6}</li>
                        <li>${element.strIngredient7}</li>
                        <li>${element.strIngredient8}</li>
                        <li>${element.strIngredient9}</li>
                        <li>${element.strIngredient10}</li>
                    </ul>
                    </div> `;
                }
            }
            div.innerHTML = mealInfo;
            resultHolder.appendChild(div);
        });
    resultHolder.innerHTML = null;
}
const displayError = error => {
    const errorTag = document.getElementById('error-messages');
    errorTag.innerText = error;
}