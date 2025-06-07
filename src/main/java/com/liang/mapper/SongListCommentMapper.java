package com.liang.mapper;

import com.liang.domain.Song_list_comment;
import com.liang.domain.Song_list_song;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface SongListCommentMapper {
    void submitComment(Song_list_comment comment);

    List<Song_list_comment> selectBySongListId(int songListId);

    void updateComment(Song_list_comment comment);

    void deleteComment(int id);

    Song_list_comment selectById(int id);
}
