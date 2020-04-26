import CONSTANTS from '../CONSTANTS';
import { Product } from '../../models/product';

const initialProducts = require('../../data/data.json');

const initialState = {
  ...initialProducts,
  loading : false
}

function Reducers (state = initialState, action : any){
  switch (action.type) {
    case CONSTANTS.SHOW_OTHERS_PRODUCTS:
      return { 
        ...state, 
        ...initialProducts,
        loading : false
      }
    case CONSTANTS.HIDE_OTHERS_PRODUCTS:
      let products = initialProducts.product.filter((product : Product) => product.accountInformation.bank === 'BANCO_1');
      return { 
        ...state, 
        product : products,
        loading : false
      }
    case CONSTANTS.SET_LOADING:
      return { loading: true }
    case CONSTANTS.STOP_LOADING:
      return { loading: false }
    default:
      return state
  }
}

export default Reducers