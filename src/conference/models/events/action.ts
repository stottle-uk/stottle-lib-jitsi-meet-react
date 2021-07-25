import { Observable, OperatorFunction } from 'rxjs';
import { filter, scan, shareReplay, startWith } from 'rxjs/operators';

export interface Action<T = unknown> {
  type: string;
  payload: T;
}

export const typeOf = <T extends Action>(
  ...events: string[]
): OperatorFunction<T, T> => source =>
  source.pipe(filter(e => events.includes(e.type)));

export const scanState = <TState, TActions extends Action>(
  accumulator: (state: TState, action: TActions) => TState,
  seed: TState
): OperatorFunction<TActions, TState> => (source): Observable<TState> =>
  source.pipe(scan(accumulator, seed), startWith(seed), shareReplay(1));
