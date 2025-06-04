package com.liang.service;

import com.liang.domain.Song;

import java.util.List;

public interface SongService {
    void addSong(Song song);
    List<Song> getAllSongs();
    Song getSongById(int id);
    void updateSong(Song song);
    void deleteSong(int id);
}
