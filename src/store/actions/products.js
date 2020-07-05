const foodUrl = "https://www.themealdb.com/api/json/v1/1/categories.php";

export const SETFOOD = "SETFOOD";
export const ADDFOOD =  "ADDFOOD";
export const REMOVEFOOD = "REMOVEFOOD";

export const setFood = () => {
    return async dispatch => {
        const response = await fetch(foodUrl);
        
        if (!response.ok) {
            throw new Error('Can not process your request...');
        }

        const resData = await response.json();
        //console.log(resData.categories);

        dispatch({ type: SETFOOD, products: resData.categories });
    }
}

export const addFood = (product) => {
    return dispatch => {
        dispatch({ type: ADDFOOD, product: product })
    }
}