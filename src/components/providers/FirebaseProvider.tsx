import { getAuth } from 'firebase/auth';
import { AuthProvider, FirebaseAppProvider, useFirebaseApp } from 'reactfire';
import type { FC, ReactNode } from 'react';

type FirebaseProviderProps = {
  children?: ReactNode;
};

const FirebaseAuthProvider: FC<FirebaseProviderProps> = ({ children }) => {
  const firebaseApp = useFirebaseApp();
  const authSDK = getAuth(firebaseApp);
  return <AuthProvider sdk={authSDK}>{children}</AuthProvider>;
};

const FirebaseProvider: FC<FirebaseProviderProps> = ({ children }) => {
  const firebaseConfig = {
    apiKey: 'AIzaSyAgReUK3-kK-s5ZPuE95wOax08DgLyAYlo',
    authDomain: 'the-grid-8afc2.firebaseapp.com',
    projectId: 'the-grid-8afc2',
    storageBucket: 'the-grid-8afc2.appspot.com',
    messagingSenderId: '501590107568',
    appId: '1:501590107568:web:b25742b6fcea0f04ada275',
  };
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseAuthProvider>{children}</FirebaseAuthProvider>
    </FirebaseAppProvider>
  );
};

export default FirebaseProvider;
