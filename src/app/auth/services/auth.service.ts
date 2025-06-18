import { Injectable } from '@angular/core';
import {
  getAuth, onAuthStateChanged,
  signInWithEmailAndPassword, signOut,
  sendPasswordResetEmail, createUserWithEmailAndPassword,
  User
} from 'firebase/auth';
import { app } from '../../firebase.config';
import { ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = getAuth(app);

  /** Observable que se completa cuando Firebase responde por primera vez */
  readonly ready$ = new ReplaySubject<void>(1);

  constructor() {
    onAuthStateChanged(this.auth, () => {
      this.ready$.next();          // libera al guard
    });
  }

  /* ---------- API de autenticación ---------- */

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(uc =>
        uc.user.getIdToken().then(tok => localStorage.setItem('token', tok))
      );
  }

  logout() {
    localStorage.removeItem('token');
    return signOut(this.auth);
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  forgotPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  /* ---------- getters cómodos ---------- */

  /** Firebase devuelve Usuario o null */
  get currentUser(): User | null {
    return this.auth.currentUser;
  }

  get userEmail(): string {
    return this.currentUser?.email || '';
  }
}