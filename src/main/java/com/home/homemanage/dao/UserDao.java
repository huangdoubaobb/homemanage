package com.home.homemanage.dao;

import com.home.homemanage.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * 类名称:UserDao
 * 类描述:TODO
 * 创建人:Owner
 * 创建时间:2020/1/8 16:44
 * Version 1.0
 */
public interface UserDao extends JpaRepository<User,Long> {

    User findByName(String loginName);
}
