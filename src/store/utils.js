import { StateCreator, StoreApi, create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export function createStore<T>(
  name: string,
  initialState: StateCreator<T, [['zustand/devtools', never]], []>,
  persistState?: boolean,
) {
  return persistState
    ? create<T, [['zustand/devtools', never], ['zustand/persist', T]]>(
        devtools(persist(initialState, { name }), {
          name: `dawn: ${name}`,
        }),
      )
    : create<T, [['zustand/devtools', never]]>(devtools(initialState, { name: `dawn: '${name}'` }))
}

export type SetFn<T> = StoreApi<T>['setState']
export type GetFn<T> = StoreApi<T>['getState']

export type CreateStore<T, R> = (set: SetFn<T>, get: GetFn<T>) => R
