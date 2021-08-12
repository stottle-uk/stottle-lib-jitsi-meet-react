import { ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { scanState, typeOf } from '../models/events/action';
import {
  JitsiConferenceEvents,
  JitsiConferenceEventTypes
} from '../models/events/conference';
import { JitsiMeetService } from './jitsiMeetService';
import {
  PasswordStateActions,
  SetPasswordRequired
} from './reducers/passwordActions';
import {
  passwordInitialState,
  passwordReducer
} from './reducers/passwordReducer';

export class JitsiPasswordStateService {
  private events$ = this.jitsiService.conferenceEvents$.pipe(
    typeOf(
      JitsiConferenceEventTypes.ConferenceFailed,
      JitsiConferenceEventTypes.Joined
    ),
    tap(event => this.handleEvents(event))
  );

  private stateInner$ = new ReplaySubject<PasswordStateActions>(1);
  state$ = this.stateInner$.pipe(
    scanState(passwordReducer, passwordInitialState)
  );

  constructor(private jitsiService: JitsiMeetService) {}

  init() {
    this.events$.subscribe();
  }

  lockRoom(password: string) {
    this.jitsiService.lockRoom(password).subscribe();
  }

  private handleEvents(event: JitsiConferenceEvents) {
    switch (event.type) {
      case JitsiConferenceEventTypes.ConferenceFailed:
        if (event.payload === 'conference.passwordRequired') {
          this.stateInner$.next(new SetPasswordRequired(true));
        }
        break;
      case JitsiConferenceEventTypes.Joined:
        this.stateInner$.next(new SetPasswordRequired(false));
        break;
    }
  }
}
