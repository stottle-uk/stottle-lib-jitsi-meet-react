import { merge, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { scanState, typeOf } from '../models/events/action';
import {
  JitsiDevicesEvents,
  JitsiDevicesEventTypes
} from '../models/events/mediaDevices';
import { CreateTracksOptions, JitsiTrack } from '../models/JitsiTrack';
import { JitsiMeetService } from './jitsiMeetService';
import {
  AddDevices,
  DevicesStateActions,
  SetAudioOutDevice
} from './reducers/devicesActions';
import { devicesInitialState, devicesReducer } from './reducers/devicesReducer';

export class JitsiDevicesStateService {
  private devices$ = this.jitsiService.devices$.pipe(
    tap(devices => this.stateInner$.next(new AddDevices(devices)))
  );
  private events$ = this.jitsiService.mediaDevicesEvents$.pipe(
    typeOf(JitsiDevicesEventTypes.deviceListChanged),
    tap(event => this.handleEvents(event))
  );

  private stateInner$ = new ReplaySubject<DevicesStateActions>(1);
  state$ = this.stateInner$.pipe(
    scanState(devicesReducer, devicesInitialState)
  );

  constructor(private jitsiService: JitsiMeetService) {}

  init() {
    merge(this.devices$, this.events$).subscribe();
  }

  setAudioOutDevice(deviceId: string) {
    this.jitsiService.setAudioOutputDevice(deviceId);
    this.stateInner$.next(new SetAudioOutDevice(deviceId));
  }

  replaceTrack(oldTrack: JitsiTrack, options: CreateTracksOptions) {
    this.jitsiService.replaceTrack(oldTrack, options).subscribe();
  }

  private handleEvents(event: JitsiDevicesEvents) {
    switch (event.type) {
      case JitsiDevicesEventTypes.deviceListChanged:
        this.stateInner$.next(new AddDevices(event.payload));
        break;
    }
  }
}
