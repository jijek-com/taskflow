import { Injectable } from "@angular/core";
import { BroadcastMessage, TaskOperation } from "../../types/tasks.type";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TasksListChannelBroadcastService {
  private channels = new Map<string, BroadcastChannel>();
  private _messages$ = new Subject<BroadcastMessage<any>>();
  private listeners = new Map<string, any>();

  constructor() {
    this.initChannel('tasks-list-channel');
  }

  public get messages$(): Observable<BroadcastMessage<any>> {
    return this._messages$.asObservable();
  }

  public connectChannel<T>(name: string): BroadcastChannel {
    if (!this.channels.has(name)) {
      this.initChannel(name);
    }
    return this.channels.get(name)!;
  }

  public sendMessage<T extends TaskOperation>(
    channelName: string,
    data: T
  ): void {
    try {
      const channel = this.connectChannel(channelName);
      const message: BroadcastMessage<T> = { channel: channelName, data };
      channel.postMessage(message);
    } catch (error) {
      console.error(`Error posting message to ${channelName}:`, error);
    }
  }

  public onMessage<T>(
    channelName: string,
    callback: (message: BroadcastMessage<T>) => void
  ): void {
    const channel = this.connectChannel(channelName);
    if (this.listeners.has(channelName)) {
      channel.removeEventListener('message', this.listeners.get(channelName)!);
    }

    const listener = (event: MessageEvent) => callback(event.data as BroadcastMessage<T>);
    channel.addEventListener('message', listener);

    this.listeners.set(channelName, listener);
  }

  public disconnectChannel(name: string): void {
    const channel = this.channels.get(name);
    if (channel) {
      channel.close();
      this.channels.delete(name);
    }
  }

  private initChannel(name: string): void {
    const channel = new BroadcastChannel(name);
    this.channels.set(name, channel);
    channel.addEventListener('message', (event) => this._messages$.next(event.data));
  }
}
