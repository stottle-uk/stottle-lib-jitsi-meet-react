import { merge, ReplaySubject } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
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
  private createLocalTracks1$ = this.jitsiService.connectionEvents$.pipe(
    typeOf(JitsiConnectionEventTypes.ConnectionEstablished),
    switchMap(() => this.jitsiService.createLocalTracks()),
    tap(track => this.stateInner$.next(new AddTrack(track)))
  );
  private createLocalTracks$ = this.jitsiService.conferenceEvents$.pipe(
    typeOf(JitsiConferenceEventTypes.Joined),
    switchMap(() =>
      this.state$.pipe(
        take(1),
        switchMap(tracks => tracks.localTracks),
        switchMap(track => {
          // console.log(track); // TODO - sort this out!
          return this.jitsiService.addTrack(track);
        })
      )
    )
  );
  private createRemoteTracks$ = this.jitsiService.conferenceEvents$.pipe(
    typeOf(JitsiConferenceEventTypes.ConnectionEstablished),
    tap(track => console.log(track)),
    switchMap(() => this.jitsiService.getRemoteTracks()),
    tap(track => this.stateInner$.next(new AddTrack(track)))
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
    merge(
      this.createLocalTracks1$,
      this.createLocalTracks$,
      this.createRemoteTracks$,
      this.events$
    ).subscribe();
  }

  private handleEvents(event: JitsiConferenceEvents) {
    console.log(event);

    switch (event.type) {
      case JitsiConferenceEventTypes.TrackAdded:
        if (!event.payload.isLocal()) {
          this.stateInner$.next(new AddTrack(event.payload));
        }
        break;
      case JitsiConferenceEventTypes.TrackRemoved:
        this.stateInner$.next(new RemoveTrack(event.payload));
        break;
    }
  }
}
