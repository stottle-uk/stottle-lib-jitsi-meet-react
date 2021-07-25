import { useEffect, useState } from 'react';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JitsiTrack } from '../models/JitsiTrack';
import {
  tracksInitialState,
  TracksState
} from '../services/reducers/tracksReducer';
import {
  usersInitialState,
  UsersState
} from '../services/reducers/usersReducer';
import { useJitsiTracksState, useJitsiUsersState } from './useJitsiMeet';

export const useJitsiTracks = (username: string) => {
  const tracks = useJitsiTracksState();
  const users = useJitsiUsersState();

  const [tracksState, setTracksState] =
    useState<TracksState>(tracksInitialState);
  const [usersState, setUsersState] = useState<UsersState>(usersInitialState);

  useEffect(() => {
    const tracks$ = tracks.state$.pipe(tap(state => setTracksState(state)));
    const users$ = users.state$.pipe(tap(state => setUsersState(state)));

    const sub = merge(tracks$, users$).subscribe();

    return () => {
      sub.unsubscribe();
    };
  }, [tracks, users]);

  return {
    localTracks: tracksState.localTracks.reduce(
      (prev, curr) => ({ ...prev, [curr.getType()]: curr }),
      {} as {
        audio: JitsiTrack | undefined;
        video: JitsiTrack | undefined;
      }
    ),
    allTracks: {
      local: {
        username: username,
        tracks: Object.values(tracksState.localTracks)
      },
      ...usersState.userIds.reduce(
        (prev, curr) => ({
          ...prev,
          [curr]: {
            username: usersState.users[curr].getDisplayName(),
            tracks: tracksState.remoteTracks[curr] || []
          }
        }),
        {}
      )
    }
  };
};
