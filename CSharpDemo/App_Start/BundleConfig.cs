using System.Web;
using System.Web.Optimization;

namespace CSharpDemo
{
    public class BundleConfig
    {
        // 有关绑定的详细信息，请访问 http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // 使用要用于开发和学习的 Modernizr 的开发版本。然后，当你做好
            // 生产准备时，请使用 http://modernizr.com 上的生成工具来仅选择所需的测试。
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/lib").Include(
                "~/Res/lib/route.js",
                 "~/Res/lib/kj.lib.js",
                "~/Res/lib/kj.initRouter.js"

                ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/css").Include(

                     //在虚拟目录中添加了2个css文件  glyphicons-halflings-regular
                     "~/Res/css/font-awesome.css",
                     ""));

            bundles.Add(new StyleBundle("~/Content/font").Include(
                    //在虚拟目录中添加了2个css文件  glyphicons-halflings-regular
                    "~/Res/fonts/glyphicons-halflings-regular.ttf"));  
        }
    }
}
