using System.Web.Mvc;
using GolfHomieWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;
using System.Net.Http;
using Dapper;


namespace GolfHomieWebApp.Controllers
{
    public class HomeController : Controller
    {

        // GET HOME
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";
            
            return View();

        }

        public ActionResult Admin()
        {
            ViewBag.Message = "Your contact page.";

            return View();

        }
    
    
        public JsonResult GetUsers()
        {
            DataTableGenerator dtGen = new DataTableGenerator();
            DataTable usersDT = new DataTable();
                
            usersDT = dtGen.GetDataTable("Select id,fname,lname,email,username from Users");

            string usersJSONString = dtGen.ConvertDataTableToJSONString(usersDT);
         


            return Json(usersJSONString, JsonRequestBehavior.AllowGet);

        }



        public JsonResult CheckLogin(UsersModel user)
        {


           
            //use email and password to get full user model
            DataTable dt = new DataTableGenerator().GetDataTable("Select * from Users where email = '" + user.email.ToString() + "'and Password = '" + user.password.ToString() + "'");

                 if(dt.Rows.Count == 1 )
                 { 
                        DataRow dr = dt.Rows[0];

                       
                        UsersModel model = new UsersModel();
                       
                        model.email = dr["email"].ToString();
                        model.password = dr["password"].ToString();
                        model.id = Convert.ToInt32(dr["id"]);
                        model.fname = dr["fname"].ToString();
                        model.lname = dr["lname"].ToString();
                        model.username = dr["username"].ToString();

                     //SET THE GLOBAL SESSION USER INFO
                        Session["id"] = Convert.ToInt32(dr["id"]);
                        Session["email"] = dr["email"].ToString();
                        Session["password"] = dr["password"].ToString();       
                        Session["fname"] = dr["fname"].ToString();
                        Session["lname"] = dr["lname"].ToString();
                        Session["username"] = dr["username"].ToString();


                        return Json(model, JsonRequestBehavior.AllowGet);
                 }
                 else
                 {
                     return Json(new UsersModel(),JsonRequestBehavior.AllowGet);
                 }
 
            }

        public ActionResult SignOut()
        {
            Session.Abandon();
            return RedirectToAction("Index");
        }

        public JsonResult Register(UsersModel newUser)
        {

            DataTable dt = new DataTableGenerator().GetDataTable(@"Select * from Users where email = '" + newUser.email.ToString() + "'");

            if (dt.Rows.Count == 1)
            {
                return Json(new UsersModel(), JsonRequestBehavior.AllowGet);
            }
            else
            {
                UsersModel model = new UsersModel();
                SqlTool sql = new SqlTool();

                model.fname = newUser.fname;
                model.lname = newUser.lname;
                model.username = newUser.username;
                model.password = newUser.password;
                model.email = newUser.email;

                sql.runQuery("Insert into Users (fname,lname,email,password,username) select '" + model.fname.ToString() + "','" +
                    model.lname.ToString() + "','" + model.email.ToString() + "','" + model.password.ToString() + "','" +
                    model.username + "'");

                return Json(model, JsonRequestBehavior.AllowGet);

            }



        }


    }





    }


  