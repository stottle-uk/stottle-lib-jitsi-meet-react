import { merge, ReplaySubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { scanState, typeOf } from '../models/events/action';
import {
  JitsiConferenceEvents,
  JitsiConferenceEventTypes
} from '../models/events/conference';
import { JitsiConferenceOptions } from '../models/JitsiConference';
import { JitsiMeetService } from './jitsiMeetService';
import {
  ConferenceStateActions,
  SetCreatedTimestamp,
  SetJoined,
  SetKicked,
  SetUserData
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
      JitsiConferenceEventTypes.kicked
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

  joinConference(
    username: string,
    roomname: string,
    options: JitsiConferenceOptions
  ) {
    this.jitsiService.joinConference(roomname, username, options).subscribe();
  }

  leaveConference() {
    this.jitsiService.leaveConference();
  }

  private handleEvents(event: JitsiConferenceEvents) {
    switch (event.type) {
      case JitsiConferenceEventTypes.CreatedTimestamp:
        this.stateInner$.next(new SetCreatedTimestamp(event.payload));
        break;
      case JitsiConferenceEventTypes.Joined:
        this.stateInner$.next(new SetJoined(true));
        this.stateInner$.next(new SetUserData(event.payload));
        break;
      case JitsiConferenceEventTypes.Left:
        this.stateInner$.next(new SetJoined(false));
        break;
      case JitsiConferenceEventTypes.kicked:
        this.stateInner$.next(new SetKicked());
        break;
    }
  }
}
