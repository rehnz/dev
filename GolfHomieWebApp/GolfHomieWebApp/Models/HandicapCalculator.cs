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
namespace GolfHomieWebApp.Models
{
    public class HandicapCalculator
    {

        public decimal AdjustScore(int score,int courseid)
        {
          


            DataTable courseDT = new DataTable();
            DataTableGenerator dtGen = new DataTableGenerator();
            

            courseDT = dtGen.GetDataTable("SELECT * FROM Courses where id = " + courseid);

             DataRow dr = courseDT.Rows[0];


            CoursesModel course = new CoursesModel();
            course.id = Convert.ToInt32(dr["id"]);
            course.coursename = dr["coursename"].ToString();
            course.whiteteerating = Convert.ToDecimal(dr["whiteteerating"]);
            course.courseslope = Convert.ToDecimal(dr["courseslope"]);

            decimal adjustedScore = (score - course.whiteteerating) * 113 / course.courseslope;

            return adjustedScore;
        }


    }
}