// Polyfill TextDecoder and TextEncoder for Node.js test environment
// These are needed by the WebAssembly module
import { TextDecoder, TextEncoder } from 'util';

// Make them available globally
(global as any).TextDecoder = TextDecoder;
(global as any).TextEncoder = TextEncoder;
