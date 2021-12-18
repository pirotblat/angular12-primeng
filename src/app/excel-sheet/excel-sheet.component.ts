import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excel-sheet',
  templateUrl: './excel-sheet.component.html',
  styleUrls: ['./excel-sheet.component.css']
})
export class ExcelSheetComponent implements OnInit {

  data: [][] = [];
  columns: [] = [];
  constructor() { }

  ngOnInit(): void {
  }

  onFileChange(evt: any) {
    const target: DataTransfer = evt.target as DataTransfer;
    if(target.files.length !==1) throw new Error('Cannot use multipul files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
      const wsName: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsName];
      this.data = XLSX.utils.sheet_to_json(ws, {header: 1});
      this.columns = this.data[1];
      console.log(this.columns);
    };
    reader.readAsBinaryString(target.files[0]);
  }

}
