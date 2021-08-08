import { useEffect, useState } from 'react';
import { tap } from 'rxjs';
import { JitsiTrack } from '../models/JitsiTrack';
import {
  tracksInitialState,
  TracksState
} from '../services/reducers/tracksReducer';
import { useJitsiConference } from './useJitsiConference';
import { useJitsiTracksState } from './useJitsiMeet';
import { useJitsiUsers } from './useJitsiUsers';

export interface UserTrack {
  userId: string;
  username: string;
  role: string;
  isLocal: boolean;
  tracks: {
    audio?: JitsiTrack;
    video?: JitsiTrack;
  };
}

export const useJitsiTracks = (username: string) => {
  const tracks = useJitsiTracksState();
  const { myUserId, role } = useJitsiConference();
  const { userIds, users } = useJitsiUsers();

  const [tracksState, setTracksState] =
    useState<TracksState>(tracksInitialState);

  useEffect(() => {
    const sub = tracks.state$
      .pipe(tap(state => setTracksState(state)))
      .subscribe();

    return () => {
      sub.unsubscribe();
    };
  }, [tracks]);

  const reduceTracks = (tracks: JitsiTrack[]) =>
    tracks.reduce<UserTrack['tracks']>(
      (prev, curr) => ({ ...prev, [curr.getType()]: curr }),
      {}
    );

  const allTracks = userIds.reduce<UserTrack[]>(
    (tracks, userId) => [
      ...tracks,
      {
        userId: userId,
        username: users[userId].getDisplayName(),
        role: users[userId].getRole(),
        isLocal: false,
        tracks: reduceTracks(users[userId].getTracks())
      }
    ],
    [
      {
        userId: myUserId,
        username,
        role: role,
        isLocal: true,
        tracks: reduceTracks(tracksState.localTracks)
      }
    ]
  );

  return {
    localTracks: reduceTracks(tracksState.localTracks),
    allTracks,
    participantsLength: Object.keys(allTracks).length
  };
};
