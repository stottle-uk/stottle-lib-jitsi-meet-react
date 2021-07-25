import { merge, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { scanState, typeOf } from '../models/events/action';
import {
  JitsiConnectionEvents,
  JitsiConnectionEventTypes
} from '../models/events/connection';
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
    merge(this.events$).subscribe();
  }

  connect(
    roomname: string,
    token: string | null,
    connectionOptions: JitsiConnectionOptions
  ) {
    this.stateInner$.next(new SetIsConnecting(true));
    this.jitsiService.connect(null, token, {
      ...connectionOptions,
      serviceUrl: connectionOptions.serviceUrl
        ? `${connectionOptions.serviceUrl}?room=${roomname}`
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
