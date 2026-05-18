// In-memory event log mimicking the Firebase → BigQuery pipeline.
// Exposed on window.__duodata_events for inspection / Admin Analytics.

export interface TrackedEvent {
  name: string
  ts: number
  userId?: string
  role?: string
  params: Record<string, unknown>
}

const buffer: TrackedEvent[] = []

export function track(name: string, params: Record<string, unknown> = {}) {
  const evt: TrackedEvent = {
    name,
    ts: Date.now(),
    userId: (window as any).__duodata_user_id,
    role: (window as any).__duodata_user_role,
    params: {
      ...params,
      app_version: '0.1.0',
      platform: 'web',
      locale: navigator.language || 'en-US'
    }
  }
  buffer.push(evt)
  ;(window as any).__duodata_events = buffer
  if ((window as any).__duodata_debug) {
    // eslint-disable-next-line no-console
    console.debug('[track]', name, evt.params)
  }
}

export function getEvents() {
  return buffer.slice()
}
