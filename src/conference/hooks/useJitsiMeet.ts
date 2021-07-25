import $ from 'jquery';
import { createContext, useContext } from 'react';
import { JitsiChatStateService } from '../services/jitsiChatStateService';
import { JitsiConferenceStateService } from '../services/jitsiConferenceStateService';
import { JitsiConnectionStateService } from '../services/jitsiConnectionStateService';
import { JitsiDevicesStateService } from '../services/jitsiDevicesStateService';
import { JitsiMeetService } from '../services/jitsiMeetService';
import { JitsiStatsStateService } from '../services/jitsiStatsStateService';
import { JitsiTracksStateService } from '../services/jitsiTracksStateService';
import { JitsiUsersStateService } from '../services/jitsiUsersStateService';

window.$ = $;
const { JitsiMeetJS } = window;
JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);
JitsiMeetJS.init();

const jitsiMeetService = new JitsiMeetService(JitsiMeetJS);
const connectionStateService = new JitsiConnectionStateService(
  jitsiMeetService
);
const conferenceStateService = new JitsiConferenceStateService(
  jitsiMeetService
);
const usersStateService = new JitsiUsersStateService(jitsiMeetService);
const devicesStateService = new JitsiDevicesStateService(jitsiMeetService);
const tracksStateService = new JitsiTracksStateService(jitsiMeetService);
const chatStateService = new JitsiChatStateService(jitsiMeetService);
const jitsiStatsStateService = new JitsiStatsStateService(jitsiMeetService);

connectionStateService.init();
conferenceStateService.init();
usersStateService.init();
devicesStateService.init();
tracksStateService.init();
jitsiStatsStateService.init();

const JitsiContext = createContext(jitsiMeetService);
const ConnectionStateContext = createContext(connectionStateService);
const ConferenceStateContext = createContext(conferenceStateService);
const UsersStateContext = createContext(usersStateService);
const DevicesStateContext = createContext(devicesStateService);
const TracksStateContext = createContext(tracksStateService);
const ChatStateService = createContext(chatStateService);
const StatsStateContext = createContext(jitsiStatsStateService);

export const useJitsiMeet = () => useContext(JitsiContext);
export const useJitsiConnectionState = () => useContext(ConnectionStateContext);
export const useJitsiConferenceState = () => useContext(ConferenceStateContext);
export const useJitsiUsersState = () => useContext(UsersStateContext);
export const useJitsiDevicesState = () => useContext(DevicesStateContext);
export const useJitsiTracksState = () => useContext(TracksStateContext);
export const useJitsiChatState = () => useContext(ChatStateService);
export const useJitsiStatsState = () => useContext(StatsStateContext);
