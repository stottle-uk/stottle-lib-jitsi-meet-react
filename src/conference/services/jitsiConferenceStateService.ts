import { merge, ReplaySubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { scanState, typeOf } from '../models/events/action';
import {
  JitsiConferenceEvents,
  JitsiConferenceEventTypes
} from '../models/events/conference';
import { JitsiMeetService } from './jitsiMeetService';
import {
  AuthStatusChanged,
  ConferenceStateActions,
  SetCreatedTimestamp,
  SetJoined,
  SetKicked,
  SetLeft
} from './reducers/conferenceActions';
import {
  conferenceInitialState,
  conferenceReducer
} from './reducers/conferenceReducer';

export class JitsiConferenceStateService {
  private userLeft$ = this.jitsiService.conferenceEvents$.pipe(
    typeOf(JitsiConferenceEventTypes.Left, JitsiConferenceEventTypes.kicked),
    switchMap(() => this.jitsiService.disconnect())
  );
  private events$ = this.jitsiService.conferenceEvents$.pipe(
    typeOf(
      JitsiConferenceEventTypes.CreatedTimestamp,
      JitsiConferenceEventTypes.Joined,
      JitsiConferenceEventTypes.Left,
      JitsiConferenceEventTypes.kicked,
      JitsiConferenceEventTypes.AuthStatusChanged
    ),
    tap(event => this.handleEvents(event))
  );

  private stateInner$ = new ReplaySubject<ConferenceStateActions>(1);
  state$ = this.stateInner$.pipe(
    scanState(conferenceReducer, conferenceInitialState)
  );

  constructor(private jitsiService: JitsiMeetService) {}

  init() {
    merge(this.userLeft$, this.events$).subscribe();
  }

  joinConference(username: string, password?: string) {
    this.jitsiService.joinConference(username, password).subscribe();
  }

  leaveConference() {
    this.jitsiService.leaveConference().subscribe();
  }

  private handleEvents(event: JitsiConferenceEvents) {
    switch (event.type) {
      case JitsiConferenceEventTypes.AuthStatusChanged:
        const [authEnabled, authIdentity] = event.payload;
        this.stateInner$.next(
          new AuthStatusChanged({ authEnabled, authIdentity })
        );
        break;
      case JitsiConferenceEventTypes.CreatedTimestamp:
        this.stateInner$.next(new SetCreatedTimestamp(event.payload));
        break;
      case JitsiConferenceEventTypes.Joined:
        this.stateInner$.next(new SetJoined(event.payload));
        break;
      case JitsiConferenceEventTypes.Left:
        this.stateInner$.next(new SetLeft());
        break;
      case JitsiConferenceEventTypes.kicked:
        this.stateInner$.next(new SetKicked());
        break;
    }
  }
}
