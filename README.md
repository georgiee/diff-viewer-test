A simple test repo to prepare the distribution
of a react widget through a public cdn like jsdelivr.com.

The target output is umd as it's a library project to consume it easily in any html environment.
Vite is the backbone for the building and bundling.

## How to run locally

```
# run a local integration example. Make sure the rails backedn is locally available.
# This will mount a demo html file that will fetch data directly from Rails
yarn dev

# If you want to test the integration on the rails you need to provide the preview server
# that relies on buidls so you have to build with watch
# Then integrate umd build http://localhost:4173/diff-viewer.umd.js
yarn build:watch
yarn preview
```


## Consumption
In your target application you can consume the app as a widget/library
as the umd build ensures there is a global set to access, configuring and run the viewer.

```
<script src="http://localhost:10001/dist/bundle.min.js"></script>
<script>
  DiffViewer.config({API: "http://abc"})
  DiffViewer.attach(document.getElementById("diff-anchor"))
</script>

```

In case you want to integrate in production you can pull the latest build 
from `"https://cdn.jsdelivr.net/gh/georgiee/diff-viewer-test/dist/diff-viewer.umd.js`.
 
## Release
In order to release you have to run `yarn build` and check in the latest `dist/` folder.
That's the most pragmatic way and we do not release on npm yet.


If you need to bust the cache from jsdelivr invoke the url and swap `cdn` with `purge`
`https://purge.jsdelivr.net/gh/georgiee/diff-viewer-test/dist/diff-viewer.umd.js`

## Development
The Diff Viewer to display the diff works as is without any involvement of comments & annotations.
Instead it offers a way to pass in a `lineRenderer` that will be rendered after every single line.

We use that to implement the commenting functionality on top of the diff viewer.
Right now it's a provider to offer the data & api + the component which then fetches
the necessary data per line (if any).

