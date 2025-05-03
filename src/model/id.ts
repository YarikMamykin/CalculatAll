export class ID {
  private readonly _id: string;

  constructor(id?: string) {
    this._id = id ?? this.generateId();
  }
  public equals(other: ID): boolean {
    return other instanceof ID && this._id === other._id;
  }

  public toString(): string {
    return this._id;
  }

  private generateId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).slice(2, 8);
    return `${timestamp}${random}`;
  }
}
