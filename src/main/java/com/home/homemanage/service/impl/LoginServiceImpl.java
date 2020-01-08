package com.home.homemanage.service.impl;

import com.home.homemanage.dao.UserDao;
import com.home.homemanage.model.User;
import com.home.homemanage.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 类名称:LoginServiceImpl
 * 类描述:TODO
 * 创建人:Owner
 * 创建时间:2020/1/7 15:20
 * Version 1.0
 */
@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private UserDao userDao;

    @Override
    public User getUserByName(String name) {
        return userDao.findByName(name);
    }

}
