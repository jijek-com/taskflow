import { Injectable } from "@angular/core";
import { BroadcastMessage, TaskOperation } from "../../types/tasks.type";

@Injectable({
  providedIn: 'root'
})
export class TasksListChannelBroadcastService {
  private channels = new Map<string, BroadcastChannel>();

  public connectChannel<T>(name: string): BroadcastChannel {
    if (!this.channels.has(name)) {
      this.channels.set(name, new BroadcastChannel(name));
    }
    return this.channels.get(name) as BroadcastChannel;
  }

  public sendMessage<T extends TaskOperation>(
    channelName: string,
    data: T
  ): void {
    const channel = this.connectChannel<T>(channelName);
    const message: BroadcastMessage<T> = { channel: channelName, data };

    channel.postMessage(message);
  }

  public onMessage<T>(
    channelName: string,
    callback: (message: BroadcastMessage<T>) => void
  ): void {
    const channel = this.connectChannel<T>(channelName);
    channel.onmessage = (event: MessageEvent) => {
      callback(event.data as BroadcastMessage<T>);
    };
  }

  public disconnectChannel(name: string): void {
    const channel = this.channels.get(name);
    if (channel) {
      channel.close();
      this.channels.delete(name);
    }
  }
}
