package com.home.homemanage.service;

import com.home.homemanage.model.User;

public interface LoginService {

    User getUserByName(String name);

    User getUserByLoginNameAndPassword(String loginName,String password);

}
