import { merge, ReplaySubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { scanState, typeOf } from '../models/events/action';
import {
  JitsiConferenceEvents,
  JitsiConferenceEventTypes
} from '../models/events/conference';
import { JitsiMeetService } from './jitsiMeetService';
import {
  AddUser,
  RemoveUser,
  UsersStateActions
} from './reducers/usersActions';
import { usersInitialState, usersReducer } from './reducers/usersReducer';

export class JitsiUsersStateService {
  private createRemoteParticipents$ = this.jitsiService.conferenceEvents$.pipe(
    typeOf(JitsiConferenceEventTypes.ConnectionEstablished),
    switchMap(() => this.jitsiService.getParticipants()),
    tap(user =>
      this.stateInner$.next(new AddUser({ userId: user.getId(), user }))
    )
  );
  private events$ = this.jitsiService.conferenceEvents$.pipe(
    typeOf(
      JitsiConferenceEventTypes.UserLeft,
      JitsiConferenceEventTypes.UserJoined
    ),
    tap(event => this.handleEvents(event))
  );

  private stateInner$ = new ReplaySubject<UsersStateActions>(1);
  state$ = this.stateInner$.pipe(scanState(usersReducer, usersInitialState));

  constructor(private jitsiService: JitsiMeetService) {}

  init() {
    merge(this.createRemoteParticipents$, this.events$).subscribe();
  }

  private handleEvents(event: JitsiConferenceEvents) {
    switch (event.type) {
      case JitsiConferenceEventTypes.UserLeft:
        this.stateInner$.next(new RemoveUser(event.payload[0]));
        break;
      case JitsiConferenceEventTypes.UserJoined:
        const [userId, user] = event.payload;
        this.stateInner$.next(new AddUser({ userId, user }));
        break;
    }
  }
}
