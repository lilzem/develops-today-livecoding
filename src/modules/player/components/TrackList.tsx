import { Box, Button, Grid, Typography, Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as React from 'react';

import { Track, TrackListType, TrackAction } from '../models';
import { formatDuration, mockFunction } from '../helpers';

const TrackListWrapper = styled(Box)(() => ({
  paddingTop: 20,
}));

const TrackListHeader = styled(Typography)(() => ({
  textTransform: 'uppercase',
  fontWeight: 'bold',
  fontSize: 20,
}));

type TrackListProps = {
  tracks: Track[];
  onTrackSelect?: (trackId: string, isSelected: boolean) => void;
  onActionTrack?: (trackId: string) => void;
  onBulkActionTrack?: () => void;
  listType: TrackListType;
};

const TrackList: React.FC<TrackListProps> = ({
  tracks,
  onTrackSelect = mockFunction,
  onActionTrack = mockFunction,
  onBulkActionTrack = mockFunction,
  listType,
}) => {
  const selectedTracksLength = tracks.filter(
    (track) => track.isSelected
  ).length;

  const actionType =
    listType === TrackListType.GENERAL_PLAYLIST
      ? TrackAction.Add
      : TrackAction.Remove;

  return (
    <TrackListWrapper>
      {listType === TrackListType.PERSONAL_PLAYLIST && (
        <TrackListHeader>Your playlist</TrackListHeader>
      )}

      {tracks.map(({ id, title, duration, isSelected }) => (
        <Grid container key={id} alignItems="center" gap="10px">
          <Grid item>
            <Checkbox
              size="small"
              checked={isSelected}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onTrackSelect(id, e.target.checked)
              }
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Grid>

          <Grid item xs={4}>
            <Typography>{title}</Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography>{formatDuration(duration)}</Typography>
          </Grid>

          <Button
            variant="outlined"
            size="small"
            onClick={() => onActionTrack(id)}
          >
            {actionType === TrackAction.Add ? '+' : '-'}
          </Button>
        </Grid>
      ))}

      {!!selectedTracksLength && (
        <Button
          variant="outlined"
          style={{ marginTop: '20px' }}
          onClick={onBulkActionTrack}
        >
          {`${actionType} ${selectedTracksLength} track${
            selectedTracksLength !== 1 ? 's' : ''
          }`}
        </Button>
      )}
    </TrackListWrapper>
  );
};

export default TrackList;
