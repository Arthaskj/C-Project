using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CSharpDemo.Controllers
{
    public class TestController : Controller
    {
        //
        // GET: /Test/
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public string TestApi(string type)
        {
            string str = "";
            if (type == "a")
            {
                str = "a";
            }
            else if (type == "b")
            {
                str = "a";
            }
            return str;
        }

	}
}