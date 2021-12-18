import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { DataType } from '../models/data-type';
import { PostsService } from '../posts.service';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { TranslateConfigService } from '../services/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../auth/user.model';
import { AuthService } from '../services/auth.service';
// import { Car } from '../models/car';
// import cars from '../_files/cars.json';

@Component({
  selector: 'app-primeng-table',
  templateUrl: './primeng-table.component.html',
  styleUrls: ['./primeng-table.component.css'],
  providers: [MessageService]
})
export class PrimengTableComponent implements OnInit {

  // @ViewChild('htmlData',{static: true}) htmlData:ElementRef | undefined;
  @ViewChild('htmlData') htmlData:ElementRef | undefined;

  users: any[] = [];

  first = 0;
  rows = 10;
  totalRecords = 0;
  posts: any[] = [];
  // posts: [{ [s: string]: any; }] = [{}];
  posts2: any[] = [];
  clonedPosts: { [s: string]: any; } = {};
  columns: string[] = [];
  columnsTypes: DataType[] = [];
  loading: boolean = false;
  selectedPosts: any[] = [];
  exportColumns: any[] = [];
  data: [][] = [];
  dataNoHeader: [][] = [];
  columns1: string[] = [];
  email_res = 'pirotblat@gmail.com';

  // cars: Car[] = cars.data;
  // cols: any[] = [];
  // statuses: SelectItem[] = [];

  constructor(private postService: PostsService,
              private messageService: MessageService,
              private translateService: TranslateService,
              private auth: AuthService
              // private srvT: TranslateConfigService
              ) { }

  ngOnInit(): void {
    this.changeLanguage('he');
    // this.postService.getPosts().subscribe(p => {
    //   this.posts = p;
    //   this.posts2 = p;
    //   this.loading = false;
    //   if(this.posts.length>0) {
    //     this.totalRecords = this.posts.length;
    //     this.columns = Object.keys(this.posts[0]);
    //     for(var i = 0; i< this.columns.length; i++) {
    //       const col:DataType = {
    //         name: Object.keys(this.posts[0])[i],
    //         type: typeof Object.values(this.posts[0])[i]
    //       };
    //       this.columnsTypes.push(col);
    //     }
    //     this.exportColumns = this.columns.map(col => ({title: col, dataKey: col}));
    //   }
    //   // console.log(this.columnsTypes);
    // });
  }

  // changeLang(type: string) {
  //   this.srvT.changeLanguage(type);
  // }

  getUsers() {
    this.auth.getUsers()
    .subscribe(u => {
      console.log(u);
      this.users = u;
    });
  }

  changeLanguage(type: string) {
    this.translateService.use(type);
  }

  onFileChange(evt: any) {
    const target: DataTransfer = evt.target as DataTransfer;
    if(target.files.length !==1) throw new Error('Cannot use multipul files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      this.loading=true;
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
      const wsName: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsName];
      this.data = XLSX.utils.sheet_to_json(ws, {header: 1});
      this.dataNoHeader = this.data.slice(1);
      this.columns = this.data[0];
      this.totalRecords = this.data.length-1;
      this.posts=[];
      this.posts2=[];
      this.columnsTypes = [];
      const res = this.dataNoHeader.map(row => Object.assign({},
        ...this.columns.map((key, i) => ({[key]: row[i]}))
      ));
      // console.log(res);
      this.posts = res;
      this.posts2 = res;

      for(var t = 0; t< this.columns.length; t++) {
        const col:DataType = {
          name: this.columns[t],
          type: typeof this.data[1][t]
        };
        this.columnsTypes.push(col);
      }
      // console.log(this.columnsTypes);
      this.exportColumns = this.columns.map(col => ({title: col, dataKey: col}));
      this.loading=false;
    };
    reader.readAsBinaryString(target.files[0]);
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.posts ? this.first === (this.posts.length - this.rows): true;
  }

  isFirstPage(): boolean {
    return this.posts ? this.first === 0 : true;
  }

  clear(table: Table) {
    table.clear();
  }

  onRowEditInit(post: any) {
    this.clonedPosts[post.id] = {...post};
  }

  onRowEditSave(post: any) {
    delete this.clonedPosts[post.id];
    this.messageService.add({severity:'success', summary: 'Success', detail:'Post is updated'});
    // this.messageService.add({severity:'error', summary: 'Error', detail:'Invalid Price'});
  }

  onRowEditCancel(post: any, index: number) {
    this.posts2[index] = this.clonedPosts[post.id];
    delete this.clonedPosts[post.id];
  }

//   exportPdf1() {
//     import("jspdf").then(jsPDF => {
//         import("jspdf-autotable").then(x => {
//             const doc = new jsPDF.default('p','pt');
//             doc.autoTable(this.exportColumns, this.posts);
//             doc.save('posts.pdf');
//         })
//     })
// }

  exportExcel() {
    import("xlsx").then(xlsx => {
      // const cols: string[] = [];
      // Object.keys(this.posts[0]).forEach(k => {
      //   cols.push(k);
      // });
      // console.log(cols);
      // const colsT: string[] = [];
      // Object.keys(this.posts[0]).forEach(k => {
      //   this.translateService.get(k).subscribe(t => colsT.push(t));
      // });
      // var postsE: any[] = [];
      // // return;
      // let post: { [s: string]: any; } = {};
      // // let post: any = {};
      // this.posts.forEach(p => {
      //   cols.forEach(c=> {
      //     // post[c: p[c]]
      //   });
      //   post[]
      //   Object.keys(this.posts[0]).forEach(k => {
      //     post{[]}
      //     this.translateService.get(k).subscribe(t => {
      //       post = {t: p[k]}
      //     });
      //     postsE.push(post);
      //   })
      // });
      // console.log(postsE);
      const worksheet = xlsx.utils.json_to_sheet(this.posts);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "products");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  public exportPdf():void {
    // let DATA = document.getElementById('htmlData');
    let DATA = this.htmlData;
    // console.log(DATA);

    html2canvas(DATA?.nativeElement).then(canvas => {

        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;

        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

        PDF.save('angular-demo.pdf');
    });
    }

}
