import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export function createStore(
  name,
  initialState,
  persistState,
) {
  return persistState
    ? create(
        devtools(persist(initialState, { name }), {
          name: `dawn: ${name}`,
        }),
      )
    : create(devtools(initialState, { name: `dawn: '${name}'` }))
}
