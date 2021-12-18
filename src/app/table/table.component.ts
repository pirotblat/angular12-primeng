import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Customer } from '../models/customer';
import { Product } from '../models/product';
import { CustomerService } from '../services/customers.service';
import { ProductService } from '../services/product.service';
import {LazyLoadEvent} from 'primeng/api';
import { Car } from '../models/car';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {

  // scrollableTableBodyScroll!: () => void;
  // private unlistener!: () => void;

  dateStringControl = new FormControl('');
  scrollableTableHeader!: HTMLElement;
  scrollableTableBody!: HTMLElement;

  products1!: Product[];
  products: Product[] = [];
  customers!: Customer[];

  cars!: Car[];

  virtualCars!: Car[];

  cols!: any[];

  dialogVisible?: boolean;

  scrollableCols!: any[];

  unlockedCustomers!: any[];

  lockedCustomers!: any[];

  balanceFrozen: boolean = false;

  rowGroupMetadata: any;


  constructor(private customerService: CustomerService,
    private productService: ProductService,
    private carService: CarService,
    private el: ElementRef,
    private zone: NgZone,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    this.customerService.getCustomersMedium().then(customers => this.customers = customers);
    this.productService.getProductFromSql().subscribe(data => (this.products1 = data));
    this.productService.getProductOrderFromSql().subscribe(data => {
      if(data.length>0) {
        this.products = data;
      } else {
        const product: Product = data;
        // console.log(product);
        this.products.push(product);
        // console.log(this.products);
      }
    });
    // this.productService.getProductsWithOrdersSmall().then(data => {
    //   this.products = data;
    //   // console.log(this.products);
    // });
    this.cols = [
      {field: 'vin', header: 'Vin'},
      {field: 'year', header: 'Year'},
      {field: 'brand', header: 'Brand'},
      {field: 'color', header: 'Color'}
    ];
    this.customerService.getCustomersMedium().then(data => this.unlockedCustomers = data);

    this.lockedCustomers = [
      {
          id: 5135,
          name: "Geraldine Bisset",
          country: {
              name: "France",
              code: "fr"
          },
          company: "Bisset Group",
          status: "proposal",
          date: "2019-05-05",
          activity: 0,
          representative: {
              name: "Amy Elsner",
              image: "amyelsner.png"
          }
      }
    ];

    this.scrollableCols = [
      { field: 'name', header: 'Name' },
      { field: 'id', header: 'Id' },
      { field: 'date', header: 'Date' },
      { field: 'company', header: 'Company' },
      { field: 'status', header: 'Status' },
      { field: 'activity', header: 'Activity' }
    ];

    this.cars = Array.from({length: 10000}).map(() => this.carService.generateCar());
    this.virtualCars = Array.from({length: 10000});
    // this.strDate = `${this.dateEndTemp.getFullYear()}-${this.pad(this.dateEndTemp.getMonth()+1,2)}-${this.dateEndTemp.getDate()}`;
    // console.log(strDate);
    // console.log(this.dateEndTemp);
    // this.dateStringControl = new FormControl(strDate);
    // this.unlistener = this.renderer.listen("document", "mousemove", event => {
    //   console.log(`I am detecting mousemove at ${event.pageX}, ${event.pageY} on Document!`);
    // });
    // const scrollableTableHeader: HTMLElement = this.el.nativeElement.querySelector('.p-datatable-scrollable-header');
    // const scrollableTableBody: HTMLElement = this.el.nativeElement.querySelector('.p-datatable-scrollable-body');
    // // const scrollableTableHeader: HTMLElement = this.el.nativeElement.querySelector('#scrollH');
    // // const scrollableTableBody: HTMLElement = this.el.nativeElement.querySelector('#scrollB');
    // console.log(scrollableTableHeader);
    // console.log(scrollableTableBody);
    //     this.scrollableTableBodyScroll =  this.renderer.listen(scrollableTableBody, 'scroll', () => {
    //       scrollableTableHeader.scrollLeft = scrollableTableBody.scrollLeft;
    //       console.log('I am scrolling');
    //     });
    // this.scrollableTableBodyScroll =  this.renderer.listen('document', 'scroll', () => {

    //   // this.scrollableTableHeader.scrollLeft = this.scrollableTableBody.scrollLeft;
    //   console.log('I am scrolling');
    // });
  }

  ngAfterViewInit(): void {
    // const scrollableTableHeader: HTMLElement = this.el.nativeElement.querySelector('.p-datatable-scrollable-header');
    // const scrollableTableBody: HTMLElement = this.el.nativeElement.querySelector('.p-datatable-scrollable-body');
    // // const scrollableTableHeader: HTMLElement = this.el.nativeElement.querySelector('#scrollH');
    // // const scrollableTableBody: HTMLElement = this.el.nativeElement.querySelector('#scrollB');
    // console.log(scrollableTableHeader);
    // console.log(scrollableTableBody);
    // this.zone.runOutsideAngular(() => {
    //     this.scrollableTableBodyScroll =  this.renderer.listen(scrollableTableBody, 'scroll', () => {
    //       scrollableTableHeader.scrollLeft = scrollableTableBody.scrollLeft;
    //       // console.log(scrollableTableBody);
    //     });
    // });
    // this.scrollableTableHeader = this.el.nativeElement.querySelector('.p-datatable-scrollable-header');
    // this.scrollableTableBody = this.el.nativeElement.querySelector('.p-datatable-scrollable-body');
    // this.scrollableTableHeader = this.el.nativeElement.getElementsByClassName('p-datatable-scrollable-body');
    // this.scrollableTableBody = this.el.nativeElement.getElementsByClassName('p-datatable-scrollable-body');
    // const scrollableTableHeader: HTMLElement = this.el.nativeElement.querySelector('#scrollH');
    // const scrollableTableBody: HTMLElement = this.el.nativeElement.querySelector('#scrollB');
    // this.scrollableTableBody.addEventListener('scroll', () => {
    //   this.scrollableTableHeader.scrollLeft = this.scrollableTableBody.scrollLeft;
    //   console.log('Pini');
    // });
    // console.log(this.scrollableTableHeader);
    // console.log(this.scrollableTableBody);
    // this.zone.runOutsideAngular(() => {
        // this.scrollableTableBodyScroll =  this.renderer.listen(this.scrollableTableBody, 'scroll', () => {

        //   this.scrollableTableHeader.scrollLeft = this.scrollableTableBody.scrollLeft;
        //   console.log('I am scrolling');
        // });
    // });
    // this.scrollableTableBodyScroll =  this.renderer.listen('document', 'scroll', () => {

    //   // this.scrollableTableHeader.scrollLeft = this.scrollableTableBody.scrollLeft;
    //   console.log('I am scrolling');
    // });
}

  loadCarsLazy(event: LazyLoadEvent) {
    //simulate remote connection with a timeout
    setTimeout(() => {
      //load data of required page
      let loadedCars = this.cars.slice(event.first, (event?.first! + event?.rows!));

      //populate page of virtual cars
      // Array.prototype.splice.apply(this.virtualCars, [...[event?.first!, event.rows], ...loadedCars]);
      Array.prototype.splice.apply(this.virtualCars, [event?.first!, event?.rows!, ...loadedCars]);

      //trigger change detection
      this.virtualCars = [...this.virtualCars];
    }, Math.random() * 1000 + 250);

  }

  showDialog() {
    this.dialogVisible = true;
  }

  toggleLock(data: any, frozen: any, index: any) {
    if (frozen) {
        this.lockedCustomers = this.lockedCustomers.filter((c, i) => i !== index);
        this.unlockedCustomers.push(data);
    }
    else {
        this.unlockedCustomers = this.unlockedCustomers.filter((c, i) => i !== index);
        this.lockedCustomers.push(data);
    }

    this.unlockedCustomers.sort((val1, val2) => {
        return val1.id < val2.id ? -1 : 1;
    });
  }

  calculateCustomerTotal(name: any) {
    let total = 0;

    if (this.customers) {
        for (let customer of this.customers) {
            if (customer?.representative?.name! === name) {
                total++;
            }
        }
    }

    return total;
}

  formatCurrency(value: any) {
    return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
  }

  // pad(num:number, size:number): string {
  //   let s = num+"";
  //   while (s.length < size) s = "0" + s;
  //   return s;
  // }

  ngOnDestroy(): void {
    // this.scrollableTableBodyScroll();
    // this.unlistener();
  }

}
