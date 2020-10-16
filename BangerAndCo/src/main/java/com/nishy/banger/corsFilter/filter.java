package com.nishy.banger.corsFilter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;




public class filter implements Filter {



    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        res.addHeader("Access-Control-Allow-Origin", "http://localhost:3000/");
        res.addHeader("Access-Control-Allow-Methods","PUT,DELETE,GET,POST,OPTIONS");

        res.addHeader("Access-Control-Allow-Headers","PUT,DELETE,GET,POST,OPTIONS");
        filterChain.doFilter(req, res);
    }


}
