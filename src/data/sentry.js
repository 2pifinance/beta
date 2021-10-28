import { Integrations } from '@sentry/tracing'
import * as Sentry from '@sentry/react'

const key          = '99b5379d8beb43bbaddcaff0f8185b22'
const projectId    = '5768139'
const dsn          = `https://${key}@o673411.ingest.sentry.io/${projectId}`
const release      = process.env.NEXT_PUBLIC_SENTRY_RELEASE
const integrations = [ new Integrations.BrowserTracing() ]

export const initSentry = () => {
  if (! release) return

  Sentry.init({ dsn, release, integrations, tracesSampleRate: 1.0 })
}
