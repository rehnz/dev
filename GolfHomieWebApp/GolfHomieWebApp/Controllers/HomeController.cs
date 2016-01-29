using System.Web.Mvc;
using GolfHomieWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;


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
    }


    }