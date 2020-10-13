import { SalesDetails } from './sales-details.model';

export class Sales {
    ID:number;
    InvoiceNo :string;
    CustomerName :string;
    ContactNo :string;
    ContactAddress :string
    InvoiceDate :Date;
    TotalAmount:number;
    PaymentType :string;
    PayedAmount:number;
    DueDate:string;
    BalanceAmt:number;
    salesDetailModels:SalesDetails[];
}
