# DHIS2 Network Check

Minimalistic REACT component to warn user they're offline or their session expired.

![you're offline](.github/images/youre-offline.png)
![your session expired](.github/images/expired.png)

It's based on `notistack` https://www.npmjs.com/package/notistack  
Which uses amazing `REACT Material UI Snackbar` https://material-ui.com/components/snackbars/

## Installation

```
npm i @dhis2-app/network-check
npm i notistack
```

## Usage
```
import {SnackbarProvider} from 'notistack';
import {NetworkCheck} from '@dhis2-app/network-check';

<SnackbarProvider>
    <NetworkCheck intervalMs={5000} baseUrl='https://play.dhis2.org/'/>
</SnackbarProvider>
```

### Notes
`<NetworkCheck/>` component can be only used inside `<SnackbarProvider>` context.  

**Why?** `<SnackbarProvider>` manages output of info/alert messages. `<NetworkCheck/>` will share one instance of `<SnackbarProvider>` in your app with other services. Rather than overlapping over another existing instance.

## Development

```
git clone https://github.com/dhis2-app/network-check.git && cd network-check 
npm install
npm start
```

Don't forget to run tests
```
npm test
```

And build with:
```
npm build
```