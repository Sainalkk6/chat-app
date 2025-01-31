export type AuthUserType = {
    accessToken: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    metadata: {
      createdAt: string;
      lastLoginAt: string;
      lastSignInTime: string;
      creationTime: string;
    } | null;
    phoneNumber: string | null;
    photoUrl: string | null;
    providerData: {
      displayName: string | null;
      email: string | null;
      phoneNumber: string | null;
      photoURL: string | null;
      providedId: string | null;
      uid: string;
    }[];
    uid: string;
  } | null;
  