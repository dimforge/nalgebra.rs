nalgebra.org
============

This is the repository for [nalgebra.org](https://www.nalgebra.org).

## Working locally
To build, install the [yarn package manager](https://yarnpkg.com/) and run
```
yarn install
```
to install the required dependencies, and
```
yarn start
```
to serve the website locally.

### Troubleshooting

If you get an error like
```
at FSReqCallback.readFileAfterClose [as oncomplete] (node:internal/fs/read_file_context:68:3)
{
  opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'
}
```
you might be able to work around it with the following environment variable:
```
export NODE_OPTIONS=--openssl-legacy-provider
```