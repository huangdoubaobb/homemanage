package com.home.homemanage.common;

import com.home.homemanage.model.User;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;

/**
 * 类名称:AbstractController
 * 类描述:公共控制器
 * 创建人:hsc
 * 创建时间:2020/1/8 17:04
 * Version 1.0
 */
public class AbstractController {
    private Subject getSubject() {
        return SecurityUtils.getSubject();
    }

    protected User getCurrentUser() {
        return (User) getSubject().getPrincipal();
    }

    protected Session getSession() {
        return getSubject().getSession();
    }

    protected Session getSession(Boolean flag) {
        return getSubject().getSession(flag);
    }

    protected void login(AuthenticationToken token) {
        getSubject().login(token);
    }
}
