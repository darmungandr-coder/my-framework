import {test as base, expect} from "@playwright/test"

const blockedHosts = [
  'googleads',
  'googlesyndication',
  'googleadservices',
  'doubleclick',
]

export const test = base.extend({
    context: async ({context}, use) =>{
        await context.route('**/*', (route) =>{
            const url = route.request().url()
        })
  } })

export {expect}