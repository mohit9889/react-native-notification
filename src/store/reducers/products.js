import { SETFOOD, REMOVEFOOD, ADDFOOD } from "../actions/products"

const initialState = {
    products: [],
    cart: []
};

export default (state = initialState, action) => {
  switch (action.type){
    case SETFOOD:
      return{
        ...state,
        products: state.products.concat(action.products)
      };
    case REMOVEFOOD:
      return{
        ...state,
        cart: state.cart.filter(item => item.idCategory !== action.prodID)
      };
    case ADDFOOD:
      return{
        ...state,
        cart: state.cart.concat(action.product)
      };
    default:
      return state;
  }
} 