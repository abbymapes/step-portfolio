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


@WebServlet("/login")
public class LoginServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    UserService userService = UserServiceFactory.getUserService();

    // If user is not logged in, show a login form (could also redirect to a login page)
    if (!userService.isUserLoggedIn()) {
      String loginUrl = userService.createLoginURL("/comments.html");
      String output = "<p>To leave a comment, login <a href=\"" + loginUrl + "\">here</a>.</p>";
      Gson gson = new Gson();
      out.println(gson.toJson(output));
      return;
    }

    // User is logged in, so the request can proceed
    String userEmail = userService.getCurrentUser().getEmail();
    String logoutUrl = userService.createLogoutURL("/comments.html");
    
    String output = "";
    output = "<p>You are logged in as: " + userEmail + "</p>";
    output += "<p>To comment from a different email, <a href=\"" + logoutUrl + "\">logout</a>.</p>";
    output += "Leave a display name and your comment below. Thanks for the feedback!</p>";
    output += "<form action = \"/data?email="+ userEmail + "\" method = \"POST\">"+
                "<p style=\"font-size:18pt\"><br> Leave a Comment: <br></p>"+
                "<textarea name=\"name-input\" placeholder=\"Write Display Name Here\" id = \"name-input\"></textarea>"+
                "<br><br>"+
                "<textarea name=\"text-input\" placeholder=\"Write Comment Here\"></textarea>"+
                "<br><br>"+
                "<input type=\"submit\"/>"+
                "<br><br>"+
                "</form>";
    Gson gson = new Gson();
    response.getWriter().println(gson.toJson(output));
  }

  /** Returns the nickname of the user with id, or null if the user has not set a nickname. */
  private String getUserNickname(String id) {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Query query =
        new Query("UserInfo")
            .setFilter(new Query.FilterPredicate("id", Query.FilterOperator.EQUAL, id));
    PreparedQuery results = datastore.prepare(query);
    Entity entity = results.asSingleEntity();
    if (entity == null) {
      return null;
    }
    String nickname = (String) entity.getProperty("nickname");
    return nickname;
  }
}

