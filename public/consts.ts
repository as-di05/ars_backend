const production = "https://turan-nedvijimost.kg";
const dev = "http://localhost:3001";

export const baseUrl = process.env.NODE_ENV === "production" ? production : dev;
