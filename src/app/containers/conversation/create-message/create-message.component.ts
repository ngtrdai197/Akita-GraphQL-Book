import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss']
})
export class CreateMessageComponent implements OnInit {
  @Output() emitNewMessage = new EventEmitter<string>();
  inputMessage = '';
  constructor() {}

  ngOnInit(): void {}

  sendMessage() {
    this.emitNewMessage.emit(this.inputMessage);
    this.inputMessage = '';
  }
}
