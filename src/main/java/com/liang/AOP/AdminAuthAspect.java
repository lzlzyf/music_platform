package com.liang.AOP;

import com.liang.utils.AuthContextHolder;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

@Aspect
@Component
public class AdminAuthAspect {

    @Autowired
    private AuthContextHolder authContextHolder;

    @Before("@annotation(com.liang.AOP.AdminOnly)") // 修正注解路径
    public void checkAdmin(JoinPoint joinPoint) throws Exception {
        ServletRequestAttributes attributes =
                (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();

        if (!authContextHolder.isAdmin(request)) {
            throw new RuntimeException("无管理员权限"); // 推荐抛出运行时异常
        }
    }
}
