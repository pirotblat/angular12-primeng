import { Component, OnInit } from '@angular/core';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  faPencilAlt = faPencilAlt;
  faTimes = faTimes;
  faCheck = faCheck;
  isEdit = false;
  isEditD = false;
  takziv = 1200000;
  takzivTemp = 1200000;
  dateEnd = new Date();
  dateEndTemp = new Date();
  // strDate = '';
  constructor() { }

  ngOnInit(): void {

  }
  onEdit() {
    this.isEdit = true;
  }
  onCancel() {
    this.isEdit = false;
    this.takzivTemp = this.takziv;
  }
  onOk() {
    this.isEdit = false;
    this.takziv = this.takzivTemp;
  }
  onEditD() {
    this.isEditD = true;
  }
  onCancelD() {
    this.isEditD = false;
    this.dateEndTemp = this.dateEnd;
  }
  onOkD() {
    this.isEditD = false;
    this.dateEnd = this.dateEndTemp;
  }

}
