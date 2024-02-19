# publish-zinnia-module-action
Publish a Zinnia module to the registry

## Usage

*DEPRECATED*

Use [web3-storage-upload-file-action](https://github.com/marketplace/actions/web3-storage-upload-file-action) and [w3name-update-action](https://github.com/marketplace/actions/w3name-update-action) instead:

```yaml
steps:
  - run: curl -L https://api.github.com/repos/${{ github.repository }}/tarball/${{ github.sha }} > source.tar.gz
  - uses: filecoin-station/web3-storage-upload-file-action@v0
    id: upload
    with:
      path: source.tar.gz
      private-key: ${{ secrets.W3UP_PRIVATE_KEY }}
      proof: ${{ secrets.W3UP_PROOF }}
  - uses: filecoin-station/w3name-update-action@v0
    with:
      value: "/ipfs/${{ steps.upload.outputs.cid }}"
      private-key: ${{ secrets.W3NAME_PRIVATE_KEY }}
      revision: ${{ secrets.W3NAME_REVISION }}
```

See https://web3.storage/docs/how-to/upload/#bring-your-own-delegations for
`w3up-*` credentials.

For `w3name-*`, use a script like [scripts/w3name.js](./scripts/w3name.js).
