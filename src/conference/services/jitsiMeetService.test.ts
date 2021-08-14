import { merge, toArray } from 'rxjs';
import { ConferenceJoined } from '../models/events/conference';
import { ConnectionEstablished } from '../models/events/connection';
import { JitsiMeetJS } from '../models/JitsiMeetJS';
import { JitsiTrack } from '../models/JitsiTrack';
import { TrackType } from '../models/utils';
import { JitsiMeetService } from './jitsiMeetService';

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
  addEventListener: (type: string, listener: (evt: unknown) => void) =>
    listener(
      new ConferenceJoined({
        isHidden: true,
        myUserId: '',
        role: '',
        roomname: ''
      }).payload
    ),
  removeEventListener: () => void 0,
  getRole: () => 'userRole',
  myUserId: () => 'myUserId1',
  isHidden: () => false,
  getName: () => 'roomNameTest'
};

class ConnectionMock {
  connect() {}

  initJitsiConference(r: string, o: any) {
    return ConferenceMock;
  }

  addEventListener(type: string, listener: (evt: unknown) => void): void {
    listener(new ConnectionEstablished().payload);
  }

  removeEventListener() {}
}

const trackMock = {
  type: 'audio'
} as JitsiTrack;

const deviceMock = {
  deviceId: 'd123',
  groupId: 'g123',
  kind: 'audioinput',
  label: 'deviceLabel'
} as MediaDeviceInfo;

const mediaDevicesMock = {
  addEventListener: (type: string, listener: (evt: unknown) => void) =>
    listener(deviceMock),
  removeEventListener: () => void 0,
  enumerateDevices: (fn: Function) => fn([{}, {}])
};

const JitsiMeetJSMock = {
  JitsiConnection: ConnectionMock,
  setLogLevel: (level: string) => void 0,
  events: {
    connection: {
      CONNECTION_ESTABLISHED: 'connection.connectionEstablished'
    },
    conference: {
      JOINED: 'conference.joined'
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

  test('initJitsiConference()', () => {
    expect(ConnectionMock.prototype.initJitsiConference).toHaveBeenCalledWith(
      'roomname',
      { enableLayerSuspension: true }
    );
  });

  test('joinConference()', () => {
    service.joinConference('username', 'password').subscribe();
    expect(ConferenceMock.setDisplayName).toHaveBeenCalledWith('username');
    expect(ConferenceMock.join).toHaveBeenCalledWith('password');
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

  test('lockRoom()', done => {
    service
      .lockRoom('password')
      .pipe(toArray())
      .subscribe(() => {
        expect(ConferenceMock.lock).toHaveBeenCalledWith('password');
        done();
      });
  });

  test('kickParticipant()', done => {
    service
      .kickParticipant('userId1')
      .pipe(toArray())
      .subscribe(() => {
        expect(ConferenceMock.kickParticipant).toHaveBeenCalledWith(
          'userId1',
          'userKicked'
        );
        done();
      });
  });

  test('muteParticipant()', done => {
    service
      .muteParticipant('userId1', 'audio')
      .pipe(toArray())
      .subscribe(() => {
        expect(ConferenceMock.muteParticipant).toHaveBeenCalledWith(
          'userId1',
          'audio'
        );
        done();
      });
  });

  test('sendCommandOnce()', done => {
    service
      .sendCommandOnce('messageType', 'messageData')
      .pipe(toArray())
      .subscribe(() => {
        expect(ConferenceMock.sendCommandOnce).toHaveBeenCalledWith(
          'messageType',
          'messageData'
        );
        done();
      });
  });

  test('addCommandListener()', done => {
    ConferenceMock.addCommandListener = jest.fn(
      (commandType: string, fn: Function) => fn('commandValue')
    );

    service.addCommandListener('commandType').subscribe(res => {
      expect(res).toEqual('commandValue');
      done();
    });
  });

  test('events()', done => {
    merge(
      service.connectionEvents$,
      service.conferenceEvents$,
      service.mediaDevicesEvents$
    )
      .pipe(toArray())
      .subscribe(events => {
        expect(events).toEqual([
          new ConnectionEstablished(),
          new ConferenceJoined({
            isHidden: false,
            myUserId: 'myUserId1',
            role: 'userRole',
            roomname: 'roomNameTest'
          }),
          {
            type: 'mediaDevices.devicechange',
            payload: deviceMock
          }
        ]);
        done();
      });
    service.dispose();
  });
});
