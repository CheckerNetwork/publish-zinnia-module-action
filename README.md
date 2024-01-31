# publish-zinnia-module-action
Publish a Zinnia module to the registry

## Usage

```yaml
steps:
  - run: curl -L https://api.github.com/repos/${{ github.repository }}/tarball/${{ github.sha }} > source.tar.gz
  - uses: filecoin-station/publish-zinnia-module-action@v0
    with:
      source: source.tar.gz
      w3up-private-key: ${{ secrets.W3UP_PRIVATE_KEY }}
      w3up-proof: ${{ secrets.W3UP_PROOF }}
      w3name-private-key: ${{ secrets.W3NAME_PRIVATE_KEY }}
      w3name-revision: ${{ secrets.W3NAME_REVISION }}
```

See https://web3.storage/docs/how-to/upload/#bring-your-own-delegations for
`w3up-*` credentials.

For `w3name-*`, use a script like [scripts/w3name.js](./scripts/w3name.js).
