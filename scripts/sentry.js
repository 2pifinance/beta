const SentryCli = require('@sentry/cli')

const createRelease = async () => {
  const cli     = new SentryCli()
  const release = process.env.NEXT_PUBLIC_SENTRY_RELEASE

  if (! release) {
    console.warn('NEXT_PUBLIC_SENTRY_RELEASE is not set')
    return
  }

  try {
    const options = {
      include:   ['out/_next/static/chunks'],
      urlPrefix: '~/_next/static/chunks',
      rewrite:   false
    }

    console.log(`Creating sentry release ${release}`)
    await cli.releases.new(release)

    console.log('Uploading source maps')
    await cli.releases.uploadSourceMaps(release, options)

    console.log('Finalizing release')
    await cli.releases.finalize(release)
  } catch (error) {
    console.error('Source maps uploading failed:', error)
    process.exit(1)
  }
}

createRelease()
