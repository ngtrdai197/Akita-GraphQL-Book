import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ConversationGqlService, MessageGqlService } from '@/core/services';
import { IMessageNode } from '@/shared/interfaces';
import { MessageNodeQuery } from './state/message-node/message-node.query';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationComponent implements OnInit {
  public address = '';
  private id: string;
  public messageNode$: Observable<IMessageNode>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private conversationGqlService: ConversationGqlService,
    private messageGqlService: MessageGqlService,
    private messageNodeQuery: MessageNodeQuery
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.loadConversation();
    });
    this.subscribeMessageNode();
  }

  private subscribeMessageNode() {
    this.conversationGqlService.subscribeConversation(this.id);
  }

  private loadConversation() {
    this.conversationGqlService.loadConversation({
      id: this.id,
      limit: 10,
      skip: 0
    });
    this.messageNode$ = this.messageNodeQuery.select();
  }

  public calculateTimes(time: Date) {
    const dateNow = new Date(Date.now());
    const diff = dateNow.getTime() - new Date(time).getTime();
    let msec = diff;

    const hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    const mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    const ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    let timeString = '';
    if (hh !== 0 && mm !== 0) {
      return (timeString =
        ss === 0
          ? `${hh <= 9 ? '0' + hh : hh}h ${mm <= 9 ? '0' + mm : mm}m ago`
          : `${hh <= 9 ? '0' + hh : hh}h ${mm <= 9 ? '0' + mm : mm}m ${
              ss <= 9 ? '0' + ss : ss
            }s ago`);
    }

    if (hh === 0) {
      if (mm === 0) {
        return (timeString =
          ss === 0 ? 'now' : `${ss <= 9 ? '0' + ss : ss}s ago`);
      }
      return (timeString =
        ss === 0
          ? `${mm <= 9 ? '0' + mm : mm}m ago`
          : `${mm <= 9 ? '0' + mm : mm}m ${ss <= 9 ? '0' + ss : ss}s ago`);
    }
    if (mm === 0) {
      return (timeString =
        ss === 0
          ? 'now'
          : `$${hh <= 9 ? '0' + hh : hh}h ${ss <= 9 ? '0' + ss : ss}s ago`);
    }
    return (timeString =
      ss === 0
        ? 'now'
        : `${hh <= 9 ? '0' + hh : hh}h ${mm <= 9 ? '0' + mm : mm}m ${
            ss <= 9 ? '0' + ss : ss
          }s ago`);
  }

  public receiveNewMessage(message: string) {
    this.messageGqlService.createNewMessage({
      content: message,
      conversationId: this.id
    });
  }
}
