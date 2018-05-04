export interface Responder {
  sendOperationSuccess(): void;
  sendOperationError(message: string, status?: number): void;
  invalidLogin(): void;
  invalidRegistration(): void;
  invalidAccess(): void;
  setCookie(key: string, value: string, user: any): void;
  removeCookie(key: string): void;
}
