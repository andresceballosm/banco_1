import cloneDeep from 'lodash/fp/cloneDeep';
import CONSTANTS from '../src/store/CONSTANTS';
import * as Actions from '../src/store/actions/ActionApp';
import Reducers from '../src/store/reducers/RootReducer';

const initialProducts = require('../src/data/data.json');

describe('Reducers', () => {
    let initState : any;

    beforeEach(() => {
        initState = {
            ...initialProducts,
            loading : false
        };
    });

    describe('General Actions', () => {
        it('Return initialState', () => {
            const now = Reducers(initState, {});
            const expected = initState;

            expect(now).toEqual(expected)
        })
        it(`${CONSTANTS.SET_LOADING} Return expected object set loading.`, () => {
            const now = Reducers(initState, Actions.ActionSetLoading()) 
            const expected = { loading : true }
            expect(now).toEqual(expected);
        })
        it(`${CONSTANTS.STOP_LOADING} Return expected object stop loading.`, () => {
            const now = Reducers(initState, Actions.ActionStopLoading()) 
            const expected = { loading : false }
            expect(now).toEqual(expected);
        })

        it(`${CONSTANTS.SHOW_OTHERS_PRODUCTS} Return object with all products.`, () => {
            const mockState = cloneDeep(initState);
            const now = Reducers(mockState, Actions.ActionShowOthersProducts());
            expect(now.product.length).toEqual(32);
        })

        it(`${CONSTANTS.HIDE_OTHERS_PRODUCTS} Return object only with products banco_1.`, () => {
            const mockState = cloneDeep(initState);
            const now = Reducers(mockState, Actions.ActionHideOthersProducts());
            expect(now.product.length).toEqual(23);
        })
    })
});