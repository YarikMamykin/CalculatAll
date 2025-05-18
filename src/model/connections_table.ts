import { ID } from "./id";

export class ConnectionsTable {
  private storage: Map<ID, Set<ID>>;

  constructor() {
    this.storage = new Map<ID, Set<ID>>();
  }

  public add(from: ID, to: ID) {
    this.storage.has(from)
      ? this.storage.get(from)?.add(to)
      : this.storage.set(from, new Set([to]));
  }

  public remove(which: ID, from: ID) {
    const widgetsConnectedToFrom = this.storage.get(from);
    if (widgetsConnectedToFrom) {
      1 === widgetsConnectedToFrom.size
        ? this.storage.delete(from)
        : widgetsConnectedToFrom.delete(which);
      return;
    }

    const widgetsConnectedToWhich = this.storage.get(which);
    if (widgetsConnectedToWhich) {
      1 === widgetsConnectedToWhich.size
        ? this.storage.delete(which)
        : widgetsConnectedToWhich.delete(from);
      return;
    }

    throw new Error("Invalid widgets IDs provided for removal!");
  }
}
