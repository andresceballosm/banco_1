export function getCreditCardNameByNumber(number : any) {
    const CREDIT_CARD_LIST = [
        {
          name: 'Diners',
          regexpFull: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/
        }, {
          name: 'Discover',
          regexpFull: /^6(?:011|5[0-9]{2}|4[4-9][0-9]{1}|(22(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[01][0-9]|92[0-5]$)[0-9]{10}$))[0-9]{12}$/
        },{
          name: 'Amex',
          regexpFull: /^3[47][0-9]{13}$/
        },{
          name: 'Mastercard',
          regexpFull: /^(5[1-5][0-9]{14}|2221[0-9]{12}|222[2-9][0-9]{12}|22[3-9][0-9]{13}|2[3-6][0-9]{14}|27[01][0-9]{13}|2720[0-9]{12})$/
        }, {
          name: 'Visa',
          regexpFull: /^4[0-9]{12}(?:[0-9]{3})?$/
        }
    ];
    const INVALID_CARD_MESSAGE = 'Credit card is invalid!';

    for (let i = 0; i < CREDIT_CARD_LIST.length; i++) {
      let creditcard = CREDIT_CARD_LIST[i];
      if (creditcard.regexpFull.test(number))
        return creditcard.name;
    }

    return INVALID_CARD_MESSAGE;
};

export function validateIconCreditCard(brand : string) {
  switch (brand) {
    case 'Visa':
        return require('../../assets/icons/visa.png')   
    case 'Mastercard':
        return require('../../assets/icons/mastercard.png')   
    default:
      return require('../../assets/icons/ahorro.png') ;
  }
};

export function maskCreditCard( number : number ) {
  const r = /\b(?:\d{4}[ -]?){3}(?=\d{4}\b)/gm
  const subst = `**** **** **** `
  return number.toString().replace(r, subst);
}