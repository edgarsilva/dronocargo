import { createMuiTheme } from '@material-ui/core/styles';
// import { cyan } from '@material-ui/core/colors';
// import { yellow } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#0196b3"
    },
    secondary: {
      main: "#ffaa00"
    }
  },
  overrides: {
    MuiTextField: {
      root: {
        // borderColor: "green"
      },
      palette: {
        primary: {
          main: "#ffaa00"
        }
      }
    },
    MuiInput: {
      underline: {
        "&::after": {
          borderBottom: "2px solid #ffaa00"
        }
      },
      root: {
        '&$focused': {
          // borderBottom: "2px solid #ffaa00"
          // outline: `1px solid green`
        },
      }
    }
  }

});

export default theme;