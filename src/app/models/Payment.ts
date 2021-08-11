export class Payment{
    id:number;
    typeId:number;
    userId:number;
    collectionSum:number;
    currencyId:number;
    exchangeRate:number;
    fee:number;
    feeDescriptionId:number;
    paymentDate :Date;
    paymentMethodId:number;
    comments:string;
    bankId:number;
    branchNumberId:number;
    accountNumber:number;
    directDebitId:number;
    reference:number;
    inputDate:Date;
    hebrewPaymentDate:string;
    deleted:number;
    creditCardId:number;
}

