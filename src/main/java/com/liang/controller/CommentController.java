package com.liang.controller;

import com.liang.domain.Song_list_comment;
import com.liang.service.CommentService;
import com.liang.utils.AuthContextHolder;
import com.liang.utils.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

import java.util.List;



@RestController
@RequestMapping("/sms/comment")
public class CommentController {

    @Autowired
     private CommentService commentService;

    //提交评价
    @RequestMapping("/submit")
    public ResponseResult submitComment(@RequestBody Song_list_comment comment,HttpServletRequest request){
        Long userId = AuthContextHolder.getUserIdToken(request);
        if(userId == null){
            return new ResponseResult(401,"未授权",null);
        }
        comment.setUser_id(userId.intValue());
        commentService.submitComment(comment);
        return new ResponseResult(200,"提交成功",null);
    }

    //查询评价
    @GetMapping("/List/{songListId}")
    public ResponseResult getComments(@PathVariable int songListId){
        List<Song_list_comment> comments = commentService.getCommentsBySongListId(songListId);
        return new ResponseResult(200,"查询成功",comments);
    }

    @PutMapping("/update")
    public ResponseResult updateComment(@RequestBody Song_list_comment comment,HttpServletRequest request){
         Long userId = AuthContextHolder.getUserIdToken(request);
          if(userId == null || comment.getUser_id() != userId.intValue()){
               return new ResponseResult(401,"未授权",null);
          }
        commentService.updateComment(comment);
        return new ResponseResult(200,"更新成功",null);

    }

    @DeleteMapping("/delete/{id}")
     public ResponseResult deleteComment(@PathVariable int id,HttpServletRequest request){
        Long userId = AuthContextHolder.getUserIdToken(request);
        if(userId == null){

            return new ResponseResult(401,"未授权",null);
        }
        Song_list_comment comment = commentService.selectById(id);
        if(comment !=null && comment.getUser_id() != userId.intValue()){

            return new ResponseResult(401,"未授权",null);
        }
        commentService.deleteComment(id);
        return new ResponseResult(200,"删除成功",null);
    }


}
