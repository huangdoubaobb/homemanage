package com.home.homemanage.controller;

import com.home.homemanage.common.AbstractController;
import com.home.homemanage.model.User;
import com.home.homemanage.service.LoginService;
import com.home.homemanage.until.ResultResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * 类名称:LoginController
 * 类描述:TODO
 * 创建人:Owner
 * 创建时间:2020/1/6 15:53
 * Version 1.0
 */
@Controller
public class LoginController extends AbstractController {


    @Autowired
    private LoginService loginService;

    @RequestMapping("/login")
    public String login(Model model) {
        return "/login/login";
    }

    @RequestMapping("/toLogin")
    public ResultResponse toLogin(@RequestParam(value = "loginName", required = false) String loginName,
                                  @RequestParam(value = "password", required = false) String password) {
        ResultResponse result=new ResultResponse();
        User user1=loginService.getUserByLoginNameAndPassword(loginName,password);
        if (null==user1){
            result.fail();
            result.message("用户名密码错误，请重试！");
        }else{
            result.success();
            result.message("登录成功");
        }
        return result;
    }
}
