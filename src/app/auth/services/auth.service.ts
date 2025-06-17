import { Injectable } from '@angular/core';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  User
} from 'firebase/auth';
import { app } from '../../firebase.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = getAuth(app);

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(uc => uc.user.getIdToken().then(tok => localStorage.setItem('token', tok)));
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

  get currentUser(): User | null {
    return this.auth.currentUser;
  }

  get userEmail(): string {
    return this.currentUser?.email || '';
  }
}