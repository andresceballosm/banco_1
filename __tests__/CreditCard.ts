import { getCreditCardNameByNumber, validateIconCreditCard, maskCreditCard } from "../src/utils/CreditCard";

test('Brand credit card validation, expect = Visa', () => {
    expect(getCreditCardNameByNumber(4242424242424242)).toBe('Visa');
});

test('Brand credit card validation, expect = Master', () => {
    expect(getCreditCardNameByNumber(5555555555554444)).toBe('Mastercard');
});

test('Brand credit card validation, expect = Invalid', () => {
    expect(getCreditCardNameByNumber(5555555555554)).toBe('Credit card is invalid!');
});

test('Mask number credit card validation, expect = Visa', () => {
    expect(maskCreditCard(4242424242424242)).toBe('**** **** **** 4242');
});

test('Mask number credit card validation, expect = Master', () => {
    expect(maskCreditCard(5555555555554444)).toBe('**** **** **** 4444');
});

test('Icon credit card validation, expect = Route visa icon', () => {
    expect(validateIconCreditCard('Visa')).toMatchObject({"testUri": "../../../assets/icons/visa.png"});
});

test('Icon credit card validation, expect = Route Master icon', () => {
    expect(validateIconCreditCard('Mastercard')).toMatchObject({"testUri": "../../../assets/icons/mastercard.png"});
});

test('Icon credit card validation, expect = Route Default icon', () => {
    expect(validateIconCreditCard('Brand')).toMatchObject({"testUri": "../../../assets/icons/ahorro.png"});
});


