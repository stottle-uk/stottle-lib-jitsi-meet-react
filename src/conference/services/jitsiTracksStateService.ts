import { merge, ReplaySubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { scanState, typeOf } from '../models/events/action';
import {
  JitsiConferenceEvents,
  JitsiConferenceEventTypes
} from '../models/events/conference';
import { JitsiConnectionEventTypes } from '../models/events/connection';
import { JitsiMeetService } from './jitsiMeetService';
import {
  AddTrack,
  RemoveTrack,
  TracksStateActions
} from './reducers/tracksActions';
import { tracksInitialState, tracksReducer } from './reducers/tracksReducer';

export class JitsiTracksStateService {
  private createLocalTracks$ = this.jitsiService.connectionEvents$.pipe(
    typeOf(JitsiConnectionEventTypes.ConnectionEstablished),
    switchMap(() => this.jitsiService.createLocalTracks()),
    switchMap(track => this.jitsiService.addTrack(track))
  );
  private events$ = this.jitsiService.conferenceEvents$.pipe(
    typeOf(
      JitsiConferenceEventTypes.TrackAdded,
      JitsiConferenceEventTypes.TrackRemoved
    ),
    tap(event => this.handleEvents(event))
  );

  private stateInner$ = new ReplaySubject<TracksStateActions>(2);
  state$ = this.stateInner$.pipe(scanState(tracksReducer, tracksInitialState));

  constructor(private jitsiService: JitsiMeetService) {}

  init() {
    merge(this.createLocalTracks$, this.events$).subscribe();
  }

  private handleEvents(event: JitsiConferenceEvents) {
    switch (event.type) {
      case JitsiConferenceEventTypes.TrackAdded:
        this.stateInner$.next(new AddTrack(event.payload));
        break;
      case JitsiConferenceEventTypes.TrackRemoved:
        this.stateInner$.next(new RemoveTrack(event.payload));
        break;
    }
  }
}
