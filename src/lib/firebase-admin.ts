import * as admin from "firebase-admin";

const adminConfig = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

export const adminApp = 
  admin.apps.length === 0 
    ? admin.initializeApp({
        credential: admin.credential.cert(adminConfig),
      })
    : admin.apps[0];
