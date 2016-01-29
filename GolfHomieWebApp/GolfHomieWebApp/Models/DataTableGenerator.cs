using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace GolfHomieWebApp.Models
{
    public class DataTableGenerator
    {


        DBConnectionStrings golfHomieDB = new DBConnectionStrings();

        public DataTable GetDataTable(string queryStatement)
        {

            using (SqlConnection con = new SqlConnection(golfHomieDB.GolfHomieDBConString))
            {
                con.Open();
                using (SqlDataAdapter dataAdapter = new SqlDataAdapter(queryStatement, con))
                {
                    DataTable dt = new DataTable();

                    dataAdapter.Fill(dt);
                    return dt;
                }

            }

        }


        public String ConvertDataTableToJSONString(DataTable dataTable)
        {
            System.Web.Script.Serialization.JavaScriptSerializer serializer =
                   new System.Web.Script.Serialization.JavaScriptSerializer();

            List<Dictionary<String, Object>> tableRows = new List<Dictionary<String, Object>>();

            Dictionary<String, Object> row;

            foreach (DataRow dr in dataTable.Rows)
            {
                row = new Dictionary<String, Object>();
                foreach (DataColumn col in dataTable.Columns)
                {
                    row.Add(col.ColumnName, dr[col]);
                }
                tableRows.Add(row);
            }
            return serializer.Serialize(tableRows);
        }



    }
}