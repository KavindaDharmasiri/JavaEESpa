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
 * @Time_: 8:07 PM
 * @Project_Name : JavaEESpa
 **/

@WebServlet(urlPatterns = "/order")
public class Order extends HttpServlet {

    @Resource(name = "java:comp/env/jdbc/pool")
    DataSource ds;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String opt = req.getParameter("name");
        String orId = req.getParameter("oId");

        if (orId != null){
            opt = "SEARCH";
        }

        switch (opt) {
            case "GETALL":

                try {
                    String option = req.getParameter("option");

                    resp.setContentType("application/json");

                    Connection connection = ds.getConnection();
                    PrintWriter writer = resp.getWriter();

                    ResultSet rst = connection.prepareStatement("select * from orderDet").executeQuery();

                    JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();

                    while (rst.next()) {
                        String oId = rst.getString(1);
                        String code = rst.getString(2);
                        String cId = rst.getString(3);
                        String cusname = rst.getString(4);
                        int price = rst.getInt(5);
                        int qty = rst.getInt(6);
                        int total = rst.getInt(7);

                        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                        objectBuilder.add("oId", oId);
                        objectBuilder.add("itemCode", code);
                        objectBuilder.add("cId", cId);
                        objectBuilder.add("cusName", cusname);
                        objectBuilder.add("price", price);
                        objectBuilder.add("qty", qty);
                        objectBuilder.add("total", total);

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

                    PreparedStatement pstm = connection.prepareStatement("select * from orderdet where oId LIKE '%" + orId + "%'");

                    ResultSet rst = pstm.executeQuery();

                    orId=null;
                    JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();

                    while (rst.next()) {
                        String oId = rst.getString(1);
                        String code = rst.getString(2);
                        String cId = rst.getString(3);
                        String cusname = rst.getString(4);
                        int price = rst.getInt(5);
                        int qty = rst.getInt(6);
                        int total = rst.getInt(7);

                        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                        objectBuilder.add("oId", oId);
                        objectBuilder.add("itemCode", code);
                        objectBuilder.add("cId", cId);
                        objectBuilder.add("cusName", cusname);
                        objectBuilder.add("price", price);
                        objectBuilder.add("qty", qty);
                        objectBuilder.add("total", total);

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

            case "GETID":
                try {
                    String option = req.getParameter("option");

                    resp.setContentType("application/json");

                    Connection connection = ds.getConnection();
                    PrintWriter writer = resp.getWriter();

                    PreparedStatement pstm = connection.prepareStatement("SELECT oId FROM orderdet ORDER BY oId DESC LIMIT 1");
                    ResultSet rst = pstm.executeQuery();

                    JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();

                    String id = "O00-001";
                    if (rst.next()) {

                        int tempId = Integer.
                                parseInt(rst.getString(1).split("-")[1]);
                        tempId = tempId + 1;

                        if (tempId < 9) {
                            id = "O00-00" + tempId;

                        } else if (tempId < 99) {
                            id = "O00-0" + tempId;

                        } else {
                            id = "O00-" + tempId;
                        }

                    } else {
                        id = "O00-001";

                    }

                    JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                    objectBuilder.add("id", id);

                    arrayBuilder.add(objectBuilder.build());

                    while (rst.next()) {

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

        String orderID = jsonObject.getString("Oid");
        String itemCode = jsonObject.getString("code");
        String customerId = jsonObject.getString("cId");
        String customerName = jsonObject.getString("name");
        int price = jsonObject.getInt("price");
        int qty = jsonObject.getInt("qty");
        int total = jsonObject.getInt("total");

        PrintWriter writer = resp.getWriter();

        resp.setContentType("application/json");

        try {
            Connection connection = ds.getConnection();

            PreparedStatement pstm = connection.prepareStatement("Insert into orderdet values(?,?,?,?,?,?,?)");
            pstm.setObject(1, orderID);
            pstm.setObject(2, itemCode);
            pstm.setObject(3, customerId);
            pstm.setObject(4, customerName);
            pstm.setObject(5, price);
            pstm.setObject(6, qty);
            pstm.setObject(7, total);


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
        String customerID = req.getParameter("CusID");
        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");

        try {

            Connection connection = ds.getConnection();

            PreparedStatement pstm = connection.prepareStatement("Delete from customer where id=?");
            pstm.setObject(1, customerID);

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
        String customerID = jsonObject.getString("id");
        String customerName = jsonObject.getString("name");
        String customerAddress = jsonObject.getString("address");
        String customerSalary = jsonObject.getString("salary");
        PrintWriter writer = resp.getWriter();

        resp.setContentType("application/json");

        try {
            Connection connection = ds.getConnection();

            PreparedStatement pstm = connection.prepareStatement("Update customer set name=?,address=?,salary=? where id=?");
            pstm.setObject(1, customerName);
            pstm.setObject(2, customerAddress);
            pstm.setObject(3, customerSalary);
            pstm.setObject(4, customerID);


            if (pstm.executeUpdate() > 0) {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("status", 200);
                objectBuilder.add("message", "Successfully Updated");
                objectBuilder.add("data", "");
                writer.print(objectBuilder.build());
            } else {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("status", 400);
                objectBuilder.add("message", "Update Failed");
                objectBuilder.add("data", "");
                writer.print(objectBuilder.build());
            }

        } catch (SQLException throwables) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("status", 500);
            objectBuilder.add("message", "Update Failed");
            objectBuilder.add("data", throwables.getLocalizedMessage());
            writer.print(objectBuilder.build());
        }
    }
}
