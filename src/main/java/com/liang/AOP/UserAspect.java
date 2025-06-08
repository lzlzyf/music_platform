package com.liang.AOP;

import com.liang.utils.AuthContextHolder;
import com.liang.utils.ResponseResult;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

public class UserAspect {
    @Around("@annotation(com.liang.AOP.GetUser)")
    public Object checkAdminPermission(ProceedingJoinPoint joinPoint) throws Throwable {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attributes == null) {
            return new ResponseResult(500, "无法获取请求上下文", null);
        }
        HttpServletRequest request = attributes.getRequest();

        Long userId = AuthContextHolder.getUserIdToken(request);

        if (userId == null) {
            return new ResponseResult(401, "无权限", null);
        }

        return joinPoint.proceed();
    }
}
