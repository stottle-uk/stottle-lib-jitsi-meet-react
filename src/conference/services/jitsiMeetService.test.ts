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
import {
  ConferenceMock,
  conferenceOptions,
  ConnectionMock,
  connectOptions,
  deviceMock,
  JitsiMeetJSMock,
  mediaDevicesMock,
  participantMock,
  trackMock,
  userMock
} from '../testing/jitsiMocks';
import { JitsiMeetService } from './jitsiMeetService';

describe('JitsiMeetService', () => {
  let service: JitsiMeetService;

  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
    jest.spyOn(ConnectionMock.prototype, 'connect');
    jest.spyOn(ConnectionMock.prototype, 'disconnect');
    jest.spyOn(ConnectionMock.prototype, 'initJitsiConference');
    jest.spyOn(ConferenceMock.prototype, 'setDisplayName');
    jest.spyOn(ConferenceMock.prototype, 'join');
    jest.spyOn(ConferenceMock.prototype, 'leave');
    jest.spyOn(ConferenceMock.prototype, 'addTrack');
    jest.spyOn(ConferenceMock.prototype, 'replaceTrack');
    jest.spyOn(ConferenceMock.prototype, 'lock');
    jest.spyOn(ConferenceMock.prototype, 'kickParticipant');
    jest.spyOn(ConferenceMock.prototype, 'muteParticipant');
    jest.spyOn(ConferenceMock.prototype, 'sendCommandOnce');
    jest.spyOn(ConferenceMock.prototype, 'addCommandListener');
    jest.spyOn(mediaDevicesMock, 'setAudioOutputDevice');
    jest.spyOn(JitsiMeetJSMock, 'createLocalTracks');

    service = new JitsiMeetService(JitsiMeetJSMock);
  });

  beforeEach(() => {
    service.connect('appId', 'token', connectOptions);
    service.initConference('roomname', conferenceOptions).subscribe();
  });

  test('connect()', () => {
    expect(ConnectionMock.prototype.connect).toHaveBeenCalled();
  });

  test('initJitsiConference()', () => {
    expect(ConnectionMock.prototype.initJitsiConference).toHaveBeenCalledWith(
      'roomname',
      conferenceOptions
    );
  });

  test('disconnect()', done => {
    service.disconnect().subscribe(() => {
      expect(ConnectionMock.prototype.disconnect).toHaveBeenCalled();
      done();
    });
  });

  test('joinConference()', done => {
    service.joinConference('username', 'password').subscribe(() => {
      expect(ConferenceMock.prototype.setDisplayName).toHaveBeenCalledWith(
        'username'
      );
      expect(ConferenceMock.prototype.join).toHaveBeenCalledWith('password');
      done();
    });
  });

  test('leaveConference()', done => {
    service.leaveConference().subscribe(() => {
      expect(ConferenceMock.prototype.leave).toHaveBeenCalled();
      done();
    });
  });

  test('addTrack()', done => {
    service.addTrack(trackMock).subscribe(() => {
      expect(ConferenceMock.prototype.addTrack).toHaveBeenCalledWith(trackMock);
      done();
    });
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
        expect(ConferenceMock.prototype.replaceTrack).toHaveBeenCalledWith(
          trackMock,
          {
            ...trackMock,
            type: 'desktop'
          }
        );
        done();
      });
  });

  test('replaceTrack() cancel error', done => {
    ConferenceMock.prototype.replaceTrack = jest.fn(() => {
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
    ConferenceMock.prototype.replaceTrack = jest.fn(() => {
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

  test('getAudioOutputDevice()', () => {
    expect(service.getAudioOutputDevice()).toBe(deviceMock.deviceId);
  });

  test('setAudioOutputDevice()', () => {
    service.setAudioOutputDevice(deviceMock.deviceId);

    expect(mediaDevicesMock.setAudioOutputDevice).toHaveBeenCalledWith(
      deviceMock.deviceId
    );
  });

  test('getParticipants()', done => {
    service
      .getParticipants()
      .pipe(toArray())
      .subscribe(res => {
        expect(res).toEqual([participantMock, participantMock]);
        done();
      });
  });

  test('getRemoteTracks()', done => {
    service
      .getRemoteTracks()
      .pipe(toArray())
      .subscribe(res => {
        expect(res).toEqual([trackMock, trackMock, trackMock, trackMock]);
        done();
      });
  });

  test('lockRoom()', done => {
    service.lockRoom('password').subscribe(() => {
      expect(ConferenceMock.prototype.lock).toHaveBeenCalledWith('password');
      done();
    });
  });

  test('kickParticipant()', done => {
    service.kickParticipant('userId1').subscribe(() => {
      expect(ConferenceMock.prototype.kickParticipant).toHaveBeenCalledWith(
        'userId1',
        'userKicked'
      );
      done();
    });
  });

  test('muteParticipant()', done => {
    service.muteParticipant('userId1', 'audio').subscribe(() => {
      expect(ConferenceMock.prototype.muteParticipant).toHaveBeenCalledWith(
        'userId1',
        'audio'
      );
      done();
    });
  });

  test('sendCommandOnce()', done => {
    service.sendCommandOnce('messageType', 'messageData').subscribe(() => {
      expect(ConferenceMock.prototype.sendCommandOnce).toHaveBeenCalledWith(
        'messageType',
        'messageData'
      );
      done();
    });
  });

  test('addCommandListener()', done => {
    const commandHandlers: Record<string, Function> = {};
    ConferenceMock.prototype.addCommandListener = jest.fn(
      (command: string, callback: Function) =>
        (commandHandlers[command] = callback)
    );

    const commandType = 'commandName';
    const commands = ['cmdVal1', 'cmdVal2', 'cmdVal3'];

    service
      .addCommandListener(commandType)
      .pipe(take(commands.length), toArray())
      .subscribe(res => {
        expect(res).toEqual(commands);
        done();
      });

    commands.forEach(cmd => commandHandlers[commandType](cmd));
  });

  test('events$', done => {
    const eventHandlers: Record<string, Function> = {};
    const handler = jest.fn(
      (event, callback) => (eventHandlers[event] = callback)
    );
    ConnectionMock.prototype.addEventListener = handler;
    ConferenceMock.prototype.addEventListener = handler;
    mediaDevicesMock.addEventListener = handler;

    const deviceListChangedEvt = {
      type: JitsiDevicesEventTypes.deviceListChanged,
      payload: deviceMock
    };
    const connectionEstablishedEvt = new ConnectionEstablished();
    const conferenceJoinedEvt = new ConferenceJoined(userMock);
    const conferenceLeftEvt = new ConferenceLeft();

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
          conferenceJoinedEvt,
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
    eventHandlers[JitsiConferenceEventTypes.Joined]();
    eventHandlers[JitsiConferenceEventTypes.Left](conferenceLeftEvt.payload);

    service.dispose();
  });

  test('devices$', done => {
    service.devices$.subscribe(events => {
      expect(events).toEqual([deviceMock, deviceMock]);
      done();
    });
  });
});
