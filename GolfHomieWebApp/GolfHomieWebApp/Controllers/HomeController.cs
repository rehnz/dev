using System.Web.Mvc;
using GolfHomieWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


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

            List<UsersModel> usersList = new List<UsersModel>();
            usersList.Add(users);

            return Json(usersList, JsonRequestBehavior.AllowGet);

        }
    }


    }