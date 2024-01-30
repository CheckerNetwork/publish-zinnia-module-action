import core from '@actions/core'
import { ed25519 } from '@ucanto/principal'
import * as Client from '@web3-storage/w3up-client'
import { CarReader } from '@ipld/car'
import { importDAG } from '@ucanto/core/delegation'
import * as Name from 'w3name'
import { filesFromPaths } from 'files-from-path'
import assert from 'node:assert'

const parseProof = async data => {
  const blocks = []
  const reader = await CarReader.fromBytes(Buffer.from(data, 'base64'))
  for await (const block of reader.blocks()) {
    blocks.push(block)
  }
  return importDAG(blocks)
}

const main = async () => {
  const source = core.getInput('source')
  assert(source.endsWith('.tar.gz'), 'source must point to a .tar.gz file')

  const w3namePrivateKey = core.getInput('w3name-private-key')
  const w3nameRevision = core.getInput('w3name-revision')
  const w3upPrivateKey = core.getInput('w3up-private-key')
  const w3upProof = core.getInput('w3up-proof')

  const principal = ed25519.Signer.parse(w3upPrivateKey)
  const web3Storage = await Client.create({ principal })
  const proof = await parseProof(w3upProof)
  const space = await web3Storage.addSpace(proof)
  await web3Storage.setCurrentSpace(space.did())

  const name = await Name.from(w3namePrivateKey)
  const revision = Name.Revision.decode(w3nameRevision)

  const file = new File(
    await filesFromPaths([source]),
    'source.tar.gz',
    { type: 'application/gzip' }
  )
  const cid = await web3Storage.uploadFile(file)
  console.log(`Uploaded as ${cid}`)

  const nextRevision = await Name.increment(revision, `/ipfs/${cid}`)
  await Name.publish(nextRevision, name.key)
  console.log('Updated name')
}

main().catch(err => core.setFailed(err.message))
