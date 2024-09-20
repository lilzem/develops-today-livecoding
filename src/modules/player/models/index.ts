export enum TrackListType {
  GENERAL_PLAYLIST = 'general_playlist', // for TrackList
  PERSONAL_PLAYLIST = 'personal_playlist', // for Playlist
}

export enum TrackAction {
  Add = "Add",
  Remove = "Remove"
}

export type Track = {
  id: string;
  title: string;
  duration: number; // duration in seconds
  isSelected: boolean;
};

export const ALL_TRACKS: Track[] = [
  { id: '1', title: 'Summer Breeze', duration: 215, isSelected: false },
  { id: '2', title: 'Autumn Leaves', duration: 180, isSelected: false },
  { id: '3', title: 'Winter Winds', duration: 240, isSelected: false },
  { id: '4', title: 'Spring Dance', duration: 200, isSelected: false },
  { id: '5', title: 'Rainy Mood', duration: 195, isSelected: false },
];
