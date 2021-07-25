import { map } from 'rxjs/operators';
import { scanState } from '../models/events/action';
import { JitsiMeetService } from './jitsiMeetService';
import { SetChatMessages } from './reducers/chatActions';
import {
  chatInitialState,
  chatReducer,
  JitsiChatMessage
} from './reducers/chatReducer';

export class JitsiChatStateService {
  private readonly CHAT_COMMAND_TYPE = 'command.chatMessages';

  constructor(private jitsiService: JitsiMeetService) {}

  listen() {
    return this.jitsiService.addCommandListener(this.CHAT_COMMAND_TYPE).pipe(
      map(
        values =>
          new SetChatMessages({
            message: values.value,
            authorId: parseInt(`${values.attributes.authorId}`),
            authorName: `${values.attributes.authorName}`
          })
      ),
      scanState(chatReducer, chatInitialState)
    );
  }

  send(message: JitsiChatMessage) {
    this.jitsiService.sendCommandOnce(this.CHAT_COMMAND_TYPE, {
      value: message.message,
      attributes: {
        authorId: message.authorId,
        authorName: message.authorName
      }
    });
  }
}
