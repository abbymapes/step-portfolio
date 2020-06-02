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
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import com.google.gson.Gson;

/** Servlet that returns comments. */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    int userQuantity = getCommentQuantity(request);

    boolean all = (userQuantity == -1);

    Query query = new Query("Comment").addSort("timestamp", SortDirection.DESCENDING);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    List<String> comments = new ArrayList<>();

    int i = 0;
    for (Entity entity : results.asIterable()) {
        if (all == false && i >= userQuantity){
            break;
        }
        else{
            String comment = (String) entity.getProperty("comment");
            comments.add(comment);
        }
        ++i;
    }

    String json = convertToJsonUsingGson(comments);

    // Send the JSON as the response
    response.setContentType("application/json;");
    response.getWriter().println(json);
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Get the input from the form.
    String userComment = getParameter(request, "text-input", "empty");

    if (userComment.equals("empty")){
        response.sendRedirect("/index.html");
    }

    else{
      long timestamp = System.currentTimeMillis();

      Entity commentEntity = new Entity("Comment");
      commentEntity.setProperty("comment", userComment);
      commentEntity.setProperty("timestamp", timestamp);

      DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
      datastore.put(commentEntity);

      // Redirect back to the HTML page.
      response.sendRedirect("/index.html");
    }
  }

  private String convertToJsonUsingGson(List<String> list) {
    Gson gson = new Gson();
    String json = gson.toJson(list);
    return json;
  }

    /**
   * @return the request parameter, or the default value if the parameter
   *         was not specified by the client
   */
  private String getParameter(HttpServletRequest request, String name, String defaultValue) {
    String value = request.getParameter(name);
    if (value == null || value.isEmpty() || value.split(" ").length == 0 || value.equals("Write Comment Here")) {
      return defaultValue;
    }

    return value;
  }


   /** Returns the quantity of comments chosen by the user or
    *  the default value if the parameter was not specified by the client 
    *  -1 will represent the "All" comments choice
    */
  private int getCommentQuantity(HttpServletRequest request) {
    // Get the input from the form.
    String quantityString = request.getParameter("quantity");

    if (quantityString ==null) {return -1;}
    if (quantityString.toLowerCase().equals("all")) {return -1;}

    // Convert the input to an int.
    int quantity;
    try {
      quantity = Integer.parseInt(quantityString);
    } catch (NumberFormatException e) {
      System.err.println("Could not convert to int: " + quantityString);
      return -1;
    }
    return quantity;
  }
}