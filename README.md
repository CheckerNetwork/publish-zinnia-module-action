# publish-zinnia-module-action
Publish a Zinnia module to the registry

## Usage

```yaml
steps:
  # The module source needs to be available
  - uses: dsaltares/fetch-gh-release-asset@master
    with:
      repo: 'filecoin-station/voyager'
      version: 'tags/v0.1.0'
      file: 'v0.1.0.tar.gz'
      token: ${{ secrets.GITHUB_TOKEN }}
  - uses: filecoin-station/publish-zinnia-module-action@v0
    with:
      source: v0.1.0.tar.gz
      w3up-private-key: ${{ secrets.W3UP_PRIVATE_KEY }}
      w3up-proof: ${{ secrets.W3UP_PROOF }}
      w3name-private-key: ${{ secrets.W3NAME_PRIVATE_KEY }}
      w3name-revision: ${{ secrets.W3NAME_REVISION }}
```
