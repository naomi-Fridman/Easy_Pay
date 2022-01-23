import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-success-alert',
  templateUrl: './success-alert.component.html',
  styleUrls: ['./success-alert.component.css']
})
export class SuccessAlertComponent implements OnInit {

  constructor() { }
  @Output() close = new EventEmitter<any>();
  @Input()details;
  public closeTheAlert(): void {
    this.close.emit();
  }
  ngOnInit() {
  }

}
