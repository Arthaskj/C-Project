using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CSharpDemo.Startup))]
namespace CSharpDemo
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
