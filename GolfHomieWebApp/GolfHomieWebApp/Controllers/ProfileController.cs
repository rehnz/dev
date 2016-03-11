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
                                            select top 10 scores.id,users.id,scores.courseid,courses.coursename,scores.score,scores.dateplayed 
                                            from scores  inner join users 
                                            on scores.userid = users.id
                                            inner join courses on courses.id = scores.courseid
                                            where users.id = " + Convert.ToInt32(Session["id"]) + "order by scores.dateplayed DESC");

           


            string scoresJSONString = dtGen.ConvertDataTableToJSONString(scoresDT);

            return Json(scoresJSONString, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCourses()
        {
            DataTableGenerator dtGen = new DataTableGenerator();
            DataTable coursesDT = new DataTable();

            coursesDT = dtGen.GetDataTable(@"SELECT id,coursename,par,blueteeRating,WhiteTeeRating,CourseSlope,AddressID From Courses");
            
            string coursesDTstring = dtGen.ConvertDataTableToJSONString(coursesDT);


            return Json(coursesDTstring, JsonRequestBehavior.AllowGet);

        }

        public JsonResult AddScore(ScoresModel newScore)
        {
           

            SqlTool sqltool = new SqlTool();
            string newScoreInsert = String.Format(@"INSERT INTO Scores(userid,courseid,score,dateplayed,adjustedscore) SELECT {0},{1},{2},'{3}',{4}",
                                                                    Session["id"], newScore.courseid, newScore.score, newScore.dateplayed.ToShortDateString(), 50);
            
            sqltool.runQuery(newScoreInsert);
            return Json(newScore, JsonRequestBehavior.AllowGet);
            
        }

        public ActionResult Error()
        {
            return View("Error");
        }


        public JsonResult DeleteScore(ScoresModel scoreToDelete)
        {

            
            SqlTool sqltool = new SqlTool();

            int scoreid = scoreToDelete.id;


            string deleteScoreQuery = @"Delete from Scores where id = " + scoreid;
            sqltool.runQuery(deleteScoreQuery);

            return Json(null, JsonRequestBehavior.AllowGet);

            


        }

    }
}