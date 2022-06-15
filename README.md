A simple test repo to prepare the distribution
of a react widget through a public cdn like jsdelivr.com.

I pulled in rollup with the goal to publish the react widget
with UMD in order to consume it from a script tag loaded from jsdelivr.com

See the file `index.html` how this works.

## How to run locally

```
# run rollup in watch mode
# this will also serve the root content and index.html loads the bundle from `dist/`.
yarn build:watch

# Access http://localhost:10001
```

In another application locally you can then easily consume it for testing purposes,
which is the goal for a target Rails application in this case:

```
<script src="http://localhost:10001/dist/bundle.min.js"></script>
<script>
  DiffViewer.config({API: "http://abc"})
  DiffViewer.attach(document.getElementById("diff-anchor"))
</script>

```


## Next Steps
Either publish to npm to use the artefacts from there
or for a slightly more pragmatic approach: commit the dist folder
which I will do for now.