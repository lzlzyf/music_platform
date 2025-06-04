package com.liang.service.impl;

import com.liang.domain.Song_list_comment;
import com.liang.mapper.SongListCommentMapper;
import com.liang.service.CommentService;
import com.liang.utils.AuthContextHolder;
import com.liang.utils.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.List;

@Service
public class CommentImplService implements CommentService {
    @Autowired
    private SongListCommentMapper commentMapper;

    @Override
    public void submitComment(Song_list_comment comment) {
        commentMapper.submitComment(comment);
    }




    @Override
    public List<Song_list_comment> getCommentsBySongListId(int songListId) {
        return commentMapper.selectBySongListId(songListId);
    }

    @Override
    public void updateComment(Song_list_comment comment) {
        commentMapper.updateComment(comment);
    }

    @Override
    public void deleteComment(int id) {
        commentMapper.deleteComment(id);
    }
}
