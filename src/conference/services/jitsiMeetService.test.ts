import { merge, take, toArray } from 'rxjs';
import {
  ConferenceJoined,
  ConferenceLeft,
  JitsiConferenceEventTypes
} from '../models/events/conference';
import {
  ConnectionEstablished,
  JitsiConnectionEventTypes
} from '../models/events/connection';
import { JitsiDevicesEventTypes } from '../models/events/mediaDevices';
import { JitsiMeetJS } from '../models/JitsiMeetJS';
import { JitsiTrack } from '../models/JitsiTrack';
import { TrackType } from '../models/utils';
import { JitsiMeetService } from './jitsiMeetService';

const trackMock = {
  type: 'audio'
} as JitsiTrack;

const deviceMock = {
  deviceId: 'd123',
  groupId: 'g123',
  kind: 'audioinput',
  label: 'deviceLabel'
} as MediaDeviceInfo;

const userMock = {
  isHidden: false,
  myUserId: 'myUserId1',
  role: 'userRole',
  roomname: 'roomNameTest'
};

const ConferenceMock = {
  setDisplayName: (username: string) => void 0,
  join: (password: string) => void 0,
  leave: () => void 0,
  addTrack: (track: JitsiTrack) => void 0,
  replaceTrack: (oldT: JitsiTrack, newT: JitsiTrack) => void 0,
  lock: (password: string) => Promise.resolve(void 0),
  kickParticipant: (userId: string, reason: string) => void 0,
  muteParticipant: (userId: string, mediaType: TrackType) => void 0,
  sendCommandOnce: (name: string, values: TrackType) => void 0,
  addCommandListener: (commandType: string, fn: Function) => fn('values'),
  addEventListener(type: string, listener: Function) {},
  removeEventListener: () => void 0,
  getRole: () => 'userRole',
  myUserId: () => 'myUserId1',
  isHidden: () => false,
  getName: () => 'roomNameTest'
};

class ConnectionMock {
  connect() {}
  disconnect() {}
  initJitsiConference(r: string, o: any) {
    return ConferenceMock;
  }
  addEventListener(type: string, listener: Function): void {}
  removeEventListener(): void {}
}

const mediaDevicesMock = {
  enumerateDevices: (fn: Function) => fn([deviceMock, deviceMock]),
  addEventListener(type: string, listener: Function) {},
  removeEventListener: () => void 0
};

const JitsiMeetJSMock = {
  JitsiConnection: ConnectionMock,
  setLogLevel: (level: string) => void 0,
  events: {
    connection: {
      CONNECTION_ESTABLISHED: JitsiConnectionEventTypes.ConnectionEstablished
    },
    conference: {
      JOINED: JitsiConferenceEventTypes.Joined,
      LEFT: JitsiConferenceEventTypes.Left
    },
    mediaDevices: {
      DEVICE_CHANGE: 'mediaDevices.devicechange'
    }
  },
  errors: { connection: {} },
  createLocalTracks: () => Promise.resolve([trackMock, trackMock]),
  mediaDevices: mediaDevicesMock
} as unknown as JitsiMeetJS;

describe('JitsiMeetService', () => {
  let service: JitsiMeetService;

  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
    jest.spyOn(ConnectionMock.prototype, 'connect');
    jest.spyOn(ConnectionMock.prototype, 'disconnect');
    jest.spyOn(ConnectionMock.prototype, 'initJitsiConference');
    jest.spyOn(ConferenceMock, 'setDisplayName');
    jest.spyOn(ConferenceMock, 'join');
    jest.spyOn(ConferenceMock, 'leave');
    jest.spyOn(ConferenceMock, 'addTrack');
    jest.spyOn(ConferenceMock, 'replaceTrack');
    jest.spyOn(ConferenceMock, 'lock');
    jest.spyOn(ConferenceMock, 'kickParticipant');
    jest.spyOn(ConferenceMock, 'muteParticipant');
    jest.spyOn(ConferenceMock, 'sendCommandOnce');
    jest.spyOn(ConferenceMock, 'addCommandListener');
    jest.spyOn(JitsiMeetJSMock, 'createLocalTracks');

    service = new JitsiMeetService(JitsiMeetJSMock);
  });

  beforeEach(() => {
    service.connect('appId', 'token', {
      clientNode: '',
      hosts: { domain: '', muc: '' }
    });

    service
      .initConference('roomname', {
        enableLayerSuspension: true
      })
      .subscribe();
  });

  test('connect()', () => {
    expect(ConnectionMock.prototype.connect).toHaveBeenCalled();
  });

  test('disconnect()', done => {
    service.disconnect().subscribe(() => {
      expect(ConnectionMock.prototype.disconnect).toHaveBeenCalled();
      done();
    });
  });

  test('initJitsiConference()', () => {
    expect(ConnectionMock.prototype.initJitsiConference).toHaveBeenCalledWith(
      'roomname',
      { enableLayerSuspension: true }
    );
  });

  test('joinConference()', done => {
    service.joinConference('username', 'password').subscribe(() => {
      expect(ConferenceMock.setDisplayName).toHaveBeenCalledWith('username');
      expect(ConferenceMock.join).toHaveBeenCalledWith('password');
      done();
    });
  });

  test('leaveConference()', () => {
    service.leaveConference().subscribe();
    expect(ConferenceMock.leave).toHaveBeenCalled();
  });

  test('addTrack()', () => {
    service.addTrack(trackMock).subscribe();
    expect(ConferenceMock.addTrack).toHaveBeenCalledWith(trackMock);
  });

  test('createLocalTracks()', done => {
    const trackOptions = {
      devices: []
    };
    service
      .createLocalTracks(trackOptions)
      .pipe(toArray())
      .subscribe(res => {
        expect(res).toEqual([trackMock, trackMock]);
        expect(JitsiMeetJSMock.createLocalTracks).toHaveBeenCalledWith(
          trackOptions
        );
        done();
      });
  });

  test('replaceTrack()', done => {
    JitsiMeetJSMock.createLocalTracks = jest
      .fn()
      .mockResolvedValue([{ ...trackMock, type: 'desktop' }]);
    const trackOptions = {
      devices: []
    };
    service
      .replaceTrack(trackMock, trackOptions)
      .pipe(toArray())
      .subscribe(res => {
        expect(res).toEqual([{ ...trackMock, type: 'desktop' }]);
        expect(JitsiMeetJSMock.createLocalTracks).toHaveBeenCalledWith(
          trackOptions
        );
        expect(ConferenceMock.replaceTrack).toHaveBeenCalledWith(trackMock, {
          ...trackMock,
          type: 'desktop'
        });
        done();
      });
  });

  test('replaceTrack() cancel error', done => {
    ConferenceMock.replaceTrack = jest.fn(() => {
      // eslint-disable-next-line no-throw-literal
      throw {
        name: 'gum.screensharing_user_canceled'
      };
    });

    service.replaceTrack(trackMock, {}).subscribe(res => {
      expect(res).toEqual(trackMock);
      done();
    });
  });

  test('replaceTrack() other error', done => {
    ConferenceMock.replaceTrack = jest.fn(() => {
      // eslint-disable-next-line no-throw-literal
      throw {
        name: 'other Error'
      };
    });

    service.replaceTrack(trackMock, {}).subscribe({
      error: res => {
        expect(res.message).toEqual('other Error');
        done();
      }
    });
  });

  test('lockRoom()', done => {
    service.lockRoom('password').subscribe(() => {
      expect(ConferenceMock.lock).toHaveBeenCalledWith('password');
      done();
    });
  });

  test('kickParticipant()', done => {
    service.kickParticipant('userId1').subscribe(() => {
      expect(ConferenceMock.kickParticipant).toHaveBeenCalledWith(
        'userId1',
        'userKicked'
      );
      done();
    });
  });

  test('muteParticipant()', done => {
    service.muteParticipant('userId1', 'audio').subscribe(() => {
      expect(ConferenceMock.muteParticipant).toHaveBeenCalledWith(
        'userId1',
        'audio'
      );
      done();
    });
  });

  test('sendCommandOnce()', done => {
    service.sendCommandOnce('messageType', 'messageData').subscribe(() => {
      expect(ConferenceMock.sendCommandOnce).toHaveBeenCalledWith(
        'messageType',
        'messageData'
      );
      done();
    });
  });

  test('addCommandListener()', done => {
    const commandHandlers: Record<string, Function> = {};
    ConferenceMock.addCommandListener = jest.fn(
      (command: string, callback: Function) =>
        (commandHandlers[command] = callback)
    );

    const commandType = 'commandName';
    service
      .addCommandListener(commandType)
      .pipe(take(2), toArray())
      .subscribe(res => {
        expect(res).toEqual(['commandValue1', 'commandValue2']);
        done();
      });

    commandHandlers[commandType]('commandValue1');
    commandHandlers[commandType]('commandValue2');
  });

  test('events()', done => {
    const eventHandlers: Record<string, Function> = {};
    const handler = jest.fn(
      (event, callback) => (eventHandlers[event] = callback)
    );
    ConnectionMock.prototype.addEventListener = handler;
    ConferenceMock.addEventListener = handler;
    mediaDevicesMock.addEventListener = handler;

    const conJoinedEvt = new ConferenceJoined(userMock);
    const deviceListChangedEvt = {
      type: 'mediaDevices.devicechange',
      payload: deviceMock
    };
    const conferenceLeftEvt = new ConferenceLeft();
    const connectionEstablishedEvt = new ConnectionEstablished();

    merge(
      service.connectionEvents$,
      service.conferenceEvents$,
      service.mediaDevicesEvents$
    )
      .pipe(toArray())
      .subscribe(events => {
        expect(events).toEqual([
          deviceListChangedEvt,
          connectionEstablishedEvt,
          conJoinedEvt,
          conferenceLeftEvt
        ]);

        done();
      });

    eventHandlers[JitsiDevicesEventTypes.deviceListChanged](
      deviceListChangedEvt.payload
    );
    eventHandlers[JitsiConnectionEventTypes.ConnectionEstablished](
      connectionEstablishedEvt.payload
    );
    eventHandlers[JitsiConferenceEventTypes.Joined](conJoinedEvt.payload);
    eventHandlers[JitsiConferenceEventTypes.Left](conferenceLeftEvt.payload);

    service.dispose();
  });

  test('devices()', done => {
    service.devices$.subscribe(events => {
      expect(events).toEqual([deviceMock, deviceMock]);
      done();
    });
  });
});
