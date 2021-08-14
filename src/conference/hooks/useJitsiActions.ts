import { TrackType } from '../models/utils';
import { useJitsiMeet } from './useJitsiMeet';

export const useJitsiActions = () => {
  const jitsi = useJitsiMeet();

  return {
    kickParticipant: (userId: string) =>
      jitsi.kickParticipant(userId).subscribe(),
    muteParticipant: (userId: string, mediaType: TrackType) =>
      jitsi.muteParticipant(userId, mediaType).subscribe()
  };
};
