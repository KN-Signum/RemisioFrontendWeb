type EventsMap = Record<string, (...args: never[]) => void>;

export class MyEventEmitter<T extends EventsMap> {
  private listeners = new Map<keyof T, T[keyof T][]>();

  on<K extends keyof T>(event: K, listener: T[K]) {
    const arr = this.listeners.get(event) ?? [];
    arr.push(listener);
    this.listeners.set(event, arr);
    return () => this.off(event,listener)
  }

  off<K extends keyof T>(event: K, listener: T[K]) {
    const arr = this.listeners.get(event);
    if (!arr) return;
    this.listeners.set(event, arr.filter(l => l !== listener));
  }

  emit<K extends keyof T>(event: K, ...args: Parameters<T[K]>) {
    const arr = this.listeners.get(event);
    if (!arr) return;
    arr.forEach(fn => fn(...args));
  }
}
type MyEvents = {
    refreshTokenSuccess: ()=>void,
    refreshTokenFailure: ()=>void,
    showNotification: (msg:string)=>void
}

export const eventBus = new MyEventEmitter<MyEvents>()