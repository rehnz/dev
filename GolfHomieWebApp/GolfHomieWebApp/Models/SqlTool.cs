using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Collections;

namespace GolfHomieWebApp.Models
{
    public class SqlTool
    {
        DBConnectionStrings db = new DBConnectionStrings();

        public void runQuery(string queryStatement)
        {

            DataTableGenerator sql = new DataTableGenerator();
            SqlConnection con = new SqlConnection(db.GolfHomieDBConString);
            con.Open();
            SqlCommand command = new SqlCommand(queryStatement, con);
            command.ExecuteNonQuery();
            con.Close();
        }
    }
}

    
