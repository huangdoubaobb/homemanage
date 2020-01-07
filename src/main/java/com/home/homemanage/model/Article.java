package com.home.homemanage.model;

import lombok.Data;

/**
 * 类名称:Article
 * 类描述:TODO
 * 创建人:Owner
 * 创建时间:2020/1/6 14:56
 * Version 1.0
 */
@Data
public class Article {

    private String title;

    private String content;

    private String url;

    public Article(String title, String content, String url) {
        this.title = title;
        this.content = content;
        this.url = url;
    }
}
