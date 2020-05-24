import { Application } from '../../declarations'

export function getLink (type: string, hash: string, subscriptionId?: string): string {
  return subscriptionId != null && subscriptionId.length > 0 ? (process.env.APP_HOST ?? '') + 'magicLink' + `?type=${type}&token=${hash}&subscriptionId=${subscriptionId}` : (process.env.APP_HOST ?? '') + 'magicLink' + `?type=${type}&token=${hash}`
}

export async function sendEmail (app: Application, email: any): Promise<void> {
  if (email.to) {
    console.log('sendEmail() to:', email)

    try {
      await app.service('email').create(email)
    } catch (error) {
      console.error('Error sending email', error)
    }

    console.log('Email sent.')
  }
}

export async function sendSms (app: Application, sms: any): Promise<void> {
  try {
    await app.service('sms').create(sms)
  } catch (error) {
    console.error('Error sending SMS', error)
  }

  console.log('SMS sent.')
}
