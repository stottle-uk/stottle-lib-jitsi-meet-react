import { merge, ReplaySubject, Subject } from 'rxjs';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { scanState, typeOf } from '../models/events/action';
import {
  JitsiConnectionEvents,
  JitsiConnectionEventTypes
} from '../models/events/connection';
import { JitsiConferenceOptions } from '../models/JitsiConference';
import { JitsiConnectionOptions } from '../models/JitsiConnection';
import { JitsiMeetService } from './jitsiMeetService';
import {
  ConnectionStateActions,
  SetConnected,
  SetIsConnecting
} from './reducers/connectionActions';
import {
  connectionInitialState,
  connectionReducer
} from './reducers/connectionReducer';

export class JitsiConnectionStateService {
  private confOptionsInner$ = new Subject<{
    roomname: string;
    confOptions: JitsiConferenceOptions;
  }>();
  private initConference$ = this.jitsiService.connectionEvents$.pipe(
    typeOf(JitsiConnectionEventTypes.ConnectionEstablished),
    withLatestFrom(this.confOptionsInner$),
    switchMap(([, { roomname, confOptions }]) =>
      this.jitsiService.initConference(roomname, confOptions)
    )
  );

  private events$ = this.jitsiService.connectionEvents$.pipe(
    typeOf(JitsiConnectionEventTypes.ConnectionEstablished),
    tap(event => this.handleEvents(event))
  );

  private stateInner$ = new ReplaySubject<ConnectionStateActions>(1);
  state$ = this.stateInner$.pipe(
    scanState(connectionReducer, connectionInitialState)
  );

  constructor(private jitsiService: JitsiMeetService) {}

  init() {
    merge(this.events$, this.initConference$).subscribe();
  }

  connect(
    roomname: string,
    token: string | null,
    connOptions: JitsiConnectionOptions,
    confOptions: JitsiConferenceOptions
  ) {
    this.confOptionsInner$.next({
      roomname,
      confOptions
    });
    this.stateInner$.next(new SetIsConnecting(true));
    this.jitsiService.connect(null, token, {
      ...connOptions,
      serviceUrl: connOptions.serviceUrl
        ? `${connOptions.serviceUrl}?room=${roomname}`
        : undefined
    });
  }

  disconnect() {
    this.jitsiService.disconnect();
  }

  private handleEvents(event: JitsiConnectionEvents) {
    switch (event.type) {
      case JitsiConnectionEventTypes.ConnectionEstablished:
        this.stateInner$.next(new SetConnected(true));
        this.stateInner$.next(new SetIsConnecting(false));
        break;
    }
  }
}
