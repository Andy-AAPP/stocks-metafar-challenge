export default {
  preset: "ts-jest", // Usa ts-jest para trabajar con TypeScript
  testEnvironment: "jsdom", // Entorno DOM simulado para pruebas
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"], // Archivo para configuraciones globales
  moduleNameMapper: {
    "\\.(css|scss|sass|less)$": "identity-obj-proxy", // Opcional: manejo de estilos
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Transforma TypeScript para Jest
  },
};
