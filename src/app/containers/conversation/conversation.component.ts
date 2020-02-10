import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ConversationGqlService, MessageGqlService } from '@/core/services';
import { IMessageNode } from '@/shared/interfaces';
import { MessageNodeQuery } from './state/message-node/message-node.query';
import { calculateTimes } from '@/shared/utils';

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

  public formatDateTime(time: Date) {
    return calculateTimes(time);
  }

  public receiveNewMessage(message: string) {
    this.messageGqlService.createNewMessage({
      content: message,
      conversationId: this.id
    });
  }
}
