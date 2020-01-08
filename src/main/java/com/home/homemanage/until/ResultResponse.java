package com.home.homemanage.until;

import org.springframework.http.HttpStatus;

import java.util.HashMap;

/**
 * @author hsc
 */
public class ResultResponse extends HashMap<String, Object> {


    public ResultResponse code(HttpStatus status) {
        this.put("code", status.value());
        return this;
    }

    public ResultResponse message(String message) {
        this.put("message", message);
        return this;
    }

    public ResultResponse data(Object data) {
        this.put("data", data);
        return this;
    }

    public ResultResponse success() {
        this.code(HttpStatus.OK);
        return this;
    }

    public ResultResponse fail() {
        this.code(HttpStatus.INTERNAL_SERVER_ERROR);
        return this;
    }

    @Override
    public ResultResponse put(String key, Object value) {
        super.put(key, value);
        return this;
    }
}
