export type TypeFromWasm<T> = {
    [P in keyof T as Exclude<P, 'free'>]: 
      T[P] extends (...args: any[]) => any ? never : // Exclude functions
      T[P] extends ArrayBufferLike ? T[P] : // Handle ArrayBufferLike directly (for Int32Array support)
      T[P] extends object ? TypeFromWasm<T[P]> : // Recursively apply TypeFromWasm for sub-objects
      T[P];
};