import DiffViewer from './src/main';

DiffViewer.config({
  API_BASE: "http://satellytes.lvh.me:3000/api"
});

DiffViewer.attach(document.getElementById("root-annotations"), {
  diffId: "31",
  reviewId: "31",
  token: "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTUsImV4cCI6MTY4NzkxMDQwMCwidHlwZSI6IlVzZXIifQ.B-dwN26Ct0cX6bubXbRFSWdEhLFHQkq4fTjuDMb4IJc", // admin token
  mode: "annotate",
})

DiffViewer.attach(document.getElementById("root-comment"), {
  diffId: "31",
  reviewId: "12",
  token: "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTYsImV4cCI6MTY4NzkxMDQwMCwidHlwZSI6IkFwcGxpY2FudCJ9.r-vHLId9oMqsyXwj2zX_lQ8zOtoWj1a7sxp8zVrAWeE", // applicant token
  mode: "comment", // interview (admin), annotate (admin) or comment (applicant), provide a matching token for the given role
})

DiffViewer.attach(document.getElementById("root-interview"), {
  diffId: "31",
  reviewId: "12",
  token: "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTUsImV4cCI6MTY4NzkxMDQwMCwidHlwZSI6IlVzZXIifQ.B-dwN26Ct0cX6bubXbRFSWdEhLFHQkq4fTjuDMb4IJc", // admin token
  mode: "interview", // interview (admin), annotate (admin) or comment (applicant), provide a matching token for the given role
})
