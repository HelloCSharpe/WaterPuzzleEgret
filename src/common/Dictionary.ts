class Dictionary {
  private items: Object;
  constructor() {
    this.items = {};
  }
  has(key: any): boolean {
    let item = this.items[key];
    return item != null;
  }
  set(key: any, val: any) {
    this.items[key] = val;
  }
  delete(key: any): boolean {
    if (this.has(key)) {
      delete this.items[key];
    }
    return false;
  }
  get(key: any): any {
    return this.has(key) ? this.items[key] : undefined;
  }
  values(): any[] {
    let values: any[] = [];
    for (let k in this.items) {
      if (this.has(k)) {
        values.push(this.items[k]);
      }
    }
    return values;
  }
}
