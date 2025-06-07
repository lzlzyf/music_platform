package com.liang.AOP;

import com.liang.utils.AuthContextHolder;
import com.liang.utils.ResponseResult;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

@Aspect
@Component
public class AdminAspect {

    @Around("@annotation(com.liang.AOP.GetAdmin)")
    public Object checkAdminPermission(ProceedingJoinPoint joinPoint) throws Throwable {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attributes == null) {
            return new ResponseResult(500, "无法获取请求上下文", null);
        }
        HttpServletRequest request = attributes.getRequest();

        Long userId = AuthContextHolder.getUserIdToken(request);

        if (userId == null ) {
            return new ResponseResult(401, "无管理员权限", null);
        }

        return joinPoint.proceed();
    }
}
