package com.liang.service;

import com.liang.domain.Song_list;

import java.util.List;

public interface SongListService {
    void createPlaylist(Song_list playlist);
    List<Song_list> getPlaylists();
    Song_list getPlaylistById(int id);
    void updatePlaylist(Song_list playlist);
    void deletePlaylist(int id);

}
