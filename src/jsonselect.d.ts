export interface IJsonSelectCompiled<T> {
  match: (selector: string, values: any, object: any) => T[];
  forEach: (selector: string, values: any, object: any, callback: (match: T) => void) => void;
}

export type Callback<T> = (match: T) => void;

declare module 'JSONSelect' {
  export function match<T>(selector: string, values: any, object: any): T[];
  export function match(selector: string, values: any, object: any): any[];

  export function forEach<T>(selector: string, values: any, object: any, callback: Callback<T>): void;
  export function forEach(selector: string, values: any, object: any, callback: Callback<any>): void;

  export function compile<T>(selector: string): IJsonSelectCompiled<T>;
  export function compile(selector: string): IJsonSelectCompiled<any>;
}
