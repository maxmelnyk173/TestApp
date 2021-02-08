import {Category} from './Category';

export interface Product{
    productId : string;
    productName: string;
    version: string;
    size: number;
    companyName: string;
    url: string;
    vendorContact: string;
    releasedOn: Date;
    categories: Array<Category>;
}