package com.home.homemanage.Exception;

import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.authz.AuthorizationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 类名称:LoginExceptionHandler
 * 类描述:TODO
 * 创建人:Owner
 * 创建时间:2020/1/7 15:58
 * Version 1.0
 */
@ControllerAdvice
@Slf4j
public class LoginExceptionHandler {

    @ExceptionHandler
    @ResponseBody
    public String ErrorHandler(AuthorizationException e) {
        log.error("没有通过权限验证！", e);
        return "没有通过权限验证！";
    }
}
