import { TrackType } from '../models/utils';
import { useJitsiMeet } from './useJitsiMeet';

export const useJitsiActions = () => {
  const jitsi = useJitsiMeet();

  return {
    kickParticipant: (userId: string) => jitsi.kickParticipant(userId),
    muteParticipant: (userId: string, mediaType: TrackType) =>
      jitsi.muteParticipant(userId, mediaType),
    lockRoom: (password: string) => jitsi.lockRoom(password)
  };
};
