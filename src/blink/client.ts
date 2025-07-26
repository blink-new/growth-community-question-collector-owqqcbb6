import { createClient as createBlinkClient } from '@blinkdotnew/sdk'

export const createClient = (config: any) => createBlinkClient(config)

export const blink = createBlinkClient({
  projectId: 'growth-community-question-collector-owqqcbb6',
  authRequired: true
})