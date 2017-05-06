import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  @Input() message: string;
  @Input() style: string;

  @Output() confirmMessage = new EventEmitter<boolean>();
    onConfirm(confirm: boolean){
        this.confirmMessage.emit(confirm);
    }

  constructor() { }

  ngOnInit() {
  }

  private confirm(confirm: boolean) {
    this.onConfirm(confirm);
  }

}
