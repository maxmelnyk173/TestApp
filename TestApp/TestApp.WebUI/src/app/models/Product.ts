import {Category} from './Category';

export interface Product{
    ProductId : string;
    ProductName: string;
    Size: number;
    CompanyName: string;
    URL: string;
    VendorContact: string;
    ReleasedOn: string;
    Categories: Array<Category>;
}