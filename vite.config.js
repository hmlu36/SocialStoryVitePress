export default {
  // ...existing code...
  base: process.env.VITE_BASE_URL || '/',
  define: {
    'process.env.BASE_URL': JSON.stringify(process.env.VITE_BASE_URL || '/')
  }
  // ...existing code...
}