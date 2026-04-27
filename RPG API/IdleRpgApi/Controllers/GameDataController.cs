using IdleRpgApi.Infrastructure.GameData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IdleRpgApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class GameDataController : Controller
    {
        private readonly IGameDataProvider _gameDataProvider;

        public GameDataController(IGameDataProvider gameDataProvider)
        {
            _gameDataProvider = gameDataProvider;
        }

        [HttpGet("items-definitions")]
        public IActionResult GetItemDefinitions()
        {
            var json = _gameDataProvider.GetItemDefinitionsJson();
            return Content(json, "application/json");

        }
    }
}
