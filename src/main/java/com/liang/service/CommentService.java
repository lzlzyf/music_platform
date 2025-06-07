package com.liang.service;

import com.liang.domain.Song_list_comment;

import java.util.List;

public interface CommentService {
    void submitComment(Song_list_comment comment);
    List<Song_list_comment> getCommentsBySongListId(int songListId);
    void updateComment(Song_list_comment comment);
    void deleteComment(int id);
    Song_list_comment selectById(int id);
}
