import DiffViewer from './src/main';
const apiDatasets = {
  reviewId: 18,
  diffId: 39
}
const applicant = {
  token: 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MjEsImV4cCI6MTY4NzkxMDQwMCwidHlwZSI6IkFwcGxpY2FudCJ9.cqY9yYakQ_VeyPbdICymKLCe57sY2BWGzg37kOeaXPI'
}
const admin = {
  token: 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTksImV4cCI6MTY4NzkxMDQwMCwidHlwZSI6IlVzZXIifQ.VVc1vsJa6ywdSSCA-vg_bChnnOutT9aVTwI186upGxo'
}

DiffViewer.config({
  API_BASE: "http://satellytes.lvh.me:3000/api"
});

DiffViewer.attach(document.getElementById("root-annotations"), {
  ...apiDatasets,
  ...admin,
  mode: "annotate",
})

DiffViewer.attach(document.getElementById("root-comment"), {
  ...apiDatasets,
  ...applicant,
  mode: "comment", // interview (admin), annotate (admin) or comment (applicant), provide a matching token for the given role
})

DiffViewer.attach(document.getElementById("root-interview"), {
  ...apiDatasets,
  ...admin,
  mode: "interview", // interview (admin), annotate (admin) or comment (applicant), provide a matching token for the given role
})
