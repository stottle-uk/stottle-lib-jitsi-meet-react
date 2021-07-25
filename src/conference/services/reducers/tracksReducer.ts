import { JitsiTrack } from '../../models/JitsiTrack';
import { TracksStateActions, TracksStateActionTypes } from './tracksActions';

type ParticipentTracks = Record<string, JitsiTrack[]>;

export interface TracksState {
  remoteTracks: ParticipentTracks;
  localTracks: JitsiTrack[];
}

export const tracksInitialState: TracksState = {
  remoteTracks: {},
  localTracks: []
};

export const tracksReducer = (
  state = tracksInitialState,
  action: TracksStateActions
): TracksState => {
  switch (action.type) {
    case TracksStateActionTypes.SetLocalTracks:
      return {
        ...state,
        localTracks: action.payload
      };

    case TracksStateActionTypes.AddTrack:
      if (action.payload.isLocal()) {
        return {
          ...state,
          localTracks: [...state.localTracks, action.payload]
        };
      }

      return {
        ...state,
        remoteTracks: {
          ...(state.remoteTracks || {}),
          [action.payload.getParticipantId()]: [
            ...(state.remoteTracks[action.payload.getParticipantId()] || []),
            action.payload
          ]
        }
      };

    case TracksStateActionTypes.RemoveTrack:
      if (action.payload.isLocal()) {
        return {
          ...state,
          localTracks: state.localTracks.filter(
            t => t.getType() !== action.payload.getType()
          )
        };
      }

      const { [action.payload.getParticipantId()]: tracks } =
        state.remoteTracks;
      return {
        ...state,
        remoteTracks: {
          ...(state.remoteTracks || {}),
          [action.payload.getParticipantId()]: tracks.filter(
            t => t.getType() !== action.payload.getType()
          )
        }
      };

    default:
      return state;
  }
};
