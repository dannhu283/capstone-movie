import axios from "axios";

// Setup axios instance
const fetcher = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MiIsIkhldEhhblN0cmluZyI6IjIxLzAyLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwODQ3MzYwMDAwMCIsIm5iZiI6MTY4MTE0NjAwMCwiZXhwIjoxNzA4NjIxMjAwfQ.2JFd_iMYjvwU4SaKsLmL_x-kEZcKonddkHVR7z3Gxbc",
  },
});

export default fetcher;
