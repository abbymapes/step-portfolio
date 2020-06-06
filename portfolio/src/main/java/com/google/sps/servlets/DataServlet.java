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

import com.google.sps.data.Comment;
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
import java.io.IOException;
import java.io.PrintWriter;
import java.io.BufferedReader;
import java.io.FileReader; 
import java.io.File;
import java.nio.file.Files; 
import java.nio.file.Paths;
import java.util.Random; 

/** Servlet that returns comments. */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

    static final String ANIMAL_FILE_STRING = "/files/animals.txt";

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    int userQuantity = getCommentQuantity(request);

    boolean all = (userQuantity == -1);

    Query query = new Query("Comment").addSort("timestamp", SortDirection.DESCENDING);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    List<Comment> comments = new ArrayList<>();

    int i = 0;
    for (Entity entity : results.asIterable()) {
        if (all == false && i >= userQuantity){
            break;
        }
        else{
            String userComment = (String) entity.getProperty("comment");
            String name = (String) entity.getProperty("name");
            String userEmail = (String) entity.getProperty("email");

            Comment comment = new Comment(name, userComment, userEmail);
            comments.add(comment);
        }
        ++i;
    }
    
    // Send the JSON as the response
    Gson gson = new Gson();
    response.setContentType("application/json;");
    response.getWriter().println(gson.toJson(comments));
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Get the input from the form.
    String userEmail = request.getParameter("email");
    String userComment = getParameter(request, "text-input", "empty");
    String userName = getParameter(request, "name-input", userEmail);

    if (userComment.equals("empty")){
        response.sendRedirect("/comments.html");
    }

    else{
      long timestamp = System.currentTimeMillis();

      Entity commentEntity = new Entity("Comment");
      commentEntity.setProperty("comment", userComment);
      commentEntity.setProperty("email", userEmail);
      commentEntity.setProperty("timestamp", timestamp);
      commentEntity.setProperty("name", userName);

      DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
      datastore.put(commentEntity);

      // Redirect back to the HTML page.
      response.sendRedirect("/comments.html");
    }
  }

    /**
   * @return the request parameter, or the default value if the parameter
   *         was not specified by the client
   */
  private String getParameter(HttpServletRequest request, String name, String defaultValue) {
    String value = request.getParameter(name);
    String animal = "";

    if (value == null || value.isEmpty() || value.split(" ").length == 0) {
        if (defaultValue.equals("N/A")){
            try {
                animal = getRandomAnimal();
            } catch (Exception e) {
                e.printStackTrace();
            }
            return "Anonymous " + animal;
        }
        return defaultValue;
    }
    return value;
  }
  /** Returns a random animal */
  private String getRandomAnimal() throws Exception{
    String animalString = new String(Files.readAllBytes(Paths.get(getClass().getResource(ANIMAL_FILE_STRING).getFile())));
    String[] animals = animalString.split("\n");
    Random rand = new Random();
    String animal = animals[rand.nextInt(animals.length)];
    String[] animal_words = animal.split(" ");
    for (int i = 0; i < animal_words.length; ++i){
        String word = animal_words[i];
        animal_words[i] = word.substring(0,1).toUpperCase() + word.substring(1);
    }
    String animal_proper = String.join(" ", animal_words);
    return animal_proper;
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