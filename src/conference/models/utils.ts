export type LogLevels = {
  DEBUG: 'debug';
  ERROR: 'error';
  INFO: 'info';
  LOG: 'log';
  TRACE: 'trace';
  WARN: 'warn';
};

export type TrackType = 'audio' | 'video' | 'desktop';

export interface JitsiCommandValues {
  value: string;
  attributes: Record<string, string | number | boolean>; // map with keys the name of the attribute and values - the values of the attributes.
  children: []; // array with JS object with the same structure.
}

export interface JitsiEventEmitter<E> {
  addEventListener(
    type: string,
    listener: (evt: E) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: (evt: E) => void,
    options?: EventListenerOptions | boolean
  ): void;
}
