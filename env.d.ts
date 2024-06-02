/// <reference types="vite/client" />

interface ImportMetaEnv {
     VITE_API_HOST: string;
     VITE_API_URI: string;
     VITE_ADMIN_URI: string;
     VITE_CLIENT_URI: string;
     VITE_AUTH_URI: string;
}

interface ImportMeta {
     readonly env: ImportMetaEnv;
}
