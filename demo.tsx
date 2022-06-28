import DiffViewer from './src/main';

DiffViewer.config({
  API_BASE: "http://satellytes.lvh.me:3000/api",
  diffId: "31",
  token: "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTUsImV4cCI6MTY4NzkxMDQwMCwidHlwZSI6IlVzZXIifQ.B-dwN26Ct0cX6bubXbRFSWdEhLFHQkq4fTjuDMb4IJc",
  mode: "annotate",
})

DiffViewer.attach(document.getElementById("root"))
