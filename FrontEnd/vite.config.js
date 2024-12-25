import { defineConfig } from 'vite';


export default defineConfig({
  
    server: {
      proxy: {
        '/api': 'http://localhost:3000'  // Ensure the backend is running on port 3000
      }
    }
 
  
});
