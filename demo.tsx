import DiffViewer from './src/main';
import axios from 'axios';

const API_BASE = "http://satellytes.lvh.me:3000/api"

// fetch some demo data includin tokens
const {data}: any = await axios.get(`${API_BASE}/demo` ) ;

const apiDatasets = {
  reviewId: data.reviewId,
  diffId: data.diffId
}

DiffViewer.config({
  API_BASE: `${API_BASE}/v1`
});

DiffViewer.attach(document.getElementById("root-annotations"), {
  ...apiDatasets,
  token: data.userToken,
  mode: "annotate",
})

DiffViewer.attach(document.getElementById("root-comment"), {
  ...apiDatasets,
  token: data.applicantToken,
  mode: "comment", // interview (admin), annotate (admin) or comment (applicant), provide a matching token for the given role
})

DiffViewer.attach(document.getElementById("root-interview"), {
  ...apiDatasets,
  token: data.userToken,
  mode: "interview", // interview (admin), annotate (admin) or comment (applicant), provide a matching token for the given role
})
