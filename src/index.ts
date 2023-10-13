export interface UserTrailOptions {
  key: string;
  enabled?: boolean;
  userId?: string;
}

export interface UserTrailEvent {
  eventName: string;
  userId?: string;
}

export interface UpdateIdentityOptions {
  userId?: string;
  newUserId: string;
}

export interface IdentifyOptions {
  userId: string;
}

export default class UserTrail {
  key: string;
  enabled: boolean;
  userId?: string;

  constructor(options: UserTrailOptions) {
    this.key = options.key;
    this.enabled = options.enabled ?? true;
  }

  public identify(options: IdentifyOptions) {
    this.userId = options.userId
  }


  public async track(event: UserTrailEvent) {
    if (!this.enabled) {
      return;
    }

    const userId = event.userId || this.userId

    // validate
    if (!userId) {
      throw new Error("Failed to send event to UserTrail API: Missing userId")
    }

    if (!this.key) {
      throw new Error("Failed to send event to UserTrail API: Missing key")
    }

    if (!event.eventName) {
      throw new Error("Failed to send event to UserTrail API: Missing eventName")
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.key}`
    }

    const body = JSON.stringify({
      event_name: event.eventName,
      user_id: userId,
    });

    // Send event to UserTrail API
    const response = await fetch("https://api.usertrail.io/v1/events", {
      method: "POST", body, headers
    });

    if (!response.ok) {
      throw new Error(`Failed to send event to UserTrail API: ${response.status} ${response.statusText}`);
    }
  }

  public async updateIdentity(updateIdentityOptions: UpdateIdentityOptions) {
    if (!this.enabled) {
      return;
    }

    const userId = updateIdentityOptions.userId || this.userId

    // validate
    if (!userId) {
      throw new Error("Failed to update identity: Missing userId")
    }

    if (!this.key) {
      throw new Error("Failed to send event to UserTrail API: Missing key")
    }

    if (!updateIdentityOptions.newUserId) {
      throw new Error("Failed to update identity: Missing newUserId");
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.key}`
    }

    const body = JSON.stringify({
      new_user_id: updateIdentityOptions.newUserId,
      user_id: userId,
    });

    // Send event to UserTrail API
    const response = await fetch("https://api.usertrail.io/v1/identity", {
      method: "PATCH", body, headers
    });

    if (!response.ok) {
      throw new Error(`Failed to update identity: ${response.status} ${response.statusText}`);
    }
  }
}