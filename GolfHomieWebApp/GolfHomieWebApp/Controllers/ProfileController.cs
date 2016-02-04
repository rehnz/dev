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

namespace GolfHomieWebApp.Controllers
{
    public class ProfileController : Controller
    {
        // GET: Profile
        public ActionResult Dashboard()
        {
            return View();
        }

        public JsonResult GetScores()
        {
            DataTableGenerator dtGen = new DataTableGenerator();
            DataTable scoresDT = new DataTable();

            scoresDT = dtGen.GetDataTable(@"
                                            select users.id,scores.courseid,courses.coursename,scores.score,scores.dateplayed 
                                            from scores  inner join users 
                                            on scores.userid = users.id
                                            inner join courses on courses.id = scores.courseid
                                            where users.id = " + Convert.ToInt32(Session["id"]));

           


            string scoresJSONString = dtGen.ConvertDataTableToJSONString(scoresDT);

            return Json(scoresJSONString, JsonRequestBehavior.AllowGet);
        }
    }
}