using Microsoft.AspNetCore.Mvc;

namespace IdleRpgApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        [HttpPost]
        [Route("test")]
        public async Task<IActionResult> TEST()
        {
            return Ok("asdasdasd");
        }
    }
}
