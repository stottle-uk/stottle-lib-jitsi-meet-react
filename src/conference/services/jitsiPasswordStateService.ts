import { ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { scanState, typeOf } from '../models/events/action';
import {
  JitsiConferenceEvents,
  JitsiConferenceEventTypes
} from '../models/events/conference';
import { JitsiMeetService } from './jitsiMeetService';
import { StatsStateActions } from './reducers/statsActions';
import { statsInitialState, statsReducer } from './reducers/statsReducer';

export class JitsiPasswordStateService {
  private events$ = this.jitsiService.conferenceEvents$.pipe(
    typeOf(JitsiConferenceEventTypes.ConferenceFailed),
    tap(event => this.handleEvents(event))
  );

  private stateInner$ = new ReplaySubject<StatsStateActions>(1);
  state$ = this.stateInner$.pipe(scanState(statsReducer, statsInitialState));

  constructor(private jitsiService: JitsiMeetService) {}

  init() {
    this.events$.subscribe();
  }

  lockRoom(password: string) {
    this.jitsiService.lockRoom(password).subscribe();
  }

  private handleEvents(event: JitsiConferenceEvents) {
    console.log(event);
  }
}
