export interface UserTrailOptions {
  apiKey: string;
  enabled?: boolean;
}

export interface UserTrailEvent {
  eventName: string;
  userId: string;
}

export default class UserTrail {
  apiKey: string;
  enabled: boolean;

  constructor(options: UserTrailOptions) {
    this.apiKey = options.apiKey;
    this.enabled = options.enabled ?? true;
  }

  public async track(event: UserTrailEvent) {
    if (!this.enabled) {
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`
    }

    const body = JSON.stringify({
      event_name: event.eventName,
      user_id: event.userId,
    });

    // Send event to UserTrail API
    const response = await fetch("https://api.usertrail.io/v1/events", {
      method: "POST", body, headers });

    if (!response.ok) {
      throw new Error(`Failed to send event to UserTrail API: ${response.status} ${response.statusText}`);
    }
  }
}