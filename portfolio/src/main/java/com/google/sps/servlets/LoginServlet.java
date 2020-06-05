// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.BufferedReader;
import java.io.FileReader; 
import java.io.File;
import java.nio.file.Files; 
import java.nio.file.Paths;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
  static final String COMMENT_FORM_FILE_STRING = "/files/comment-form.txt";
  static final String USER_GREETING_FILE_STRING = "/files/user-greeting.txt";
  static final String GUEST_GREETING_FILE_STRING = "/files/guest-greeting.txt";
  static final String LOGIN_OPTIONS_FILE_STRING = "/files/login-options.txt";

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("text/html");
    String guest = request.getParameter("guest");
    PrintWriter out = response.getWriter();

    UserService userService = UserServiceFactory.getUserService();
    String greeting = "";
    String userEmail = "N/A";
    String commentForm = "";

    // Generates greeting for guests
    if (guest != null && guest.equals("true")){
        String loginUrl = userService.createLoginURL("/comments.html");
        try {
            greeting = getGuestGreeting(loginUrl);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Generates greeting for users
    else if(userService.isUserLoggedIn()){
        userEmail = userService.getCurrentUser().getEmail();
        String logoutUrl = userService.createLogoutURL("/comments.html");
        try {
            greeting = getUserGreeting(userEmail, logoutUrl);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Shows login options, if user is not logged in
    else {
      String loginUrl = userService.createLoginURL("/comments.html");
      String loginOptions = "";
        try {
            loginOptions = getLoginOptions(loginUrl);
        } catch (Exception e) {
            e.printStackTrace();
        }
      Gson gson = new Gson();
      out.println(gson.toJson(loginOptions));
      return;
    }

    // Generates comment form
    try {
        commentForm = createForm(greeting, userEmail);
    } catch (Exception e) {
        e.printStackTrace();
    }
    Gson gson = new Gson();
    response.getWriter().println(gson.toJson(commentForm));
  }

  /** Returns a the comment form, along with the specified greeting */
  private String createForm(String greeting, String userEmail) throws Exception{
    String commentFormHtml = new String(Files.readAllBytes(Paths.get(getClass().getResource(COMMENT_FORM_FILE_STRING).getFile())));
    commentFormHtml = String.format(commentFormHtml, greeting, userEmail);
    return commentFormHtml;
  }
  
  /** Returns a user greeting string */
  private String getUserGreeting(String userEmail, String logoutUrl) throws Exception{
    String greetingTemplate = new String(Files.readAllBytes(Paths.get(getClass().getResource(USER_GREETING_FILE_STRING).getFile())));
    String userGreeting = String.format(greetingTemplate, userEmail, logoutUrl);
    return userGreeting;
  }

  /** Returns a guest greeting string */
  private String getGuestGreeting(String loginUrl) throws Exception{
    String greetingTemplate = new String(Files.readAllBytes(Paths.get(getClass().getResource(GUEST_GREETING_FILE_STRING).getFile())));
    String guestGreeting = String.format(greetingTemplate, loginUrl);
    return guestGreeting;
  }

  /** Returns login options string */
  private String getLoginOptions(String loginUrl) throws Exception{
    String greetingTemplate = new String(Files.readAllBytes(Paths.get(getClass().getResource(LOGIN_OPTIONS_FILE_STRING).getFile())));
    String loginOptions = String.format(greetingTemplate, loginUrl);
    return loginOptions;
  }
}

