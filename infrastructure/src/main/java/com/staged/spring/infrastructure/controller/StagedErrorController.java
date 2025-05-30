package com.staged.spring.infrastructure.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;

public class StagedErrorController implements ErrorController {
    @RequestMapping("/error")
    public String handleError() {
        return "error"; // Redirects to error.html
    }
}
