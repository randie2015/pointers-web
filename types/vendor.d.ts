declare module 'resend' {
  type ResendError = { message: string };

  export class Resend {
    constructor(apiKey?: string);
    emails: {
      send: (payload: Record<string, unknown>) => Promise<{ data?: unknown; error?: ResendError | null }>;
    };
  }
}
