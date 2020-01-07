package com.home.homemanage.controller;

import com.home.homemanage.model.Article;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;

/**
 * 类名称:LoginController
 * 类描述:TODO
 * 创建人:Owner
 * 创建时间:2020/1/6 15:53
 * Version 1.0
 */
@Controller
public class LoginController {

    @RequestMapping("/login")
    public String login(Model model) {
        return "/login/login";
    }

    @RequestMapping("/login")
    public String index(Model model) {
        return "/login/login";
    }
}
