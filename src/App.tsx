import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { styled, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';

import Player from './modules/player/components/Player';

import theme from './theme';

const Background = styled(Box)(() => ({
  backgroundColor: grey[200],
  height: 'calc(100vh - 118px)',
  paddingTop: 100,
}));

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Background>
        <Player />
      </Background>
    </ThemeProvider>
  );
};

export default App;
