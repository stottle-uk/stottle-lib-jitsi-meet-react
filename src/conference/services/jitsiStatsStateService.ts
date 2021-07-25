import { ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { scanState, typeOf } from '../models/events/action';
import {
  JitsiConferenceEvents,
  JitsiConferenceEventTypes
} from '../models/events/conference';
import { JitsiMeetService } from './jitsiMeetService';
import {
  StatsStateActions,
  UpdateUserAudioLevel
} from './reducers/statsActions';
import { statsInitialState, statsReducer } from './reducers/statsReducer';

export class JitsiStatsStateService {
  private events$ = this.jitsiService.conferenceEvents$.pipe(
    typeOf(JitsiConferenceEventTypes.AudioLevelsChanged),
    tap(event => this.handleEvents(event))
  );

  private stateInner$ = new ReplaySubject<StatsStateActions>(1);
  state$ = this.stateInner$.pipe(scanState(statsReducer, statsInitialState));

  constructor(private jitsiService: JitsiMeetService) {}

  init() {
    this.events$.subscribe();
  }

  private handleEvents(event: JitsiConferenceEvents) {
    switch (event.type) {
      case JitsiConferenceEventTypes.AudioLevelsChanged: {
        const [userId, level] = event.payload;
        this.stateInner$.next(new UpdateUserAudioLevel({ userId, level }));
        break;
      }
    }
  }
}
