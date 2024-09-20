import { Paper, Typography, TextField, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as React from 'react';

import { Track, ALL_TRACKS, TrackListType } from '../models';
import TrackList from './TrackList';

const PlayerWrapper = styled(Paper)(() => ({
  width: 600,
  margin: 'auto',
  padding: 50,
  minHeight: 500,
}));

const PlayerHeader = styled(Typography)(() => ({
  textTransform: 'uppercase',
  fontWeight: 'bold',
  fontSize: 24,
}));

const SearchBarWrapper = styled(FormControl)(() => ({
  width: '300px',
  marginTop: '20px',
}));

const Player = () => {
  const [trackList, setTrackList] = React.useState<Track[]>(ALL_TRACKS);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [playlist, setPlaylist] = React.useState<Track[]>([]);

  const filterTracklist = (search: string) => {
    setSearchValue(search);

    const filtered = ALL_TRACKS.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );

    setTrackList(filtered);
  };

  const addTrack = (id: string) => {
    const selectedItem = trackList.find((item) => item.id === id);

    if (!selectedItem || playlist.includes(selectedItem)) {
      return;
    }

    setPlaylist((prev) => [...prev, { ...selectedItem, isSelected: false }]);
  };

  const addTracks = () => {
    const selectedTracks = trackList.filter((item) => item.isSelected);
    const playlistTracksIds = playlist.map((item) => item.id);

    const filtered = selectedTracks.filter(
      (item) => !playlistTracksIds.includes(item.id)
    );

    const updated = filtered.map((item) => ({
      ...item,
      isSelected: !item.isSelected,
    }));

    setPlaylist((prev) => [...prev, ...updated]);
  };

  const removeTrack = (id: string) => {
    const selectedItem = playlist.find((item) => item.id === id);

    if (!selectedItem) {
      return;
    }

    const selectedIndex = playlist.indexOf(selectedItem);

    setPlaylist((prev) =>
      prev.filter((item, index) => index !== selectedIndex)
    );
  };

  const removeTracks = () => {
    const selectedTracks = playlist.filter((item) => item.isSelected);
    const selectedTracksIndexes = selectedTracks.map((item) =>
      playlist.indexOf(item)
    );

    const updated = [...playlist];

    for (let i = selectedTracksIndexes.length - 1; i >= 0; i--) {
      updated.splice(selectedTracksIndexes[i], 1);
    }

    setPlaylist(updated);
  };

  const selectTrack = (
    isPlaylist: boolean,
    id: string,
    isSelected: boolean
  ) => {
    const selectedItem = isPlaylist
      ? playlist.find((item) => item.id === id)
      : trackList.find((item) => item.id === id);

    if (!selectedItem) {
      return;
    }
    isPlaylist
      ? setPlaylist((prev) =>
          prev.map((item) =>
            item.id === selectedItem.id
              ? { ...item, isSelected: isSelected }
              : item
          )
        )
      : setTrackList((prev) =>
          prev.map((item) =>
            item.id === selectedItem.id
              ? { ...item, isSelected: isSelected }
              : item
          )
        );
  };

  return (
    <PlayerWrapper>
      <PlayerHeader>Create your own unique playlist</PlayerHeader>

      <SearchBarWrapper>
        <TextField
          value={searchValue}
          onChange={(e: any) => filterTracklist(e.target.value)}
          label="Search"
          variant="outlined"
        />
      </SearchBarWrapper>

      {trackList.length ? (
        <TrackList
          tracks={trackList}
          listType={TrackListType.GENERAL_PLAYLIST}
          onActionTrack={addTrack}
          onTrackSelect={(id, isSelected) => selectTrack(false, id, isSelected)}
          onBulkActionTrack={addTracks}
        />
      ) : searchValue.length ? (
        <Typography style={{ marginTop: '20px' }}>Not found</Typography>
      ) : null}

      {!!playlist.length && (
        <TrackList
          tracks={playlist}
          listType={TrackListType.PERSONAL_PLAYLIST}
          onActionTrack={removeTrack}
          onTrackSelect={(id, isSelected) => selectTrack(true, id, isSelected)}
          onBulkActionTrack={removeTracks}
        />
      )}
    </PlayerWrapper>
  );
};

export default Player;
