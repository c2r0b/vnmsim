export type TypeFromWasm<T> = {
    [P in keyof T as Exclude<P, 'free'>]: 
      T[P] extends (...args: any[]) => any ? never : // Exclude functions
      T[P] extends BigInt64Array ? BigInt[] : // Handle ArrayBufferLike as array
      T[P] extends object ? TypeFromWasm<T[P]> : // Recursively apply TypeFromWasm for sub-objects
      T[P];
};