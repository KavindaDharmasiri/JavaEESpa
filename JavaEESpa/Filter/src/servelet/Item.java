package servelet;

import javax.annotation.Resource;
import javax.json.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @Created_By_: Kavinda Gimhan
 * @Date_: 5/4/2022
 * @Time_: 8:28 PM
 * @Project_Name : JavaEESpa
 **/

@WebServlet(urlPatterns = "/item")
public class Item extends HttpServlet {

    @Resource(name = "java:comp/env/jdbc/pool")
    DataSource ds;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {


        String opt = req.getParameter("option");
        String cusId = req.getParameter("code");



        switch (opt) {
            case "GETALL":
                try {
                    String option = req.getParameter("option");

                    resp.setContentType("application/json");

                    Connection connection = ds.getConnection();
                    PrintWriter writer = resp.getWriter();

                    ResultSet rst = connection.prepareStatement("select * from item").executeQuery();

                    JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();

                    while (rst.next()) {
                        String code = rst.getString(1);
                        String name = rst.getString(2);
                        String qty = rst.getString(3);
                        double price = rst.getDouble(4);

                        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                        objectBuilder.add("code", code);
                        objectBuilder.add("name", name);
                        objectBuilder.add("qty", qty);
                        objectBuilder.add("price", price);

                        arrayBuilder.add(objectBuilder.build());
                    }

                    JsonObjectBuilder response = Json.createObjectBuilder();
                    response.add("status", 200);
                    response.add("message", "Done");
                    response.add("data", arrayBuilder.build());
                    writer.print(response.build());

                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
                break;

            case "SEARCH":


                try {

                    String option = req.getParameter("option");

                    resp.setContentType("application/json");

                    Connection connection = ds.getConnection();
                    PrintWriter writer = resp.getWriter();

                    PreparedStatement pstm = connection.prepareStatement("select * from item where code LIKE '%" + cusId + "%'");

                    ResultSet rst = pstm.executeQuery();

                    cusId=null;
                    JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();

                    while (rst.next()) {
                        String code = rst.getString(1);
                        String name = rst.getString(2);
                        String qty = rst.getString(3);
                        int price = rst.getInt(4);

                        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                        objectBuilder.add("code", code);
                        objectBuilder.add("name", name);
                        objectBuilder.add("qty", qty);
                        objectBuilder.add("price", price);

                        arrayBuilder.add(objectBuilder.build());
                    }

                    JsonObjectBuilder response = Json.createObjectBuilder();
                    response.add("status", 200);
                    response.add("message", "Done");
                    response.add("data", arrayBuilder.build());
                    writer.print(response.build());

                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
                break;

        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        JsonReader reader = Json.createReader(req.getReader());
        JsonObject jsonObject = reader.readObject();
        String itemCode = jsonObject.getString("code");
        String itemName = jsonObject.getString("name");
        String itemQty = jsonObject.getString("qty");
        String itemPrice = jsonObject.getString("price");
        PrintWriter writer = resp.getWriter();

        resp.setContentType("application/json");

        try {
            Connection connection = ds.getConnection();

            PreparedStatement pstm = connection.prepareStatement("Insert into item values(?,?,?,?)");
            pstm.setObject(1, itemCode);
            pstm.setObject(2, itemName);
            pstm.setObject(3, itemQty);
            pstm.setObject(4, itemPrice);


            if (pstm.executeUpdate() > 0) {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("status", 200);
                objectBuilder.add("message", "Successfully Saved");
                objectBuilder.add("data", "");
                writer.print(objectBuilder.build());
            } else {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("status", 400);
                objectBuilder.add("message", "Save Failed");
                objectBuilder.add("data", "");
                writer.print(objectBuilder.build());
            }

        } catch (SQLException throwables) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("status", 500);
            objectBuilder.add("message", "Save Failed");
            objectBuilder.add("data", throwables.getLocalizedMessage());
            writer.print(objectBuilder.build());
        }
    }


    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String itemCode = req.getParameter("code");
        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");

        try {
            Connection connection = ds.getConnection();

            PreparedStatement pstm = connection.prepareStatement("Delete from item where code=?");
            pstm.setObject(1, itemCode);

            if (pstm.executeUpdate() > 0) {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("status", 200);
                objectBuilder.add("data", "");
                objectBuilder.add("message", "Successfully Deleted");
                writer.print(objectBuilder.build());
            } else {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("status", 400);
                objectBuilder.add("data", "Wrong Id Inserted");
                objectBuilder.add("message", "");
                writer.print(objectBuilder.build());
            }


        } catch (SQLException throwables) {
            resp.setStatus(200);
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("status", 500);
            objectBuilder.add("message", "Error");
            objectBuilder.add("data", throwables.getLocalizedMessage());
            writer.print(objectBuilder.build());
        }

    }


    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        JsonReader reader = Json.createReader(req.getReader());
        JsonObject jsonObject = reader.readObject();
        String itemCode = jsonObject.getString("code");
        String itemName = jsonObject.getString("name");
        String itemQty = jsonObject.getString("qty");
        String itemPrice = jsonObject.getString("price");
        PrintWriter writer = resp.getWriter();

        resp.setContentType("application/json");

        try {
            Connection connection = ds.getConnection();

            PreparedStatement pstm = connection.prepareStatement("Update item set name=?,qty=?,price=? where code=?");

            pstm.setObject(1, itemName);
            pstm.setObject(2, itemQty);
            pstm.setObject(3, itemPrice);
            pstm.setObject(4, itemCode);

            if (pstm.executeUpdate() > 0) {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("status", 200);
                objectBuilder.add("message", "Successfully Saved");
                objectBuilder.add("data", "");
                writer.print(objectBuilder.build());
            } else {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("status", 400);
                objectBuilder.add("message", "Save Failed");
                objectBuilder.add("data", "");
                writer.print(objectBuilder.build());
            }

        } catch (SQLException throwables) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("status", 500);
            objectBuilder.add("message", "Save Failed");
            objectBuilder.add("data", throwables.getLocalizedMessage());
            writer.print(objectBuilder.build());
        }
    }
}
