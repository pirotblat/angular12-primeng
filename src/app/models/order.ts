export interface Order {
  id?:string;
  productCode?:string;
  date?: Date;
  amount?:number;
  quantity?:number;
  customer?:string;
  status?:string;
  productId?:number;
}
