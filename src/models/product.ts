export interface Product {
    accountInformation : {
        accountIdentifier : string;
        productType : string;
        bank : string;
    };
    locked : boolean;
    id : string;
    typeAccount : string;
    openedDate : string;
    closedDate : string;
    dueDate : string;
    lastTransactionDate : string;
    term : object;
    periodicityOfPayment : object;
    productAccountBalances : object;
};

export function getProductsType( products : [Product] ) {
    let productsTypeArray : Array<any> = [];

    products.forEach((product : Product ) => {
      let productType = product.typeAccount;
      let filter = productsTypeArray.filter(item => item === productType);
      filter.length === 0 ? productsTypeArray.push(productType) : null; 
    });

    return productsTypeArray;
}

export function getTitleTypeProduct( productType : string) {
    switch (productType) {
        case 'CERTIFIED_DEPOSIT_TERM':
            return 'CDT'   
        case 'CREDIT_CARD':
            return 'Tarjeta de Crédito'
        case 'CREDIT':
            return 'Crédito'
        case 'CURRENT_ACCOUNT':
            return 'Cuenta Corriente'
        case 'DEPOSIT_ACCOUNT':
            return 'Cuenta de Ahorros'
        default:
            break;
    }
} 