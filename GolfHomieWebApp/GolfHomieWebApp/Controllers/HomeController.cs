using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using GolfHomieWebApp.Models;

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

        public JsonResult GetUsers()
        {

            UsersModel users = new UsersModel();
            users.name = "Rene";
            users.id = 1;
            return Json(users, JsonRequestBehavior.AllowGet);
            
        }


    }
}