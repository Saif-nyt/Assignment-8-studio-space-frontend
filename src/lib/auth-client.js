import { createAuthClient } from "better-auth/react";

// Same origin: the handler lives at /api/auth/[...all].
export const authClient = createAuthClient();
