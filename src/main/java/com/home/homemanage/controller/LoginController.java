package com.home.homemanage.controller;

import com.home.homemanage.model.User;
import com.home.homemanage.service.LoginService;
import com.home.homemanage.until.ResultResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 类名称:LoginController
 * 类描述:TODO
 * 创建人:Owner
 * 创建时间:2020/1/6 15:53
 * Version 1.0
 */
@Controller
public class LoginController {


    @Autowired
    private LoginService loginService;

    @RequestMapping("/login")
    public String login(Model model) {
        return "/login/login";
    }

    @RequestMapping("/toLogin")
    public ResultResponse toLogin(@RequestBody User user) {
        ResultResponse result=new ResultResponse();
        loginService.getUserByName(user.getLoginName());
        return result;
    }
}
