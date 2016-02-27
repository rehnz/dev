using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dapper;
using System.ComponentModel.DataAnnotations;

namespace GolfHomieWebApp.Models
{
    public class UsersModel
    {

        public int id { get; set; }
        public string fname { get; set; }
        public string lname { get; set; }
        [Required]
        public string email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string password { get; set; }
        public string username { get; set; }
      
       


     

    }
    public class ScoresModel
    {
        public int id { get; set; }
        public int userid { get; set; }
        public int courseid { get; set; }
        public int score { get; set; }
        public decimal adjustedscore { get; set; }
        


[DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", 
               ApplyFormatInEditMode = true)]
        public DateTime dateplayed { get; set; }


    }
}