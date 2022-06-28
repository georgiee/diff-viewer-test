import DiffViewer from './src/main';


// mount the diff viewer in annotate mode (admin authoring annotations)
const annotateExample = () => DiffViewer.config({
  API_BASE: "http://satellytes.lvh.me:3000/api",
  diffId: "31",
  reviewId: "31",
  token: "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTUsImV4cCI6MTY4NzkxMDQwMCwidHlwZSI6IlVzZXIifQ.B-dwN26Ct0cX6bubXbRFSWdEhLFHQkq4fTjuDMb4IJc", // admin token
  mode: "annotate", // interview (admin), annotate (admin) or comment (applicant), provide a matching token for the given role
})

// mount the diff viewer in interview mode (admin checking comments and annotations in read only mode)
const interviewExample = () => DiffViewer.config({
  API_BASE: "http://satellytes.lvh.me:3000/api",
  diffId: "31",
  reviewId: "12",
  token: "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTUsImV4cCI6MTY4NzkxMDQwMCwidHlwZSI6IlVzZXIifQ.B-dwN26Ct0cX6bubXbRFSWdEhLFHQkq4fTjuDMb4IJc", // admin token
  mode: "interview", // interview (admin), annotate (admin) or comment (applicant), provide a matching token for the given role
})

// mount the diff viewer in comment mode (applicant authoring comments)
const commentExample = () => DiffViewer.config({
  API_BASE: "http://satellytes.lvh.me:3000/api",
  diffId: "31",
  token: "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTYsImV4cCI6MTY4NzkxMDQwMCwidHlwZSI6IkFwcGxpY2FudCJ9.r-vHLId9oMqsyXwj2zX_lQ8zOtoWj1a7sxp8zVrAWeE", // applicant token
  mode: "comment", // interview (admin), annotate (admin) or comment (applicant), provide a matching token for the given role
})

annotateExample();
// interviewExample();
// commentExample();
DiffViewer.attach(document.getElementById("root"))
