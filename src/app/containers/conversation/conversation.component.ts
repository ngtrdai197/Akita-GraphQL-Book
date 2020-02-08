import { Component, OnInit } from '@angular/core';
import { ConversationGqlService, MessageGqlService } from '@/core/services';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { IMessageNode } from '@/shared/interfaces';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  public address = '';
  private conversationId: string;
  public messageNode: IMessageNode;
  constructor(
    private activatedRoute: ActivatedRoute,
    private conversationGqlService: ConversationGqlService,
    private messageGqlService: MessageGqlService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(
        switchMap(params => {
          this.conversationId = params.get('id');
          return this.conversationGqlService.subscribeConversation(
            this.conversationId
          );
        })
      )
      .subscribe(data => {
        this.messageNode.messages.push(data['message']);
      });
    this.loadConversation();
  }

  private loadConversation() {
    this.conversationGqlService
      .loadConversation({
        id: this.conversationId,
        limit: 10,
        skip: 0
      })
      .subscribe(response => {
        this.messageNode = response;
      });
  }

  public receiveNewMessage(message: string) {
    this.messageGqlService.createNewMessage({
      content: message,
      conversationId: this.conversationId
    });
  }
}
