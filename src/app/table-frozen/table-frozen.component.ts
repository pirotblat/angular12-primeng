import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customers.service';

@Component({
  selector: 'app-table-frozen',
  templateUrl: './table-frozen.component.html',
  styleUrls: ['./table-frozen.component.css']
})
export class TableFrozenComponent implements OnInit {

  customers: Customer[] =[];
  balanceFrozen: boolean = false;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getCustomersMedium().then(customers => this.customers = customers);
  }

  formatCurrency(value: any) {
    return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
}

}
