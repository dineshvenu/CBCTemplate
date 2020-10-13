import { PurchaseDetails } from './purchase-details.model';

export class Purchase {
    ID:number;
    PuchaseNo :string;
    SupplierID :string;
    PurchaseDate :Date;
    PurchasedAmt :string;
    PaidAmount :number;
    BalanceAmount :string;
    SupplierName:string;
    purchaseDtlModels:PurchaseDetails[];
}
